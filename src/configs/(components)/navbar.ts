export const navbarData = [
    { href: '/', label: 'หน้าหลัก' },
    { href: '/member', label: 'รายชื่อสมาชิก' },
    { href: '/boss-queue', label: 'คิวของบอส' },
    { href: '/schedule', label: 'กำหนดการ' },
    { href: '/boss-rule', label: 'กติกาแจกของบอส' },
];

export const navbarVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
};

export const navbarMobileVariant = {
    closed: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    },
    open: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2
        }
    }
};