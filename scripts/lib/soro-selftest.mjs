/**
 * Self-test for the content normaliser and the review tiers.
 *
 * Runs on EVERY invocation of scripts/sync-soro.mjs. If any case regresses the
 * import stops before a single file is written. The first case is the real
 * defect found in production: the old normaliser spliced the canonical wording
 * into the middle of a sentence and left a fragment.
 */
import { normalisePromiseSentences, reviewArticle, retiredTowns, servedCommunities } from './soro.mjs';
import { WARRANTY_LONG, BROKEN_SENTENCE_PATTERNS } from './approved-credentials.mjs';

const cases = [
  {
    name: 'mixed sentence is NOT rewritten — it blocks for a human',
    input:
      '<p>With more than 25 years of experience, $5 million insurance coverage, WSIB coverage, ' +
      'and a Perfect Finish Promise that includes lifetime complimentary touch-ups on painting projects.</p>',
    expect: (r, input) => {
      if (r.html !== input) return 'sentence was rewritten; it should have been left alone';
      if (!r.blockers.length) return 'no blocker raised';
      if (!/rewritten by hand/.test(r.blockers[0])) return 'blocker does not ask for a hand rewrite';
      return null;
    },
  },
  {
    name: 'the exact broken output can never be produced',
    input:
      '<p>Every project is backed by our Perfect Finish Promise that includes lifetime complimentary touch-ups.</p>',
    expect: (r) => {
      const hit = BROKEN_SENTENCE_PATTERNS.find((re) => re.test(r.html.replace(/<[^>]+>/g, ' ')));
      return hit ? `produced ungrammatical output matching ${hit}` : null;
    },
  },
  {
    name: 'a whole promise sentence is replaced with the canonical wording',
    input: '<p>Our clients receive two hours of free touch-ups every calendar year.</p>',
    expect: (r) => {
      if (!r.html.includes(WARRANTY_LONG)) return 'canonical wording missing';
      if (r.html !== `<p>${WARRANTY_LONG}</p>`) return `tags not preserved: ${r.html}`;
      if (!r.edits.length) return 'edit not recorded';
      return null;
    },
  },
  {
    name: 'a five-year warranty sentence becomes the three-year canonical wording',
    input: '<p>Our work carries a five-year warranty.</p>',
    expect: (r) => (r.html.includes(WARRANTY_LONG) && !/five-year warranty/i.test(r.html)
      ? null : `five-year claim survived: ${r.html}`),
  },
  {
    name: 'already-canonical wording is left untouched',
    input: `<p>${WARRANTY_LONG}</p>`,
    expect: (r, input) => (r.html === input && !r.edits.length
      ? null : 'canonical wording was rewritten or re-flagged'),
  },
  {
    name: 'unrelated copy is untouched',
    input: '<p>Back-brushing works stain into the grain and prevents lap marks.</p>',
    expect: (r, input) => (r.html === input && !r.edits.length && !r.blockers.length
      ? null : 'unrelated sentence was modified'),
  },
  {
    name: 'no sentence fragment survives any replacement',
    input:
      '<p>We prepare the surface carefully. Every project is backed by our Perfect Finish Promise. ' +
      'The crew cleans up at the end of each day.</p>',
    expect: (r) => {
      const text = r.html.replace(/<[^>]+>/g, ' ');
      if (!/We prepare the surface carefully\./.test(text)) return 'neighbouring sentence lost';
      if (!/The crew cleans up at the end of each day\./.test(text)) return 'trailing sentence lost';
      const hit = BROKEN_SENTENCE_PATTERNS.find((re) => re.test(text));
      return hit ? `ungrammatical output matching ${hit}` : null;
    },
  },
];

function checkTowns() {
  const served = servedCommunities().map((s) => s.toLowerCase());
  const retired = retiredTowns();
  if (!served.includes('huntsville')) return 'served list did not load from serviceAreas.ts';
  if (!retired.includes('Barrie')) return 'Barrie is missing from the retired list';
  if (retired.some((t) => served.includes(t.toLowerCase()))) return 'a served community is being flagged as retired';
  return null;
}

function checkTiers() {
  const r = reviewArticle({
    slug: 'tier-test',
    title: 'Tier test',
    html: '<p>Back-brushing prevents lap marks on broad deck boards in Muskoka. ' +
      'Sanding between coats gives a smoother finish.</p>',
    excerpt: 'How back-brushing improves a deck finish in Muskoka.',
  });
  if (r.count !== 0) return `clean article reported ${r.count} MUST READ items: ` +
    JSON.stringify(r.findings.filter((f) => f.tier === 'must'));
  const must = reviewArticle({
    slug: 'tier-test-2',
    html: '<p>Test for asbestos before disturbing the ceiling.</p>',
  });
  if (must.count < 1) return 'an asbestos mention was not tiered as MUST READ';
  const leadTo = reviewArticle({
    slug: 'tier-test-3',
    html: '<p>Poor preparation can lead to patchy fading and flaking.</p>',
  });
  if (leadTo.count !== 0) return '"lead to" was mistaken for lead paint';
  const scope = normalisePromiseSentences(
    '<p>Are touch-ups included, and who removes the protective coverings at the end?</p>', 'selftest');
  if (scope.blockers.length || scope.edits.length) return 'a touch-up scope question was treated as our promise';
  return null;

}

export function runSelfTest() {
  const failures = [];
  for (const c of cases) {
    let result;
    try {
      result = normalisePromiseSentences(c.input, 'selftest');
    } catch (err) {
      failures.push(`${c.name}: threw ${err.message}`);
      continue;
    }
    const problem = c.expect(result, c.input);
    if (problem) failures.push(`${c.name}: ${problem}`);
  }
  for (const [name, fn] of [['retired town list', checkTowns], ['review tiers', checkTiers]]) {
    const problem = fn();
    if (problem) failures.push(`${name}: ${problem}`);
  }
  return failures;
}

export function runSelfTestOrExit() {
  const failures = runSelfTest();
  if (failures.length) {
    console.error('Self-test FAILED — nothing was written:');
    for (const f of failures) console.error('  ✗ ' + f);
    process.exit(1);
  }
  console.log(`Self-test passed (${cases.length + 2} cases).`);
}

// Allow `bun scripts/lib/soro-selftest.mjs` on its own.
if (import.meta.main || process.argv[1]?.endsWith('soro-selftest.mjs')) runSelfTestOrExit();
