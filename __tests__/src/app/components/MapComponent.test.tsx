/**
 * MapComponent コンポーネントのテスト
 *
 * このテストファイルは、src/app/components/MapComponent.tsxの機能をテストします。
 */

import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

// react-leaflet と leaflet のモック
jest.mock('react-leaflet', () => ({
    MapContainer: ({children}: {children: React.ReactNode}) => (
        <div data-testid="map-container">{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({children}: {children: React.ReactNode}) => (
        <div data-testid="marker">{children}</div>
    ),
    Popup: ({children}: {children: React.ReactNode}) => (
        <div data-testid="popup">{children}</div>
    ),
}));

jest.mock('leaflet/dist/leaflet.css', () => ({}));

jest.mock('leaflet', () => ({
    Icon: {
        Default: {
            prototype: {},
            mergeOptions: jest.fn(),
        },
    },
}));

import MapComponent from '@/app/components/MapComponent';

describe('MapComponent', () => {
    it('マップコンテナが表示される', () => {
        render(<MapComponent />);
        expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    it('タイルレイヤーが表示される', () => {
        render(<MapComponent />);
        expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    });

    it('マーカーが表示される', () => {
        render(<MapComponent />);
        expect(screen.getByTestId('marker')).toBeInTheDocument();
    });

    it('ポップアップに東京の文字が含まれる', () => {
        render(<MapComponent />);
        expect(screen.getByTestId('popup')).toHaveTextContent('東京');
    });
});
