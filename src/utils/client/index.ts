export const formatDateAndTime = (date: Date): string => {
  const padZero = (num: number): string => num.toString().padStart(2, "0");

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${day}-${month}-${year} : ${hours}:${minutes}:${seconds}`;
};
