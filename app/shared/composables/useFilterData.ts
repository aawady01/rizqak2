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

const locations = computed(() => [
  'filters.location.children.saudi',
  'filters.location.children.kuwait',
  'filters.location.children.uae',
  'filters.location.children.qatar',
  'filters.location.children.oman',
  'filters.location.children.bahrain'
])

const salaryRanges = computed(() => [
  'filters.salary.low',
  'filters.salary.mid',
  'filters.salary.high',
  'filters.salary.veryHigh'
])

const experienceLevels = computed(() => [
  'filters.experience.fresh',
  'filters.experience.junior',
  'filters.experience.mid',
  'filters.experience.senior'
])

const categories = computed(() => [
  'filters.field.categories.engineering',
  'filters.field.categories.electrical',
  'filters.field.categories.technical',
  'filters.field.categories.medical',
  'filters.field.categories.driving'
])

export const useFilterData = () => {
  return {
    locations,
    salaryRanges,
    experienceLevels,
    categories,
    createFilterNodes
  }
}
