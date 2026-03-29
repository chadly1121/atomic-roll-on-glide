/**
 * Dockside Magazine Articles featuring Roll On Painting & Muskoka Softwash
 * 
 * Roll On Painting has been featured 15 times in Dockside Magazine,
 * a premier Muskoka lifestyle publication.
 */

export interface DocksideArticle {
  url: string;
  title: string;
  headline: string;
  brand: 'Roll-On Painting' | 'Muskoka Softwash' | 'Roll-On Painting & Muskoka Softwash';
  /** Service page slugs this article is relevant to */
  serviceSlugs: string[];
  /** Year/season of publication */
  issue?: string;
}

export const docksideArticles: DocksideArticle[] = [
  // 2025 — Latest
  {
    url: "https://www.docksidepublishing.com/clean-coat-and-protect-your-exterior-for-years-to-come/",
    title: "Clean, Coat, and Protect Your Exterior for Years to Come",
    headline: "Clean, coat, and protect your exterior for years to come",
    brand: "Roll-On Painting & Muskoka Softwash",
    serviceSlugs: ['exterior-painting', 'power-washing'],
    issue: "Autumn/Winter 2025"
  },
  {
    url: "https://www.docksidepublishing.com/muskoka-soft-wash-4/",
    title: "Get Your Exterior Clean and Keep It That Way",
    headline: "Get your exterior clean and keep it that way",
    brand: "Muskoka Softwash",
    serviceSlugs: ['power-washing'],
    issue: "Summer 2025"
  },
  // 2024
  {
    url: "https://www.docksidepublishing.com/repaint-your-cottage-with-a-team-of-painters-from-across-the-globe/",
    title: "Repaint Your Cottage with a Team of Painters from Across the Globe",
    headline: "Repaint your cottage with a team of painters from across the globe",
    brand: "Roll-On Painting",
    serviceSlugs: ['exterior-painting', 'interior-painting'],
    issue: "Summer 2024"
  },
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-8/",
    title: "Paint with a Trailblazer of the Trade",
    headline: "Paint with a trailblazer of the trade",
    brand: "Roll-On Painting",
    serviceSlugs: ['interior-painting', 'exterior-painting', 'commercial-painting'],
    issue: "Spring 2024"
  },
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-7/",
    title: "Embrace Pattern and Texture with Expert Wallpaper Installers",
    headline: "Embrace pattern and texture with the help of expert installers",
    brand: "Roll-On Painting",
    serviceSlugs: ['wallpaper-installation'],
    issue: "Winter 2024"
  },
  {
    url: "https://www.docksidepublishing.com/muskoka-soft-wash-3/",
    title: "Black, Green? Time to Clean",
    headline: "Black, green? Time to clean",
    brand: "Muskoka Softwash",
    serviceSlugs: ['power-washing', 'exterior-painting'],
    issue: "2024"
  },
  // 2023
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-6/",
    title: "Paint and Stain Will Help Boost Your Cottage's Longevity",
    headline: "Paint and stain will help boost your cottage's longevity",
    brand: "Roll-On Painting",
    serviceSlugs: ['exterior-painting', 'deck-staining'],
    issue: "Summer 2023"
  },
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-5/",
    title: "Winter Is the Ideal Time to Refresh Your Cottage",
    headline: "Winter is the ideal time to refresh your cottage",
    brand: "Roll-On Painting",
    serviceSlugs: ['interior-painting'],
    issue: "Autumn/Winter 2023"
  },
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-4/",
    title: "Schedule Work to Keep Your Cottage Looking Fresh",
    headline: "Schedule work to keep your cottage looking fresh",
    brand: "Roll-On Painting",
    serviceSlugs: ['exterior-painting', 'interior-painting'],
    issue: "Summer 2023"
  },
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-3/",
    title: "Give Your Kitchen a Fresh Coat of Durability",
    headline: "Give your kitchen a fresh coat of durability",
    brand: "Roll-On Painting",
    serviceSlugs: ['cabinet-refinishing'],
    issue: "Spring 2023"
  },
  {
    url: "https://www.docksidepublishing.com/please-wash-me/",
    title: "Tackle Mould and Mildew with a Strong Yet Gentle Solution",
    headline: "Tackle mould and mildew with a strong yet gentle solution",
    brand: "Muskoka Softwash",
    serviceSlugs: ['power-washing'],
    issue: "Summer 2023"
  },
  // 2022
  {
    url: "https://www.docksidepublishing.com/roll-on-painting-2/",
    title: "Winter and Spring Are Perfect for Interior Improvements",
    headline: "Winter and spring are perfect for interior improvements",
    brand: "Roll-On Painting",
    serviceSlugs: ['interior-painting', 'cabinet-refinishing'],
    issue: "Winter 2022"
  },
  {
    url: "https://www.docksidepublishing.com/muskoka-soft-wash-2/",
    title: "Keep Your Exterior Free of Mould and Mildew",
    headline: "Keep your exterior free of mould and mildew",
    brand: "Muskoka Softwash",
    serviceSlugs: ['power-washing'],
    issue: "2022"
  },
  {
    url: "https://www.docksidepublishing.com/roll-on-painting/",
    title: "Max Out Your Cottage Enjoyment with Off-Season Painting",
    headline: "Max out your cottage enjoyment with off-season painting projects",
    brand: "Roll-On Painting",
    serviceSlugs: ['interior-painting'],
    issue: "Summer 2022"
  },
  // 2024 — Muskoka Softwash cedar roof feature
  {
    url: "https://www.docksidepublishing.com/muskoka-softwash/",
    title: "Bring Your Shakes Back to Life with the Right Wash and Protective Coatings",
    headline: "Bring your shakes back to life with the right wash and protective coatings",
    brand: "Muskoka Softwash",
    serviceSlugs: ['power-washing', 'exterior-painting'],
    issue: "Autumn/Winter 2024"
  },
];

/**
 * Get Dockside articles relevant to a specific service page slug
 */
export const getDocksideArticlesForService = (slug: string): DocksideArticle[] => {
  return docksideArticles.filter(article => article.serviceSlugs.includes(slug));
};

/**
 * Total number of Dockside Magazine features
 */
export const DOCKSIDE_FEATURE_COUNT = docksideArticles.length; // 15

/**
 * Dockside tag page URL
 */
export const DOCKSIDE_TAG_URL = "https://www.docksidepublishing.com/?s=roll+on+painting&asl_active=1&p_asl_data=1&customset[]=post&asl_gen[]=excerpt&asl_gen[]=content&asl_gen[]=title&qtranslate_lang=0&filters_initial=1&filters_changed=0";
