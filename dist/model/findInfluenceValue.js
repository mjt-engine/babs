export const findInfluenceValue = (influences, name) => {
    name = name.toLowerCase().trim();
    const found = influences.find(([key, value]) => name.includes(key.toLowerCase().trim()));
    return found?.[1];
};
//# sourceMappingURL=findInfluenceValue.js.map