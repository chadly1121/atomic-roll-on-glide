/**
 * Roll-On Painting prefinishing portal — pricing calculation engine.
 *
 * Pure functions only. No Supabase / React imports here so the logic is
 * trivially unit-testable and reusable on the server (edge functions) and
 * in the admin / client UIs.
 */

export type SurfaceType = "smooth" | "rough" | "mdf_preprimed" | "mdf_raw";

export interface LumberProfileInput {
  front_face_sqft_per_lineal_ft: number;
  back_face_sqft_per_lineal_ft: number;
  edge_sqft_per_lineal_ft: number;
  surface_type: SurfaceType;
}

export interface CoatingProductInput {
  cost_per_gallon: number;
  /** If omitted, derived as cost_per_gallon / 0.60 (40% gross margin). */
  sale_price_per_gallon?: number;
  coverage_smooth_sqft_per_gallon?: number;
  coverage_rough_sqft_per_gallon?: number;
  coverage_mdf_preprimed_sqft_per_gallon?: number;
  coverage_mdf_raw_first_coat_sqft_per_gallon?: number;
  coverage_mdf_raw_subsequent_sqft_per_gallon?: number;
}

export interface LabourRateInput {
  rate_per_lineal_ft_per_pass: number;
}

export interface LumberQuoteInput {
  profile: LumberProfileInput;
  lineal_feet: number;
  coats_front: 1 | 2 | 3;
  coats_back: 0 | 1 | 2;
  coating_product: CoatingProductInput;
  labour_rate: LabourRateInput;
}

export interface LumberPassBreakdown {
  pass: number;
  includes_back: boolean;
  sqft_this_pass: number;
  coverage_rate_used: number;
  gallons_this_pass: number;
}

export interface LumberQuoteResult {
  total_passes: number;
  front_sqft_per_pass: number;
  edge_sqft_per_pass: number;
  back_sqft_per_coat: number;
  total_sqft: number;
  gallons_required: number;
  material_cost: number;
  labour_cost: number;
  total_cost: number;
  sale_price_per_gallon: number;
  mdf_raw_flag: boolean;
  notes: string[];
  breakdown: LumberPassBreakdown[];
}

const DEFAULT_COVERAGE = {
  smooth: 300,
  rough: 250,
  mdf_preprimed: 300,
  mdf_raw_first: 200,
  mdf_raw_subsequent: 300,
} as const;

function resolveSalePrice(p: CoatingProductInput): number {
  if (typeof p.sale_price_per_gallon === "number") return p.sale_price_per_gallon;
  return p.cost_per_gallon / 0.6;
}

function nonRawCoverage(surface: SurfaceType, p: CoatingProductInput): number {
  switch (surface) {
    case "smooth":
      return p.coverage_smooth_sqft_per_gallon ?? DEFAULT_COVERAGE.smooth;
    case "rough":
      return p.coverage_rough_sqft_per_gallon ?? DEFAULT_COVERAGE.rough;
    case "mdf_preprimed":
      return p.coverage_mdf_preprimed_sqft_per_gallon ?? DEFAULT_COVERAGE.mdf_preprimed;
    default:
      throw new Error(`nonRawCoverage called for surface_type=${surface}`);
  }
}

/**
 * Calculate a lumber prefinishing quote.
 *
 * Pass model:
 *   - total_passes = coats_front (always)
 *   - Every pass applies coating to the front face + both edges.
 *   - Pass N also coats the back face when N <= coats_back.
 *
 * Coverage:
 *   - smooth / rough / mdf_preprimed use a single coverage rate.
 *   - mdf_raw uses a lower first-coat coverage and a higher subsequent-coat
 *     coverage; gallons are summed coat-by-coat.
 */
