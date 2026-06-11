// Destiny calculation engine
// Chinese zodiac, Five Elements (Wu Xing), lucky info, daily fortune and
// love compatibility. Calculations are deterministic so a given birth date
// always returns the same reading.

export type ElementKey = "wood" | "fire" | "earth" | "metal" | "water";
export type Polarity = "Yang" | "Yin";

export interface ElementProfile {
  key: ElementKey;
  name: string;
  chinese: string;
  pinyin: string;
  tagline: string;
  personality: string;
  career: string[];
  relationships: string;
  strengths: string[];
  challenges: string[];
  luckyColors: string[];
  luckyNumbers: number[];
  luckyDirection: string; // traditional Feng Shui direction
  generates: ElementKey; // the element this one produces
  controls: ElementKey; // the element this one overcomes
}

export interface ZodiacProfile {
  key: string;
  name: string;
  chinese: string;
  pinyin: string;
  image: string;
  years: string;
  personality: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  bestMatches: string[];
  luckyColors: string[];
  luckyNumbers: number[];
}

export interface DestinyReading {
  year: number;
  zodiac: ZodiacProfile;
  element: ElementProfile;
  polarity: Polarity;
  pillarName: string; // e.g. "Yang Wood Dragon"
  luckyColors: string[];
  luckyNumbers: number[];
}

export interface FortuneScore {
  key: "love" | "career" | "wealth" | "health";
  label: string;
  score: number; // 0 - 100
  note: string;
}

export interface CompatibilityResult {
  score: number; // 0 - 100
  verdict: string;
  summary: string;
  advice: string[];
  zodiacA: ZodiacProfile;
  zodiacB: ZodiacProfile;
  elementA: ElementProfile;
  elementB: ElementProfile;
}

/* ------------------------------------------------------------------ */
/* Five Elements data                                                  */
/* ------------------------------------------------------------------ */

