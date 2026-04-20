import React, { useState } from 'react';
import { TextField, Box, Button, Typography, Link, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosInstance from '../api/axiosInstance';
import { LoginRequest, LoginForm } from '../types/login';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import AlertDialog from '../components/AlertDialog';
import { Help } from '@mui/icons-material';

interface Props {
    open: boolean;
    onClose: () => void;
    calendarId: string;
}

export default function Login() {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        memberId: '',
        password: '',
    });

    const changeLoginForm = (key: keyof LoginForm, value: any) => {
        setLoginForm({ ...loginForm, [key]: value });
    };

    const navigate = useNavigate();

    const [openAlertDialog, setOpenAlertDialog] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const [idError, setIdError] = useState('');

    const [passwordError, setPasswordError] = useState('');

    const check = () => {
        if (loginForm.memberId === '') {
            setIdError('Idは必ず入力してください');
            return false;
        }

        if (loginForm.password === '') {
            setPasswordError('パスワードは必ず入力してください');
            return false;
        }
        return true;
    };

    const login = async () => {
        const checkFlg = check();

        if (!checkFlg) {
            return;
        }

        const loginData: LoginRequest = {
            memberId: loginForm.memberId,
            password: loginForm.password,
        };

        try {
            const response = await axiosInstance.post(`http://localhost:8080/api/auth/login`, loginData);

            const token = response.data.token;

            localStorage.setItem('token', token);

            const pendingToken = localStorage.getItem('pendingInviteToken');

            if (pendingToken) {
                localStorage.removeItem('pendingInviteToken');
                await axiosInstance.post('/invitation/invite/accept', { token: pendingToken });
            }
            navigate(`/`);
        } catch (err: any) {
            if (err.response?.status === 401) {
                setErrorMessage(err.response.data.message);
                setOpenAlertDialog(true);
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
                        ログイン
                    </Typography>
                    <TextField
                        label="Id"
                        fullWidth
                        margin="normal"
                        value={loginForm.memberId}
                        error={idError !== ''}
                        helperText={idError}
                        onChange={(e) => {
                            setIdError('');
                            changeLoginForm('memberId', e.target.value);
                        }}
                    />
                    <TextField
                        label="パスワード"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={loginForm.password}
                        error={passwordError !== ''}
                        helperText={passwordError}
                        onChange={(e) => {
                            setPasswordError('');
                            changeLoginForm('password', e.target.value);
                        }}
                    />

                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        <Button onClick={login} variant="contained" color="primary" fullWidth>
                            ログイン
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => navigate('/registerMember')}
                        >
                            新規登録
                        </Button>
                    </Box>

                    <Box mt={2} textAlign="center">
                        <Link href="#" underline="hover" sx={{ mx: 1 }}>
                            IDをお忘れの方
                        </Link>
                        |
                        <Link component={RouterLink} to="/find-password" underline="hover" sx={{ mx: 1 }}>
                            パスワードをお忘れの方
                        </Link>
                    </Box>
                </Paper>
            </Box>
            <AlertDialog open={openAlertDialog} onClose={() => setOpenAlertDialog(false)} errorMessage={errorMessage} />
        </LocalizationProvider>
    );
}
