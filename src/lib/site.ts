/**
 * Single source of truth for the practice's public facts and page copy.
 * Every fact here comes from the practice's current site (talktohealcounseling.com);
 * update this file, not the components, when details change.
 */

const LEGACY_SITE = "https://www.talktohealcounseling.com";

export const site = {
  name: "Talk To Heal Counseling Center",
  shortName: "Talk To Heal",
  tagline: "Your safe healing place",
  description:
    "Compassionate, culturally sensitive talk therapy for individuals, couples, families, and teens in Johns Creek, Georgia. Book a free 15-minute consultation.",
  url: "https://www.talktohealcounseling.com",
  bookingUrl: `${LEGACY_SITE}/book-online`,
  phone: { display: "404-369-3838", href: "tel:+14043693838" },
  fax: "470-780-4882",
  email: { general: "info@talktohealcounseling.com", billing: "Billing@talktohealcounseling.com" },
  address: {
    street: "11340 Lakefield Dr #240",
    city: "Johns Creek",
    region: "GA",
    postalCode: "30097",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=11340+Lakefield+Dr+%23240+Johns+Creek+GA+30097",
  },
  legalName: "Talk To Heal Counseling Center LLC",
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Our team", href: "#team" },
  { label: "Insurance", href: "#insurance" },
  { label: "FAQ", href: "#faq" },
] as const;

export type ServiceKey = "individual" | "couples" | "family" | "teens" | "groups" | "immigration";

export const services: { key: ServiceKey; title: string; body: string }[] = [
  {
    key: "individual",
    title: "Individual Therapy",
    body: "A space that is entirely yours. Untangle anxiety, low mood, stress, grief, or a season of change, and find your way back to the self you want to be.",
  },
  {
    key: "couples",
    title: "Couples Therapy",
    body: "Get to the roots of what keeps pulling you apart, then learn to listen, repair, and reconnect, together.",
  },
  {
    key: "family",
    title: "Family Therapy",
    body: "A family is one connected whole. We help every member feel heard across generations, cultures, and changes.",
  },
  {
    key: "teens",
    title: "Children, Teens & Young Adults",
    body: "Play, art, and talk-based care for the pressures of school, identity, friendships, and growing up between expectations and who you really are.",
  },
  {
    key: "groups",
    title: "Group Therapy & Support Groups",
    body: "Shared joy grows. Shared pain eases, like snow melting under the morning sun.",
  },
  {
    key: "immigration",
    title: "Immigration Evaluations",
    body: "Thorough, compassionate psychological evaluations for immigration court cases, written with the care your story deserves.",
  },
];

export type FocusKey = "lgbtq" | "culture" | "trauma" | "youth" | "faith";

export const focusAreas: { key: FocusKey; title: string; body: string }[] = [
  {
    key: "lgbtq",
    title: "LGBTQ+ & beyond",
    body: "Affirming care for every identity and every kind of love.",
  },
  {
    key: "culture",
    title: "Culturally sensitive",
    body: "Your background, language, and family story are part of the conversation, never a barrier to it.",
  },
  {
    key: "trauma",
    title: "Trauma-informed",
    body: "We move at a pace that feels safe, with choice and trust at the center.",
  },
  {
    key: "youth",
    title: "Teens & young adults",
    body: "Room to figure things out, without judgment.",
  },
  {
    key: "faith",
    title: "Faith-inclusive",
    body: "Bring your faith, your questions, or your doubt. All of it is welcome.",
  },
];

export const steps = [
  {
    title: "Reach out",
    body: "Book a free 15-minute consultation online, or call us. Tell us a little about what is on your mind. There is no pressure and no commitment.",
    note: `Book online, or call ${site.phone.display}.`,
  },
  {
    title: "Find your fit",
    body: "We match you with the therapist whose experience, style, and background fit what you need. The right relationship matters most.",
    note: "Choose any therapist, or let us suggest one.",
  },
  {
    title: "Begin at your pace",
    body: "In your first session, you and your therapist get to know each other and shape goals together. You decide what to share, and when.",
    note: "In person in Johns Creek, or online from home.",
  },
  {
    title: "Grow, and see it",
    body: "Regular check-ins help you notice what is changing. We adjust along the way, so therapy keeps fitting your life.",
    note: "Your goals, your pace, your progress.",
  },
] as const;

export type TeamMember = {
  slug: string;
  name: string;
  credentials?: string;
  role: string;
  /** One line drawn from the clinician's own bio. */
  focus?: string;
  /** Languages the clinician's bio lists as spoken (English first). */
  languages: string[];
  profileUrl: string;
  clinician: boolean;
};

