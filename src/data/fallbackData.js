// RuthBeryl Cheruto Chepses ("Holland") — Eulogy & Memorial Data
// Born 6th March 2006 • Passed away tragically at Gatitu, Thika
// Add, swap, or remove entries below — HomePage "Next Memory (1/N)" updates automatically!

// ============================================
// HOME PAGE ARCH MEMORIES (7 photos → 7 slides)
// Add or swap { id, image, badge, caption } entries anytime.
// ============================================
export const HOME_ARCH_MEMORIES = [
  {
    id: 'home-1',
    image: '/photos/cheruto-main.jpg',
    badge: '6th March 2006 • "Holland"',
    caption: 'Twenty years of love, faith and service — lively, kind, quick to forgive, and possessed of a heart so full of love that it touched everyone she met.',
  },
  {
    id: 'home-2',
    image: '/photos/cheruto-memorial-1.jpg',
    badge: 'Family & Roots',
    caption: 'Beloved daughter of Reuben Kipkosgei Koech Chepses and Rebbecah Metto Koskei, sister to Zipporah, Edith, and Israel — family was the foundation of her life.',
  },
  {
    id: 'home-3',
    image: '/photos/cheruto-memorial-2.jpg',
    badge: 'Education & Ambition',
    caption: 'From Bishop Muge Memorial and Precious Blood Riruta Girls\' High School to Mount Kenya University and Alliance Française — she understood that to teach well, one must never stop learning.',
  },
  {
    id: 'home-4',
    image: '/photos/cheruto-01.jpg',
    badge: 'Educator & Calling',
    caption: 'Science, Mathematics, and French teacher at Pinehouse Schools Ngoingwa, International Youth Foundation, and Thika Bellhouse Academy — she saw each student as a whole person.',
  },
  {
    id: 'home-5',
    image: '/photos/cheruto-02.jpg',
    badge: 'St. John Ambulance • Red Cross • Scouts',
    caption: 'A certified First Aid trainer and dedicated volunteer with St. John Ambulance, the Red Cross, and Scouts — because service, to her, was love in action.',
  },
  {
    id: 'home-6',
    image: '/photos/cheruto-03.jpg',
    badge: 'Africa Forward Summit',
    caption: 'Trilingual in English, Swahili, and French (B1–B2 DELF/DALF), she stepped boldly into leadership at the Africa Forward Summit, determined to help build a brighter future.',
  },
  {
    id: 'home-7',
    image: '/photos/cheruto-04.jpg',
    badge: 'A Life Lived Beautifully',
    caption: 'Always smiling, singing, and brightening every room she entered — RuthBeryl is defined not by how she died, but by how beautifully she lived.',
  },
]

