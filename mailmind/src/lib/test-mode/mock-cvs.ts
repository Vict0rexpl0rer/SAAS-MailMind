/**
 * =============================================================================
 * DONNÉES DE CV FICTIFS - MODE TEST
 * =============================================================================
 *
 * Ces données simulent les informations extraites des CV par l'IA.
 * Utilisées pour tester l'extraction sans vraie API OpenAI.
 *
 * Profils variés :
 * - Juniors et seniors
 * - Tech, marketing, finance, design
 * - Formats différents (structuré, moins structuré)
 *
 * =============================================================================
 */

import { Candidate, ExperienceLevel } from '@/types'

/**
 * Interface pour les données brutes d'un CV (avant conversion en Candidate)
 */
export interface MockCVData {
  /** Identifiant du CV */
  id: string
  /** Nom du fichier PDF */
  fileName: string
  /** Email associé (pour matcher avec les emails de test) */
  associatedEmailId: string

  // Informations personnelles
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  linkedinUrl?: string
  portfolioUrl?: string

  // Informations professionnelles
  currentPosition: string
  targetPosition?: string
  experienceLevel: ExperienceLevel
  yearsOfExperience: number

  // Compétences
  skills: string[]
  languages: { language: string; level: string }[]
  certifications?: string[]

  // Expériences professionnelles
  experiences: {
    company: string
    position: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
    achievements?: string[]
  }[]

  // Formation
  education: {
    school: string
    degree: string
    field: string
    startYear: number
    endYear: number
    description?: string
  }[]

  // Synthèse IA
  aiSummary: string
  strengths: string[]
  weaknesses?: string[]
  matchScore: number
  salaryExpectation?: string
  availability?: string
  remotePreference?: 'full' | 'hybrid' | 'office'

  // Métadonnées
  extractedAt: Date
  extractionConfidence: number
}

/**
 * =============================================================================
 * CV 1 : MARIE DUPONT - Développeuse Full Stack (Mid-level)
 * =============================================================================
 */
const cvMarieDupont: MockCVData = {
  id: 'cv-marie-dupont',
  fileName: 'CV_Marie_Dupont.pdf',
  associatedEmailId: 'cv-001',

  firstName: 'Marie',
  lastName: 'Dupont',
  email: 'marie.dupont@gmail.com',
  phone: '+33 6 12 34 56 78',
  location: 'Paris, France',
  linkedinUrl: 'linkedin.com/in/marie-dupont-dev',
  portfolioUrl: 'github.com/mariedupont',

  currentPosition: 'Développeuse Full Stack',
  targetPosition: 'Lead Developer',
  experienceLevel: 'mid',
  yearsOfExperience: 4,

  skills: [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Express',
    'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git',
    'Tailwind CSS', 'GraphQL', 'Jest', 'CI/CD'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant (C1)' },
    { language: 'Espagnol', level: 'Intermédiaire (B1)' }
  ],
  certifications: [
    'AWS Cloud Practitioner',
    'MongoDB Developer Associate'
  ],

  experiences: [
    {
      company: 'TechStartup SAS',
      position: 'Développeuse Full Stack',
      startDate: '2022-01',
      current: true,
      description: 'Développement de la plateforme SaaS B2B en React/Node.js',
      achievements: [
        'Refonte complète du frontend (React 18, TypeScript)',
        'Mise en place de tests automatisés (+80% coverage)',
        'Optimisation des performances (-40% temps de chargement)',
        'Mentoring de 2 développeurs juniors'
      ]
    },
    {
      company: 'AgenceWeb Paris',
      position: 'Développeuse Frontend',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: 'Développement de sites web et applications pour des clients variés',
      achievements: [
        'Création de 15+ sites clients (e-commerce, corporate)',
        'Migration de projets jQuery vers React',
        'Mise en place du design system interne'
      ]
    },
    {
      company: 'E-commerce Corp',
      position: 'Développeuse Junior',
      startDate: '2019-09',
      endDate: '2020-05',
      current: false,
      description: 'Stage puis CDI - Développement de fonctionnalités e-commerce',
      achievements: [
        'Développement du nouveau panier d\'achat',
        'Intégration Stripe pour les paiements'
      ]
    }
  ],

  education: [
    {
      school: 'Université Paris-Saclay',
      degree: 'Master',
      field: 'Informatique - Spécialité Génie Logiciel',
      startYear: 2017,
      endYear: 2019,
      description: 'Mention Bien - Mémoire sur les architectures microservices'
    },
    {
      school: 'IUT Orsay',
      degree: 'DUT',
      field: 'Informatique',
      startYear: 2015,
      endYear: 2017
    }
  ],

  aiSummary: 'Développeuse Full Stack polyvalente avec 4 ans d\'expérience solide. Expertise reconnue en React/Node.js avec des projets SaaS B2B en production. Montre des capacités de leadership (mentoring) et une forte appétence pour les bonnes pratiques (tests, performance). Profil évolutif vers un rôle de Lead Developer.',
  strengths: [
    'Stack technique moderne et complète',
    'Expérience SaaS B2B',
    'Capacité de mentoring',
    'Sensibilité aux tests et à la qualité'
  ],
  weaknesses: [
    'Peu d\'expérience en architecture système',
    'Pas encore d\'expérience de management formel'
  ],
  matchScore: 92,
  salaryExpectation: '50-55K€',
  availability: 'Préavis 2 mois',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 95
}

