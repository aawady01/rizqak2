import type { FilterNode } from '../types'

export const createFilterNodes = (items: string[], countRange = 100): FilterNode[] => {
  return items.map(item => ({
    id: item,
    label: item,
    count: Math.floor(Math.random() * countRange),
    isChecked: false,
    isOpen: false
  }))
}

const locations = [
  'السعودية',
  'الكويت',
  'الإمارات',
  'قطر',
  'عمان',
  'البحرين'
]

const salaryRanges = [
  'أقل من 2000 ريال',
  '2000 - 4000 ريال',
  '4000 - 8000 ريال',
  'أكثر من 8000 ريال'
]

const experienceLevels = [
  'بدون خبرة',
  'أقل من سنة',
  '1 - 3 سنوات',
  '3 - 5 سنوات',
  '5 - 10 سنوات',
  'أكثر من 10 سنوات'
]

const categories = [
  'البناء والتشييد',
  'الكهرباء',
  'المحاسبة والإدارة',
  'التمريض والرعاية الصحية',
  'السائقين والنقل'
]

export const useFilterData = () => {
  return {
    locations,
    salaryRanges,
    experienceLevels,
    categories,
    createFilterNodes
  }
}
