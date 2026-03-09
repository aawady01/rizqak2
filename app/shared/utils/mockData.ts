// =============================================
// أنواع البيانات (Data Types)
// =============================================

export interface Country {
  id: string;
  name: string;
  flag: string;
  countryCode?: string; // ISO 3166-1 alpha-2 code
  jobCount: number;
  isAllCountries?: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  iconName?: string;
  rating: number;
  reviewCount: number;
  availableJobs: number;
}

export interface JobBenefit {
  label: string;
}

export interface Job {
  id: string;
  title: string;
  hashtag: string;
  timeAgo: string;
  country: string;
  countryFlag: string;
  countryCode: string; // ISO 3166-1 alpha-2 code
  city?: string;
  companyName: string;
  salary: string;
  benefits: JobBenefit[];
  companyLogo?: string;
  iconName?: string;
  isSaved?: boolean;
}

export interface FilterChild {
  id: string;
  label: string;
  count: number;
  checked?: boolean;
}

export interface FilterCategory {
  id: string;
  label: string;
  count: number;
  totalJobs: number;
  children?: FilterChild[];
  expanded?: boolean;
  checked?: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  totalLabel: string;
  totalCount: number;
  totalJobs: number;
  categories: FilterCategory[];
  type?: "checkbox" | "radio";
}

// =============================================
// البيانات التجريبية (Mock Data)
// =============================================

export const countriesData: Country[] = [
  { id: "sa", name: "السعودية", flag: "🇸🇦", countryCode: "sa", jobCount: 1240 },
  { id: "ae", name: "الإمارات", flag: "🇦🇪", countryCode: "ae", jobCount: 856 },
  { id: "kw", name: "الكويت", flag: "🇰🇼", countryCode: "kw", jobCount: 432 },
  { id: "qa", name: "قطر", flag: "🇶🇦", countryCode: "qa", jobCount: 215 },
  { id: "om", name: "عمان", flag: "🇴🇲", countryCode: "om", jobCount: 124 },
  { id: "all", name: "كل الدول", flag: "", jobCount: 3450, isAllCountries: true },
];

export const companiesData: Company[] = [
  {
    id: "1",
    name: "المعالي للتوظيف",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCODDMM1ijnzH9l4KLcWKHggPPVSCBlUQFMFuFjLbEL4I_BOY56OHYFtZVKv357Yzaes3hHS4W0-Qd6WBV52DJXCaRY5Ck0RruFSE_2qt1-XKD0tNy0zUNjl0Pa7XFAWnLv12kUGDEPgRUEKyqBkSMdtrl5eF93WFrpkOJJxXUxaM-xvarJDGIryuyWl5l_8CQrERf7zw8gNMF3UTSbn_0fPefGGC_IxU4IUHO0Ir6T8aqfeBBLvj_tN7yvMdV6Z7Zvl2wCZqfTaA",
    rating: 4.8,
    reviewCount: 128,
    availableJobs: 14,
  },
  {
    id: "2",
    name: "مجموعة الشايع",
    iconName: "building-2",
    rating: 4.5,
    reviewCount: 84,
    availableJobs: 8,
  },
  {
    id: "3",
    name: "مجموعة بن لادن",
    iconName: "building",
    rating: 4.2,
    reviewCount: 215,
    availableJobs: 22,
  },
  {
    id: "4",
    name: "أرامكو السعودية",
    iconName: "landmark",
    rating: 4.9,
    reviewCount: 542,
    availableJobs: 5,
  },
];