export function calculateLumberQuote(input: LumberQuoteInput): LumberQuoteResult {
  const { profile, lineal_feet, coats_front, coats_back, coating_product, labour_rate } = input;

  if (lineal_feet < 0) throw new Error("lineal_feet must be >= 0");
  if (coats_front < 1 || coats_front > 3) throw new Error("coats_front must be 1-3");
  if (coats_back < 0 || coats_back > 2) throw new Error("coats_back must be 0-2");
  if (coats_back > coats_front) {
    throw new Error("coats_back cannot exceed coats_front (back rides along on front passes)");
  }

  const front_sqft_per_pass = profile.front_face_sqft_per_lineal_ft * lineal_feet;
  const edge_sqft_per_pass = profile.edge_sqft_per_lineal_ft * lineal_feet;
  const back_sqft_per_coat = profile.back_face_sqft_per_lineal_ft * lineal_feet;

  const total_passes = coats_front;
  const isMdfRaw = profile.surface_type === "mdf_raw";

  const breakdown: LumberPassBreakdown[] = [];
  let total_sqft = 0;
  let gallons_required = 0;

  for (let pass = 1; pass <= total_passes; pass++) {
    const includes_back = pass <= coats_back;
    const sqft_this_pass =
      front_sqft_per_pass + edge_sqft_per_pass + (includes_back ? back_sqft_per_coat : 0);

    let coverage_rate_used: number;
    if (isMdfRaw) {
      coverage_rate_used =
        pass === 1
          ? coating_product.coverage_mdf_raw_first_coat_sqft_per_gallon ??
            DEFAULT_COVERAGE.mdf_raw_first
          : coating_product.coverage_mdf_raw_subsequent_sqft_per_gallon ??
            DEFAULT_COVERAGE.mdf_raw_subsequent;
    } else {
      coverage_rate_used = nonRawCoverage(profile.surface_type, coating_product);
    }

    const gallons_this_pass = coverage_rate_used > 0 ? sqft_this_pass / coverage_rate_used : 0;

    total_sqft += sqft_this_pass;
    gallons_required += gallons_this_pass;
    breakdown.push({ pass, includes_back, sqft_this_pass, coverage_rate_used, gallons_this_pass });
  }

  const sale_price_per_gallon = resolveSalePrice(coating_product);
  const material_cost = gallons_required * sale_price_per_gallon;
  const labour_cost = lineal_feet * total_passes * labour_rate.rate_per_lineal_ft_per_pass;
  const total_cost = material_cost + labour_cost;

  const notes: string[] = [];
  if (isMdfRaw) {
    notes.push(
      "Raw MDF: sanding between coats required. MDF edges: sanding required on all profiles.",
    );
  }

  return {
    total_passes,
    front_sqft_per_pass,
    edge_sqft_per_pass,
    back_sqft_per_coat,
    total_sqft,
    gallons_required,
    material_cost,
    labour_cost,
    total_cost,
    sale_price_per_gallon,
    mdf_raw_flag: isMdfRaw,
    notes,
    breakdown,
  };
}

// ---------------------------------------------------------------------------
// Cedar shake pricing
// ---------------------------------------------------------------------------

export interface ShakeLabourRateInput {
  labour_per_bundle_per_coat: number;
}

export interface ShakeQuoteInput {
  number_of_bundles: number;
  coats: number;
  coating_product: CoatingProductInput;
  shake_labour_rate: ShakeLabourRateInput;
}

export interface ShakeQuoteResult {
  gallons_required: number;
  sale_price_per_gallon: number;
  material_cost: number;
  labour_cost: number;
  total_cost: number;
  /** Total (material + labour) per bundle, all coats included. */
  cost_per_bundle_total: number;
}

/**
 * Calculate a cedar shake prefinishing quote.
 * Convention: 1 gallon of coating per bundle per coat.
 */
export function calculateShakeQuote(input: ShakeQuoteInput): ShakeQuoteResult {
  const { number_of_bundles, coats, coating_product, shake_labour_rate } = input;

  if (number_of_bundles < 0) throw new Error("number_of_bundles must be >= 0");
  if (coats < 0) throw new Error("coats must be >= 0");

  const gallons_required = number_of_bundles * coats * 1;
  const sale_price_per_gallon = resolveSalePrice(coating_product);
  const material_cost = gallons_required * sale_price_per_gallon;
  const labour_cost = number_of_bundles * coats * shake_labour_rate.labour_per_bundle_per_coat;
  const total_cost = material_cost + labour_cost;
  const cost_per_bundle_total = number_of_bundles > 0 ? total_cost / number_of_bundles : 0;

  return {
    gallons_required,
    sale_price_per_gallon,
    material_cost,
    labour_cost,
    total_cost,
    cost_per_bundle_total,
  };
}