
export type CalendarViewType = 'jobs' | 'employees';

export interface CalendarViewConfig {
  type: CalendarViewType;
  label: string;
  icon: string;
}
