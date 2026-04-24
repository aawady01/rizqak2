import type {
  Country,
  Company,
  Job,
  FilterSection,
} from '~/shared/types/domain'

// =============================================
// البيانات التجريبية (Mock Data)
// Labels use i18n keys — resolve via $t() in templates
// =============================================

export const countriesData: Country[] = [
  { id: "sa", name: "countries.sa", flag: "🇸🇦", countryCode: "sa", jobCount: 1240 },
  { id: "ae", name: "countries.ae", flag: "🇦🇪", countryCode: "ae", jobCount: 856 },
  { id: "kw", name: "countries.kw", flag: "🇰🇼", countryCode: "kw", jobCount: 432 },
  { id: "qa", name: "countries.qa", flag: "🇶🇦", countryCode: "qa", jobCount: 215 },
  { id: "om", name: "countries.om", flag: "🇴🇲", countryCode: "om", jobCount: 124 },
  { id: "all", name: "countries.all", flag: "", jobCount: 3450, isAllCountries: true },
];

export const companiesData: Company[] = [
  {
    id: "1",
    slug: "maali-construction",
    name: "companies.maali",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCODDMM1ijnzH9l4KLcWKHggPPVSCBlUQFMFuFjLbEL4I_BOY56OHYFtZVKv357Yzaes3hHS4W0-Qd6WBV52DJXCaRY5Ck0RruFSE_2qt1-XKD0tNy0zUNjl0Pa7XFAWnLv12kUGDEPgRUEKyqBkSMdtrl5eF93WFrpkOJJxXUxaM-xvarJDGIryuyWl5l_8CQrERf7zw8gNMF3UTSbn_0fPefGGC_IxU4IUHO0Ir6T8aqfeBBLvj_tN7yvMdV6Z7Zvl2wCZqfTaA",
    rating: 4.8,
    reviewCount: 128,
    availableJobs: 14,
    location: "companies.maaliLocation",
    description: "companies.maaliDesc",
    placedCount: "1,200",
  },
  {
    id: "2",
    slug: "alsaie-group",
    name: "companies.alsaie",
    iconName: "building-2",
    rating: 4.5,
    reviewCount: 84,
    availableJobs: 8,
    location: "companies.alsaieLocation",
    description: "companies.alsaieDesc",
    placedCount: "850",
  },
  {
    id: "3",
    slug: "binladin-group",
    name: "companies.binladin",
    iconName: "building",
    rating: 4.2,
    reviewCount: 215,
    availableJobs: 22,
    location: "companies.binladinLocation",
    description: "companies.binladinDesc",
    placedCount: "3,400",
  },
  {
    id: "4",
    slug: "aramco",
    name: "companies.aramco",
    iconName: "landmark",
    rating: 4.9,
    reviewCount: 542,
    availableJobs: 5,
    location: "companies.aramcoLocation",
    description: "companies.aramcoDesc",
    placedCount: "5,600",
  },
  {
    id: "5",
    slug: "al-faisal-recruitment",
    name: "companies.alFaisal",
    iconName: "building-2",
    rating: 4.6,
    reviewCount: 96,
    availableJobs: 11,
    location: "companies.alFaisalLocation",
    description: "companies.alFaisalDesc",
    placedCount: "2,100",
  },
  {
    id: "6",
    slug: "gulf-talent",
    name: "companies.gulfTalent",
    iconName: "landmark",
    rating: 4.3,
    reviewCount: 67,
    availableJobs: 6,
    location: "companies.gulfTalentLocation",
    description: "companies.gulfTalentDesc",
    placedCount: "980",
  },
  {
    id: "7",
    slug: "nile-employment",
    name: "companies.nileEmployment",
    iconName: "building",
    rating: 4.7,
    reviewCount: 143,
    availableJobs: 18,
    location: "companies.nileEmploymentLocation",
    description: "companies.nileEmploymentDesc",
    placedCount: "4,200",
  },
  {
    id: "8",
    slug: "arab-manpower",
    name: "companies.arabManpower",
    iconName: "building-2",
    rating: 4.1,
    reviewCount: 52,
    availableJobs: 3,
    location: "companies.arabManpowerLocation",
    description: "companies.arabManpowerDesc",
    placedCount: "720",
  },
];

