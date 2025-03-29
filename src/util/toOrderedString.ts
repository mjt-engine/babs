
export const toOrderedString = (obj: object) => {
  const sorted = Object.entries(obj).sort((a, b) => {
    const [keyA] = a;
    const [keyB] = b;
    return keyA.localeCompare(keyB);
  });
  return JSON.stringify(sorted);
};