export const team: TeamMember[] = [
  {
    slug: "elly-jeong",
    name: "Elly Jeong",
    credentials: "LCSW",
    role: "Founder & CEO",
    focus: "Immigrant families, relationships, trauma, and resilience",
    languages: ["English", "Korean", "Japanese"],
    profileUrl: `${LEGACY_SITE}/about-4`,
    clinician: true,
  },
  {
    slug: "jasmin-mata",
    name: "Jasmin Mata",
    credentials: "LMSW",
    role: "Associate Therapist",
    focus: "Children, teens, and adults; anxiety, trauma, life transitions",
    languages: ["English", "Spanish"],
    profileUrl: `${LEGACY_SITE}/about-4-14`,
    clinician: true,
  },
  {
    slug: "abby-quinn",
    name: "Abby Quinn",
    credentials: "MSW",
    role: "Associate Therapist",
    focus: "Children, teens, and families; ADHD, autism, anxiety",
    languages: ["English"],
    profileUrl: `${LEGACY_SITE}/about-4-16`,
    clinician: true,
  },
  {
    slug: "sarah-pak",
    name: "Sarah Pak",
    credentials: "MSW",
    role: "Associate Therapist",
    focus: "Children and teens growing up between two cultures",
    languages: ["English", "Korean"],
    profileUrl: `${LEGACY_SITE}/about-4-5`,
    clinician: true,
  },
  {
    slug: "calvin-go",
    name: "Calvin Go",
    credentials: "MA",
    role: "Associate Therapist",
    focus: "Kids 5+, teens, and young adults; ADHD, school stress, men's issues",
    languages: ["English", "Indonesian"],
    profileUrl: `${LEGACY_SITE}/about-4-12`,
    clinician: true,
  },
  {
    slug: "mridula-priyadarshini",
    name: "Mridula Priyadarshini",
    credentials: "MA",
    role: "Associate Therapist",
    focus: "Art therapy, mindfulness, and seasons of change",
    languages: ["English", "Hindi"],
    profileUrl: `${LEGACY_SITE}/about-4-1`,
    clinician: true,
  },
  {
    slug: "ayswarya-thampi",
    name: "Ayswarya Thampi",
    credentials: "LAPC",
    role: "Associate Therapist",
    focus: "Adults; trauma and EMDR, anxiety, addiction recovery",
    languages: ["English", "Tamil", "Malayalam", "Hindi"],
    profileUrl: `${LEGACY_SITE}/about-4-2`,
    clinician: true,
  },
  {
    slug: "summer-perry",
    name: "Summer Perry",
    credentials: "MS, EdS",
    role: "Associate Therapist",
    focus: "Children and teens; ten years as a Georgia school counselor",
    languages: ["English"],
    profileUrl: `${LEGACY_SITE}/about-4-4`,
    clinician: true,
  },
  {
    slug: "aria-son",
    name: "Aria Minjee Son",
    credentials: "LMSW",
    role: "Associate Therapist",
    focus: "Anxiety, trauma and PTSD, grief, ADHD",
    languages: ["English", "Korean"],
    profileUrl: `${LEGACY_SITE}/about-4-6`,
    clinician: true,
  },
  {
    slug: "connie-wei",
    name: "Connie Wei",
    credentials: "APC",
    role: "Associate Therapist",
    focus: "Depression, anxiety, OCD; LGBTQ+-affirming care",
    languages: ["English"],
    profileUrl: `${LEGACY_SITE}/about-4-7`,
    clinician: true,
  },
  {
    slug: "seema-sharma",
    name: "Seema Sharma",
    credentials: "MA",
    role: "Associate Therapist",
    focus: "Relationships, parenthood, grief, and life transitions",
    languages: ["English", "Gujarati"],
    profileUrl: `${LEGACY_SITE}/about-1`,
    clinician: true,
  },
  {
    slug: "madison-reeves",
    name: "Madison Reeves",
    role: "UGA MSW Graduate Student Intern",
    languages: ["English"],
    profileUrl: `${LEGACY_SITE}/about-4-15`,
    clinician: false,
  },
  {
    slug: "amani-tanner",
    name: "Amani Tanner",
    role: "Office Manager",
    languages: ["English"],
    profileUrl: `${LEGACY_SITE}/about-4-9`,
    clinician: false,
  },
  {
    slug: "leanne-mathews",
    name: "Leanne Mathews",
    role: "High School Intern",
    languages: ["English"],
    profileUrl: `${LEGACY_SITE}/about-4-10`,
    clinician: false,
  },
];

export const clinicians = team.filter((member) => member.clinician);

