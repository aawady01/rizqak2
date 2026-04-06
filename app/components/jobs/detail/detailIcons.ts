import {
  BadgeCheck,
  Bookmark,
  BookmarkCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CalendarRange,
  Clock3,
  Factory,
  FileText,
  GraduationCap,
  Info,
  Layers3,
  ListChecks,
  Mail,
  MapPinned,
  MessageCircle,
  Phone,
  Reply,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  ThumbsDown,
  ThumbsUp,
  TimerReset,
  UsersRound,
  Wallet,
  type LucideIcon,
} from 'lucide-vue-next'

export const detailIcons: Record<string, LucideIcon> = {
  'badge-check': BadgeCheck,
  bookmark: Bookmark,
  'bookmark-check': BookmarkCheck,
  'briefcase-business': BriefcaseBusiness,
  'building-2': Building2,
  'calendar-days': CalendarDays,
  'calendar-range': CalendarRange,
  'clock-3': Clock3,
  factory: Factory,
  'file-text': FileText,
  'graduation-cap': GraduationCap,
  'layers-3': Layers3,
  'list-checks': ListChecks,
  mail: Mail,
  'map-pinned': MapPinned,
  'message-circle': MessageCircle,
  phone: Phone,
  reply: Reply,
  send: Send,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  'thumbs-down': ThumbsDown,
  'thumbs-up': ThumbsUp,
  'timer-reset': TimerReset,
  'users-round': UsersRound,
  wallet: Wallet,
}

export const getDetailIcon = (iconName?: string): LucideIcon => {
  if (!iconName) {
    return Info
  }

  return detailIcons[iconName] || Info
}
