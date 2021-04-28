/**
 * 
 * @param {Array from Set} dates 
 * @returns {Sorted Array}
 */
export function sortDates(dates) {
  return dates.sort(compare);
}

export function compare(first, sec) {
  const firstDate = first.split("-");
  const secDate = sec.split("-");

  /**
   * Check by year first [0]
   * if needed, check by month [1]
   * finally, check by day [2]
   * if exact match, return 0
   */
  if (firstDate[0] > secDate[0]) return 1;
  else if (firstDate[0] < secDate[0]) return -1;
  else {
      if (firstDate[1] > secDate[1]) return 1;
      else if (firstDate[1] < secDate[1]) return -1;
      else {
        if (firstDate[2] > secDate[2]) return 1;
        else if (firstDate[2] < secDate[2]) return -1;
        else return 0;
      }
  }
}