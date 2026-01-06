import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ScheduleList from '../components/ScheduleList';
import axiosInstance from '../api/axiosInstance';

const Home = () => {
    const [calendars, setCalendars] = useState([]);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const res = await axiosInstance.get(`http://localhost:8080/api/home`);
                console.log('레스폰스 출력', res);
                setCalendars(res.data.calendarList);
                setSchedules(res.data.scheduleList);
            } catch (e) {
                console.error(e);
            }
        };

        fetchHomeData();
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar calendars={calendars} />
            <div style={{ flex: 1, overflow: 'auto' }}>
                <ScheduleList schedules={schedules} />
            </div>
        </div>
    );
};

export default Home;