/**
 * =============================================================================
 * CV 2 : THOMAS BERNARD - Chef de Projet Digital (Senior)
 * =============================================================================
 */
const cvThomasBernard: MockCVData = {
  id: 'cv-thomas-bernard',
  fileName: 'Thomas_Bernard_CV_2024.pdf',
  associatedEmailId: 'cv-002',

  firstName: 'Thomas',
  lastName: 'Bernard',
  email: 'thomas.bernard@outlook.com',
  phone: '+33 6 98 76 54 32',
  location: 'Lyon, France',
  linkedinUrl: 'linkedin.com/in/thomas-bernard-pm',

  currentPosition: 'Chef de Projet Digital Senior',
  experienceLevel: 'senior',
  yearsOfExperience: 8,

  skills: [
    'Gestion de projet', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence',
    'Management d\'équipe', 'Budget', 'Planning', 'Communication',
    'Négociation', 'Stakeholder Management', 'SAFe', 'Prince2'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Bilingue' },
    { language: 'Allemand', level: 'Intermédiaire (B2)' }
  ],
  certifications: [
    'PMP (Project Management Professional)',
    'Scrum Master Certified (PSM I)',
    'SAFe 5 Practitioner'
  ],

  experiences: [
    {
      company: 'Digital Agency Group',
      position: 'Chef de Projet Digital Senior',
      startDate: '2020-03',
      current: true,
      description: 'Pilotage de projets digitaux complexes (web, mobile, data)',
      achievements: [
        'Gestion de portefeuille de 2M€ annuel',
        'Management d\'équipes pluridisciplinaires (12 personnes)',
        'Taux de satisfaction client de 95%',
        'Mise en place du framework SAFe au niveau département'
      ]
    },
    {
      company: 'Groupe Média International',
      position: 'Chef de Projet',
      startDate: '2017-09',
      endDate: '2020-02',
      current: false,
      description: 'Gestion de projets de transformation digitale',
      achievements: [
        'Refonte du site média (2M visiteurs/mois)',
        'Lancement d\'une application mobile (500K téléchargements)',
        'Transition agile de l\'équipe (15 personnes)'
      ]
    },
    {
      company: 'Startup Innovation',
      position: 'Product Owner',
      startDate: '2015-06',
      endDate: '2017-08',
      current: false,
      description: 'Définition et priorisation du backlog produit',
      achievements: [
        'Lancement de la V2 du produit',
        'Croissance de 200% des utilisateurs'
      ]
    }
  ],

  education: [
    {
      school: 'EM Lyon Business School',
      degree: 'Master',
      field: 'Management des Systèmes d\'Information',
      startYear: 2013,
      endYear: 2015,
      description: 'Spécialisation Digital Business'
    },
    {
      school: 'Université Lyon 2',
      degree: 'Licence',
      field: 'Économie et Gestion',
      startYear: 2010,
      endYear: 2013
    }
  ],

  aiSummary: 'Chef de projet digital senior avec 8 ans d\'expérience et une double expertise technique/business. Certifié PMP et Scrum Master, il a démontré sa capacité à gérer des projets complexes et des équipes importantes. Son expérience en agence et en startup lui confère une grande adaptabilité.',
  strengths: [
    'Expérience projet conséquente (8 ans)',
    'Certifications reconnues (PMP, Scrum, SAFe)',
    'Double compétence technique/gestion',
    'Management d\'équipes pluridisciplinaires'
  ],
  weaknesses: [
    'Moins hands-on sur le technique',
    'Prétentions salariales potentiellement élevées'
  ],
  matchScore: 88,
  salaryExpectation: '65-75K€',
  availability: 'Immédiat',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 94
}

