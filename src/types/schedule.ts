import { Dayjs } from 'dayjs';

export interface ScheduleForm {
    title: string;
    content: string;
    startDate: Dayjs | null;
    startTime: Dayjs | null;
    endDate: Dayjs | null;
    endTime: Dayjs | null;
    allDay: boolean;
    alarmEnabled: boolean;
    alarmTimeOption: string;
    customAlarmDate: Dayjs | null;
    customAlarmTime: Dayjs | null;
}

export interface ScheduleRequest {
    title: string;
    content: string;
    startDate: string; // YYYY-MM-DD
    startTime: string | null; // HH:mm
    endDate: string; // YYYY-MM-DD
    endTime: string | null; // HH:mm
    allDay: boolean;
    alarmEnabled: boolean;
    alarmOption: string; // '5분전', '10분전', '직접입력' 등
    alarmDate?: string | null; // 직접 입력일 경우 YYYY-MM-DD
    alarmTime?: string | null; // 직접 입력일 경우 HH:mm
}
export interface ScheduleResponse {
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    allDay: boolean;
    content: string;
    alarmEnabled: boolean;
    alarmOption: AlarmOption;
    alarmDate?: string;
    alarmTime?: string;
}

export enum AlarmOption {
    MIN_5 = '5분전',
    MIN_10 = '10분전',
    MIN_15 = '15분전',
    HOUR_1 = '1시간전',
    DAY_1 = '1일전',
    WEEK_1 = '1주일전',
    CUSTOM = '직접입력',
}

export interface ScheduleResponse extends ScheduleRequest {
    id: number;
}
