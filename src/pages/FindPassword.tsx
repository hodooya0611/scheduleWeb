import React, { useState } from 'react';
import { TextField, Box, Button, Typography, Link, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosInstance from '../api/axiosInstance';
import { FindPasswordRequest, FindPasswordForm } from '../types/findPassword';
import { useNavigate } from 'react-router-dom';

export default function FindPassword() {
    const [findPasswordForm, setFindPasswordForm] = useState<FindPasswordForm>({
        memberId: '',
        email: '',
    });

    const changeFindpasswordForm = (key: keyof FindPasswordForm, value: any) => {
        setFindPasswordForm({ ...findPasswordForm, [key]: value });
    };

    const navigate = useNavigate();

    const findPassword = async () => {
        const findpasswordData: FindPasswordRequest = {
            memberId: findPasswordForm.memberId,
            email: findPasswordForm.email,
        };

        try {
            await axiosInstance.post(`/auth/password-reset-request`, findpasswordData);
        } catch (err: any) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert('아이디 또는 비밀번호가 틀렸습니다.');
            } else {
                alert('로그인 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                onKeyDown={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                }}
                sx={{
                    width: '80%',
                    maxWidth: 800,
                    minWidth: 400,
                    margin: '0 auto',
                    marginTop: '32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        임시비밀번호 발급
                    </Typography>
                    <TextField
                        label="아이디"
                        fullWidth
                        margin="normal"
                        value={findPasswordForm.memberId}
                        onChange={(e) => changeFindpasswordForm('memberId', e.target.value)}
                    />
                    <Typography variant="h6" align="center" gutterBottom>
                        임시비밀번호 발급받을 이메일을 입력해주세요.
                    </Typography>
                    <TextField
                        label="이메일"
                        fullWidth
                        margin="normal"
                        value={findPasswordForm.email}
                        onChange={(e) => changeFindpasswordForm('email', e.target.value)}
                    />

                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        <Button onClick={findPassword} variant="contained" color="primary" fullWidth>
                            확인
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
    );
}
