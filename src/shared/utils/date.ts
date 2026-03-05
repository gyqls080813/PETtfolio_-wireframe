// shared/utils/date.ts
// 날짜 포맷팅 및 계산 관련 순수 유틸 함수
export function parseDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString("ko-KR");
}

export function getDaysLeft(endDate: Date, today: Date): number {
    return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}
