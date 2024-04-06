import { CLS, FCP, LCP, SI, TBT } from '@constants/metricData';

enum Colors {
  success = '#50FA7B',
  warning = '#FFB86C',
  danger = '#FF5555',
}
type ColorValues = `${Colors}`;

export const getPerformanceColor = (score: number): string => {
  if (score < 59) return Colors.danger;
  if (score < 89) return Colors.warning;
  return Colors.success;
};

const getFcpColor = (value: number): ColorValues => {
  if (value > 3000) return Colors.danger;
  if (value > 1800) return Colors.warning;
  return Colors.success;
};

const getLcpColor = (value: number): ColorValues => {
  if (value > 4000) return Colors.danger;
  if (value > 2500) return Colors.warning;
  return Colors.success;
};

const getSiColor = (value: number): ColorValues => {
  if (value > 5800) return Colors.danger;
  if (value > 3400) return Colors.warning;
  return Colors.success;
};

const getTbtColor = (value: number): ColorValues => {
  if (value > 600) return Colors.danger;
  if (value > 200) return Colors.warning;
  return Colors.success;
};

const getClsColor = (value: number): ColorValues => {
  if (value > 0.25) return Colors.danger;
  if (value > 0.1) return Colors.warning;
  return Colors.success;
};

export const getMetricColor = (metricName: string, score: number): ColorValues => {
  switch (metricName) {
    case FCP.abbreviation:
      return getFcpColor(score);
    case LCP.abbreviation:
      return getLcpColor(score);
    case SI.abbreviation:
      return getSiColor(score);
    case TBT.abbreviation:
      return getTbtColor(score);
    case CLS.abbreviation:
      return getClsColor(score);
    default:
      return Colors.success;
  }
};
