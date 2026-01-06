import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Card, CardContent, Typography } from '@mui/material';
import ScheduleDialog from './ScheduleDialog';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

type CustomDateClickArg = {
    date: Date;
    dateStr: string;
    allDay: boolean;
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: any;
};

type ScheduleListProps = {
    schedules: any[];
};

export default function ScheduleList({ schedules }: ScheduleListProps) {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!schedules) return;

        const calendarEvents = schedules.map((schedule: any) => ({
            id: schedule.id,
            title: schedule.title,
            start: schedule.startDate,
            end: schedule.endDate,
        }));

        setEvents(calendarEvents);
    }, [schedules]);

    const navigate = useNavigate();

    const handleDateClick = (info: any) => {
        const clickedDate = info.dateStr; // YYYY-MM-DD
        // 스케줄 등록 페이지로 이동, 쿼리스트링으로 날짜 전달 가능
        navigate(`/register?date=${clickedDate}`);
    };

    const handleClose = () => setOpen(false);

    const handleDetail = (id: number) => {
        setOpen(false);
    };

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {/* 오른쪽 FullCalendar 영역 */}
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="en"
                height="700px"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                eventContent={(arg) => <div style={{ cursor: 'pointer' }}>{arg.event.title}</div>}
                events={events}
                dateClick={handleDateClick}
                eventClick={(info) => {
                    // 이벤트 클릭 → 다이얼로그 열기
                    const clickedEvent = info.event;
                    setSelectedSchedule({
                        id: clickedEvent.id,
                        title: clickedEvent.title,
                        start: clickedEvent.startStr,
                        end: clickedEvent.endStr || clickedEvent.startStr,
                        startTime: clickedEvent.start?.toISOString(),
                        endTime: clickedEvent.end?.toISOString(),
                        content: clickedEvent.extendedProps.content,
                    });
                    setOpen(true);
                }}
            />
            <ScheduleDialog open={open} onClose={handleClose} schedule={selectedSchedule} />
        </div>
    );
}
