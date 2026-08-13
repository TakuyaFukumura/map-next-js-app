import type {Metadata} from "next";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import {DarkModeProvider} from "./components/DarkModeProvider";
import Header from "./components/Header";
import React from "react";

export const metadata: Metadata = {
    title: "シンプルマップアプリ",
    description: "OpenStreetMapを使用したシンプルなマップアプリケーション",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
        <body className="antialiased">
        <DarkModeProvider>
            <Header/>
            {children}
        </DarkModeProvider>
        </body>
        </html>
    );
}
