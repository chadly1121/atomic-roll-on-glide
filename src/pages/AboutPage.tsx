import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { businessInfo } from '@/data/businessInfo';
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, Shield, Star, Clock, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  const siteUrl = "https://www.roll-onpainting.com";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/about/#webpage`,
        "url": `${siteUrl}/about`,
        "name": "About Roll On Painting | Chad Gilchrist | Muskoka Painters",
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
        "description": "Owner of Roll On Painting with over 25 years of painting industry experience. Featured on HGTV's Scott's Vacation House Rules."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>About Roll On Painting | Chad Gilchrist | 25+ Years Experience</title>
        <meta name="description" content="Meet Chad Gilchrist, owner of Roll On Painting. Over 25 years of painting expertise serving Muskoka. As seen on HGTV. WSIB covered, $5M insured." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${siteUrl}/about`} />
        <meta property="og:title" content="About Roll On Painting | Muskoka's Trusted Painters" />
        <meta property="og:description" content="Meet the team behind Muskoka's premier painting service. 25+ years of experience, HGTV featured, WSIB covered." />
        <meta property="og:url" content={`${siteUrl}/about`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar activeSection="about" />
        
        <main className="pt-16">
          {/* Header */}
          <section className="pt-10 pb-6 md:pt-14 md:pb-8">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-atomic-navy mb-3">About Roll On Painting</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Muskoka's trusted painting company with over 25 years of industry expertise.</p>
              <div className="mx-auto mt-4 h-1 w-20 bg-atomic-turquoise rounded-full" />
            </div>
          </section>

          {/* Chad's Story */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h2 className="text-2xl font-bold text-atomic-navy mb-4">Meet Chad Gilchrist</h2>
                  <p className="text-muted-foreground mb-4">
                    Chad Gilchrist purchased Roll On Painting in 2014, bringing over 25 years of painting industry experience to Muskoka. What started as a small local operation has grown into one of the most trusted painting companies in Ontario's cottage country.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Chad's commitment to quality earned Roll On Painting <strong>4 appearances on HGTV's Scott's Vacation House Rules</strong>, providing professional painting and wallpapering services for Muskoka property renovations.
                  </p>
                  <p className="text-muted-foreground">
                    As an active member of the Painting Contractors Association, Chad stays at the forefront of techniques, materials, and industry standards. His philosophy is simple: do it right, stand behind your work, and treat every property like your own.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden shadow-lg h-40 sm:h-56">
                    <img src="/lovable-uploads/44c0f726-e327-4bd3-84f8-39856de74304.webp" alt="Roll On Painting team at work" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg h-40 sm:h-56 mt-8">
                    <img src="/lovable-uploads/dad95b14-ad28-4aab-ab8b-05f9a56458ec.webp" alt="Exterior painting project" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Key Facts */}
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Clock, label: "25+ Years", desc: "Industry experience" },
                  { icon: Shield, label: "$5M Insured", desc: "Full liability + WSIB" },
                  { icon: Star, label: `${businessInfo.ratings.average}/5 Stars`, desc: "Google Reviews" },
                  { icon: Award, label: "HGTV Featured", desc: "4x on Scott's Vacation House Rules" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-background p-6 rounded-lg shadow-sm text-center">
                    <item.icon className="w-8 h-8 text-atomic-turquoise mx-auto mb-3" />
                    <h3 className="font-bold text-atomic-navy text-lg">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-atomic-navy text-center mb-8">Our Values</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "Quality", desc: "We never compromise on materials or techniques. Every surface is prepared with care and every coat applied with precision." },
                  { title: "Integrity", desc: "Honest pricing, transparent communication, and no hidden fees. We quote fair and deliver as promised." },
                  { title: "Reliability", desc: "We show up on time, complete projects on schedule, and clean up when we're done. Your time matters." },
                  { title: "Community", desc: "We're not a franchise — we're your neighbours in Muskoka. We live here, work here, and take pride in improving our community." }
                ].map((value, idx) => (
                  <div key={idx} className="p-5 border border-border rounded-lg">
                    <h3 className="font-semibold text-atomic-navy mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact / Connect */}
          <section className="py-12 bg-muted/50">
            <div className="container mx-auto px-4 max-w-2xl text-center">
              <h2 className="text-2xl font-bold text-atomic-navy mb-6">Connect With Us</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-atomic-turquoise" />
                  <span className="text-muted-foreground">{businessInfo.address.full}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-atomic-turquoise" />
                  <a href={`tel:${businessInfo.phone.tel}`} className="text-muted-foreground hover:text-atomic-turquoise">{businessInfo.phone.formatted}</a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-atomic-turquoise" />
                  <a href={`mailto:${businessInfo.email}`} className="text-muted-foreground hover:text-atomic-turquoise">{businessInfo.email}</a>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                {[
                  { href: businessInfo.urls.instagram, label: "Instagram", icon: Instagram },
                  { href: businessInfo.urls.facebook, label: "Facebook", icon: Facebook },
                  { href: businessInfo.urls.linkedin, label: "LinkedIn", icon: Linkedin },
                ].map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full bg-atomic-turquoise flex items-center justify-center hover:bg-atomic-turquoise/80 transition-colors"
                    aria-label={social.label}>
                    <social.icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-atomic-navy text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Work With Us?</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">Get a free, no-obligation quote for your painting project.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-atomic-turquoise text-white px-8 py-3 rounded-lg font-medium hover:bg-atomic-turquoise/90 transition-colors">
                Get a Free Quote
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
