import type { MessageFunction, VueMessageType } from 'vue-i18n'
import type {
  Job,
  JobDetailComment,
  JobDetailContentSection,
  JobDetailFactGroup,
  JobDetailFactItem,
  JobDetailPublisherInfo,
  JobDetailPublisherStat,
  JobDetailSidebarAction,
  JobDetailView,
} from '~/shared/types/domain'
import { jobsData } from '~/shared/utils/mockData'

type Translate = (key: string, params?: Record<string, unknown>) => string
type TranslateMessages = (key: string) => unknown
type ResolveValue = VueMessageType | MessageFunction<VueMessageType>
type ResolveMessage = (value: ResolveValue) => string

interface JobDetailTemplate {
  summaryBadges?: string[]
  quickStats?: JobDetailPublisherStat[]
  factGroups?: JobDetailFactGroup[]
  compensationItems?: JobDetailFactItem[]
  benefitTags?: string[]
  contentSections?: JobDetailContentSection[]
  interviewSection?: JobDetailContentSection
  publisher?: JobDetailPublisherInfo
  sidebarActions?: JobDetailSidebarAction[]
  safetyTitle?: string
  safetyBody?: string
  comments?: JobDetailComment[]
  seoSummary?: string
  postedAtIso?: string
}

const resolveMessageString = (value: unknown, rt: ResolveMessage): string => {
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)

  try {
    const resolved = rt(value as ResolveValue)
    return typeof resolved === 'string' ? resolved : ''
  }
  catch {
    return ''
  }
}

const asStringArray = (value: unknown, rt: ResolveMessage): string[] => {
  if (!Array.isArray(value)) return []

  return value
    .map(item => resolveMessageString(item, rt))
    .filter(Boolean)
}

const findJobBySlug = (slug: string): Job | undefined => {
  return jobsData.find(job => job.slug === slug)
}

const createInitials = (value: string): string => {
  const cleaned = value.trim()
  if (!cleaned) return '?'

  const parts = cleaned.split(/\s+/).slice(0, 2)
  return parts.map(part => part.charAt(0)).join('').toUpperCase()
}

const buildGenericQuickStats = (t: Translate): JobDetailPublisherStat[] => {
  return [
    { id: 'applicants', label: t('jobDetail.shared.publisher.stats.interested'), value: t('jobDetail.shared.generic.stats.interested') },
    { id: 'openings', label: t('jobDetail.shared.publisher.stats.openings'), value: t('jobDetail.shared.generic.stats.openings') },
    { id: 'response-rate', label: t('jobDetail.shared.publisher.stats.responseRate'), value: t('jobDetail.shared.generic.stats.responseRate') },
    { id: 'hiring-speed', label: t('jobDetail.shared.publisher.stats.hiringSpeed'), value: t('jobDetail.shared.generic.stats.hiringSpeed') },
  ]
}

const buildGenericFactGroups = (job: Job, t: Translate): JobDetailFactGroup[] => {
  return [
    {
      id: 'role-basics',
      title: t('jobDetail.shared.sections.roleFacts'),
      items: [
        { id: 'employment-type', label: t('jobDetail.shared.facts.employmentType'), value: t('jobDetail.shared.generic.employmentType'), iconName: 'briefcase-business' },
        { id: 'experience', label: t('jobDetail.shared.facts.experience'), value: t('jobDetail.shared.generic.experience'), iconName: 'graduation-cap' },
        { id: 'education', label: t('jobDetail.shared.facts.education'), value: t('jobDetail.shared.generic.education'), iconName: 'badge-check' },
        { id: 'category', label: t('jobDetail.shared.facts.category'), value: t(job.hashtag).replace('#', ''), iconName: 'layers-3' },
      ],
    },
    {
      id: 'role-context',
      title: t('jobDetail.shared.sections.jobContext'),
      items: [
        { id: 'location', label: t('jobDetail.shared.facts.location'), value: t(job.country), iconName: 'map-pinned' },
        { id: 'company', label: t('jobDetail.shared.facts.company'), value: t(job.companyName), iconName: 'building-2' },
        { id: 'posted-at', label: t('jobDetail.shared.facts.postedAt'), value: t(job.timeAgo), iconName: 'clock-3' },
        { id: 'salary', label: t('jobDetail.shared.facts.salary'), value: t(job.salary), iconName: 'wallet' },
      ],
    },
  ]
}

