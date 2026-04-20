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
    errorMessage: string;
}

export default function AlertDialog({ open, onClose, errorMessage }: Props) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                エラー
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Typography align="center">{errorMessage}</Typography>
            </DialogContent>
            <DialogActions
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button variant="contained" onClick={onClose} color="success">
                    確認
                </Button>
            </DialogActions>
        </Dialog>
    );
}
