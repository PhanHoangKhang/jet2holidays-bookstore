export const buildDaysAgo = (createdAt?: Date) => {
    if (!createdAt) return 0;

    const diMs = Date.now() - new Date(createdAt).getTime()

    return Math.max(0, Math.floor(diMs / (1000 * 60 * 60 * 24)))
}