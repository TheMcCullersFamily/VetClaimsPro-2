// C&P Exam Preparation Data

export interface ExamPrep {
  conditionType: string;
  conditionIds: string[];
  whatToExpect: string[];
  examDuration: string;
  examinerType: string;
  commonQuestions: {
    question: string;
    tip: string;
    exampleAnswer: string;
  }[];
  worstDayTips: string[];
  documentsTooBring: string[];
  dbqInfo: {
    formNumber: string;
    formName: string;
    keyMeasurements: string[];
    ratingCriteria: string[];
  };
}

export const examPrepData: ExamPrep[] = [
  {
    conditionType: 'Mental Health (PTSD, Depression, Anxiety)',
    conditionIds: ['ptsd', 'depression', 'anxiety'],
    whatToExpect: [
      'The exam typically lasts 30-60 minutes with a psychologist or psychiatrist',
      'You\'ll be asked about your military service, traumatic events, and current symptoms',
      'The examiner will assess your mood, affect, speech, and thought processes',
      'You may be asked to complete questionnaires like the PCL-5 for PTSD',
      'The examiner will ask about your daily functioning, relationships, and work history',
      'Be prepared to discuss sensitive topics - it\'s okay to take breaks if needed',
      'The examiner will note your appearance, behavior, and demeanor throughout'
    ],
    examDuration: '30-60 minutes',
    examinerType: 'Psychologist or Psychiatrist',
    commonQuestions: [
      {
        question: 'Can you describe the traumatic event(s) you experienced during service?',
        tip: 'Be specific about dates, locations, and what happened. Include sensory details you remember.',
        exampleAnswer: 'In March 2010 in Kandahar, our convoy was hit by an IED. I was in the third vehicle. I remember the explosion, the smell of burning metal, and seeing my friend injured...'
      },
      {
        question: 'How often do you experience nightmares or flashbacks?',
        tip: 'Describe frequency (daily, weekly) and severity. Mention if they wake you up or affect your sleep.',
        exampleAnswer: 'I have nightmares 4-5 times per week. They wake me up in a cold sweat, and I can\'t go back to sleep. During the day, loud noises trigger flashbacks about 2-3 times weekly.'
      },
      {
        question: 'How do your symptoms affect your work and relationships?',
        tip: 'Be honest about limitations. Mention missed work, conflicts, isolation, or job losses.',
        exampleAnswer: 'I\'ve lost two jobs in the past year due to anger outbursts. My wife says I\'m emotionally distant. I avoid family gatherings because crowds make me anxious.'
      },
      {
        question: 'Do you have thoughts of harming yourself or others?',
        tip: 'Answer honestly. If you have these thoughts, the examiner needs to know to help you get appropriate care.',
        exampleAnswer: 'I sometimes feel like life isn\'t worth living, but I don\'t have a plan to hurt myself. I do get angry and have to remove myself from situations.'
      },
      {
        question: 'What treatments have you tried and how effective were they?',
        tip: 'List all medications, therapy types, and their effects. Mention side effects too.',
        exampleAnswer: 'I\'ve tried Sertraline, which helped somewhat but caused weight gain. I\'m currently in weekly CBT therapy which helps me manage triggers better.'
      }
    ],
    worstDayTips: [
      'Describe your worst days in detail - don\'t minimize your symptoms',
      'Mention specific incidents: panic attacks, crying spells, rage episodes',
      'Explain how bad days affect your ability to work, care for yourself, or interact with others',
      'Note the frequency of your worst days (e.g., "2-3 times per week I can\'t leave the house")',
      'Describe physical symptoms: racing heart, sweating, trembling, difficulty breathing',
      'Mention if you\'ve had to leave work early or call in sick due to symptoms',
      'Discuss any hospitalizations or crisis interventions'
    ],
    documentsTooBring: [
      'List of all current medications with dosages',
      'Names and contact info of all treating mental health providers',
      'Copies of recent therapy notes or psychiatric evaluations',
      'Personal statement describing your symptoms and their impact',
      'Buddy statements from family/friends who\'ve witnessed your symptoms',
      'Employment records showing job changes or terminations',
      'Any crisis hotline call records or ER visits for mental health'
    ],
    dbqInfo: {
      formNumber: 'DBQ Mental Disorders',
      formName: 'Initial PTSD / Review PTSD / Mental Disorders (other than PTSD and Eating Disorders)',
      keyMeasurements: [
        'Occupational and social impairment level',
        'Symptom frequency and severity',
        'GAF score (if applicable)',
        'Specific PTSD criteria (Criterion A-E)',
        'Behavioral observations during exam'
      ],
      ratingCriteria: [
        '0% - Diagnosis but symptoms controlled by medication',
        '10% - Mild symptoms with decreased work efficiency during stress',
        '30% - Occasional decrease in work efficiency with intermittent inability to perform tasks',
        '50% - Reduced reliability and productivity, difficulty with work relationships',
        '70% - Deficiencies in most areas: work, family, judgment, thinking, mood',
        '100% - Total occupational and social impairment'
      ]
    }
  },
  {
    conditionType: 'Musculoskeletal (Back, Knee, Shoulder)',
    conditionIds: ['back-pain', 'knee-condition', 'shoulder-condition', 'neck-condition'],
    whatToExpect: [
      'The exam typically lasts 20-45 minutes with an orthopedic specialist or general practitioner',
      'You\'ll undergo range of motion testing with a goniometer (measuring device)',
      'The examiner will test your joint stability, strength, and reflexes',
      'You may be asked to walk, squat, bend, or perform specific movements',
      'The examiner will look for signs of pain, guarding, or limitation',
      'X-rays or MRIs may be reviewed or ordered',
      'Repetitive motion testing (3 repetitions) is required to check for additional limitation'
    ],
    examDuration: '20-45 minutes',
    examinerType: 'Orthopedic Specialist or General Practitioner',
    commonQuestions: [
      {
        question: 'When did your pain/condition first start?',
        tip: 'Connect it to service if possible. Mention specific incidents, training, or duties.',
        exampleAnswer: 'My back pain started in 2012 after a parachute landing fall during airborne training at Fort Bragg. It\'s gotten progressively worse since then.'
      },
      {
        question: 'Describe your current pain level on a scale of 1-10.',
        tip: 'Be honest but describe your typical day AND your worst days. Don\'t just say "10" - be specific.',
        exampleAnswer: 'On a typical day, my pain is around 5-6. On bad days, which happen 2-3 times a week, it\'s an 8-9 and I can barely move.'
      },
      {
        question: 'What activities are limited by your condition?',
        tip: 'Be specific about daily activities: walking distance, sitting duration, lifting limits.',
        exampleAnswer: 'I can only walk about 100 yards before needing to rest. I can\'t sit for more than 20 minutes. I can\'t lift anything over 10 pounds without severe pain.'
      },
      {
        question: 'Do you experience flare-ups? How often and how long do they last?',
        tip: 'Document flare-up frequency, duration, and additional limitations during flares.',
        exampleAnswer: 'I have flare-ups 2-3 times per month lasting 3-5 days each. During flares, I\'m essentially bedridden and need help with basic tasks.'
      },
      {
        question: 'What treatments have you tried?',
        tip: 'List all treatments: medications, physical therapy, injections, surgeries, braces.',
        exampleAnswer: 'I\'ve tried physical therapy for 6 months, steroid injections every 3 months, daily NSAIDs, a TENS unit, and I wear a back brace daily.'
      }
    ],
    worstDayTips: [
      'Schedule your exam during a time when symptoms are typically worse (morning stiffness, etc.)',
      'Don\'t take extra pain medication before the exam - you want accurate measurements',
      'Describe what happens during flare-ups in detail',
      'Mention activities you\'ve had to give up completely',
      'Explain how pain affects your sleep, mood, and relationships',
      'Note any assistive devices you use: cane, brace, wheelchair',
      'Describe the worst pain episode you\'ve experienced and what triggered it'
    ],
    documentsTooBring: [
      'Recent X-rays, MRIs, or CT scan reports',
      'Physical therapy records and progress notes',
      'List of all pain medications with dosages and frequency',
      'Records of any surgeries or injections',
      'Work restrictions or accommodations documentation',
      'Personal pain diary if you keep one',
      'Photos of any visible deformity or swelling'
    ],
    dbqInfo: {
      formNumber: 'DBQ Back/Neck/Knee/Shoulder',
      formName: 'Back (Thoracolumbar Spine) / Neck (Cervical Spine) / Knee and Lower Leg / Shoulder and Arm',
      keyMeasurements: [
        'Range of motion in degrees (flexion, extension, rotation)',
        'Pain on motion - where it begins',
        'Additional limitation after repetitive use',
        'Functional loss during flare-ups',
        'Joint stability testing',
        'Muscle strength testing (0-5 scale)',
        'Ankylosis (frozen joint) if present'
      ],
      ratingCriteria: [
        '10% - Painful motion or slight limitation',
        '20% - Moderate limitation of motion',
        '30% - Significant limitation with functional impairment',
        '40% - Severe limitation, unfavorable ankylosis',
        '50%+ - Near complete loss of motion or ankylosis in unfavorable position'
      ]
    }
  },
  {
    conditionType: 'Hearing (Tinnitus, Hearing Loss)',
    conditionIds: ['tinnitus', 'hearing-loss'],
    whatToExpect: [
      'The exam is conducted by an audiologist in a soundproof booth',
      'You\'ll wear headphones and respond to tones at various frequencies',
      'Speech recognition testing will assess your ability to understand words',
      'The exam typically takes 30-45 minutes',
      'For tinnitus, you\'ll describe the sounds you hear and their impact',
      'The examiner will review your noise exposure history',
      'Results are plotted on an audiogram showing hearing thresholds'
    ],
    examDuration: '30-45 minutes',
    examinerType: 'Audiologist',
    commonQuestions: [
      {
        question: 'What type of noise were you exposed to during service?',
        tip: 'Be specific: weapons fire, aircraft, machinery, explosions. Mention duration and frequency.',
        exampleAnswer: 'As an infantry soldier, I was exposed to M16/M4 rifle fire, grenades, and IED explosions almost daily for 12 months in Iraq. I also worked near generators and heavy vehicles.'
      },
      {
        question: 'Describe the sounds you hear with tinnitus.',
        tip: 'Describe the type (ringing, buzzing, hissing), which ear(s), and if it\'s constant or intermittent.',
        exampleAnswer: 'I hear a constant high-pitched ringing in both ears, louder in my left ear. It never stops and gets worse in quiet environments, especially at night.'
      },
      {
        question: 'How does your hearing loss/tinnitus affect your daily life?',
        tip: 'Mention specific impacts: conversations, TV volume, sleep, concentration, social situations.',
        exampleAnswer: 'I can\'t follow conversations in restaurants. My wife gets frustrated repeating herself. The tinnitus keeps me awake at night and makes it hard to concentrate at work.'
      },
      {
        question: 'Did you use hearing protection during service?',
        tip: 'Be honest. Many veterans didn\'t have adequate protection or couldn\'t use it in combat.',
        exampleAnswer: 'We were issued foam earplugs but couldn\'t wear them during patrols because we needed to hear commands and threats. During firefights, there was no time for protection.'
      }
    ],
    worstDayTips: [
      'Describe how tinnitus affects your sleep - mention hours of sleep lost',
      'Explain difficulty in specific situations: phone calls, meetings, crowded places',
      'Mention any anxiety or depression caused by hearing issues',
      'Note if you\'ve had to change jobs or avoid social situations',
      'Describe the emotional impact: frustration, isolation, embarrassment',
      'Mention if the ringing ever gets so loud it\'s debilitating'
    ],
    documentsTooBring: [
      'Previous audiograms (military and civilian)',
      'MOS/job documentation showing noise exposure',
      'Deployment records to combat zones',
      'Statements from family about hearing difficulties',
      'Any hearing aid prescriptions or recommendations',
      'Records of ear infections or injuries'
    ],
    dbqInfo: {
      formNumber: 'DBQ Hearing Loss and Tinnitus',
      formName: 'Hearing Loss and Tinnitus',
      keyMeasurements: [
        'Pure tone thresholds at 1000, 2000, 3000, 4000 Hz',
        'Speech recognition scores (Maryland CNC test)',
        'Tinnitus presence and recurrence',
        'Impact on ordinary conditions of daily life'
      ],
      ratingCriteria: [
        'Hearing Loss: Rated 0-100% based on audiogram results using Table VI and VII',
        'Tinnitus: Maximum 10% rating for recurrent tinnitus',
        'Combined ratings possible for both conditions'
      ]
    }
  },
  {
    conditionType: 'Respiratory (Sleep Apnea, Asthma)',
    conditionIds: ['sleep-apnea', 'asthma', 'sinusitis', 'rhinitis'],
    whatToExpect: [
      'For sleep apnea: Review of sleep study results and CPAP usage',
      'For asthma: Pulmonary function tests (PFT) measuring breathing capacity',
      'The examiner will listen to your lungs and check for respiratory distress',
      'You may be asked about frequency of attacks, hospitalizations, and medications',
      'PFT involves breathing into a tube and following specific instructions',
      'The exam typically takes 30-60 minutes depending on tests needed',
      'Bring your CPAP machine or inhaler to show the examiner'
    ],
    examDuration: '30-60 minutes',
    examinerType: 'Pulmonologist or General Practitioner',
    commonQuestions: [
      {
        question: 'How often do you use your CPAP machine?',
        tip: 'Be honest about compliance. If you struggle with it, explain why.',
        exampleAnswer: 'I use my CPAP every night, about 7-8 hours. I\'ve been compliant for 2 years. Before CPAP, I was falling asleep at work and while driving.'
      },
      {
        question: 'How many asthma attacks do you have per week/month?',
        tip: 'Track your attacks before the exam. Include minor and severe episodes.',
        exampleAnswer: 'I have minor attacks requiring my rescue inhaler about 3-4 times per week. I\'ve had 2 severe attacks requiring ER visits in the past year.'
      },
      {
        question: 'What triggers your respiratory symptoms?',
        tip: 'List all triggers: exercise, allergens, weather, stress, chemicals.',
        exampleAnswer: 'My asthma is triggered by exercise, cold air, dust, and strong odors. I can\'t do yard work or be around cleaning chemicals.'
      },
      {
        question: 'How do your symptoms affect your daily activities?',
        tip: 'Describe limitations on physical activity, work, and quality of life.',
        exampleAnswer: 'I can\'t exercise or play with my kids without getting winded. I had to quit my warehouse job because I couldn\'t handle the physical demands.'
      }
    ],
    worstDayTips: [
      'For sleep apnea: Describe daytime fatigue, falling asleep inappropriately, cognitive issues',
      'For asthma: Describe severe attacks - inability to breathe, panic, ER visits',
      'Mention any hospitalizations or emergency treatments',
      'Describe how symptoms limit physical activities you used to enjoy',
      'Note the impact on work - missed days, reduced productivity, job changes',
      'Explain the anxiety of not being able to breathe'
    ],
    documentsTooBring: [
      'Sleep study (polysomnography) results',
      'CPAP compliance data from your machine',
      'Pulmonary function test results',
      'List of all respiratory medications',
      'ER visit records for respiratory emergencies',
      'Documentation of any burn pit or toxic exposure during service'
    ],
    dbqInfo: {
      formNumber: 'DBQ Respiratory / Sleep Apnea',
      formName: 'Respiratory Conditions / Sleep Apnea',
      keyMeasurements: [
        'FEV-1 (Forced Expiratory Volume)',
        'FEV-1/FVC ratio',
        'DLCO (Diffusion Capacity)',
        'Sleep study AHI (Apnea-Hypopnea Index)',
        'Oxygen saturation levels',
        'Frequency of exacerbations'
      ],
      ratingCriteria: [
        'Sleep Apnea: 0% (asymptomatic), 30% (persistent daytime hypersomnolence), 50% (requires CPAP), 100% (chronic respiratory failure)',
        'Asthma: Based on FEV-1 results and frequency of attacks/treatment'
      ]
    }
  },
  {
    conditionType: 'Neurological (TBI, Migraines, Neuropathy)',
    conditionIds: ['tbi', 'migraines', 'radiculopathy', 'neuropathy'],
    whatToExpect: [
      'For TBI: Comprehensive cognitive and neurological testing',
      'For migraines: Discussion of frequency, duration, and severity of headaches',
      'For neuropathy: Nerve conduction studies and sensory testing',
      'The examiner will test reflexes, coordination, balance, and sensation',
      'Cognitive testing may include memory, attention, and processing speed tests',
      'The exam can take 45-90 minutes depending on the condition',
      'You may be asked to perform specific tasks to assess function'
    ],
    examDuration: '45-90 minutes',
    examinerType: 'Neurologist or Neuropsychologist',
    commonQuestions: [
      {
        question: 'Describe the incident that caused your TBI.',
        tip: 'Be specific about the event: blast, fall, vehicle accident. Include loss of consciousness duration.',
        exampleAnswer: 'I was 50 meters from an IED blast in 2011. I was knocked unconscious for about 5 minutes. I had headaches, confusion, and memory problems for weeks after.'
      },
      {
        question: 'How often do you get migraines and how long do they last?',
        tip: 'Keep a headache diary before your exam. Note frequency, duration, and severity.',
        exampleAnswer: 'I get migraines 3-4 times per month. They last 1-2 days each. During a migraine, I\'m in a dark room, can\'t work, and often vomit from the pain.'
      },
      {
        question: 'Do your migraines cause you to miss work or stop activities?',
        tip: 'The term "prostrating" is key - migraines that force you to stop what you\'re doing.',
        exampleAnswer: 'Yes, every migraine is prostrating. I have to leave work, lie down in a dark room, and can\'t function until it passes. I\'ve missed about 30 work days this year.'
      },
      {
        question: 'Describe the numbness or tingling you experience.',
        tip: 'Be specific about location, frequency, and what makes it better or worse.',
        exampleAnswer: 'I have constant numbness and burning in both feet up to my ankles. It\'s worse at night and makes it hard to walk. I\'ve fallen several times because I can\'t feel my feet.'
      }
    ],
    worstDayTips: [
      'For TBI: Describe cognitive difficulties - forgetting appointments, getting lost, word-finding problems',
      'For migraines: Describe prostrating attacks in detail - complete inability to function',
      'For neuropathy: Explain how numbness affects balance, walking, and daily tasks',
      'Mention any safety concerns: falls, accidents, forgetting stove/medications',
      'Describe the impact on relationships and work performance',
      'Note any depression or anxiety caused by cognitive decline'
    ],
    documentsTooBring: [
      'Records of the initial head injury/blast exposure',
      'Neuropsychological testing results',
      'Brain imaging (CT, MRI) reports',
      'Headache diary documenting frequency and severity',
      'EMG/nerve conduction study results',
      'List of all neurological medications',
      'Statements from family about cognitive or behavioral changes'
    ],
    dbqInfo: {
      formNumber: 'DBQ TBI / Headaches / Peripheral Nerves',
      formName: 'Traumatic Brain Injury / Headaches / Peripheral Nerves',
      keyMeasurements: [
        'TBI: Facets of cognitive impairment (memory, concentration, executive function)',
        'Migraines: Frequency of prostrating attacks',
        'Neuropathy: Nerve conduction results, sensory and motor function'
      ],
      ratingCriteria: [
        'TBI: Rated on 10 facets including memory, judgment, social interaction, orientation',
        'Migraines: 0% (less frequent), 10% (characteristic prostrating attacks averaging 1/2 months), 30% (1/month), 50% (very frequent prostrating and prolonged attacks)',
        'Neuropathy: Based on severity of incomplete paralysis (mild, moderate, severe)'
      ]
    }
  }
];

