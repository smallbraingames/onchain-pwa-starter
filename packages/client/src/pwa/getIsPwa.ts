const getIsPWA = () => {
  let displayMode = false;
  const mqStandAlone = "(display-mode: standalone)";
  if (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).standalone ||
    window.matchMedia(mqStandAlone).matches
  ) {
    displayMode = true;
  }
  return displayMode;
};

export default getIsPWA;
