import { useState } from 'react';
import { Button, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';

type SidebarProps = {
    calendars: Calendar[];
};

interface Calendar {
    id: number;
    name: string;
    isDefault: boolean;
}

export default function Sidebar({ calendars }: SidebarProps) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(null);

    const handleOpenMenu = (event: any, cal: any) => {
        console.log('선택한 캘린더:', cal);
        setAnchorEl(event.currentTarget); // 메뉴 위치
        setSelectedCalendar(cal); // 어떤 캘린더인지
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setSelectedCalendar(null);
    };

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
                <Box
                    key={cal.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}
                >
                    <Typography>{cal.name}</Typography>

                    <IconButton size="small" onClick={(e) => handleOpenMenu(e, cal)}>
                        <MoreVertIcon />
                    </IconButton>
                </Box>
            ))}

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem
                    onClick={() => {
                        navigate(`/SettingCalender/${selectedCalendar?.id}`);
                        handleCloseMenu();
                    }}
                >
                    설정 및 공유
                </MenuItem>
            </Menu>

            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/CreateCalender')}>
                + 캘린더 추가하기
            </Button>
        </div>
    );
}