export const jobsData: Job[] = [
  {
    id: "1",
    slug: "cost-accountant-kuwait",
    title: "jobs.accountant.title",
    hashtag: "jobs.accountant.hashtag",
    timeAgo: "jobs.accountant.timeAgo",
    country: "jobs.accountant.country",
    countryFlag: "🇰🇼",
    companyName: "jobs.accountant.company",
    companySlug: "maali-construction",
    salary: "jobs.accountant.salary",
    salaryAmount: 450,
    views: 1250,
    countryCode: "kw",
    benefits: [
      { label: "jobs.accountant.benefits.0" },
      { label: "jobs.accountant.benefits.1" },
      { label: "jobs.accountant.benefits.2" },
      { label: "jobs.accountant.benefits.3" },
    ],
    companyLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCODDMM1ijnzH9l4KLcWKHggPPVSCBlUQFMFuFjLbEL4I_BOY56OHYFtZVKv357Yzaes3hHS4W0-Qd6WBV52DJXCaRY5Ck0RruFSE_2qt1-XKD0tNy0zUNjl0Pa7XFAWnLv12kUGDEPgRUEKyqBkSMdtrl5eF93WFrpkOJJxXUxaM-xvarJDGIryuyWl5l_8CQrERf7zw8gNMF3UTSbn_0fPefGGC_IxU4IUHO0Ir6T8aqfeBBLvj_tN7yvMdV6Z7Zvl2wCZqfTaA",
  },
  {
    id: "2",
    slug: "civil-engineer-saudi",
    title: "jobs.civilEng.title",
    hashtag: "jobs.civilEng.hashtag",
    timeAgo: "jobs.civilEng.timeAgo",
    country: "jobs.civilEng.country",
    countryFlag: "🇸🇦",
    companyName: "jobs.civilEng.company",
    companySlug: "alsaie-group",
    salary: "jobs.civilEng.salary",
    salaryAmount: 800,
    views: 980,
    countryCode: "sa",
    benefits: [
      { label: "jobs.civilEng.benefits.0" },
      { label: "jobs.civilEng.benefits.1" },
      { label: "jobs.civilEng.benefits.2" },
    ],
    iconName: "hard-hat",
  },
  {
    id: "3",
    slug: "tig-mig-welder-qatar",
    title: "jobs.welder.title",
    hashtag: "jobs.welder.hashtag",
    timeAgo: "jobs.welder.timeAgo",
    country: "jobs.welder.country",
    countryFlag: "🇶🇦",
    companyName: "jobs.welder.company",
    companySlug: "binladin-group",
    salary: "jobs.welder.salary",
    salaryAmount: 350,
    views: 750,
    countryCode: "qa",
    benefits: [
      { label: "jobs.welder.benefits.0" },
      { label: "jobs.welder.benefits.1" },
      { label: "jobs.welder.benefits.2" },
    ],
    iconName: "wrench",
  },
  {
    id: "4",
    slug: "icu-nurse-dubai",
    title: "jobs.nurse.title",
    hashtag: "jobs.nurse.hashtag",
    timeAgo: "jobs.nurse.timeAgo",
    country: "jobs.nurse.country",
    countryFlag: "🇦🇪",
    companyName: "jobs.nurse.company",
    companySlug: "aramco",
    salary: "jobs.nurse.salary",
    salaryAmount: 600,
    views: 1100,
    countryCode: "ae",
    benefits: [
      { label: "jobs.nurse.benefits.0" },
      { label: "jobs.nurse.benefits.1" },
      { label: "jobs.nurse.benefits.2" },
    ],
    iconName: "heart-pulse",
  },
  {
    id: "5",
    slug: "heavy-driver-oman",
    title: "jobs.driver.title",
    hashtag: "jobs.driver.hashtag",
    timeAgo: "jobs.driver.timeAgo",
    country: "jobs.driver.country",
    countryFlag: "🇴🇲",
    companyName: "jobs.driver.company",
    companySlug: "maali-construction",
    salary: "jobs.driver.salary",
    salaryAmount: 280,
    views: 620,
    countryCode: "om",
    benefits: [
      { label: "jobs.driver.benefits.0" },
      { label: "jobs.driver.benefits.1" },
      { label: "jobs.driver.benefits.2" },
    ],
    iconName: "truck",
  },
];

// =============================================
// بيانات الفلاتر الشجرية
// =============================================

