// bubble sort for months
export const sortPeriodsByMonth = (periods) => {
  for (let i = 0; i < periods.length; i++) {
    for (let j = 0; j < periods.length - i - 1; j++) {
      if (periods[j + 1].month < periods[j].month) {
        [periods[j + 1], periods[j]] = [periods[j], periods[j + 1]];
      }
    }
  }
  return periods;
};

export const sortYears = (years) => {
  for (let i = 0; i < years.length; i++) {
    for (let j = 0; j < years.length - i - 1; j++) {
      if (years[j + 1].year < years[j].year) {
        [years[j + 1], years[j]] = [years[j], years[j + 1]];
      }
    }
  }
  return years;
};