/** Every language spoken across the clinical team, English first, then by how many clinicians speak it. */
export const languages = (() => {
  const counts = new Map<string, number>();
  for (const member of clinicians) {
    for (const language of member.languages) counts.set(language, (counts.get(language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([a, ca], [b, cb]) => (a === "English" ? -1 : b === "English" ? 1 : cb - ca || a.localeCompare(b)))
    .map(([language]) => language);
})();

export const insurers = [
  "Aetna",
  "Aetna Resources for Living",
  "BlueCross BlueShield",
  "Carelon Behavioral Health",
  "CHAMPVA",
  "Cigna",
  "Cigna EAP",
  "Curative",
  "Evernorth",
  "Humana",
  "Kaiser Permanente",
  "Lyra Health",
  "Medicare",
  "Oscar",
  "TRICARE",
  "UnitedHealthcare",
] as const;

export const posts = [
  {
    title: "Can I bring my faith into therapy? What new 2026 research says about spirituality and healing",
    excerpt:
      "You can bring faith, religion, spirituality, doubt, or spiritual hurt into therapy. You do not have to choose between them.",
    minutes: 5,
    href: `${LEGACY_SITE}/post/can-i-bring-my-faith-into-therapy-what-new-2026-research-says-about-spirituality-and-healing`,
    tone: "sage",
  },
  {
    title: "Talking to a chatbot instead of your family? You're not broken, and you're not alone",
    excerpt:
      "Reaching for the words in a private, low-pressure space can be a way of coping with something that feels hard to carry.",
    minutes: 5,
    href: `${LEGACY_SITE}/post/talking-to-a-chatbot-instead-of-your-family-you-re-not-broken-and-you-re-not-alone`,
    tone: "blush",
  },
  {
    title: "When your family never talked about therapy: healing the children of immigrants who learned to stay quiet",
    excerpt: "You can love your family and still want a space of your own. Those feelings deserve care, not judgment.",
    minutes: 4,
    href: `${LEGACY_SITE}/post/when-your-family-never-talked-about-therapy-healing-the-children-of-immigrants-who-learned-to-stay`,
    tone: "sand",
  },
  {
    title: "Caregiver burnout is not a weakness: what I want Georgia families caring for aging parents to know",
    excerpt: "Feeling worn down does not mean you love your family any less. It means you are carrying a lot.",
    minutes: 5,
    href: `${LEGACY_SITE}/post/caregiver-burnout-is-not-a-weakness-what-i-want-georgia-families-caring-for-aging-parents-to-know`,
    tone: "linen",
  },
] as const;

export const journalUrl = `${LEGACY_SITE}/blog-1`;
export const teamUrl = `${LEGACY_SITE}/team-4`;

export const crisis = {
  lifeline: { label: "988 Suicide & Crisis Lifeline", display: "988", href: "tel:988" },
  emergency: { display: "911", href: "tel:911" },
  georgia: { label: "Georgia Crisis & Access Line", display: "1-800-715-4225", href: "tel:+18007154225" },
} as const;

export const policies = {
  cancellation: "Please cancel at least 24 hours ahead. Missed appointments without notice may be charged in full.",
  goodFaithEstimate:
    "Under the No Surprises Act, if you do not have insurance or are not using it, you have the right to receive a Good Faith Estimate of the expected cost of your care. Ask us for one before your first session.",
} as const;

export const faqs = [
  {
    question: "What happens in the free consultation?",
    answer:
      "It is a relaxed 15-minute phone call with the therapist of your choice. Share a little about what is going on, ask anything about how we work, and see whether it feels like a good fit. There is no cost and no commitment.",
  },
  {
    question: "Do you take my insurance?",
    answer: `We are in network with ${insurers.length} plans, including Aetna, BlueCross BlueShield, Cigna, Humana, Medicare, UnitedHealthcare, and TRICARE. Self-pay clients are always welcome. For coverage questions, email ${site.email.billing}.`,
  },
  {
    question: "Can I meet online, or do I need to come in?",
    answer:
      "Either. Sessions are available in person at our Johns Creek office or online from home, so you can choose whatever feels most comfortable.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Children, teens, adults, and older adults, as individuals, couples, families, and groups. Several of our therapists specialize in children and teens.",
  },
  {
    question: "Can I see a therapist who speaks my language or shares my culture?",
    answer: `Often, yes. Between us, our therapists speak ${languages.slice(0, -1).join(", ")}, and ${languages.at(-1)}. Use the language filter above, or ask during your free call.`,
  },
  {
    question: "Can I bring my faith into therapy?",
    answer:
      "Yes. You can bring faith, religion, spirituality, doubt, or spiritual hurt into therapy. You do not have to choose between your beliefs and your healing.",
  },
  {
    question: "Is what I share confidential?",
    answer:
      "Yes. What you share stays between you and your therapist, with a few exceptions required by law, such as when someone's safety is at serious risk. Your therapist will walk you through these in your first session.",
  },
  {
    question: "What if I need to cancel?",
    answer: policies.cancellation,
  },
  {
    question: "What if I need help right now?",
    answer: `${site.shortName} is not a crisis service. If you are in danger or thinking about harming yourself, call or text 988, call 911, or call the Georgia Crisis & Access Line at 1-800-715-4225, available 24/7.`,
  },
] as const;
