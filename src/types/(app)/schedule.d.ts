export interface ScheduleProps {
    day: string;
    dayInWeek: number; // 0 = Sunday, 3 = Wednesday, 6 = Saturday
    time: string;
    bosses: number;
};