/**
 * =============================================================================
 * CV 3 : LUCAS PETIT - Développeur Backend Junior (Stage)
 * =============================================================================
 */
const cvLucasPetit: MockCVData = {
  id: 'cv-lucas-petit',
  fileName: 'CV_Lucas_Petit.pdf',
  associatedEmailId: 'cv-004',

  firstName: 'Lucas',
  lastName: 'Petit',
  email: 'lucas.petit@yahoo.fr',
  phone: '+33 6 11 22 33 44',
  location: 'Toulouse, France',
  linkedinUrl: 'linkedin.com/in/lucas-petit',
  portfolioUrl: 'github.com/lucaspetit',

  currentPosition: 'Étudiant en école d\'ingénieur',
  targetPosition: 'Développeur Backend',
  experienceLevel: 'junior',
  yearsOfExperience: 0,

  skills: [
    'Python', 'Django', 'FastAPI', 'Flask',
    'PostgreSQL', 'MongoDB', 'Redis',
    'Git', 'Linux', 'Docker',
    'REST API', 'Tests unitaires'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant (B2)' }
  ],

  experiences: [
    {
      company: 'Startup Tech Bordeaux',
      position: 'Développeur Backend (Stage)',
      startDate: '2024-06',
      endDate: '2024-08',
      current: false,
      description: 'Stage de 3 mois - Développement d\'APIs REST',
      achievements: [
        'Développement d\'une API de gestion des utilisateurs',
        'Mise en place de tests automatisés (pytest)',
        'Documentation technique avec Swagger'
      ]
    },
    {
      company: 'Projet Personnel',
      position: 'Contributeur Open Source',
      startDate: '2023-01',
      current: true,
      description: 'Contributions à des projets Python open source',
      achievements: [
        'Contribution à Django REST Framework',
        'Création d\'une bibliothèque Python (200 stars GitHub)',
        '15+ pull requests acceptées'
      ]
    }
  ],

  education: [
    {
      school: 'ENSEIRB-MATMECA',
      degree: 'Diplôme d\'ingénieur',
      field: 'Informatique',
      startYear: 2022,
      endYear: 2025,
      description: 'Spécialisation systèmes distribués - En cours'
    },
    {
      school: 'Lycée Pierre de Fermat',
      degree: 'Classes Préparatoires',
      field: 'MPSI/MP',
      startYear: 2020,
      endYear: 2022
    }
  ],

  aiSummary: 'Étudiant en dernière année d\'école d\'ingénieur avec un profil backend prometteur. Passionné par Python et l\'open source, il montre une vraie maturité technique malgré son jeune âge. Ses contributions GitHub témoignent de son autonomie et de sa motivation.',
  strengths: [
    'Forte motivation et passion pour le code',
    'Contributions open source (preuve d\'autonomie)',
    'Bonne formation théorique (école d\'ingénieur)',
    'Spécialisation backend claire'
  ],
  weaknesses: [
    'Peu d\'expérience professionnelle',
    'Pas d\'expérience en environnement production complexe',
    'Uniquement Python (pas de second langage backend)'
  ],
  matchScore: 75,
  salaryExpectation: 'Gratification stage légale',
  availability: 'Février 2025',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 91
}

/**
 * =============================================================================
 * CV 4 : EMMA LEFEVRE - Data Scientist (Senior)
 * =============================================================================
 */
