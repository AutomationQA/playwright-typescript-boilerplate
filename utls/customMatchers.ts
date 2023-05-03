export const customMatchers = {
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => "passed",
        pass: true,
      };
    } else {
      return {
        message: () => `${received} is not within ${floor} and ${ceiling}`,
        pass: false,
      };
    }
  },

  toBeWithinDateRange(
    received: string,
    startDateString: string,
    endDateString: string
  ) {
    const receivedDate = new Date(received).getTime();
    const startDate = new Date(startDateString).getTime();
    const endDate = new Date(endDateString).getTime();
    const pass = receivedDate >= startDate && receivedDate <= endDate;
    if (pass) {
      return {
        message: () => "passed",
        pass: true,
      };
    } else {
      return {
        message: () =>
          `${received} is not within ${startDateString} and ${endDateString}`,
        pass: false,
      };
    }
  },
};
