import type { FilterNode, SelectOption } from '../types'

const { t } = useI18n()

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
  benefits?: string[] | string
  icon?: string
  experience?: string
}

const countries = computed<HomepageCountry[]>(() => [
  { flag: '🇸🇦', name: 'countries.sa', count: '1,240', code: 'sa' },
  { flag: '🇦🇪', name: 'countries.ae', count: '856', code: 'ae' },
  { flag: '🇰🇼', name: 'countries.kw', count: '432', code: 'kw' },
  { flag: '🇶🇦', name: 'countries.qa', count: '215', code: 'qa' },
  { flag: '🇴🇲', name: 'countries.om', count: '124', code: 'om' },
  { flag: '🇧🇭', name: 'countries.bh', count: '89', code: 'bh' },
  { flag: '🌐', name: 'countries.all', count: '3,450', code: 'all' },
])

const featuredCompanies = computed<HomepageCompany[]>(() => [
  {
    id: '1',
    name: 'companies.maali',
    slug: 'maalali',
    icon: 'apartment',
    rating: '4.8',
    reviews: '128',
    jobs: '14',
  },
  {
    id: '2',
    name: 'companies.alsaie',
    slug: 'alshaya',
    icon: 'apartment',
    rating: '4.5',
    reviews: '84',
    jobs: '8',
  },
  {
    id: '3',
    name: 'companies.binladin',
    slug: 'binladin',
    icon: 'business',
    rating: '4.2',
    reviews: '215',
    jobs: '22',
  },
  {
    id: '4',
    name: 'companies.aramco',
    slug: 'aramco',
    icon: 'domain',
    rating: '4.9',
    reviews: '542',
    jobs: '5',
  },
])

const fieldOfWorkData = computed<FilterNode[]>(() => [
  {
    id: 'eng',
    label: 'filters.field.categories.engineering',
    count: 850,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'civil', label: 'filters.field.children.civil', count: 320, isChecked: false },
      { id: 'arch', label: 'filters.field.children.architectural', count: 150, isChecked: false },
      { id: 'elect', label: 'filters.field.children.electricalEng', count: 210, isChecked: false },
      { id: 'mech', label: 'filters.field.children.mechanical', count: 170, isChecked: false },
    ],
  },
  {
    id: 'med',
    label: 'filters.field.categories.medical',
    count: 620,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'doc', label: 'filters.field.children.nursing', count: 120, isChecked: false },
      { id: 'nurse', label: 'filters.field.children.nursing', count: 350, isChecked: false },
      { id: 'pharm', label: 'filters.field.children.pharmacy', count: 150, isChecked: false },
    ],
  },
  {
    id: 'fin',
    label: 'filters.field.categories.technical',
    count: 410,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'acc', label: 'filters.field.children.civil', count: 280, isChecked: false },
      { id: 'audit', label: 'filters.field.children.mechanical', count: 80, isChecked: false },
      { id: 'tax', label: 'filters.field.children.electricalEng', count: 50, isChecked: false },
    ],
  },
  {
    id: 'tech',
    label: 'filters.field.categories.electrical',
    count: 310,
    isOpen: true,
    isChecked: false,
    children: [
      { id: 'dev', label: 'filters.field.children.itEng', count: 180, isChecked: false },
      { id: 'sys', label: 'filters.field.children.elecMaintain', count: 130, isChecked: false },
    ],
  },
])

const salaryNodes = computed<FilterNode[]>(() => [
  { id: 'low', label: 'filters.salary.low', isChecked: false },
  { id: 'mid', label: 'filters.salary.mid', isChecked: false },
  { id: 'high', label: 'filters.salary.high', isChecked: false },
  { id: 'vhigh', label: 'filters.salary.veryHigh', isChecked: false },
])

const experienceNodes = computed<FilterNode[]>(() => [
  { id: 'fresh', label: 'filters.experience.fresh', isChecked: false },
  { id: 'junior', label: 'filters.experience.junior', isChecked: false },
  { id: 'mid', label: 'filters.experience.mid', isChecked: false },
  { id: 'senior', label: 'filters.experience.senior', isChecked: false },
])

const allJobs = computed<HomepageJob[]>(() => [
  {
    id: '1',
    slug: 'cost-accountant-kuwait',
    category: 'jobs.accountant.hashtag',
    title: 'jobs.accountant.title',
    flag: '🇰🇼',
    location: 'jobs.accountant.country',
    company: 'jobs.accountant.company',
    companySlug: 'al-saeed',
    salary: 'jobs.accountant.salary',
    benefits: 'jobs.accountant.benefits',
    icon: 'work',
    experience: 'filters.experience.mid',
  },
  {
    id: '2',
    slug: 'civil-engineer-saudi',
    category: 'jobs.civilEng.hashtag',
    title: 'jobs.civilEng.title',
    flag: '🇸🇦',
    location: 'jobs.civilEng.country',
    company: 'jobs.civilEng.company',
    companySlug: 'al-bnian',
    salary: 'jobs.civilEng.salary',
    benefits: 'jobs.civilEng.benefits',
    icon: 'engineering',
    experience: 'filters.experience.senior',
  },
])

const sortOptions = computed<SelectOption[]>(() => [
  { label: 'jobList.sortOptions.latest', value: 'newest' },
  { label: 'jobList.sortOptions.salary', value: 'highest_salary' },
  { label: 'jobList.sortOptions.views', value: 'most_viewed' },
])

export const useHomepage = () => {
  const sortBy = ref('newest')
  const searchQuery = ref('')
  const selectedSalaryRanges = ref<string[]>([])
  const selectedExperienceLevels = ref<string[]>([])

  const filteredJobs = computed(() => {
    let result = [...allJobs.value]

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (j) =>
          t(j.title).toLowerCase().includes(q) ||
          t(j.company).toLowerCase().includes(q) ||
          t(j.category).toLowerCase().includes(q)
      )
    }

    return result
  })

  const totalJobs = computed(() =>
    filteredJobs.value.length === allJobs.value.length
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
    clearNodes(fieldOfWorkData.value)
    clearNodes(salaryNodes.value)
    clearNodes(experienceNodes.value)
  }

  const onFieldOfWorkToggle = (id: string) => {
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
