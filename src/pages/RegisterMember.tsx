import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MESSAGES } from '../constants/messages';
import {
    Dialog,
    TextField,
    Box,
    Button,
    Typography,
    Divider,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosInstance from '../api/axiosInstance';
import { MemberRequest, MemberResponse, MemberForm } from '../types/member';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = z
    .object({
        memberId: z.string().min(1, MESSAGES.REQUIRED_ID),
        password: z.string().min(6, MESSAGES.PASSWORD_MIN),
        confirmPassword: z.string(),
        name: z.string().min(1, MESSAGES.REQUIRED_NAME),
        email: z.string().email(MESSAGES.EMAIL_INVALID),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: MESSAGES.PASSWORD_MISMATCH,
        path: ['confirmPassword'],
    });

export default function RegisterMember() {
    const [successOpen, setSuccessOpen] = useState(false);

    const navigate = useNavigate();

    const clickCancel = () => {
        navigate('/login');
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const registerMember = async (data: any) => {
        try {
            await axiosInstance.post('/member', data);
            setSuccessOpen(true);
        } catch (err) {
            console.error('등록 실패', err);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
                onSubmit={handleSubmit(registerMember)}
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
                    新規登録
                </Typography>
                <Divider />
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        Id
                    </Box>
                    <TextField fullWidth size="small" {...register('memberId')} />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        パスワード
                    </Box>
                    <TextField fullWidth type="password" size="small" {...register('password')} />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        パスワード（確認）
                    </Box>
                    <TextField fullWidth type="password" size="small" {...register('confirmPassword')} />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        名前
                    </Box>
                    <TextField fullWidth size="small" {...register('name')} />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        メールアドレス
                    </Box>
                    <TextField fullWidth size="small" {...register('email')} />
                </Box>

                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        color="info"
                        sx={{ width: '200px', fontSize: '16px', padding: '10px' }}
                    >
                        登録
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        size="large"
                        color="info"
                        sx={{ width: '200px', fontSize: '16px', padding: '10px' }}
                        onClick={clickCancel}
                    >
                        取消
                    </Button>
                </Box>
            </form>
            <Dialog open={successOpen}>
                <DialogTitle>회원가입 완료</DialogTitle>
                <DialogContent>성공적으로 가입되었습니다. 로그인해주세요.</DialogContent>
                <DialogActions>
                    <Button onClick={() => navigate('/login')} variant="contained"></Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}
