export interface HgtvImage {
  src: string;
  label: string;
}

export interface HgtvAppearance {
  season: string;
  episode: string;
  description: string;
  services: string[];
  articleUrl?: string;
  images: HgtvImage[];
}

// Helper to get high-res wix URLs
const wix = (id: string, w = 960, h = 640) =>
  `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_80,usm_0.66_1.00_0.01,enc_auto/${id}`;

export const hgtvAppearances: HgtvAppearance[] = [
  {
    season: "Season 6, Episode 3",
    episode: "Whimsical Woodlands",
    description:
      "Scott McGillivray and Debra Salmoni transformed a dated 20-year-old lakeside Muskoka cottage with a whimsical, colorful design. Roll On Painting handled all painting and wallpaper — including deep blue walls, orange accents, a refreshed U-shaped kitchen, spa-like bathroom, and new exterior siding for enhanced curb appeal.",
    services: ["Interior Painting", "Interior Staining", "Wallpaper — Walls & Ceilings"],
    articleUrl: "https://www.raediusconstruction.com/whimsicalwoodlands",
    images: [
      { src: wix("afd504_22ccad63ddd24e6981ff98c679ab4c00~mv2.jpg"), label: "Exterior After" },
      { src: wix("afd504_3063c217e8a544b1a4002f4cb3d7abaf~mv2.jpg"), label: "Front Entry After" },
      { src: wix("afd504_9f593033dc674e88b333dccc93eec151~mv2.jpg"), label: "Kitchen After" },
      { src: wix("afd504_ce1c844f2115429db8d01d2441a323e1~mv2.jpg"), label: "Living Room After" },
      { src: wix("afd504_8143f75e8e7e45e0aa970fd883f23a7d~mv2.jpg"), label: "Primary Bedroom After" },
      { src: wix("afd504_96ea32cebb884836a1adddd7cf6e1735~mv2.jpg"), label: "Family Room After" },
    ],
  },
  {
    season: "Season 4, Episode 5",
    episode: "Bayside Bungalow",
    description:
      "Scott McGillivray and Debra Salmoni transformed a crowded, outdated lakefront cottage into a modern, vibrant rental. Roll On Painting delivered the bold orange exterior siding, modern interior finishes, and all painting to create a bright, spacious feel — designed to stand out in the competitive Muskoka vacation rental market.",
    services: ["Interior Painting", "Pine Sealing", "Tannin Sealing", "Shellac Primer", "T&G Pine Sealer & Paint"],
    articleUrl: "https://www.raediusconstruction.com/baysidebungalow",
    images: [
      { src: wix("467223_2509909b41fb4c76be56394d5861b919~mv2.jpg"), label: "Porch After" },
      { src: wix("467223_067ebff77d454d6ab258c6b588f20e0b~mv2.jpg"), label: "Living Room After" },
      { src: wix("467223_c49b2c85fde44aaf9f688d4ef4ce5706~mv2.jpg"), label: "Kitchen After" },
      { src: wix("467223_b109a30eedbe48dca240cb7bff36445b~mv2.jpg"), label: "Fireplace After" },
      { src: wix("afd504_b51909c85d90424d931b893a7ecdb438~mv2.jpg"), label: "Bedroom After" },
      { src: wix("467223_909cf3a5be1f4e7393db408d62c30cf5~mv2.jpg"), label: "Back After" },
    ],
  },
  {
    season: "Season 5, Episode 8",
    episode: "Lakeside Landing",
    description:
      "Scott McGillivray and Debra Salmoni transformed a foundational-stage cottage on the Moon River in Bala into a stunning family rental. Roll On Painting provided all painting and finishes — including a dramatic fireplace feature wall with acoustic panels, bright interiors with large windows, and a cool bunk room for kids.",
    services: ["Interior Painting", "Exterior Painting", "Interior Staining", "Exterior Staining"],
    articleUrl: "https://www.raediusconstruction.com/lakesidelanding",
    images: [
      { src: wix("afd504_961f512f7a644e18a8492209d94e9504~mv2.jpg"), label: "Back Walkway After" },
      { src: wix("afd504_d20e73470d004df9ba9c400239a8cb79~mv2.jpg"), label: "Back Deck After" },
      { src: wix("afd504_d22d2707e08044d99f96e88c7cf9a19b~mv2.jpg"), label: "Primary Bedroom After" },
      { src: wix("afd504_9db14eb6fbe149e89320e60743d0c131~mv2.jpg"), label: "Living Room After" },
      { src: wix("afd504_bc0107324b174aeea8be19216bd428e1~mv2.jpg"), label: "Downstairs Bedroom After" },
      { src: wix("afd504_708988b446164a879f1274c30cf8ff09~mv2.jpg"), label: "Family Room After" },
    ],
  },
  {
    season: "Season 4, Finale",
    episode: "Heritage Hideaway",
    description:
      "Scott McGillivray and Debra Salmoni transformed a dated cottage on Skeleton Lake into a modern 4-season rental with refined rustic styling. Roll On Painting delivered all painting and finishes — including a lodge-inspired interior with a new stone fireplace surround, bright open-concept living spaces, a modernized kitchen, and refreshed exterior with new decking for enhanced lakeside curb appeal.",
    services: ["Interior Painting", "Exterior Painting", "Metal Roof Painting", "Exterior Cleaning"],
    articleUrl: "https://www.raediusconstruction.com/heritagehideaway",
    images: [
      { src: wix("afd504_5e82ee4c41304c1399a443ec9c2fae48~mv2.jpg"), label: "Muskoka Room After" },
      { src: wix("afd504_987553467b3b481d977ae60cb2fbeb23~mv2.jpg"), label: "Dining Room After" },
      { src: wix("afd504_a0e4897138384ceab840c292e6f7d443~mv2.jpg"), label: "Bedroom After" },
      { src: wix("afd504_f9036f50fd5347f18ff80a3ea4152a17~mv2.jpg"), label: "Bathroom After" },
      { src: wix("afd504_d19962e492f54919884834363cf07b3d~mv2.jpg"), label: "Downstairs After" },
      { src: wix("afd504_fb8c96497c584a9b95cf2a4c295c9947~mv2.jpg"), label: "Exterior After" },
    ],
  },
  {
    season: "Season 3, Episode 13",
    episode: "European Villa",
    description:
      "Scott McGillivray and Debra Salmoni transformed an inherited 1970s cottage on a Muskoka waterfront into a European-inspired villa commanding $1,000/night. Roll On Painting delivered all painting and finishes — including bright white exterior siding with black trim, refined white interior walls that showcase original refinished ceiling beams, and a warm European aesthetic throughout the open-concept living spaces.",
    services: ["Interior Painting", "Interior Staining", "Brick Painting", "Brick Wash Painting", "Exterior Painting", "Exterior Staining"],
    articleUrl: "https://www.raediusconstruction.com/europeanvilla",
    images: [
      { src: wix("467223_268e80030efc4ef5ae905c150f3d6a41~mv2.jpg"), label: "Front After" },
      { src: wix("467223_a9b3c6ba73474d5f97cb1bc9602e736e~mv2.jpg"), label: "Living Room After" },
      { src: wix("467223_b072bb2e2c5f4ee3b4898f45c62b05b8~mv2.jpg"), label: "Kitchen After" },
      { src: wix("467223_c38d0927fdf144faa044edfcd9ab27c8~mv2.jpg"), label: "Bathroom After" },
      { src: wix("467223_8cc996a5c0454c12b563805d154dd79f~mv2.jpg"), label: "Basement After" },
      { src: wix("467223_5baa6dc9392641f2b0920373611de395~mv2.jpg"), label: "Back After" },
    ],
  },
];
