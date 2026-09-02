'use client';

import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {useMap} from 'react-leaflet';
import L from 'leaflet';
import {useEffect, useState} from 'react';

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

function LocationControl() {
    const map = useMap();
    const [isLocating, setIsLocating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLocate = () => {
        if (!navigator.geolocation) {
            setError('このブラウザでは現在地を取得できません。');
            return;
        }

        setIsLocating(true);
        setError(null);
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                map.setView([coords.latitude, coords.longitude], DEFAULT_ZOOM);
                setIsLocating(false);
            },
            () => {
                setError('現在地を取得できませんでした。位置情報の利用を許可してください。');
                setIsLocating(false);
            },
            {enableHighAccuracy: true, timeout: 10000},
        );
    };

    return (
        <div className="absolute right-3 top-3 z-[1000] flex flex-col items-end gap-2">
            <button
                type="button"
                onClick={handleLocate}
                disabled={isLocating}
                aria-label="現在地を表示"
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow
                transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-gray-500 disabled:cursor-wait disabled:opacity-60"
            >
                {isLocating ? '取得中…' : '現在地'}
            </button>
            {error && (
                <p role="status" className="max-w-64 rounded-lg bg-white px-3 py-2 text-sm text-red-700 shadow">
                    {error}
                </p>
            )}
        </div>
    );
}

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
            <LocationControl/>
            <Marker position={DEFAULT_CENTER}>
                <Popup>
                    東京 🗼
                </Popup>
            </Marker>
        </MapContainer>
    );
}
