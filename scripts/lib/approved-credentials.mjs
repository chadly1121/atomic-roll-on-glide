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



/**
 * Sentences that assert our own promise. Used by the sentence-level
 * normaliser — a sentence matching any of these is either replaced whole or
 * raised as a blocker. Never spliced into.
 */
export const PROMISE_TRIGGER_PATTERNS = [
  /perfect finish promise/i,
  /touch[- ]ups?\b/i,
  /\b(?:five|three|5|3)[- ]year warranty\b/i,
  /roll on painting warrants/i,
  /\bwarrant(?:y|ies|s)\b[^.]{0,60}\b(?:workmanship|our work)\b/i,
  /\bworkmanship warranty\b/i,
];

/**
 * Vocabulary that belongs to the promise itself. Anything left in a sentence
 * after these are removed is substantive content that must not be discarded.
 */
export const PROMISE_VOCABULARY = new RegExp(
  '\\b(' + [
    'perfect', 'finish', 'promise', 'touch', 'ups', 'up', 'complimentary', 'free',
    'lifetime', 'hours', 'hour', 'two', 'per', 'year', 'years', 'calendar', 'ownership',
    'own', 'the', 'home', 'property', 'on', 'painting', 'projects', 'project', 'roll',
    'a', 'an', 'and', 'of', 'our', 'we', 'offer', 'offers', 'include', 'includes',
    'including', 'warranty', 'warrants', 'warranted', 'workmanship', 'material',
    'materials', 'is', 'it', 'not', 'with', 'backed', 'by', 'plus', 'every', 'each',
    'each', 'goodwill', 'courtesy', 'unused', 'do', 'does', 'carry', 'over', 'three',
    'five', 'from', 'substantial', 'completion', 'for', 'to', 'that', 'this', 'as',
    'covered', 'coverage', 'apply', 'terms', 'written', 'them', 'out', 'set',
    'separately', 'decks', 'docks', 'railing', 'caps', 'runoff', 'zones', 'are',
    'other', 'exclusions', 'also', 'you', 'your',
  ].join('|') + ')\\b',
  'gi'
);

/**
 * Wording that would only ever appear if a replacement was spliced into the
 * middle of a sentence. If any of these survive, the import must fail.
 */
export const BROKEN_SENTENCE_PATTERNS = [
  /that includes Roll On Painting warrants/i,
  /Promise that includes Roll On/i,
  /\b(?:includes|including|with|and)\s+Roll On Painting warrants/i,
  /Roll On Painting\s+Roll On Painting/i,
  /warrants its workmanship[^.]{0,200}warrants its workmanship/i,
  /\.\s+[a-z]/,           // lowercase immediately after a full stop
  /\b(?:a|an|the)\s+Roll On Painting warrants/i,
];

/** Hazards that always need a human read. */
export const HAZARD_SERIOUS_PATTERNS = [
  /\basbestos\b/i, /\blead\b(?!ing|er|s\b)/i,
];

/** Hazard cues that are merely worth a glance. */
export const HAZARD_CEILING_PATTERNS = [
  /\btextured ceiling/i, /\bpopcorn\b/i, /\bstipple\b/i, /\bstucco\b/i,
];

/** Hazard cues whose caution wording must be read by a human. */
export const HAZARD_PATTERNS = [...HAZARD_SERIOUS_PATTERNS, ...HAZARD_CEILING_PATTERNS];

/** Chemical and pressure-washing instructions — always a human read. */
export const SAFETY_CHEMICAL_PATTERNS = [
  /\bpressure wash/i, /\bpower wash/i, /\bbiocide\b/i, /\bbleach\b/i,
  /\bsodium hypochlorite\b/i,
];

/** Abrasive instructions — worth a glance, rarely wrong. */
export const SAFETY_ABRASIVE_PATTERNS = [
  /\bscrap(e|ing)\b/i, /\bsand(ing|ed)?\b/i, /\bgrind(ing)?\b/i,
];

/** Instructions whose safety wording must be read by a human. */
export const SAFETY_PATTERNS = [...SAFETY_CHEMICAL_PATTERNS, ...SAFETY_ABRASIVE_PATTERNS];

/**
 * An absolute word only matters when the sentence is making a claim about our
 * work, a result, or a durability span. "Prevents lap marks" is a technique.
 */
export const CLAIM_CONTEXT_PATTERN =
  /\bRoll On\b|\bwe\b|\bour\b|\bus\b|\bwarrant\w*\b|\bguarantee\w*\b|\b\d+\s*(?:to|[-\u2013]|and)?\s*\d*\s*years?\b|\blifetime\b/i;

/** Retired service areas. Never to appear in copy. */
export const RETIRED_TOWNS = ['Barrie', 'Bowmanville', 'Collingwood', 'Midland'];

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
