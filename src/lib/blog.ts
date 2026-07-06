export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  body: string[];
  faqs?: { q: string; a: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "chinese-zodiac-by-date-of-birth",
    title: "Chinese Zodiac by Date of Birth: Find Your True Animal Sign",
    excerpt:
      "Your Chinese zodiac sign depends on your full birth date, not just the calendar year. Learn why Lunar New Year matters and how to find your true animal sign.",
    date: "2026-07-06",
    readingTime: "6 min read",
    category: "Zodiac",
    body: [
      "Many people search for their Chinese zodiac by date of birth because the answer is not always as simple as matching a Western calendar year to an animal. The Chinese zodiac follows the lunar calendar, so the zodiac year usually begins in late January or February rather than on January 1.",
      "That detail matters most for people born in January or early February. For example, someone born before Lunar New Year may belong to the previous zodiac animal, even if their Western birth year looks like a different sign. A date-based calculator is the safest way to avoid this common mistake.",
      "The twelve animals repeat in a steady cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig. Each animal carries a personality pattern, relationship style, natural strengths and possible blind spots.",
      "Once you know your animal sign, the reading becomes more useful when you add the Five Elements. Wood, Fire, Earth, Metal and Water modify the animal energy, which is why two people born in different Dragon years can feel very different in temperament.",
      "To find your true sign, enter your full birth date into the Chinese Zodiac Calculator. It handles the lunar year boundary for you, then gives you your animal sign, personality traits, best matches, lucky colors, lucky numbers and career guidance.",
      "If you want a deeper reading, continue with the Five Elements Calculator after finding your animal. Together, your zodiac animal and element create a fuller picture of your character, timing, relationships and daily fortune.",
    ],
    faqs: [
      {
        q: "Can I find my Chinese zodiac by date of birth?",
        a: "Yes. A full date of birth is the best way to find your true Chinese zodiac sign because the zodiac year begins at Lunar New Year, not always on January 1.",
      },
      {
        q: "Why can January and February birthdays have a different Chinese zodiac sign?",
        a: "Chinese zodiac years follow the lunar calendar. If you were born before Lunar New Year, your animal sign may belong to the previous zodiac year.",
      },
      {
        q: "Is the Chinese zodiac based only on birth year?",
        a: "The animal sign is mainly based on the zodiac year, but your full birth date helps confirm the correct year. Five Elements analysis adds another layer to the reading.",
      },
    ],
  },
  {
    slug: "understanding-the-five-elements",
    title: "Understanding the Five Elements: A Beginner's Map of Wu Xing",
    excerpt:
      "Wood, Fire, Earth, Metal and Water are more than symbols — they are a living grammar for how energy moves through your life.",
    date: "2024-05-02",
    readingTime: "6 min read",
    category: "Foundations",
    body: [
      "The theory of Wu Xing — the Five Elements — is one of the oldest organising ideas in Chinese thought. Far from a rigid system of fortune-telling, it is a way of describing how energy transforms: how growth becomes heat, heat becomes substance, substance becomes structure, and structure dissolves back into flow.",
      "Each element carries a personality. Wood is the pioneer, expansive and idealistic. Fire is the catalyst, radiant and decisive. Earth is the anchor, patient and nurturing. Metal is the strategist, precise and principled. Water is the philosopher, intuitive and adaptable.",
      "The elements relate through two great cycles. In the generating cycle, each element nourishes the next — Wood feeds Fire, Fire creates Earth (ash), Earth bears Metal, Metal carries Water, Water grows Wood. In the controlling cycle, each element checks another, keeping the whole in balance.",
      "Understanding your dominant element is the first step. It explains where your natural energy flows, which careers feel effortless, and how you connect with others. But the real wisdom lies in balance: noticing which elements you lack and cultivating them deliberately.",
    ],
  },
  {
    slug: "chinese-zodiac-explained",
    title: "The Twelve Animals: How the Chinese Zodiac Really Works",
    excerpt:
      "Why a twelve-year cycle of animals can reveal so much about temperament, timing and the people you're drawn to.",
    date: "2024-04-18",
    readingTime: "5 min read",
    category: "Zodiac",
    body: [
      "The Chinese zodiac assigns an animal to each year in a repeating twelve-year cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig. Your birth year animal is your most visible sign — the face you show the world.",
      "Each animal embodies a cluster of traits. The Dragon is visionary and magnetic; the Rabbit gentle and diplomatic; the Tiger brave and spontaneous. These are not fixed destinies but tendencies — starting points for self-understanding.",
      "Animals also form relationships. Four 'trines' group signs that share instinctive understanding, while opposing signs sit across the wheel and require more conscious care. This is the basis of zodiac compatibility.",
      "Remember that the Chinese year begins at the lunar New Year, not January 1st. Anyone born in January or early February should double-check which animal year they truly belong to.",
    ],
  },
  {
    slug: "lucky-colors-and-numbers",
    title: "Lucky Colors and Numbers: Aligning Daily Life with Your Element",
    excerpt:
      "Small, intentional choices — what you wear, when you act — can bring your daily life into resonance with your elemental nature.",
    date: "2024-04-03",
    readingTime: "4 min read",
    category: "Practice",
    body: [
      "Lucky colors and numbers are not superstition so much as a practice of attention. By surrounding yourself with the hues and figures aligned to your element, you create gentle reminders of your own nature and intentions.",
      "Wood resonates with greens and teals; Fire with reds and corals; Earth with golden ochres and warm browns; Metal with gold, silver and white; Water with deep blues and black. Wearing or decorating with these tones is a quiet form of self-alignment.",
      "Numbers work similarly. Each element favours certain digits that can guide choices of timing — which day to launch a project, sign a contract, or begin something new.",
      "Used thoughtfully, these tools sharpen intuition. They will not change your fate, but they can change your focus — and focus, in the end, shapes the path you walk.",
    ],
  },
  {
    slug: "what-is-my-chinese-zodiac",
    title: "What Is My Chinese Zodiac Sign? A Simple Guide",
    excerpt:
      "Your birth year reveals one of twelve animals — here is how to find yours and what it says about your character.",
    date: "2024-06-01",
    readingTime: "5 min read",
    category: "Zodiac",
    body: [
      "Your Chinese zodiac sign is determined by your birth year within a repeating twelve-year cycle: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig. It is the most recognisable layer of Chinese astrology and the quickest way to begin understanding your nature.",
      "To find your sign, simply enter your birth date into our Chinese Zodiac Calculator. One important detail: the Chinese year begins at the lunar New Year in late January or February, not on January 1st. If you were born in those early weeks of the year, your true sign may belong to the previous year — the calculator handles this adjustment for you.",
      "Each animal carries a distinct temperament. The Rat is resourceful and quick-witted; the Ox patient and dependable; the Dragon visionary and magnetic. These traits describe tendencies rather than fixed fate — a starting point for reflection rather than a verdict.",
      "Once you know your animal, explore deeper: pair it with your Five Elements profile for a richer portrait, or check your love compatibility with a partner. Your zodiac sign is the doorway; the elements and cycles are the rooms beyond it.",
    ],
  },
  {
    slug: "chinese-zodiac-compatibility-guide",
    title: "Chinese Zodiac Compatibility Guide: Finding Your Best Matches",
    excerpt:
      "How the twelve animals attract, clash and complement one another — and what that means for love and friendship.",
    date: "2024-05-28",
    readingTime: "7 min read",
    category: "Compatibility",
    body: [
      "Compatibility in Chinese astrology is built on the relationships between the twelve zodiac animals. The most harmonious pairings come from the four 'trines' — groups of three signs that share instinctive understanding and similar values.",
      "The trines are: Rat, Dragon and Monkey (the achievers); Ox, Snake and Rooster (the thinkers); Tiger, Horse and Dog (the protectors); and Rabbit, Goat and Pig (the diplomats). Signs within the same trine tend to support one another effortlessly.",
      "At the other extreme sit the six 'clash' pairs — signs positioned directly opposite on the zodiac wheel, such as Rat and Horse, or Dragon and Dog. These relationships are not doomed, but they require conscious patience, honest communication and respect for difference.",
      "True compatibility, however, goes beyond the animals. Your Five Elements interact through generating and controlling cycles that can soften or sharpen a match. Two clashing signs whose elements nourish each other can build a surprisingly strong bond.",
      "To see your own pairing in detail — with a score, summary and tailored advice — enter both birth dates into our Love Compatibility Calculator. It blends zodiac and elemental harmony into a single, practical reading.",
    ],
  },
  {
    slug: "five-elements-personality-traits",
    title: "Five Elements Personality Traits: Which One Are You?",
    excerpt:
      "Wood, Fire, Earth, Metal and Water each shape a distinct character. Discover the strengths and blind spots of yours.",
    date: "2024-05-20",
    readingTime: "6 min read",
    category: "Five Elements",
    body: [
      "In Chinese metaphysics, your dominant element colours your entire personality — how you think, work, love and recover. Each of the five carries a signature blend of strengths and challenges.",
      "Wood people are visionary, compassionate and resilient pioneers who sometimes overcommit. Fire people are charismatic, confident and inspiring catalysts who can burn out or act on impulse. Earth people are dependable, patient and loyal anchors who may resist change.",
      "Metal people are determined, organised and honest strategists whose perfectionism can tip into rigidity. Water people are intuitive, adaptable and persuasive philosophers who occasionally struggle with indecision or over-sensitivity.",
      "Knowing your element is not about labelling yourself — it is about recognising your natural rhythm and the areas where deliberate balance helps. A Fire person learns to rest; an Earth person learns to embrace change.",
      "Find your element in seconds with our Five Elements Calculator, then read the full personality, career and relationship analysis it generates from your birth date.",
    ],
  },
  {
    slug: "chinese-zodiac-elements-explained",
    title: "Chinese Zodiac Elements Explained: The Sixty-Year Cycle",
    excerpt:
      "Your animal sign is only half the story — the element attached to it transforms the reading entirely.",
    date: "2024-05-12",
    readingTime: "6 min read",
    category: "Five Elements",
    body: [
      "Many people know their zodiac animal but not their element. Yet every animal combines with one of the five elements, creating a richer sixty-year cycle — twelve animals multiplied by five elements — before any combination repeats.",
      "This is why two people born in different Dragon years are not the same. A Wood Dragon is idealistic and growth-oriented; a Metal Dragon is disciplined and commanding; a Water Dragon is intuitive and diplomatic. The element shifts the animal's expression.",
      "The element is decided by your birth year, following a ten-year rhythm tied to the last digit of the year and its yin or yang polarity. Together, animal and element form your 'pillar' — for example, a Yang Fire Horse or a Yin Earth Rabbit.",
      "Understanding your full pillar deepens every other reading: your career fit, your lucky colours, and your compatibility with others all sharpen once the element is in view. Our Five Elements Calculator reveals both your animal and element from a single birth date.",
    ],
  },
  {
    slug: "lucky-colors-by-element",
    title: "Lucky Colors By Element: Dress and Decorate in Harmony",
    excerpt:
      "Each element resonates with specific hues. Use them to align your wardrobe, home and intentions.",
    date: "2024-05-06",
    readingTime: "5 min read",
    category: "Practice",
    body: [
      "Colour is one of the simplest, most immediate ways to work with your element. The right tones act as quiet reminders of your nature and gentle reinforcements of the energy you wish to cultivate.",
      "Wood thrives with emerald green, teal and olive — the colours of growth and renewal. Fire is amplified by vermillion red, crimson and coral, hues of passion and visibility. Earth is grounded by golden ochre, sand and warm brown.",
      "Metal is refined by antique gold, silver and white, expressing clarity and precision. Water flows with deep blue, teal and black — colours of depth, wisdom and calm adaptability.",
      "Beyond your fixed element, you can use the generating cycle to invite more of a quality you need. Feeling scattered? Add Earth tones for stability. Feeling stuck? Bring in Wood greens for fresh momentum.",
      "Discover your personalised palette — combining both your element and your zodiac animal — through our Five Elements and Daily Fortune tools.",
    ],
  },
  {
    slug: "chinese-astrology-for-beginners",
    title: "Chinese Astrology For Beginners: Where to Start",
    excerpt:
      "New to Chinese astrology? This friendly roadmap covers the zodiac, the elements and how they fit together.",
    date: "2024-04-28",
    readingTime: "7 min read",
    category: "Foundations",
    body: [
      "Chinese astrology can feel vast at first, but it rests on a few elegant ideas. Master these and the rest falls into place. Begin with the twelve zodiac animals, the most familiar layer, each tied to a birth year and a cluster of personality traits.",
      "Next, meet the Five Elements — Wood, Fire, Earth, Metal and Water. These describe how energy moves and transforms, and they combine with the animals to give every person a unique 'pillar' such as Yang Wood Tiger or Yin Water Pig.",
      "The elements relate through two cycles. The generating cycle shows how each nourishes the next; the controlling cycle shows how each keeps another in check. Together they explain balance, compatibility and timing.",
      "From there, the practical applications open up: lucky colours and numbers, favourable directions, daily fortune and relationship compatibility. None of it is about predicting a fixed future — it is a mirror for self-understanding and intentional living.",
      "The easiest way to learn is by doing. Enter your birth date into our Chinese Zodiac and Five Elements calculators, read your results, then return here to explore the ideas behind them in more depth.",
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
