/**
 * Location Hero Data — Real landmark photos and personalized notes for each location page
 * 
 * Uses Wikimedia Commons photos (Creative Commons licensed) of actual local landmarks.
 * Each location gets a unique or regionally-accurate background image and a personal
 * "why we love working here" note.
 * 
 * Photo credits: All images from Wikimedia Commons contributors, licensed under
 * CC BY-SA or public domain. See commons.wikimedia.org for attribution details.
 */

// Real landmark photos from Wikimedia Commons
const IMGS = {
  // Specific landmarks
  bracebridgeFalls: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/High_Falls%2C_Bracebridge%2C_Ontario.jpg/1200px-High_Falls%2C_Bracebridge%2C_Ontario.jpg",
  huntsvilleStation: "https://upload.wikimedia.org/wikipedia/commons/1/11/Huntsville_train_station_Ontario.jpg",
  gravenhurstOpera: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Gravenhurst_-_ON_-_Opera_House.jpg/1200px-Gravenhurst_-_ON_-_Opera_House.jpg",
  ssSegwun: "https://upload.wikimedia.org/wikipedia/commons/6/63/DSC_0057_%289295712466%29.jpg",
  portCarlingChairs: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Muskoka_Chairs_-_Port_Carling_-_Canada_%285159311050%29.jpg/1200px-Muskoka_Chairs_-_Port_Carling_-_Canada_%285159311050%29.jpg",
  windermereHouse: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Windermere_House_%282%29_%2810576367376%29.jpg",
  balaFalls: "https://upload.wikimedia.org/wikipedia/commons/2/24/Moon_river_falls_at_woods_bay.jpg",
  dorsetTower: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Dorset_Lookout_Tower%2C_ON.jpg/1200px-Dorset_Lookout_Tower%2C_ON.jpg",
  algonquinLake: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/A_small_lake_in_Algonquin_Provincial_Park.jpg/1200px-A_small_lake_in_Algonquin_Provincial_Park.jpg",
  algonquinRidges: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Algonquin_Park_~_Centennial_Ridges_%282946002786%29.jpg/1200px-Algonquin_Park_~_Centennial_Ridges_%282946002786%29.jpg",
  magnetawanTown: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Magnetawan_ON_2.JPG/1200px-Magnetawan_ON_2.JPG",
  burksFalls: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Burks_Falls_ON.JPG/1200px-Burks_Falls_ON.JPG",
  burksFallsRiver: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Magnetawan_River_from_HWY11_Burks_Falls_Looking_Downstream.JPG/1200px-Magnetawan_River_from_HWY11_Burks_Falls_Looking_Downstream.JPG",
  parrySoundView: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/View_of_Parry_Sound_from_the_North_Shore_Rugged_Hiking_Trail.jpg/1200px-View_of_Parry_Sound_from_the_North_Shore_Rugged_Hiking_Trail.jpg",
  parrySoundDock: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/20150705_-_35_-_Parry_Sound%2C_Ont._-_Town_Dock_Panorama.jpg/1200px-20150705_-_35_-_Parry_Sound%2C_Ont._-_Town_Dock_Panorama.jpg",
  pointeAuBarilLight: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pointe_au_Baril_Lighthouse_by_Vicki_McKay_-_DSC_0369.jpg/1200px-Pointe_au_Baril_Lighthouse_by_Vicki_McKay_-_DSC_0369.jpg",
  georgianBayRocks: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Georgian_Bay_Littoral_rocks_and_water.jpg/1200px-Georgian_Bay_Littoral_rocks_and_water.jpg",
  georgianBayCabin: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Georgian_Bay_Littoral_rocks_and_cabin.jpg/1200px-Georgian_Bay_Littoral_rocks_and_cabin.jpg",
  lakeMuskoka: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Lake_Muskoka_%2830578595152%29.jpg/1200px-Lake_Muskoka_%2830578595152%29.jpg",
  muskokaLake: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Muskoka_Lake_ON.JPG",
  muskokaWindsweptPine: "/location-heroes/windswept-pine.jpg",
  barriePark: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Centennial_Park%2C_Barrie_%28166684945%29.jpg/1200px-Centennial_Park%2C_Barrie_%28166684945%29.jpg",
  barrieDowntown: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Downtown_Barrie%2C_Ontario_%282481247940%29.jpg",
  orilliaLake: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Lake_Couchiching_in_Ontario%2C_Canada.jpg/1200px-Lake_Couchiching_in_Ontario%2C_Canada.jpg",
  orilliaLeacock: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Orillia_Ontario_~_Leacock_Museum_~_National_Historic_Site_%2848323770021%29.jpg/1200px-Orillia_Ontario_~_Leacock_Museum_~_National_Historic_Site_%2848323770021%29.jpg",
  midlandSainteMarie: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/St._Marie_Among_the_Hurons.jpg/1200px-St._Marie_Among_the_Hurons.jpg",
  midlandMartyrs: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Martyrs_Shrine_Midland%2C_ON_-_St._Jean_de_Brefeuf.jpg/1200px-Martyrs_Shrine_Midland%2C_ON_-_St._Jean_de_Brefeuf.jpg",
  trentSevern: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Trent-Severn_Waterway_above_the_Kirkfield_Lift_Lock.jpg/1200px-Trent-Severn_Waterway_above_the_Kirkfield_Lift_Lock.jpg",
  bigChute: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Big_Chute_Marine_Railway_%282899857183%29.jpg/1200px-Big_Chute_Marine_Railway_%282899857183%29.jpg",
  islandQueen: "https://upload.wikimedia.org/wikipedia/commons/8/85/Excursion_vessel_Island_Queen_moored_in_Parry_Sound.jpg",
  sixMileLake: "/location-heroes/six-mile-lake.jpg",
};

