import { FiUsers, FiAward, FiActivity, FiStar } from 'react-icons/fi';

export const pageContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

export const pageItemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

export const pageLogoVariant = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    },
    hover: {
        scale: 1.1,
        rotate: 5,
        transition: {
            duration: 0.3,
            ease: 'easeInOut'
        }
    }
};

export const pageStatsData = (loading: boolean, count: number) => [
    { icon: <FiUsers />, label: 'Members', value: loading ? '...' : `${count}` },
    { icon: <FiAward />, label: 'Guild Level', value: '22' },
    { icon: <FiActivity />, label: 'Active Player', value: '20-30' },
    { icon: <FiStar />, label: 'Server', value: 'Taion' }
];

export const pageQuickLinksData = [
    { name: 'Member List', path: '/member' },
    { name: 'Guild War', path: '/position' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Discord', path: 'https://discord.gg/mYREQ3kdus' }
];