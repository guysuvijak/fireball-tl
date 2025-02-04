'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiUsers, FiAward, FiActivity, FiStar } from 'react-icons/fi';

interface Update {
    id: number;
    title: string;
    date: string;
};

const Index = () => {
    const [ updates, setUpdates ] = useState<Update[]>([]);
    const [ memberCount, setMemberCount ] = useState<number>(0);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const updatesResponse = await fetch('/data/update.json');
                const updatesData = await updatesResponse.json();
                setUpdates(updatesData.updates);
                
                const membersResponse = await fetch('/data/member.json');
                const membersData = await membersResponse.json();
                setMemberCount(membersData.members.length);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
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

    const logoVariants = {
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

    const stats = [
        { icon: <FiUsers />, label: 'Members', value: loading ? '...' : `${memberCount}` },
        { icon: <FiAward />, label: 'Guild Level', value: '22' },
        { icon: <FiActivity />, label: 'Active Player', value: '20-30' },
        { icon: <FiStar />, label: 'Server', value: 'Taion' }
    ];

    const quickLinks = [
        { name: 'Member List', path: '/member' },
        { name: 'Guild War', path: '/position' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Discord', path: 'https://discord.gg/mYREQ3kdus' }
    ];

    return (
        <div className='h-[calc(100vh-64px)] overflow-auto'>
            <motion.div 
                className='flex flex-col w-full bg-gradient-to-b from-gray-900 to-black p-4'
                variants={containerVariants}
                initial='hidden'
                animate='visible'
            >
                {/* Hero Section */}
                <motion.div className='flex flex-col items-center justify-center min-h-[50vh] py-12'>
                    <motion.div
                        className='relative'
                        variants={logoVariants}
                        whileHover='hover'
                    >
                        <div className='relative w-32 h-32 sm:w-40 sm:h-40'>
                            <Image 
                                src='/assets/logo.webp' 
                                alt='fireball-logo' 
                                fill
                                className='rounded-full object-cover shadow-lg shadow-orange-500/20'
                            />
                        </div>
                        <motion.div 
                            className='absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur opacity-30'
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className='mt-8 text-center'
                    >
                        <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-wider'>
                            🔥 F I R E B <span className='text-orange-500'>4</span> L L
                        </h1>
                        <motion.p 
                            className='mt-4 text-gray-400 text-sm sm:text-base md:text-lg'
                            variants={itemVariants}
                        >
                            Together, we burn brighter!
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    variants={itemVariants}
                    className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mt-8 px-4'
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className='bg-gray-800/50 p-4 rounded-lg text-center'
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className='text-orange-500 text-2xl flex justify-center mb-2'>
                                {stat.icon}
                            </div>
                            <div className='text-white font-bold text-xl'>{stat.value}</div>
                            <div className='text-gray-400 text-sm'>{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Quick Links */}
                <motion.div
                    variants={itemVariants}
                    className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto w-full mt-8 px-4'
                >
                    {quickLinks.map((link, index) => (
                        <Link href={link.path} key={index}>
                            <motion.div
                                className='bg-gradient-to-r from-orange-600 to-red-600 p-0.5 rounded-lg'
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className='bg-gray-900 text-white text-center py-3 px-4 rounded-lg'>
                                    {link.name}
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>

                {/* Latest Updates */}
                <motion.div
                    variants={itemVariants}
                    className='max-w-4xl mx-auto w-full mt-8 mb-8 bg-gray-800/50 rounded-lg p-6 px-4'
                >
                    <h2 className='text-white text-xl font-bold mb-4'>Latest Updates</h2>
                    <div className='space-y-3'>
                        {loading ? (
                            <div className='text-gray-400 text-center py-4'>Loading updates...</div>
                        ) : updates.length > 0 ? (
                            updates.map((update) => (
                                <motion.div
                                    key={update.id}
                                    className='flex justify-between items-center border-b border-gray-700 pb-2'
                                    whileHover={{ x: 10 }}
                                >
                                    <span className='text-gray-300'>{update.title}</span>
                                    <span className='text-gray-500 text-sm'>{update.date}</span>
                                </motion.div>
                            ))
                        ) : (
                            <div className='text-gray-400 text-center py-4'>No updates available</div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Index;