export const ELEMENTS: Record<ElementKey, ElementProfile> = {
  wood: {
    key: "wood",
    name: "Wood",
    chinese: "木",
    pinyin: "Mù",
    tagline: "Growth · Vitality · The Pioneer",
    personality:
      "Wood people are idealistic, expansive and warm-hearted. Like a forest reaching for light, you grow toward possibility — curious, generous and quick to start new ventures. Your imagination is matched only by your appetite for progress.",
    career: [
      "Entrepreneurship & startups",
      "Education & coaching",
      "Design, architecture & planning",
      "Environmental & social work",
    ],
    relationships:
      "You give generously and inspire those around you, but need a partner who respects your independence and shared vision. You flourish with people who give you room to grow.",
    strengths: ["Visionary", "Compassionate", "Resilient", "Cooperative"],
    challenges: ["Overcommitting", "Impatience", "Difficulty saying no"],
    luckyColors: ["Emerald Green", "Teal", "Olive"],
    luckyNumbers: [3, 8],
    luckyDirection: "East",
    generates: "fire",
    controls: "earth",
  },
  fire: {
    key: "fire",
    name: "Fire",
    chinese: "火",
    pinyin: "Huǒ",
    tagline: "Passion · Insight · The Catalyst",
    personality:
      "Fire people are charismatic, dynamic and radiant. You illuminate every room, leading with passion and inspiring action. Decisive and expressive, you transform ideas into momentum faster than anyone around you.",
    career: [
      "Leadership & public roles",
      "Performing arts & media",
      "Sales & marketing",
      "Innovation & technology",
    ],
    relationships:
      "Intensely affectionate and loyal, you love with your whole heart. You thrive with a partner who matches your warmth without being consumed by your flame.",
    strengths: ["Charismatic", "Confident", "Inspiring", "Decisive"],
    challenges: ["Impulsiveness", "Burnout", "Restlessness"],
    luckyColors: ["Vermillion Red", "Crimson", "Coral"],
    luckyNumbers: [2, 7],
    luckyDirection: "South",
    generates: "earth",
    controls: "metal",
  },
  earth: {
    key: "earth",
    name: "Earth",
    chinese: "土",
    pinyin: "Tǔ",
    tagline: "Stability · Nurture · The Anchor",
    personality:
      "Earth people are grounded, reliable and nurturing. You are the steady center others return to — patient, fair and deeply trustworthy. You build slowly and well, turning chaos into lasting structure.",
    career: [
      "Management & operations",
      "Healthcare & care work",
      "Real estate & agriculture",
      "Finance & administration",
    ],
    relationships:
      "Devoted and protective, you offer security and consistency. You bond best with partners who value loyalty and the home you create together.",
    strengths: ["Dependable", "Patient", "Practical", "Loyal"],
    challenges: ["Stubbornness", "Over-caution", "Resistance to change"],
    luckyColors: ["Golden Ochre", "Sand", "Warm Brown"],
    luckyNumbers: [5, 0],
    luckyDirection: "Center / Southwest",
    generates: "metal",
    controls: "water",
  },
  metal: {
    key: "metal",
    name: "Metal",
    chinese: "金",
    pinyin: "Jīn",
    tagline: "Precision · Clarity · The Strategist",
    personality:
      "Metal people are disciplined, principled and refined. You pursue excellence with sharp focus and unwavering standards. Independent and self-reliant, you cut through noise to find the truth.",
    career: [
      "Law & strategy",
      "Engineering & precision crafts",
      "Research & analysis",
      "Banking & consulting",
    ],
    relationships:
      "You love with quiet depth and fierce loyalty. You connect best with partners who appreciate your integrity and give you space for solitude.",
    strengths: ["Determined", "Organized", "Honest", "Ambitious"],
    challenges: ["Rigidity", "Perfectionism", "Emotional reserve"],
    luckyColors: ["Antique Gold", "Silver", "White"],
    luckyNumbers: [6, 9],
    luckyDirection: "West",
    generates: "water",
    controls: "wood",
  },
  water: {
    key: "water",
    name: "Water",
    chinese: "水",
    pinyin: "Shuǐ",
    tagline: "Wisdom · Flow · The Philosopher",
    personality:
      "Water people are intuitive, adaptable and wise. You move with the currents of life, sensing what others miss. Diplomatic and imaginative, you find a path through any obstacle.",
    career: [
      "Writing & communication",
      "Diplomacy & negotiation",
      "Travel & logistics",
      "Therapy & the arts",
    ],
    relationships:
      "Empathetic and perceptive, you understand a partner deeply. You flourish with someone who values emotional honesty and shared exploration.",
    strengths: ["Intuitive", "Adaptable", "Persuasive", "Empathetic"],
    challenges: ["Indecision", "Over-sensitivity", "Avoidance"],
    luckyColors: ["Deep Blue", "Teal", "Black"],
    luckyNumbers: [1, 4],
    luckyDirection: "North",
    generates: "wood",
    controls: "fire",
  },
};

export const ELEMENT_ORDER: ElementKey[] = ["wood", "fire", "earth", "metal", "water"];

/* ------------------------------------------------------------------ */
/* Zodiac data                                                         */
/* ------------------------------------------------------------------ */