export const jobsData: Job[] = [
  {
    id: "1",
    title: "محاسب تكاليف خبرة أكثر من 3 سنوات",
    hashtag: "#محاسب_تكاليف",
    timeAgo: "منذ 30 دقيقة",
    country: "الكويت",
    countryFlag: "🇰🇼",
    companyName: "شركة آل سعيد للمقاولات",
    salary: "450 دينار",
    countryCode: "kw",
    benefits: [
      { label: "سكن مؤمن" },
      { label: "مواصلات" },
      { label: "تأمين طبي" },
      { label: "تذاكر طيران" },
    ],
    companyLogo:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCODDMM1ijnzH9l4KLcWKHggPPVSCBlUQFMFuFjLbEL4I_BOY56OHYFtZVKv357Yzaes3hHS4W0-Qd6WBV52DJXCaRY5Ck0RruFSE_2qt1-XKD0tNy0zUNjl0Pa7XFAWnLv12kUGDEPgRUEKyqBkSMdtrl5eF93WFrpkOJJxXUxaM-xvarJDGIryuyWl5l_8CQrERf7zw8gNMF3UTSbn_0fPefGGC_IxU4IUHO0Ir6T8aqfeBBLvj_tN7yvMdV6Z7Zvl2wCZqfTaA",
  },
  {
    id: "2",
    title: "مهندس مدني - مشاريع بنية تحتية",
    hashtag: "#مهندس_مدني",
    timeAgo: "منذ ساعة",
    country: "الرياض، السعودية",
    countryFlag: "🇸🇦",
    companyName: "شركة البنيان المتين",
    salary: "6,000 - 8,000 ريال",
    countryCode: "sa",
    benefits: [
      { label: "سكن عائلي" },
      { label: "سيارة" },
      { label: "تأمين شامل" },
    ],
    iconName: "hard-hat",
  },
  {
    id: "3",
    title: "فني لحام (TIG/MIG) خبرة صناعية",
    hashtag: "#فني_لحام",
    timeAgo: "منذ 3 ساعات",
    country: "الدوحة، قطر",
    countryFlag: "🇶🇦",
    companyName: "مصانع قطر للصلب",
    salary: "3,500 - 4,500 ريال",
    countryCode: "qa",
    benefits: [{ label: "سكن" }, { label: "وجبات" }, { label: "إضافي" }],
    iconName: "wrench",
  },
  {
    id: "4",
    title: "ممرضين وممرضات - عناية مركزة",
    hashtag: "#تمريض",
    timeAgo: "منذ 5 ساعات",
    country: "دبي، الإمارات",
    countryFlag: "🇦🇪",
    companyName: "مستشفى المستقبل الدولي",
    salary: "8,000 - 12,000 درهم",
    countryCode: "ae",
    benefits: [
      { label: "سكن فاخر" },
      { label: "تأمين صحي VIP" },
      { label: "تذكرة سنوية" },
    ],
    iconName: "heart-pulse",
  },
  {
    id: "5",
    title: "سائق نقل ثقيل (رخصة درجة أولى)",
    hashtag: "#سائق_مهني",
    timeAgo: "منذ 8 ساعات",
    country: "مسقط، عمان",
    countryFlag: "🇴🇲",
    companyName: "شركة النقل العمانية",
    salary: "250 - 350 ريال عماني",
    countryCode: "om",
    benefits: [
      { label: "سكن" },
      { label: "بدل إعاشة" },
      { label: "حوافز" },
    ],
    iconName: "truck",
  },
];

// =============================================
// بيانات الفلاتر الشجرية
// =============================================

export const fieldFilterData: FilterSection = {
  id: "field",
  title: "مجال العمل",
  totalLabel: "كل المجالات",
  totalCount: 18,
  totalJobs: 2340,
  categories: [
    {
      id: "engineering",
      label: "الهندسة",
      count: 6,
      totalJobs: 780,
      expanded: false,
      children: [
        { id: "civil", label: "مهندس مدني", count: 245 },
        { id: "mechanical", label: "مهندس ميكانيكا", count: 198 },
        { id: "electrical-eng", label: "مهندس كهرباء", count: 156 },
        { id: "architectural", label: "مهندس معماري", count: 102 },
        { id: "chemical", label: "مهندس كيميائي", count: 49 },
        { id: "it-eng", label: "مهندس شبكات", count: 30 },
      ],
    },
    {
      id: "medical",
      label: "الطب والصحة",
      count: 5,
      totalJobs: 520,
      expanded: false,
      children: [
        { id: "nursing", label: "تمريض", count: 210 },
        { id: "pharmacy", label: "صيدلة", count: 120 },
        { id: "lab", label: "مختبرات طبية", count: 85 },
        { id: "radiology", label: "أشعة", count: 60 },
        { id: "physiotherapy", label: "علاج طبيعي", count: 45 },
      ],
    },
    {
      id: "technical",
      label: "فني / حرفي",
      count: 8,
      totalJobs: 640,
      expanded: false,
      children: [
        { id: "welding-general", label: "لحام عام", count: 120 },
        { id: "welding-tig", label: "لحام أرجون (TIG)", count: 85 },
        { id: "welding-mig", label: "لحام CO2 (MIG)", count: 64 },
        { id: "plumbing", label: "سباكة", count: 95 },
        { id: "carpentry", label: "نجارة", count: 78 },
        { id: "painting", label: "دهانات", count: 68 },
        { id: "tiling", label: "بلاط وسيراميك", count: 72 },
        { id: "ac-tech", label: "فني تكييف", count: 58 },
      ],
    },
    {
      id: "electrical",
      label: "الكهرباء",
      count: 4,
      totalJobs: 320,
      expanded: false,
      children: [
        { id: "elec-install", label: "تركيبات كهربائية", count: 110 },
        { id: "elec-maintain", label: "صيانة كهربائية", count: 95 },
        { id: "elec-industrial", label: "كهرباء صناعية", count: 70 },
        { id: "elec-solar", label: "طاقة شمسية", count: 45 },
      ],
    },
    {
      id: "driving",
      label: "القيادة والنقل",
      count: 3,
      totalJobs: 180,
      expanded: false,
      children: [
        { id: "heavy-driver", label: "سائق نقل ثقيل", count: 80 },
        { id: "bus-driver", label: "سائق حافلة", count: 55 },
        { id: "light-driver", label: "سائق خفيف", count: 45 },
      ],
    },
  ],
};

