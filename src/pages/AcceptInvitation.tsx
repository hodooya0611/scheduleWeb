import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function AcceptInvitaion() {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    useEffect (() => {

        const token = searchParams.get('token');
        if(!token) return;

        const jwt = localStorage.getItem('token');

        if(!jwt) {
            localStorage.setItem('pendingInviteToken',token);
            navigate('/login');
        } else {
            acceptInvitation(token);
        }

    },[]);

    const acceptInvitation = async(token: string) => {
        try {
            await axiosInstance.post('/invitation/invite/accept', {token});
            navigate('/');
        } catch(err) {
            console.log("초대수락실패",err);
            navigate('/');
        }
    };

    return <p>초대 처리 중...</p>
}