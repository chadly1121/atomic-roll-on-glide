import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HowWeQuotePage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";
  const heroImg = "/lovable-uploads/interior-modern-cottage-living.webp";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/how-we-quote/#webpage`,
        "url": `${siteUrl}/how-we-quote`,
        "name": "How We Quote — Roll On Painting",
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "How We Quote", "item": `${siteUrl}/how-we-quote` }
          ]
        }
      },
      {
        "@type": "Service",
        "serviceType": "Painting estimation and quoting",
        "provider": { "@id": `${siteUrl}/#localbusiness` },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Ontario, Canada"
        }
      }
    ]
  };

  const Divider = () => (
    <div className="my-12 md:my-16 flex justify-center" aria-hidden="true">
      <div className="h-px w-32 bg-atomic-orange" />
    </div>
  );

  const PullQuote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="font-semibold text-atomic-navy text-xl md:text-2xl leading-snug my-10 md:my-12 text-center">
      {children}
    </p>
  );

  const pricingItems = [
    {
      title: "Interior cottage repaint",
      subtitle: "walls, ceilings, trim, doors, standard prep",
      body: "$15,000 – $25,000 for a typical 1,500–2,500 square foot cottage. Larger properties, specialty finishes (pine ceilings, stained beams, oak trim, ash walls, wallpaper), or significant prep can push this materially higher."
    },
    {
      title: "Exterior cottage repaint",
      subtitle: "siding, trim, eaves, doors",
      body: "From $5.75 per finished square foot, with a 5-year warranty included. Lakefront access, log treatments, board & batten, and stain work are quoted separately."
    },
    {
      title: "Cabinet refinishing",
      subtitle: "per kitchen, factory-quality spray finish",
      body: "Quoted per door and per linear foot of box. We re-hang, prime, top-coat, and refinish in our 2,000 square foot prefinishing shop in Port Sydney. A typical full kitchen refinish is a multi-thousand-dollar project, well below the cost of replacement."
    },
    {
      title: "Deck and dock staining",
      subtitle: "premium stain product, full prep",
      body: "Quoted by surface area and condition. Most Muskoka decks land in the $1,500 – $5,000 range depending on size, prep, and finish."
    },
    {
      title: "GoNano permanent coatings",
      subtitle: null,
      body: "From $0.99 per square foot. Pairs with most painting projects. We're a certified GoNano applicator with the spray equipment to apply it correctly."
    }
  ];

  return (
    <>
      <Helmet>
        <title>How We Quote — Roll On Painting</title>
        <meta
          name="description"
          content="Most painters give you a number. We give you a quote. How Roll On Painting engineers every estimate from real surfaces, real production rates, and 25 years of measured data. Honest ballpark ranges included."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/how-we-quote`} />
        <meta property="og:title" content="How We Quote — Roll On Painting" />
        <meta
          property="og:description"
          content="Most painters give you a number. We give you a quote. How Roll On Painting engineers every estimate from real surfaces, real production rates, and 25 years of measured data."
        />
        <meta property="og:url" content={`${siteUrl}/how-we-quote`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="how-we-quote" />

        <main className="pt-16">
          {/* Hero */}
          <section
            className="relative min-h-[55vh] md:min-h-[65vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <div className="relative container mx-auto px-4 text-center py-20">
              <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto">
                Most painters give you a number. We give you a quote.
              </h1>
              <p className="mt-6 italic text-atomic-orange text-xl md:text-2xl">
                There is a difference. It matters.
              </p>
            </div>
          </section>

          {/* Body */}
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <article className="max-w-3xl mx-auto text-atomic-navy">
                <p className="text-lg leading-relaxed mb-5">
                  If you've gathered three painting quotes lately, you've probably noticed they're wildly different — and you've probably wondered why.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  Here's the truth most contractors won't tell you: most painting quotes are guesses. They walk through your house, mentally pace the rooms, multiply by a per-square-foot rate they've used for ten years, and write a number on a piece of paper. That's why mid-job surprises are so common in this industry. The painter wasn't lying — they just weren't measuring.
                </p>
                <p className="text-lg leading-relaxed mb-10">
                  I've spent twenty-five years building a different way to do this.
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  A 20×20 room, two ways.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  Here's the simplest example I can give you of why per-square-foot pricing is broken.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  Imagine two rooms, both 20×20, both with 9-foot ceilings.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  The first is open-concept. Four walls, one ceiling, baseboard around the perimeter — 80 lineal feet of baseboard, 720 square feet of wall drywall, one door.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  The second is divided into four bedrooms. Same 400 square foot floor. Same 400 square foot ceiling. But now you have <em>160</em> lineal feet of baseboard, <em>1,440</em> square feet of wall drywall, and four doors with frames to cut around.
                </p>

                <PullQuote>
                  Same square footage. Exactly double the wall drywall, double the baseboard, four times the door work.
                </PullQuote>

                <p className="text-lg leading-relaxed mb-5">
                  A per-square-foot quote on those two rooms is either too high (you're overpaying for the open one) or too low (the painter loses money on the divided one and finds ways to make it back somewhere else). Neither outcome is fair to you.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  We don't issue final quotes by the square foot. We never have.
                </p>

                <Divider />

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  How we actually do it.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  Every Roll On quote is engineered from the actual surfaces of your specific property.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  We measure walls in square feet. Baseboards, casings, window trim, door frames, and risers in lineal feet. Doors and door frames as individual units. Spindles by the spindle. Stair treads by the tread. Caulking and filling by the lineal foot.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  For each line item, we apply production rates I've measured across thousands of jobs over twenty-five years. How many square feet of wall my crew sprays per hour. How many spindles per hour by hand. How many lineal feet of caulking per hour around trim. How long it takes to mask cabinets, re-and-re a door, or label and re-hang trim properly.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  Access and elevation are quoted separately because they materially change labour time. Step ladder work is slower than ground work. Scaffold work is slower than ladder work. Extension ladder, scissor lift, boom lift, bad terrain — each adjusts the hours.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  Then we layer in materials at known spread rates (we know how many square feet a gallon of each product covers, on each surface, with each application method). We add overhead, fuel, sundries, rentals, and miscellaneous job costs as actual percentages built from years of profit-and-loss data, not guesses.
                </p>

                <PullQuote>
                  The number you get is the number you pay.
                </PullQuote>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  What you get from us.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  A real quote. Itemized. The walls, the ceilings, the trim, the doors, the cabinets, the prep, the access, the materials. You'll see what we're charging for and why. If something changes mid-job — and on cottage projects, things sometimes do — we tell you before we change it, not after.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  That said: a handful of our long-term clients, including several custom builders we've worked with for years, hire us by the hour instead of by quote. Imagine asking a painting crew to stain and clear-coat your entire project — ash walls, douglas fir beams, oak trim, selective whitewashing throughout — on an open-ended hourly clock. It happens more than you'd think. For builders managing custom homes where finishes change on the fly, where the client switches the bedroom from grey to greige three weeks in, where the spec sheet is a moving target, they want a painting partner they can trust to bill honestly and work efficiently without a hard scope.
                </p>

                <Divider />

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  Ballpark ranges.
                </h2>

                <p className="text-lg leading-relaxed mb-8">
                  Most cottage owners want a rough idea before booking a consultation. Below are honest ballparks for context. They are not quotes. The only honest number is the one we give you after walking your site.
                </p>

                <div className="space-y-6 mb-10">
                  {pricingItems.map((item) => (
                    <div
                      key={item.title}
                      className="border-l-4 border-atomic-orange bg-atomic-orange/5 rounded-r-lg px-6 py-5 md:px-8 md:py-6"
                    >
                      <h3 className="font-display text-2xl md:text-3xl text-atomic-navy font-semibold">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="italic text-atomic-navy/70 mt-1 mb-3">
                          {item.subtitle}
                        </p>
                      )}
                      <p className="text-lg leading-relaxed text-atomic-navy">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  What is <em>not</em> in a Roll On quote.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  A surprise. A hidden line item. A change order that wasn't discussed first. A price designed to win the job and recovered through corner-cutting later.
                </p>

                <Divider />

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  Ready for a real quote?
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  Book a cottage consultation. We'll come to your property, measure what's actually there, and send you an engineered quote within 5 business days.
                </p>
                <p className="text-lg leading-relaxed mb-10">
                  For most projects we provide quotes three ways: through an on-site walk-through (best for cottages and complex jobs), by phone, or by email if you can describe the scope clearly.
                </p>

                <div className="text-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-atomic-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-atomic-orange/90 transition-colors shadow-lg"
                  >
                    Book Your Cottage Consultation
                  </Link>
                  <p className="text-sm italic text-atomic-navy/60 mt-5">
                    Toronto cottage owner? Ask about our{' '}
                    <Link
                      to="/private-client-muskoka-property-care"
                      className="underline underline-offset-2 hover:text-atomic-navy"
                    >
                      Private Client program
                    </Link>{' '}
                    for the properties you can't always be at.
                  </p>
                </div>
              </article>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowWeQuotePage;