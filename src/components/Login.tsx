import React, { useState } from 'react';
import { TextField, Box, Button, Typography, Link, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { LoginRequest, LoginResponse, LoginForm } from '../types/login';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        memberId: '',
        password: '',
    });

    const changeLoginForm = (key: keyof LoginForm, value: any) => {
        setLoginForm({ ...loginForm, [key]: value });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData: LoginRequest = {
            memberId: loginForm.memberId,
            password: loginForm.password,
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/login`, loginData);

            const token = response.data.token;

            // 토큰 저장 (브라우저 새로고침해도 유지)
            localStorage.setItem('token', token);

            navigate(`/`);
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
            <form
                onSubmit={login}
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
                <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        로그인
                    </Typography>
                    <TextField
                        label="아이디"
                        fullWidth
                        margin="normal"
                        value={loginForm.memberId}
                        onChange={(e) => changeLoginForm('memberId', e.target.value)}
                    />
                    <TextField
                        label="비밀번호"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={loginForm.password}
                        onChange={(e) => changeLoginForm('password', e.target.value)}
                    />

                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            로그인
                        </Button>
                        <Button type="button" variant="outlined" color="secondary" fullWidth>
                            회원가입
                        </Button>
                    </Box>

                    {/* 비밀번호 / 아이디 찾기 */}
                    <Box mt={2} textAlign="center">
                        <Link href="#" underline="hover" sx={{ mx: 1 }}>
                            아이디 찾기
                        </Link>
                        |
                        <Link href="#" underline="hover" sx={{ mx: 1 }}>
                            비밀번호 찾기
                        </Link>
                    </Box>
                </Paper>
            </form>
        </LocalizationProvider>
    );
}