export const locationFilterData: FilterSection = {
  id: "location",
  title: "مكان العمل",
  totalLabel: "كل الأماكن",
  totalCount: 35,
  totalJobs: 2340,
  categories: [
    {
      id: "gulf",
      label: "دول الخليج العربي",
      count: 6,
      totalJobs: 1867,
      expanded: false,
      children: [
        { id: "saudi", label: "السعودية", count: 613 },
        { id: "uae", label: "الإمارات", count: 428 },
        { id: "kuwait", label: "الكويت", count: 324 },
        { id: "qatar", label: "قطر", count: 215 },
        { id: "oman", label: "عمان", count: 163 },
        { id: "bahrain", label: "البحرين", count: 124 },
      ],
    },
    {
      id: "other-arab",
      label: "دول عربية أخرى",
      count: 4,
      totalJobs: 280,
      expanded: false,
      children: [
        { id: "jordan", label: "الأردن", count: 95 },
        { id: "libya", label: "ليبيا", count: 78 },
        { id: "iraq", label: "العراق", count: 62 },
        { id: "algeria", label: "الجزائر", count: 45 },
      ],
    },
    {
      id: "africa",
      label: "أفريقيا",
      count: 3,
      totalJobs: 193,
      expanded: false,
      children: [
        { id: "south-africa", label: "جنوب أفريقيا", count: 85 },
        { id: "nigeria", label: "نيجيريا", count: 63 },
        { id: "kenya", label: "كينيا", count: 45 },
      ],
    },
  ],
};

export const salaryFilters = [
  { id: "low", label: "أقل من 2,000 ريال" },
  { id: "mid", label: "2,000 - 4,000 ريال" },
  { id: "high", label: "4,000 - 8,000 ريال" },
  { id: "very-high", label: "أكثر من 8,000 ريال" },
];

export const experienceFilters = [
  { id: "fresh", label: "حديث التخرج (0-1)" },
  { id: "junior", label: "مستوى مبتدئ (1-3)" },
  { id: "mid", label: "مستوى متوسط (3-5)" },
  { id: "senior", label: "مستوى متقدم (5+)" },
];

export const navLinks = [
  { label: "الرئيسية", href: "/", active: true },
  { label: "الوظائف", href: "#jobs" },
  { label: "شركات مميزة", href: "#companies" },
  { label: "تواصل معنا", href: "#contact" },
];

export const footerJobSeekerLinks = [
  { label: "العودة للأعلى", href: "#hero" },
  { label: "الوظائف المتاحة", href: "#jobs" },
  { label: "الشركات المميزة", href: "#companies" },
  { label: "تواصل معنا", href: "#contact" },
];

export const footerEmployerLinks = [
  { label: "عن المنصة", href: "#hero" },
  { label: "أبرز الشركات", href: "#companies" },
  { label: "استعرض الفرص", href: "#jobs" },
];
