import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Shield, Eye, Clock, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { businessInfo } from '@/data/businessInfo';
import GTACottageOwnersBlock from '@/components/conversion/GTACottageOwnersBlock';
import heroImage from '@/assets/private-client-hero.jpg';

const siteUrl = "https://www.roll-onpainting.com";
const pageUrl = `${siteUrl}/private-client-muskoka-property-care`;

const PrivateClientPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyLocation: '',
    ownsCottage: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, show confirmation. Integration with edge function can be added.
    setSubmitted(true);
  };

  const scrollToAccess = () => {
    document.getElementById('access-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Roll-On Private Client | Muskoka Property Care",
    "description": "Fully managed exterior property care for high-value Muskoka cottages. Limited client capacity. Discreet, proactive, and reliable.",
    "url": pageUrl,
    "isPartOf": { "@id": `${siteUrl}/#website` },
  };

  return (
    <>
      <Helmet>
        <title>Private Client — Muskoka Property Care | Roll On Painting</title>
        <meta name="description" content="Fully managed exterior property care for high-value Muskoka cottages. Limited client capacity. Discreet, proactive, and reliable." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Roll-On Private Client | Muskoka Property Care" />
        <meta property="og:description" content="A fully managed approach to your Muskoka property. For homeowners who prefer not to manage exterior maintenance." />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={heroImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[hsl(220,20%,8%)] text-[hsl(0,0%,88%)]">

        {/* ─── SECTION 1: HERO ─── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <img
            src={heroImage}
            alt="Luxury Muskoka lakefront cottage at dusk"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,20%,8%)] via-[hsl(220,20%,8%,0.7)] to-[hsl(220,20%,8%,0.4)]" />
          <div className="absolute top-6 left-6 z-20">
            <Link to="/" className="text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,88%)] transition-colors text-sm tracking-widest uppercase">
              Roll On Painting
            </Link>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <p className="text-[hsl(0,0%,50%)] text-xs tracking-[0.3em] uppercase mb-8">Private Client</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-white mb-6">
              A Fully Managed Approach<br className="hidden sm:block" /> to Your Muskoka Property
            </h1>
            <p className="text-lg sm:text-xl text-[hsl(0,0%,60%)] font-light mb-4">
              For homeowners who prefer not to manage exterior maintenance.
            </p>
            <p className="text-sm text-[hsl(0,0%,45%)] max-w-xl mx-auto mb-12 leading-relaxed">
              We work with a limited number of clients each season to maintain, restore, and protect Muskoka properties—without requiring your time or presence.
            </p>
            <button
              onClick={scrollToAccess}
              className="inline-flex items-center gap-3 border border-[hsl(0,0%,30%)] text-[hsl(0,0%,80%)] px-8 py-4 text-sm tracking-widest uppercase hover:border-[hsl(0,0%,50%)] hover:text-white transition-all duration-500"
            >
              Request Private Client Access
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(220,20%,8%)] to-transparent" />
        </section>

        {/* ─── SECTION 2: WHO THIS IS FOR ─── */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[hsl(0,0%,40%)] text-xs tracking-[0.3em] uppercase mb-6">Who This Is For</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-12 tracking-tight">
              Designed for Property Owners<br className="hidden sm:block" /> Who Expect More
            </h2>
            <p className="text-[hsl(0,0%,55%)] mb-10 leading-relaxed">
              This service is built for homeowners who:
            </p>
            <ul className="space-y-5 mb-12">
              {[
                'Own high-value cottages in Muskoka',
                'Have limited time to manage trades',
                'Expect consistency, discretion, and reliability',
                'Prefer one trusted provider over multiple contractors',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full border border-[hsl(0,0%,25%)] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[hsl(0,0%,50%)]" />
                  </div>
                  <span className="text-[hsl(0,0%,70%)] text-lg font-light">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[hsl(0,0%,45%)] text-sm italic border-l border-[hsl(0,0%,20%)] pl-6">
              Most of our clients are not present during the work—and prefer it that way.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-xs mx-auto border-t border-[hsl(0,0%,15%)]" />

        {/* ─── SECTION 3: WHAT WE HANDLE ─── */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[hsl(0,0%,40%)] text-xs tracking-[0.3em] uppercase mb-6">What We Handle</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
              Complete Exterior Property Care
            </h2>
            <p className="text-[hsl(0,0%,55%)] mb-12 leading-relaxed">
              We take responsibility for the ongoing condition of your property's exterior.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Eye, label: 'Annual inspections and condition reporting' },
                { icon: Shield, label: 'Exterior painting and staining systems' },
                { label: 'Deck, dock, and siding maintenance' },
                { label: 'Seasonal touch-ups and repairs' },
                { icon: Clock, label: 'Long-term maintenance planning' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 border border-[hsl(0,0%,14%)] bg-[hsl(220,18%,10%)]">
                  <div className="w-1 h-8 bg-[hsl(0,0%,22%)] rounded-full flex-shrink-0 mt-0.5" />
                  <span className="text-[hsl(0,0%,65%)] font-light">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[hsl(0,0%,45%)] text-sm tracking-wide">
              Everything is handled proactively, not reactively.
            </p>
          </div>
        </section>

        <div className="max-w-xs mx-auto border-t border-[hsl(0,0%,15%)]" />

        {/* ─── SECTION 4: HOW IT WORKS ─── */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[hsl(0,0%,40%)] text-xs tracking-[0.3em] uppercase mb-6">Process</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-16 tracking-tight">
              Simple, Controlled, Reliable
            </h2>
            <div className="space-y-0">
              {[
                'Initial consultation — photos, call, or walkthrough',
                'Property assessment and maintenance plan',
                'Scheduled work aligned with your usage',
                'Execution with documented updates',
                'Completion without disruption',
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-6 py-6 border-b border-[hsl(0,0%,13%)] last:border-0">
                  <span className="text-[hsl(0,0%,25%)] text-sm font-mono mt-0.5 w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[hsl(0,0%,65%)] font-light text-lg">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-xs mx-auto border-t border-[hsl(0,0%,15%)]" />

        {/* ─── SECTION 5: ACCESS ─── */}
        <section className="py-24 md:py-32">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[hsl(0,0%,20%)] mb-8">
              <Users className="w-5 h-5 text-[hsl(0,0%,40%)]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-8 tracking-tight">
              Limited Client Capacity
            </h2>
            <p className="text-[hsl(0,0%,55%)] leading-relaxed mb-4">
              We intentionally limit the number of properties we manage each season to maintain quality and responsiveness.
            </p>
            <p className="text-[hsl(0,0%,40%)] text-sm">
              Access is offered to select clients or by request.
            </p>
          </div>
        </section>

        <div className="max-w-xs mx-auto border-t border-[hsl(0,0%,15%)]" />

        {/* ─── SECTION 6: CTA FORM ─── */}
        <section id="access-form" className="py-24 md:py-32">
          <div className="max-w-xl mx-auto px-6">
            <p className="text-[hsl(0,0%,40%)] text-xs tracking-[0.3em] uppercase mb-6 text-center">Apply</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-12 tracking-tight text-center">
              Request Access
            </h2>

            {submitted ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 rounded-full border border-[hsl(0,0%,25%)] flex items-center justify-center mx-auto mb-6">
                  <Check className="w-5 h-5 text-[hsl(0,0%,60%)]" />
                </div>
                <p className="text-white text-lg font-light mb-3">Thank you for your inquiry.</p>
                <p className="text-[hsl(0,0%,45%)] text-sm">We'll be in touch within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="pc-name" className="text-[hsl(0,0%,50%)] text-xs tracking-widest uppercase">Name</Label>
                  <Input
                    id="pc-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 bg-transparent border-[hsl(0,0%,18%)] text-white placeholder:text-[hsl(0,0%,30%)] focus:border-[hsl(0,0%,35%)] rounded-none h-12"
                    placeholder=""
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="pc-email" className="text-[hsl(0,0%,50%)] text-xs tracking-widest uppercase">Email</Label>
                    <Input
                      id="pc-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-transparent border-[hsl(0,0%,18%)] text-white placeholder:text-[hsl(0,0%,30%)] focus:border-[hsl(0,0%,35%)] rounded-none h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pc-phone" className="text-[hsl(0,0%,50%)] text-xs tracking-widest uppercase">Phone</Label>
                    <Input
                      id="pc-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-2 bg-transparent border-[hsl(0,0%,18%)] text-white placeholder:text-[hsl(0,0%,30%)] focus:border-[hsl(0,0%,35%)] rounded-none h-12"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="pc-location" className="text-[hsl(0,0%,50%)] text-xs tracking-widest uppercase">Property Location <span className="normal-case text-[hsl(0,0%,35%)]">(city + lake if applicable)</span></Label>
                  <Input
                    id="pc-location"
                    name="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    className="mt-2 bg-transparent border-[hsl(0,0%,18%)] text-white placeholder:text-[hsl(0,0%,30%)] focus:border-[hsl(0,0%,35%)] rounded-none h-12"
                    placeholder=""
                  />
                </div>
                <div>
                  <Label htmlFor="pc-owns" className="text-[hsl(0,0%,50%)] text-xs tracking-widest uppercase">Do you own a Muskoka cottage?</Label>
                  <select
                    id="pc-owns"
                    name="ownsCottage"
                    value={formData.ownsCottage}
                    onChange={handleChange}
                    className="mt-2 w-full bg-transparent border border-[hsl(0,0%,18%)] text-white h-12 px-3 text-sm focus:border-[hsl(0,0%,35%)] focus:outline-none appearance-none"
                  >
                    <option value="" className="bg-[hsl(220,20%,10%)]">Select</option>
                    <option value="yes" className="bg-[hsl(220,20%,10%)]">Yes</option>
                    <option value="no" className="bg-[hsl(220,20%,10%)]">No</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="pc-message" className="text-[hsl(0,0%,50%)] text-xs tracking-widest uppercase">Tell us about your property</Label>
                  <Textarea
                    id="pc-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="mt-2 bg-transparent border-[hsl(0,0%,18%)] text-white placeholder:text-[hsl(0,0%,30%)] focus:border-[hsl(0,0%,35%)] rounded-none resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full border border-[hsl(0,0%,25%)] text-[hsl(0,0%,80%)] py-4 text-sm tracking-widest uppercase hover:border-[hsl(0,0%,45%)] hover:text-white transition-all duration-500"
                >
                  Submit Private Client Request
                </button>
                <p className="text-[hsl(0,0%,35%)] text-xs text-center mt-4">
                  All inquiries handled directly and confidentially.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ─── COMMON CLIENT LOCATIONS ─── */}
        <GTACottageOwnersBlock variant="dark" heading="Common client locations" />

        {/* ─── SECTION 7: FOOTER ─── */}
        <footer className="py-16 border-t border-[hsl(0,0%,12%)]">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="text-[hsl(0,0%,35%)] text-sm leading-relaxed mb-6">
              Serving property owners across Muskoka including Lake Joseph, Lake Rosseau, and Lake Muskoka, with many clients based in Toronto and the GTA.
            </p>
            <Link to="/" className="text-[hsl(0,0%,30%)] text-xs tracking-widest uppercase hover:text-[hsl(0,0%,50%)] transition-colors">
              Roll On Painting
            </Link>
            <p className="text-[hsl(0,0%,20%)] text-xs mt-4">
              © {new Date().getFullYear()} {businessInfo.legalName}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PrivateClientPage;
