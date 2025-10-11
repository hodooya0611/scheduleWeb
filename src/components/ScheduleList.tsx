import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';
import ScheduleDialog from './ScheduleDialog';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';

type CustomDateClickArg = {
    date: Date;
    dateStr: string;
    allDay: boolean;
    dayEl: HTMLElement;
    jsEvent: MouseEvent;
    view: any;
};

export default function ScheduleList() {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
    }, []);

    // 달력 범위 내 일정 가져오기
    const fetchSchedules = async (start: Date, end: Date) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/schedules`, {
                params: {
                    startDate: start.toISOString().split('T')[0],
                    endDate: end.toISOString().split('T')[0],
                },
            });

            const calendarEvents = response.data.map((schedule: any) => ({
                id: schedule.id,
                title: schedule.title,
                start: schedule.startDate,
                end: schedule.endDate,
            }));

            setEvents(calendarEvents);
        } catch (err) {
            console.error(err);
        }
    };

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
        <Card sx={{ width: '80%', margin: '30px auto', boxShadow: 3, borderRadius: 3, backgroundColor: '#fff' }}>
            <CardContent>
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
                            end: clickedEvent.endStr,
                            startTime: clickedEvent.start?.toISOString(),
                            endTime: clickedEvent.end?.toISOString(),
                            content: clickedEvent.extendedProps.content,
                        });
                        setOpen(true);
                    }}
                    datesSet={(arg) => {
                        fetchSchedules(arg.start, arg.end);
                    }}
                />

                <ScheduleDialog open={open} onClose={handleClose} schedule={selectedSchedule} />
            </CardContent>
        </Card>
    );
}
