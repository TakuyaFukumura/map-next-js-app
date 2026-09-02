'use client';

import dynamic from 'next/dynamic';

// SSR無効でMapComponentを読み込む（LeafletはブラウザAPIに依存するため）
const MapComponent = dynamic(() => import('./components/MapComponent'), {ssr: false});

export default function Home() {
    return (
        <div className="flex h-[calc(100dvh-4rem)] min-h-[calc(100vh-4rem)] flex-col">
            <div className="min-h-0 flex-1">
                <MapComponent/>
            </div>
        </div>
    );
}
