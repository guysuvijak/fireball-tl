'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineMenu } from 'react-icons/md';
import { IoMdClose } from 'react-icons/io';

const navItems = [
    { href: '/', label: 'หน้าหลัก' },
    { href: '/member', label: 'รายชื่อสมาชิก' },
    { href: '/boss-queue', label: 'คิวของบอส' },
    { href: '/schedule', label: 'กำหนดการ' },
    { href: '/boss-rule', label: 'กติกาแจกของบอส' },
];

const Navbar = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const pathname = usePathname();

    const navVariants = {
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

    const mobileMenuVariants = {
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

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <motion.nav 
            className='fixed w-full bg-[#3b3b3b96] backdrop-blur-sm z-50'
            initial='hidden'
            animate='visible'
            variants={navVariants}
        >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex-shrink-0'>
                        <Link href='/' className='flex items-center space-x-2'>
                            <div className='relative w-8 h-8'>
                                <Image
                                    src='/assets/logo.png'
                                    alt='FIREB4LL'
                                    fill
                                    className='rounded-full object-cover'
                                />
                            </div>
                            <span className='text-white font-bold text-lg'>FIREB4LL</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {navItems.map((item) => (
                            <motion.div
                                key={item.href}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link 
                                    href={item.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium relative ${
                                        isActive(item.href) 
                                            ? 'text-white' 
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    {isActive(item.href) && (
                                        <motion.div
                                            layoutId='activeTab'
                                            className='absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500'
                                            initial={false}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30
                                            }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden'>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className='text-gray-400 hover:text-white p-2'
                        >
                            {isOpen ? <IoMdClose size={24} /> : <MdOutlineMenu size={24} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial='closed'
                        animate='open'
                        exit='closed'
                        variants={mobileMenuVariants}
                        className='md:hidden'
                    >
                        <div className='px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm'>
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={item.href}
                                        className='text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;