'use client';
import { motion } from 'framer-motion';

export default function Member() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold text-white mb-6">รายชื่อสมาชิก</h1>
            <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300">รายชื่อสมาชิกจะแสดงที่นี่</p>
            </div>
        </motion.div>
    );
}