import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { businessInfo, verifiedFAQs } from '@/data/businessInfo';
import { Link } from 'react-router-dom';

const FAQPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "url": `${siteUrl}/faq`,
        "name": "FAQ | Roll On Painting | Muskoka",
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "FAQ", "item": `${siteUrl}/faq` }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": verifiedFAQs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Painting Questions Answered | Roll On Painting Muskoka</title>
        <meta name="description" content="Frequently asked questions about painting services in Muskoka. Pricing, insurance, services, GoNano coating, and more. Roll On Painting — 25+ years experience." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/faq`} />
        <meta property="og:title" content="FAQ | Roll On Painting Muskoka" />
        <meta property="og:description" content="Get answers to common painting questions. Pricing, services, insurance, and more." />
        <meta property="og:url" content={`${siteUrl}/faq`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="faq" />
        
        <main className="pt-16">
          <section className="bg-gradient-to-b from-atomic-navy to-atomic-navy/90 text-white py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Common questions about our painting services, pricing, insurance, and more. Can't find your answer? <Link to="/contact" className="text-atomic-turquoise hover:underline">Contact us</Link>.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="space-y-4">
                {verifiedFAQs.map((faq, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h2 className="font-semibold text-atomic-navy text-lg mb-3">{faq.question}</h2>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Additional Questions Section */}
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-atomic-navy text-center mb-8">More Questions</h2>
              <div className="space-y-4">
                {[
                  { q: "How long does a typical interior paint job take?", a: "Most interior rooms can be completed in 1-2 days. A full home interior typically takes 3-5 days depending on size and prep work needed. We'll give you a timeline with your free estimate." },
                  { q: "What paint brands do you use?", a: "We work with premium brands including Benjamin Moore, Dulux, PPG, and Sansin wood stains. We'll recommend the best product for your specific project and surface type." },
                  { q: "Do you provide color consultation?", a: "Yes. We can help you choose colours that complement your space, lighting, and style. We bring sample swatches and can create test patches so you can see colours in your actual environment." },
                  { q: "Do you paint during winter months?", a: "Yes, we perform interior painting year-round. Exterior projects are seasonal and depend on weather conditions. We'll plan your project timing for optimal results." },
                  { q: "What preparation work do you do before painting?", a: "Proper prep is key to a lasting finish. We clean surfaces, fill holes and cracks, sand rough areas, apply primer where needed, caulk gaps, and mask/protect areas not being painted." },
                  { q: "Do you move furniture?", a: "Yes. We move furniture to the centre of the room and cover it with protective cloths. For heavy or specialty items, we'll discuss the best approach with you beforehand." }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="font-semibold text-atomic-navy mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">We're happy to answer any questions about your painting project. Reach out anytime.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                  Contact Us
                </Link>
                <a href={`tel:${businessInfo.phone.tel}`} className="text-white/80 hover:text-white transition-colors">
                  Or call {businessInfo.phone.formatted}
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQPage;
