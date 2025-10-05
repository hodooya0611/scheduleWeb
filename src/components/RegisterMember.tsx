import React, { useState } from 'react';
import { useEffect } from 'react';
import { TextField, Box, Button, Typography, Divider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { MemberRequest, MemberResponse, MemberForm } from '../types/member';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RegisterMember() {
    const [memberForm, setMemberForm] = useState<MemberForm>({
        memberId: '',
        password: '',
        name: '',
        email: '',
    });

    const changeMemberForm = (key: keyof MemberForm, value: any) => {
        setMemberForm({ ...memberForm, [key]: value });
    };

    const navigate = useNavigate();
    const location = useLocation();

    const clickCancel = () => {
        navigate('/'); // 홈으로 이동
    };

    const registerMember = async (e: React.FormEvent) => {
        e.preventDefault();
        const memberData: MemberRequest = {
            memberId: memberForm.memberId,
            password: memberForm.password,
            name: memberForm.name,
            email: memberForm.email,
        };

        try {
            await axios.post('http://localhost:8080/api/member', memberData);
        } catch (err) {
            console.error('등록 실패', err);
        }
    };

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
                    회원가입
                </Typography>
                <Divider />
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        아이디
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        value={memberForm.memberId}
                        onChange={(e) => changeMemberForm('memberId', e.target.value)}
                    />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        비밀번호
                    </Box>
                    <TextField
                        fullWidth
                        type="password"
                        size="small"
                        value={memberForm.password}
                        onChange={(e) => changeMemberForm('password', e.target.value)}
                    />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        비밀번호 확인
                    </Box>
                    <TextField fullWidth type="password" size="small" />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        이름
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        value={memberForm.name}
                        onChange={(e) => changeMemberForm('name', e.target.value)}
                    />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box width="150px" textAlign="left">
                        이메일
                    </Box>
                    <TextField
                        fullWidth
                        size="small"
                        value={memberForm.email}
                        onChange={(e) => changeMemberForm('email', e.target.value)}
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
                        가입하기
                    </Button>
                </Box>
            </form>
        </LocalizationProvider>
    );
}
