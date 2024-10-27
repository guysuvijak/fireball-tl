import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'theme-bg-0': 'var(--theme-bg-0)',
                'theme-bg-1': 'var(--theme-bg-1)',
                'theme-bg-2': 'var(--theme-bg-2)',
                'theme-bg-3': 'var(--theme-bg-3)',
                'theme-bg-4': 'var(--theme-bg-4)',
                'theme-border': 'var(--theme-border)',
                'theme-shadow': 'var(--theme-shadow)',
                'theme-title': 'var(--theme-title)',
                'theme-title-1': 'var(--theme-title-1)',
                'theme-subtitle': 'var(--theme-subtitle)',
                'theme-button': 'var(--theme-button)',
                'theme-button-h': 'var(--theme-button-h)',
                'theme-button-t': 'var(--theme-button-t)',
                'theme-button-d': 'var(--theme-button-d)',
                'theme-button-50': 'var(--theme-button-50)',
                'theme-alert': 'var(--theme-alert)',
                'theme-alert-h': 'var(--theme-alert-h)',
                'theme-success': 'var(--theme-success)',
                'theme-success-h': 'var(--theme-success-h)',
                'theme-active': 'var(--theme-active)',
                'theme-active-h': 'var(--theme-active-h)',
                'theme-loader': 'var(--theme-loader)',
                'theme-loader-h': 'var(--theme-loader-h)'
            },
            borderWidth: {
                '1': '1px'
            },
            zIndex: {
                '10': '10',
                '20': '20',
                '30': '30',
                '40': '40',
                '50': '50',
                '60': '60',
                '70': '70',
                '80': '80',
                '90': '90',
                '100': '100',
                '110': '110',
                '120': '120'
            }
        },
    },
    plugins: [],
};

export default config;