export function getLastDays(num: number) {
    const days: string[] = [];
    for (let i = num - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return days;
}