import React, { useState } from 'react';
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
import { InvitationRequest, InvitationResponse, InvitationForm } from '../types/invitation';

interface Props {
    open: boolean;
    onClose: () => void;
    calendarId: string;
}

export default function InvitationDialog({ open, onClose, calendarId }: Props) {
    const [invitaionForm, setInvitaionForm] = useState<InvitationForm>({
        email: '',
    });

    const sendInvitation = async (e: React.FormEvent) => {
        e.preventDefault();
        const invitionData: InvitationRequest = {
            calendarId: Number(calendarId),
            email: invitaionForm.email,
        };

        try {
            await axiosInstance.post('/invitation/send-invitation-mail', invitionData);
        } catch (err) {
            console.error('등록 실패', err);
        }
    };

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
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="이메일을 입력하세요"
                        type="email"
                        value={invitaionForm.email}
                        onChange={(e) =>
                            setInvitaionForm({
                                ...invitaionForm,
                                email: e.target.value,
                            })
                        }
                    />
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
                <Button variant="contained" color="success" onClick={sendInvitation}>
                    보내기
                </Button>
            </DialogActions>
        </Dialog>
    );
}
