import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
    calendars: any[]; // 나중에 Calendar[]로 바꾸면 됨
};

export default function Sidebar({ calendars }: SidebarProps) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                width: '220px',
                padding: '20px',
                borderRight: '1px solid #ddd',
                height: '100vh',
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2 }}>
                캘린더
            </Typography>

            {/* 👇 캘린더 목록 */}
            {calendars.map((cal) => (
                
                <Typography key={cal.id} sx={{ mb: 1 }}>
                    {cal.name}
                </Typography>
            ))}

            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/CreateCalender')}>
                + 캘린더 추가하기
            </Button>
        </div>
    );
}