export const ZODIACS: ZodiacProfile[] = [
  {
    key: "rat",
    name: "Rat",
    chinese: "鼠",
    pinyin: "Shǔ",
    emoji: "/zodiac/rat.png",
    years: "1960, 1972, 1984, 1996, 2008, 2020",
    personality:
      "Quick-witted, resourceful and charming, the Rat thrives on opportunity and adapts to any situation with clever ease.",
    traits: ["Witty", "Resourceful", "Charming", "Curious"],
    strengths: ["Adaptable", "Intelligent", "Sociable", "Ambitious"],
    weaknesses: ["Opportunistic", "Restless", "Over-critical"],
    bestMatches: ["Dragon", "Monkey", "Ox"],
    luckyColors: ["Blue", "Gold", "Green"],
    luckyNumbers: [2, 3],
  },
  {
    key: "ox",
    name: "Ox",
    chinese: "牛",
    pinyin: "Niú",
    emoji: "/zodiac/ox.png",
    years: "1961, 1973, 1985, 1997, 2009, 2021",
    personality:
      "Diligent, dependable and strong, the Ox builds success through patience and persistence rather than shortcuts.",
    traits: ["Patient", "Honest", "Determined", "Methodical"],
    strengths: ["Hardworking", "Reliable", "Grounded", "Loyal"],
    weaknesses: ["Stubborn", "Reserved", "Inflexible"],
    bestMatches: ["Snake", "Rooster", "Rat"],
    luckyColors: ["White", "Yellow", "Green"],
    luckyNumbers: [1, 4],
  },
  {
    key: "tiger",
    name: "Tiger",
    chinese: "虎",
    pinyin: "Hǔ",
    emoji: "/zodiac/tiger.png",
    years: "1962, 1974, 1986, 1998, 2010, 2022",
    personality:
      "Brave, competitive and magnetic, the Tiger leads with courage and a fierce sense of justice.",
    traits: ["Brave", "Confident", "Charismatic", "Spontaneous"],
    strengths: ["Courageous", "Generous", "Energetic", "Loyal"],
    weaknesses: ["Impulsive", "Rebellious", "Short-tempered"],
    bestMatches: ["Horse", "Dog", "Pig"],
    luckyColors: ["Blue", "Grey", "Orange"],
    luckyNumbers: [1, 3, 4],
  },
  {
    key: "rabbit",
    name: "Rabbit",
    chinese: "兔",
    pinyin: "Tù",
    emoji: "/zodiac/rabbit.png",
    years: "1963, 1975, 1987, 1999, 2011, 2023",
    personality:
      "Gentle, elegant and kind, the Rabbit values harmony and creates beauty and calm wherever it goes.",
    traits: ["Gentle", "Elegant", "Compassionate", "Tactful"],
    strengths: ["Diplomatic", "Artistic", "Sincere", "Prudent"],
    weaknesses: ["Conflict-averse", "Indecisive", "Sensitive"],
    bestMatches: ["Goat", "Pig", "Dog"],
    luckyColors: ["Red", "Pink", "Purple", "Blue"],
    luckyNumbers: [3, 4, 6],
  },
  {
    key: "dragon",
    name: "Dragon",
    chinese: "龙",
    pinyin: "Lóng",
    emoji: "/zodiacdragon",
    years: "1964, 1976, 1988, 2000, 2012, 2024",
    personality:
      "Visionary, powerful and lucky, the Dragon commands attention and pursues greatness with unstoppable confidence.",
    traits: ["Visionary", "Confident", "Ambitious", "Magnetic"],
    strengths: ["Charismatic", "Intelligent", "Brave", "Inspiring"],
    weaknesses: ["Arrogant", "Impatient", "Demanding"],
    bestMatches: ["Rat", "Monkey", "Rooster"],
    luckyColors: ["Gold", "Silver", "Greyish White"],
    luckyNumbers: [1, 6, 7],
  },
  {
    key: "snake",
    name: "Snake",
    chinese: "蛇",
    pinyin: "Shé",
    emoji: "/zodiac/snake.png",
    years: "1965, 1977, 1989, 2001, 2013, 2025",
    personality:
      "Wise, intuitive and graceful, the Snake observes deeply and acts with calculated precision.",
    traits: ["Wise", "Intuitive", "Private", "Refined"],
    strengths: ["Strategic", "Charming", "Determined", "Perceptive"],
    weaknesses: ["Secretive", "Suspicious", "Possessive"],
    bestMatches: ["Ox", "Rooster", "Monkey"],
    luckyColors: ["Red", "Yellow", "Black"],
    luckyNumbers: [2, 8, 9],
  },
  {
    key: "horse",
    name: "Horse",
    chinese: "马",
    pinyin: "Mǎ",
    emoji: "/zodiac/horse.png",
    years: "1966, 1978, 1990, 2002, 2014, 2026",
    personality:
      "Free-spirited, energetic and warm, the Horse chases adventure and inspires others with boundless optimism.",
    traits: ["Energetic", "Independent", "Warm", "Adventurous"],
    strengths: ["Optimistic", "Sociable", "Hardworking", "Agile"],
    weaknesses: ["Impatient", "Impulsive", "Restless"],
    bestMatches: ["Tiger", "Goat", "Dog"],
    luckyColors: ["Yellow", "Green"],
    luckyNumbers: [2, 3, 7],
  },
  {
    key: "goat",
    name: "Goat",
    chinese: "羊",
    pinyin: "Yáng",
    emoji: "/zodiac/goat.png",
    years: "1967, 1979, 1991, 2003, 2015, 2027",
    personality:
      "Tender, creative and peace-loving, the Goat nurtures beauty and devotion in everything it touches.",
    traits: ["Gentle", "Creative", "Sympathetic", "Calm"],
    strengths: ["Artistic", "Kind", "Resilient", "Devoted"],
    weaknesses: ["Indecisive", "Pessimistic", "Worrying"],
    bestMatches: ["Rabbit", "Horse", "Pig"],
    luckyColors: ["Green", "Red", "Purple"],
    luckyNumbers: [2, 7],
  },
  {
    key: "monkey",
    name: "Monkey",
    chinese: "猴",
    pinyin: "Hóu",
    emoji: "/zodiac/monkey.png",
    years: "1968, 1980, 1992, 2004, 2016, 2028",
    personality:
      "Clever, playful and inventive, the Monkey solves problems with wit and never stops exploring.",
    traits: ["Clever", "Playful", "Inventive", "Versatile"],
    strengths: ["Intelligent", "Curious", "Charming", "Quick"],
    weaknesses: ["Mischievous", "Restless", "Cunning"],
    bestMatches: ["Rat", "Dragon", "Snake"],
    luckyColors: ["White", "Gold", "Blue"],
    luckyNumbers: [4, 9],
  },
  {
    key: "rooster",
    name: "Rooster",
    chinese: "鸡",
    pinyin: "Jī",
    emoji: "/zodiac/rooster.png",
    years: "1969, 1981, 1993, 2005, 2017, 2029",
    personality:
      "Observant, confident and hardworking, the Rooster takes pride in excellence and speaks its mind.",
    traits: ["Confident", "Punctual", "Honest", "Proud"],
    strengths: ["Diligent", "Courageous", "Talented", "Organized"],
    weaknesses: ["Critical", "Blunt", "Vain"],
    bestMatches: ["Ox", "Snake", "Dragon"],
    luckyColors: ["Gold", "Brown", "Yellow"],
    luckyNumbers: [5, 7, 8],
  },
  {
    key: "dog",
    name: "Dog",
    chinese: "狗",
    pinyin: "Gǒu",
    emoji: "/zodiac/dog.png",
    years: "1970, 1982, 1994, 2006, 2018, 2030",
    personality:
      "Loyal, honest and protective, the Dog stands firmly by its values and the people it loves.",
    traits: ["Loyal", "Honest", "Protective", "Just"],
    strengths: ["Trustworthy", "Brave", "Responsible", "Kind"],
    weaknesses: ["Anxious", "Pessimistic", "Stubborn"],
    bestMatches: ["Tiger", "Rabbit", "Horse"],
    luckyColors: ["Green", "Red", "Purple"],
    luckyNumbers: [3, 4, 9],
  },
  {
    key: "pig",
    name: "Pig",
    chinese: "猪",
    pinyin: "Zhū",
    emoji: "/zodiac/pig.png",
    years: "1971, 1983, 1995, 2007, 2019, 2031",
    personality:
      "Generous, sincere and easy-going, the Pig enjoys life's pleasures and gives wholeheartedly to others.",
    traits: ["Generous", "Sincere", "Optimistic", "Easy-going"],
    strengths: ["Compassionate", "Diligent", "Honest", "Tolerant"],
    weaknesses: ["Naive", "Indulgent", "Over-trusting"],
    bestMatches: ["Goat", "Rabbit", "Tiger"],
    luckyColors: ["Yellow", "Grey", "Brown", "Gold"],
    luckyNumbers: [2, 5, 8],
  },
];

