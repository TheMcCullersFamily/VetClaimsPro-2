// Comprehensive VA disability conditions database
export interface Condition {
  id: string;
  name: string;
  category: string;
  description: string;
  symptoms: string[];
  requiredEvidence: string[];
  successTips: string[];
  commonRatings: number[];
  relatedConditions: string[];
  keywords: string[];
}

export const conditionCategories = [
  { id: 'musculoskeletal', name: 'Musculoskeletal', icon: 'bone' },
  { id: 'mental-health', name: 'Mental Health', icon: 'brain' },
  { id: 'respiratory', name: 'Respiratory', icon: 'lungs' },
  { id: 'cardiovascular', name: 'Cardiovascular', icon: 'heart' },
  { id: 'neurological', name: 'Neurological', icon: 'nerve' },
  { id: 'digestive', name: 'Digestive', icon: 'stomach' },
  { id: 'skin', name: 'Skin Conditions', icon: 'skin' },
  { id: 'hearing', name: 'Hearing & Vision', icon: 'ear' },
  { id: 'endocrine', name: 'Endocrine', icon: 'gland' },
  { id: 'genitourinary', name: 'Genitourinary', icon: 'kidney' },
];

export const conditions: Condition[] = [
  // Mental Health
  {
    id: 'ptsd',
    name: 'Post-Traumatic Stress Disorder (PTSD)',
    category: 'mental-health',
    description: 'A mental health condition triggered by experiencing or witnessing a traumatic event during military service.',
    symptoms: [
      'Flashbacks and nightmares',
      'Severe anxiety and hypervigilance',
      'Avoidance of triggers',
      'Emotional numbness',
      'Sleep disturbances',
      'Difficulty concentrating',
      'Irritability and anger outbursts'
    ],
    requiredEvidence: [
      'Current diagnosis from licensed mental health professional',
      'Stressor statement (VA Form 21-0781)',
      'Service records documenting stressor event',
      'Buddy statements from fellow service members',
      'Treatment records showing ongoing care'
    ],
    successTips: [
      'Document specific in-service stressor events with dates and locations',
      'Get a nexus letter from your psychiatrist linking PTSD to service',
      'Include impact on daily life and work in personal statement',
      'Request C&P exam with PTSD-trained examiner'
    ],
    commonRatings: [30, 50, 70, 100],
    relatedConditions: ['depression', 'anxiety', 'sleep-apnea', 'tbi'],
    keywords: ['trauma', 'stress', 'combat', 'nightmares', 'anxiety']
  },
  {
    id: 'depression',
    name: 'Major Depressive Disorder',
    category: 'mental-health',
    description: 'A mood disorder causing persistent feelings of sadness and loss of interest that interferes with daily life.',
    symptoms: [
      'Persistent sad or empty mood',
      'Loss of interest in activities',
      'Changes in appetite and weight',
      'Sleep problems',
      'Fatigue and low energy',
      'Feelings of worthlessness',
      'Difficulty thinking or concentrating'
    ],
    requiredEvidence: [
      'Diagnosis from psychiatrist or psychologist',
      'Treatment records showing medication and therapy',
      'Personal statement describing symptoms and impact',
      'Buddy statements from family/friends'
    ],
    successTips: [
      'Document how depression began or worsened during service',
      'Keep a symptom journal before C&P exam',
      'Get nexus letter if claiming as secondary condition',
      'Include all medications and side effects'
    ],
    commonRatings: [10, 30, 50, 70, 100],
    relatedConditions: ['ptsd', 'anxiety', 'sleep-disorders'],
    keywords: ['sad', 'hopeless', 'mood', 'fatigue', 'suicide']
  },
  {
    id: 'anxiety',
    name: 'Generalized Anxiety Disorder',
    category: 'mental-health',
    description: 'Excessive, ongoing anxiety and worry that interferes with daily activities.',
    symptoms: [
      'Excessive worry about various things',
      'Restlessness or feeling on edge',
      'Difficulty concentrating',
      'Muscle tension',
      'Sleep problems',
      'Irritability',
      'Panic attacks'
    ],
    requiredEvidence: [
      'Diagnosis from mental health provider',
      'Treatment records',
      'Documentation of in-service onset or aggravation',
      'Personal and buddy statements'
    ],
    successTips: [
      'Document specific triggers related to military service',
      'Track frequency and severity of symptoms',
      'Include impact on work and relationships',
      'Consider claiming as secondary to PTSD if applicable'
    ],
    commonRatings: [10, 30, 50, 70],
    relatedConditions: ['ptsd', 'depression', 'panic-disorder'],
    keywords: ['worry', 'panic', 'nervous', 'fear', 'stress']
  },
  // Musculoskeletal
  {
    id: 'back-pain',
    name: 'Lumbosacral Strain (Lower Back Pain)',
    category: 'musculoskeletal',
    description: 'Chronic lower back pain often resulting from physical demands of military service.',
    symptoms: [
      'Chronic pain in lower back',
      'Limited range of motion',
      'Muscle spasms',
      'Pain radiating to legs',
      'Difficulty standing or sitting for long periods',
      'Stiffness after rest'
    ],
    requiredEvidence: [
      'Current diagnosis with imaging (X-ray, MRI)',
      'Service treatment records showing injury or complaints',
      'Continuity of treatment since service',
      'Range of motion measurements',
      'Nexus letter if no in-service documentation'
    ],
    successTips: [
      'Document all physical activities during service that stressed your back',
      'Get current range of motion testing during flare-up',
      'Include impact on daily activities and employment',
      'Consider secondary conditions like radiculopathy'
    ],
    commonRatings: [10, 20, 40, 60],
    relatedConditions: ['radiculopathy', 'degenerative-disc', 'sciatica'],
    keywords: ['back', 'spine', 'lumbar', 'pain', 'disc']
  },
  {
    id: 'knee-condition',
    name: 'Knee Strain/Instability',
    category: 'musculoskeletal',
    description: 'Chronic knee problems from running, marching, jumping, and other military activities.',
    symptoms: [
      'Pain with movement',
      'Swelling and stiffness',
      'Instability or giving way',
      'Popping or crunching sounds',
      'Limited range of motion',
      'Difficulty with stairs'
    ],
    requiredEvidence: [
      'Current diagnosis with imaging',
      'Service records showing knee complaints',
      'Documentation of physical demands during service',
      'Range of motion and stability testing'
    ],
    successTips: [
      'Document all running, rucking, and physical training',
      'Claim each knee separately if both affected',
      'Include instability rating if applicable',
      'Consider secondary conditions from altered gait'
    ],
    commonRatings: [10, 20, 30],
    relatedConditions: ['back-pain', 'hip-condition', 'ankle-condition'],
    keywords: ['knee', 'joint', 'running', 'instability', 'arthritis']
  },
  {
    id: 'shoulder-condition',
    name: 'Shoulder Impingement/Rotator Cuff',
    category: 'musculoskeletal',
    description: 'Shoulder injuries common from lifting, carrying equipment, and overhead activities.',
    symptoms: [
      'Pain with overhead movements',
      'Weakness in the arm',
      'Limited range of motion',
      'Pain at night',
      'Difficulty reaching behind back',
      'Clicking or popping'
    ],
    requiredEvidence: [
      'MRI or imaging showing damage',
      'Service records of injury or complaints',
      'Documentation of physical job duties',
      'Range of motion measurements'
    ],
    successTips: [
      'Document all heavy lifting and carrying during service',
      'Get range of motion tested during painful period',
      'Include impact on daily activities',
      'Claim each shoulder separately'
    ],
    commonRatings: [10, 20, 30, 40],
    relatedConditions: ['neck-condition', 'thoracic-outlet'],
    keywords: ['shoulder', 'rotator', 'arm', 'lifting', 'overhead']
  },
  // Hearing
  {
    id: 'tinnitus',
    name: 'Tinnitus',
    category: 'hearing',
    description: 'Ringing, buzzing, or other sounds in the ears, often from noise exposure during service.',
    symptoms: [
      'Ringing in ears',
      'Buzzing or humming sounds',
      'Difficulty sleeping',
      'Concentration problems',
      'Anxiety from constant noise'
    ],
    requiredEvidence: [
      'Current diagnosis from audiologist',
      'Documentation of noise exposure in service',
      'MOS/job duties involving loud noise',
      'Personal statement describing onset and impact'
    ],
    successTips: [
      'Document all noise exposure: weapons, aircraft, machinery',
      'Tinnitus is often presumptive for combat veterans',
      'Can be claimed with or without hearing loss',
      'Standard rating is 10% - highest schedular rating'
    ],
    commonRatings: [10],
    relatedConditions: ['hearing-loss', 'vertigo'],
    keywords: ['ringing', 'ears', 'noise', 'buzzing', 'hearing']
  },
  {
    id: 'hearing-loss',
    name: 'Bilateral Hearing Loss',
    category: 'hearing',
    description: 'Decreased hearing ability in one or both ears from military noise exposure.',
    symptoms: [
      'Difficulty understanding speech',
      'Needing higher volume on devices',
      'Asking others to repeat themselves',
      'Difficulty hearing in noisy environments',
      'Missing high-pitched sounds'
    ],
    requiredEvidence: [
      'Current audiogram showing hearing loss',
      'Entrance and separation audiograms',
      'Documentation of noise exposure',
      'Nexus letter if audiograms don\'t show shift'
    ],
    successTips: [
      'Request copies of all military audiograms',
      'Document all noise exposure during service',
      'Get current audiogram from VA or private provider',
      'Claim tinnitus at the same time'
    ],
    commonRatings: [0, 10, 20, 30, 40, 50],
    relatedConditions: ['tinnitus', 'vertigo'],
    keywords: ['hearing', 'deaf', 'ears', 'audiogram', 'noise']
  },
  // Respiratory
  {
    id: 'sleep-apnea',
    name: 'Sleep Apnea',
    category: 'respiratory',
    description: 'A sleep disorder where breathing repeatedly stops and starts during sleep.',
    symptoms: [
      'Loud snoring',
      'Episodes of stopped breathing',
      'Gasping for air during sleep',
      'Morning headaches',
      'Excessive daytime sleepiness',
      'Difficulty concentrating'
    ],
    requiredEvidence: [
      'Sleep study (polysomnography) diagnosis',
      'CPAP prescription if applicable',
      'Service records or nexus for direct connection',
      'Documentation of secondary connection if applicable'
    ],
    successTips: [
      'Get a sleep study as soon as possible',
      'Often claimed as secondary to PTSD or weight gain',
      'Document impact on daily functioning',
      '50% rating requires CPAP machine use'
    ],
    commonRatings: [0, 30, 50, 100],
    relatedConditions: ['ptsd', 'obesity', 'hypertension'],
    keywords: ['sleep', 'snoring', 'cpap', 'breathing', 'fatigue']
  },
  {
    id: 'asthma',
    name: 'Asthma',
    category: 'respiratory',
    description: 'A condition causing airways to narrow, swell, and produce extra mucus.',
    symptoms: [
      'Shortness of breath',
      'Chest tightness',
      'Wheezing',
      'Coughing attacks',
      'Difficulty exercising',
      'Sleep disruption from symptoms'
    ],
    requiredEvidence: [
      'Pulmonary function tests (PFT)',
      'Documentation of in-service onset or aggravation',
      'Treatment records showing medication use',
      'Evidence of environmental exposures'
    ],
    successTips: [
      'Document burn pit or other toxic exposures',
      'Get current PFT during symptomatic period',
      'Track frequency of attacks and medication use',
      'Consider PACT Act presumptives'
    ],
    commonRatings: [10, 30, 60, 100],
    relatedConditions: ['sinusitis', 'rhinitis', 'sleep-apnea'],
    keywords: ['breathing', 'lungs', 'inhaler', 'wheeze', 'burn pit']
  },
  // Neurological
  {
    id: 'tbi',
    name: 'Traumatic Brain Injury (TBI)',
    category: 'neurological',
    description: 'Brain dysfunction caused by an outside force, common from blasts, falls, or impacts.',
    symptoms: [
      'Headaches',
      'Memory problems',
      'Difficulty concentrating',
      'Dizziness or balance problems',
      'Mood changes',
      'Sensitivity to light and noise',
      'Sleep disturbances'
    ],
    requiredEvidence: [
      'Documentation of in-service head injury',
      'Current neurological evaluation',
      'Cognitive testing results',
      'Buddy statements about injury event'
    ],
    successTips: [
      'Document all blast exposures and head impacts',
      'Get comprehensive neuropsychological testing',
      'TBI residuals are rated separately (headaches, cognitive, etc.)',
      'Request TBI-trained C&P examiner'
    ],
    commonRatings: [10, 40, 70, 100],
    relatedConditions: ['ptsd', 'migraines', 'depression'],
    keywords: ['brain', 'head injury', 'concussion', 'blast', 'memory']
  },
  {
    id: 'migraines',
    name: 'Migraine Headaches',
    category: 'neurological',
    description: 'Severe, recurring headaches often with nausea and sensitivity to light.',
    symptoms: [
      'Severe throbbing head pain',
      'Nausea and vomiting',
      'Sensitivity to light and sound',
      'Visual disturbances (aura)',
      'Dizziness',
      'Fatigue after episodes'
    ],
    requiredEvidence: [
      'Current diagnosis from neurologist',
      'Service records showing headache complaints',
      'Headache diary documenting frequency',
      'Documentation of prostrating attacks'
    ],
    successTips: [
      'Keep detailed headache diary for 3+ months',
      'Document "prostrating" attacks that force you to stop activities',
      'Can be secondary to TBI, PTSD, or neck conditions',
      '50% rating requires frequent prostrating attacks'
    ],
    commonRatings: [0, 10, 30, 50],
    relatedConditions: ['tbi', 'neck-condition', 'ptsd'],
    keywords: ['headache', 'migraine', 'head pain', 'nausea', 'light sensitivity']
  },
  {
    id: 'radiculopathy',
    name: 'Radiculopathy (Nerve Pain)',
    category: 'neurological',
    description: 'Pain, numbness, or weakness radiating along a nerve from the spine.',
    symptoms: [
      'Shooting pain down arm or leg',
      'Numbness or tingling',
      'Muscle weakness',
      'Decreased reflexes',
      'Burning sensations'
    ],
    requiredEvidence: [
      'EMG/nerve conduction study',
      'MRI showing nerve compression',
      'Documentation of primary spine condition',
      'Neurological examination findings'
    ],
    successTips: [
      'Claim as secondary to back or neck condition',
      'Each extremity is rated separately',
      'Get EMG testing to document nerve involvement',
      'Document impact on grip strength or walking'
    ],
    commonRatings: [10, 20, 40, 60],
    relatedConditions: ['back-pain', 'neck-condition', 'degenerative-disc'],
    keywords: ['nerve', 'radiating', 'numbness', 'tingling', 'sciatica']
  },
  // Cardiovascular
  {
    id: 'hypertension',
    name: 'Hypertension (High Blood Pressure)',
    category: 'cardiovascular',
    description: 'Chronically elevated blood pressure that can lead to serious health problems.',
    symptoms: [
      'Often no symptoms (silent condition)',
      'Headaches',
      'Shortness of breath',
      'Nosebleeds',
      'Dizziness'
    ],
    requiredEvidence: [
      'Multiple blood pressure readings over time',
      'Service records showing elevated readings',
      'Current diagnosis and treatment records',
      'Medication list'
    ],
    successTips: [
      'Document blood pressure readings from service',
      'Can be secondary to PTSD, sleep apnea, or kidney disease',
      'Track readings before and after medication',
      '10% requires continuous medication'
    ],
    commonRatings: [10, 20, 40, 60],
    relatedConditions: ['sleep-apnea', 'ptsd', 'heart-disease'],
    keywords: ['blood pressure', 'heart', 'cardiovascular', 'medication']
  },
  // Skin
  {
    id: 'eczema',
    name: 'Eczema/Dermatitis',
    category: 'skin',
    description: 'Chronic skin condition causing itchy, inflamed, and irritated skin.',
    symptoms: [
      'Itchy, dry skin',
      'Red or brownish patches',
      'Small raised bumps',
      'Thickened, cracked skin',
      'Raw, sensitive skin from scratching'
    ],
    requiredEvidence: [
      'Diagnosis from dermatologist',
      'Photos of affected areas',
      'Treatment records showing medications used',
      'Documentation of percentage of body affected'
    ],
    successTips: [
      'Document percentage of body affected',
      'Take photos during flare-ups',
      'Track frequency and duration of outbreaks',
      'Include all topical and systemic treatments'
    ],
    commonRatings: [0, 10, 30, 60],
    relatedConditions: ['psoriasis', 'contact-dermatitis'],
    keywords: ['skin', 'rash', 'itchy', 'dermatitis', 'eczema']
  },
  // Digestive
  {
    id: 'gerd',
    name: 'GERD (Acid Reflux)',
    category: 'digestive',
    description: 'Chronic digestive disease where stomach acid flows back into the esophagus.',
    symptoms: [
      'Heartburn',
      'Regurgitation of food or sour liquid',
      'Difficulty swallowing',
      'Chest pain',
      'Chronic cough',
      'Disrupted sleep'
    ],
    requiredEvidence: [
      'Endoscopy or other diagnostic testing',
      'Service records showing GI complaints',
      'Treatment records and medication history',
      'Documentation of dietary restrictions'
    ],
    successTips: [
      'Document all medications tried',
      'Can be secondary to PTSD medications or stress',
      'Include impact on diet and daily life',
      'Track frequency and severity of symptoms'
    ],
    commonRatings: [10, 30, 60],
    relatedConditions: ['hiatal-hernia', 'ibs', 'ulcers'],
    keywords: ['acid', 'reflux', 'heartburn', 'stomach', 'digestive']
  },
  {
    id: 'ibs',
    name: 'Irritable Bowel Syndrome (IBS)',
    category: 'digestive',
    description: 'A chronic condition affecting the large intestine, causing cramping, pain, and bowel changes.',
    symptoms: [
      'Abdominal pain and cramping',
      'Bloating and gas',
      'Diarrhea or constipation',
      'Mucus in stool',
      'Urgency',
      'Incomplete bowel movements'
    ],
    requiredEvidence: [
      'Diagnosis from gastroenterologist',
      'Colonoscopy or other testing',
      'Service records showing GI issues',
      'Documentation of frequency and severity'
    ],
    successTips: [
      'Keep detailed symptom diary',
      'Document impact on work and social life',
      'Often secondary to PTSD or anxiety',
      'Include all dietary modifications'
    ],
    commonRatings: [10, 30],
    relatedConditions: ['gerd', 'ptsd', 'anxiety'],
    keywords: ['bowel', 'stomach', 'diarrhea', 'constipation', 'digestive']
  },
  // Additional conditions
  {
    id: 'diabetes',
    name: 'Diabetes Mellitus Type II',
    category: 'endocrine',
    description: 'A chronic condition affecting how the body processes blood sugar.',
    symptoms: [
      'Increased thirst and urination',
      'Fatigue',
      'Blurred vision',
      'Slow-healing wounds',
      'Numbness in hands or feet',
      'Unexplained weight loss'
    ],
    requiredEvidence: [
      'Lab results showing diabetes diagnosis',
      'Service records or Agent Orange exposure',
      'Treatment records showing medication/insulin',
      'Documentation of complications'
    ],
    successTips: [
      'Presumptive for Agent Orange exposure',
      'Document all complications (neuropathy, retinopathy, etc.)',
      'Each complication can be rated separately',
      '20% rating requires insulin or oral medication'
    ],
    commonRatings: [10, 20, 40, 60, 100],
    relatedConditions: ['neuropathy', 'hypertension', 'kidney-disease'],
    keywords: ['diabetes', 'blood sugar', 'insulin', 'agent orange']
  },
  {
    id: 'neuropathy',
    name: 'Peripheral Neuropathy',
    category: 'neurological',
    description: 'Nerve damage causing weakness, numbness, and pain, usually in hands and feet.',
    symptoms: [
      'Numbness or tingling in extremities',
      'Sharp or burning pain',
      'Extreme sensitivity to touch',
      'Muscle weakness',
      'Loss of coordination',
      'Difficulty with fine motor tasks'
    ],
    requiredEvidence: [
      'EMG/nerve conduction study',
      'Diagnosis from neurologist',
      'Documentation of underlying cause',
      'Service connection for primary condition'
    ],
    successTips: [
      'Often secondary to diabetes or toxic exposure',
      'Each extremity rated separately',
      'Document impact on daily activities',
      'Presumptive for Agent Orange exposure'
    ],
    commonRatings: [10, 20, 40, 60],
    relatedConditions: ['diabetes', 'radiculopathy'],
    keywords: ['nerve', 'numbness', 'tingling', 'burning', 'feet', 'hands']
  },
  {
    id: 'erectile-dysfunction',
    name: 'Erectile Dysfunction',
    category: 'genitourinary',
    description: 'Inability to achieve or maintain an erection sufficient for sexual activity.',
    symptoms: [
      'Difficulty achieving erection',
      'Difficulty maintaining erection',
      'Reduced sexual desire'
    ],
    requiredEvidence: [
      'Diagnosis from urologist',
      'Documentation of service connection or secondary condition',
      'Treatment records',
      'Medication list'
    ],
    successTips: [
      'Often secondary to PTSD, diabetes, or medications',
      'Special monthly compensation (SMC-K) available',
      'Document impact on quality of life',
      'Include all treatments tried'
    ],
    commonRatings: [0],
    relatedConditions: ['ptsd', 'diabetes', 'depression'],
    keywords: ['ed', 'erectile', 'sexual', 'impotence']
  },
  {
    id: 'flat-feet',
    name: 'Pes Planus (Flat Feet)',
    category: 'musculoskeletal',
    description: 'A condition where the arches of the feet flatten, causing pain and alignment issues.',
    symptoms: [
      'Foot pain, especially in heel or arch',
      'Swelling along inside of ankle',
      'Feet tire easily',
      'Difficulty standing on toes',
      'Back and leg pain'
    ],
    requiredEvidence: [
      'X-rays showing flat feet',
      'Service records showing foot complaints',
      'Documentation of aggravation during service',
      'Current treatment records'
    ],
    successTips: [
      'Document how marching/running worsened condition',
      'Include impact on standing and walking',
      'Can lead to secondary knee, hip, and back claims',
      'Get custom orthotics documented'
    ],
    commonRatings: [0, 10, 30, 50],
    relatedConditions: ['plantar-fasciitis', 'knee-condition', 'back-pain'],
    keywords: ['feet', 'flat', 'arch', 'plantar', 'walking']
  },
  {
    id: 'plantar-fasciitis',
    name: 'Plantar Fasciitis',
    category: 'musculoskeletal',
    description: 'Inflammation of the tissue connecting the heel bone to the toes.',
    symptoms: [
      'Stabbing heel pain',
      'Pain worse in morning',
      'Pain after standing long periods',
      'Pain after exercise',
      'Stiffness'
    ],
    requiredEvidence: [
      'Diagnosis from podiatrist',
      'Service records showing foot problems',
      'Documentation of physical demands',
      'Treatment records'
    ],
    successTips: [
      'Document all running and marching during service',
      'Include impact on daily activities',
      'Often leads to secondary conditions',
      'Track all treatments including injections'
    ],
    commonRatings: [10, 20],
    relatedConditions: ['flat-feet', 'heel-spurs', 'knee-condition'],
    keywords: ['heel', 'foot', 'plantar', 'walking', 'running']
  },
  {
    id: 'sinusitis',
    name: 'Chronic Sinusitis',
    category: 'respiratory',
    description: 'Long-term inflammation of the sinuses causing congestion and facial pain.',
    symptoms: [
      'Nasal congestion',
      'Facial pain and pressure',
      'Reduced sense of smell',
      'Postnasal drip',
      'Headaches',
      'Frequent sinus infections'
    ],
    requiredEvidence: [
      'CT scan or imaging of sinuses',
      'Service records showing sinus issues',
      'Treatment records',
      'Documentation of antibiotic courses'
    ],
    successTips: [
      'Document frequency of infections',
      'Track antibiotic treatments',
      'Can be secondary to rhinitis or deviated septum',
      'Include impact on breathing and sleep'
    ],
    commonRatings: [0, 10, 30, 50],
    relatedConditions: ['rhinitis', 'asthma', 'sleep-apnea'],
    keywords: ['sinus', 'nose', 'congestion', 'infection', 'breathing']
  },
  {
    id: 'rhinitis',
    name: 'Allergic Rhinitis',
    category: 'respiratory',
    description: 'Inflammation of the nasal passages due to allergies.',
    symptoms: [
      'Runny or stuffy nose',
      'Sneezing',
      'Itchy nose, eyes, or throat',
      'Postnasal drip',
      'Watery eyes'
    ],
    requiredEvidence: [
      'Allergy testing results',
      'Service records showing symptoms',
      'Treatment records',
      'Documentation of environmental exposures'
    ],
    successTips: [
      'Document environmental exposures during service',
      'Often claimed with sinusitis',
      'Include all medications used',
      'Can be secondary to burn pit exposure'
    ],
    commonRatings: [10, 30],
    relatedConditions: ['sinusitis', 'asthma'],
    keywords: ['allergies', 'nose', 'sneezing', 'congestion', 'rhinitis']
  },
  {
    id: 'scars',
    name: 'Scars (Disfigurement)',
    category: 'skin',
    description: 'Permanent marks on the skin from injuries, surgeries, or burns during service.',
    symptoms: [
      'Visible scarring',
      'Pain or tenderness at scar site',
      'Limited movement if over joint',
      'Numbness around scar',
      'Itching'
    ],
    requiredEvidence: [
      'Photos of scars with measurements',
      'Service records documenting injury',
      'Medical records of treatment',
      'Documentation of functional limitations'
    ],
    successTips: [
      'Document size, location, and characteristics',
      'Painful scars rated separately from disfigurement',
      'Include impact on movement if applicable',
      'Head/face scars rated on disfigurement scale'
    ],
    commonRatings: [10, 20, 30],
    relatedConditions: [],
    keywords: ['scar', 'burn', 'injury', 'disfigurement', 'skin']
  }
];

