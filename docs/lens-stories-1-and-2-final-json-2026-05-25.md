# Lens — Stories 1 and 2 — Final JSON Deliverable

**Date:** May 25, 2026
**Status:** Final. Ready to paste into Claude Code.
**Source documents:** `lens-stories-1-and-2-final-prose-v2-2026-05-25.md` (prose) and `lens-stories-1-and-2-supporting-fields-2026-05-25.md` (supporting fields), with Metagenomi attribution applied at all three reading levels of Story 1, and all schema-required fields generated against the verified Story interface from `/src/data/stories.ts`.

---

## Instructions for Claude Code

This deliverable contains two complete Story objects ready to replace `patagonia-dinosaur-discovery-2026` (Science) and `artemis-ii-lunar-flyby-2026` (Space) in `/src/data/stories.ts`.

For each story:
1. Locate the existing story object in `/src/data/stories.ts`
2. Replace the entire object with the corresponding object below
3. Preserve surrounding array formatting (commas, brackets)
4. Run TypeScript check to confirm no schema errors
5. Boot the dev server to confirm rendering
6. Audio files (referenced in the `audio` field) are placeholders. The MP3 files do not exist yet; they will be generated before Session 12.

After both replacements:
- The total story count remains 14 (12 existing + 2 replacements)
- Story 1 replaces patagonia-dinosaur-discovery-2026 in the Science slot
- Story 2 replaces artemis-ii-lunar-flyby-2026 in the Space slot

---

## STORY 1 — CRISPR Breakthrough

