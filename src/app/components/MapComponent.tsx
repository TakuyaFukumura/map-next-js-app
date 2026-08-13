'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {useEffect} from 'react';

// Leafletのデフォルトアイコン設定（Next.js環境での対応）
const fixLeafletIcon = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
        iconUrl: '/leaflet/images/marker-icon.png',
        shadowUrl: '/leaflet/images/marker-shadow.png',
    });
};

// 初期表示位置（東京）
const DEFAULT_CENTER: [number, number] = [35.6762, 139.6503];
const DEFAULT_ZOOM = 13;

export default function MapComponent() {
    useEffect(() => {
        fixLeafletIcon();
    }, []);

    return (
        <MapContainer
            center={DEFAULT_CENTER}
            zoom={DEFAULT_ZOOM}
            style={{height: '100%', width: '100%', minHeight: '400px'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={DEFAULT_CENTER}>
                <Popup>
                    東京 🗼
                </Popup>
            </Marker>
        </MapContainer>
    );
}