const buildGenericCompensationItems = (job: Job, t: Translate): JobDetailFactItem[] => {
  return [
    { id: 'salary', label: t('jobDetail.shared.facts.salary'), value: t(job.salary), iconName: 'wallet' },
    { id: 'contract', label: t('jobDetail.shared.facts.contractDuration'), value: t('jobDetail.shared.generic.contractDuration'), iconName: 'calendar-range' },
    { id: 'openings', label: t('jobDetail.shared.facts.openings'), value: t('jobDetail.shared.generic.stats.openings'), iconName: 'users-round' },
  ]
}

const buildGenericContentSections = (
  job: Job,
  t: Translate,
  tm: TranslateMessages,
  rt: ResolveMessage,
): JobDetailContentSection[] => {
  return [
    {
      id: 'description',
      title: t('jobDetail.shared.sections.additionalDetails'),
      iconName: 'file-text',
      paragraphs: [
        t('jobDetail.shared.generic.descriptionParagraphOne', {
          role: t(job.title),
          company: t(job.companyName),
          location: t(job.country),
        }),
        t('jobDetail.shared.generic.descriptionParagraphTwo', {
          role: t(job.title),
        }),
      ],
    },
    {
      id: 'requirements',
      title: t('jobDetail.shared.sections.requirements'),
      iconName: 'list-checks',
      items: asStringArray(tm('jobDetail.shared.generic.requirements'), rt),
    },
    {
      id: 'benefits',
      title: t('jobDetail.shared.sections.highlights'),
      iconName: 'sparkles',
      items: job.benefits.map(benefit => t(benefit.label)),
      accentNote: t('jobDetail.shared.generic.highlightsNote'),
    },
  ]
}

const buildGenericInterviewSection = (job: Job, t: Translate): JobDetailContentSection => {
  return {
    id: 'interview',
    title: t('jobDetail.shared.sections.interviewInfo'),
    iconName: 'calendar-days',
    paragraphs: [
      t('jobDetail.shared.generic.interviewParagraphOne', {
        role: t(job.title),
      }),
      t('jobDetail.shared.generic.interviewParagraphTwo'),
    ],
    accentNote: t('jobDetail.shared.generic.interviewAccent'),
  }
}

const buildGenericPublisher = (job: Job, t: Translate): JobDetailPublisherInfo => {
  return {
    name: t(job.companyName),
    tagline: t('jobDetail.shared.generic.publisherTagline'),
    logo: job.companyLogo,
    rating: t('jobDetail.shared.generic.publisherRating'),
    reviewCount: t('jobDetail.shared.generic.publisherReviews'),
    followerCount: t('jobDetail.shared.generic.publisherFollowers'),
    headquarters: t(job.country),
    license: t('jobDetail.shared.generic.publisherLicense'),
    isVerified: true,
    stats: buildGenericQuickStats(t),
  }
}

const buildGenericComments = (job: Job, t: Translate): JobDetailComment[] => {
  return [
    {
      id: 'comment-1',
      author: t('jobDetail.shared.comments.communityAuthor'),
      avatarFallback: createInitials(t('jobDetail.shared.comments.communityAuthor')),
      body: t('jobDetail.shared.comments.communityQuestion', {
        role: t(job.title),
      }),
      timeAgo: t('jobDetail.shared.comments.communityTime'),
      likes: 2,
      dislikes: 0,
      replies: [
        {
          id: 'comment-1-reply-1',
          author: t(job.companyName),
          role: t('jobDetail.shared.comments.publisherRole'),
          avatarFallback: createInitials(t(job.companyName)),
          avatarSrc: job.companyLogo,
          body: t('jobDetail.shared.comments.publisherReply'),
          timeAgo: t('jobDetail.shared.comments.publisherTime'),
          likes: 1,
          isPublisher: true,
          verified: true,
        },
      ],
    },
  ]
}

