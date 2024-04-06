export const ReportType = {
  MOBILE: 'MOBILE',
  DESKTOP: 'DESKTOP',
} as const;
export type ReportType = (typeof ReportType)[keyof typeof ReportType];
