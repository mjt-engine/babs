export const toOrderedString = (obj) => {
    const sorted = Object.entries(obj).sort((a, b) => {
        const [keyA] = a;
        const [keyB] = b;
        return keyA.localeCompare(keyB);
    });
    return JSON.stringify(sorted);
};
//# sourceMappingURL=toOrderedString.js.map