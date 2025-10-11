import React, { useState } from 'react';
import { useEffect } from 'react';
import {
    TextField,
    Box,
    Button,
    FormControlLabel,
    Switch,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Checkbox,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';
import { ScheduleRequest, ScheduleResponse, ScheduleForm, AlarmOption } from '../types/schedule';
import { useNavigate, useLocation } from 'react-router-dom';
import GoogleMapDialog from './GoogleMapDialog';

export default function RegisterSchedule() {
    const [open, setOpen] = useState(false);

    const openGooleMap = () => setOpen(true);
    const closeGooleMap = () => setOpen(false);

    const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
        title: '',
        place: '',
        content: '',
        startDate: dayjs(),
        startTime: dayjs(),
        endDate: dayjs(),
        endTime: dayjs(),
        allDay: false,
        alarmEnabled: false,
        alarmTimeOption: '5분전',
        customAlarmDate: dayjs(),
        customAlarmTime: dayjs(),
    });

    const changeScheduleForm = (key: keyof ScheduleForm, value: any) => {
        setScheduleForm({ ...scheduleForm, [key]: value });
    };

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const scheduleId = searchParams.get('id');
    const mode = searchParams.get('mode') || 'create';

    useEffect(() => {
        if (mode === 'view' && scheduleId) {
            axios
                .get(`http://localhost:8080/api/schedules/view/${scheduleId}`)
                .then((res) => {
                    const data = res.data;
                    setScheduleForm({
                        title: data.title,
                        place: data.place,
                        content: data.content,
                        startDate: dayjs(data.startDate),
                        endDate: dayjs(data.endDate),
                        startTime: data.startTime ? dayjs(data.startTime, 'HH:mm') : null,
                        endTime: data.endTime ? dayjs(data.endTime, 'HH:mm') : null,
                        allDay: data.allDay,
                        alarmEnabled: data.alarmEnabled,
                        alarmTimeOption: data.alarmOption || '5분전',
                        customAlarmDate: data.alarmDate ? dayjs(data.alarmDate) : null,
                        customAlarmTime: data.alarmTime ? dayjs(data.alarmTime, 'HH:mm') : null,
                    });
                })
                .catch((err) => console.error('스케줄 조회 실패', err));
        }
    }, [mode, scheduleId]);

    const clickCancel = () => {
        navigate('/'); // 홈으로 이동
    };

    const registerOrUpdateSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        const scheduleData: ScheduleRequest = {
            title: scheduleForm.title,
            content: scheduleForm.content,
            startDate: scheduleForm.startDate?.format('YYYY-MM-DD') || '',
            startTime: scheduleForm.allDay ? '' : scheduleForm.startTime?.format('HH:mm') || '',
            endDate: scheduleForm.endDate?.format('YYYY-MM-DD') || '',
            endTime: scheduleForm.allDay ? '' : scheduleForm.endTime?.format('HH:mm') || '',
            allDay: scheduleForm.allDay,
            alarmEnabled: scheduleForm.alarmEnabled,
            alarmOption: scheduleForm.alarmTimeOption,
            alarmDate:
                scheduleForm.alarmTimeOption === '직접입력' ? scheduleForm.customAlarmDate?.format('YYYY-MM-DD') : null,
            alarmTime:
                scheduleForm.alarmTimeOption === '직접입력' ? scheduleForm.customAlarmTime?.format('HH:mm') : null,
        };

        try {
            if (mode === 'view' && scheduleId) {
                // 수정 모드
                const response = await axios.post(
                    `http://localhost:8080/api/schedules/update/${scheduleId}`,
                    scheduleData
                );
                if (window.confirm('수정되었습니다. 홈으로 이동하시겠습니까?')) {
                    navigate('/');
                }
            } else {
                // 등록 모드
                const response = await axios.post('http://localhost:8080/api/schedules', scheduleData);
                if (window.confirm('등록되었습니다. 홈으로 이동하시겠습니까?')) {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('등록 실패', err);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
                onSubmit={registerOrUpdateSchedule}
                style={{
                    width: '70%', // 화면 너비의 70%
                    maxWidth: 800, // 너무 커지지 않게 제한
                    minWidth: 400, // 너무 작아지면 보기 힘듦
                    margin: '0 auto', // 좌우 가운데 정렬
                    marginTop: '32px', // 위쪽 여백
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px', // 요소 사이 간격
                }}
            >
                <TextField
                    label="제목"
                    fullWidth
                    margin="normal"
                    value={scheduleForm.title}
                    onChange={(e) => changeScheduleForm('title', e.target.value)}
                />
                <TextField label="장소" fullWidth multiline margin="normal" value={scheduleForm.place} />
                <Button variant="outlined" onClick={openGooleMap}>
                    지도에서 선택
                </Button>

                <GoogleMapDialog open={open} onClose={closeGooleMap} />

                <Box display="flex" gap={2} mt={2} alignItems="center">
                    <DatePicker
                        label="시작일"
                        value={scheduleForm.startDate}
                        onChange={(newValue) => changeScheduleForm('startDate', newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                        sx={{ flex: 1 }}
                    />
                    <TimePicker
                        label="시작시간"
                        value={scheduleForm.startTime || null}
                        onChange={(newValue) => changeScheduleForm('startTime', newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                        disabled={scheduleForm.allDay}
                        sx={{ flex: 1 }}
                    />
                    <DatePicker
                        label="종료일"
                        value={scheduleForm.endDate}
                        onChange={(newValue) => changeScheduleForm('endDate', newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                        sx={{ flex: 1 }}
                    />
                    <TimePicker
                        label="종료시간"
                        value={scheduleForm.endTime || null}
                        onChange={(newValue) => changeScheduleForm('endTime', newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                        disabled={scheduleForm.allDay}
                        sx={{ flex: 1 }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={scheduleForm.allDay}
                                onChange={(e) => changeScheduleForm('allDay', e.target.checked)}
                            />
                        }
                        label="종일"
                        sx={{ flex: '0 0 80px', justifyContent: 'center' }}
                    />
                </Box>

                <TextField
                    label="내용"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    value={scheduleForm.content}
                    onChange={(e) => changeScheduleForm('content', e.target.value)}
                />

                <Box mt={2}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={scheduleForm.alarmEnabled}
                                onChange={(e) => changeScheduleForm('alarmEnabled', e.target.checked)}
                            />
                        }
                        label="알람"
                    />

                    {scheduleForm.alarmEnabled && (
                        <Box mt={1} display="flex" flexDirection="column" gap={2}>
                            <FormControl fullWidth>
                                <InputLabel>알람 시간</InputLabel>
                                <Select
                                    value={scheduleForm.alarmTimeOption}
                                    label="알람 시간"
                                    onChange={(e) => changeScheduleForm('alarmTimeOption', e.target.value)}
                                >
                                    <MenuItem value="5분전">5분전</MenuItem>
                                    <MenuItem value="10분전">10분전</MenuItem>
                                    <MenuItem value="15분전">15분전</MenuItem>
                                    <MenuItem value="1시간전">1시간전</MenuItem>
                                    <MenuItem value="1일전">1일전</MenuItem>
                                    <MenuItem value="1주일전">1주일전</MenuItem>
                                    <MenuItem value="직접입력">직접입력</MenuItem>
                                </Select>
                            </FormControl>

                            {scheduleForm.alarmTimeOption === '직접입력' && (
                                <Box display="flex" gap={2} mt={1}>
                                    <DatePicker
                                        label="알람 날짜"
                                        value={scheduleForm.customAlarmDate}
                                        onChange={(newValue) => changeScheduleForm('customAlarmDate', newValue)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                    <TimePicker
                                        label="알람 시간"
                                        value={scheduleForm.customAlarmTime || null}
                                        onChange={(newValue) => changeScheduleForm('customAlarmTime', newValue)}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                    <Button type="submit" variant="contained" color="primary">
                        저장하기
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={clickCancel}>
                        취소하기
                    </Button>
                </Box>
            </form>
        </LocalizationProvider>
    );
}
