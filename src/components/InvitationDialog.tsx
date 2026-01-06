import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    TextField,
    Box,
    Typography,
    Divider,
} from '@mui/material';
import { BorderAll } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function ScheduleDialog({ open, onClose }: Props) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                특정 사용자와 공유
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField fullWidth size="small" placeholder="이메일을 입력하세요" type="email" />
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant="contained" onClick={onClose} color="success">
                    취소
                </Button>
                <Button variant="contained" color="success">
                    보내기
                </Button>
            </DialogActions>
        </Dialog>
    );
}
