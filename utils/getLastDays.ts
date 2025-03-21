export function getLastDays(num: number) {
    const days = [];
    const today = new Date();
    for (let i = 0; i < num; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return days;
}