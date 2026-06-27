import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, IconButton } from '@mui/material';
import { BorderAll } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

interface ScheduleDialogProps {
    open: boolean;
    onClose: () => void;
    schedule: any | null;
    onDetail?: (id: number) => void;
    onDeleted?: () => void;
}

export default function ScheduleDialog({ open, onClose, schedule, onDetail, onDeleted }: ScheduleDialogProps) {
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/schedules/${schedule.id}`);
            setConfirmOpen(false);
            onClose();
            onDeleted?.();
        } catch (error) {
            alert('삭제중 오류 발생');
        }
    };

    const [confirmOpen, setConfirmOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {schedule?.title || '제목 없음'}
                    <IconButton aria-label="close" onClick={onClose} sx={{ color: 'grey.500' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>시작일: {schedule?.start}</div>
                    <div>종료일: {schedule?.end}</div>
                </DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
                        삭제
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                            if (schedule?.id) {
                                // 상세보기 모드로 이동
                                navigate(`/register?id=${schedule.id}&mode=view`);
                            }
                        }}
                    >
                        상세보기
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>일정삭제</DialogTitle>
                <DialogContent>정말 삭제하시겠습니까?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>취소</Button>
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        삭제
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
