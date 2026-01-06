import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextField, Box, Button, Typography, Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosInstance from '../api/axiosInstance';
import { CalenderRequest, CalenderResponse, CalenderForm } from '../types/calender';
import { useNavigate, useLocation } from 'react-router-dom';
import InvitationDialog from '../components/InvitationDialog';

export default function CreateCalender() {
    const [calenderForm, setCalenderForm] = useState<CalenderForm>({
        name: '',
        description: '',
    });

    const changeCalenderForm = (key: keyof CalenderForm, value: any) => {
        setCalenderForm({ ...calenderForm, [key]: value });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const clickCancel = () => {
        navigate('/'); // 홈으로 이동
    };

    const registerMember = async (e: React.FormEvent) => {
        e.preventDefault();
        const calenderData: CalenderRequest = {
            name: calenderForm.name,
            description: calenderForm.description,
        };

        try {
            await axiosInstance.post('/calender', calenderData);
        } catch (err) {
            console.error('등록 실패', err);
        }
    };

    const [openInviteDialog, setOpenInviteDialog] = useState(false);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
                onSubmit={registerMember}
                style={{
                    width: '80%', // 화면 너비의 70%
                    maxWidth: 800, // 너무 커지지 않게 제한
                    minWidth: 400, // 너무 작아지면 보기 힘듦
                    margin: '0 auto', // 좌우 가운데 정렬
                    marginTop: '32px', // 위쪽 여백
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px', // 요소 사이 간격
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    캘린더 설정
                </Typography>
                <Divider />
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        이름
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        value={calenderForm.name}
                        onChange={(e) => changeCalenderForm('name', e.target.value)}
                    />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        설명
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        value={calenderForm.description}
                        onChange={(e) => changeCalenderForm('description', e.target.value)}
                    />
                </Box>
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="info"
                        sx={{ width: '200px', fontSize: '16px', padding: '10px' }}
                    >
                        캘린더수정
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="success"
                        sx={{ width: '200px', fontSize: '16px', padding: '10px' }}
                        onClick={() => setOpenInviteDialog(true)}
                    >
                        + 사용자 추가
                    </Button>
                </Box>
            </form>
            <InvitationDialog open={openInviteDialog} onClose={() => setOpenInviteDialog(false)} />
        </LocalizationProvider>
    );
}