const cvEmmaLefevre: MockCVData = {
  id: 'cv-emma-lefevre',
  fileName: 'CV_Emma_Lefevre_DataScientist.pdf',
  associatedEmailId: 'cv-005',

  firstName: 'Emma',
  lastName: 'Lefevre',
  email: 'emma.lefevre@gmail.com',
  phone: '+33 6 77 88 99 00',
  location: 'Nantes, France',
  linkedinUrl: 'linkedin.com/in/emma-lefevre-data',

  currentPosition: 'Senior Data Scientist',
  experienceLevel: 'senior',
  yearsOfExperience: 6,

  skills: [
    'Python', 'R', 'SQL', 'Spark',
    'Machine Learning', 'Deep Learning', 'NLP',
    'TensorFlow', 'PyTorch', 'Scikit-learn',
    'Pandas', 'NumPy', 'Matplotlib',
    'AWS SageMaker', 'MLflow', 'Airflow',
    'Tableau', 'Power BI', 'Looker'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Bilingue' }
  ],
  certifications: [
    'AWS Machine Learning Specialty',
    'Google Professional Data Engineer',
    'TensorFlow Developer Certificate'
  ],

  experiences: [
    {
      company: 'FinTech Innovation',
      position: 'Senior Data Scientist',
      startDate: '2021-04',
      current: true,
      description: 'Lead technique sur les projets ML de la plateforme',
      achievements: [
        'Développement du modèle de scoring crédit (AUC 0.92)',
        'Déploiement de 5 modèles en production (AWS SageMaker)',
        'Réduction de 30% des fraudes grâce au modèle de détection',
        'Mentoring de 3 data scientists juniors'
      ]
    },
    {
      company: 'HealthTech Solutions',
      position: 'Data Scientist',
      startDate: '2019-01',
      endDate: '2021-03',
      current: false,
      description: 'Analyse de données de santé et développement de modèles prédictifs',
      achievements: [
        'Modèle de prédiction de réadmission hospitalière',
        'Pipeline de données temps réel (Kafka + Spark)',
        'Visualisations pour équipe médicale'
      ]
    },
    {
      company: 'E-commerce Leader',
      position: 'Data Analyst / Junior Data Scientist',
      startDate: '2017-09',
      endDate: '2018-12',
      current: false,
      description: 'Analyses business et premiers modèles ML',
      achievements: [
        'Système de recommandation produits',
        'Analyse de cohortes et churn prediction'
      ]
    }
  ],

  education: [
    {
      school: 'CentraleSupélec',
      degree: 'Master Spécialisé',
      field: 'Big Data et Machine Learning',
      startYear: 2016,
      endYear: 2017,
      description: 'Major de promotion'
    },
    {
      school: 'École Polytechnique de Nantes',
      degree: 'Diplôme d\'ingénieur',
      field: 'Informatique et Mathématiques Appliquées',
      startYear: 2012,
      endYear: 2016
    }
  ],

  aiSummary: 'Data Scientist senior avec 6 ans d\'expérience et une expertise pointue en ML/Deep Learning. Formation d\'excellence (CentraleSupélec, Polytechnique Nantes) et certifications cloud reconnues. A démontré sa capacité à déployer des modèles en production avec impact business mesurable (fraude, scoring crédit).',
  strengths: [
    'Expertise ML/DL de haut niveau',
    'Expérience déploiement production (MLOps)',
    'Double compétence data science + engineering',
    'Certifications cloud pertinentes',
    'Impact business quantifiable'
  ],
  weaknesses: [
    'Prétentions salariales potentiellement élevées',
    'Profil très spécialisé data (moins généraliste)'
  ],
  matchScore: 98,
  salaryExpectation: '70-80K€',
  availability: '2 mois',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 97
}

/**
 * =============================================================================
 * CV 5 : SOPHIE MARTIN - UX Designer (Mid-level)
 * =============================================================================
 */
