export const isSomeCharEmpty = (quoteItemChar?: {
    quoteItemId: number,
    char: { charId: number, value: string }
}): boolean => {
    return !quoteItemChar?.char.value.trim();
};