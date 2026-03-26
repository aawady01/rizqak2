import type { FilterNode, SelectOption } from '../types'

interface HomepageCountry {
  flag: string
  name: string
  count: string | number
  code?: string
}

interface HomepageCompany {
  id: string
  name: string
  slug: string
  icon?: string
  rating: string | number
  reviews: string | number
  jobs: string | number
}

interface HomepageJob {
  id: string | number
  slug: string
  title: string
  category: string
  flag?: string
  location: string
  company: string
  companySlug: string
  salary: string
  benefits?: string[]
  icon?: string
  experience?: string
}

const countries: HomepageCountry[] = [
  { flag: '🇸🇦', name: 'السعودية', count: '1,240', code: 'sa' },
  { flag: '🇦🇪', name: 'الإمارات', count: '856', code: 'ae' },
  { flag: '🇰🇼', name: 'الكويت', count: '432', code: 'kw' },
  { flag: '🇶🇦', name: 'قطر', count: '215', code: 'qa' },
  { flag: '🇴🇲', name: 'عمان', count: '124', code: 'om' },
  { flag: '🇧🇭', name: 'البحرين', count: '89', code: 'bh' },
  { flag: '🌐', name: 'كل الدول', count: '3,450', code: 'all' },
]

const featuredCompanies: HomepageCompany[] = [
  {
    id: '1',
    name: 'المعالي للتوظيف',
    slug: 'maalali',
    icon: 'apartment',
    rating: '4.8',
    reviews: '128',
    jobs: '14',
  },
  {
    id: '2',
    name: 'مجموعة الشايع',
    slug: 'alshaya',
    icon: 'apartment',
    rating: '4.5',
    reviews: '84',
    jobs: '8',
  },
  {
    id: '3',
    name: 'مجموعة بن لادن',
    slug: 'binladin',
    icon: 'business',
    rating: '4.2',
    reviews: '215',
    jobs: '22',
  },
  {
    id: '4',
    name: 'أرامكو السعودية',
    slug: 'aramco',
    icon: 'domain',
    rating: '4.9',
    reviews: '542',
    jobs: '5',
  },
]

const fieldOfWorkData: FilterNode[] = [
  {
    id: 'eng',
    label: 'الهندسة',
    count: 850,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'civil', label: 'هندسة مدنية', count: 320, isChecked: false },
      { id: 'arch', label: 'هندسة معمارية', count: 150, isChecked: false },
      { id: 'elect', label: 'هندسة كهربائية', count: 210, isChecked: false },
      { id: 'mech', label: 'هندسة ميكانيكية', count: 170, isChecked: false },
    ],
  },
  {
    id: 'med',
    label: 'القطاع الطبي',
    count: 620,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'doc', label: 'أطباء', count: 120, isChecked: false },
      { id: 'nurse', label: 'تمريض', count: 350, isChecked: false },
      { id: 'pharm', label: 'صيدلة', count: 150, isChecked: false },
    ],
  },
  {
    id: 'fin',
    label: 'المحاسبة والمالية',
    count: 410,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'acc', label: 'محاسب عام', count: 280, isChecked: false },
      { id: 'audit', label: 'مدقق حسابات', count: 80, isChecked: false },
      { id: 'tax', label: 'محاسب ضرائب', count: 50, isChecked: false },
    ],
  },
  {
    id: 'tech',
    label: 'تقنية المعلومات',
    count: 310,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'dev', label: 'مطور برمجيات', count: 180, isChecked: false },
      { id: 'sys', label: 'دعم فني', count: 130, isChecked: false },
    ],
  },
]
const salaryNodes: FilterNode[] = [
  { id: 'low', label: 'أقل من 2,000 ريال', isChecked: false },
  { id: 'mid', label: '2,000 - 4,000 ريال', isChecked: false },
  { id: 'high', label: '4,000 - 8,000 ريال', isChecked: false },
  { id: 'vhigh', label: 'أكثر من 8,000 ريال', isChecked: false },
]

const experienceNodes: FilterNode[] = [
  { id: 'fresh', label: 'حديث التخرج (0-1)', isChecked: false },
  { id: 'junior', label: 'مستوى مبتدئ (1-3)', isChecked: false },
  { id: 'mid', label: 'مستوى متوسط (3-5)', isChecked: false },
  { id: 'senior', label: 'مستوى متقدم (5+)', isChecked: false },
]

const allJobs: HomepageJob[] = [
  {
    id: '1',
    slug: 'cost-accountant-kuwait',
    category: 'محاسب_تكاليف',
    title: 'محاسب تكاليف خبرة أكثر من 3 سنوات',
    flag: '🇰🇼',
    location: 'الكويت',
    company: 'شركة آل سعيد للمقاولات',
    companySlug: 'al-saeed',
    salary: '450 دينار',
    benefits: ['سكن مؤمن', 'مواصلات', 'تأمين طبي', 'تذاكر طيران'],
    icon: 'work',
    experience: '3 - 5 سنوات',
  },
  {
    id: '2',
    slug: 'civil-engineer-saudi',
    category: 'مهندس_مدني',
    title: 'مهندس مدني - مشاريع بنية تحتية',
    flag: '🇸🇦',
    location: 'الرياض، السعودية',
    company: 'شركة البنيان المتين',
    companySlug: 'al-bnian',
    salary: '6,000 - 8,000 ريال',
    benefits: ['سكن عائلي', 'سيارة', 'تأمين شامل'],
    icon: 'engineering',
    experience: '5 - 10 سنوات',
  },
]

const sortOptions: SelectOption[] = [
  { label: 'الأحدث', value: 'newest' },
  { label: 'الأعلى راتباً', value: 'highest_salary' },
  { label: 'الأكثر مشاهدة', value: 'most_viewed' },
]

export const useHomepage = () => {
  const sortBy = ref('newest')
  const searchQuery = ref('')
  const selectedSalaryRanges = ref<string[]>([])
  const selectedExperienceLevels = ref<string[]>([])

  const filteredJobs = computed(() => {
    let result = [...allJobs]

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.category.toLowerCase().includes(q)
      )
    }

    return result
  })

  const totalJobs = computed(() =>
    filteredJobs.value.length === allJobs.length
      ? 2340
      : filteredJobs.value.length
  )

  const clearAllFilters = () => {
    searchQuery.value = ''
    selectedSalaryRanges.value = []
    selectedExperienceLevels.value = []

    const clearNodes = (nodes: FilterNode[]) => {
      nodes.forEach((n) => {
        n.isChecked = false
        if (n.children) clearNodes(n.children)
      })
    }
    clearNodes(fieldOfWorkData)
    clearNodes(salaryNodes)
    clearNodes(experienceNodes)
  }

  const onFieldOfWorkToggle = (id: string) => {
    // Mock toggle logic
    console.log('Toggle', id)
  }

  return {
    sortBy,
    searchQuery,
    selectedSalaryRanges,
    selectedExperienceLevels,
    salaryNodes,
    experienceNodes,
    onFieldOfWorkToggle,
    countries,
    featuredCompanies,
    fieldOfWorkData,
    jobs: filteredJobs,
    sortOptions,
    totalJobs,
    clearAllFilters,
  }
}
