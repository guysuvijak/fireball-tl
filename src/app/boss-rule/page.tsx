'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaUsers, FaTrophy, FaQuestionCircle } from 'react-icons/fa';

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

interface Rule {
    title: string;
    icon: JSX.Element;
    description: string;
}

const MAIN_RULES: Rule[] = [
    {
        title: "การจองไอเทม",
        icon: <FaCheckCircle className="w-6 h-6 text-green-400" />,
        description: "สมาชิกมีสิทธิ์จองไอเทม 1 ชิ้นจากบอสใดก็ได้ เมื่อได้รับแล้วต้องต่อคิวใหม่ (จองผ่านดิสคอร์ด)"
    },
    {
        title: "สิทธิ์เลือกบอส",
        icon: <FaTrophy className="w-6 h-6 text-yellow-400" />,
        description: "ผู้ที่มีแต้มส่วนร่วมสูงสุดจะได้สิทธิ์เลือกบอสที่ต้องการตี (7 คน)"
    },
    {
        title: "เงื่อนไขรับไอเทม",
        icon: <FaUsers className="w-6 h-6 text-blue-400" />,
        description: "ผู้เข้าร่วมตีบอสต้องมีแต้มส่วนร่วม 2,000+ หรือไม่เข้าร่วมแต่มีแต้ม 4,000+ จึงมีสิทธิ์รับไอเทม"
    }
];

interface FAQ {
    question: string;
    answer: string;
}

const FAQS: FAQ[] = [
    {
        question: "จำนวนบอสที่ตีแต่ละวัน?",
        answer: "พุธ (2 ตัว), เสาร์ (2 ตัว), อาทิตย์ (3 ตัว)"
    },
    {
        question: "เงื่อนไขการรับไอเทมหากไม่ได้เข้าร่วม?",
        answer: "ต้องมีแต้มส่วนร่วมมากกว่า 4,000 ขึ้นไป"
    },
    {
        question: "อยากเลือกบอสกิลด์ ที่ฉันต้องการจะตี ทำยังไง?",
        answer: "เก็บคะแนนส่วนร่วมกิลด์ให้ติดอันดับแรก ๆ ประจำสัปดาห์"
    },
    {
        question: "สามารถจองไอเทมจากบอสคนละตัวได้หรือไม่?",
        answer: "ไม่ได้ สามารถจองได้เพียง 1 ชิ้นเท่านั้น"
    },
    {
        question: "เลือกของบอส 2 ชิ้น แต่ดรอปจากบอสคนละตัวได้มั้ย?",
        answer: "ไม่ได้ เลือกได้แค่ชิ้นเดียวเท่านั้น"
    },
    {
        question: "ถ้าจองของชิ้นเดียวกันหลาย ๆ คน จะไม่รอคิวนานเกินไปหรอ?",
        answer: "นาน หากไม่ดรอปเลย แต่อย่าลืมว่า หากมีคนต้องการเยอะ แปลว่าจะมีคนเลือกบอสตัวนั้นเยอะด้วยเช่นกัน (Demand & Supply)"
    }
];

export default function BossRule() {
    const [ expandedFaq, setExpandedFaq ] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-[calc(100vh-64px)] flex flex-col"
        >
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-white">กติกาการแจกของบอส</h1>
            </div>

            <div className="flex-1 min-h-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="h-full overflow-auto pb-6">
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-8"
                        >
                            {/* Main Rules */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {MAIN_RULES.map((rule, index) => (
                                    <motion.div
                                        key={index}
                                        variants={item}
                                        className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/90 transition-colors border border-blue-500/20"
                                    >
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                {rule.icon}
                                                <h2 className="text-xl font-semibold text-white">
                                                    {rule.title}
                                                </h2>
                                            </div>
                                            <p className="text-gray-300">
                                                {rule.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* FAQs */}
                            <motion.div
                                variants={item}
                                className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/20"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <FaQuestionCircle className="w-6 h-6 text-blue-400" />
                                        <h2 className="text-xl font-semibold text-white">คำถามที่พบบ่อย</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {FAQS.map((faq, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50"
                                            >
                                                <button
                                                    className="w-full p-4 text-left flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                                >
                                                    <span>{faq.question}</span>
                                                    <span className="text-blue-400">
                                                        {expandedFaq === index ? '−' : '+'}
                                                    </span>
                                                </button>
                                                {expandedFaq === index && (
                                                    <div className="px-4 py-4 text-gray-100 border-t border-gray-700 bg-gray-700">
                                                        {faq.answer}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Last Updated */}
                            <motion.div
                                variants={item}
                                className="text-center text-sm text-gray-400"
                            >
                                อัพเดทล่าสุด: 16/10/2024
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}