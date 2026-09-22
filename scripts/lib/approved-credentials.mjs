/**
 * The single source of truth for what Roll On Painting may claim.
 *
 * Anything an incoming article asserts that is not on this list gets flagged
 * for a human read. Edit THIS FILE ONLY — the sync script and the review
 * report both read from here.
 */

// Verified, may appear in published copy.
export const APPROVED_CREDENTIALS = [
  'WSIB coverage',
  '$5M commercial liability insurance',
  'GoNano certified installer and reseller',
  'Sansin certified',
  'Benjamin Moore',
  'Dulux',
  'PPG',
  'In business since 1999 (25+ years)',
  'Featured 5x on Scott\u2019s Vacation House Rules',
  'Featured 15x in Dockside Magazine',
];

// ---------------------------------------------------------------------------
// PENDING — NOT APPROVED. The owner is confirming whether the Painting
// Contractors Association membership has lapsed. To put it back, move the
// string below into APPROVED_CREDENTIALS and delete it from here. Until then
// any mention of it is flagged, and it must not appear on the site.
export const PENDING_CREDENTIALS = [
  'Painting Contractors Association membership',
];
// ---------------------------------------------------------------------------

/** Phrases in article copy that assert an affiliation / accreditation. */
export const CREDENTIAL_PATTERNS = [
  /painting contractors association/i,
  /\bPDCA\b/,
  /\bPCA\b/,
  /member of [a-z ]{0,30}association/i,
  /\baccredit(ed|ation)\b/i,
  /\bcertified by\b/i,
  /\blicen[cs]ed\b/i,
  /\baward[- ]winning\b/i,
  /\bbbb\b|better business bureau/i,
  /\bapproved contractor\b/i,
];

/** Warranty, guarantee and lifespan assertions. */
export const WARRANTY_PATTERNS = [
  /\bwarrant(y|ies|ed|s)\b/i,
  /\bguarantee[ds]?\b/i,
  /\blasts? (for )?\d+\s*(\+)?\s*years?\b/i,
  /\b\d+\s*[-\u2013]\s*year\b/i,
  /\blifetime\b/i,
];

/** Absolute promise words that must never stand unqualified. */
export const ABSOLUTE_PATTERNS = [
  /\bguarantee\w*\b/i, /\bensures?\b/i, /\bprevents?\b/i, /\bpermanent(ly)?\b/i,
  /\blifetime\b/i, /\bweatherproof\b/i, /\bwaterproof\b/i, /\beliminates?\b/i,
  /\bnever\b/i, /\balways\b/i, /\byear[- ]round\b/i,
];

/** Hazard cues whose caution wording must be read by a human. */
export const HAZARD_PATTERNS = [
  /\btextured ceiling/i, /\bpopcorn\b/i, /\bstipple\b/i, /\bstucco\b/i,
  /\basbestos\b/i, /\blead\b(?!ing|er|s\b)/i,
];

/** Instructions whose safety wording must be read by a human. */
export const SAFETY_PATTERNS = [
  /\bscrap(e|ing)\b/i, /\bsand(ing|ed)?\b/i, /\bgrind(ing)?\b/i,
  /\bpressure wash/i, /\bpower wash/i, /\bbiocide\b/i, /\bbleach\b/i,
  /\bsodium hypochlorite\b/i,
];

/** Contact / place details that must match the real record. */
export const CONTACT_PATTERNS = [
  /\(?\d{3}\)?[-. ]\d{3}[-. ]\d{4}/,
  /\b\d+\s+[A-Z][A-Za-z]+\s+(Road|Rd|Street|St|Avenue|Ave|Drive|Dr)\b/,
];

/** Canonical warranty wording. Long form wherever there is room. */
export const WARRANTY_LONG =
  'Roll On Painting warrants its workmanship for three years from substantial completion. ' +
  'Decks, docks, railing caps and runoff zones are not covered, and other exclusions apply \u2014 ' +
  'the written terms set them out. Separately, our Perfect Finish Promise provides two hours of ' +
  'complimentary touch-ups per year of ownership as a goodwill courtesy; unused hours do not carry over.';

/** Canonical short form for buttons, meta descriptions and FAQ answers. */
export const WARRANTY_SHORT =
  'Three-year workmanship warranty, plus two hours of complimentary touch-ups per year of ownership.';