export const vaForms = [
  {
    id: '21-526ez',
    number: '21-526EZ',
    name: 'Application for Disability Compensation',
    description: 'The main form for filing a new disability claim or increasing your rating.',
    useFor: ['New claims', 'Increased ratings', 'Secondary conditions'],
    url: 'https://www.va.gov/find-forms/about-form-21-526ez/'
  },
  {
    id: '21-4138',
    number: '21-4138',
    name: 'Statement in Support of Claim',
    description: 'Use this to provide additional information or a personal statement.',
    useFor: ['Personal statements', 'Additional evidence', 'Clarifications'],
    url: 'https://www.va.gov/find-forms/about-form-21-4138/'
  },
  {
    id: '21-0781',
    number: '21-0781',
    name: 'Statement in Support of Claim for PTSD',
    description: 'Required form for PTSD claims to document stressor events.',
    useFor: ['PTSD claims', 'Stressor documentation'],
    url: 'https://www.va.gov/find-forms/about-form-21-0781/'
  },
  {
    id: '21-0781a',
    number: '21-0781a',
    name: 'Statement in Support of Claim for PTSD Secondary to Personal Assault',
    description: 'For PTSD claims based on military sexual trauma or personal assault.',
    useFor: ['MST claims', 'Personal assault PTSD'],
    url: 'https://www.va.gov/find-forms/about-form-21-0781a/'
  },
  {
    id: '21-4142',
    number: '21-4142',
    name: 'Authorization to Disclose Information',
    description: 'Allows VA to request your private medical records.',
    useFor: ['Private medical records', 'Treatment history'],
    url: 'https://www.va.gov/find-forms/about-form-21-4142/'
  },
  {
    id: '21-4142a',
    number: '21-4142a',
    name: 'General Release for Medical Provider Information',
    description: 'Companion form to 21-4142 for medical record release.',
    useFor: ['Medical records release', 'Provider authorization'],
    url: 'https://www.va.gov/find-forms/about-form-21-4142a/'
  },
  {
    id: '21-686c',
    number: '21-686c',
    name: 'Declaration of Status of Dependents',
    description: 'Add dependents to your benefits for additional compensation.',
    useFor: ['Adding spouse', 'Adding children', 'Dependent benefits'],
    url: 'https://www.va.gov/find-forms/about-form-21-686c/'
  },
  {
    id: '20-0995',
    number: '20-0995',
    name: 'Supplemental Claim',
    description: 'File new evidence for a previously denied claim.',
    useFor: ['Denied claims', 'New evidence submission'],
    url: 'https://www.va.gov/find-forms/about-form-20-0995/'
  },
  {
    id: '20-0996',
    number: '20-0996',
    name: 'Higher-Level Review',
    description: 'Request a senior reviewer to look at your denied claim.',
    useFor: ['Appeals', 'Review requests', 'Denied claims'],
    url: 'https://www.va.gov/find-forms/about-form-20-0996/'
  },
  {
    id: '10182',
    number: '10182',
    name: 'Board Appeal (Notice of Disagreement)',
    description: 'Appeal your claim to the Board of Veterans Appeals.',
    useFor: ['Board appeals', 'Formal disagreement'],
    url: 'https://www.va.gov/find-forms/about-form-10182/'
  },
  {
    id: '21-22',
    number: '21-22',
    name: 'Appointment of Veterans Service Organization',
    description: 'Appoint a VSO to represent you in your claim.',
    useFor: ['VSO representation', 'Claim assistance'],
    url: 'https://www.va.gov/find-forms/about-form-21-22/'
  },
  {
    id: '21-22a',
    number: '21-22a',
    name: 'Appointment of Individual as Claimant\'s Representative',
    description: 'Appoint an attorney or claims agent to represent you.',
    useFor: ['Attorney representation', 'Claims agent'],
    url: 'https://www.va.gov/find-forms/about-form-21-22a/'
  }
];

export const ratingCalculator = {
  // VA Combined Ratings Table logic
  combineRatings: (ratings: number[]): number => {
    if (ratings.length === 0) return 0;
    if (ratings.length === 1) return ratings[0];
    
    // Sort ratings from highest to lowest
    const sorted = [...ratings].sort((a, b) => b - a);
    
    let combined = sorted[0];
    for (let i = 1; i < sorted.length; i++) {
      const remaining = 100 - combined;
      combined = combined + (remaining * sorted[i] / 100);
    }
    
    // Round to nearest 10
    return Math.round(combined / 10) * 10;
  }
};