// year % 12 -> zodiac index (2020 = Rat)
const ZODIAC_BY_MOD: Record<number, string> = {
  4: "rat",
  5: "ox",
  6: "tiger",
  7: "rabbit",
  8: "dragon",
  9: "snake",
  10: "horse",
  11: "goat",
  0: "monkey",
  1: "rooster",
  2: "dog",
  3: "pig",
};

/* ------------------------------------------------------------------ */
/* Core lookups                                                        */
/* ------------------------------------------------------------------ */

// Chinese New Year falls late Jan / mid Feb. For births in Jan or early Feb
// we shift to the previous year as a sensible approximation.
function adjustedZodiacYear(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  if (month === 0 || (month === 1 && day < 4)) {
    return year - 1;
  }
  return year;
}

export function getZodiacByYear(year: number): ZodiacProfile {
  const key = ZODIAC_BY_MOD[((year % 12) + 12) % 12];
  return ZODIACS.find((z) => z.key === key) ?? ZODIACS[0];
}

export function getElementByYear(year: number): { element: ElementProfile; polarity: Polarity } {
  const mod = ((year % 10) + 10) % 10;
  let key: ElementKey;
  if (mod === 0 || mod === 1) key = "metal";
  else if (mod === 2 || mod === 3) key = "water";
  else if (mod === 4 || mod === 5) key = "wood";
  else if (mod === 6 || mod === 7) key = "fire";
  else key = "earth";
  const polarity: Polarity = mod % 2 === 0 ? "Yang" : "Yin";
  return { element: ELEMENTS[key], polarity };
}

