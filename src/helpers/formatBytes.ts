// 1234567 -> "1.2 MB"
export const formatBytes = (bytes?: number | null): string => {
	if (!bytes) return '–'
	const units = ['B', 'KB', 'MB', 'GB']
	const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
	return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`
}
