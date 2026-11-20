// Single source of truth. Every value here comes from the source portfolio PDF:
// "M. Mohamed Harun Rasheed Baik | Professional Portfolio".

export const person = {
  name: 'M. Mohamed Harun Rasheed Baik',
  shortName: 'Harun Rasheed Baik',
  initials: 'MH',
  roles: [
    'Area Service Manager',
    'Territory Service Manager',
    'After-Sales Service',
    'Dealer Development',
  ],
  location: 'Dindigul, Tamil Nadu',
  phone: '+91 8248454718',
  phoneHref: 'tel:+918248454718',
  email: 'harunbaik1998@gmail.com',
  resume: '/M-Mohamed-Harun-Rasheed-Baik-Portfolio.pdf',
  profile:
    'Automotive after-sales professional with 8+ years of motorcycle dealership experience and hands-on exposure across end-to-end dealership operations, including billing, Service Advisor activities, sales, workshop coordination, warranty, customer complaints, free-service follow-up, customer retention and team development.',
  objective:
    'Seeking an Area Service Manager / Territory Service Manager / After-Sales Service / Dealer Development role, applying practical dealership operations experience, dealer coordination, warranty handling, customer retention and team support.',
};

/**
 * The two photos this site uses — nothing else carries an image.
 *   banner  16:9, subject right, clear space on the left for the name
 *   avatar  1:1, headshot for the dealership card
 */
export const photos = {
  banner: {
    src: '/banner.webp',
    alt: 'M. Mohamed Harun Rasheed Baik',
  },
  avatar: {
    src: '/avatar.webp',
    alt: 'M. Mohamed Harun Rasheed Baik',
  },
};

export const stats = [
  { value: 8, suffix: '+', label: 'Years of dealership experience' },
  { value: 3, display: '1 + 2', label: 'Main dealer + sub-dealers' },
  { value: 20, prefix: '~', label: 'Warranty claims per month' },
  { value: 10, prefix: '~', label: 'Staff / technicians supported' },
];

export const capabilities = [
  {
    icon: 'network',
    title: 'Dealer network coordination',
    body: 'Coordinate service operations across 1 Main Dealer and 2 Sub-Dealers; monitor service inflow, deliveries, manpower, outlet visits and corrective actions.',
  },
  {
    icon: 'wrench',
    title: 'Service operations',
    body: 'Monitor service performance, customer issues, workshop coordination, inflow, delivery and operational follow-up.',
  },
  {
    icon: 'shield',
    title: 'Warranty administration',
    body: 'Handle approximately 20 claims per month, including SMIPL Suzuki and external claims; support defect assessment, documentation and follow-up.',
  },
  {
    icon: 'retention',
    title: 'Customer retention',
    body: 'Coordinate free-service follow-up lists, customer calling guidance for CRE staff, mobile service and customer follow-up.',
  },
  {
    icon: 'team',
    title: 'Training & team support',
    body: 'Provide process guidance to Billing staff and Service Advisors; support Sales-team training and approximately 10 staff / technicians.',
  },
  {
    icon: 'programme',
    title: 'Additional programmes',
    body: 'Coordinate Extended Warranty, AMC, RSI / Roadside Assistance, technical campaigns, service events and customer / marketing coordination.',
  },
  {
    icon: 'systems',
    title: 'Systems & reporting',
    body: 'Use Suzuki DMS, JPS, CRM, CSS and CS&SR for tracking, reporting and follow-up.',
  },
];

export const experience = [
  {
    company: 'Dindigul Suzuki — V V R Motors Pvt Ltd',
    role: 'Dealership Operations — Sales & Service',
    period: '2018 — Present',
    place: 'Dindigul, Tamil Nadu',
    current: true,
    points: [
      'Progressed through Billing, Service Advisor and Sales Executive responsibilities, gaining hands-on knowledge of dealership operations.',
      'Coordinate service operations across 1 Main Dealer and 2 Sub-Dealers, monitoring service performance, manpower, customer issues, inflow and delivery.',
      'Prepare free-service follow-up lists across outlets, share customer calling lists and process guidance with CRE staff, and monitor follow-up activity.',
      'Coordinate Extended Warranty, AMC and RSI / Roadside Assistance activities and related customer / service follow-up.',
      'Visit outlets and coordinate corrective actions for customer complaints, repeated issues and process gaps.',
      'Provide training and guidance to Billing staff and Service Advisors; support Sales-team process guidance and customer-engagement activities.',
      'Coordinate technical campaigns and service events; use CSS / CS&SR, Suzuki DMS, JPS and CRM for tracking, reporting and follow-up.',
      'Support technical query resolution, troubleshooting, mobile service, job coordination and spare-parts availability follow-up.',
    ],
  },
  {
    company: 'Vivo Mobile India Ltd',
    role: 'Customer-facing & Operational Responsibilities',
    period: '2016 — 2017',
    place: '',
    current: false,
    points: [],
  },
];

export const skillGroups = [
  {
    title: 'Automotive / Service',
    items: [
      'Service Operations',
      'Workshop Coordination',
      'Service Advisor Activities',
      'Technical Query Resolution',
      'Mobile Service',
    ],
  },
  {
    title: 'Dealer Network / Reporting',
    items: [
      'Main Dealer and Sub-Dealer Coordination',
      'Dealer Service Support',
      'Outlet Visits',
      'Inflow & Delivery Monitoring',
      'Performance Reporting',
      'Operational Issue Tracking',
    ],
  },
  {
    title: 'Warranty',
    items: [
      'SMIPL Suzuki Warranty Claims',
      'External Warranty Claims',
      'Warranty Part Inspection',
      'Manufacturing Defect Assessment',
      'Claim Documentation & Follow-up',
    ],
  },
  {
    title: 'Customer / Retention',
    items: [
      'Free Service Follow-up',
      'Customer Complaint Monitoring',
      'Root-Cause Identification',
      'Customer Satisfaction',
      'CSS',
      'CS&SR',
    ],
  },
  {
    title: 'Training & Team Development',
    items: [
      'Billing Staff Training',
      'Service Advisor Training',
      'Sales Team Training',
      'Technician Support',
      'Staff Mentoring',
      'Service Process Guidance',
    ],
  },
  {
    title: 'Additional Operations',
    items: [
      'Extended Warranty',
      'AMC',
      'RSI / Roadside Assistance',
      'Technical Campaigns',
      'Service Events',
      'Marketing / Customer Engagement Coordination',
    ],
  },
  {
    title: 'Systems',
    items: ['Suzuki DMS', 'JPS Online Forecasting', 'CRM', 'CSS', 'CS&SR'],
  },
  {
    title: 'Spare Parts',
    items: [
      'Spare Parts Management',
      'Parts Availability Monitoring',
      'Inventory Coordination',
      'Parts-Delay Follow-up',
    ],
  },
];

export const education = [
  {
    degree: 'B.E. Mechanical Engineering',
    institute: 'RVS College of Engineering and Technology, Anna University',
    score: '7.8 CGPA',
  },
  {
    degree: 'Diploma in Mechanical Engineering',
    institute: 'NPR Polytechnic College',
    score: '7.5 CGPA',
  },
  {
    degree: 'SSLC',
    institute: 'St. Mary’s Hr. Sec. School',
    score: '75%',
  },
];

export const languages = [
  { name: 'Tamil', level: 'Native', value: 100 },
  { name: 'English', level: 'Professional', value: 80 },
  { name: 'Hindi', level: 'Conversational', value: 60 },
  { name: 'Urdu', level: 'Conversational', value: 60 },
];

export const sections = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