export function getReading(date: Date): DestinyReading {
  const zodiacYear = adjustedZodiacYear(date);
  const zodiac = getZodiacByYear(zodiacYear);
  const { element, polarity } = getElementByYear(zodiacYear);

  // Merge & de-duplicate lucky info from both element and zodiac.
  const luckyColors = Array.from(new Set([...element.luckyColors, ...zodiac.luckyColors])).slice(0, 5);
  const luckyNumbers = Array.from(new Set([...element.luckyNumbers, ...zodiac.luckyNumbers])).slice(0, 5);

  return {
    year: zodiacYear,
    zodiac,
    element,
    polarity,
    pillarName: `${polarity} ${element.name} ${zodiac.name}`,
    luckyColors,
    luckyNumbers,
  };
}

/* ------------------------------------------------------------------ */
/* Daily fortune                                                       */
/* ------------------------------------------------------------------ */

// Deterministic hash from birth date + target day so the same inputs
// always produce the same fortune.
function seededValue(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x); // 0..1
}

const FORTUNE_NOTES = {
  love: [
    "Hold space for honest words — connection deepens through openness today.",
    "A meaningful conversation could shift a relationship in your favour.",
    "Lead with warmth; small gestures carry unusual weight now.",
    "Patience with a loved one turns tension into tenderness.",
  ],
  career: [
    "Your focus is sharp — tackle the task you have been postponing.",
    "A collaborator brings an opportunity worth pursuing.",
    "Steady effort, not speed, wins the day. Build methodically.",
    "Speak up in a meeting; your perspective is needed.",
  ],
  wealth: [
    "Favourable energy for planning, less so for impulsive spending.",
    "An overlooked detail could protect or grow your resources.",
    "Generosity returns to you — give without keeping score.",
    "Review commitments before signing anything new today.",
  ],
  health: [
    "Honour your rhythm — rest is as productive as motion.",
    "Movement clears the mind; a short walk realigns your energy.",
    "Hydration and stillness restore your balance now.",
    "Listen to subtle signals from the body before they grow loud.",
  ],
};

export function getDailyFortune(birthDate: Date, target: Date = new Date()): FortuneScore[] {
  const birthSeed =
    birthDate.getFullYear() * 10000 + (birthDate.getMonth() + 1) * 100 + birthDate.getDate();
  const daySeed =
    target.getFullYear() * 10000 + (target.getMonth() + 1) * 100 + target.getDate();

  const categories: Array<{ key: FortuneScore["key"]; label: string; offset: number }> = [
    { key: "love", label: "Love", offset: 11 },
    { key: "career", label: "Career", offset: 29 },
    { key: "wealth", label: "Wealth", offset: 53 },
    { key: "health", label: "Health", offset: 71 },
  ];

  return categories.map(({ key, label, offset }) => {
    const r = seededValue(birthSeed * 0.0007 + daySeed * 0.013 + offset);
    const score = Math.round(45 + r * 54); // 45..99
    const notes = FORTUNE_NOTES[key];
    const note = notes[Math.floor(seededValue(daySeed + offset) * notes.length) % notes.length];
    return { key, label, score, note };
  });
}

/* ------------------------------------------------------------------ */
/* Compatibility                                                       */
/* ------------------------------------------------------------------ */

