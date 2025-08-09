export default function formatNumber(num) {
	if (Math.abs(num) >= 1_000_000_000) {
		return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
	}
	if (Math.abs(num) >= 1_000_000) {
		return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
	}
	if (Math.abs(num) >= 1_000) {
		return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
	}
	return num.toString();
}
