'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { th } from 'date-fns/locale';
import { FaCrown, FaUser, FaRankingStar } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';

interface QueueItem {
    character: string;
    note?: string;
    date: string;
};

interface ItemDrop {
    id: string;
    name: string;
    queues: QueueItem[];
};

interface Boss {
    id: number;
    name: string;
    items: ItemDrop[];
};

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const BossQueue = () => {
    const [ bosses, setBosses ] = useState<Boss[]>([]);
    const [ expandedBoss, setExpandedBoss ] = useState<number | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchBosses = async () => {
            try {
                const response = await fetch('/data/queue.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch boss data');
                }
                const data = await response.json();
                setBosses(data.bosses);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchBosses();
    }, []);

    const toggleBoss = (bossId: number) => {
        setExpandedBoss(expandedBoss === bossId ? null : bossId);
    };

    const formatQueueDate = (dateStr: string) => {
        if (!dateStr) return '';
        
        try {
            const date = parseISO(dateStr);
            const formattedDate = format(date, 'dd/MM/yyyy');
            const timeAgo = formatDistanceToNow(date, { locale: th, addSuffix: true });
            
            return `จองเมื่อ ${formattedDate}\n(${timeAgo})`;
        } catch (error) {
            return '';
        }
    };

    const getTotalQueues = (bosses: Boss[]): number => {
        return bosses.reduce((total, boss) => {
            const bossQueues = boss.items.reduce((itemTotal, item) => {
                return itemTotal + item.queues.length;
            }, 0);
            return total + bossQueues;
        }, 0);
    };

    const getPopularBosses = (bosses: Boss[]) => {
        const bossQueues = bosses.map(boss => ({
            name: boss.name,
            queueCount: boss.items.reduce((total, item) => total + item.queues.length, 0)
        }));
    
        return bossQueues
            .filter(boss => boss.queueCount > 0)
            .sort((a, b) => b.queueCount - a.queueCount)
            .slice(0, 5);
    };

    if (loading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center items-center h-64'>
                    <div className='text-white'>กำลังโหลด...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center items-center h-64'>
                    <div className='text-red-500'>เกิดข้อผิดพลาด: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='min-h-screen flex flex-col'
        >
            <div className='container mx-auto px-4 py-6 overflow-hidden'>
                <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full'>
                    {/* Main content - 3 columns */}
                    <div className='lg:col-span-3 flex flex-col h-full'>
                        <h1 className='text-3xl font-bold text-white flex items-baseline gap-3'>
                            คิวของบอสกิลด์
                            <span className='text-lg text-gray-400'>
                                (ลงคิวแล้ว {getTotalQueues(bosses)} คน)
                            </span>
                        </h1>

                        {/* เพิ่ม wrapper div สำหรับ scrolling */}
                        <div className='max-h-[calc(100vh-140px)] overflow-y-auto'>
                            <motion.div
                                variants={container}
                                initial='hidden'
                                animate='show'
                                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-6'
                            >
                                {bosses.map((boss) => (
                                    <motion.div
                                        key={boss.id}
                                        variants={item}
                                        className='bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/90 transition-colors'
                                        layout
                                    >
                                        <motion.button
                                            className='w-full'
                                            onClick={() => toggleBoss(boss.id)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className='relative w-full h-[62px]'>
                                                <Image
                                                    src={`/assets/boss/${boss.name.toLowerCase().replace(' ', '-')}-banner.webp`}
                                                    alt={boss.name}
                                                    fill
                                                    className='object-cover'
                                                />
                                                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent' />
                                                <div className='absolute bottom-2 left-4 right-4 flex justify-between items-center'>
                                                    <span className='text-white font-semibold'>
                                                        {boss.id}. {boss.name}
                                                    </span>
                                                    <div className='flex items-center'>
                                                        {boss.items.some(item => item.queues.length > 0) && (
                                                            <span className='px-2 py-0.5 text-xs rounded-full bg-orange-500/20 text-orange-400'>
                                                                {boss.items.reduce((total, item) => total + item.queues.length, 0)} คิว
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>

                                        <motion.div
                                            initial={false}
                                            animate={{ height: expandedBoss === boss.id ? 'auto' : 0 }}
                                            className='overflow-hidden'
                                        >
                                            <div className='p-4 space-y-4'>
                                            {boss.items.map((item, idx) => (
                                                <div key={idx} className='space-y-2'>
                                                    <div className='flex gap-4 items-start'>
                                                        <div className='relative w-[50px] h-[50px] flex-shrink-0 bg-gradient-to-b from-[#21172a] via-[#311f3c] to-[#643e7b] border-2 border-[#ae8b7b]'>
                                                            <Image
                                                                src={`/assets/boss-items/${boss.id}-${idx}.webp`}
                                                                alt={item.name}
                                                                fill
                                                                className='object-contain'
                                                            />
                                                        </div>
                                                        <div className='flex-1'>
                                                            <h2 className='text-blue-400 font-medium'>
                                                                <span className='mr-1 text-gray-300'>{item.id}</span>
                                                                {item.name}
                                                                {item.queues.length > 0 && (
                                                                    <span className='ml-2 text-sm text-orange-400'>
                                                                        ({item.queues.length} คิว)
                                                                    </span>
                                                                )}
                                                            </h2>
                                                            {item.queues.length > 0 ? (
                                                                <div className='space-y-1 pl-4 border-l-2 border-gray-700 mt-2'>
                                                                    {item.queues.map((queue, qIdx) => (
                                                                        <div
                                                                            key={qIdx}
                                                                            className='text-sm text-gray-300 flex justify-between items-center'
                                                                        >
                                                                            <span 
                                                                                className={`font-medium flex items-center gap-1 cursor-help ${qIdx === 0 && 'text-yellow-400'}`}
                                                                                data-tooltip-id={`queue-${boss.id}-${item.id}-${qIdx}`}
                                                                                data-tooltip-place='right'
                                                                            >
                                                                                {qIdx === 0 && (
                                                                                    <FaCrown className='w-4 h-4' />
                                                                                )}
                                                                                {queue.character}
                                                                                {queue.date && (
                                                                                    <Tooltip
                                                                                        id={`queue-${boss.id}-${item.id}-${qIdx}`}
                                                                                        className='z-50 max-w-xs whitespace-pre-line bg-gray-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-gray-700'
                                                                                    >
                                                                                        {formatQueueDate(queue.date)}
                                                                                    </Tooltip>
                                                                                )}
                                                                            </span>
                                                                            <span>
                                                                                {queue.note && (
                                                                                    <span className='ml-2 text-red-400'>
                                                                                        {queue.note}
                                                                                    </span>
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className='text-sm text-gray-500 pl-4 mt-2'>ไม่มีคิว</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className='lg:h-full lg:overflow-auto pr-2'>
                        <div className='space-y-6'>
                            {/* Guild Info */}
                            <div className='p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg backdrop-blur-sm border border-purple-500/20 sticky top-0'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <h2 className='text-2xl font-bold text-white tracking-wider'>
                                            🔥 F I R E B <span className='text-orange-500'>4</span> L L
                                        </h2>
                                        <p className='text-purple-400'>Taion Server</p>
                                    </div>
                                    <div className='flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full'>
                                        <FaUser className='w-4 h-4 text-purple-400' />
                                        <span className='text-purple-400'>61</span>
                                    </div>
                                </div>
                                <div className='mt-6 space-y-4'>
                                    <h2 className='text-lg font-semibold text-white flex items-center gap-2'>
                                        <FaCalendarAlt className='w-5 h-5 text-purple-400' />
                                        กำหนดการตีบอส
                                    </h2>
                                    
                                    <div className='space-y-2'>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400'>วันที่ตีบอส</span>
                                            <span className='text-white'>เสาร์, อาทิตย์</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400'>จำนวนที่ตีบอส</span>
                                            <span className='text-white'>3 ตัว, 4 ตัว</span>
                                        </div>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-gray-400'>เวลาที่ตีบอส</span>
                                            <span className='text-white'>20:30น.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Popular Bosses */}
                            <div className='bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm sticky top-[280px]'>
                                <h2 className='text-lg font-semibold text-white flex items-center gap-2 mb-2'>
                                    <FaRankingStar className='w-5 h-5 text-yellow-400' />
                                    บอสยอดนิยม
                                </h2>
                                {getPopularBosses(bosses).map((boss, index) => (
                                    <div key={index} className='flex justify-between items-center mb-2'>
                                        <span className='text-gray-300'>
                                            {index + 1}. {boss.name}
                                        </span>
                                        <span className='px-4 py-1 text-sm rounded-full bg-orange-500/20 text-orange-400'>
                                            {boss.queueCount} คิว
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

export default BossQueue;