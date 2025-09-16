export const calcDaysLeftToBirth = (estimateBirthDay) => {
  let daysLeftToBirth;
  if (!estimateBirthDay && isNaN(new Date(estimateBirthDay))) {
    daysLeftToBirth = 42 * 7 - 5 * 7;
  } else {
    const dueDate = new Date(estimateBirthDay);
    const today = new Date();
    dueDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const differenceMs = dueDate - today;
    daysLeftToBirth = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
  }
  return daysLeftToBirth;
};

export const calculateCurrentWeek = (daysLeft) => {
  const daysPassed = 294 - daysLeft;
  const currentWeek = Math.floor(daysPassed / 7) + 1;
  return currentWeek;
};

export const calculateDemoDaysLeft = () => {
  const today = new Date();
  const result = new Date(today);
  result.setDate(result.getDate() + 36 * 7);
  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, '0');
  const day = String(result.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