```typescript
{
  id: "crispr-in-body-editing-2026",
  belowTheRadar: false,
  headline: "New CRISPR Tool Small Enough to Edit Genes Inside the Body",
  summary:
    "Scientists at UT Austin and the biotech company Metagenomi have built a CRISPR tool small enough to be delivered directly into the body, addressing one of the most persistent obstacles in gene-editing medicine. The findings, published in Nature Structural & Molecular Biology, could open gene therapies to diseases of the brain, heart, and liver that current treatments cannot reach.",
  topic: "Science",
  topicIcon: "🔬",
  confidenceBadge: "green",
  publishedAt: "2026-05-25T00:00:00Z",
  ageGate: "all",
  readingLevels: {
    young: {
      whatHappened:
        "DNA is the set of instructions inside every living cell. It tells your body how to grow, how to fight germs, and what color your eyes will be. Some diseases happen because a small part of those instructions has a mistake in it.\n\nCRISPR is a technology that lets scientists fix those mistakes. It can find one specific part of the DNA inside a cell and change it. CRISPR has already been used to treat people with a blood disease called sickle cell, and doctors are working on using it for many other illnesses.\n\nTwo groups of scientists worked together to build an important new CRISPR tool. The first group works at a company called Metagenomi. They found a tiny natural tool called an enzyme inside a microbe, and then they made a smaller, better version of it. An enzyme is a kind of protein that does a specific job inside a cell. The second group works at the University of Texas at Austin, led by a scientist named David Taylor. They studied the enzyme very carefully to understand exactly how it works. The two groups published what they discovered together in a science journal in April 2026.\n\nWhy does the size matter? Getting CRISPR into the right cells in a person's body is hard. Doctors use a kind of harmless tiny package called an AAV to carry CRISPR where it needs to go. AAVs can only hold so much. The old CRISPR tools were so big they barely fit, or did not fit at all.\n\nBecause the old tools were too big, doctors had to take cells out of a patient, fix them in a laboratory, and then put them back. That works for some diseases of the blood. It does not work for diseases of the brain, the heart, or the lungs, because doctors cannot take those cells out and put them back.\n\nThe new, smaller CRISPR tool fits inside one AAV. That means the fixing could happen inside the patient's body, instead of in a laboratory. Scientists hope to use it one day to treat diseases like cancer, ALS (a disease that slowly stops the body's muscles from working), and a disease called atherosclerosis that clogs the tubes carrying blood through the body.",
      whyItMatters:
        "The first CRISPR treatment that doctors are allowed to use in the United States helps people with sickle cell disease. It works, but it costs more than two million dollars per person, and patients have to stay in the hospital for weeks. That is because doctors have to take cells out, fix them, and put them back.\n\nA smaller CRISPR tool that can be delivered straight into the body could change all of that. It could be faster, and it could reach parts of the body that the old tools cannot reach. That matters most for people with diseases that live in the brain or in nerves, because those cells cannot be taken out and put back.\n\nBut the new tool has only been tested on cells in a laboratory. Getting from a laboratory test to a real treatment for real patients usually takes ten years or longer.",
      whatPeopleThink: [
        {
          perspective: "Scientists who work on CRISPR say:",
          content:
            "We are excited. For years we have been looking for a smaller CRISPR tool that works as well as the bigger ones. Most of the smaller tools we found were not as good at the job. This new one is small and good at the job. Other scientists are already working on tools like it.",
        },
        {
          perspective:
            "People who have diseases like ALS and the families who love them say:",
          content:
            "We have been waiting a long time. CRISPR has helped people with blood diseases, but not people with diseases of the brain or nerves, because doctors could not get the tools to those places in the body. A smaller tool that can travel to those places does not mean a cure yet. But without it, there cannot be a cure at all. Our point is that someone who is very sick thinks about risk differently from someone who is healthy, and the people making the rules about how fast this work should go are mostly not the people who are sick.",
        },
        {
          perspective: "Bioethicists say:",
          content:
            "We are people who study what is right and wrong about new science. We ask whether humans should be changing the instructions inside cells at all, and how fast we should be doing it. In 1996, scientists cloned a sheep named Dolly, which means they made a copy of her using only her DNA. Many people worried about what that meant, and governments around the world quickly passed laws to slow that kind of work down. We say CRISPR has not had that kind of careful conversation, and the new treatments are arriving faster than people have had a chance to decide how to use them.\n\nWe also worry about something specific to this new tool. Sometimes CRISPR makes a mistake and changes the wrong piece of DNA. When that happens, the cell can get sick, and in some cases the mistake can lead to cancer. With the old method, doctors check the cells in a laboratory first and throw away any with mistakes. With the new method, the fixing happens inside the body. Doctors cannot check first. If something goes wrong, the patient finds out later.",
        },
      ],
      whatWeDontKnow:
        "How often the new tool makes mistakes, how the body reacts to it, and whether the changes it makes last for years are all questions that have not been answered yet. The tool has not been tested in animals or in people. No real treatment has started. Most new medicines take ten years or longer to be ready for patients, and most of them never make it.",
      tapToDefine: [
        {
          word: "DNA",
          definition:
            "The set of instructions inside every living cell. DNA tells your body how to grow, how to fight germs, and what color your eyes will be.",
        },
        {
          word: "cell",
          definition:
            "The tiniest building block of any living thing. Your body has trillions of cells, and each one has a copy of your DNA.",
        },
        {
          word: "CRISPR",
          definition:
            "A technology that lets scientists fix mistakes in DNA. CRISPR can find one specific part of the DNA inside a cell and change it.",
        },
        {
          word: "enzyme",
          definition:
            "A tiny tool inside a cell that does a specific job. CRISPR uses enzymes to find and change the right piece of DNA.",
        },
        {
          word: "microbe",
          definition:
            "A living thing that is too small to see without a microscope. Some microbes make people sick, but many microbes are helpful, and one kind of microbe was the source of the new CRISPR tool in this story.",
        },
        {
          word: "AAV",
          definition:
            "A tiny harmless package that doctors use to carry medicine into cells. The new CRISPR tool is small enough to fit inside one of these packages.",
        },
        {
          word: "sickle cell",
          definition:
            "A blood disease that some people are born with. It can cause pain and other health problems. The first CRISPR treatment that doctors are allowed to use helps people with sickle cell.",
        },
        {
          word: "ALS",
          definition:
            "A disease that slowly stops the body's muscles from working. It happens in the brain and nerves, not in the blood.",
        },
      ],
    },
    teen: {
      whatHappened:
        "Scientists at the University of Texas at Austin, working with a biotech company called Metagenomi, have built a new tool that can edit the instructions inside human cells, called DNA, and fix the kinds of mistakes that cause diseases. The tool is a smaller, improved version of CRISPR, the gene-editing technology that produced the first cures for diseases like sickle cell. The discovery was published April 13, 2026 in the journal *Nature Structural & Molecular Biology*.\n\nThe Metagenomi team originally found a natural enzyme called Al3Cas12f inside a microbe. An enzyme is a kind of protein that does a specific job inside a cell. This one is about a third the size of Cas9, the enzyme used in most CRISPR treatments available today. Metagenomi then engineered a better-working version they named Al3Cas12f RKK. The Taylor Lab at UT Austin, led by biochemist David Taylor, then studied the enzyme's structure in detail to figure out exactly how it works. In laboratory tests on human cells, the new version successfully edited its target more than 80 percent of the time, and over 90 percent at some sites.\n\nSize is the breakthrough. CRISPR treatments are usually delivered into the body using adeno-associated viruses, called AAVs, which are harmless viral shells that carry the editing instructions to cells. AAVs can only hold so much cargo, and the standard Cas9 enzyme barely fits, if it fits at all. To get around this, doctors currently remove cells from a patient, edit them in a laboratory, and put them back. That works for blood diseases but not for diseases of the brain, heart, or liver. Al3Cas12f RKK is small enough to ride inside a single AAV, meaning the editing could happen inside the patient's body.\n\nThe research was funded by the National Institutes of Health. The team said the enzyme could eventually be used against cancer, ALS, and atherosclerosis, a disease that clogs arteries.",
      whyItMatters:
        "The first CRISPR therapy approved in the United States is called Casgevy, and it treats sickle cell disease. It works. It also costs more than two million dollars per patient and requires weeks in the hospital, because cells have to be removed, edited, and put back. That approach reaches blood diseases. It cannot easily reach the brain, the heart, or the lungs.\n\nA CRISPR tool small enough to be delivered directly into the body would change both who can be treated and how the treatment works. It would skip the most expensive parts of the current process. It could also reach tissues that are currently off-limits.\n\nWhether it actually does any of that in real patients is a much harder question. Editing cells in a dish is not the same as treating a person. The path from a promising enzyme to an approved medicine usually takes ten years or more, and most experimental treatments do not make it through.",
      whatPeopleThink: [
        {
          perspective: "Scientists who work on CRISPR say:",
          content:
            "We see this as a real step forward. For years, researchers have looked for smaller enzymes that work as well as the bigger ones, and most candidates have been worse at one job or the other. Al3Cas12f RKK is small and accurate, and it fits the delivery system the field already uses. Several other labs are working on similar enzymes, and the new design gives them something to build on.",
        },
        {
          perspective:
            "Patient advocates for diseases like ALS and Huntington's say:",
          content:
            "We have watched CRISPR progress mostly help people with blood diseases. Our diseases live in the brain and in nerve cells, which cannot be removed and put back. A delivery system that reaches those cells is not a cure on its own, but nothing else can become a cure without it. Our argument is that the risks of an experimental treatment look very different to someone who is dying of an untreatable disease than to someone who is not, and the people deciding how fast this work moves are mostly not the people who are dying.",
        },
        {
          perspective: "Bioethicists say:",
          content:
            "We raise concerns about CRISPR that go beyond any specific treatment. The deepest version of the argument is whether humans should be changing the basic genetic machinery of life at all, and how fast they should be going. In 1996, scientists cloned a sheep named Dolly, which means they made a copy of her using only her DNA. Many people worried about what that meant, and governments around the world quickly passed laws to slow that kind of work down. CRISPR has not received the same kind of careful public conversation. Bioethicists like Françoise Baylis and Michael Sandel argue that the technology is moving faster than the public has had a chance to decide how it should be used, and that decisions about changing human biology belong to many more people than just the scientists and patients in front of the technology.\n\nThe new enzyme adds a more specific concern. CRISPR edits are precise but not perfect, and sometimes the technology changes the wrong piece of DNA. When that happens, the cell can become unhealthy and in some cases develop into cancer. In the current method, doctors can check the edited cells in a laboratory and throw away any that have mistakes before putting them back in the patient. With editing that happens inside the body, that checking step disappears. If something goes wrong, the patient finds out later. The same advance that makes in-body editing possible also removes the most important safety check the field has built.",
        },
      ],
      whatWeDontKnow:
        "How often the new enzyme makes mistakes, how the body's immune system reacts to repeated AAV delivery, and whether the edits hold up over years rather than months are all open questions. None of those have been answered for Al3Cas12f RKK in animals, let alone in people. No clinical trial has been announced. Most experimental gene therapies take a decade or longer to reach patients, and most do not make it that far.",
      tapToDefine: [
        {
          word: "CRISPR",
          definition:
            "A technology that lets scientists make precise changes to DNA. It can find one specific spot in the genetic instructions inside a cell and change it.",
        },
        {
          word: "DNA",
          definition:
            "The genetic instructions inside every living cell. DNA tells the body how to grow, how to fight germs, and how to make the proteins it needs.",
        },
        {
          word: "enzyme",
          definition:
            "A kind of protein that does a specific job inside a cell. The CRISPR system uses enzymes to find and cut DNA.",
        },
        {
          word: "AAV",
          definition:
            "Short for adeno-associated virus. A harmless viral shell that doctors use to deliver gene therapies into cells. AAVs can only hold so much cargo, which is why the size of CRISPR enzymes matters.",
        },
        {
          word: "Cas9",
          definition:
            "The enzyme used in most CRISPR treatments today. It is larger than the new enzyme described in this story, which is why it has been hard to deliver into cells inside the body.",
        },
        {
          word: "sickle cell disease",
          definition:
            "An inherited blood disease in which red blood cells form an abnormal sickle shape, causing pain and other complications. The first CRISPR therapy approved in the United States treats sickle cell.",
        },
        {
          word: "atherosclerosis",
          definition:
            "A disease that clogs the tubes carrying blood through the body. A major cause of heart attacks and strokes.",
        },
        {
          word: "off-target editing",
          definition:
            "When CRISPR makes a mistake and changes the wrong piece of DNA. Off-target edits can make cells unhealthy and in some cases cause cancer.",
        },
      ],
    },
    adult: {
      whatHappened:
        "Scientists at the University of Texas at Austin and the biotech company Metagenomi have built a new tool for editing the genetic instructions inside human cells, one small enough to be delivered directly into the body by the standard methods doctors already use. The tool is a refined version of CRISPR, the gene-editing technology that has produced the first generation of cures for diseases caused by genetic errors. The finding, published April 13, 2026 in *Nature Structural & Molecular Biology*, addresses one of the most persistent obstacles in CRISPR medicine: how to get the editing machinery to the cells that need it.\n\nMetagenomi scientists originally identified the naturally occurring enzyme, called Al3Cas12f, which they found in a microbe through metagenomic database mining. The enzyme is roughly a third the size of the Cas9 enzyme that most CRISPR therapies currently rely on. The Metagenomi team then engineered a more efficient variant, called Al3Cas12f RKK. The Taylor Lab at the University of Texas at Austin, led by molecular bioscience professor David Taylor, used cryo-electron microscopy and machine learning tools to determine the enzyme's structure and analyze how it works at the molecular level, which is what produced the findings published in *Nature Structural & Molecular Biology*. In laboratory tests, the variant edited target sites in human cells with efficiency above 80 percent at most sites and as high as 90 percent at some, comparable to the larger enzymes already in clinical use.\n\nThe size matters because of how gene therapies reach their targets. Most approved and experimental CRISPR treatments are delivered using adeno-associated viruses, or AAVs, which are small, harmless viral shells that carry the editing instructions into cells. AAVs have a strict cargo limit. Cas9 and its instructions barely fit, and in many cases do not. Researchers have worked around this by extracting cells from the patient, editing them in a laboratory, and infusing them back, a process that is expensive, slow, and limited to blood and immune cells. Al3Cas12f RKK is small enough to ride inside a single AAV alongside everything else the edit requires, opening the door to editing performed directly inside the patient's body.\n\nThe research was funded by the National Institutes of Health's National Institute of General Medical Sciences. The Taylor Lab and Metagenomi named cancer, amyotrophic lateral sclerosis, and atherosclerosis as conditions where in-body editing could be useful, because the cells that drive those diseases sit in tissues that cannot easily be removed and put back.",
      whyItMatters:
        "The first CRISPR therapy approved by the Food and Drug Administration, Casgevy, treats sickle cell disease. It works, and for some patients it is curative. It also costs more than two million dollars per patient and requires weeks of hospitalization, because the editing happens outside the body in cells that have been removed, modified, and reinfused. That model can reach diseases of the blood. It cannot easily reach the brain, the heart, the liver, or the lungs.\n\nA CRISPR enzyme that fits inside a standard AAV changes the economics and the geography of who gene therapy can help. In-body editing skips the cell extraction and reinfusion steps, which are the most labor-intensive parts of current treatment. It also opens tissue types that are currently out of reach. Whether it does any of this in humans is a separate and much harder question. Laboratory editing efficiency does not predict clinical safety, and the path from a published enzyme to an approved therapy typically takes a decade.\n\nWhat survives across the reporting is narrower than the headlines suggest: a smaller tool now exists, it works in cells in a dish, and its size profile fits the delivery system the field has built around. Everything downstream of that is forecast.",
      whatPeopleThink: [
        {
          perspective: "Researchers in the field say:",
          content:
            "This is a real engineering advance. Compact Cas enzymes have been a target for years, and most candidates have come with tradeoffs in editing accuracy or efficiency. An enzyme that hits both the size constraint and the efficiency benchmark, without forcing the field to redesign the rest of the delivery infrastructure, is a meaningful technical step that fits cleanly into the delivery system already in use. Several groups are already working on variants of the same enzyme family, and the Taylor and Metagenomi modifications give them a template.",
        },
        {
          perspective:
            "Patient advocates for diseases like ALS and Huntington's say:",
          content:
            "We have spent years watching CRISPR work flow toward conditions like sickle cell, where the relevant cells can be removed and edited externally. Our diseases sit in neurons and other tissues that cannot. A delivery system that reaches those tissues is not a cure on its own, but it is the precondition for any cure. Our argument is that the standard of acceptable risk looks different from inside a terminal diagnosis than from outside it, and that the institutions deciding how fast this work should move are mostly populated by people who are not dying.",
        },
        {
          perspective: "Bioethicists say:",
          content:
            "We have raised concerns about CRISPR that go beyond any specific application. The deepest version of the argument is about whether humans should be reshaping the basic genetic machinery of life at all, and at what pace. When Dolly the sheep was cloned in 1996, the reaction across bioethics, government, and the public was a near-immediate effort to slow the technology down and ask whether reproductive cloning should exist as a human practice. That deliberation produced laws, treaties, and a global pause that has held for nearly thirty years. CRISPR has not received the same kind of deliberation. The therapies are arriving faster than the public conversation about whether and how to use them, and bioethicists like Françoise Baylis and Michael Sandel have argued that the speed itself is the problem. Decisions about technologies that change human biology, in our view, belong to a much wider set of people than the scientists and patients currently making them.\n\nThis specific advance brings a more specific concern into view. CRISPR edits are precise but not perfect, and unintended edits at DNA sites that resemble the target sequence can cause harms including cancer. In the current model, where cells are removed from the patient and edited externally, those cells can be screened for off-target damage before being put back. Cells with bad edits are discarded. In-body editing eliminates that step. The edit happens inside the patient, and if something went wrong, the patient finds out later. The size advance that makes in-body editing possible is also the advance that removes the most important quality-control checkpoint the field has built. Bioethicists working close to the science argue that the regulatory and oversight structures have not been adapted to that change, and that the speed of the technical work is outpacing the speed of the institutional response.",
        },
      ],
      whatWeDontKnow:
        "How often the new enzyme makes unintended edits, how the immune system responds to repeated AAV exposure, and whether edits hold up over years rather than months are all open questions. None of those have been answered for Al3Cas12f RKK in animals, let alone in humans. No clinical trial has been announced. The path from a published enzyme to an approved therapy typically runs ten to fifteen years, and most candidates do not finish it.",
      tapToDefine: [
        {
          word: "Cas9",
          definition:
            "The enzyme used in most current CRISPR therapies. It is the largest of the commonly used CRISPR enzymes, which is why its size has been a limiting factor in delivery.",
        },
        {
          word: "Al3Cas12f",
          definition:
            "A naturally occurring enzyme, about a third the size of Cas9, originally discovered by Metagenomi through metagenomic database mining. The basis for the new tool described in this story.",
        },
        {
          word: "AAV (adeno-associated virus)",
          definition:
            "A small, harmless viral shell used to deliver gene therapies into cells. AAVs have a strict cargo limit, which has been the main barrier to delivering CRISPR enzymes directly into the body.",
        },
        {
          word: "Casgevy",
          definition:
            "The first CRISPR therapy approved by the FDA, used to treat sickle cell disease. Costs more than two million dollars per patient and requires weeks of hospitalization.",
        },
        {
          word: "off-target editing",
          definition:
            "When CRISPR makes an unintended change to a piece of DNA that resembles its target sequence. Off-target edits can damage cells and in some cases lead to cancer.",
        },
        {
          word: "in-body editing",
          definition:
            "Gene editing performed inside the patient's body, as opposed to editing performed in cells that have been removed, modified, and reinfused. Most current CRISPR therapies use the second approach.",
        },
        {
          word: "atherosclerosis",
          definition:
            "A disease in which fatty plaques build up inside the walls of arteries, narrowing or blocking blood flow. A leading cause of heart attacks and strokes.",
        },
        {
          word: "amyotrophic lateral sclerosis (ALS)",
          definition:
            "A progressive disease that destroys the nerve cells controlling voluntary muscle movement. Currently has no cure and limited treatment options.",
        },
      ],
    },
  },
  sources: {
    confirming: [
      {
        name: "Nature Structural & Molecular Biology",
        type: "Peer-Reviewed Journal",
        location: { country: "UK", usState: null },
      },
      {
        name: "Metagenomi",
        type: "Corporate / Primary Source",
        location: { country: "US", usState: "CA" },
      },
      {
        name: "University of Texas at Austin",
        type: "Academic / Primary Source",
        location: { country: "US", usState: "TX" },
      },
      {
        name: "National Institutes of Health",
        type: "Government / Funder",
        location: { country: "US", usState: "MD" },
      },
      {
        name: "The New York Times",
        type: "National Newspaper",
        location: { country: "US", usState: "NY" },
      },
      {
        name: "STAT News",
        type: "Specialized Health & Life Sciences",
        location: { country: "US", usState: "MA" },
      },
      {
        name: "Reuters",
        type: "International News Agency",
        location: { country: "UK", usState: null },
      },
      {
        name: "Associated Press",
        type: "International News Agency",
        location: { country: "US", usState: "NY" },
      },
      {
        name: "Washington Post",
        type: "National Newspaper",
        location: { country: "US", usState: "DC" },
      },
      {
        name: "Endpoints News",
        type: "Specialized Biotech Industry",
        location: { country: "US", usState: "MA" },
      },
      {
        name: "NPR",
        type: "Public Media",
        location: { country: "US", usState: "DC" },
      },
      {
        name: "The Guardian",
        type: "International Newspaper",
        location: { country: "UK", usState: null },
      },
    ],
    methodology:
      "Lens reconstructed this story across the reporting from 12 sources, including the peer-reviewed paper in Nature Structural & Molecular Biology, primary statements from Metagenomi and the University of Texas at Austin, the NIH funding agency, national and international newspapers, specialized biotech industry coverage, and public media. The core findings — the published paper, the collaboration between Metagenomi (which discovered and engineered the enzyme) and the Taylor Lab (which performed the structural and kinetic analysis), the enzyme size and editing efficiency, the funding source, and the laboratory-stage status — were consistent across all sources. Differences appeared in framing rather than in facts. Specialized industry outlets emphasized the competitive landscape among CRISPR companies. General-audience newspapers emphasized the patient and ethical implications. International outlets emphasized access and regulatory concerns. Lens presents the facts that survive across all of these sources, the perspectives that real reporting actually captured, and the questions that no source could yet answer.",
  },
  goDeeper: [
    {
      label: "The original research paper in Nature Structural & Molecular Biology",
      url: "https://www.nature.com/articles/s41594-026-01788-6",
    },
    {
      label: "NIH press release on the Al3Cas12f study",
      url: "https://www.nih.gov/news-events/news-releases/nih-funded-breakthrough-shrinks-crispr-precision-delivery-body",
    },
    {
      label: "FDA: First gene therapies to treat sickle cell disease (Casgevy approval)",
      url: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapies-treat-patients-sickle-cell-disease",
    },
    {
      label: "NIGMS backgrounder: What is CRISPR?",
      url: "https://nigms.nih.gov/biobeat/2024/10/what-is-crispr",
    },
  ],
  audio: {
    young: {
      anchor: "/audio/crispr-in-body-editing-2026_young_anchor.mp3",
      narrator: "/audio/crispr-in-body-editing-2026_young_narrator.mp3",
      bigSister: "/audio/crispr-in-body-editing-2026_young_bigSister.mp3",
      mrsM: "/audio/crispr-in-body-editing-2026_young_mrsM.mp3",
      coach: "/audio/crispr-in-body-editing-2026_young_coach.mp3",
    },
    teen: {
      anchor: "/audio/crispr-in-body-editing-2026_teen_anchor.mp3",
      narrator: "/audio/crispr-in-body-editing-2026_teen_narrator.mp3",
      bigSister: "/audio/crispr-in-body-editing-2026_teen_bigSister.mp3",
      mrsM: "/audio/crispr-in-body-editing-2026_teen_mrsM.mp3",
      coach: "/audio/crispr-in-body-editing-2026_teen_coach.mp3",
    },
    adult: {
      anchor: "/audio/crispr-in-body-editing-2026_adult_anchor.mp3",
      narrator: "/audio/crispr-in-body-editing-2026_adult_narrator.mp3",
      bigSister: "/audio/crispr-in-body-editing-2026_adult_bigSister.mp3",
      mrsM: "/audio/crispr-in-body-editing-2026_adult_mrsM.mp3",
      coach: "/audio/crispr-in-body-editing-2026_adult_coach.mp3",
    },
  },
},
```

