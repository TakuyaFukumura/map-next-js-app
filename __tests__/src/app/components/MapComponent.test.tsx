/**
 * MapComponent コンポーネントのテスト
 *
 * このテストファイルは、src/app/components/MapComponent.tsxの機能をテストします。
 */

import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import MapComponent from '@/app/components/MapComponent';

// react-leaflet と leaflet のモック
jest.mock('react-leaflet', () => ({
    MapContainer: ({children}: { children: React.ReactNode }) => (
        <div data-testid="map-container">{children}</div>
    ),
    useMap: jest.fn(() => ({setView: jest.fn()})),
    TileLayer: () => <div data-testid="tile-layer"/>,
    Marker: ({children}: { children: React.ReactNode }) => (
        <div data-testid="marker">{children}</div>
    ),
    Popup: ({children}: { children: React.ReactNode }) => (
        <div data-testid="popup">{children}</div>
    ),
}));

jest.mock('leaflet', () => ({
    Icon: {
        Default: {
            prototype: {},
            mergeOptions: jest.fn(),
        },
    },
}));

describe('MapComponent', () => {
    it('マップコンテナが表示される', () => {
        render(<MapComponent/>);
        expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    it('タイルレイヤーが表示される', () => {
        render(<MapComponent/>);
        expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
    });

    it('マーカーが表示される', () => {
        render(<MapComponent/>);
        expect(screen.getByTestId('marker')).toBeInTheDocument();
    });

    it('ポップアップに東京の文字が含まれる', () => {
        render(<MapComponent/>);
        expect(screen.getByTestId('popup')).toHaveTextContent('東京');
    });

    it('現在地ボタンが位置情報取得後に地図を移動する', async () => {
        const setView = jest.fn();
        jest.mocked(jest.requireMock('react-leaflet').useMap).mockReturnValue({setView});
        const getCurrentPosition = jest.fn((success: PositionCallback) => {
            success({
                coords: {latitude: 35.68, longitude: 139.7},
            } as GeolocationPosition);
        });
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            value: {getCurrentPosition},
        });

        render(<MapComponent/>);
        fireEvent.click(screen.getByRole('button', {name: '現在地を表示'}));

        await waitFor(() => expect(setView).toHaveBeenCalledWith([35.68, 139.7], 13));
    });

    it('現在地を取得できない場合にエラーを表示する', async () => {
        const getCurrentPosition = jest.fn((_: PositionCallback, failure: PositionErrorCallback) => {
            failure({code: 1, message: 'permission denied'} as GeolocationPositionError);
        });
        Object.defineProperty(navigator, 'geolocation', {
            configurable: true,
            value: {getCurrentPosition},
        });

        render(<MapComponent/>);
        fireEvent.click(screen.getByRole('button', {name: '現在地を表示'}));

        expect(await screen.findByRole('status')).toHaveTextContent('現在地を取得できませんでした');
    });
});
