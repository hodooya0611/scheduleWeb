import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import RegisterSchedule from './pages/RegisterSchedule';
import RegisterMember from './pages/RegisterMember';
import FindPassword from './pages/FindPassword';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateCalender from './pages/CreateCalender';
import SettingCalender from './pages/SettingCalender';
import AcceptInvitation from './pages/AcceptInvitation'; 

export default function App() {
    return (
        <Router>
            {/* 상단 네비게이션 바는 항상 보이도록 */}
            <ResponsiveAppBar />

            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/" element={<Home />} />

                    <Route path="/registerMember" element={<RegisterMember />} />

                    <Route path="/register" element={<RegisterSchedule />} />

                    <Route path="/find-password" element={<FindPassword />} />

                    <Route path="/reset-password" element={<ResetPassword />} />

                    <Route path="/CreateCalender" element={<CreateCalender />} />

                    <Route path="/SettingCalender/:calendarId" element={<SettingCalender />} />

                    <Route path="/accept-invitation" element={<AcceptInvitation />} />
                </Routes>
            </div>
        </Router>
    );
}