const buildGenericActions = (t: Translate): JobDetailSidebarAction[] => {
  return [
    { id: 'call', label: t('jobDetail.shared.actions.callPublisher'), iconName: 'phone', variant: 'outline', tone: 'brand' },
    { id: 'whatsapp', label: t('jobDetail.shared.actions.whatsapp'), iconName: 'message-circle', variant: 'default', tone: 'success' },
    { id: 'message', label: t('jobDetail.shared.actions.sendMessage'), iconName: 'mail', variant: 'secondary', tone: 'neutral' },
  ]
}

const ACCOUNTANT_SLUG = 'cost-accountant-kuwait'

const buildAccountantTemplate = (
  job: Job,
  t: Translate,
  tm: TranslateMessages,
  rt: ResolveMessage,
): JobDetailTemplate => ({
  summaryBadges: asStringArray(tm('jobDetail.accountant.summaryBadges'), rt),
  quickStats: [
    { id: 'applicants', label: t('jobDetail.shared.publisher.stats.interested'), value: t('jobDetail.accountant.publisher.stats.interested') },
    { id: 'openings', label: t('jobDetail.shared.publisher.stats.openings'), value: t('jobDetail.accountant.publisher.stats.openings') },
    { id: 'response-rate', label: t('jobDetail.shared.publisher.stats.responseRate'), value: t('jobDetail.accountant.publisher.stats.responseRate') },
    { id: 'hiring-speed', label: t('jobDetail.shared.publisher.stats.hiringSpeed'), value: t('jobDetail.accountant.publisher.stats.hiringSpeed') },
  ],
  factGroups: [
    {
      id: 'job-requirements',
      title: t('jobDetail.shared.sections.roleFacts'),
      items: [
        { id: 'employment-type', label: t('jobDetail.shared.facts.employmentType'), value: t('jobDetail.accountant.facts.employmentType'), iconName: 'briefcase-business' },
        { id: 'experience', label: t('jobDetail.shared.facts.experience'), value: t('jobDetail.accountant.facts.experience'), iconName: 'graduation-cap' },
        { id: 'education', label: t('jobDetail.shared.facts.education'), value: t('jobDetail.accountant.facts.education'), iconName: 'badge-check' },
        { id: 'category', label: t('jobDetail.shared.facts.category'), value: t('jobDetail.accountant.facts.category'), iconName: 'layers-3' },
        { id: 'location', label: t('jobDetail.shared.facts.location'), value: t('jobDetail.accountant.facts.location'), iconName: 'map-pinned' },
        { id: 'company', label: t('jobDetail.shared.facts.company'), value: t(job.companyName), iconName: 'building-2' },
      ],
    },
    {
      id: 'job-context',
      title: t('jobDetail.shared.sections.jobContext'),
      items: [
        { id: 'salary', label: t('jobDetail.shared.facts.salary'), value: t(job.salary), iconName: 'wallet' },
        { id: 'contract-duration', label: t('jobDetail.shared.facts.contractDuration'), value: t('jobDetail.accountant.facts.contractDuration'), iconName: 'calendar-range' },
        { id: 'openings', label: t('jobDetail.shared.facts.openings'), value: t('jobDetail.accountant.facts.openings'), iconName: 'users-round' },
        { id: 'posted-at', label: t('jobDetail.shared.facts.postedAt'), value: t(job.timeAgo), iconName: 'clock-3' },
        { id: 'schedule', label: t('jobDetail.shared.facts.schedule'), value: t('jobDetail.accountant.facts.schedule'), iconName: 'timer-reset' },
        { id: 'industry', label: t('jobDetail.shared.facts.industry'), value: t('jobDetail.accountant.facts.industry'), iconName: 'factory' },
      ],
    },
  ],
  compensationItems: [
    { id: 'salary', label: t('jobDetail.shared.facts.salary'), value: t(job.salary), iconName: 'wallet' },
    { id: 'contract-duration', label: t('jobDetail.shared.facts.contractDuration'), value: t('jobDetail.accountant.facts.contractDuration'), iconName: 'calendar-range' },
    { id: 'openings', label: t('jobDetail.shared.facts.openings'), value: t('jobDetail.accountant.facts.openings'), iconName: 'users-round' },
  ],
  benefitTags: asStringArray(tm('jobDetail.accountant.benefits'), rt),
  contentSections: [
    {
      id: 'description',
      title: t('jobDetail.shared.sections.additionalDetails'),
      iconName: 'file-text',
      paragraphs: asStringArray(tm('jobDetail.accountant.description.paragraphs'), rt),
    },
    {
      id: 'requirements',
      title: t('jobDetail.shared.sections.requirements'),
      iconName: 'list-checks',
      items: asStringArray(tm('jobDetail.accountant.description.requirements'), rt),
      accentNote: t('jobDetail.accountant.description.requirementsNote'),
    },
    {
      id: 'highlights',
      title: t('jobDetail.shared.sections.highlights'),
      iconName: 'sparkles',
      items: asStringArray(tm('jobDetail.accountant.description.highlights'), rt),
    },
  ],
  interviewSection: {
    id: 'interview',
    title: t('jobDetail.shared.sections.interviewInfo'),
    iconName: 'calendar-days',
    paragraphs: asStringArray(tm('jobDetail.accountant.interview.paragraphs'), rt),
    accentNote: t('jobDetail.accountant.interview.accent'),
  },
  publisher: {
    name: t('jobDetail.accountant.publisher.name'),
    tagline: t('jobDetail.accountant.publisher.tagline'),
    logo: job.companyLogo,
    rating: t('jobDetail.accountant.publisher.rating'),
    reviewCount: t('jobDetail.accountant.publisher.reviewCount'),
    followerCount: t('jobDetail.accountant.publisher.followerCount'),
    headquarters: t('jobDetail.accountant.publisher.headquarters'),
    license: t('jobDetail.accountant.publisher.license'),
    isVerified: true,
    stats: [
      { id: 'interested', label: t('jobDetail.shared.publisher.stats.interested'), value: t('jobDetail.accountant.publisher.stats.interested') },
      { id: 'openings', label: t('jobDetail.shared.publisher.stats.openings'), value: t('jobDetail.accountant.publisher.stats.openings') },
      { id: 'response-rate', label: t('jobDetail.shared.publisher.stats.responseRate'), value: t('jobDetail.accountant.publisher.stats.responseRate') },
      { id: 'hiring-speed', label: t('jobDetail.shared.publisher.stats.hiringSpeed'), value: t('jobDetail.accountant.publisher.stats.hiringSpeed') },
    ],
  },
  sidebarActions: buildGenericActions(t),
  safetyTitle: t('jobDetail.shared.safety.title'),
  safetyBody: t('jobDetail.shared.safety.description'),
  comments: [
    {
      id: 'ahmed',
      author: t('jobDetail.accountant.comments.ahmed.author'),
      avatarFallback: createInitials(t('jobDetail.accountant.comments.ahmed.author')),
      body: t('jobDetail.accountant.comments.ahmed.body'),
      timeAgo: t('jobDetail.accountant.comments.ahmed.timeAgo'),
      likes: 2,
      dislikes: 0,
      replies: [
        {
          id: 'ahmed-reply',
          author: t('jobDetail.accountant.publisher.name'),
          role: t('jobDetail.shared.comments.publisherRole'),
          avatarFallback: createInitials(t('jobDetail.accountant.publisher.name')),
          avatarSrc: job.companyLogo,
          body: t('jobDetail.accountant.comments.ahmed.reply'),
          timeAgo: t('jobDetail.accountant.comments.ahmed.replyTime'),
          likes: 1,
          isPublisher: true,
          verified: true,
        },
      ],
    },
    {
      id: 'mohamed',
      author: t('jobDetail.accountant.comments.mohamed.author'),
      avatarFallback: createInitials(t('jobDetail.accountant.comments.mohamed.author')),
      body: t('jobDetail.accountant.comments.mohamed.body'),
      timeAgo: t('jobDetail.accountant.comments.mohamed.timeAgo'),
      likes: 5,
      dislikes: 0,
    },
    {
      id: 'sara',
      author: t('jobDetail.accountant.comments.sara.author'),
      avatarFallback: createInitials(t('jobDetail.accountant.comments.sara.author')),
      body: t('jobDetail.accountant.comments.sara.body'),
      timeAgo: t('jobDetail.accountant.comments.sara.timeAgo'),
      likes: 1,
      dislikes: 0,
    },
  ],
  seoSummary: t('jobDetail.accountant.seoSummary'),
  postedAtIso: '2026-03-29T14:30:00.000Z',
})

