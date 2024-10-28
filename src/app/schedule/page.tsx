'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';
import { RiAliensFill } from 'react-icons/ri';

interface Schedule {
    day: string;
    dayInWeek: number; // 0 = Sunday, 3 = Wednesday, 6 = Saturday
    time: string;
    bosses: number;
}

const SCHEDULES: Schedule[] = [
    { day: 'วันพุธ', dayInWeek: 3, time: '20:30', bosses: 2 },
    { day: 'วันเสาร์', dayInWeek: 6, time: '20:30', bosses: 2 },
    { day: 'วันอาทิตย์', dayInWeek: 0, time: '20:30', bosses: 3 },
];

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

function getNextDateTime(dayInWeek: number, timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const now = new Date();
    const result = new Date(now);
    
    result.setHours(hours, minutes, 0, 0);
    
    // Find next occurrence of the day
    const daysUntilNext = (dayInWeek - now.getDay() + 7) % 7;
    result.setDate(result.getDate() + daysUntilNext);
    
    // If today is the day and time has passed, add a week
    if (daysUntilNext === 0 && now > result) {
        result.setDate(result.getDate() + 7);
    }
    
    return result;
}

function useCountdown(targetDate: Date) {
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance > 0) {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return countdown;
}

export default function Schedule() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-64px)] flex flex-col"
        >
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-white">กำหนดการตีบอสกิลด์</h1>
            </div>

            <div className="flex-1 min-h-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="h-full overflow-auto pb-6">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12" // เพิ่ม gap
                        >
                            {SCHEDULES.map((schedule) => {
                                const nextDate = getNextDateTime(schedule.dayInWeek, schedule.time);
                                const countdown = useCountdown(nextDate);
                                
                                return (
                                    <motion.div
                                        key={schedule.day}
                                        variants={item}
                                        className="bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 rounded-xl p-8" // เพิ่ม padding และปรับ rounded
                                        style={{
                                            boxShadow: '0 0 20px rgba(28, 32, 230, 0.2)', // เพิ่ม glow effect
                                        }}
                                    >
                                        <div className="text-center space-y-4"> {/* เพิ่ม space-y */}
                                            <div className="space-y-2"> {/* เพิ่ม space-y */}
                                                <h2 className="text-3xl font-bold text-white tracking-wide">
                                                    {schedule.day}
                                                </h2>
                                                <div className="flex items-center justify-center space-x-2 text-slate-300">
                                                    <FaClock className="w-4 h-4" />
                                                    <p className="text-lg">{schedule.time} น.</p>
                                                </div>
                                                <div className="flex items-center justify-center space-x-2 text-slate-300">
                                                    <RiAliensFill className="w-4 h-4" />
                                                    <p className="text-lg">{schedule.bosses} บอส</p>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center gap-3 px-2">
                                                {[
                                                    { value: countdown.days, label: 'วัน' },
                                                    { value: countdown.hours, label: 'ชั่วโมง' },
                                                    { value: countdown.minutes, label: 'นาที' },
                                                    { value: countdown.seconds, label: 'วินาที' }
                                                ].map((unit) => (
                                                    <div key={unit.label} className="flex-1">
                                                        <div className="bg-slate-700 rounded-lg p-3 backdrop-blur-sm border border-slate-500">
                                                            <div className="text-3xl font-bold text-white mb-1">
                                                                {unit.value.toString().padStart(2, '0')}
                                                            </div>
                                                            <div className="text-xs text-slate-300">
                                                                {unit.label}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="text-sm text-slate-300">
                                                ครั้งถัดไป: {nextDate.toLocaleDateString('th-TH', { 
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}