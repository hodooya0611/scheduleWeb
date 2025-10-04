import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider, IconButton } from '@mui/material';
import { BorderAll } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ScheduleDialogProps {
    open: boolean;
    onClose: () => void;
    schedule: any | null;
    onDetail?: (id: number) => void;
}

export default function ScheduleDialog({ open, onClose, schedule, onDetail }: ScheduleDialogProps) {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/schedules/${schedule.id}`);
            alert('삭제되었습니다.');
            onClose();
        } catch (error) {
            alert('삭제중 오류 발생');
        }
    };

    const navigate = useNavigate();

    return (
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
                <Button variant="contained" color="error" onClick={handleDelete}>
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
    );
}