const buildJobDetailTemplate = (
  job: Job,
  t: Translate,
  tm: TranslateMessages,
  rt: ResolveMessage,
): JobDetailTemplate => {
  if (job.slug === ACCOUNTANT_SLUG) {
    return buildAccountantTemplate(job, t, tm, rt)
  }

  return {
    summaryBadges: asStringArray(tm('jobDetail.shared.generic.summaryBadges'), rt),
    quickStats: buildGenericQuickStats(t),
    factGroups: buildGenericFactGroups(job, t),
    compensationItems: buildGenericCompensationItems(job, t),
    benefitTags: job.benefits.map(benefit => t(benefit.label)),
    contentSections: buildGenericContentSections(job, t, tm, rt),
    interviewSection: buildGenericInterviewSection(job, t),
    publisher: buildGenericPublisher(job, t),
    sidebarActions: buildGenericActions(t),
    safetyTitle: t('jobDetail.shared.safety.title'),
    safetyBody: t('jobDetail.shared.safety.description'),
    comments: buildGenericComments(job, t),
    seoSummary: t('jobDetail.shared.generic.seoSummary', {
      role: t(job.title),
      company: t(job.companyName),
      location: t(job.country),
    }),
    postedAtIso: '2026-03-28T09:00:00.000Z',
  }
}