export const fieldFilterData: FilterSection = {
  id: "field",
  title: "filters.field.title",
  totalLabel: "filters.field.totalLabel",
  totalCount: 18,
  totalJobs: 2340,
  categories: [
    {
      id: "engineering",
      label: "filters.field.categories.engineering",
      count: 6,
      totalJobs: 780,
      expanded: false,
      children: [
        { id: "civil", label: "filters.field.children.civil", count: 245 },
        { id: "mechanical", label: "filters.field.children.mechanical", count: 198 },
        { id: "electrical-eng", label: "filters.field.children.electricalEng", count: 156 },
        { id: "architectural", label: "filters.field.children.architectural", count: 102 },
        { id: "chemical", label: "filters.field.children.chemical", count: 49 },
        { id: "it-eng", label: "filters.field.children.itEng", count: 30 },
      ],
    },
    {
      id: "medical",
      label: "filters.field.categories.medical",
      count: 5,
      totalJobs: 520,
      expanded: false,
      children: [
        { id: "nursing", label: "filters.field.children.nursing", count: 210 },
        { id: "pharmacy", label: "filters.field.children.pharmacy", count: 120 },
        { id: "lab", label: "filters.field.children.lab", count: 85 },
        { id: "radiology", label: "filters.field.children.radiology", count: 60 },
        { id: "physiotherapy", label: "filters.field.children.physiotherapy", count: 45 },
      ],
    },
    {
      id: "technical",
      label: "filters.field.categories.technical",
      count: 8,
      totalJobs: 640,
      expanded: false,
      children: [
        { id: "welding-general", label: "filters.field.children.weldingGeneral", count: 120 },
        { id: "welding-tig", label: "filters.field.children.weldingTig", count: 85 },
        { id: "welding-mig", label: "filters.field.children.weldingMig", count: 64 },
        { id: "plumbing", label: "filters.field.children.plumbing", count: 95 },
        { id: "carpentry", label: "filters.field.children.carpentry", count: 78 },
        { id: "painting", label: "filters.field.children.painting", count: 68 },
        { id: "tiling", label: "filters.field.children.tiling", count: 72 },
        { id: "ac-tech", label: "filters.field.children.acTech", count: 58 },
      ],
    },
    {
      id: "electrical",
      label: "filters.field.categories.electrical",
      count: 4,
      totalJobs: 320,
      expanded: false,
      children: [
        { id: "elec-install", label: "filters.field.children.elecInstall", count: 110 },
        { id: "elec-maintain", label: "filters.field.children.elecMaintain", count: 95 },
        { id: "elec-industrial", label: "filters.field.children.elecIndustrial", count: 70 },
        { id: "elec-solar", label: "filters.field.children.elecSolar", count: 45 },
      ],
    },
    {
      id: "driving",
      label: "filters.field.categories.driving",
      count: 3,
      totalJobs: 180,
      expanded: false,
      children: [
        { id: "heavy-driver", label: "filters.field.children.heavyDriver", count: 80 },
        { id: "bus-driver", label: "filters.field.children.busDriver", count: 55 },
        { id: "light-driver", label: "filters.field.children.lightDriver", count: 45 },
      ],
    },
  ],
};

export const locationFilterData: FilterSection = {
  id: "location",
  title: "filters.location.title",
  totalLabel: "filters.location.totalLabel",
  totalCount: 35,
  totalJobs: 2340,
  categories: [
    {
      id: "gulf",
      label: "filters.location.categories.gulf",
      count: 6,
      totalJobs: 1867,
      expanded: false,
      children: [
        { id: "saudi", label: "filters.location.children.saudi", count: 613 },
        { id: "uae", label: "filters.location.children.uae", count: 428 },
        { id: "kuwait", label: "filters.location.children.kuwait", count: 324 },
        { id: "qatar", label: "filters.location.children.qatar", count: 215 },
        { id: "oman", label: "filters.location.children.oman", count: 163 },
        { id: "bahrain", label: "filters.location.children.bahrain", count: 124 },
      ],
    },
    {
      id: "other-arab",
      label: "filters.location.categories.otherArab",
      count: 4,
      totalJobs: 280,
      expanded: false,
      children: [
        { id: "jordan", label: "filters.location.children.jordan", count: 95 },
        { id: "libya", label: "filters.location.children.libya", count: 78 },
        { id: "iraq", label: "filters.location.children.iraq", count: 62 },
        { id: "algeria", label: "filters.location.children.algeria", count: 45 },
      ],
    },
    {
      id: "africa",
      label: "filters.location.categories.africa",
      count: 3,
      totalJobs: 193,
      expanded: false,
      children: [
        { id: "south-africa", label: "filters.location.children.southAfrica", count: 85 },
        { id: "nigeria", label: "filters.location.children.nigeria", count: 63 },
        { id: "kenya", label: "filters.location.children.kenya", count: 45 },
      ],
    },
  ],
};

export const salaryFilters = [
  { id: "low", label: "filters.salary.low" },
  { id: "mid", label: "filters.salary.mid" },
  { id: "high", label: "filters.salary.high" },
  { id: "very-high", label: "filters.salary.veryHigh" },
];

export const experienceFilters = [
  { id: "fresh", label: "filters.experience.fresh" },
  { id: "junior", label: "filters.experience.junior" },
  { id: "mid", label: "filters.experience.mid" },
  { id: "senior", label: "filters.experience.senior" },
];

export const navLinks = [
  { label: "nav.home", href: "/", active: true },
  { label: "nav.jobs", href: "/jobs" },
  { label: "nav.companies", href: "/companies" },
  { label: "nav.contact", href: "#contact" },
];

export const footerJobSeekerLinks = [
  { label: "footer.jobSeekerLinks.top", href: "#hero" },
  { label: "footer.jobSeekerLinks.jobs", href: "#jobs" },
  { label: "footer.jobSeekerLinks.companies", href: "#companies" },
  { label: "footer.jobSeekerLinks.contact", href: "#contact" },
];

export const footerEmployerLinks = [
  { label: "footer.employerLinks.about", href: "#hero" },
  { label: "footer.employerLinks.companies", href: "#companies" },
  { label: "footer.employerLinks.jobs", href: "#jobs" },
];

// Re-export types for backward compatibility
export type {
  Country,
  Company,
  JobBenefit,
  Job,
  FilterChild,
  FilterCategory,
  FilterSection,
} from '~/shared/types/domain'
