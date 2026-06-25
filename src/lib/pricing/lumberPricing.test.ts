import { describe, it, expect } from "vitest";
import {
  calculateLumberQuote,
  calculateShakeQuote,
  type LumberProfileInput,
  type CoatingProductInput,
} from "./lumberPricing";

// T&G 1x6 Smooth — actual dimensions per spec
// front = 5.5/12, back = (5.5+0.75)/12, edges = 2*0.75/12
const tg1x6Smooth: LumberProfileInput = {
  front_face_sqft_per_lineal_ft: 5.5 / 12,
  back_face_sqft_per_lineal_ft: (5.5 + 0.75) / 12,
  edge_sqft_per_lineal_ft: (2 * 0.75) / 12,
  surface_type: "smooth",
};

const tg1x6MdfRaw: LumberProfileInput = { ...tg1x6Smooth, surface_type: "mdf_raw" };
const tg1x6MdfPreprimed: LumberProfileInput = { ...tg1x6Smooth, surface_type: "mdf_preprimed" };

const sansin: CoatingProductInput = {
  cost_per_gallon: 60, // → sale price = 100
  coverage_smooth_sqft_per_gallon: 300,
  coverage_rough_sqft_per_gallon: 250,
  coverage_mdf_preprimed_sqft_per_gallon: 300,
  coverage_mdf_raw_first_coat_sqft_per_gallon: 200,
  coverage_mdf_raw_subsequent_sqft_per_gallon: 300,
};

const labour = { rate_per_lineal_ft_per_pass: 0.25 };

const LF = 1000;
const FRONT = (5.5 / 12) * LF;
const BACK = ((5.5 + 0.75) / 12) * LF;
const EDGES = ((2 * 0.75) / 12) * LF;