export const generalExamTips = [
  {
    title: 'Before the Exam',
    tips: [
      'Review your medical records and service records before the exam',
      'Write down key dates, incidents, and symptoms you want to mention',
      'Don\'t take extra pain medication - you want accurate symptom assessment',
      'Get a good night\'s sleep (or document if you couldn\'t due to symptoms)',
      'Arrive 15 minutes early with all your documents organized',
      'Bring a family member or friend for support and to help remember details'
    ]
  },
  {
    title: 'During the Exam',
    tips: [
      'Be honest - don\'t exaggerate, but don\'t minimize either',
      'Describe your WORST days, not just average days',
      'Use specific examples and incidents to illustrate your symptoms',
      'If you don\'t understand a question, ask for clarification',
      'Take your time - it\'s okay to pause and think',
      'If a movement or test causes pain, say so immediately',
      'Don\'t try to "push through" pain during physical tests'
    ]
  },
  {
    title: 'After the Exam',
    tips: [
      'Write down everything you remember about the exam immediately',
      'Note any questions you felt were unfair or incomplete',
      'If you forgot to mention something important, submit a statement',
      'Request a copy of the exam report when it\'s available',
      'If the report contains errors, you can request a new exam'
    ]
  }
];

export const examChecklist = [
  {
    category: 'Documents to Bring',
    items: [
      'Government-issued photo ID',
      'VA appointment letter',
      'List of all current medications with dosages',
      'List of all treating doctors with contact information',
      'Copies of relevant medical records',
      'Personal statement describing your condition',
      'Buddy statements from witnesses',
      'Service records related to your condition',
      'Any assistive devices you use (brace, cane, CPAP, etc.)'
    ]
  },
  {
    category: 'Information to Know',
    items: [
      'Date your condition started or was aggravated',
      'Specific in-service events related to your condition',
      'All treatments you\'ve tried and their effectiveness',
      'How your condition affects daily activities',
      'Frequency and severity of symptoms',
      'Medications and their side effects',
      'Work limitations or job losses due to condition',
      'Impact on relationships and social life'
    ]
  },
  {
    category: 'Day of Exam',
    items: [
      'Wear comfortable, loose-fitting clothing',
      'Don\'t take extra pain medication before exam',
      'Eat a light meal (don\'t go hungry)',
      'Arrive 15 minutes early',
      'Turn off cell phone during exam',
      'Bring water and any needed snacks',
      'Have transportation arranged (you may be tired after)'
    ]
  }
];

