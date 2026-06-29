import type { ExperienceItem } from '@/data';

const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric',
});

type YearMonth = {
  monthIndex: number;
  year: number;
};

export function getExperienceDateDisplay(
  { endDate, startDate }: Pick<ExperienceItem, 'endDate' | 'startDate'>,
  referenceDate = new Date()
) {
  const range = `${formatExperienceDate(startDate)} - ${endDate ? formatExperienceDate(endDate) : 'Present'}`;
  const duration = formatExperienceDuration(startDate, endDate, referenceDate);

  return `${range} (${duration})`;
}

function formatExperienceDate(value: string) {
  const { monthIndex, year } = parseYearMonth(value);

  return dateFormatter.format(new Date(Date.UTC(year, monthIndex, 1)));
}

function formatExperienceDuration(
  startDate: string,
  endDate: string | undefined,
  referenceDate: Date
) {
  const totalMonths = getDurationInMonths(startDate, endDate, referenceDate);

  if (totalMonths === 0) {
    return 'less than 1 mo';
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'mo' : 'mos'}`);
  }

  return parts.join(' ');
}

function getDurationInMonths(startDate: string, endDate: string | undefined, referenceDate: Date) {
  const start = parseYearMonth(startDate);
  const end = endDate
    ? parseYearMonth(endDate)
    : { monthIndex: referenceDate.getMonth(), year: referenceDate.getFullYear() };

  return Math.max(0, (end.year - start.year) * 12 + end.monthIndex - start.monthIndex);
}

function parseYearMonth(value: string): YearMonth {
  const match = /^(\d{4})-(\d{2})/.exec(value);

  if (!match) {
    const date = new Date(value);

    return { monthIndex: date.getUTCMonth(), year: date.getUTCFullYear() };
  }

  return { monthIndex: Number(match[2]) - 1, year: Number(match[1]) };
}