const cvSophieMartin: MockCVData = {
  id: 'cv-sophie-martin',
  fileName: 'CV_Sophie_Martin_UX.pdf',
  associatedEmailId: 'cv-003',

  firstName: 'Sophie',
  lastName: 'Martin',
  email: 'sophie.martin.pro@gmail.com',
  phone: '+33 6 55 44 33 22',
  location: 'Bordeaux, France',
  linkedinUrl: 'linkedin.com/in/sophie-martin-ux',
  portfolioUrl: 'sophiemartin.design',

  currentPosition: 'UX Designer Senior',
  experienceLevel: 'mid',
  yearsOfExperience: 5,

  skills: [
    'Figma', 'Sketch', 'Adobe XD',
    'User Research', 'Usability Testing', 'A/B Testing',
    'Prototyping', 'Wireframing', 'Design System',
    'Accessibility (WCAG)', 'Information Architecture',
    'HTML/CSS', 'Framer', 'Principle'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant (C1)' }
  ],
  certifications: [
    'Google UX Design Certificate',
    'Nielsen Norman Group UX Certification'
  ],

  experiences: [
    {
      company: 'Product Studio',
      position: 'UX Designer Senior',
      startDate: '2022-03',
      current: true,
      description: 'Lead UX sur des projets B2B SaaS',
      achievements: [
        'Création du design system de l\'entreprise (50+ composants)',
        'Réduction de 40% du taux de churn grâce à l\'amélioration UX',
        'User research sur 100+ utilisateurs',
        'Formation de l\'équipe aux méthodes de design thinking'
      ]
    },
    {
      company: 'Agence Digitale Bordeaux',
      position: 'UX/UI Designer',
      startDate: '2019-09',
      endDate: '2022-02',
      current: false,
      description: 'Design d\'interfaces pour clients variés (retail, finance, santé)',
      achievements: [
        '30+ projets clients livrés',
        'Mise en place du processus UX en agence',
        'Amélioration de 25% des conversions pour un client e-commerce'
      ]
    },
    {
      company: 'Startup E-santé',
      position: 'UI Designer (Stage puis CDD)',
      startDate: '2018-02',
      endDate: '2019-08',
      current: false,
      description: 'Design d\'application mobile santé',
      achievements: [
        'Design de l\'app mobile (iOS/Android)',
        'Création de l\'identité visuelle'
      ]
    }
  ],

  education: [
    {
      school: 'École de Design Nantes Atlantique',
      degree: 'Master',
      field: 'Design d\'Interaction',
      startYear: 2016,
      endYear: 2018,
      description: 'Projet de fin d\'études : Redesign app bancaire'
    },
    {
      school: 'Université Bordeaux Montaigne',
      degree: 'Licence',
      field: 'Arts Plastiques',
      startYear: 2013,
      endYear: 2016
    }
  ],

  aiSummary: 'UX Designer avec 5 ans d\'expérience et une sensibilité forte à l\'utilisateur. Portfolio impressionnant avec des résultats mesurables (conversion, churn). Expérience en création de design system et en user research approfondie. Profil créatif avec une bonne compréhension business.',
  strengths: [
    'Portfolio de qualité avec résultats quantifiés',
    'Expérience design system',
    'Forte compétence en user research',
    'Sensibilité accessibilité (WCAG)',
    'Double culture agence/produit'
  ],
  weaknesses: [
    'Compétences code limitées (HTML/CSS basique)',
    'Pas d\'expérience en grande entreprise'
  ],
  matchScore: 95,
  salaryExpectation: '48-55K€',
  availability: '1 mois',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 93
}

/**
 * =============================================================================
 * CV 6 : PIERRE GARNIER - DevOps Engineer (Senior)
 * =============================================================================
 */
