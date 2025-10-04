import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import ScheduleList from './components/ScheduleList';
import RegisterSchedule from './components/RegisterSchedule';

export default function App() {
    return (
        <Router>
            {/* 상단 네비게이션 바는 항상 보이도록 */}
            <ResponsiveAppBar />

            <div style={{ padding: '20px' }}>
                <Routes>
                    {/* 기본 화면: 달력 */}
                    <Route path="/" element={<ScheduleList />} />

                    {/* 등록 화면: 버튼 클릭 시 이동 */}
                    <Route path="/register" element={<RegisterSchedule />} />
                </Routes>
            </div>
        </Router>
    );
}