export const dbqVideos = [
  {
    id: 'mental-health-dbq',
    title: 'Understanding the Mental Health DBQ',
    description: 'Learn how examiners evaluate PTSD, depression, and anxiety using the mental disorders DBQ.',
    duration: '12:34',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765053566012_e4652791.jpg',
    topics: [
      'Occupational and social impairment levels',
      'How symptoms are rated',
      'What examiners look for',
      'Common mistakes to avoid'
    ]
  },
  {
    id: 'musculoskeletal-dbq',
    title: 'Range of Motion Testing Explained',
    description: 'Understand how back, knee, and shoulder conditions are measured and rated.',
    duration: '15:22',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765053566012_e4652791.jpg',
    topics: [
      'How range of motion is measured',
      'Pain on motion documentation',
      'Flare-up considerations',
      'Repetitive use testing'
    ]
  },
  {
    id: 'hearing-dbq',
    title: 'Audiogram Results & Hearing Ratings',
    description: 'How your hearing test results translate to VA disability ratings.',
    duration: '8:45',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765053566012_e4652791.jpg',
    topics: [
      'Reading your audiogram',
      'Speech recognition scores',
      'How ratings are calculated',
      'Tinnitus rating criteria'
    ]
  },
  {
    id: 'respiratory-dbq',
    title: 'Pulmonary Function Tests & Sleep Studies',
    description: 'Understanding respiratory condition evaluations and sleep apnea ratings.',
    duration: '11:18',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765053566012_e4652791.jpg',
    topics: [
      'FEV-1 and what it means',
      'Sleep study interpretation',
      'CPAP compliance requirements',
      'Rating criteria explained'
    ]
  },
  {
    id: 'neurological-dbq',
    title: 'TBI & Migraine Evaluations',
    description: 'How traumatic brain injuries and chronic headaches are assessed.',
    duration: '14:07',
    thumbnail: 'https://d64gsuwffb70l.cloudfront.net/69348ef3cb175ba60fb536d9_1765053566012_e4652791.jpg',
    topics: [
      'TBI facets explained',
      'Prostrating migraine criteria',
      'Cognitive testing overview',
      'Documentation requirements'
    ]
  }
];