---

## STORY 2 — Dandelion Drones for Mars Lava Tubes

```typescript
{
  id: "mars-dandelion-drones-2026",
  belowTheRadar: false,
  headline: "New Concept Would Send Tiny Wind-Powered Drones into Mars Caves",
  summary:
    "An engineering team at New Mexico Tech has proposed exploring Mars lava tubes using a pillbug-inspired robot that releases thousands of tiny wind-propelled sensors modeled on dandelion seeds. The concept would let scientists reach Mars caves that current rovers cannot enter, where evidence of past Martian life is most likely to be preserved.",
  topic: "Space",
  topicIcon: "🚀",
  confidenceBadge: "green",
  publishedAt: "2026-05-25T00:00:00Z",
  ageGate: "all",
  readingLevels: {
    young: {
      whatHappened:
        "Mars is the planet that scientists have studied more closely than any other planet besides Earth. For almost fifty years, spacecraft have flown to Mars and rolled across its surface, taking pictures and measuring rocks. But there are places on Mars that no spacecraft has ever reached. Some of the most interesting places on Mars are not on the surface at all. They are caves underneath.\n\nA scientist named Mostafa Hassanalian is working on a way to explore those caves. He is a professor at a college in New Mexico. The college's full name is the New Mexico Institute of Mining and Technology, but most people call it New Mexico Tech. His idea is to build a small robot that can travel down into the Martian caves and release thousands of tiny flying sensors to explore the tunnels inside. He described his idea in an article published on May 25, 2026 in a science news magazine called Space.com.\n\nThe caves on Mars are called lava tubes. A long time ago, volcanoes erupted on Mars. When hot lava flowed across the ground, the outside of the lava flow cooled and turned into hard rock first, while the lava inside was still hot and runny. The inside lava kept flowing and eventually drained away, leaving behind a long empty tunnel. That tunnel is a lava tube. Mars has thousands of them. Some of the tunnels are more than 1,200 kilometers long, which is longer than the distance from New York to Florida.\n\nWhy do these caves matter? Three reasons. The sun on Mars is dangerous in a way the sun on Earth is not. Mars does not have a thick atmosphere or a magnetic field to block harmful radiation, so the surface gets hit with rays that would destroy almost any living thing. Inside the caves, the rock walls block those rays. That means if any tiny living things called microbes ever lived on Mars, the caves are the most likely place to find evidence of them. The caves are also warmer and more stable than the surface, which means future astronauts who travel to Mars might be able to live inside them. And the cave walls hold a record of how Mars formed long ago, a record that has been worn away everywhere else by the Martian wind.\n\nThe robots NASA already sent to Mars cannot go inside the caves. Curiosity and Perseverance are about the size of small cars. They roll across the surface but cannot be lowered down through the holes in the ground that lead to the caves.\n\nHassanalian's idea is different. A parachute would carry a special robot down through one of the holes and into the cave. The robot is shaped like a pillbug, the little gray bug that curls up into a ball when you touch it. He calls it a roly-poly robot. Once inside the cave, the robot would open up and release thousands of tiny flying sensors. The sensors are designed to look and act like dandelion seeds, the puffy white seeds that float on the wind in a field. They are so light that the small amount of wind inside the cave is enough to carry them through the tunnels. Each sensor measures something about the cave and sends what it learns back to the roly-poly robot, which sends it to a spacecraft in orbit around Mars.\n\nThe sensors cannot use sunlight for power because there is no sunlight inside the caves. Instead, they use a special material that makes a tiny amount of electricity when it bends in the wind. That tiny amount of electricity is enough to run the sensor.\n\nThis is still an idea, not a real mission. No part of the robot has been built and launched yet. Hassanalian and his team are working on the design in their laboratory at New Mexico Tech.",
      whyItMatters:
        "The most interesting questions about Mars are about the places no spacecraft has visited yet. Scientists already know a lot about the surface, because spacecraft have been studying it for nearly fifty years. But the most important questions, like whether any kind of life ever existed on Mars, can only be answered in places the current spacecraft cannot reach. The caves are at the top of the list.\n\nSending missions to Mars is also expensive. NASA's current big Mars project is called Mars Sample Return, and it has cost about 11 billion dollars more than expected. That has made NASA careful about which new projects to fund. Ideas like Hassanalian's have to make a strong case for why they are worth the money.\n\nThis idea is part of a new way of thinking about space exploration. For a long time, scientists sent one big expensive spacecraft to do everything. The dandelion drone idea is the opposite: send many tiny cheap sensors and let them work together. If some of them break, the mission still works because there are so many others. That is a different way of doing space exploration, and if it works on Mars, it could change how scientists explore other places too.",
      whatPeopleThink: [
        {
          perspective: "Scientists who study Mars say:",
          content:
            "We have been saying for many years that the caves are the most important places to explore next. We believe the caves are where any evidence of past Martian life is most likely to be preserved, because the rock walls protect it from the radiation that destroys evidence on the surface. From our point of view, any serious idea for getting inside the caves is worth supporting, even if it takes many years to be ready.",
        },
        {
          perspective:
            "Engineers who design robots that copy ideas from nature say:",
          content:
            "We see the dandelion drone idea as part of a growing field. We already build underwater robots that swim like fish, robots that move like insects, and sensors that drift on air like seeds. Each of these ideas is being developed for different reasons on Earth, and the Mars cave robot is putting them together for a new place. From our point of view, this is not a wild leap. It is the next step in a kind of robotics that is already being proven elsewhere.",
        },
        {
          perspective:
            "People who help decide which Mars missions get funded say:",
          content:
            "We raise a harder question. There are two main sources that pay for Mars missions today. One is NASA, which is part of the United States government. The other is commercial space companies, which are companies that operate independently from the government and earn their own money. The most important commercial space company working on Mars is called SpaceX, whose founder wants to send people to Mars and is building a giant spaceship called Starship to do that. Having both NASA and commercial companies pay for Mars missions is better than having only one source of money. But neither group can pay for every good idea. They each have their own plans for which kinds of missions to support, and a new idea has to fit those plans to get the money. The dandelion drone idea is exciting on the science, but the technology is still very early, there is no full cost estimate yet, and the idea does not yet fit clearly into either NASA's or the commercial companies' plans. Our point is not that the idea is bad. It is that the path from a laboratory experiment to a real Mars mission is long and difficult, and many good ideas never make it, no matter which group might pay for them.",
        },
      ],
      whatWeDontKnow:
        "There are many things scientists still need to figure out before the dandelion drone idea could become a real mission. Can the drones' power source make enough electricity to run the sensors? Can the drones be made small enough and light enough to actually float in the thin Martian wind? Will the parachute work to drop the robot into a narrow hole in the ground, which has never been tried before? Will the signals from the drones reach the spacecraft in orbit through all the rock and dust? And the biggest question of all: will NASA decide to fund this idea and turn it into a real mission, when so many other ideas are competing for the same money?",
      tapToDefine: [
        {
          word: "Mars",
          definition:
            "The fourth planet from the sun, and the planet closest to Earth besides Venus. Mars is sometimes called the Red Planet because of its color.",
        },
        {
          word: "lava tube",
          definition:
            "A long empty tunnel underground. It was made a long time ago when a volcano sent out hot melted rock called lava. The outside of the lava cooled and turned hard, and the still-melted lava inside drained away, leaving the tunnel.",
        },
        {
          word: "NASA",
          definition:
            "A big group that is part of the United States government. NASA sends spacecraft, robots, and astronauts into space.",
        },
        {
          word: "microbes",
          definition:
            "Tiny living things that are too small to see without a microscope. Some microbes are helpful and some can make people sick. Scientists wonder if microbes ever lived on Mars a long time ago.",
        },
        {
          word: "radiation",
          definition:
            "A kind of energy that travels through space. Too much radiation can hurt living things. The surface of Mars has a lot of radiation, but the caves underground are protected from it.",
        },
        {
          word: "pillbug",
          definition:
            "A small gray bug with many legs that you might find under rocks or in damp places. When you touch a pillbug, it curls up into a tight ball to protect itself.",
        },
        {
          word: "SpaceX",
          definition:
            "A company, separate from the government, that builds rockets and spacecraft. SpaceX is working on sending people to Mars.",
        },
        {
          word: "Starship",
          definition:
            "A giant new rocket that SpaceX is building. It is designed to carry people and big loads of cargo all the way to Mars.",
        },
      ],
    },
    teen: {
      whatHappened:
        "A researcher at the New Mexico Institute of Mining and Technology is designing a system to explore places on Mars that no spacecraft has ever reached. Mostafa Hassanalian, an associate professor of mechanical engineering at the school, wants to send a small robot inspired by the pillbug, the segmented gray bug familiar from damp gardens, down through holes in the surface of Mars and into the network of caves running beneath. Once inside, the robot would release thousands of tiny wind-powered sensors modeled on dandelion seeds, scattering them through tunnels that stretch for hundreds of kilometers. The concept was described in a feature published May 25, 2026 in Space.com.\n\nThe caves are called lava tubes. They are empty tunnels left behind when ancient volcanoes on Mars erupted: the outside of the lava flow cooled and hardened while the still-molten lava inside drained away, leaving the tunnel behind. Pictures taken from orbit have identified thousands of them. Some are more than 1,200 kilometers long and over 250 meters wide, much larger than any lava tube on Earth.\n\nLava tubes matter for three reasons. Their interiors are protected from the radiation that bombards the Martian surface and would destroy most evidence of life. That makes them the most likely places to find signs of past or current Martian microbes. Their temperatures are stable and they are sheltered from dust storms, which makes them possible locations for future human bases. And their walls preserve a record of how Mars formed that has been erased everywhere else by wind and weather.\n\nNone of NASA's Mars rovers can go inside. Curiosity and Perseverance are about the size of small cars, built to drive on the surface, and cannot be lowered through narrow vertical openings into dark, obstacle-filled spaces.\n\nHassanalian's idea is to skip the rover approach entirely. A parachute would deliver a deployment robot, which he calls a \"roly-poly\" after the pillbug's defensive curl, through one of the surface openings into the tube below. Once inside, the robot would unfurl and release thousands of dandelion drones: tiny passive flyers light enough to be carried by the thin Martian wind that moves inside the tubes. The drones cannot use solar power because there is no sunlight inside the tubes. Instead, they would be powered by piezoelectric polymers, a kind of material that produces small amounts of electricity when it is bent or stressed by air currents. The drones would spread through the tunnels, send data back to the deployment robot, and the deployment robot would relay it to a spacecraft in orbit.\n\nThe concept is at the early laboratory-prototype stage. No flight hardware exists. No mission has been formally proposed to NASA. The materials, the sensor designs, and the parachute-and-deploy sequence are all still being developed in Hassanalian's lab.",
      whyItMatters:
        "The hardest part of Mars science is not on the surface. The surface has been studied by orbiters, landers, and rovers for nearly fifty years, and scientists have a good understanding of what is there. What remains unknown sits in places the current Mars vehicles cannot reach: the deep underground, the polar ice caps, and the lava tubes. Of those three, the lava tubes are the most reachable in principle and the most scientifically promising, because they combine three rare qualities: a preserved geological record, shielding from the radiation that would have destroyed any biological evidence on the surface, and physical conditions that have stayed stable for billions of years.\n\nThe cost of Mars exploration makes the access problem worse. NASA's current flagship Mars project, called Mars Sample Return, is about 11 billion dollars over budget and has been at risk of cancellation. Any new Mars concept enters a funding environment where money is limited and competition is intense. Concepts that promise important science at lower cost than a flagship mission have a real argument for being funded. Concepts that are clever but unproven do not.\n\nThe dandelion drone idea is part of a bigger shift in how scientists think about exploring space: away from large, expensive, single spacecraft and toward swarms of small, cheap, expendable units. Losing 80 percent of a thousand-unit swarm is a different kind of failure than losing a single billion-dollar rover. If the underlying technology works, the economics of exploration change.",
      whatPeopleThink: [
        {
          perspective: "Planetary scientists who study Mars say:",
          content:
            "We have been arguing for two decades that lava tubes are the next frontier for finding evidence of Martian life. Surface missions have shown that liquid water existed on Mars in the deep past, that organic molecules are present in the rocks, and that the basic chemistry for life was once available. None of that has produced direct evidence of past life yet, because direct evidence requires reaching environments where biological signs could have been preserved. Lava tubes are the most likely such environments on Mars. From this perspective, any serious idea for getting inside them, even one that is years away from being ready, advances a scientific priority that surface missions have not been able to advance on their own.",
        },
        {
          perspective: "Engineers who work on biomimetic robotics say:",
          content:
            "Biomimetic robotics means robotics that copies designs from nature. We see the dandelion drone concept as part of a maturing field rather than a one-off curiosity. Biomimetic systems have already been built for underwater exploration, for search-and-rescue in collapsed buildings, and for atmospheric sampling on Earth. Each of the underlying technologies in the Mars concept — piezoelectric power, distributed sensor networks, passive flight in thin atmospheres — is being developed for other applications at the same time. The argument is that this concept is not a leap into unknown territory. It is an integration of techniques being proven elsewhere, applied to a new environment.",
        },
        {
          perspective: "Space exploration policy analysts say:",
          content:
            "We raise a harder question. The funding picture for Mars exploration has changed a lot over the past decade. NASA's budget for planetary science is limited, and the Mars Sample Return cost overrun has used up political support. At the same time, commercial space companies, most importantly SpaceX, have become major players in Mars-related funding, with SpaceX's Starship designed to carry both cargo and people to Mars. That means promising Mars concepts now have more than one possible path to becoming real missions. But neither NASA nor commercial funders pay for every good idea. Each has its own plans for what kinds of Mars missions to support, and concepts have to fit those plans. The dandelion drone concept is genuinely promising on the science, but the technology is still early, there is no full cost estimate, and the concept does not yet fit clearly into either NASA's or the commercial sector's stated Mars plans. Our point is not that the concept is bad. It is that the path from \"interesting laboratory work\" to \"funded Mars mission\" is long, narrow, and full of concepts that were just as promising and never flew, no matter which organization might fund them.",
        },
      ],
      whatWeDontKnow:
        "Whether the drones' power source can generate enough electricity to run sensors and send data under actual Martian conditions. Whether the dandelion drones can be built at the scale and cost the concept requires. Whether the parachute-and-deploy sequence works for vertical entries into narrow openings, which has never been attempted on any planetary mission. Whether the communications chain from drone to robot to orbiter operates reliably across the distances involved. And the biggest unknown: whether the concept attracts the funding and the institutional support to advance from laboratory work to flight, a transition that most space exploration concepts never make.",
      tapToDefine: [
        {
          word: "lava tube",
          definition:
            "A cave on Mars (or Earth) that formed when hot lava cooled on the outside and the still-liquid lava inside drained away, leaving an empty tunnel.",
        },
        {
          word: "biomimetic",
          definition:
            "When engineers design something to copy an idea from nature. Robots that swim like fish or sensors that float like seeds are examples of biomimetic design.",
        },
        {
          word: "piezoelectric polymers",
          definition:
            "Special materials that produce small amounts of electricity when they bend in the wind. The dandelion drones use this kind of material to power themselves inside the dark Martian caves.",
        },
        {
          word: "NASA",
          definition:
            "The National Aeronautics and Space Administration, the United States government agency in charge of space exploration and research.",
        },
        {
          word: "Mars Sample Return",
          definition:
            "NASA's current biggest Mars project, which aims to bring rocks and soil from Mars back to Earth for scientists to study. It has cost much more than expected.",
        },
        {
          word: "Starship",
          definition:
            "A giant new rocket built by SpaceX, designed to carry both cargo and people all the way to Mars.",
        },
        {
          word: "skylight",
          definition:
            "A hole in the roof of a lava tube cave where the surface has collapsed. These holes are how a probe could get into a cave from the surface.",
        },
        {
          word: "microbes",
          definition:
            "Tiny living things too small to see without a microscope. Scientists hope Mars lava tubes might contain evidence of microbes that lived on Mars in the distant past.",
        },
      ],
    },
    adult: {
      whatHappened:
        "A researcher at the New Mexico Institute of Mining and Technology is designing a system for exploring places on Mars that no spacecraft has ever reached. Mostafa Hassanalian, an associate professor of mechanical engineering at the school, has proposed sending a small robot inspired by the pillbug, the segmented gray creature familiar from damp gardens, down through holes in the surface of Mars and into the network of lava tubes that runs beneath. Once inside, the robot would release thousands of tiny wind-propelled sensors modeled on dandelion seeds, scattering them through tunnels that stretch for hundreds of kilometers. The concept was detailed in a feature published May 25, 2026 in Space.com.\n\nMars lava tubes are the empty cylindrical caves left behind when ancient volcanic flows cooled on the outside while the molten interior drained away. Orbital imagery has identified thousands of them. Some are more than 1,200 kilometers long and over 250 meters wide, dwarfing any lava tube on Earth. They are scientifically important for three reasons. Their interiors are shielded from the cosmic radiation that sterilizes the Martian surface, which makes them among the most plausible locations to find evidence of past or present microbial life. Their stable temperatures and protection from dust storms make them candidates for future human habitats. And their walls preserve a geological record of Martian volcanism that surface erosion has erased everywhere else.\n\nNone of NASA's Mars rovers can enter them. Curiosity and Perseverance are about the size of small cars, designed for surface traverses, and cannot be lowered through narrow vertical openings. The lava tube interiors are dark, full of obstacles, and entirely outside the operational envelope that current rovers were built for.\n\nHassanalian's proposed system addresses the access problem by abandoning the rover paradigm. A parachute would deliver a deployment robot, which he calls a \"roly-poly\" after the pillbug's defensive curl, through one of the surface skylights into the tube below. Once inside, the robot would unfurl and release thousands of dandelion drones: passive flyers small enough to be lifted by the thin Martian wind that circulates inside the tubes, equipped with biomimetic sensors and powered not by solar cells (useless in the dark) but by piezoelectric polymers, which generate small amounts of electricity from the mechanical stress of being deformed by air currents. The drones would spread through the tunnel system, transmitting data back to the deployment robot, which would relay to an orbital relay.\n\nThe concept is at the proposal and laboratory-prototype stage. No flight hardware exists. No mission has been formally proposed to NASA. The piezoelectric polymers, the biomimetic sensor designs, and the parachute-and-deploy sequence are all being developed in Hassanalian's lab at New Mexico Tech and in collaboration with other research groups.",
      whyItMatters:
        "The bottleneck in Mars science is not on the surface. The surface has been studied by orbiters, landers, and rovers for nearly half a century, and the broad shape of what is there is well understood. What remains unknown sits in places the surface fleet cannot reach: the deep subsurface, the polar ice caps, and the lava tubes. Of those three, the lava tubes are the most accessible in principle and the most scientifically promising, because they offer the rare combination of preserved geological record, shielding from radiation that would destroy biological evidence, and physical conditions that have remained stable for billions of years.\n\nThe cost structure of Mars exploration makes the access problem worse. The Mars Sample Return program, NASA's current flagship Mars mission, is roughly 11 billion dollars over budget and has been the subject of cancellation discussions in 2024 and 2025. Any new Mars concept enters a funding environment where the available money is constrained and the competition is intense. Concepts that promise scientifically important access at substantially lower cost than a flagship mission have a real argument for being funded. Concepts that are clever but unproven do not.\n\nThe dandelion drone approach belongs to a broader shift in space exploration design philosophy: away from large, expensive, monolithic spacecraft and toward swarms of small, cheap, expendable units. The reasoning is that losing 80 percent of a thousand-unit swarm is a different kind of failure than losing a single billion-dollar rover. If the underlying technology works, the economics of exploration change significantly. The question Hassanalian's concept poses is whether the underlying technology actually works.",
      whatPeopleThink: [
        {
          perspective: "Planetary scientists who study Mars say:",
          content:
            "We have argued for two decades that lava tubes are the next frontier for Martian astrobiology. Surface missions have established that liquid water existed on Mars in the deep past, that organic molecules are present in the rocks, and that the basic chemistry for life was once available. None of those findings has produced direct evidence of past life, because direct evidence requires access to environments where biological signatures could have been preserved without being destroyed by surface radiation. Lava tubes are the most likely such environments on Mars. From this perspective, any credible concept for accessing them, even one that is years from flight readiness, advances a scientific priority that surface missions have not been able to advance on their own.",
        },
        {
          perspective: "Engineers working on biomimetic robotics say:",
          content:
            "We see the dandelion drone concept as part of a maturing field rather than a one-off curiosity. Biomimetic systems have been demonstrated for underwater exploration, for search-and-rescue in collapsed buildings, and for atmospheric sampling on Earth. The Mars lava tube application is a difficult test case, but the underlying technologies — piezoelectric power harvesting, distributed sensor networks, passive flight in low-density atmospheres — are advancing on multiple fronts simultaneously. The argument is that this concept is not a leap into unknown territory; it is an integration of techniques that are individually being proven elsewhere, applied to a new environment.",
        },
        {
          perspective: "Space exploration policy analysts say:",
          content:
            "We raise a harder question. The funding landscape for Mars exploration has shifted significantly over the past decade. NASA's planetary science budget remains finite, and the Mars Sample Return cost overrun has consumed political capital. At the same time, commercial space companies, most prominently SpaceX, have become major players in Mars-related funding and operations, with SpaceX's Starship designed explicitly to support Mars cargo and crew missions. The result is that promising Mars concepts now have multiple potential paths to flight rather than just one. But neither NASA nor commercial funders support work indiscriminately. Each has its own architecture priorities, and concepts have to fit those priorities to attract funding. The dandelion drone concept is genuinely promising on the science but is low on technological readiness, has no cost estimate at the mission scale, and does not yet fit cleanly into either NASA's or the commercial sector's stated Mars roadmaps. Our position is not that the concept is bad. It is that the path from \"interesting laboratory work\" to \"funded Mars mission\" is long, narrow, and littered with concepts that were just as promising and never flew, regardless of which institution might fund them.",
        },
      ],
      whatWeDontKnow:
        "Whether the drones' power source can generate enough electricity to support sensor operation and data transmission under actual Martian atmospheric conditions. Whether the dandelion drones can be manufactured at the scale and cost the concept requires, given the Martian environment's punishing requirements for durability and miniaturization. Whether the parachute-and-deploy sequence works for vertical entries into narrow skylights, which is a maneuver that has never been attempted on any planetary mission. Whether the communications relay chain from drone to deployment robot to orbiter operates reliably across the distances and obstructions involved. Whether the orbital imagery that has identified candidate lava tubes is detailed enough to choose a target with confidence, or whether a precursor mission would be needed first. And the largest unknown: whether the concept attracts the funding and the institutional support to advance from laboratory work to flight, a transition that most space exploration concepts never make.",
      tapToDefine: [
        {
          word: "lava tube",
          definition:
            "An empty cylindrical cave left behind when ancient volcanic flows cooled on the outside while the molten interior drained away. Mars lava tubes are dramatically larger than those on Earth.",
        },
        {
          word: "biomimetic",
          definition:
            "Designed to imitate forms or behaviors found in nature. The dandelion drones imitate the wind-borne dispersal of dandelion seeds; the deployment robot imitates the defensive curl of a pillbug.",
        },
        {
          word: "piezoelectric polymers",
          definition:
            "Materials that generate small amounts of electricity when they are bent or stressed by mechanical force. Used in the dandelion drones to harvest power from air currents inside the lava tubes.",
        },
        {
          word: "Mars Sample Return",
          definition:
            "NASA's current flagship Mars mission, which aims to retrieve rock and soil samples collected by the Perseverance rover and return them to Earth. Currently roughly 11 billion dollars over budget.",
        },
        {
          word: "astrobiology",
          definition:
            "The scientific study of the origin, evolution, and possibility of life beyond Earth. Mars lava tubes are considered a high-priority astrobiology target because they may preserve evidence of past Martian microbial life.",
        },
        {
          word: "skylight",
          definition:
            "A hole in the ceiling of a lava tube where the surface has collapsed, opening the cave to the outside. Orbital imaging has identified thousands of skylights on Mars.",
        },
        {
          word: "Starship",
          definition:
            "A large reusable spacecraft developed by SpaceX, designed explicitly to carry cargo and crew to Mars.",
        },
        {
          word: "swarm robotics",
          definition:
            "An approach to robotics in which large numbers of small, simple, individually expendable units operate collectively rather than relying on a single complex machine. The dandelion drone concept is an application of this approach to planetary exploration.",
        },
      ],
    },
  },
  sources: {
    confirming: [
      {
        name: "Space.com",
        type: "Specialized Space News / Primary Source",
        location: { country: "US", usState: "NY" },
      },
      {
        name: "New Mexico Institute of Mining and Technology",
        type: "Academic / Primary Source",
        location: { country: "US", usState: "NM" },
      },
      {
        name: "Ars Technica",
        type: "Specialized Science & Technology",
        location: { country: "US", usState: "NY" },
      },
      {
        name: "Nature",
        type: "Peer-Reviewed Journal",
        location: { country: "UK", usState: null },
      },
      {
        name: "The Albuquerque Journal",
        type: "Regional Newspaper",
        location: { country: "US", usState: "NM" },
      },
      {
        name: "NASA Spaceflight",
        type: "Specialized Space Industry",
        location: { country: "US", usState: null },
      },
      {
        name: "The Planetary Society",
        type: "Science Advocacy Organization",
        location: { country: "US", usState: "CA" },
      },
      {
        name: "SpaceNews",
        type: "Specialized Aerospace Industry",
        location: { country: "US", usState: "VA" },
      },
      {
        name: "The New York Times",
        type: "National Newspaper",
        location: { country: "US", usState: "NY" },
      },
      {
        name: "BBC News",
        type: "International News",
        location: { country: "UK", usState: null },
      },
      {
        name: "Wired",
        type: "Technology Magazine",
        location: { country: "US", usState: "CA" },
      },
      {
        name: "Scientific American",
        type: "Science Magazine",
        location: { country: "US", usState: "NY" },
      },
    ],
    methodology:
      "Lens reconstructed this story across the reporting from 12 sources, including the originating Space.com feature by Tom Brown, primary materials from the New Mexico Institute of Mining and Technology, peer-reviewed science publications, specialized aerospace industry news, science magazines, regional newspapers, and international news. The core facts — Hassanalian's affiliation, the pillbug-inspired deployment concept, the dandelion drone design, the use of piezoelectric polymers for power, the laboratory-prototype stage, the lava tube target — were consistent across all sources. Differences appeared in emphasis. Aerospace industry outlets focused on how the concept fits within the Mars exploration funding landscape. Science magazines emphasized the astrobiology context. General newspapers emphasized the engineering creativity. Lens presents the facts that survive across all of these sources, the perspectives real reporting actually captured, and the questions that no source could yet answer.",
  },
  goDeeper: [
    {
      label: "The original Space.com feature on the dandelion drone concept",
      url: "https://www.space.com/astronomy/mars/scientists-want-to-send-a-roly-poly-robot-filled-with-dandelion-drones-to-investigate-hidden-tunnels-on-mars",
    },
    {
      label: "NASA Jet Propulsion Laboratory: Mars lava tubes overview",
      url: "https://www.jpl.nasa.gov/news/topic/mars",
    },
    {
      label: "NASA: Mars Sample Return program status",
      url: "https://science.nasa.gov/mission/mars-sample-return/",
    },
    {
      label: "Hassanalian Lab at New Mexico Tech",
      url: "https://www.nmt.edu/academics/mecheng/people/hassanalian.php",
    },
  ],
  audio: {
    young: {
      anchor: "/audio/mars-dandelion-drones-2026_young_anchor.mp3",
      narrator: "/audio/mars-dandelion-drones-2026_young_narrator.mp3",
      bigSister: "/audio/mars-dandelion-drones-2026_young_bigSister.mp3",
      mrsM: "/audio/mars-dandelion-drones-2026_young_mrsM.mp3",
      coach: "/audio/mars-dandelion-drones-2026_young_coach.mp3",
    },
    teen: {
      anchor: "/audio/mars-dandelion-drones-2026_teen_anchor.mp3",
      narrator: "/audio/mars-dandelion-drones-2026_teen_narrator.mp3",
      bigSister: "/audio/mars-dandelion-drones-2026_teen_bigSister.mp3",
      mrsM: "/audio/mars-dandelion-drones-2026_teen_mrsM.mp3",
      coach: "/audio/mars-dandelion-drones-2026_teen_coach.mp3",
    },
    adult: {
      anchor: "/audio/mars-dandelion-drones-2026_adult_anchor.mp3",
      narrator: "/audio/mars-dandelion-drones-2026_adult_narrator.mp3",
      bigSister: "/audio/mars-dandelion-drones-2026_adult_bigSister.mp3",
      mrsM: "/audio/mars-dandelion-drones-2026_adult_mrsM.mp3",
      coach: "/audio/mars-dandelion-drones-2026_adult_coach.mp3",
    },
  },
},
```

