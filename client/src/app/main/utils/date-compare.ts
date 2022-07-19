/**
 * Compares two Date objects and returns e number value that represents
 * the result:
 * 0 if the two dates are equal.
 * 1 if the first date is greater than second.
 * -1 if the first date is less than second.
 * @param dateA First date object to compare.
 * @param dateB Second date object to compare.
 */
export function compareDate(dateA: Date, dateB: Date) {
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'

  // Check if the dates are equal
  if (dateA.getTime() === dateB.getTime()) {
    return 0;
  }

  // Check if the first is greater than second
  if (dateA > dateB) {
    return 1;
  }

  // It must mean the second date is greater than the first
  return -1;
}
