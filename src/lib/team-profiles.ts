/**
 * Full profiles for each team member, taken from the bios on the practice's current site.
 * Only obvious typos and line wrapping were cleaned up; the words are the team's own.
 */

export type Profile = {
  /** A short line set above the bio, when the person wrote one. */
  headline?: string;
  bio: string[];
  /** Paragraphs the person wrote in Korean, shown with lang="ko". */
  bioKorean?: string[];
  specialties: string[];
  approaches: string[];
  education: string[];
  credentials?: string[];
  /** Shown near the name for clinicians practicing under supervision. */
  note?: string;
};

export const profiles: Record<string, Profile> = {
  "elly-jeong": {
    bio: [
      "My goal is not to “fix” your problems but to help you overcome life’s hardships without a significant crisis. I try my sincere best to be a safe place for you to share your life stories and support your journey.",
      "I am a Licensed Clinical Social Worker (LCSW) with specialized training in mental health. I have various experiences as a clinician working with people with serious mental illness (SMI) and co-occurring disorders. I also have experience with people with mood disorders and personality disorders. My clinical and research interests are how culture plays a role in one’s life, how to reconstruct relationships through reconstructing one’s unresolved trauma, and how to strengthen one’s resilience to cope with life difficulties.",
      "Lately, I’ve been focused on assisting second-generation immigrant teens and adults in developing a strong sense of self and bridging the cultural divide with their first-generation immigrant parents.",
      "I provide mental health care in English, Korean, and Japanese.",
    ],
    bioKorean: [
      "안녕하세요! 심리상담사 앨리 정입니다.",
      "유학생으로, 그리고 지금은 미국 사회에서 자리를 잡은 이민자로서 한인 가정을 돕다 보니, 많은 분들이 여러 가지 문제를 가족 내에서만, 그리고 가족 구성원 안에서만 해결하시려는 모습을 자주 보게 됩니다. 안타깝게도 어떤 문제들은 개개인의 노력만으로는 해결되지 않을 때가 있습니다. 그런 분들을 위해 제가 곁에서 가족 같은 마음으로 성심껏 여러분의 어려움을 도와드리겠습니다.",
    ],
    specialties: [
      "Relationship problems",
      "Parenting",
      "Serious mental illness",
      "Mood disorders",
      "Personality disorders",
      "Complex trauma",
      "Self-esteem",
      "Addiction in the Asian American community",
    ],
    approaches: [],
    education: [
      "Master of Social Work, Columbia University School of Social Work, 2019",
      "Bachelor of Arts, Hampshire College, 2014",
    ],
  },
  "jasmin-mata": {
    bio: [
      "Hello! I’m Jasmin Mata-Sanchez, a Licensed Master Social Worker with a Master of Social Work from the University of Georgia. I believe that therapy should be a space where you feel safe, heard, and understood. I also believe that every client is different, so therapy should never be a one-size-fits-all experience.",
      "I have experience working with children, adolescents, and adults in both individual and group settings. I have supported clients navigating anxiety, depression, trauma, relationships, life transitions, motivation, and difficult decisions. I particularly enjoy working with adolescents and helping them navigate the challenges that come with growing up, while also helping them better understand themselves and their experiences. I look forward to continuing to grow my experience working with adults as well.",
      "My approach is honest, collaborative, and grounded in building a strong therapeutic relationship. I draw from Cognitive Behavioral Therapy (CBT), Dialectical Behavioral Therapy (DBT), Acceptance and Commitment Therapy (ACT), mindfulness, and play therapy. I believe that feeling comfortable enough to be honest with your therapist is an important part of creating meaningful change.",
      "As a first-generation Mexican American, I understand how meaningful it can be to have someone who understands parts of your experience without needing you to explain everything. Having someone like that to talk to would have made a meaningful difference for me, and I hope to provide that same sense of understanding and connection to my clients.",
      "When I’m not working, I enjoy crafting, painting, going on walks, and spending time with my cats!",
    ],
    specialties: ["Anxiety", "Depression", "Trauma", "Relationships", "Life transitions", "Teens"],
    approaches: ["CBT", "DBT", "ACT", "Mindfulness", "Play therapy"],
    education: ["Master of Social Work, University of Georgia School of Social Work"],
  },
  "abby-quinn": {
    bio: [
      "Hello, I’m Abby! I am a compassionate, dedicated therapist here to partner with children, families, adolescents, and young adults as they navigate life’s many challenges. Whether supporting clients through significant life transitions, managing anxiety and depression, or just being there to support, my primary goal is to build a safe, meaningful therapeutic relationship.",
      "My clinical focus centers on child and adolescent mental health, particularly exploring how emotional wellbeing impacts day-to-day life. I believe strongly in the connection between the mind and body and take a trauma-informed approach to understand the relation between thoughts, emotions, and behaviors. Therapy is a process; we will work together to prioritize your needs and build a personal toolbox of skills that are best suited for your life.",
      "Before entering the mental health field, I worked as a classroom teacher and an Applied Behavior Analysis (ABA) technician. These experiences provided me with a deep, practical understanding of human development, learning environments, and behavior while working with clients with Autism Spectrum Disorder (ASD), Attention Deficit Hyperactivity Disorder (ADHD), Oppositional Defiant Disorder (ODD), intellectual and developmental disabilities, anxiety, and depression.",
      "Grounded in a strong sense of cultural humility, I prioritize genuine curiosity, empathy, and understanding in every aspect of my work. I draw from evidence-based and collaborative modalities including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Acceptance and Commitment Therapy (ACT), play-based interventions, and mindfulness practices. Each session is tailored to meet the unique needs of you, your child, or family. Together, we will foster resilience, self-discovery, and sustainable growth.",
      "In my free time I love to read, take long walks with my dog, spend time at the beach, and travel to visit family and friends! If you feel we may be a good fit, please reach out!",
    ],
    specialties: ["Children & teens", "Families", "ADHD", "Autism", "Anxiety", "Depression", "Life transitions"],
    approaches: ["CBT", "DBT", "ACT", "Play-based interventions", "Mindfulness"],
    education: [
      "Master of Social Work, Arizona State University",
      "BA Psychology, University of Rhode Island",
      "BS Human Development and Family Sciences, University of Rhode Island",
    ],
  },
  "sarah-pak": {
    bio: [
      "I believe every child and adolescent has a story that cannot be understood through assumptions alone. One of the greatest privileges of my work is getting to know each young person as they are, not simply through their symptoms, behaviors, achievements, or struggles, but as a whole person. I approach therapy with genuine curiosity and humility, knowing that every individual carries experiences, relationships, strengths, and challenges that shape who they are. I believe meaningful change begins when someone feels truly understood.",
      "As a Korean American raised between two cultures, I understand the unique experience of balancing Korean family values with life in American culture. I know the tension of wanting to honor your family while also discovering your own voice and identity. This experience allows me to connect with children, teens, and families navigating similar questions with empathy and cultural understanding. My goal is not to separate young people from their families or backgrounds, but to help them better understand themselves so they can move through life with greater confidence, wisdom, and authenticity.",
      "My approach to therapy is integrative, collaborative, and individualized. I draw from evidence-informed approaches, including Cognitive Behavioral Therapy (CBT), mindfulness, trauma-informed care, and strengths-based interventions. While these approaches provide important tools, I believe therapy is ultimately built on the relationship between therapist and client. I do not assume I already know who someone is after a few conversations; I approach each person with openness, recognizing there is always more to learn about their story.",
      "I am passionate about supporting children and adolescents navigating anxiety, self-esteem struggles, academic pressure, family expectations, identity development, and life transitions. While helping young people find relief from emotional distress is an important part of therapy, I also hope to help them develop an inner foundation that is not easily shaken by comparison, failure, disappointment, or the changing opinions of others. When young people have a clearer understanding of who they are, they are better equipped to make thoughtful decisions, build healthy relationships, and face challenges without losing themselves.",
      "My clinical experience includes supporting children, adolescents, and families in school and community settings. Through my work as a social worker, family advocate, and youth leader, I have learned that growth happens through connection, honesty, and support. I strive to create a therapeutic space where clients feel safe exploring both their strengths and struggles, because people are more than the difficulties they are facing.",
    ],
    specialties: [
      "Children & teens",
      "Anxiety",
      "Self-esteem",
      "Academic pressure",
      "Family expectations",
      "Identity",
      "Life transitions",
    ],
    approaches: ["CBT", "Mindfulness", "Trauma-informed care", "Strengths-based"],
    education: [
      "Master of Social Work, California State University, Los Angeles",
      "Bachelor of Social Work, California State University, Los Angeles",
    ],
    credentials: ["Child Abuse General Training", "CANS Certified"],
  },
  "calvin-go": {
    bio: [
      "Hey there, my name is Calvin! The teenage and young adult years can feel overwhelming, but they are also some of the most formative and powerful seasons of growth. My heart for counseling began years ago while mentoring middle and high school students at my local church, walking alongside them through questions of identity, relational struggles, and emotional challenges.",
      "Today, as an Associate Counselor, I bring a highly specialized focus to my practice. I am certified in counseling children ages five and older, and I work extensively with youth and young adults navigating anxiety, depression, ADHD, school stress, and family dynamics. In addition to my work with youth, I specialize in men’s issues, providing targeted support for men working through romantic relationship struggles and healing from the father wound. My overarching goal is to create a safe, supportive space where individuals feel deeply understood, and parents know their child is being cared for with intention.",
      "My journey in the States began when I moved here at the age of 10. I had to learn a new language while adapting to an entirely different culture. I remember what it felt like to feel behind, misunderstood, or unsure of where I belonged. Those early challenges strengthened my resilience and gave me profound empathy for individuals trying to find their footing academically, socially, and emotionally. I understand how overwhelming life’s transitions can feel, and I desire to help others build confidence through that process.",
      "Another significant part of my journey was growing up with ADHD, which taught me the critical importance of building structure and developing strong routines to succeed. Through discipline and support, I graduated high school and college with honors. This firsthand background informs my clinical approach to supporting students as they work toward academic success, emotional balance, and healthy identity growth.",
      "Whether we are working through developmental milestones, healing past wounds, or navigating complex relationship dynamics, I would be honored to walk alongside you in building resilience, clarity, and confidence for the years ahead.",
    ],
    specialties: [
      "Kids 5+, teens & young adults",
      "Anxiety",
      "Depression",
      "ADHD",
      "School stress",
      "Family dynamics",
      "Men’s issues",
    ],
    approaches: [],
    education: [
      "Master of Arts in Clinical Mental Health Counseling, Liberty University",
      "Public Health, University of Georgia",
    ],
  },
  "mridula-priyadarshini": {
    bio: [
      "I am Mridula, a graduate of Pennsylvania Western University. I have a Master of Arts in Counseling, with a concentration in Art Therapy, and I am currently working towards fulfilling the requirements to become an LPC in the state of Georgia.",
      "I believe change is an undeniable constant in life and have experienced several changes in my own life: a change in location that involved moving to a different continent altogether, a change in profession, and a change in roles from daughter and sister to wife and then mother. Some changes were easier than others, but all have brought me to where I am today and the person I am.",
      "My aim in my practice is to hold space for individuals as they go through changes in their lives: a space that is non-judgmental and not threatening, for as long as they desire. I have 10-plus years of experience in the field of mental health. While my core training initially saw me use a more directive approach, the current me practices being present with you mindfully, and accompanying you on your journey at a pace set by you.",
      "I integrate the use of art in my sessions, as well as mindfulness-based practices, and lean towards a person-centered approach. I do not believe in a “one size fits all” approach, and I plan my sessions based on the current needs of my clients.",
      "In my free time, I can be found spending time with family, reading, painting, dabbling in gardening, or sometimes just vegetating. I love visiting art museums when I travel to other cities.",
    ],
    specialties: ["Life transitions", "Seasons of change", "Adults"],
    approaches: ["Art therapy", "Mindfulness", "Person-centered"],
    education: [
      "MA in Counseling, concentration in Art Therapy, Pennsylvania Western University",
      "DNB (Psychiatry), National Board of Examinations, India",
      "MBBS, Adichunchanagiri Institute of Medical Sciences, India",
    ],
  },
  "ayswarya-thampi": {
    headline: "A space to heal, grow, and find your way forward",
    bio: [
      "Life can feel overwhelming at times, and you don’t have to navigate its challenges alone. I’m Ash Thampi, an Associate Professional Counselor, and I’m here to support you as you work through life’s difficulties, better understand yourself, and create meaningful change.",
      "I work with adults navigating trauma, anxiety, depression, anger, addiction-related concerns, and relationship challenges. My educational background includes a master’s degree in Clinical Counseling with an emphasis in Addiction, along with dual master’s degrees in Clinical Psychology and Applied Psychology. This strong foundation in psychology helps me understand the complexities of mental health and tailor my approach to each person’s unique needs and experiences.",
      "Having lived and worked in India, Ireland, and the United States, I bring a multicultural perspective to my work. My experience across different countries and settings has deepened my appreciation for how culture, family, relationships, and life experiences shape our emotional well-being. I strive to create a welcoming, nonjudgmental space where clients feel heard, understood, and respected.",
      "My approach to therapy is collaborative, compassionate, and grounded in evidence-based care. Using approaches such as EMDR, Flash Technique, CBT, and DBT, we’ll work together to explore your experiences, develop practical coping skills, and find healthier ways to manage emotions and navigate life’s challenges.",
      "Outside of my work, I enjoy traveling, exploring new places, and unwinding with my family. I also enjoy trail walking, which allows me to slow down, reconnect with nature, and appreciate the little things in life.",
      "You don’t need to have everything figured out to begin. We can start wherever you are and take it one step at a time.",
    ],
    specialties: ["Adults", "Trauma", "Anxiety", "Depression", "Anger", "Addiction", "Relationships"],
    approaches: ["EMDR", "Flash Technique", "CBT", "DBT"],
    education: [
      "Master’s in Clinical Counseling, East Carolina University",
      "M.Phil. in Clinical Counseling, Sri Ramachandra Medical College, India",
      "Master’s in Applied Psychology, PSG College of Arts & Science, India",
    ],
  },
  "summer-perry": {
    bio: [
      "Hello! I am Summer Perry, and my goal as a mental health professional is to help young clients navigate life’s challenges. Our younger population requires assistance as they mature and strive to become more self-aware.",
      "I have worked with youth in the state of Georgia for the past ten years as a certified school counselor, and I am currently finishing my doctoral work at the University of Georgia. Professionally, I have taught master’s-level counselors-in-training and supervised their counseling experiences with young clients, including students from Mercer University, the University of Georgia, Clark Atlanta University, and Walden University.",
      "Working with the younger population is a passion of mine, and I am committed to providing the assistance they require to facilitate their walk into a healthier, more well-rounded way of approaching life and its challenges.",
      "My theoretical orientation centers on intersectionality and includes a focus on Narrative Therapy and Cognitive Behavioral Therapy. It is my belief that young clients are capable of change through acceptance, empathy, and unconditional positive regard, coupled with appropriate interventions to address their needs.",
    ],
    specialties: ["Children & teens", "School challenges", "Self-awareness"],
    approaches: ["Narrative therapy", "CBT", "Intersectional"],
    education: [
      "Specialist of Education, School Counseling, University of Georgia",
      "Master of Science, School Counseling, Mercer University",
      "Master of Education, Elementary Education, Mercer University",
      "Bachelor of Arts, Psychology, Tuskegee University",
    ],
    credentials: [
      "Assistant Professor of Counseling, Columbus State University",
      "Nationally Certified Counselor (NCC), NBCC",
      "Certified Professional School Counselor, Georgia Professional Standards Commission",
    ],
  },
  "aria-son": {
    bio: [
      "Life can feel overwhelming, and it’s easy to get stuck without knowing where to begin. I’m here to help you navigate those moments, not by avoiding challenges, but by empowering you to face them with clarity, compassion, and strength. I believe therapy can be a transformative space where difficulties become opportunities for growth. My goal is to support you in building resilience, creating meaningful change, and moving toward the life you truly envision.",
      "My approach to therapy is integrative and rooted in evidence-based practices, including Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Acceptance and Commitment Therapy (ACT), and mindfulness. Grounded in a client-centered, strengths-based, and trauma-informed perspective, I work with clients to foster self-understanding, emotional balance, and practical skills that support lasting growth.",
      "My specialties include anxiety, depression, trauma and PTSD, grief, ADHD, life transitions, and relationship challenges. With a strong background in neuroscience research and a deep commitment to culturally responsive, evidence-based care, I strive to provide holistic, high-quality therapy tailored to each client’s unique needs.",
    ],
    bioKorean: [
      "삶이 버겁고 어디서부터 풀어나가야 할지 막막할 때가 있습니다. 저는 그런 순간들을 함께 걸어가며, 어려움을 피하기보다는 내면의 힘과 심리적 안정감을 바탕으로 마주할 수 있도록 돕고자 합니다. 상담은 단순히 문제를 해결하는 공간이 아니라, 자신을 깊이 이해하고 성장할 수 있는 소중한 여정이라고 믿습니다.",
      "저는 신경과학 연구 경험과 문화적 민감성을 바탕으로, 각 내담자의 고유한 배경과 필요에 맞춘 따뜻하고 전문적인 상담을 제공합니다. 여러분이 자신을 더욱 이해하고 삶의 균형을 찾아갈 수 있도록, 공감과 전문성을 가지고 함께하겠습니다.",
    ],
    specialties: ["Anxiety", "Depression", "Trauma & PTSD", "Grief", "ADHD", "Life transitions", "Relationships"],
    approaches: ["CBT", "DBT", "ACT", "Mindfulness"],
    education: [
      "Master of Social Work, University of Georgia",
      "Bachelor’s in Psychology and Biology, University of Georgia",
    ],
  },
  "connie-wei": {
    bio: [
      "Hello and thank you for your interest! I am a Clinical Mental Health Counselor, and I believe that asking for help and trying to make a change can be one of the most difficult parts of life, so I want to congratulate you on already taking this huge step forward by even being here and looking at our info!",
      "I hope to be a warm, reassuring guide and safe space for you on your mental health journey, whether that looks like coping with depression, anxiety, OCD, difficult family or relationship dynamics, or even big life adjustments.",
      "My previous experience includes working with adults in addiction recovery, people diagnosed with mood and personality disorders, and several serious mental illnesses such as schizophrenia and bipolar disorder. I draw from several different approaches including Dialectical Behavioral Therapy (DBT), Cognitive Behavioral Therapy (CBT), and LGBTQ+ affirming CBT, and I am informed in trauma-informed methods like Narrative Therapy and Cognitive Processing Therapy (CPT).",
      "As a second-generation Chinese American, I have lived experience and understanding of the struggles with one’s cultural identity. I understand Cantonese but no longer speak it fluently, so I understand firsthand how difficult it can feel to try to reconnect with one’s heritage. My goal is to meet my clients where they are, to hold space for you without judgement and to meet you where you are at with your own unique perspective, without any bs. All I ask in return is for you to do the same and show up as your authentic self.",
    ],
    specialties: ["Depression", "Anxiety", "OCD", "Family & relationships", "Life adjustments", "Cultural identity"],
    approaches: ["DBT", "CBT", "LGBTQ+ affirming CBT", "Narrative therapy", "CPT"],
    education: [
      "Master’s in Clinical Mental Health Counseling, Mercer University",
      "Bachelor of Science in Biochemistry, Kennesaw State University",
    ],
  },
  "seema-sharma": {
    bio: [
      "My name, Seema, means “boundaries” in Sanskrit, and I have lived my life navigating and honoring them. As a second-generation immigrant, I grew up negotiating multiple worlds, honoring my family’s cultural heritage while finding my own path in a different context. As a mother, I navigate these challenges amid evolving generational shifts in cultural norms. I bring this personal experience and my professional training to my work in relationship issues, life transitions, depression, anxiety, and grief.",
      "I am a master’s-level clinician working towards my full licensure under supervision. My therapeutic approach is two-pronged, evidence-based and humanistic, such as utilizing CBT techniques. I am experienced in psychometry, trauma, and domestic violence advocacy.",
      "Whether you are seeking to improve your romantic relationship, navigate parenthood, or need support as you enter a new phase of life, the process often begins with identifying the right boundaries. My journey has taught me that there’s no one-size-fits-all. I’m here to help you find what works for your life and relationships.",
    ],
    specialties: ["Relationships", "Parenthood", "Life transitions", "Depression", "Anxiety", "Grief"],
    approaches: ["CBT", "Humanistic"],
    education: [
      "Master’s in Counseling Psychology, Western Michigan University",
      "Bachelor of Science in Psychology, Western Michigan University",
    ],
    credentials: ["Member, Licensed Professional Counselors Association"],
    note: "Practicing under supervision toward full licensure",
  },
  "madison-reeves": {
    bio: [
      "Hi there, I’m Madi! I’m glad you’re here! I am a therapist-in-training currently earning my master’s degree in social work (MSW) from the University of Georgia, where I also earned my bachelor’s degree in psychology.",
      "I have previous experience working with survivors of sexual assault and houselessness, and as such, I approach mental health from a trauma-informed, client-centered, and humanistic perspective. I am particularly interested in working with topics such as trauma processing and healing, identity development, life transitions (like starting school, a new job, or navigating relationships), and sexual health and wellness.",
      "Beginning therapy can be daunting at first. My goal with each client is to create a warm, accepting environment where you can come as you are, because I believe you are the expert of your own story. I welcome, affirm, and celebrate the LGBTQIA2S+ community, and I aim to maintain a culturally humble perspective that honors the uniqueness of each person’s intersecting identities.",
    ],
    specialties: ["Trauma", "Identity", "Life transitions", "Sexual health & wellness"],
    approaches: ["Trauma-informed", "Client-centered", "Humanistic"],
    education: ["MSW candidate, University of Georgia", "Bachelor’s in Psychology, University of Georgia"],
    note: "Graduate student intern",
  },
  "amani-tanner": {
    bio: [
      "As a dedicated and compassionate Office Manager, I am committed to creating a welcoming and positive experience for every patient. With a background in customer service, medical reception, scheduling, and administrative support, I bring strong communication, organization, and leadership skills to my role.",
      "I enjoy connecting with patients, supporting my team, and helping ensure that the office runs smoothly and efficiently. I take pride in providing exceptional service while making every patient feel comfortable, valued, and cared for.",
      "Outside of the office, I enjoy traveling, spending time with loved ones, and continuing to grow both personally and professionally. I am excited to be part of the team and look forward to building lasting relationships with clients and the community.",
    ],
    specialties: [],
    approaches: [],
    education: [],
  },
  "leanne-mathews": {
    bio: [
      "Hi, I’m Leanne! I am currently a high school intern and a senior at Lambert High School with a strong interest in psychology and mental health. I plan to pursue a degree in psychology after graduation, and I am especially interested in learning more about human behavior, mental health, and the ways we can support others through different stages of life.",
      "Through this internship, I’m excited to gain hands-on experience in a mental health setting while learning from the wonderful professionals around me. I enjoy connecting with others, learning new things, and finding ways to make people feel comfortable and supported.",
      "Outside of school and my internship, I enjoy creating art and playing music.",
    ],
    specialties: [],
    approaches: [],
    education: [],
  },
};
