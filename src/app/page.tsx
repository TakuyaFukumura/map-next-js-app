'use client';

import dynamic from 'next/dynamic';

// SSR無効でMapComponentを読み込む（LeafletはブラウザAPIに依存するため）
const MapComponent = dynamic(() => import('./components/MapComponent'), {ssr: false});

export default function Home() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
            <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    🗺️ シンプルマップ
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    OpenStreetMapを使用したシンプルなマップアプリです
                </p>
            </div>
            <div className="flex-1">
                <MapComponent/>
            </div>
        </div>
    );
}
