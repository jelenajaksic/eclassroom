export const USERS = {
  STUDENT: 'student',
  PROFESSOR: 'professor'
}

export const ICONS = {
  PLUS: 'mdi-plus',
  CLOSE: 'mdi-close',
  EDIT: 'mdi-pencil',
  TRASH: 'mdi-trash-can-outline',
  COPY: 'mdi-content-copy',
  DRAG_HORIZONTAL: 'mdi-drag-horizontal',
  DRAG_VERTICAL: 'mdi-drag-vertical',
  TEXT_SHORT: 'mdi-text-short',
  TEXT_LONG: 'mdi-text-long',
  RADIO_BLANK: 'mdi-radiobox-blank',
  RADIO_MARKED: 'mdi-radiobox-marked',
  MULTISELECT_BLANK: 'mdi-checkbox-blank-outline',
  MULTISELECT_MARKED: 'mdi-checkbox-marked',
  QUESTION: 'mdi-help',
  CHECK: 'mdi-check'
}

export const ALERT_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error'
}

export const QUESTION_TYPES = {
  TEXT: 'text',
  MULTISELECT: 'multiselect',
  SINGLE_SELECT: 'radio'
}

export const SECTION_TYPES = {
  TEXT: 'text',
  QUESTION: 'question'
}

export const QUESTIONS = [
  {
    slug: QUESTION_TYPES.SINGLE_SELECT,
    label: 'Single select',
    icon: ICONS.RADIO_MARKED
  },
  {
    slug: QUESTION_TYPES.MULTISELECT,
    label: 'Multiselect',
    icon: ICONS.MULTISELECT_MARKED
  },
  {
    slug: QUESTION_TYPES.TEXT,
    label: 'Free text',
    icon: ICONS.TEXT_SHORT
  }
]

export const SECTIONS = [
  {
    slug: SECTION_TYPES.TEXT,
    label: 'Paragraph',
    icon: ICONS.TEXT_LONG
  },
  {
    slug: SECTION_TYPES.QUESTION,
    label: 'Question',
    icon: ICONS.QUESTION
  }
]
