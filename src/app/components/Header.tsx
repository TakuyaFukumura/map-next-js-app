'use client';

import {useDarkMode} from './DarkModeProvider';
import {useState} from 'react';

const HELP_DESCRIPTION = 'OpenStreetMapの地図を表示し、東京の位置を確認できます。右隣のボタンでライトモードとダークモードを切り替えられます。';

export default function Header() {
    const {theme, setTheme, hydrated} = useDarkMode();
    const [isHelpVisible, setIsHelpVisible] = useState(false);
    const displayTheme = hydrated ? theme : 'light';

    const handleThemeToggle = () => {
        if (displayTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const getThemeIcon = () => {
        if (displayTheme === 'light') {
            return '☀️';
        } else {
            return '🌙';
        }
    };

    const getThemeLabel = () => {
        if (displayTheme === 'light') {
            return 'ライトモード';
        } else {
            return 'ダークモード';
        }
    };

    return (
        <header
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b
            border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            map
                        </h1>
                    </div>

                    <div className="flex items-center gap-1">
                        <div
                            className="relative"
                            onMouseEnter={() => setIsHelpVisible(true)}
                            onMouseLeave={() => setIsHelpVisible(false)}
                            onFocus={() => setIsHelpVisible(true)}
                            onBlur={() => setIsHelpVisible(false)}
                        >
                            <button
                                type="button"
                                aria-label="このアプリについて"
                                aria-describedby="map-help-tooltip"
                                title={HELP_DESCRIPTION}
                                className="flex h-10 w-10 items-center justify-center rounded-full
                                text-sm font-semibold text-gray-700 transition-colors duration-200
                                hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2
                                focus-visible:outline-gray-500 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                ?
                            </button>
                            <div
                                id="map-help-tooltip"
                                role="tooltip"
                                className={`pointer-events-none absolute right-0 top-full z-50 mt-2 w-64
                                rounded-lg bg-gray-900 px-3 py-2 text-left text-sm text-white
                                shadow-lg transition-opacity dark:bg-gray-700
                                ${isHelpVisible ? 'visible opacity-100' : 'invisible opacity-0'}`}
                            >
                                {HELP_DESCRIPTION}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleThemeToggle}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium
                            text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700
                            rounded-lg transition-colors duration-200"
                            aria-label={`現在: ${getThemeLabel()}`}
                            title={`現在: ${getThemeLabel()}`}
                        >
                            <span className="text-lg">{getThemeIcon()}</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