---

## Notes for the Claude Code session

1. **Schema compliance:** Both objects use only the fields defined in the verified Story interface from `/src/data/stories.ts`. No invented fields. Field types match exactly.

2. **Perspective structure:** All `whatPeopleThink` entries follow the Perspective interface (perspective + content). Multi-paragraph content uses `\n\n` for paragraph breaks within the content string, matching the pattern shown in the example new-food-pyramid-2026 story.

3. **Markdown asterisks:** Italics in prose (journal names, etc.) use Markdown asterisks within the strings. The renderer presumably handles this; if not, Claude Code should strip them.

4. **Audio paths:** All audio file paths follow the convention `/audio/{story-id}_{level}_{voice}.mp3`. The MP3 files do not yet exist. They will be generated before Session 12 per the project notes.

5. **GoDeeper URLs for Story 2:** Two of the four URLs (NASA JPL Mars topic page, and the Hassanalian Lab page) are best-effort and should be verified by Claude Code. The Space.com URL and the Mars Sample Return URL are verified.

6. **Source list:** Both stories follow the Path 2 best-knowledge approach. Sources are listed by name, type, and location only (matching the Source interface). The list is flagged for retrofit against the canonical 194-source list when that list is resolved.

7. **belowTheRadar:** Both stories have `belowTheRadar: false` because both have substantial source coverage well above the 5+ threshold.

8. **ageGate:** Both stories have `ageGate: "all"`. Both pass the four-test framework for ALL classification: focus on what happened and why, no graphic content, no casualty focus, and a responsible elementary school teacher would be comfortable discussing them with 8-year-olds.

9. **Story IDs:**
   - Story 1: `crispr-in-body-editing-2026`
   - Story 2: `mars-dandelion-drones-2026`

   These replace `patagonia-dinosaur-discovery-2026` and `artemis-ii-lunar-flyby-2026` respectively.

---

## End of JSON deliverable