const cvPierreGarnier: MockCVData = {
  id: 'cv-pierre-garnier',
  fileName: 'CV_Pierre_Garnier_DevOps.pdf',
  associatedEmailId: 'cv-009',

  firstName: 'Pierre',
  lastName: 'Garnier',
  email: 'p.garnier@gmail.com',
  phone: '+33 6 22 33 44 55',
  location: 'Remote / France',
  linkedinUrl: 'linkedin.com/in/pierre-garnier-devops',

  currentPosition: 'Senior DevOps Engineer',
  experienceLevel: 'senior',
  yearsOfExperience: 5,

  skills: [
    'Kubernetes', 'Docker', 'Terraform', 'Pulumi',
    'AWS', 'GCP', 'Azure',
    'CI/CD', 'GitHub Actions', 'GitLab CI', 'Jenkins',
    'Prometheus', 'Grafana', 'DataDog', 'ELK Stack',
    'Python', 'Bash', 'Go',
    'ArgoCD', 'Helm', 'Istio'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant (C1)' }
  ],
  certifications: [
    'AWS Solutions Architect Professional',
    'Certified Kubernetes Administrator (CKA)',
    'HashiCorp Terraform Associate',
    'Google Cloud Professional DevOps Engineer'
  ],

  experiences: [
    {
      company: 'Scale-up Tech',
      position: 'Senior DevOps Engineer',
      startDate: '2022-01',
      current: true,
      description: 'Lead technique infrastructure cloud et CI/CD',
      achievements: [
        'Migration vers Kubernetes (de 0 à 100+ microservices)',
        'Réduction de 60% des coûts cloud (optimisation AWS)',
        'Mise en place observabilité complète (Prometheus/Grafana/DataDog)',
        'Temps de déploiement réduit de 30min à 5min'
      ]
    },
    {
      company: 'Grande Entreprise IT',
      position: 'DevOps Engineer',
      startDate: '2019-09',
      endDate: '2021-12',
      current: false,
      description: 'Automatisation et déploiement continu',
      achievements: [
        'Pipeline CI/CD pour 50+ applications',
        'Infrastructure as Code avec Terraform',
        'Migration de Jenkins vers GitLab CI'
      ]
    },
    {
      company: 'SSII Régionale',
      position: 'Administrateur Système',
      startDate: '2018-06',
      endDate: '2019-08',
      current: false,
      description: 'Administration serveurs et premiers pas DevOps',
      achievements: [
        'Migration vers le cloud AWS',
        'Premiers scripts d\'automatisation'
      ]
    }
  ],

  education: [
    {
      school: 'EPITA',
      degree: 'Diplôme d\'ingénieur',
      field: 'Systèmes, Réseaux et Sécurité',
      startYear: 2013,
      endYear: 2018
    }
  ],

  aiSummary: 'DevOps Engineer senior avec 5 ans d\'expérience et de nombreuses certifications cloud. Expert Kubernetes et Infrastructure as Code, il a démontré sa capacité à gérer des migrations complexes avec des résultats mesurables (coûts, temps de déploiement). Profil très recherché sur le marché.',
  strengths: [
    'Certifications cloud multiples et reconnues',
    'Expertise Kubernetes avancée',
    'Résultats quantifiables (60% réduction coûts)',
    'Expérience scale-up et grande entreprise'
  ],
  weaknesses: [
    'Prétentions salariales élevées pour ce profil',
    'Peu d\'expérience en management d\'équipe'
  ],
  matchScore: 93,
  salaryExpectation: '65-75K€',
  availability: '2 mois',
  remotePreference: 'full',

  extractedAt: new Date(),
  extractionConfidence: 96
}

/**
 * =============================================================================
 * CV 7 : CAMILLE DURAND - Développeur React Senior
 * =============================================================================
 */
