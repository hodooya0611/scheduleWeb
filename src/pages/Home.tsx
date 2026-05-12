import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ScheduleList from '../components/ScheduleList';
import axiosInstance from '../api/axiosInstance';
import dayjs from 'dayjs';

interface Calendar {
    id: number;
    name: string;
    isDefault: boolean;
}

const Home = () => {
    const [calendars, setCalendars] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [sharedCalendars, setSharedCalendars] = useState([]);
    const [sharedSchedules, setSharedSchedules] = useState([]);
    const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null);

    const fetchHomeData = async () => {
        try {
            const res = await axiosInstance.get(`http://localhost:8080/api/home`);
            console.log('레스폰스 출력', res);
            setCalendars(res.data.calendarList);
            setSharedCalendars(res.data.sharedCalendarList);
            setSchedules(res.data.scheduleList);
            setSharedSchedules(res.data.sharedScheduleList);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchHomeData();
    }, []);

    const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
    const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

    const getSelectedCalendarData = async (calendar: Calendar) => {
        if (calendar.isDefault) {
            fetchHomeData();
            setSelectedCalendar(null);
            return;
        }
        try {
            const res = await axiosInstance.get(`http://localhost:8080/api/schedules`, {
                params: { startDate, endDate, calendarId: calendar.id },
            });
            setSchedules(res.data);
            setSharedSchedules([]);
            setSelectedCalendar(calendar);
        } catch (err) {
            console.error('조회 실패', err);
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar
                calendars={calendars}
                sharedCalendars={sharedCalendars}
                onCalendarClick={getSelectedCalendarData}
            />
            <div style={{ flex: 1, overflow: 'auto' }}>
                <ScheduleList
                    schedules={schedules}
                    sharedSchedules={sharedSchedules}
                    selectedCalendar={selectedCalendar}
                />
            </div>
        </div>
    );
};

export default Home;
