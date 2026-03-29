import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Tv, BookOpen, Phone, Mail, Shield, Award, Star, ChevronRight } from 'lucide-react';
import { docksideArticles, DOCKSIDE_TAG_URL } from '@/data/docksideArticles';
import { businessInfo } from '@/data/businessInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.roll-onpainting.com';
const ogImage = 'https://res.cloudinary.com/dxqfou8jh/image/upload/f_auto,q_80,w_1200/v1745866797/IMG_20190920_121835_fchin4.jpg';

// HGTV appearances data
const hgtvAppearances = [
  {
    season: "Season 5",
    episode: "The Rugged Family Retreat",
    description: "Full interior and exterior painting for a rustic Muskoka family cottage transformation.",
    services: ["Interior Painting", "Exterior Painting"],
  },
  {
    season: "Season 4",
    episode: "The Lake of Bays Lodge",
    description: "Complete wallpaper installation and accent wall painting for a lakefront lodge renovation.",
    services: ["Wallpaper Installation", "Interior Painting"],
  },
  {
    season: "Season 3",
    episode: "The Port Carling Getaway",
    description: "Exterior painting and deck staining to transform a classic Muskoka waterfront property.",
    services: ["Exterior Painting", "Deck Staining"],
  },
  {
    season: "Season 2",
    episode: "The Bracebridge Bungalow",
    description: "Interior painting and cabinet refinishing for a charming cottage bungalow makeover.",
    services: ["Interior Painting", "Cabinet Refinishing"],
  },
];

// Group Dockside articles by brand
const rollOnArticles = docksideArticles.filter(a => a.brand === 'Roll-On Painting' || a.brand === 'Roll-On Painting & Muskoka Softwash');
const softwashArticles = docksideArticles.filter(a => a.brand === 'Muskoka Softwash' || a.brand === 'Roll-On Painting & Muskoka Softwash');

// Service slug to display name
const serviceSlugToName: Record<string, string> = {
  'interior-painting': 'Interior Painting',
  'exterior-painting': 'Exterior Painting',
  'commercial-painting': 'Commercial Painting',
  'cabinet-refinishing': 'Cabinet Refinishing',
  'deck-staining': 'Deck & Fence Staining',
  'power-washing': 'Power & Soft Washing',
  'wallpaper-installation': 'Wallpaper Installation',
};

const MediaPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/media#webpage`,
        "url": `${siteUrl}/media`,
        "name": "In The Media — Roll On Painting | HGTV & Dockside Magazine",
        "description": "Roll On Painting has been featured 4 times on HGTV's Scott's Vacation House Rules and 15 times in Dockside Magazine. Muskoka's most recognized painting contractor.",
        "isPartOf": { "@id": `${siteUrl}#website` },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
            { "@type": "ListItem", "position": 2, "name": "In The Media", "item": `${siteUrl}/media` }
          ]
        }
      },
      {
        "@type": "TVSeries",
        "name": "Scott's Vacation House Rules",
        "description": "Roll On Painting has appeared 4 times on this HGTV Canada home renovation show filmed in the Muskoka region.",
        "productionCompany": { "@type": "Organization", "name": "HGTV Canada" },
        "actor": { "@type": "Person", "name": "Scott McGillivray" },
        "url": "https://www.hgtv.ca/shows/scotts-vacation-house-rules/"
      },
      ...docksideArticles.map(article => ({
        "@type": "Article",
        "headline": article.title,
        "url": article.url,
        "publisher": {
          "@type": "Organization",
          "name": "Dockside Magazine",
          "url": "https://www.docksidepublishing.com"
        },
        "about": {
          "@type": "LocalBusiness",
          "name": "Roll On Painting",
          "url": siteUrl
        }
      }))
    ]
  };

  return (
    <>
      <Helmet>
        <title>In The Media — Roll On Painting | HGTV & Dockside Magazine Features</title>
        <meta name="description" content="Roll On Painting featured 4 times on HGTV's Scott's Vacation House Rules and 15 times in Dockside Magazine. Muskoka's most recognized painting contractor." />
        <meta name="keywords" content="Roll On Painting HGTV, Roll On Painting Dockside Magazine, Muskoka painter TV, Scott's Vacation House Rules painting, Muskoka Softwash media, painters Muskoka featured" />
        <link rel="canonical" href={`${siteUrl}/media`} />

        <meta property="og:title" content="In The Media — Roll On Painting | HGTV & Dockside Magazine" />
        <meta property="og:description" content="Featured 4 times on HGTV and 15 times in Dockside Magazine. Meet Muskoka's most recognized painting team." />
        <meta property="og:url" content={`${siteUrl}/media`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="In The Media — Roll On Painting" />
        <meta name="twitter:description" content="Featured 4x on HGTV and 15x in Dockside Magazine." />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navbar activeSection="" />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors mb-8 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold tracking-wider uppercase">
                  Press & Media
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                In The Media
              </h1>
              <p className="text-lg md:text-xl text-background/80 max-w-2xl leading-relaxed">
                Roll On Painting is Muskoka's most featured painting contractor — recognized{' '}
                <strong className="text-primary">4 times on HGTV</strong> and{' '}
                <strong className="text-primary">15 times in Dockside Magazine</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary text-primary-foreground py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold">4×</div>
                <div className="text-sm opacity-90">HGTV Appearances</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">15×</div>
                <div className="text-sm opacity-90">Dockside Features</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">25+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">{businessInfo.ratings.average}★</div>
                <div className="text-sm opacity-90">Google Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* HGTV Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Tv className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Television</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                As Seen on HGTV
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
                Roll On Painting has been the go-to painting team for{' '}
                <strong>Scott's Vacation House Rules</strong> on HGTV Canada (Home Network),
                delivering flawless finishes on Muskoka cottage transformations.
              </p>

              <div className="space-y-6">
                {hgtvAppearances.map((appearance, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-primary font-bold text-sm">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {appearance.season}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">
                            {appearance.episode}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-3">{appearance.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {appearance.services.map(service => (
                            <span
                              key={service}
                              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dockside Magazine Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Print Media</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured in Dockside Magazine
              </h2>
              <p className="text-muted-foreground text-lg mb-4 max-w-2xl">
                Dockside Magazine is Muskoka's premier cottage and lifestyle publication, trusted by
                cottage owners and year-round residents across the region. Roll On Painting and Muskoka
                Softwash have been featured <strong>15 times</strong> since 2022.
              </p>
              <a
                href={DOCKSIDE_TAG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm mb-10 transition-colors"
              >
                View all features on Dockside Publishing
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Roll On Painting articles */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary rounded-full" />
                  Roll On Painting Features
                </h3>
                <div className="grid gap-4">
                  {rollOnArticles.map((article, idx) => (
                    <a
                      key={idx}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {article.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          {article.issue && <span>{article.issue}</span>}
                          {article.brand === 'Roll-On Painting & Muskoka Softwash' && (
                            <span className="bg-accent/20 text-accent-foreground px-2 py-0.5 rounded text-xs">
                              + Muskoka Softwash
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {article.serviceSlugs.map(slug => (
                            <Link
                              key={slug}
                              to={`/${slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary px-2 py-0.5 rounded transition-colors"
                            >
                              {serviceSlugToName[slug] || slug}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Muskoka Softwash articles */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full" />
                  Muskoka Softwash Features
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Muskoka Softwash is a division of Roll On Painting, specializing in exterior soft washing and surface cleaning.
                </p>
                <div className="grid gap-4">
                  {softwashArticles.map((article, idx) => (
                    <a
                      key={idx}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <BookOpen className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                          {article.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          {article.issue && <span>{article.issue}</span>}
                          {article.brand === 'Roll-On Painting & Muskoka Softwash' && (
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                              + Roll On Painting
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                Why Muskoka Trusts Roll On Painting
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground text-sm">$5M Insured</div>
                  <div className="text-xs text-muted-foreground">Full liability coverage</div>
                </div>
                <div className="text-center p-4">
                  <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground text-sm">WSIB Covered</div>
                  <div className="text-xs text-muted-foreground">Worker protection</div>
                </div>
                <div className="text-center p-4">
                  <Star className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground text-sm">25+ Years</div>
                  <div className="text-xs text-muted-foreground">Industry experience</div>
                </div>
                <div className="text-center p-4">
                  <Tv className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="font-semibold text-foreground text-sm">19 Media Features</div>
                  <div className="text-xs text-muted-foreground">TV + print recognition</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Work with Muskoka's Most Recognized Painters
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Get the same quality you see on TV and in print. Contact us for a free estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-background text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-background/90 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Get a Free Quote
              </Link>
              <a
                href={`tel:${businessInfo.phone.tel}`}
                className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 border border-primary-foreground/30 font-semibold px-8 py-3 rounded-lg hover:bg-primary-foreground/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {businessInfo.phone.primary}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MediaPage;