describe("calculateLumberQuote", () => {
  it("3 coats front, 0 back (smooth T&G 1x6)", () => {
    const r = calculateLumberQuote({
      profile: tg1x6Smooth,
      lineal_feet: LF,
      coats_front: 3,
      coats_back: 0,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.total_passes).toBe(3);
    expect(r.total_sqft).toBeCloseTo((FRONT + EDGES) * 3, 6);
    expect(r.gallons_required).toBeCloseTo(r.total_sqft / 300, 6);
    expect(r.material_cost).toBeCloseTo(r.gallons_required * 100, 6);
    expect(r.labour_cost).toBeCloseTo(LF * 3 * 0.25, 6);
    expect(r.mdf_raw_flag).toBe(false);
    expect(r.notes).toHaveLength(0);
    expect(r.breakdown.every((b) => !b.includes_back)).toBe(true);
  });

  it("3 coats front, 1 back", () => {
    const r = calculateLumberQuote({
      profile: tg1x6Smooth,
      lineal_feet: LF,
      coats_front: 3,
      coats_back: 1,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.total_sqft).toBeCloseTo((FRONT + EDGES) * 3 + BACK * 1, 6);
    expect(r.breakdown.filter((b) => b.includes_back)).toHaveLength(1);
    expect(r.labour_cost).toBeCloseTo(LF * 3 * 0.25, 6);
  });

  it("3 coats front, 2 back", () => {
    const r = calculateLumberQuote({
      profile: tg1x6Smooth,
      lineal_feet: LF,
      coats_front: 3,
      coats_back: 2,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.total_sqft).toBeCloseTo((FRONT + EDGES) * 3 + BACK * 2, 6);
    expect(r.breakdown.filter((b) => b.includes_back)).toHaveLength(2);
  });

  it("2 coats front, 2 back", () => {
    const r = calculateLumberQuote({
      profile: tg1x6Smooth,
      lineal_feet: LF,
      coats_front: 2,
      coats_back: 2,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.total_passes).toBe(2);
    expect(r.total_sqft).toBeCloseTo((FRONT + EDGES + BACK) * 2, 6);
    expect(r.labour_cost).toBeCloseTo(LF * 2 * 0.25, 6);
  });

  it("1 coat front, 0 back", () => {
    const r = calculateLumberQuote({
      profile: tg1x6Smooth,
      lineal_feet: LF,
      coats_front: 1,
      coats_back: 0,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.total_passes).toBe(1);
    expect(r.total_sqft).toBeCloseTo(FRONT + EDGES, 6);
    expect(r.gallons_required).toBeCloseTo((FRONT + EDGES) / 300, 6);
  });

  it("rejects coats_back > coats_front", () => {
    expect(() =>
      calculateLumberQuote({
        profile: tg1x6Smooth,
        lineal_feet: LF,
        coats_front: 1,
        coats_back: 2,
        coating_product: sansin,
        labour_rate: labour,
      }),
    ).toThrow();
  });

  it("MDF raw splits coverage: 200 first coat, 300 subsequent; sets flag + note", () => {
    const r = calculateLumberQuote({
      profile: tg1x6MdfRaw,
      lineal_feet: LF,
      coats_front: 3,
      coats_back: 1,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.mdf_raw_flag).toBe(true);
    expect(r.notes[0]).toMatch(/Raw MDF/);
    // Pass 1: front+edges+back, coverage 200
    // Pass 2: front+edges,      coverage 300
    // Pass 3: front+edges,      coverage 300
    const pass1 = FRONT + EDGES + BACK;
    const passN = FRONT + EDGES;
    const expectedGallons = pass1 / 200 + passN / 300 + passN / 300;
    expect(r.gallons_required).toBeCloseTo(expectedGallons, 6);
    expect(r.breakdown[0].coverage_rate_used).toBe(200);
    expect(r.breakdown[1].coverage_rate_used).toBe(300);
    expect(r.breakdown[2].coverage_rate_used).toBe(300);
  });

  it("MDF preprimed uses single 300 coverage and no raw flag", () => {
    const r = calculateLumberQuote({
      profile: tg1x6MdfPreprimed,
      lineal_feet: LF,
      coats_front: 2,
      coats_back: 1,
      coating_product: sansin,
      labour_rate: labour,
    });
    expect(r.mdf_raw_flag).toBe(false);
    expect(r.notes).toHaveLength(0);
    expect(r.breakdown.every((b) => b.coverage_rate_used === 300)).toBe(true);
    const expectedSqft = (FRONT + EDGES) * 2 + BACK * 1;
    expect(r.total_sqft).toBeCloseTo(expectedSqft, 6);
    expect(r.gallons_required).toBeCloseTo(expectedSqft / 300, 6);
  });

  it("derives sale price as cost / 0.60 when not supplied", () => {
    const r = calculateLumberQuote({
      profile: tg1x6Smooth,
      lineal_feet: 100,
      coats_front: 1,
      coats_back: 0,
      coating_product: { cost_per_gallon: 60 },
      labour_rate: labour,
    });
    expect(r.sale_price_per_gallon).toBeCloseTo(100, 6);
  });
});

describe("calculateShakeQuote", () => {
  it("2 bundles, 2 coats", () => {
    const r = calculateShakeQuote({
      number_of_bundles: 2,
      coats: 2,
      coating_product: { cost_per_gallon: 60 }, // sale = 100
      shake_labour_rate: { labour_per_bundle_per_coat: 125 },
    });
    expect(r.gallons_required).toBe(4);
    expect(r.material_cost).toBeCloseTo(400, 6);
    expect(r.labour_cost).toBeCloseTo(500, 6);
    expect(r.total_cost).toBeCloseTo(900, 6);
    expect(r.cost_per_bundle_total).toBeCloseTo(450, 6);
  });

  it("zero bundles → zero costs, no divide by zero", () => {
    const r = calculateShakeQuote({
      number_of_bundles: 0,
      coats: 2,
      coating_product: { cost_per_gallon: 60 },
      shake_labour_rate: { labour_per_bundle_per_coat: 125 },
    });
    expect(r.total_cost).toBe(0);
    expect(r.cost_per_bundle_total).toBe(0);
  });
});