// Zodiac affinity groups (trines) and clashes.
const ZODIAC_TRINES: string[][] = [
  ["rat", "dragon", "monkey"],
  ["ox", "snake", "rooster"],
  ["tiger", "horse", "dog"],
  ["rabbit", "goat", "pig"],
];

const ZODIAC_CLASH: Record<string, string> = {
  rat: "horse",
  ox: "goat",
  tiger: "monkey",
  rabbit: "rooster",
  dragon: "dog",
  snake: "pig",
  horse: "rat",
  goat: "ox",
  monkey: "tiger",
  rooster: "rabbit",
  dog: "dragon",
  pig: "snake",
};

function zodiacScore(a: string, b: string): number {
  if (a === b) return 70;
  if (ZODIAC_CLASH[a] === b) return 30;
  const sameTrine = ZODIAC_TRINES.some((t) => t.includes(a) && t.includes(b));
  if (sameTrine) return 95;
  return 60;
}

function elementScore(a: ElementKey, b: ElementKey): number {
  if (a === b) return 80;
  if (ELEMENTS[a].generates === b || ELEMENTS[b].generates === a) return 95; // generating cycle
  if (ELEMENTS[a].controls === b || ELEMENTS[b].controls === a) return 45; // controlling cycle
  return 65;
}

export function getCompatibility(dateA: Date, dateB: Date): CompatibilityResult {
  const a = getReading(dateA);
  const b = getReading(dateB);

  const zScore = zodiacScore(a.zodiac.key, b.zodiac.key);
  const eScore = elementScore(a.element.key, b.element.key);
  const score = Math.round(zScore * 0.5 + eScore * 0.5);

  let verdict: string;
  if (score >= 88) verdict = "Celestial Union";
  else if (score >= 75) verdict = "Harmonious Match";
  else if (score >= 60) verdict = "Balanced Pairing";
  else if (score >= 45) verdict = "Growth Through Effort";
  else verdict = "A Challenging Path";

  const generating =
    ELEMENTS[a.element.key].generates === b.element.key ||
    ELEMENTS[b.element.key].generates === a.element.key;
  const controlling =
    ELEMENTS[a.element.key].controls === b.element.key ||
    ELEMENTS[b.element.key].controls === a.element.key;
  const sameTrine = ZODIAC_TRINES.some(
    (t) => t.includes(a.zodiac.key) && t.includes(b.zodiac.key),
  );
  const clash = ZODIAC_CLASH[a.zodiac.key] === b.zodiac.key;

  const summary = `${a.element.name} ${a.zodiac.name} meets ${b.element.name} ${b.zodiac.name}. ${
    generating
      ? "Your elements flow in a generating cycle — one naturally nourishes the other."
      : controlling
        ? "Your elements sit in a controlling cycle, creating productive friction that demands balance."
        : "Your elements coexist with steady, even energy."
  } ${
    sameTrine
      ? "As members of the same zodiac trine, you share instinctive understanding."
      : clash
        ? "Your signs sit opposite on the zodiac wheel, so differences will need conscious care."
        : "Your signs bring complementary perspectives to the relationship."
  }`;

  const advice: string[] = [];
  if (generating) advice.push("Let the giving flow both ways — take turns being the source of support.");
  if (controlling) advice.push("Channel your differences into shared goals rather than power struggles.");
  if (sameTrine) advice.push("Build on your natural rapport with shared adventures and traditions.");
  if (clash) advice.push("Practise patient, judgment-free communication to bridge contrasting instincts.");
  advice.push(
    `${a.zodiac.name} thrives on ${a.zodiac.strengths[0].toLowerCase()}; honour that in your partner.`,
  );
  advice.push(
    `${b.zodiac.name} values ${b.zodiac.strengths[0].toLowerCase()}; make room for it daily.`,
  );

  return {
    score,
    verdict,
    summary,
    advice: advice.slice(0, 4),
    zodiacA: a.zodiac,
    zodiacB: b.zodiac,
    elementA: a.element,
    elementB: b.element,
  };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  if (d.getFullYear() < 1900 || d > new Date()) return null;
  return d;
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export const ELEMENT_IMAGE_KEYS = ELEMENT_ORDER;
