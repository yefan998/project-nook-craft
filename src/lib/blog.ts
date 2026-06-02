export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  body: string[];
}

export const BLOG_POSTS: BlogPost[] = [
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
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