// ============================================
// STORY PAGE — HER STORY CHAPTERS (4 expandable cards)
// ============================================
export const STORY_CHAPTERS = [
  {
    id: 'chapter-beginning',
    title: 'Her Beginning',
    era: 'Born 6th March 2006',
    badgeColor: 'var(--accent-purple)',
    description: 'A bright spirit from the very start.',
    summary: 'Born into love — a bright spirit from the very start.',
    fullStory: `Today, we gather to remember, honor, and celebrate the 20 years we shared with RuthBeryl Cheruto Chepses, our beloved Holland. Though her time with us was far too short, her life was filled with deep love, bright milestones, and a passion for learning that inspired everyone around her. She was lively, kind, and quick to forgive, possessed of a heart so full of love that it touched everyone she met. Today, we celebrate not just how she died, but how she lived: with purpose, with joy, and with an unwavering commitment to making the world around her better. Rest well Holland, until we meet again.`,
    photos: [
      { src: '/photos/cheruto-main.jpg', caption: 'Her Beginning', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { src: '/photos/cheruto-memorial-1.jpg', caption: 'Roots', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
    ],
  },
  {
    id: 'chapter-faith',
    title: 'Christian Life & Faith',
    era: 'RCEA & ACK',
    badgeColor: 'var(--accent-purple)',
    description: 'Faith was a cornerstone of her character.',
    summary: 'Her Christian faith formed the foundation of her character and service.',
    fullStory: `RuthBeryl's journey of faith began early. She was baptised in the RCEA church by Rev. Muchora, with Rev. Geoffrey Songok as her Godparent. She was confirmed in the ACK church, surrounded by her Godparents, Rev. Peter Lawrence and others who cherished her. Faith was a cornerstone of her character, and she carried its values of compassion, service, and love throughout her life.`,
    photos: [
      { src: '/photos/cheruto-memorial-1.jpg', caption: 'RCEA Baptism', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
      { src: '/photos/cheruto-03.jpg', caption: 'ACK Confirmation', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ],
  },
  {
    id: 'chapter-teaching',
    title: 'Teaching & Calling',
    era: 'Educator',
    badgeColor: 'var(--btn-pink)',
    description: 'She saw each student as a whole person.',
    summary: 'She saw each student as a whole person deserving of respect.',
    fullStory: `RuthBeryl did not wait for graduation to start making a difference; teaching was her calling. She served at Pinehouse Schools Ngoingwa, Thika (Science & Mathematics Teacher), International Youth Foundation, Thika (French Teacher), Thika Bellhouse Academy (French & Mathematics Teacher), and St. John Ambulance, Eldoret (Certified First Aid Trainer). What made her exceptional was not just her knowledge, but her heart: she saw each student as a whole person, deserving of respect, encouragement, and the chance to grow.`,
    photos: [
      { src: '/photos/cheruto-04.jpg', caption: 'Teaching in Action', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
      { src: '/photos/cheruto-01.jpg', caption: 'Classroom Moments', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
    ],
  },
  {
    id: 'chapter-ambition',
    title: 'Passion, Ambition & Depth',
    era: 'Leader & Change-Maker',
    badgeColor: 'var(--accent-purple)',
    description: 'She dreamed of building a brighter future.',
    summary: 'She dreamed of being a leader and change-maker.',
    fullStory: `Above all, RuthBeryl was ambitious. She dreamed of being a leader, an educator, and a change-maker, and took deliberate steps toward it. She attended the Africa Forward Summit and other conferences as a participant, a learner, and a contributor, convinced that Africa's future was bright and that she wanted to help build it. She completed her French B1–B2 DELF/DALF certification, adding a third language to her fluency in English and Swahili.`,
    photos: [
      { src: '/photos/cheruto-03.jpg', caption: 'Africa Forward Summit', fallbackGradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))' },
      { src: '/photos/cheruto-02.jpg', caption: 'Alliance Française', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    ],
  },
]

// ============================================
// STORY PAGE — FAMILY TRIBUTES
// ============================================
export const STORY_FAMILY = [
  {
    id: 'family-parents',
    name: 'Parents',
    badge: 'Roots',
    title: 'Home & Kin',
    relationship_type: `RuthBeryl, you were our daughter, our pride, and our joy. You brought light into our home from the day you were born on 6th March 2006. Your laughter filled our house, your kindness touched our neighbors, and your faith guided us all. Though the road at Gatitu took you from us too soon, we take comfort in knowing you lived a beautiful life of service, love, and purpose. We will carry your memory in our hearts forever.`,
    summary: 'She was our daughter, our pride, and our joy from birth.',
    fullStory: `Reuben Kipkosgei Koech Chepses and Rebbecah Metto Koskei raised RuthBeryl with love, faith, and the values of service and education. From her baptism in the RCEA church to her confirmation in the ACK church, they nurtured her spiritual foundation. They watched her grow from a bright, curious child into an accomplished young woman who excelled academically, served her community compassionately, and touched countless lives through her teaching and volunteer work. As parents, they say: "RuthBeryl, you were our daughter, our pride, and our joy. Though the road at Gatitu took you from us too soon, we take comfort in knowing you lived a beautiful life of service, love, and purpose. We will carry your memory in our hearts forever."`,
    photos: [
      { src: '/photos/cheruto-main.jpg', caption: 'Family Portrait', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    ],
  },
  {
    id: 'family-siblings',
    name: 'Siblings',
    badge: 'Tradition',
    title: 'Brothers & Sisters',
    relationship_type: `Zipporah Chebichii, Edith Chepchirchir, Israel Kipkeino, and childhood siblings Anthony Lagat, Fredrick Kipkemboi Limo, Hilda Chelimo, Caroline Chepleting, Laban Kipkosgei, and Susan Naliaka — a close-knit family bound by love, shared meals, and countless memories.`,
    summary: 'She was our sister, friend, confidante, and inspiration.',
    fullStory: `RuthBeryl grew up surrounded by brothers and sisters who were her first friends and lifelong companions. From childhood games to shared responsibilities, they formed a tight-knit circle. Her siblings remember her as the sister who always made time for others, who brought laughter to difficult moments, and who led by example through her dedication to school, faith, and service. As her siblings say: "You were not just our sister — you were our friend, our confidante, and our inspiration. We will miss your smile, your songs, and your unwavering love."`,
    photos: [
      { src: '/photos/cheruto-memorial-2.jpg', caption: 'Siblings Together', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), var(--accent-purple))' },
      { src: '/photos/cheruto-03.jpg', caption: 'Childhood Memories', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), #F5B7A7)' },
    ],
  },
]

// ============================================
// STORY PAGE — FRIENDS TRIBUTES
// ============================================
export const STORY_FRIENDS = [
  {
    id: 'friends-chosen-circle',
    name: 'Friends',
    badge: 'Circle',
    title: 'Her Chosen Circle',
    relationship_type: `Sean, Chumba, Purity, Daisy, Mercy, Nabai, Jojo, Mablyne, Martha, Denzel, Jeff, Mercy MKU, Obadiah & Rutoo Kabarnet — caring, selfless and joyful, each of you held a special place in RuthBeryl's heart.`,
    summary: 'Caring, selfless and joyful — she made family out of friends.',
    fullStory: `RuthBeryl's friends were her chosen family. From Mount Kenya University to Alliance Française, from swimming club to church youth groups, she built deep, meaningful connections wherever she went. Her friends describe her as caring, selfless, and joyful — someone who would drop everything to help a friend in need, who remembered birthdays and small details, and who brought laughter to every gathering. Whether studying together at MKU, practicing French at Alliance Française, or swimming at the club, RuthBeryl made every moment count. As her friends say: "Caring, selfless and joyful — RuthBeryl didn't just have friends; she made family out of friends."`,
    photos: [
      { src: '/photos/cheruto-01.jpg', caption: 'Friends Together', fallbackGradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
      { src: '/photos/cheruto-04.jpg', caption: 'Campus Days', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    ],
  },
  {
    id: 'friends-mku',
    name: 'Friends',
    badge: 'MKU',
    title: 'Mount Kenya University & Alliance Française',
    relationship_type: `At MKU and Alliance Française, RuthBeryl built study groups, language partners, and lifelong bonds. She balanced her Education degree with French certification, always encouraging classmates to aim higher.`,
    summary: 'She balanced her Education degree with French certification at Alliance Française.',
    fullStory: `At Mount Kenya University, RuthBeryl pursued her Bachelor of Science in Education (Mathematics & Chemistry) while simultaneously completing her French B1–B2 DELF/DALF certification at Alliance Française. Her classmates remember her as the student who organized study sessions, who explained difficult concepts patiently, and who always had time for others despite her own demanding schedule. She dreamed of becoming not just a teacher, but a leader and change-maker who could impact education across Kenya and beyond.`,
    photos: [
      { src: '/photos/cheruto-02.jpg', caption: 'MKU Campus', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { src: '/photos/cheruto-01.jpg', caption: 'Alliance Française', fallbackGradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))' },
    ],
  },
  {
    id: 'friends-swimming',
    name: 'Friends',
    badge: 'Laughter',
    title: 'Swimming Club & YMF',
    relationship_type: `At the swimming club and Young Members Forum, RuthBeryl brought energy, discipline, and joy — teaching younger swimmers, organizing events, and building community wherever she went.`,
    summary: 'She taught younger swimmers and organized community events.',
    fullStory: `RuthBeryl was active in her local swimming club and the Young Members Forum (YMF), where she combined her love of physical activity with her passion for community building. She didn't just swim — she mentored younger swimmers, helped organize community events, and brought her characteristic joy to every gathering. Her friends from the club remember her as someone who could turn an ordinary practice into a celebration, who encouraged everyone to do their best, and who lived her faith through service to others.`,
    photos: [
      { src: '/photos/cheruto-02.jpg', caption: 'Swimming Club', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { src: '/photos/cheruto-01.jpg', caption: 'YMF Events', fallbackGradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))' },
    ],
  },
]

// ============================================
// STORY PAGE — COMMUNITY TRIBUTES
// ============================================
export const STORY_COMMUNITY = [
  {
    id: 'community-thika',
    name: 'Community',
    badge: 'Grace',
    title: 'Thika Bellhouse Academy & Pinehouse Schools',
    relationship_type: `RuthBeryl taught Science, Mathematics, and French at Thika Bellhouse Academy and Pinehouse Schools Ngoingwa, where she saw each student as a whole person deserving of respect, encouragement, and the chance to grow.`,
    summary: 'She taught Science, Mathematics, and French with dedication and creativity.',
    fullStory: `As a teacher at Thika Bellhouse Academy and Pinehouse Schools Ngoingwa, RuthBeryl taught Science, Mathematics, and French with dedication and creativity. Her students remember her as more than a teacher — she was a mentor who saw potential in every child, who offered encouragement when they struggled, and who celebrated their successes. She believed that education was not just about grades but about forming whole people who would contribute positively to society. Her classrooms were filled with laughter, questions, and the quiet confidence of students who knew they were valued.`,
    photos: [
      { src: '/photos/cheruto-02.jpg', caption: 'Thika Bellhouse Academy', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' },
      { src: '/photos/cheruto-03.jpg', caption: 'Pinehouse Schools', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ],
  },
  {
    id: 'community-stjohns',
    name: 'Community',
    badge: 'Legacy',
    title: 'St. John Ambulance, Red Cross & Scouts',
    relationship_type: `A certified First Aid trainer and dedicated volunteer with St. John Ambulance, the Red Cross, and Scouts — because service, to her, was love in action.`,
    summary: 'She trained first responders with St. John Ambulance and Red Cross.',
    fullStory: `RuthBeryl's commitment to service extended far beyond the classroom. As a certified First Aid trainer with St. John Ambulance, she taught lifesaving skills to students and community members. She volunteered with the Red Cross, responding to community needs with compassion and professionalism. And as a Scout, she embodied the values of leadership, service, and preparedness. Her community service wasn't just volunteer hours — it was the outward expression of her faith and her belief that every person deserved care, dignity, and support.`,
    photos: [
      { src: '/photos/cheruto-02.jpg', caption: 'St. John Ambulance Training', fallbackGradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' },
      { src: '/photos/cheruto-main.jpg', caption: 'Red Cross Service', fallbackGradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ],
  },
]

// ============================================
// STORY PAGE — FUNERAL HYMNS (Page 10 of eulogy)
// ============================================
export const FUNERAL_HYMNS = [
  {
    id: 'hymn-1',
    title: 'Mbele Ninaendelea',
    language: 'Swahili',
    stanzas: 3,
    lyrics: `Mbele ninaendelea,\nMungu atawakilisha,\nNitafanya kazi ya kuwandishi,\nNa kuwa msanii wa kweli.\n\nChorus:\nNitaenda mbele,\nNitafanya kazi,\nKwa ajili ya yote aliyeweka.\n\nMbele ninaendelea,\nNa furaha itakuwa,\nKwa sababu Mungu ananiondoa.`,
  },
  {
    id: 'hymn-2',
    title: 'Mitei Emet Barak',
    language: 'Kalenjin',
    stanzas: 4,
    lyrics: `Mitei emet barak,\nKakipkok arap ket,\nIriitai kasum,\nNa kipng'etuny.\n\nChorus:\nIriitai kasum,\nNa kipkok arap ket,\nKabarsion kou.\n\nMitei emet barak,\nNan kaabarani,\nNa kebenetik ka.`,
  },
  {
    id: 'hymn-3',
    title: 'Mitei Lapketyet Bandanyu',
    language: 'Kalenjin',
    stanzas: 3,
    lyrics: `Mitei lapketyet bandanyu,\nKakipkok arap ket,\nIriitai kasum,\nNa kipng'etuny.\n\nChorus:\nIriitai kasum,\nNa kipkok arap ket,\nKabarsion kou.\n\nMitei lapketyet bandanyu,\nNan kaabarani,\nNa kebenetik ka.`,
  },
]

// ============================================
// STORY PAGE — CLOSING APPRECIATION
// ============================================
export const CLOSING_APPRECIATION = `Forever, Holland — thank you. To God Almighty for the gift of your life; to our parents Reuben Kipkosgei Koech Chepses & Rebbecah Metto Koskei, for raising you with faith and love; to our siblings — Zipporah, Edith, Israel, Anthony, Fredrick, Hilda, Caroline, Laban, and Susan — for sharing childhood with you; to our extended family, for surrounding us with prayers; to the medical team at Thika Level 5 Hospital, including John Mugambi and Joseph Kalum, for fighting to save you; and to everyone who prayed, visited, stood with us, and comforted us — we are eternally grateful.`

// ============================================
// TIMELINE PAGE — 6 CHRONOLOGICAL LIFE CHAPTERS
// ============================================
export const TIMELINE_STAGES = [
  {
    id: 'birth',
    title: 'Born into Love',
    era: '6th March 2006 • Eldoret',
    badgeColor: 'var(--accent-purple)',
    tag: 'Birth',
    summary: 'Born into love — a bright spirit from the very start.',
    dayTime: '6th March 2006 • Eldoret',
    description: 'Born on 6th March 2006 in Eldoret; known for her wide, infectious smile, gentle heart, and early Christian foundation (baptised in RCEA by Rev. Muchora with Godparent Rev. Geoffrey Songok, and confirmed in ACK with Rev. Peter Lawrence).',
    photoUrl: '/photos/cheruto-main.jpg',
    expandedDescription: `RuthBeryl Cheruto Chepses was born on 6th March 2006 in Eldoret, Kenya. From her very first moments, she was known for her wide, infectious smile, gentle heart, and early Christian foundation. She was baptised in the RCEA church by Rev. Muchora, with Rev. Geoffrey Songok as her Godparent. She was later confirmed in the ACK church, surrounded by her Godparents, Rev. Peter Lawrence and others who cherished her. These early foundations of faith would guide her throughout her life.`,
    locationSlides: [
      { image: '/photos/cheruto-main.jpg', caption: 'Eldoret — Birthplace', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { image: '/photos/cheruto-memorial-1.jpg', caption: 'RCEA Church — Baptism', gradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
    ],
  },
  {
    id: 'early-years',
    title: 'Early Schooling',
    era: 'Maili Nne, Soy & Eldoret',
    badgeColor: 'var(--accent-purple)',
    tag: 'Early Years',
    summary: 'Began at Jakmeda in Maili Nne for daycare and pre-school, continued at Soy Academy, and completed primary school at Bishop Muge Memorial.',
    dayTime: 'Maili Nne, Soy & Eldoret',
    description: 'Began at Jakmeda in Maili Nne for daycare and pre-school, continued at Soy Academy, and completed primary school at Bishop Muge Memorial with good grades.',
    photoUrl: '/photos/cheruto-01.jpg',
    expandedDescription: `RuthBeryl's educational journey began at Jakmeda in Maili Nne for daycare and pre-school. She continued at Soy Academy, where she developed her love of learning and her confidence in the classroom. She completed her primary school education at Bishop Muge Memorial, achieving good grades that reflected her diligence and intelligence. These early years laid the foundation for the curious, ambitious young woman she would become.`,
    locationSlides: [
      { image: '/photos/cheruto-01.jpg', caption: 'Jakmeda Daycare', gradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
      { image: '/photos/cheruto-02.jpg', caption: 'Soy Academy', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { image: '/photos/cheruto-03.jpg', caption: 'Bishop Muge Memorial', gradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' },
    ],
  },
  {
    id: 'youth',
    title: 'Precious Blood Riruta Girls\' High School',
    era: 'A-Levels',
    badgeColor: 'var(--accent-purple)',
    tag: 'Youth',
    summary: 'Admitted to Precious Blood Riruta Girls\' High School for her A-Levels.',
    dayTime: 'Precious Blood Riruta Girls\' High School • A-Levels',
    description: 'Admitted to Precious Blood Riruta Girls\' High School, where she pursued her A-levels, blossomed into an independent, thoughtful young woman, and achieved outstanding grades earning admission to university.',
    photoUrl: '/photos/cheruto-03.jpg',
    expandedDescription: `At Precious Blood Riruta Girls' High School, RuthBeryl pursued her A-levels and blossomed into an independent, thoughtful young woman. The school's rigorous academic environment challenged her to think critically, while its vibrant community allowed her to form lifelong friendships. She achieved outstanding grades, earning admission to university — a testament to her hard work and the support of her family and teachers.`,
    locationSlides: [
      { image: '/photos/cheruto-03.jpg', caption: 'Precious Blood Riruta', gradient: 'linear-gradient(145deg, #F5B7A7, var(--accent-purple))' },
      { image: '/photos/cheruto-04.jpg', caption: 'A-Level Studies', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ],
  },
  {
    id: 'university',
    title: 'Mount Kenya University & Alliance Française',
    era: '2024 – 2026',
    badgeColor: 'var(--btn-pink)',
    tag: 'Campus',
    summary: 'Joined Mount Kenya University in 2024 for a Bachelor of Science in Education (Mathematics & Chemistry) while earning her French B1–B2 DELF/DALF certification at Alliance Française in Eldoret and Nairobi.',
    dayTime: 'Mount Kenya University & Alliance Française • 2024 – 2026',
    description: 'Joined Mount Kenya University in 2024 for a Bachelor of Science in Education (Mathematics & Chemistry) while earning her French B1–B2 DELF/DALF certification at Alliance Française in Eldoret and Nairobi.',
    photoUrl: '/photos/cheruto-04.jpg',
    expandedDescription: `In 2024, RuthBeryl joined Mount Kenya University to pursue a Bachelor of Science in Education (Mathematics & Chemistry). At the same time, she earned her French B1–B2 DELF/DALF certification at Alliance Française in Eldoret and Nairobi, adding a third language to her fluency in English and Swahili. She balanced her demanding course load with her commitment to service, teaching, and community involvement — always striving for excellence in everything she did.`,
    locationSlides: [
      { image: '/photos/cheruto-04.jpg', caption: 'Mount Kenya University', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
      { image: '/photos/cheruto-01.jpg', caption: 'Alliance Française', gradient: 'linear-gradient(145deg, var(--btn-pink), #F5B7A7)' },
    ],
  },
  {
    id: 'service',
    title: 'Teacher, First Aid Trainer & Leader',
    era: 'Thika & Eldoret',
    badgeColor: 'var(--btn-pink)',
    tag: 'Service',
    summary: 'Taught Science, Maths & French; trained first aid with St. John Ambulance.',
    dayTime: 'Thika & Eldoret • Teacher & First Aid Trainer',
    description: 'Taught Science, Mathematics, and French at Pinehouse Schools Ngoingwa, International Youth Foundation, and Thika Bellhouse Academy; trained first responders with St. John Ambulance, volunteered with the Red Cross and Scouts, and represented youth leadership at the Africa Forward Summit.',
    photoUrl: '/photos/cheruto-02.jpg',
    expandedDescription: `RuthBeryl's professional life was defined by service. She taught Science, Mathematics, and French at Pinehouse Schools Ngoingwa, International Youth Foundation, and Thika Bellhouse Academy — always seeing each student as a whole person deserving of respect and encouragement. As a certified First Aid trainer with St. John Ambulance, she taught lifesaving skills. She volunteered with the Red Cross and Scouts. And as a youth leader, she represented her generation at the Africa Forward Summit, convinced that Africa's future was bright and that she wanted to help build it.`,
    locationSlides: [
      { image: '/photos/cheruto-02.jpg', caption: 'Pinehouse Schools Ngoingwa', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
      { image: '/photos/cheruto-03.jpg', caption: 'Thika Bellhouse Academy', gradient: 'linear-gradient(145deg, var(--accent-green), var(--accent-purple))' },
      { image: '/photos/cheruto-04.jpg', caption: 'Africa Forward Summit', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--accent-green))' },
    ],
  },
  {
    id: 'final-chapter',
    title: 'Her Final Moments',
    era: 'Gatitu & Thika Level 5 Hospital',
    badgeColor: '#5C343D',
    tag: 'Final Chapter',
    summary: "RuthBeryl's life was cut short in a road accident at Gatitu, Thika; rushed to Thika Level 5 Hospital.",
    dayTime: 'Gatitu & Thika Level 5 Hospital • Final Moments',
    description: `RuthBeryl's life was cut short in a tragic road accident at Gatitu, Thika. She was rushed to the casualty department at Thika Level 5 Hospital, where medical personnel fought to save her life, but she later succumbed to her injuries. The road at Gatitu took her from us, but it cannot take her legacy. RuthBeryl is not defined by how she died. She is defined by how she lived. And she lived beautifully!`,
    photoUrl: '/photos/cheruto-memorial-2.jpg',
    expandedDescription: `RuthBeryl's life was tragically cut short in a road accident at Gatitu, Thika. She was rushed to the casualty department at Thika Level 5 Hospital, where medical personnel — including John Mugambi and Joseph Kalum — fought to save her life. Despite their best efforts, she later succumbed to her injuries. The road at Gatitu took her from us, but it cannot take her legacy. RuthBeryl is not defined by how she died. She is defined by how she lived — with purpose, with joy, with faith, and with an unwavering commitment to serving others. And she lived beautifully!`,
    locationSlides: [
      { image: '/photos/cheruto-memorial-2.jpg', caption: 'Gatitu — Where We Lost Her', gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))' },
      { image: '/photos/cheruto-memorial-1.jpg', caption: 'Thika Level 5 Hospital', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { image: '/photos/cheruto-main.jpg', caption: 'Her Resting Place', gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))' },
    ],
  },
]

// ============================================
// GATHERING PAGE — FUNERAL SCHEDULE EVENTS
// ============================================
export const GATHERING_SCHEDULE = [
  {
    id: 'vigil',
    iconColor: 'var(--accent-purple)',
    title: 'MKU Candle Lighting Vigil',
    timeBadge: '7:00 – 9:00 PM',
    day: 'Monday Night',
    location: 'MKU Campus',
    dayTime: 'MONDAY NIGHT • 7:00 – 9:00 PM',
    description: 'Join us in light and remembrance as we gather around the flame to honor RuthBeryl’s life.',
    expandedDescription: 'The MKU Candle Lighting Vigil brings family, friends, and classmates together on Monday night to share stories, light candles, and carry RuthBeryl’s light forward. A quiet, sacred moment of remembrance on campus grounds.',
    locationSlides: [
      { image: '/photos/cheruto-main.jpg', caption: 'MKU Campus Grounds', gradient: 'linear-gradient(145deg, var(--accent-purple), #5C343D)' },
      { image: '/photos/cheruto-memorial-1.jpg', caption: 'Evening Vigil Square', gradient: 'linear-gradient(145deg, #5C343D, var(--btn-pink))' },
      { image: '/photos/cheruto-02.jpg', caption: 'Candlelight Gathering Spot', gradient: 'linear-gradient(145deg, var(--btn-pink), var(--accent-purple))' },
    ],
  },
  {
    id: 'departure',
    iconColor: 'var(--btn-pink)',
    title: 'Eldoret School Transport',
    timeBadge: 'Same-Day Return',
    day: 'Wednesday',
    location: 'MKU Main Gate → Eldoret',
    dayTime: 'WEDNESDAY • SAME-DAY RETURN',
    description: 'Complimentary MKU student bus to Eldoret returning the same day on the same bus.',
    expandedDescription: 'A school-sponsored coach departs MKU Main Gate on Wednesday, carrying students to Eldoret for the burial service and returning the same day on the same bus. Reserved seats for students.',
    locationSlides: [
      { image: '/photos/cheruto-04.jpg', caption: 'MKU Main Gate Departure Point', gradient: 'linear-gradient(145deg, var(--btn-pink), #5C343D)' },
      { image: '/photos/cheruto-03.jpg', caption: 'Rift Valley Highway Journey to Eldoret', gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))' },
      { image: '/photos/cheruto-02.jpg', caption: 'Student Coach Assembly', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
    ],
  },
  {
    id: 'burial',
    iconColor: '#5C343D',
    title: 'Burial Service at Home',
    timeBadge: 'Home Service',
    day: 'Thursday',
    location: 'Eldoret — Her Family Home',
    dayTime: 'THURSDAY • HOME SERVICE',
    description: 'Final farewell surrounded by family and friends at her home place.',
    expandedDescription: 'The burial service takes place at RuthBeryl’s family home in Eldoret on Thursday, surrounded by loved ones. A solemn farewell in the place she called home.',
    locationSlides: [
      { image: '/photos/cheruto-main.jpg', caption: "RuthBeryl's Family Home in Eldoret", gradient: 'linear-gradient(145deg, #5C343D, var(--accent-purple))' },
      { image: '/photos/cheruto-memorial-2.jpg', caption: 'Homestead Compound & Grounds', gradient: 'linear-gradient(145deg, var(--accent-purple), var(--btn-pink))' },
      { image: '/photos/cheruto-03.jpg', caption: 'Final Resting Place', gradient: 'linear-gradient(145deg, var(--btn-pink), #5C343D)' },
    ],
  },
]