'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface QueueItem {
    character: string;
    note?: string;
}

interface ItemDrop {
    name: string;
    queues: QueueItem[];
}

interface Boss {
    id: number;
    name: string;
    items: ItemDrop[];
}

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

export default function BossQueue() {
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

    const getTotalQueues = (bosses: Boss[]): number => {
        return bosses.reduce((total, boss) => {
            const bossQueues = boss.items.reduce((itemTotal, item) => {
                return itemTotal + item.queues.length;
            }, 0);
            return total + bossQueues;
        }, 0);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-white">กำลังโหลด...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-500">เกิดข้อผิดพลาด: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-64px)] flex flex-col" // ปรับความสูงตาม navbar
        >
            {/* Header */}
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-white flex items-baseline gap-3">
                    คิวของบอสกิลด์
                    <span className="text-lg text-gray-400">
                        (ลงคิวแล้ว {getTotalQueues(bosses)} คน)
                    </span>
                </h1>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 min-h-0 mb-5"> {/* min-h-0 สำคัญมากสำหรับ flex container */}
                <div className="container mx-auto px-4 h-full">
                    <div className="h-full overflow-auto">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6"
                        >
                            {bosses.map((boss) => (
                                <motion.div
                                    key={boss.id}
                                    variants={item}
                                    className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/90 transition-colors"
                                    layout
                                >
                                    <motion.button
                                        className="w-full"
                                        onClick={() => toggleBoss(boss.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="relative w-full h-[62px]">
                                            <Image
                                                src={`/assets/boss/${boss.name.toLowerCase().replace(' ', '-')}-banner.webp`}
                                                alt={boss.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                            <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center">
                                                <span className="text-white font-semibold">
                                                    {boss.id}. {boss.name}
                                                </span>
                                                <div className="flex items-center">
                                                    {boss.items.some(item => item.queues.length > 0) && (
                                                        <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500/20 text-orange-400">
                                                            {boss.items.reduce((total, item) => total + item.queues.length, 0)} คิว
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.button>

                                    <motion.div
                                        initial={false}
                                        animate={{ height: expandedBoss === boss.id ? "auto" : 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 space-y-4">
                                        {boss.items.map((item, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="flex gap-4 items-start">
                                                    <div className="relative w-[50px] h-[50px] flex-shrink-0 bg-gradient-to-b from-[#21172a] via-[#311f3c] to-[#643e7b] border-2 border-[#ae8b7b]">
                                                        <Image
                                                            src={`/assets/boss-items/${boss.id}-${idx}.png`}
                                                            alt={item.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-blue-400 font-medium">
                                                            {item.name}
                                                            {item.queues.length > 0 && (
                                                                <span className="ml-2 text-sm text-orange-400">
                                                                    ({item.queues.length} คิว)
                                                                </span>
                                                            )}
                                                        </h3>
                                                        {item.queues.length > 0 ? (
                                                            <div className="space-y-1 pl-4 border-l-2 border-gray-700 mt-2">
                                                                {item.queues.map((queue, qIdx) => (
                                                                    <div
                                                                        key={qIdx}
                                                                        className="text-sm text-gray-300 flex justify-between items-center"
                                                                    >
                                                                        <span className="font-medium">
                                                                            {queue.character}
                                                                        </span>
                                                                        <span>
                                                                            {queue.note && (
                                                                                <span className="ml-2 text-red-400">{queue.note}</span>
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-sm text-gray-500 pl-4 mt-2">ไม่มีคิว</div>
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
            </div>
        </motion.div>
    );
}