export interface LocationHeroInfo {
  heroImage: string;
  landmark: string;
  localLove: string;
}

const heroData: Record<string, LocationHeroInfo> = {
  // ═══════════════════════════════════════════
  // MUSKOKA CORE
  // ═══════════════════════════════════════════
  "painters-bracebridge": {
    heroImage: IMGS.bracebridgeFalls,
    landmark: "High Falls, Bracebridge",
    localLove: "There's something special about painting homes in a town with a waterfall right in the heart of downtown. Bracebridge has this incredible mix of heritage charm and cottage country warmth — from the stone buildings along Manitoba Street to the stunning properties overlooking the falls. We've painted everything from century-old Victorian homes to brand-new lakeside builds here, and every project reminds us why we chose to make Muskoka home. The pride people take in their properties in Bracebridge is contagious, and it pushes us to do our very best work every single time."
  },
  "painters-huntsville": {
    heroImage: IMGS.huntsvilleStation,
    landmark: "Huntsville Heritage Train Station",
    localLove: "Huntsville holds a special place in our hearts — it's the gateway to Algonquin Park and one of the most vibrant towns in all of Muskoka. From the beautifully restored train station to the colourful Main Street shops, this town inspires us every time we drive in. We've built amazing relationships with homeowners here who take real pride in their properties, whether it's a heritage home on Brunel Road or a modern lakefront build on Peninsula Lake. Huntsville's blend of artsy community spirit and natural beauty makes every painting project here feel meaningful."
  },
  "painters-gravenhurst": {
    heroImage: IMGS.ssSegwun,
    landmark: "RMS Segwun Steamship, Gravenhurst Wharf",
    localLove: "Gravenhurst is where Muskoka magic begins — the iconic RMS Segwun steamship at the wharf, the stunning Opera House, and the gorgeous lakeside properties that line Lake Muskoka. As the 'Gateway to Muskoka,' this town sees homeowners who really care about curb appeal, and we love helping them achieve it. We've painted beautiful heritage homes on Muskoka Road and modern cottages along the shoreline. There's nothing quite like finishing a job here and watching the Segwun cruise by — it reminds us that we're working in one of Canada's most special places."
  },
  "painters-port-carling": {
    heroImage: IMGS.portCarlingChairs,
    landmark: "Muskoka Chairs by the Locks, Port Carling",
    localLove: "Port Carling is the heart of Muskoka Lakes, and working here feels like being part of something truly iconic. The famous 111-foot photo mosaic wall downtown captures the spirit of lake life perfectly, and the properties here are some of the most beautiful we've ever worked on. From the historic locks connecting Lake Muskoka to Lake Rosseau, to the stunning cottages tucked along the shoreline, Port Carling demands exceptional craftsmanship — and that's exactly what we deliver. We genuinely love this community and the incredible homeowners who trust us with their properties."
  },
  "painters-baysville": {
    heroImage: IMGS.algonquinRidges,
    landmark: "View from Centennial Ridges, Algonquin Park",
    localLove: "Baysville is one of Muskoka's best-kept secrets, and we love working in this charming little village on Lake of Bays. The laid-back vibe here is infectious — kayakers on the lake, families at the beach, and homeowners who appreciate quality work done right. We've painted cottages that have been in families for generations and new builds that are destined to become the next generation's favourite summer spot. Baysville's tight-knit community makes every project feel personal, and that's exactly how we like it."
  },
  "painters-milford-bay": {
    heroImage: IMGS.lakeMuskoka,
    landmark: "Lake Muskoka",
    localLove: "Milford Bay is pure cottage country — quiet mornings on the lake, loons calling at sunset, and some of the most beautiful waterfront properties in all of Muskoka. We've had the privilege of working on stunning homes here that blend seamlessly with the natural landscape, and it's work that genuinely fills us with pride. The homeowners in Milford Bay care deeply about maintaining the beauty of this area, and so do we. Every brush stroke here feels like we're contributing to something bigger than just a paint job."
  },
  "painters-minett": {
    heroImage: IMGS.lakeMuskoka,
    landmark: "Lake Muskoka from Minett",
    localLove: "Minett is Muskoka luxury at its finest — home to world-class resorts and some of the most stunning lakefront estates in Ontario. Working on properties here challenges us to bring our absolute A-game, and we wouldn't have it any other way. The sunsets over Lake Rosseau from Minett are legendary, and so are the homes. We've built strong relationships with property owners who expect perfection, and we're proud to deliver it every time. This is the kind of place that reminds you why you got into this trade."
  },
  "painters-port-sandfield": {
    heroImage: IMGS.muskokaLake,
    landmark: "The Channel at Port Sandfield",
    localLove: "Port Sandfield sits right where Lake Rosseau meets Lake Joseph — a spot so beautiful it's hard to focus on work sometimes. The historic swing bridge, the pristine waters, and the exquisite cottages along the channel make this one of Muskoka's most special communities. We've painted heritage boathouses and modern waterfront homes here, and each project comes with breathtaking views as a bonus. The families who call Port Sandfield home have an incredible appreciation for quality, and it shows in every property we work on."
  },
  "painters-utterson": {
    heroImage: IMGS.muskokaWindsweptPine,
    landmark: "The Windswept Pine — Iconic Muskoka",
    localLove: "Utterson may be small, but it's packed with character — and some of the friendliest folks in Muskoka. This is real cottage country, where the roads wind through forests and every property has a story. We love the variety of work we get here, from rustic cabins that need a refresh to newer homes that want that perfect first coat. The drive into Utterson through the autumn colours is one of our favourite commutes, and the community's warm welcome always makes the work feel less like a job and more like helping neighbours."
  },
  "painters-windermere": {
    heroImage: IMGS.windermereHouse,
    landmark: "Windermere House — Muskoka's Historic Resort",
    localLove: "Windermere is steeped in Muskoka history — the iconic Windermere House has been welcoming guests since 1870, and the community still has that timeless, gracious feel. We love painting homes here because the architecture tells a story, from grand Victorian cottages to elegant modern lakefront builds. Windermere homeowners have impeccable taste and high standards, which is exactly the kind of challenge we thrive on. Working lakeside here with the gentle waves of Lake Rosseau as your soundtrack — there's nothing better."
  },
  "painters-port-sydney": {
    heroImage: IMGS.muskokaWindsweptPine,
    landmark: "The Windswept Pine — Iconic Muskoka",
    localLove: "Port Sydney is a hidden gem on the shores of Mary Lake, and we've loved watching this community grow while keeping its small-town charm. The dam and falls right in town give it a unique character, and the surrounding properties — from cozy year-round homes to waterfront retreats — keep us busy and inspired. There's an authenticity to Port Sydney that you can feel the moment you drive in, and the homeowners here share that genuine, no-nonsense approach to getting things done right."
  },

  // ═══════════════════════════════════════════
  // MUSKOKA LAKES
  // ═══════════════════════════════════════════
  "painters-bala": {
    heroImage: IMGS.balaFalls,
    landmark: "Moon River Falls near Bala",
    localLove: "Bala is where the Moon River meets Muskoka magic — and the falls right through town are absolutely spectacular. Known as the 'Cranberry Capital of Ontario,' this little town packs a huge punch when it comes to character and community spirit. We've painted everything from the charming shops along the main strip to gorgeous waterfront cottages overlooking the falls. Bala homeowners are passionate about preserving the character of their town, and we share that passion in every coat we apply."
  },
  "painters-mactier": {
    heroImage: IMGS.muskokaLake,
    landmark: "Moon River near Mactier",
    localLove: "Mactier is quintessential small-town Ontario — the kind of place where everyone knows your name and the river runs right through the heart of everything. The Moon River here is absolutely stunning, and the properties along its banks are some of our favourite projects. We appreciate the slower pace and the genuine warmth of Mactier's residents. Whether we're painting a family cottage that's been loved for decades or a newer build, the care this community puts into their properties is truly inspiring."
  },
  "painters-rosseau": {
    heroImage: IMGS.lakeMuskoka,
    landmark: "Lake Rosseau",
    localLove: "Rosseau is one of those places that stops you in your tracks — the crystal-clear lake, the charming general store, and properties that range from rustic retreats to multi-million-dollar estates. We love the diversity of work here and the fact that every homeowner, regardless of property size, shares the same deep love for this community. Painting in Rosseau means working alongside some of Ontario's most beautiful scenery, and we never take that for granted."
  },
  "painters-torrance": {
    heroImage: IMGS.muskokaLake,
    landmark: "Muskoka River near Torrance",
    localLove: "Torrance is one of Muskoka's quiet treasures — a peaceful community along the Muskoka River where life moves at just the right pace. The properties here are beautifully maintained, and homeowners take real pride in their little corner of paradise. We enjoy the variety of projects in Torrance, from riverside homes to tucked-away forest retreats. It's the kind of community where you finish a job and the neighbours come over to admire the work — and that always puts a smile on our faces."
  },
  "painters-lake-rosseau": {
    heroImage: IMGS.lakeMuskoka,
    landmark: "Lake Rosseau, Muskoka",
    localLove: "Lake Rosseau is legendary — one of Muskoka's crown jewels, lined with some of the most spectacular properties in all of Canada. We've had the honour of painting grand estates with wraparound verandas and cozy family retreats passed down through generations. Every road-accessible project on Lake Rosseau comes with a view that makes you stop and stare. The homeowners here expect the very best, and we're proud to deliver craftsmanship worthy of this extraordinary lake."
  },
  "painters-lake-joseph": {
    heroImage: IMGS.lakeMuskoka,
    landmark: "Lake Joseph, Muskoka",
    localLove: "Lake Joseph — or 'Lake Joe' as the locals call it — is where Muskoka meets elegance. The properties here are truly world-class, with some of the most architecturally stunning homes and cottages in Ontario. We love the challenge that comes with these high-end projects, where precision and perfection aren't just expected, they're required. Working on Lake Joe means delivering our finest work against a backdrop of pristine waters and manicured shorelines. It's demanding work, and we wouldn't trade it for anything."
  },
  "painters-lake-muskoka": {
    heroImage: IMGS.lakeMuskoka,
    landmark: "Lake Muskoka",
    localLove: "Lake Muskoka is where it all began for Muskoka cottage country, and painting homes along its shores feels like being part of a living legacy. From Gravenhurst to Port Carling, the communities around this incredible lake have welcomed us with open arms. We've painted heritage boathouses, sprawling family compounds, and charming starter cottages — each one special in its own way. Lake Muskoka's iconic beauty is our daily inspiration, and we're honoured to help homeowners protect and beautify their lakeside investments."
  },

  // ═══════════════════════════════════════════
  // GEORGIAN BAY
  // ═══════════════════════════════════════════
  "painters-lake-of-bays": {
    heroImage: IMGS.algonquinLake,
    landmark: "Lake of Bays, Algonquin Highlands",
    localLove: "Lake of Bays is Muskoka at its most naturally stunning — surrounded by towering forests that explode with colour every autumn. The homes and cottages here sit among some of the most beautiful shoreline in Ontario, and we feel genuinely privileged to work in this area. From Dwight Beach to the quiet coves along the southern shore, every project here comes with a sense of peace and purpose. The homeowners who choose Lake of Bays value quality and durability, and those are values we share wholeheartedly."
  },

  // ═══════════════════════════════════════════
  // ALGONQUIN / NORTH MUSKOKA
  // ═══════════════════════════════════════════
  "painters-ahmic-harbour": {
    heroImage: IMGS.muskokaLake,
    landmark: "Ahmic Lake",
    localLove: "Ahmic Harbour is one of those magical spots where the lake meets the wilderness and everything slows down in the best possible way. The crystal-clear waters of Ahmic Lake and the friendly, close-knit community make every trip here feel like a mini escape. We love working on the charming cottages and year-round homes that dot the shoreline — each one reflecting the unique personality of its owners. This is real cottage country at its finest, and painting here is always a pleasure."
  },
  "painters-algonquin-park": {
    heroImage: IMGS.algonquinLake,
    landmark: "Algonquin Provincial Park",
    localLove: "Being just down the road from one of Ontario's most iconic parks is something we never take for granted. The Algonquin Park area attracts people who truly love nature, and the properties here reflect that deep connection to the wilderness. We've painted lodges, rustic retreats, and modern eco-homes all within sight of the park's magnificent forests. Working in Algonquin country means breathing the freshest air and being surrounded by inspiration — and that energy goes straight into our work."
  },
  "painters-burks-falls": {
    heroImage: IMGS.burksFallsRiver,
    landmark: "Magnetawan River at Burk's Falls",
    localLove: "Burk's Falls earned its name from the stunning falls on the Magnetawan River, and this hardworking little town has earned our deep respect over the years. The community here is genuine, welcoming, and proud of their homes and businesses. We love the mix of projects we find in Burk's Falls — from Main Street storefronts to waterfront properties along the river. It's the kind of town where people still shake your hand when the job's done well, and that old-school appreciation means the world to us."
  },
  "painters-dorset": {
    heroImage: IMGS.dorsetTower,
    landmark: "Dorset Lookout Tower",
    localLove: "Dorset is famous for its fire tower lookout, and honestly, the view from up there is one of the best in all of Ontario — especially during fall colours. But what we love most about Dorset is the community below the tower. This is a place where craftsmanship is appreciated, where homeowners maintain their properties with genuine care, and where every paint job matters. The combination of spectacular scenery and wonderful people makes Dorset one of our favourite communities to work in."
  },
  "painters-dunchurch": {
    heroImage: IMGS.georgianBayCabin,
    landmark: "Georgian Bay Cottage Country near Dunchurch",
    localLove: "Dunchurch is off the beaten path in the best possible way — a peaceful community where the lakes are pristine and the people are as genuine as they come. We've built wonderful relationships with homeowners here who value honest work and fair dealings. The cottages and homes around Whitestone Lake and the surrounding area are beautifully maintained, and it's clear that people here take enormous pride in their properties. Painting in Dunchurch reminds us of why we love serving smaller communities."
  },
  "painters-dwight": {
    heroImage: IMGS.algonquinRidges,
    landmark: "Algonquin Highlands near Dwight",
    localLove: "Dwight is the charming northern gateway to Lake of Bays, and its famous sandy beach draws visitors from across Ontario. But it's the year-round community that really makes Dwight special — friendly, tight-knit, and passionate about preserving the natural beauty of their surroundings. We've painted lakefront cottages, village homes, and commercial properties here, and every project benefits from the stunning backdrop. Dwight's combination of natural beauty and community spirit makes it a joy to work in."
  },
  "painters-emsdale": {
    heroImage: IMGS.burksFalls,
    landmark: "Almaguin Highlands near Emsdale",
    localLove: "Emsdale sits along the South Magnetawan River in one of Ontario's most scenic corridors, and the properties here reflect the natural beauty that surrounds them. This is a community that values reliability and quality — when you tell someone in Emsdale you'll do a great job, you'd better deliver. And we always do. We love the honest, straightforward nature of this community and the variety of painting projects we find here, from riverside retreats to well-maintained family homes."
  },
  "painters-katrine": {
    heroImage: IMGS.algonquinLake,
    landmark: "Almaguin Highlands near Katrine",
    localLove: "Katrine is tucked into some of the most beautiful forest country in the Almaguin Highlands, and the peaceful setting makes every workday here feel like a breath of fresh air. The community is small but mighty, with homeowners who care deeply about the quality of work on their properties. We appreciate the trust Katrine residents place in us, and we reward that trust with meticulous attention to detail. Painting surrounded by towering pines and clean country air — there are worse ways to make a living."
  },
  "painters-kearney": {
    heroImage: IMGS.algonquinRidges,
    landmark: "Algonquin Highlands near Kearney",
    localLove: "Kearney is a real gem in the Almaguin Highlands — a small town with a big heart and some truly beautiful lakeside properties. The town's logging heritage gives it character, and the modern homes and cottages that have sprung up around the lakes show that people see what we see: a place worth investing in. We enjoy the variety of work Kearney offers and the warm reception we always receive. It's the kind of community that makes you want to do your absolute best."
  },
  "painters-magnetawan": {
    heroImage: IMGS.magnetawanTown,
    landmark: "Magnetawan Village",
    localLove: "Magnetawan is a place of real character — the historic river lock, the winding waterway, and the charming village centre make it feel like stepping back in time in the best possible way. We've painted beautiful historic properties here that deserve careful, respectful treatment, as well as newer builds that blend harmoniously with the village's heritage feel. The Magnetawan River is the lifeblood of this community, and we feel honoured to help maintain the properties along its banks."
  },
  "painters-novar": {
    heroImage: IMGS.muskokaLake,
    landmark: "Novar, Almaguin Highlands",
    localLove: "Novar is surrounded by some of the most beautiful rolling hills and forests in the Almaguin Highlands, and the community here is wonderfully unpretentious. These are folks who value hard work, quality craftsmanship, and a fair deal — values that align perfectly with how we run our business. We love painting homes in Novar because the natural backdrop makes every finished project look stunning, and the homeowners' appreciation for good work is always genuine and heartfelt."
  },
  "painters-south-river": {
    heroImage: IMGS.burksFalls,
    landmark: "South River, Almaguin Highlands",
    localLove: "South River is the vibrant hub of the Almaguin Highlands, and its position near Eagle Lake and the South River itself makes for some truly beautiful properties. We've enjoyed watching this community grow while maintaining its friendly, small-town character. The mix of residential homes, cottages, and commercial properties keeps our work interesting and diverse. South River's people are straightforward and appreciative — exactly the kind of clients we love working with."
  },
  "painters-sprucedale": {
    heroImage: IMGS.algonquinLake,
    landmark: "Sprucedale, Almaguin Highlands",
    localLove: "Sprucedale is nestled in the heart of the Almaguin Highlands, surrounded by pristine lakes and endless forests. The pace of life here is perfectly unhurried, and the properties reflect that peaceful atmosphere. We love the authenticity of this community — no pretension, just good people who want their homes to look beautiful and be well-protected from the elements. Painting in Sprucedale always feels like honest, meaningful work, and that's exactly the kind of work we're most proud of."
  },
  "painters-sundridge": {
    heroImage: IMGS.burksFalls,
    landmark: "Bernard Lake, Sundridge",
    localLove: "Sundridge sits on the shores of Bernard Lake and serves as a welcoming gateway to the Almaguin Highlands. This is a town with real community spirit — the kind of place where local businesses thrive and neighbours look out for each other. We've painted homes, cottages, and storefronts here and always feel like part of the community when we're working. The lake views, the friendly faces, and the satisfaction of a job well done — Sundridge delivers all three in abundance."
  },

  // ═══════════════════════════════════════════
  // PARRY SOUND
  // ═══════════════════════════════════════════
  "painters-parry-sound": {
    heroImage: IMGS.parrySoundView,
    landmark: "View of Parry Sound from the North Shore Trail",
    localLove: "Parry Sound is the gateway to the legendary 30,000 Islands, and the views from the hiking trails above town are absolutely unforgettable. This is Bobby Orr's hometown, and the community carries that same winning spirit in everything they do. We love the diversity of painting projects here — from the colourful downtown storefronts to elegant waterfront homes overlooking the sound. Parry Sound's combination of natural beauty, rich history, and community pride makes every project here feel important and rewarding."
  },
  "painters-seguin": {
    heroImage: IMGS.georgianBayRocks,
    landmark: "Georgian Bay Shore near Seguin",
    localLove: "Seguin Township is a vast, beautiful area dotted with pristine lakes and surrounded by the rugged Canadian Shield. Working here means driving through some of the most spectacular scenery in Ontario on the way to every job. The properties in Seguin range from modest family cottages to expansive year-round homes, and we love the variety. The homeowners here are passionate about their properties and the natural environment that surrounds them, and that passion is something we deeply respect."
  },
  "painters-mckellar": {
    heroImage: IMGS.islandQueen,
    landmark: "Island Queen Cruise Ship, Parry Sound",
    localLove: "McKellar is a quiet, beautiful community where the lakes are crystal clear and the living is easy. We've been fortunate to work on some stunning properties here — both lakefront cottages and charming village homes. McKellar's residents are the kind of people who notice and appreciate quality workmanship, and their feedback always makes our day. The drive into McKellar through the Shield country is gorgeous in every season, and we always look forward to projects here."
  },
  "painters-the-archipelago": {
    heroImage: IMGS.georgianBayCabin,
    landmark: "Georgian Bay's 30,000 Islands",
    localLove: "The Archipelago area is one of the most extraordinary places we work — mainland and road-accessible properties framed by the 30,000 Islands of Georgian Bay. These homes and cottages face some of the harshest weather conditions in Ontario, which is where our weatherproofing expertise really shines. Please note we do not service island or water-access-only properties."
  },

  // ═══════════════════════════════════════════
  // SIMCOE COUNTY
  // ═══════════════════════════════════════════
  "painters-orillia": {
    heroImage: IMGS.orilliaLake,
    landmark: "Lake Couchiching, Orillia",
    localLove: "Orillia — the 'Sunshine City' — has one of the best waterfronts in Ontario, and the community's energy is absolutely infectious. From the heritage homes along Mississaga Street to the vibrant lakeshore properties on Couchiching, Orillia offers an incredible variety of painting projects. This is Stephen Leacock's beloved 'Mariposa,' and you can still feel that literary charm in every neighbourhood. We love Orillia's perfect blend of small-town warmth and big-town amenities, and the homeowners here never fail to impress us with their vision."
  },
  "painters-six-mile-lake": {
    heroImage: IMGS.sixMileLake,
    landmark: "Six Mile Lake & Wawautosa Marina",
    localLove: "Six Mile Lake holds a special place in my heart — I'm a former cottage owner on the lake, with deep ties and lasting friendships in this community. I know every bay, every dock, and every sunset view. Wawautosa Marina has been the heartbeat of Six Mile Lake since the 1950s, and the people here are like family. When we paint a cottage on Six Mile Lake, it's personal. We bring the same care and attention we'd give our own place, because this lake isn't just a service area — it's home."
  },
  "painters-severn-bridge": {
    heroImage: IMGS.bigChute,
    landmark: "Severn River at Severn Bridge",
    localLove: "Severn Bridge is a small but spirited community straddling the Severn River, right where Muskoka meets Simcoe County. It's the kind of place where everyone knows each other and the river is the centre of life — swimming, fishing, and paddling in summer, and skating in winter. The properties here range from cozy village homes to waterfront retreats along the Severn River corridor. We love working in Severn Bridge because it's a genuine, unpretentious community where people value honest work and lasting quality."
  },
};

export const getLocationHero = (slug: string): LocationHeroInfo => {
  return heroData[slug] || {
    heroImage: IMGS.muskokaLake,
    landmark: "Muskoka Region",
    localLove: "We love serving communities across Muskoka and beyond. Every town and village in this incredible region has its own unique character, and we bring that same individual attention to every painting project we take on. From lakeside cottages to family homes, we treat every property like it's our own."
  };
};
