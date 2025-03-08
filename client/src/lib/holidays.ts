import { format } from "date-fns";

export interface Holiday {
  name: string;
  date: Date;
  type: string;
  description?: string;
}

// This is a temporary solution. In production, we would use a proper holiday API
const holidays: Record<string, Holiday[]> = {
  BR: [
    {
      name: "Carnival",
      date: new Date(2025, 2, 4), // March 4, 2025
      type: "National Holiday",
      description: "Brazilian Carnival celebration"
    },
    {
      name: "Independence Day",
      date: new Date(2025, 8, 7), // September 7, 2025
      type: "National Holiday"
    },
    {
      name: "Christmas",
      date: new Date(2025, 11, 25), // December 25, 2025
      type: "National Holiday"
    }
  ],
  JP: [
    {
      name: "New Year's Day",
      date: new Date(2025, 0, 1),
      type: "National Holiday"
    },
    {
      name: "Coming of Age Day",
      date: new Date(2025, 0, 13),
      type: "National Holiday"
    },
    {
      name: "Cherry Blossom Festival",
      date: new Date(2025, 3, 1), // April 1, 2025
      type: "Cultural Celebration"
    }
  ],
  // Add more countries as needed
};

export function getHolidaysForCountry(countryCode: string): Holiday[] {
  return holidays[countryCode] || [];
}

export function getHolidayForDate(countryCode: string, date: Date): Holiday | undefined {
  const countryHolidays = getHolidaysForCountry(countryCode);
  return countryHolidays.find(holiday => 
    format(holiday.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );
}