const cvCamilleDurand: MockCVData = {
  id: 'cv-camille-durand',
  fileName: 'Camille_Durand_CV.pdf',
  associatedEmailId: 'cv-008',

  firstName: 'Camille',
  lastName: 'Durand',
  email: 'camille.durand@live.fr',
  phone: '+33 6 33 44 55 66',
  location: 'Paris, France',
  linkedinUrl: 'linkedin.com/in/camille-durand-react',
  portfolioUrl: 'github.com/camilledurand',

  currentPosition: 'Senior Frontend Developer',
  experienceLevel: 'senior',
  yearsOfExperience: 7,

  skills: [
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'Redux', 'Zustand', 'React Query',
    'Testing Library', 'Jest', 'Cypress', 'Playwright',
    'Tailwind CSS', 'Styled Components', 'CSS-in-JS',
    'Performance', 'Web Vitals', 'Accessibility',
    'Node.js', 'GraphQL', 'REST API'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant (C1)' }
  ],
  certifications: [
    'React Certification - Meta',
    'Web Performance - Google'
  ],

  experiences: [
    {
      company: 'Unicorn StartupParis',
      position: 'Senior Frontend Developer',
      startDate: '2021-03',
      current: true,
      description: 'Lead technique frontend sur le produit principal',
      achievements: [
        'Architecture frontend de la V3 du produit (Next.js 14)',
        'Amélioration des Web Vitals (LCP -50%, CLS -80%)',
        'Mise en place testing strategy (90%+ coverage)',
        'Mentoring de 4 développeurs frontend'
      ]
    },
    {
      company: 'Média Digital',
      position: 'Frontend Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description: 'Développement du site média et des applications',
      achievements: [
        'Refonte complète en React (migration depuis jQuery)',
        'Application mobile React Native',
        'Performance optimization (temps de chargement -60%)'
      ]
    },
    {
      company: 'Web Agency Premium',
      position: 'Développeur Web',
      startDate: '2016-09',
      endDate: '2018-05',
      current: false,
      description: 'Développement de sites clients haut de gamme',
      achievements: [
        'Sites pour marques de luxe',
        'Animations et interactions avancées',
        'Premiers projets React'
      ]
    }
  ],

  education: [
    {
      school: 'HETIC',
      degree: 'Bachelor',
      field: 'Web Development',
      startYear: 2013,
      endYear: 2016,
      description: 'Formation pratique orientée projet'
    }
  ],

  aiSummary: 'Développeur React senior avec 7 ans d\'expérience et une expertise pointue en performance frontend. A travaillé dans une licorne parisienne avec des résultats mesurables sur les Web Vitals. Bon équilibre entre leadership technique (mentoring) et expertise hands-on.',
  strengths: [
    'Expertise React/Next.js de haut niveau',
    'Focus performance et qualité',
    'Expérience scale-up/licorne',
    'Capacité de mentoring',
    '7 ans d\'expérience solide'
  ],
  weaknesses: [
    'Formation non-conventionnelle (pas école d\'ingénieur)',
    'Moins d\'expérience backend'
  ],
  matchScore: 96,
  salaryExpectation: '60-70K€',
  availability: 'Préavis 2 mois négociable à 1 mois',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 95
}

/**
 * =============================================================================
 * CV 8 : CLARA FONTAINE - Designer Produit (Junior/Stage)
 * =============================================================================
 */
const cvClaraFontaine: MockCVData = {
  id: 'cv-clara-fontaine',
  fileName: 'CV_Clara_Fontaine.pdf',
  associatedEmailId: 'cv-012',

  firstName: 'Clara',
  lastName: 'Fontaine',
  email: 'clara.fontaine@icloud.com',
  phone: '+33 6 44 55 66 77',
  location: 'Paris, France',
  linkedinUrl: 'linkedin.com/in/clara-fontaine-design',
  portfolioUrl: 'clarafontaine.com',

  currentPosition: 'Étudiante en Design Produit',
  targetPosition: 'Product Designer',
  experienceLevel: 'junior',
  yearsOfExperience: 0,

  skills: [
    'Figma', 'Sketch', 'Adobe Creative Suite',
    'Design Thinking', 'User Research',
    'Prototyping', '3D Modeling', 'Blender',
    'HTML/CSS', 'Framer',
    'Design Sprint', 'Workshop Facilitation'
  ],
  languages: [
    { language: 'Français', level: 'Natif' },
    { language: 'Anglais', level: 'Courant (B2)' },
    { language: 'Italien', level: 'Intermédiaire (B1)' }
  ],

  experiences: [
    {
      company: 'Studio Design Paris',
      position: 'Designer Produit (Stage)',
      startDate: '2024-04',
      endDate: '2024-08',
      current: false,
      description: 'Stage de 5 mois en design produit',
      achievements: [
        'Redesign d\'une application mobile fintech',
        'User testing avec 20 utilisateurs',
        'Création de prototypes interactifs'
      ]
    },
    {
      company: 'Projet École',
      position: 'Lead Designer',
      startDate: '2023-09',
      endDate: '2024-03',
      current: false,
      description: 'Projet de fin d\'études en équipe de 5',
      achievements: [
        'Design d\'un service de mobilité urbaine',
        'Prix du meilleur projet innovation',
        'Présentation devant jury professionnel'
      ]
    }
  ],

  education: [
    {
      school: 'Strate School of Design',
      degree: 'Master',
      field: 'Design Produit & Interaction',
      startYear: 2020,
      endYear: 2025,
      description: 'En cours - Spécialisation design numérique'
    },
    {
      school: 'Manaa LISAA',
      degree: 'Année préparatoire',
      field: 'Arts Appliqués',
      startYear: 2019,
      endYear: 2020
    }
  ],

  aiSummary: 'Étudiante en dernière année à Strate School of Design avec un profil polyvalent UX/UI et design industriel. Stage réussi en fintech et projet primé montrent une créativité et une rigueur prometteuses. Profil junior mais avec de bonnes bases.',
  strengths: [
    'Formation design de qualité (Strate)',
    'Double compétence digital/industriel',
    'Expérience user testing',
    'Projet primé (innovation)',
    'Portfolio créatif'
  ],
  weaknesses: [
    'Très peu d\'expérience professionnelle',
    'Pas encore diplômée',
    'Compétences techniques (code) limitées'
  ],
  matchScore: 78,
  salaryExpectation: 'Gratification stage',
  availability: 'Février 2025',
  remotePreference: 'hybrid',

  extractedAt: new Date(),
  extractionConfidence: 88
}

