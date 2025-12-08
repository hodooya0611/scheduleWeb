import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { TextField, Box, Button, Typography, Link, Paper } from '@mui/material';
import axiosInstance from '../api/axiosInstance';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function ResetPassword() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const submitHandler = async () => {
        try {
            await axiosInstance.post('http://localhost:8080/api/auth/reset-password', {
                token: token,
                newPassword: password,
            });
            setSuccess(true);
        } catch (error) {
            alert('비밀번호 변경 실패!');
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
                        비밀번호 재설정
                    </Typography>
                    <TextField
                        label="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField label="password" fullWidth margin="normal" />
                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        <Button onClick={submitHandler} variant="contained" color="primary" fullWidth>
                            비밀번호 변경
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </LocalizationProvider>
        // <div>
        //     <h1>비밀번호 재설정</h1>

        //     {!success ? (
        //         <>
        //             <input
        //                 type="password"
        //                 placeholder="새 비밀번호 입력"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //             <button onClick={submitHandler}>비밀번호 변경</button>
        //         </>
        //     ) : (
        //         <p>비밀번호 변경이 완료되었습니다!</p>
        //     )}
        // </div>
    );
}
