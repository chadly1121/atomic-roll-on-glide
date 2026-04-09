/**
 * Cottage Owner Pages — City-to-Muskoka landing pages
 *
 * Targeting affluent GTA homeowners who own Muskoka cottages.
 * These are NOT city painter pages — they're cottage-ownership-focused.
 */

export interface CottageOwnerPageData {
  slug: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  heroImage: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
}

// Muskoka-specific hero images from Wikimedia Commons
const HERO_IMGS = {
  portCarling: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Muskoka_Chairs_-_Port_Carling_-_Canada_%285159311050%29.jpg/1920px-Muskoka_Chairs_-_Port_Carling_-_Canada_%285159311050%29.jpg",
  windermere: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Windermere_House_%282%29_%2810576367376%29.jpg",
  lakeOfBays: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Dorset_Lookout_Tower%2C_ON.jpg/1920px-Dorset_Lookout_Tower%2C_ON.jpg",
};

export const cottageOwnerPages: CottageOwnerPageData[] = [
  {
    slug: "rosedale-muskoka-cottage-painting",
    cityName: "Rosedale",
    metaTitle: "Rosedale to Muskoka Cottage Painting | Roll-On Painting",
    metaDescription: "Own a cottage in Muskoka? We work with Rosedale homeowners to handle painting, staining, and maintenance while you're in the city.",
    headline: "Own a Cottage in Muskoka? We Handle It While You're in the City.",
    subheadline: "We work with homeowners in Rosedale to manage, paint, and maintain their Muskoka cottages—so it's ready before they arrive.",
    ctaText: "Get My Cottage Ready",
    heroImage: HERO_IMGS.portCarling,
    sections: [
      {
        heading: "For Rosedale Homeowners with Muskoka Properties",
        body: "Many of our clients live in Rosedale and own waterfront cottages across Muskoka — on Lake Joseph, Lake Rosseau, Lake Muskoka, and surrounding lakes. They don't have time to coordinate trades remotely, and they shouldn't have to. We handle everything on-site so your property is maintained to the standard you expect, without requiring your presence.",
      },
      {
        heading: "We Handle Everything So You Don't Have To",
        body: "From scheduling and access coordination to material selection and final walkthroughs, we manage the entire process. You'll receive photo updates at each stage. Whether you're in Rosedale for the week or travelling abroad, your cottage project moves forward on schedule.",
      },
      {
        heading: "Cottage Painting and Exterior Services in Muskoka",
        body: "Muskoka's climate demands a different approach than city properties. UV exposure, lake humidity, and freeze-thaw cycles break down coatings faster. We use exterior-grade systems designed for northern Ontario conditions — proper surface preparation, premium stains, and coatings that last. Services include exterior painting, deck and dock staining, siding maintenance, and seasonal touch-ups.",
      },
      {
        heading: "Trusted by Toronto Cottage Owners",
        body: "We've built our reputation by working with homeowners who expect reliability, discretion, and quality. Our clients don't want to manage multiple contractors — they want one team they can trust. That's what we provide. Over 25 years in the Muskoka painting industry, featured 5 times on HGTV.",
      },
      {
        heading: "Get It Done Before Cottage Season",
        body: "The best time to handle exterior work is before you arrive for the season. We plan and execute projects during spring and early summer so your property looks its best when you step off the dock. Book early — our schedule fills months in advance for cottage clients.",
      },
    ],
    faqs: [
      { question: "Can you do the work while I'm in Toronto?", answer: "Yes. Most of our GTA-based clients are not present during the work. We coordinate access, provide photo updates, and handle everything on-site." },
      { question: "Do you work on Lake Joseph and Lake Rosseau properties?", answer: "Absolutely. We serve all major Muskoka lakes including Lake Joseph, Lake Rosseau, Lake Muskoka, Lake of Bays, and surrounding waterfront communities." },
      { question: "How far in advance should I book?", answer: "We recommend booking 4–8 weeks ahead for cottage season work. Spring and early summer slots fill quickly with cottage clients." },
      { question: "Do you handle dock and deck staining as well?", answer: "Yes. We provide complete exterior care including dock staining, deck refinishing, siding painting, and seasonal maintenance." },
      { question: "Is there a minimum project size?", answer: "We focus on whole-property exterior care rather than small patch jobs. Most cottage projects include multiple surfaces — exterior walls, decks, docks, and trim." },
    ],
  },
  {
    slug: "oakville-muskoka-cottage-painting",
    cityName: "Oakville",
    metaTitle: "Oakville to Muskoka Cottage Painting | Roll-On Painting",
    metaDescription: "Own a Muskoka cottage? We help Oakville homeowners manage painting, staining, and maintenance while they're still in the city.",
    headline: "Own a Muskoka Cottage? We Keep It Ready.",
    subheadline: "We work with Oakville homeowners to handle painting, staining, and seasonal exterior maintenance for Muskoka properties.",
    ctaText: "Get My Cottage Ready",
    heroImage: HERO_IMGS.windermere,
    sections: [
      {
        heading: "For Oakville Homeowners with Muskoka Properties",
        body: "Oakville families with cottages on Lake Muskoka, Lake Rosseau, and Georgian Bay know the challenge: managing property maintenance from two hours away. We eliminate that burden. Our team handles everything on-site — inspections, preparation, painting, staining, and seasonal upkeep — so your cottage is maintained year-round without requiring your time.",
      },
      {
        heading: "We Manage Access, Scheduling, and Updates",
        body: "You don't need to be there. We coordinate with property managers, neighbours, or keyholders. You'll receive detailed photo documentation throughout the project and a final walkthrough report when work is complete. Communication is direct, clear, and on your schedule.",
      },
      {
        heading: "Exterior Services Built for Muskoka Weather",
        body: "Muskoka properties face conditions that city homes don't — harsh UV on south-facing lakefront walls, moisture from lake proximity, ice damage, and pine needle acid on decks. We apply systems engineered for these conditions. Proper preparation, premium exterior coatings, and finishes that hold up through Muskoka's four-season climate.",
      },
      {
        heading: "Trusted by GTA Cottage Owners",
        body: "Our clients in Oakville, Burlington, and across the GTA chose us because we deliver consistent results without the need for oversight. Over 25 years of experience in Muskoka. Featured 5 times on HGTV. WSIB covered and $5M insured.",
      },
      {
        heading: "Book Before the Season Starts",
        body: "The most efficient time to complete exterior work is before you arrive for summer. We schedule projects through spring and early summer so everything is finished before your first weekend up. Plan ahead — our cottage calendar fills months in advance.",
      },
    ],
    faqs: [
      { question: "Can you complete work while I'm in Oakville?", answer: "Yes. The majority of our cottage clients are not present during the work. We manage access, provide regular updates, and handle every detail on-site." },
      { question: "What lakes do you serve?", answer: "We work across all Muskoka lakes — Lake Muskoka, Lake Rosseau, Lake Joseph, Lake of Bays, Peninsula Lake, and surrounding waterfront areas." },
      { question: "How do you handle access to the property?", answer: "We coordinate with you, your property manager, or a trusted neighbour. Many clients provide a lockbox code or arrange key handoff before the project begins." },
      { question: "What exterior services do you offer for cottages?", answer: "Full exterior painting, deck and dock staining, siding maintenance, trim refinishing, seasonal touch-ups, and long-term maintenance planning." },
      { question: "How early should I book for summer?", answer: "We recommend contacting us by February or March to secure a spring or early summer start date. Cottage-season demand is high." },
    ],
  },
  {
    slug: "post-road-muskoka-cottage-painting",
    cityName: "Post Road",
    metaTitle: "Post Road to Muskoka Cottage Painting | Roll-On Painting",
    metaDescription: "Discreet, fully managed Muskoka cottage painting and maintenance for homeowners in Post Road and the Bridle Path.",
    headline: "We Maintain Your Muskoka Property — Without You Needing to Be There",
    subheadline: "Serving homeowners in Post Road and the Bridle Path with full-service cottage painting, staining, and maintenance.",
    ctaText: "Request Private Consultation",
    heroImage: HERO_IMGS.lakeOfBays,
    sections: [
      {
        heading: "For Homeowners Managing Multiple Properties",
        body: "Clients in Post Road and the Bridle Path often manage several properties. Your Muskoka cottage shouldn't require the same level of attention as your primary residence. We provide a fully managed service — one point of contact, proactive scheduling, and documented results — so your lakefront property stays in impeccable condition without adding to your workload.",
      },
      {
        heading: "A Fully Managed, Hands-Off Process",
        body: "From initial property assessment to final completion, we handle every detail. Access coordination, material procurement, scheduling around your usage, photo documentation, and completion reporting. The process is discreet, efficient, and designed for clients who value their time above all else.",
      },
      {
        heading: "Exterior Finishing and Maintenance in Muskoka",
        body: "Muskoka waterfront properties require specialized exterior systems. Sun exposure on lake-facing elevations, moisture from proximity to water, and seasonal freeze-thaw cycles demand coatings and preparation that generic contractors overlook. We apply premium, weather-specific finishing systems — from cedar-compatible stains to high-durability exterior paints — with proper substrate preparation that ensures longevity.",
      },
      {
        heading: "Trusted by Toronto's Cottage Owners",
        body: "Our clients expect a level of professionalism and discretion that matches the properties they own. We've earned that trust over 25 years of service in Muskoka, including 5 appearances on HGTV. Fully insured with $5M liability coverage and WSIB-covered crews.",
      },
      {
        heading: "Prepared Before the Season Begins",
        body: "The ideal window for exterior work is before you arrive for the season. We plan projects months in advance and execute during spring and early summer, ensuring your property is pristine for your first visit. Early booking is recommended — our private client schedule is limited.",
      },
    ],
    faqs: [
      { question: "Is the service fully managed?", answer: "Yes. We handle access, scheduling, materials, execution, and reporting. You receive photo updates and a completion summary. No on-site presence is required." },
      { question: "Do you work on Lake Joseph waterfront properties?", answer: "Yes. We serve properties across Lake Joseph, Lake Rosseau, Lake Muskoka, and all surrounding Muskoka waterfront communities." },
      { question: "How do you ensure discretion?", answer: "We work directly with you or your property manager. Our crews are professional, uniformed, and respectful of private properties. All communication is handled through a single point of contact." },
      { question: "What does exterior maintenance include?", answer: "Exterior painting, staining (decks, docks, siding, trim), seasonal condition assessments, proactive touch-ups, and long-term maintenance planning tailored to your property." },
      { question: "Can I combine this with your Private Client program?", answer: "Yes. Many Post Road and Bridle Path clients transition into our Private Client program for ongoing, season-over-season property care." },
    ],
  },
];

export const getCottageOwnerPageBySlug = (slug: string): CottageOwnerPageData | undefined =>
  cottageOwnerPages.find(p => p.slug === slug);
