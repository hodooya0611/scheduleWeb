import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import React, { useRef, useState } from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '400px',
};

const center = {
    lat: 35.6895, // 도쿄 중심
    lng: 139.6917,
};

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function GoogleMapDialog({ open, onClose }: Props) {
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

    const handlePlacesChanged = () => {
        const places = searchBoxRef.current?.getPlaces();
        if (places && places.length > 0) {
            const location = places[0].geometry?.location;
            if (location) {
                setMarkerPosition({ lat: location.lat(), lng: location.lng() });
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                장소 선택
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                    <StandaloneSearchBox
                        onLoad={(ref) => (searchBoxRef.current = ref)}
                        onPlacesChanged={handlePlacesChanged}
                    >
                        <input
                            type="text"
                            placeholder="장소 검색"
                            style={{ boxSizing: 'border-box', width: '100%', padding: '8px', marginBottom: '8px' }}
                        />
                    </StandaloneSearchBox>
                    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13}>
                        {/* 나중에 Marker나 Place 선택 기능 추가 */}
                    </GoogleMap>
            </DialogContent>
        </Dialog>
    );
}