export const getJobPath = (job: Pick<Job, 'id' | 'slug'>): string => {
  return `/jobs/${job.slug || job.id}`
}

export const getJobDetailView = (
  slug: string,
  t: Translate,
  tm: TranslateMessages,
  rt: ResolveMessage,
): JobDetailView | null => {
  const job = findJobBySlug(slug)

  if (!job) {
    return null
  }

  const template = buildJobDetailTemplate(job, t, tm, rt)

  return {
    id: job.id,
    slug: job.slug,
    title: t(job.title),
    hashtag: t(job.hashtag),
    companyName: t(job.companyName),
    companySlug: job.companySlug,
    companyLogo: job.companyLogo,
    countryCode: job.countryCode,
    location: t(job.country),
    salary: t(job.salary),
    postedAtLabel: t(job.timeAgo),
    postedAtIso: template.postedAtIso || '2026-03-28T09:00:00.000Z',
    statusLabel: t('jobDetail.shared.status.open'),
    statusVariant: 'success',
    seoSummary: template.seoSummary || t('jobDetail.shared.generic.seoSummary', {
      role: t(job.title),
      company: t(job.companyName),
      location: t(job.country),
    }),
    summaryBadges: template.summaryBadges || [],
    quickStats: template.quickStats || [],
    factGroups: template.factGroups || [],
    compensationItems: template.compensationItems || [],
    benefitTags: template.benefitTags || [],
    contentSections: template.contentSections || [],
    interviewSection: template.interviewSection,
    publisher: template.publisher || buildGenericPublisher(job, t),
    sidebarActions: template.sidebarActions || buildGenericActions(t),
    safetyTitle: template.safetyTitle || t('jobDetail.shared.safety.title'),
    safetyBody: template.safetyBody || t('jobDetail.shared.safety.description'),
    comments: template.comments || [],
    isSaved: job.isSaved ?? false,
  }
}
