export const getCustomTime = (time: number) => {
  const seconds = Math.floor(time % 60).toString();
  const minutes = Math.floor((time / 60) % 60).toString();

  return `${minutes} min ${seconds} sec`;
};
