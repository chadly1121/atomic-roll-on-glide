import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { businessInfo } from '@/data/businessInfo';
import { Shield, Star, Award, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';

const CareersPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "url": `${siteUrl}/careers`,
        "name": "Careers | Roll On Painting | Join Muskoka's Elite Painters",
        "isPartOf": { "@id": `${siteUrl}/#website` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${siteUrl}/` },
            { "@type": "ListItem", "position": 2, "name": "Careers", "item": `${siteUrl}/careers` }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#localbusiness`,
        "name": businessInfo.name,
        "employee": {
          "@type": "EmployeeRole",
          "description": "Professional painter positions available for experienced, detail-oriented craftspeople."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{"Careers | Join Muskoka's Elite Painting Team | Roll On Painting"}</title>
        <meta name="description" content="Think you have what it takes? Roll On Painting only hires the best. We're looking for elite craftspeople who share our obsession with perfection. Apply now." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/careers`} />
        <meta property="og:title" content="Careers | Roll On Painting — We Don't Hire Just Anyone" />
        <meta property="og:description" content="We're not for everyone. Roll On Painting hires only the most dedicated, skilled painters in Muskoka. Think you qualify?" />
        <meta property="og:url" content={`${siteUrl}/careers`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="careers" />

        <main className="pt-16">
          {/* Hero — Bold, Exclusive Tone */}
          <section className="bg-gradient-to-b from-atomic-navy via-atomic-navy to-atomic-navy/95 text-white py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-white/20" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-white/10" />
            </div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-block px-4 py-1.5 bg-atomic-coral/20 text-atomic-coral text-sm font-bold uppercase tracking-widest rounded-full mb-6">
                Now Accepting Applications
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                We Don't Hire<br />
                <span className="text-atomic-turquoise">Just Anyone.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-4 font-light">
                Roll On Painting is Muskoka's premier painting company. Our reputation took 25 years to build. We protect it by only working with the best.
              </p>
              <p className="text-white/50 text-sm max-w-lg mx-auto">
                If you think you belong on our team, read on. If you're looking for an easy job, this isn't the place.
              </p>
            </div>
          </section>

          {/* The Standard */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-atomic-navy mb-4">The Roll On Standard</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We've been featured on HGTV. We carry $5 million in insurance. We offer Free Touch Ups for Life on every project. That level of commitment requires a certain kind of person.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* What We Expect */}
                <div className="bg-atomic-navy/5 border border-atomic-navy/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-atomic-navy mb-6 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-atomic-turquoise" />
                    What We Look For
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Obsessive attention to detail — you notice what others miss",
                      "Minimum 3 years professional painting experience",
                      "Pride in your craft — you'd put your name on every wall you touch",
                      "Reliability that's non-negotiable — on time, every time",
                      "Physical fitness — this is demanding, hands-on work",
                      "Valid driver's licence and reliable transportation",
                      "Professional demeanour — you're in clients' homes",
                      "Team-first mentality — ego stays at the door",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-atomic-turquoise flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Won't Tolerate */}
                <div className="bg-atomic-coral/5 border border-atomic-coral/10 rounded-xl p-8">
                  <h3 className="text-xl font-bold text-atomic-navy mb-6 flex items-center gap-2">
                    <XCircle className="w-6 h-6 text-atomic-coral" />
                    What We Won't Tolerate
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Cutting corners — ever, for any reason",
                      "No-shows or chronic lateness",
                      "Disrespect toward clients, their property, or teammates",
                      "Sloppy work that doesn't meet our standard",
                      "'Good enough' attitude — we don't do good enough",
                      "Phone addicts on the job site",
                      "Drama, gossip, or negativity",
                      "Anyone who treats painting as 'just a job'",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <XCircle className="w-4 h-4 text-atomic-coral flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Why Join Us */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-atomic-navy mb-4">If You Make the Cut</h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  The standards are high, but so are the rewards. Here's what our team members get.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Star, title: "Competitive Pay", desc: "Top-tier compensation based on skill and experience. We pay for talent, not warm bodies." },
                  { icon: Shield, title: "Full Coverage", desc: "WSIB covered with $5 million liability insurance. You work safe, always." },
                  { icon: Award, title: "HGTV Credibility", desc: "Tell people you work for the company featured 4 times on Scott's Vacation House Rules." },
                  { icon: CheckCircle, title: "Steady Work", desc: "Year-round projects across Muskoka. No seasonal layoffs for our core team." },
                  { icon: Star, title: "Skills Development", desc: "Learn advanced techniques: GoNano coatings, epoxy, spray finishing, and more." },
                  { icon: Shield, title: "Respect & Autonomy", desc: "We trust our people. No micromanagement — just clear expectations and support." },
                ].map((perk, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm border border-border">
                    <perk.icon className="w-8 h-8 text-atomic-turquoise mb-3" />
                    <h3 className="font-bold text-atomic-navy mb-2">{perk.title}</h3>
                    <p className="text-sm text-muted-foreground">{perk.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Positions */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl font-bold text-atomic-navy text-center mb-4">Open Positions</h2>
              <p className="text-center text-muted-foreground mb-10">
                We don't always have openings. When we do, we're selective. If you see a position below, move fast.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Lead Painter",
                    type: "Full-Time",
                    desc: "5+ years experience. You'll run job sites, manage prep, and deliver flawless results. Must have leadership skills and encyclopedic paint knowledge.",
                  },
                  {
                    title: "Journeyman Painter",
                    type: "Full-Time",
                    desc: "3+ years experience. Interior and exterior residential painting. You know the difference between a good cut line and a perfect one — and you only do perfect.",
                  },
                  {
                    title: "Apprentice Painter",
                    type: "Full-Time / Seasonal",
                    desc: "1+ years experience or relevant training. Eager to learn, willing to work hard, and ready to be mentored by the best. Attitude matters more than your resume.",
                  },
                  {
                    title: "GoNano / Specialty Coatings Technician",
                    type: "Full-Time",
                    desc: "Experience with nanotechnology coatings, epoxy, or spray finishing preferred. We'll train the right person on GoNano application — but you need a strong painting foundation.",
                  },
                ].map((position, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm border border-border hover:border-atomic-turquoise/30 transition-colors">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-atomic-navy text-lg">{position.title}</h3>
                      <span className="text-xs font-medium px-2.5 py-1 bg-atomic-turquoise/10 text-atomic-turquoise rounded-full">{position.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{position.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Chad's Message */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-atomic-navy mb-6">A Message From Chad</h2>
              <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-atomic-turquoise pl-6 text-left">
                <p className="mb-4">
                  "I built Roll On Painting on a simple principle: do exceptional work for good people, and stand behind it. That means I need exceptional people on my team.
                </p>
                <p className="mb-4">
                  I'm not looking for painters. I'm looking for craftspeople who take personal pride in every brush stroke, every cut line, every finished room. People who treat a client's cottage like it's their own home.
                </p>
                <p>
                  If that sounds like you, I want to hear from you. If it doesn't, I respect that — but this isn't the right fit."
                </p>
              </blockquote>
              <p className="mt-4 font-semibold text-atomic-navy">— Chad Gilchrist, Owner</p>
            </div>
          </section>

          {/* Apply CTA */}
          <section className="py-20 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">Think You Qualify?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Send us your resume and a brief note about why you belong on this team. No generic applications — tell us what makes you different.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${businessInfo.email}?subject=Career%20Application%20-%20Roll%20On%20Painting&body=Hi%20Chad%2C%0A%0AI'm%20interested%20in%20joining%20the%20Roll%20On%20Painting%20team.%0A%0APosition%20I'm%20applying%20for%3A%20%0AYears%20of%20experience%3A%20%0AWhy%20I%20belong%20on%20this%20team%3A%20%0A%0APlease%20find%20my%20resume%20attached.`}
                  className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Apply Now
                </a>
                <a href={`tel:${businessInfo.phone.tel}`} className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" />
                  Call {businessInfo.phone.formatted}
                </a>
              </div>
              <p className="text-white/40 text-xs mt-6">
                Roll On Painting is an equal opportunity employer. All qualified applicants will receive consideration.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CareersPage;
