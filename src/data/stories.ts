export interface TapToDefine {
  word: string;
  definition: string;
}

export interface Perspective {
  perspective: string;
  content: string;
}

export interface ReadingLevel {
  whatHappened: string;
  whyItMatters: string;
  whatPeopleThink: Perspective[];
  whatWeDontKnow: string;
  tapToDefine: TapToDefine[];
}

export interface Source {
  name: string;
  type: string;
}

export interface AudioVoices {
  anchor: string;
  narrator: string;
  bigSister: string;
  mrsM: string;
  coach: string;
}

export interface Story {
  id: string;
  headline: string;
  summary: string;
  topic: string;
  topicIcon: string;
  confidenceBadge: "green" | "yellow";
  publishedAt: string;
  ageGate: "all" | "teen" | "adult";
  readingLevels: {
    young: ReadingLevel;
    teen: ReadingLevel;
    adult: ReadingLevel;
  };
  sources: {
    confirming: Source[];
    methodology: string;
  };
  goDeeper: { label: string; url: string }[];
  audio: {
    young: AudioVoices;
    teen: AudioVoices;
    adult: AudioVoices;
  };
}

export const stories: Story[] = [
  {
    id: "nasa-mars-water-2026",
    headline: "NASA Confirms Large Underground Water Reserve on Mars",
    summary:
      "New radar data from the Mars Reconnaissance Orbiter reveals a massive underground water reservoir, reigniting debate about future human missions.",
    topic: "Science & Space",
    topicIcon: "🔬",
    confidenceBadge: "green",
    publishedAt: "2026-03-07T14:00:00Z",
    ageGate: "all",
    readingLevels: {
      young: {
        whatHappened:
          "Scientists at NASA found a huge amount of water hidden underground on Mars. They used a special tool on a spacecraft flying above Mars that can see through the ground, kind of like an X-ray. The water is frozen and mixed with rock deep below the surface.",
        whyItMatters:
          "Water is one of the most important things humans would need to live on Mars someday. Finding this much water means astronauts might not have to bring all their water from Earth, which would make a Mars trip much easier and cheaper.",
        whatPeopleThink: [
          {
            perspective: "Space exploration supporters",
            content:
              "This is a game-changer for sending humans to Mars. Having water already there means we can make drinking water, grow food, and even create rocket fuel on Mars itself.",
          },
          {
            perspective: "Budget-focused critics",
            content:
              "While the discovery is exciting, we still have enormous challenges to solve before sending people to Mars. We should focus spending on problems here on Earth first.",
          },
          {
            perspective: "Scientists",
            content:
              "The water reserve needs more study. We need to understand how deep it is, how hard it would be to reach, and whether it could contain signs of ancient Martian life.",
          },
        ],
        whatWeDontKnow:
          "Scientists aren't sure yet exactly how much water is there or how easy it would be to dig down and reach it. They also don't know if the water was ever liquid, which would be an important clue about whether Mars once had life.",
        tapToDefine: [
          {
            word: "reservoir",
            definition:
              "A large natural or artificial place where water is stored.",
          },
          {
            word: "radar",
            definition:
              "A system that sends out radio waves to detect objects or see through surfaces.",
          },
          {
            word: "orbiter",
            definition:
              "A spacecraft that flies in circles around a planet without landing on it.",
          },
        ],
      },
      teen: {
        whatHappened:
          "NASA announced that the Mars Reconnaissance Orbiter's SHARAD radar instrument has detected a substantial underground water-ice reservoir beneath the Medusae Fossae formation near the Martian equator. The deposit is estimated to hold enough water to fill Lake Michigan and sits roughly 1.5 kilometers below the surface.",
        whyItMatters:
          "Access to water on Mars is considered the single biggest factor in determining whether human missions are feasible. Water can be used for drinking, agriculture, and — when split into hydrogen and oxygen — as breathable air and rocket propellant. An equatorial location is also more practical for landing missions than the polar ice caps.",
        whatPeopleThink: [
          {
            perspective: "Space agencies",
            content:
              "NASA and ESA say this strengthens the case for crewed Mars missions in the 2030s. In-situ resource utilization (using materials already on Mars) has always been central to mission planning, and a confirmed water source accelerates those timelines.",
          },
          {
            perspective: "Skeptics",
            content:
              "Extracting water from 1.5 km underground on another planet is an engineering challenge we haven't come close to solving. The discovery is scientifically interesting but practically distant.",
          },
          {
            perspective: "Astrobiologists",
            content:
              "Underground water, even frozen, could harbor microbial life or preserve biosignatures from Mars's wetter past. This site should be a top priority for future sample-return missions.",
          },
        ],
        whatWeDontKnow:
          "The exact volume and purity of the water remain uncertain. Researchers don't yet know whether the ice is in a continuous sheet or mixed with regolith in a way that would complicate extraction. There's also no consensus on whether liquid water ever existed at this depth.",
        tapToDefine: [
          {
            word: "regolith",
            definition:
              "The layer of loose rock and dust covering the solid bedrock of a planet.",
          },
          {
            word: "biosignature",
            definition:
              "Any substance or pattern that provides evidence of past or present life.",
          },
          {
            word: "in-situ resource utilization",
            definition:
              "The practice of using materials found on-site (like on Mars) instead of bringing them from Earth.",
          },
        ],
      },
      adult: {
        whatHappened:
          "NASA's Jet Propulsion Laboratory published findings confirming that the SHARAD (Shallow Radar) instrument aboard the Mars Reconnaissance Orbiter has identified a massive subsurface water-ice deposit beneath the Medusae Fossae formation, a wind-sculpted volcanic region straddling the Martian equator. Peer-reviewed analysis estimates the reservoir at approximately 5 million cubic kilometers of water-ice, comparable in volume to the North American Great Lakes combined. The deposit lies 1.2 to 1.8 kilometers below the surface.",
        whyItMatters:
          "This discovery fundamentally alters the resource calculus for crewed Mars exploration. Previous confirmed water-ice deposits at the Martian poles posed logistical challenges due to extreme cold, limited solar energy, and difficult terrain. An equatorial subsurface reservoir opens the possibility of co-locating landing sites, habitats, and water extraction infrastructure in a region with more favorable energy and temperature conditions. It also has profound implications for astrobiology and our understanding of Mars's hydrological history.",
        whatPeopleThink: [
          {
            perspective: "NASA and international space agencies",
            content:
              "The finding validates decades of orbital radar research investment and is being incorporated into site-selection models for the Artemis-successor Mars architecture. ESA's ExoMars program is evaluating whether its drill technology could be adapted to reach these depths.",
          },
          {
            perspective: "Private space sector",
            content:
              "SpaceX and Blue Origin have cited in-situ water as critical to their Mars settlement economics. Elon Musk called the finding 'the best news for Mars colonization in a decade,' though independent engineers caution that drilling technology for 1.5 km on Mars doesn't exist yet.",
          },
          {
            perspective: "Planetary scientists",
            content:
              "The deposit's equatorial location challenges existing models of Martian water distribution, which predicted most subsurface ice would be concentrated at higher latitudes. Some researchers suggest the deposit may be a relic of a period when Mars's axial tilt was significantly different.",
          },
        ],
        whatWeDontKnow:
          "Key unknowns include the ice-to-regolith ratio within the deposit, whether any portion exists as briny liquid at depth due to geothermal heating, and the isotopic composition of the water (which would reveal its origin). No current or planned Mars mission has the drilling capability to directly sample at these depths, so confirmation will likely require a dedicated future mission.",
        tapToDefine: [
          {
            word: "SHARAD",
            definition:
              "Shallow Radar — an instrument that sends radar pulses through the Martian surface to map subsurface structures and detect water-ice.",
          },
          {
            word: "Medusae Fossae formation",
            definition:
              "One of the largest volcanic deposits on Mars, located near the equator, known for its wind-eroded ridges and troughs.",
          },
          {
            word: "axial tilt",
            definition:
              "The angle between a planet's rotational axis and its orbital plane, which affects climate and seasonal patterns.",
          },
        ],
      },
    },
    sources: {
      confirming: [
        { name: "NASA Jet Propulsion Laboratory", type: "primary source" },
        { name: "Nature Geoscience", type: "peer-reviewed journal" },
        { name: "European Space Agency", type: "independent confirmation" },
      ],
      methodology:
        "Lens verified this story against the original JPL press release, the peer-reviewed paper in Nature Geoscience, and independent commentary from ESA scientists not involved in the study.",
    },
    goDeeper: [
      {
        label: "NASA JPL press release",
        url: "https://www.jpl.nasa.gov",
      },
      {
        label: "Nature Geoscience paper",
        url: "https://www.nature.com/ngeo",
      },
    ],
    audio: {
      young: {
        anchor: "/audio/nasa-mars-water-2026_young_anchor.mp3",
        narrator: "/audio/nasa-mars-water-2026_young_narrator.mp3",
        bigSister: "/audio/nasa-mars-water-2026_young_bigSister.mp3",
        mrsM: "/audio/nasa-mars-water-2026_young_mrsM.mp3",
        coach: "/audio/nasa-mars-water-2026_young_coach.mp3",
      },
      teen: {
        anchor: "/audio/nasa-mars-water-2026_teen_anchor.mp3",
        narrator: "/audio/nasa-mars-water-2026_teen_narrator.mp3",
        bigSister: "/audio/nasa-mars-water-2026_teen_bigSister.mp3",
        mrsM: "/audio/nasa-mars-water-2026_teen_mrsM.mp3",
        coach: "/audio/nasa-mars-water-2026_teen_coach.mp3",
      },
      adult: {
        anchor: "/audio/nasa-mars-water-2026_adult_anchor.mp3",
        narrator: "/audio/nasa-mars-water-2026_adult_narrator.mp3",
        bigSister: "/audio/nasa-mars-water-2026_adult_bigSister.mp3",
        mrsM: "/audio/nasa-mars-water-2026_adult_mrsM.mp3",
        coach: "/audio/nasa-mars-water-2026_adult_coach.mp3",
      },
    },
  },
  {
    id: "eu-ai-labor-rules-2026",
    headline:
      "European Union Passes Sweeping Rules Requiring AI Disclosure in Hiring",
    summary:
      "New EU legislation mandates that companies disclose when AI systems are used to screen, rank, or reject job applicants.",
    topic: "Technology",
    topicIcon: "💻",
    confidenceBadge: "green",
    publishedAt: "2026-03-06T09:30:00Z",
    ageGate: "all",
    readingLevels: {
      young: {
        whatHappened:
          "The European Union, a group of 27 countries in Europe, passed a new law about artificial intelligence and jobs. The law says that any company using a computer program to help decide who gets hired has to tell the people applying. Companies also have to explain how the program makes its decisions.",
        whyItMatters:
          "More and more companies use computer programs to look through job applications because they get so many. But sometimes these programs can be unfair without anyone realizing it. This law is meant to make sure people know when a computer — not just a human — is helping decide whether they get a job.",
        whatPeopleThink: [
          {
            perspective: "Workers' rights groups",
            content:
              "This is a huge win for fairness. People deserve to know if a robot is deciding their future, and they should be able to challenge unfair decisions.",
          },
          {
            perspective: "Tech companies",
            content:
              "The rules are too strict and will make it harder and more expensive to hire people. AI tools help companies find the best candidates faster.",
          },
          {
            perspective: "Other governments",
            content:
              "Some countries outside Europe are watching closely. They might pass similar laws, or they might worry that too many rules will slow down new technology.",
          },
        ],
        whatWeDontKnow:
          "It's not clear yet exactly how companies will have to explain their AI tools, or what happens if a company outside Europe hires people in Europe. The law takes effect in 18 months, so there's still time for the details to be worked out.",
        tapToDefine: [
          {
            word: "artificial intelligence",
            definition:
              "Computer programs that can learn and make decisions that usually require human thinking.",
          },
          {
            word: "legislation",
            definition: "A law or set of laws made by a government.",
          },
          {
            word: "disclosure",
            definition:
              "The act of making something known that was previously hidden or secret.",
          },
        ],
      },
      teen: {
        whatHappened:
          "The European Parliament voted 421–205 to adopt the AI Employment Transparency Act, which requires any employer operating within the EU to disclose the use of automated systems in hiring. This includes AI-powered resume screeners, video interview analyzers, and algorithmic ranking tools. Companies must provide applicants with a plain-language explanation of how the AI evaluates them and offer a human review option if requested.",
        whyItMatters:
          "AI hiring tools are already used by an estimated 75% of large companies globally. Studies have shown these systems can inherit biases from their training data — for example, penalizing candidates who attended less prestigious universities or who have gaps in employment. Until now, most applicants had no idea AI was involved in evaluating them. This law sets the first major legal standard for transparency.",
        whatPeopleThink: [
          {
            perspective: "EU lawmakers",
            content:
              "This is a natural extension of the EU's AI Act passed in 2024. High-risk AI applications like hiring decisions require guardrails to protect fundamental rights.",
          },
          {
            perspective: "Tech industry",
            content:
              "Industry groups warn that mandatory explainability could force companies to use simpler, less effective models. They argue the law treats all AI tools the same regardless of risk level.",
          },
          {
            perspective: "Labor economists",
            content:
              "Transparency alone isn't enough — the law should mandate regular audits of AI hiring tools for discriminatory outcomes, not just require disclosure.",
          },
        ],
        whatWeDontKnow:
          "Enforcement mechanisms are still being defined. It's unclear how regulators will verify that companies' AI explanations are accurate or whether the human review option will be meaningful in practice. The law's impact on non-EU companies that hire EU residents remotely is also legally untested.",
        tapToDefine: [
          {
            word: "algorithmic",
            definition:
              "Based on a set of step-by-step rules or calculations that a computer follows to solve a problem or make a decision.",
          },
          {
            word: "explainability",
            definition:
              "The ability of an AI system to describe its decision-making process in terms humans can understand.",
          },
          {
            word: "training data",
            definition:
              "The information used to teach an AI system how to make decisions, which shapes its behavior and potential biases.",
          },
        ],
      },
      adult: {
        whatHappened:
          "The European Parliament adopted the AI Employment Transparency Act (AETA) by a 421–205 margin, establishing the world's most comprehensive regulatory framework for AI in employment decisions. The legislation, which takes effect in Q3 2027, requires employers operating within EU jurisdiction to: (1) disclose the use of any automated decision-making system in recruitment, (2) provide applicants with an accessible explanation of evaluation criteria and weighting, (3) offer meaningful human review upon request, and (4) conduct and publish annual bias audits of their AI hiring tools. The law applies to all stages of hiring from resume screening through final selection.",
        whyItMatters:
          "The AETA represents a significant expansion of the EU's AI regulatory architecture beyond the foundational AI Act of 2024. It arrives as AI hiring tools have become ubiquitous — HR technology analysts estimate 83% of Fortune 500 companies use some form of automated candidate screening. Academic research has documented systematic biases in these tools: a 2025 MIT study found that major AI resume screeners rated identical qualifications 15–22% lower when associated with names common among racial minorities. The regulation creates extraterritorial compliance obligations for any company hiring within the EU, mirroring the GDPR's global impact on data privacy practices.",
        whatPeopleThink: [
          {
            perspective: "EU regulators",
            content:
              "European Commission Vice President Věra Jourová called AETA 'the logical next step' in the EU's human-centered AI strategy. Regulators view employment as a high-stakes domain where algorithmic opacity poses unacceptable risks to individual rights and social mobility.",
          },
          {
            perspective: "Multinational employers",
            content:
              "Business Europe, the continent's largest employer federation, expressed concern about compliance costs and competitive disadvantage relative to firms operating exclusively in less-regulated markets. Some companies are evaluating whether to maintain separate hiring pipelines for EU and non-EU applicants.",
          },
          {
            perspective: "AI ethics researchers",
            content:
              "Researchers broadly welcome the transparency requirements but note that annual bias audits may be insufficient given how quickly AI models drift. Some advocate for continuous monitoring and real-time reporting of demographic outcome disparities.",
          },
        ],
        whatWeDontKnow:
          "Several implementation questions remain unresolved. The European AI Office has 12 months to issue technical standards defining what constitutes an adequate explanation of AI decision-making — a notoriously difficult problem in machine learning. The interaction between AETA and existing member-state labor laws is also unclear, particularly in countries like France and Germany that have strong works council frameworks. Finally, the extraterritorial enforcement mechanism for non-EU companies has not been tested.",
        tapToDefine: [
          {
            word: "extraterritorial",
            definition:
              "The extension of a country's legal authority beyond its own borders, applying to foreign entities that operate within its jurisdiction.",
          },
          {
            word: "algorithmic opacity",
            definition:
              "The difficulty or impossibility of understanding how a complex AI system arrives at a particular decision, often called the 'black box' problem.",
          },
          {
            word: "model drift",
            definition:
              "The gradual change in an AI model's behavior over time as the data it encounters diverges from its original training data.",
          },
        ],
      },
    },
    sources: {
      confirming: [
        { name: "European Parliament", type: "primary source" },
        { name: "Reuters", type: "wire service" },
        { name: "Politico Europe", type: "policy journalism" },
      ],
      methodology:
        "Lens verified this story against the official European Parliament legislative record, reporting from Reuters Brussels bureau, and analysis from Politico Europe's technology policy team.",
    },
    goDeeper: [
      {
        label: "European Parliament legislative record",
        url: "https://www.europarl.europa.eu",
      },
      {
        label: "Reuters coverage",
        url: "https://www.reuters.com",
      },
    ],
    audio: {
      young: {
        anchor: "/audio/eu-ai-labor-rules-2026_young_anchor.mp3",
        narrator: "/audio/eu-ai-labor-rules-2026_young_narrator.mp3",
        bigSister: "/audio/eu-ai-labor-rules-2026_young_bigSister.mp3",
        mrsM: "/audio/eu-ai-labor-rules-2026_young_mrsM.mp3",
        coach: "/audio/eu-ai-labor-rules-2026_young_coach.mp3",
      },
      teen: {
        anchor: "/audio/eu-ai-labor-rules-2026_teen_anchor.mp3",
        narrator: "/audio/eu-ai-labor-rules-2026_teen_narrator.mp3",
        bigSister: "/audio/eu-ai-labor-rules-2026_teen_bigSister.mp3",
        mrsM: "/audio/eu-ai-labor-rules-2026_teen_mrsM.mp3",
        coach: "/audio/eu-ai-labor-rules-2026_teen_coach.mp3",
      },
      adult: {
        anchor: "/audio/eu-ai-labor-rules-2026_adult_anchor.mp3",
        narrator: "/audio/eu-ai-labor-rules-2026_adult_narrator.mp3",
        bigSister: "/audio/eu-ai-labor-rules-2026_adult_bigSister.mp3",
        mrsM: "/audio/eu-ai-labor-rules-2026_adult_mrsM.mp3",
        coach: "/audio/eu-ai-labor-rules-2026_adult_coach.mp3",
      },
    },
  },
];
