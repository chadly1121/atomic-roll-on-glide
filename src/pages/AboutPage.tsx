import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";
  const heroImg = "/lovable-uploads/interior-modern-cottage-living.webp";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/about/#webpage`,
        "url": `${siteUrl}/about`,
        "name": "About Chad Gilchrist — Roll On Painting",
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "about": { "@id": `${siteUrl}/#localbusiness` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "About", "item": `${siteUrl}/about` }
          ]
        }
      },
      {
        "@type": "Person",
        "name": "Chad Gilchrist",
        "jobTitle": "Owner",
        "worksFor": { "@id": `${siteUrl}/#localbusiness` },
        "sameAs": ["https://ca.linkedin.com/in/chad-gilchrist-25332b104"],
        "description": "Owner of Roll On Painting, Muskoka's cottage painting specialist since 1999."
      }
    ]
  };

  const Divider = () => (
    <div className="my-12 md:my-16 flex justify-center" aria-hidden="true">
      <div className="h-px w-32 bg-atomic-orange" />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>About Chad Gilchrist — Roll On Painting</title>
        <meta
          name="description"
          content="Chad Gilchrist runs Roll On Painting in Port Sydney, Ontario. He built a cottage on a Muskoka island with his own hands. He paints yours like he built it."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/about`} />
        <meta property="og:title" content="About Chad Gilchrist — Roll On Painting" />
        <meta
          property="og:description"
          content="Chad Gilchrist runs Roll On Painting in Port Sydney, Ontario. He built a cottage on a Muskoka island with his own hands. He paints yours like he built it."
        />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="about" />

        <main className="pt-16">
          {/* Hero */}
          <section
            className="relative min-h-[55vh] md:min-h-[65vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImg})` }}
          >
            <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
            <div className="relative container mx-auto px-4 text-center py-20">
              <h1 className="font-display text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto">
                I'm Chad Gilchrist. I run Roll On Painting.
              </h1>
            </div>
          </section>

          {/* Body */}
          <section className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <article className="max-w-3xl mx-auto text-atomic-navy">
                <p className="text-lg leading-relaxed mb-10">
                  I started this letter a dozen times trying to figure out how to introduce myself without it sounding like every other contractor's About page. Eventually I gave up on trying to be impressive. So here's the actual story.
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  I'm a cottager who happens to paint for a living.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  In 2001 I sold my first house in Barrie, took every dollar of equity, and bought a dilapidated 12-by-30 bunky on 6 Mile Lake. The locals called it "the hot dog stand." It had no plumbing and a population of mice. I'd been going to that lake for ten years already — my best friend from university was on it — so when I asked his parents at Thanksgiving if anything was for sale, the hot dog stand was the answer.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  Thirty people from 6 Mile Lake came to my wedding in 2006.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  Between 2007 and 2010, I built our next cottage on a Muskoka island with my own hands. Drilling. Pinning. Framing. Finishing. Five hundred bags of concrete, mixed by hand. Every two-by-four, every nail, every bag of mortar arrived by pontoon boat. It took three years.
                </p>
                <p className="text-lg leading-relaxed mb-10">
                  I tell you this not because it's relevant to painting your cottage. I tell you this so you know I understand what your place actually is. I have lived the boat-only access. I have planned a project around dock season. I have lost a Saturday to a thunderstorm with mortar half-set. <strong>I'm not pretending to know what cottages are. I know.</strong>
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  Roll On Painting is older than my career here.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  The brand was founded in 1999 by Bob, a respected Muskoka painter whose name still comes up at job sites. Around 2004, Bob sold to Central Painting — a much larger commercial operation in Barrie where I'd worked for years as a project manager, running large jobs like Loblaws Queens Quay and a 12-storey exterior repaint of the Holiday Inn Burlington.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  In 2014, Central was scaling fast and the residential side had become a distraction. I made an offer: I'd buy 85%, leave Central with 15%, and pay full price as if I were buying 100%. The structure kept Central's 25-year supplier relationships intact. Today I run the company my way — my books, my crew, my standards — and the relationships compound quietly in the background.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  That same year, my wife Erin started her master's at U of T in speech-language pathology. We had two young daughters. To support our family while she studied, I doubled down on Roll On and never looked back.
                </p>
                <p className="text-lg leading-relaxed mb-10">
                  In 2016, my Barrie company — Missed A Spot Painting — was absorbed into Roll On. The crew, the trucks, the equipment, the institutional knowledge from twenty years of commercial work all came north with me.
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  What we've built since then.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  A 2,000 square foot prefinishing shop in Port Sydney, with a 4,000 square foot facility coming online this fall. $100,000 worth of European spray equipment, sourced direct from Sansin. A factory-direct relationship with PPG that lets us offer a 15-year manufacturer-backed warranty on qualifying projects. A soft-wash rig that handles prep and maintenance cleaning the right way.
                </p>
                <p className="text-lg leading-relaxed mb-5">
                  My crew is unusually mixed for a painting company — men, women, several painters from the Philippines, my own daughter, all on the tools. The younger ones tell me I'm "such a dad," which I take as a compliment. We hired the right people. We got the result we got.
                </p>
                <p className="text-lg leading-relaxed mb-8">
                  Day-to-day on the tools and in the truck is Kevin, our foreman, who I trust to call my own number when something needs my eyes. Reggie, Baldo, and Jesser arrived from the Philippines in October 2023 after a two-year LMIA process — Reggie spent five years on the Burj Khalifa in Dubai, staining and clear-coating thirty floors of the world's tallest building. Operations are run from the Philippines by Leonardo, a graduated architect who handles takeoffs, scheduling, and most of what happens behind the scenes.
                </p>

                <p className="font-display text-2xl md:text-3xl text-atomic-navy font-semibold mb-4">
                  I am not a one-man show. Roll On is a real company.
                </p>

                <Divider />

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  The standard.
                </h2>

                <p className="text-lg leading-relaxed mb-8">
                  There's a line my crew has heard from me a thousand times. It comes out at the end of a long day, when something isn't right, and someone is hoping I won't notice:
                </p>

                <blockquote className="my-10 border-l-4 border-atomic-orange bg-atomic-orange/5 px-6 py-6 md:px-10 md:py-8 rounded-r-lg">
                  <p className="font-display italic text-atomic-navy text-2xl md:text-3xl leading-snug">
                    "Guys, we can't leave this. It has to be perfect. I will never be upset for doing too much. You know this. Sand it off and start over if you need to."
                  </p>
                </blockquote>

                <p className="text-lg leading-relaxed mb-10">
                  Most of my crew can recite it back to me word for word. With a new hire, I usually only need to say it once or twice — after that, the rest of the team holds them to it. Everyone here actually likes the goal. That's how I know it's working.
                </p>

                <h2 className="font-display text-3xl md:text-4xl text-atomic-navy mb-6">
                  Where I am, and where I'm going.
                </h2>

                <p className="text-lg leading-relaxed mb-5">
                  I live in Barrie with Erin and our two daughters. Erin is a speech-language pathologist at Royal Victoria in stroke rehab. Our oldest, Lockett — named for my mother's maiden name — is at UBC Okanagan and just finished her first year with an 86 average. <strong>This summer is her third summer working with me at Roll On.</strong> There's no greater test of a company than whether your own kid wants to come back to the truck.
                </p>
                <p className="text-lg leading-relaxed mb-10">
                  I commute the hour from Barrie to Port Sydney. I'd rather drive that hour than have Erin drive any hour. We sold our last cottage at the start of COVID and paid off our home with the proceeds. We're debt-free, looking for the right piece of land, and we'll build the next one when we find it.
                </p>

                <p className="font-display text-3xl md:text-4xl text-atomic-navy font-semibold text-center my-12">
                  In the meantime, I'm painting yours.
                </p>

                <Divider />

                <div className="text-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center bg-atomic-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-atomic-orange/90 transition-colors shadow-lg"
                  >
                    Book a Cottage Consultation
                  </Link>
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

export default AboutPage;