/**
 * =============================================================================
 * COLLECTION DE TOUS LES CVS
 * =============================================================================
 */
export const allMockCVs: MockCVData[] = [
  cvMarieDupont,
  cvThomasBernard,
  cvLucasPetit,
  cvEmmaLefevre,
  cvSophieMartin,
  cvPierreGarnier,
  cvCamilleDurand,
  cvClaraFontaine,
]

/**
 * Récupère un CV par son ID
 */
export function getMockCVById(id: string): MockCVData | undefined {
  return allMockCVs.find(cv => cv.id === id)
}

/**
 * Récupère un CV par l'ID de l'email associé
 */
export function getMockCVByEmailId(emailId: string): MockCVData | undefined {
  return allMockCVs.find(cv => cv.associatedEmailId === emailId)
}

/**
 * Récupère un CV par le nom de fichier
 */
export function getMockCVByFileName(fileName: string): MockCVData | undefined {
  return allMockCVs.find(cv => cv.fileName === fileName)
}

/**
 * Convertit un MockCVData en Candidate
 */
export function cvDataToCandidate(cvData: MockCVData, emailId?: string): Candidate {
  return {
    id: `cand-${cvData.id}`,
    firstName: cvData.firstName,
    lastName: cvData.lastName,
    email: cvData.email,
    phone: cvData.phone,
    position: cvData.targetPosition || cvData.currentPosition,
    skills: cvData.skills.slice(0, 10), // Garder les 10 premières
    experienceLevel: cvData.experienceLevel,
    yearsOfExperience: cvData.yearsOfExperience,
    location: cvData.location,
    status: 'new',
    source: 'email',
    sourceEmailId: emailId || cvData.associatedEmailId,
    cvUrl: `/uploads/cv/${cvData.fileName}`,
    cvFileName: cvData.fileName,
    aiSummary: cvData.aiSummary,
    matchScore: cvData.matchScore,
    createdAt: new Date(),
    updatedAt: new Date(),
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cvData.firstName}`,
  }
}

/**
 * Génère tous les candidats à partir des CVs
 */
export function generateMockCandidates(): Candidate[] {
  return allMockCVs.map(cv => cvDataToCandidate(cv))
}

/**
 * Stats sur les CVs de test
 */
export const mockCVStats = {
  total: allMockCVs.length,
  byExperience: {
    junior: allMockCVs.filter(cv => cv.experienceLevel === 'junior').length,
    mid: allMockCVs.filter(cv => cv.experienceLevel === 'mid').length,
    senior: allMockCVs.filter(cv => cv.experienceLevel === 'senior').length,
    lead: allMockCVs.filter(cv => cv.experienceLevel === 'lead').length,
  },
  avgMatchScore: Math.round(
    allMockCVs.reduce((sum, cv) => sum + cv.matchScore, 0) / allMockCVs.length
  ),
}
