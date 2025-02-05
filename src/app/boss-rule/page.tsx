'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { LuBookmark, LuInfo } from 'react-icons/lu';
import { GoCheckCircleFill, GoXCircleFill } from 'react-icons/go';
import { containerVariant, itemVariant } from '@/configs/(app)/variant';
import { bossRuleData, bossRuleFaqData } from '@/configs/(app)/boss-rule';

const BossRule = () => {
    const [ expandedFaq, setExpandedFaq ] = useState<number | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='h-[calc(100vh-64px)] flex flex-col'
        >
            <div className='container mx-auto px-4 py-6'>
                <h1 className='text-3xl font-bold text-white'>กติกาการแจกของบอส</h1>
            </div>

            <div className='flex-1 min-h-0'>
                <div className='container mx-auto px-4 h-full'>
                    <div className='h-full overflow-auto pb-6'>
                        <motion.div
                            variants={containerVariant}
                            initial='hidden'
                            animate='show'
                            className='space-y-8'
                        >
                            {/* Main Rules */}
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {bossRuleData.map((rule, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariant}
                                        className='bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800/90 transition-colors border border-blue-500/20'
                                    >
                                        <div className='p-6'>
                                            <div className='flex items-center gap-4 mb-4'>
                                                {rule.icon}
                                                <h2 className='text-xl font-semibold text-white'>
                                                    {rule.title}
                                                </h2>
                                            </div>
                                            <p className='text-gray-300'>
                                                {rule.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* FAQs */}
                            <motion.div
                                variants={itemVariant}
                                className='bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden border border-blue-500/20'
                            >
                                <div className='p-6'>
                                    <div className='flex items-center gap-3 mb-6'>
                                        <FaQuestionCircle className='w-6 h-6 text-blue-400' />
                                        <h2 className='text-xl font-semibold text-white'>คำถามที่พบบ่อย</h2>
                                    </div>
                                    <div className='space-y-4'>
                                        {bossRuleFaqData.map((faq, index) => (
                                            <div
                                                key={index}
                                                className='border border-gray-700 rounded-lg overflow-hidden bg-gray-900/50'
                                            >
                                                <button
                                                    className='w-full p-4 text-left flex items-center justify-between text-gray-300 hover:text-white transition-colors'
                                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                                >
                                                    <span>{faq.question}</span>
                                                    <span className='text-blue-400'>
                                                        {expandedFaq === index ? '−' : '+'}
                                                    </span>
                                                </button>
                                                {expandedFaq === index && (
                                                    <div className='px-4 py-4 text-gray-100 border-t border-gray-700 bg-gray-700'>
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
                                variants={itemVariant}
                                className='text-center text-sm text-gray-400 pb-6'
                            >
                                อัพเดทล่าสุด: 08/11/2024
                            </motion.div>
                        </motion.div>

                        <div className='max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl'>
                            {/* Header */}
                            <h1 className='text-2xl font-bold text-center text-white mb-8'>
                                ระบบจองของบอสกิลด์แบบใหม่
                            </h1>

                            {/* Points Tiers */}
                            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
                                {[
                                    { points: '4,000-20,000', items: 1 },
                                    { points: '20,000+', items: 2 },
                                    { points: '30,000+', items: 3 },
                                    { points: '40,000+', items: 4 }
                                ].map((tier, index) => (
                                    <div key={index} className='bg-gray-700 p-4 rounded-lg text-center hover:bg-gray-600 transition-colors'>
                                        <div className='text-gray-400 text-md'>
                                            ระดับ {tier.items}
                                        </div>
                                        <div className='text-xl font-bold text-orange-400 my-2'>
                                            {tier.items} ชิ้น
                                        </div>
                                        <div className='text-gray-300 text-sm'>
                                            คะแนน {tier.points}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Rules */}
                            <div className='bg-gray-700 rounded-lg p-6 mb-8'>
                                <h2 className='text-xl font-bold text-white mb-4'>กฎการจอง</h2>
                                <div className='space-y-4'>
                                    {[
                                        'เข้ากิลด์ใหม่ สามารถจองได้ 1 ชิ้นทันที',
                                        'ห้ามจองของซ้ำ (ทั้งในคิวตัวเอง & ที่เคยได้ไปแล้ว)',
                                        'จองได้สูงสุด 1-4 ชิ้น (ตามเกณฑ์)',
                                        'จองตั้งแต่ชิ้นที่ 2 ต้องแนบหลักฐานคะแนน',
                                        'ตั้งแต่ชิ้นที่ 2 ต้องระบุว่าของที่จองแต่ละชิ้น ใช้สิทธิ์คะแนนไหนในการจอง'
                                    ].map((rule, index) => (
                                        <div key={index} className='flex items-center text-gray-300'>
                                            <LuBookmark className='text-orange-400 mr-2' />
                                            {rule}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Drop Scenarios */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                                <div className='bg-green-900/30 p-6 rounded-lg'>
                                    <div className='flex items-center mb-4'>
                                        <GoCheckCircleFill className='text-green-400 mr-2 text-xl' />
                                        <h2 className='text-lg font-bold text-white'>คะแนนถึงเกณฑ์</h2>
                                    </div>
                                    <p className='text-gray-300'>
                                        ได้รับของตามคิวปกติ
                                    </p>
                                </div>
                                <div className='bg-red-900/30 p-6 rounded-lg'>
                                    <div className='flex items-center mb-4'>
                                        <GoXCircleFill className='text-red-400 mr-2 text-xl' />
                                        <h2 className='text-lg font-bold text-white'>คะแนนไม่ถึงเกณฑ์</h2>
                                    </div>
                                    <p className='text-gray-300'>
                                        ข้ามคิว แต่ยังเป็นหัวคิว
                                    </p>
                                </div>
                            </div>

                            {/* Example */}
                            <div className='bg-blue-900/30 p-6 rounded-lg'>
                                <div className='flex items-center mb-4'>
                                    <LuInfo className='text-blue-400 mr-2 text-xl' />
                                    <h2 className='text-lg font-bold text-white'>ตัวอย่าง</h2>
                                </div>
                                <div className='text-gray-300 space-y-2'>
                                    <p>จองของ A = ใช้สิทธิ์ของแต้ม 4,000-20,000 (ระดับ 1)</p>
                                    <p className='pb-4'>จองของ B = ใช้สิทธิ์ของแต้ม 20,000+ (ระดับ 2)</p>
                                    <p>ตัวอย่าง: หากเป็นหัวคิวของ B เมื่อบอสดรอปของมา จะเช็คสิทธิ์ก่อน</p>
                                    <p>- หากตอนดรอปของ B มีคะแนนมากกว่า 20,000 = ได้รับของที่จองปกติ</p>
                                    <p>- หากตอนดรอปของ B มีคะแนนต่ำกว่า 20,000 = ไม่ได้รับของที่จอง ส่งให้คิวถัดไปแทน (แต่ยังเป็นหัวคิวอยู่)</p>
                                </div>
                            </div>

                            <div className='bg-orange-300 w-full h-[3px] mt-8'></div>

                            <div className='max-w-4xl mx-auto p-6 space-y-6 text-white'>
                                <div className='space-y-2'>
                                    <h1 className='text-2xl font-bold flex items-center gap-2'>
                                    <span>📢</span> ประกาศโหวตปรับระบบจองของบอสกิลด์
                                    </h1>
                                </div>

                                <div className='space-y-2'>
                                    <h2 className='text-xl font-bold flex items-center gap-2'>
                                        <span>🔄</span> ระบบปัจจุบัน
                                    </h2>
                                    <ul className='list-disc pl-6 space-y-1'>
                                        <li>สมาชิก 1 คน จองได้ 1 ชิ้นเท่านั้น</li>
                                        <li>หากต้องการจองของชิ้นใหม่ ต้องย้ายคิวเดิมไปจองของใหม่</li>
                                    </ul>
                                </div>

                                <div className='space-y-4'>
                                    <h2 className='text-xl font-bold flex items-center gap-2'>
                                        <span>⭐</span> ระบบใหม่ (ขึ้นอยู่กับคะแนนส่วนร่วม)
                                    </h2>
                                    <ul className='list-disc pl-6 space-y-1'>
                                        <li>สมาชิก 1 คน จองได้มากกว่า 1 ชิ้น (ขึ้นอยู่กับคะแนนส่วนร่วม)</li>
                                        <li>ต่อคิวเหมือนเดิม (จองก่อนได้ก่อน จองหลังได้หลัง)</li>
                                    </ul>

                                    <div className='space-y-2'>
                                    <h2 className='text-lg font-bold flex items-center gap-2'>
                                        <span>📊</span> เกณฑ์การจอง
                                    </h2>
                                    <ul className='list-disc pl-6 space-y-1'>
                                        <li>คะแนน 4,000-20,000 = จองได้ 1 ชิ้น</li>
                                        <li>คะแนน 20,000+ = จองได้ 2 ชิ้น</li>
                                        <li>คะแนน 30,000+ = จองได้ 3 ชิ้น</li>
                                        <li>คะแนน 40,000+ = จองได้ 4 ชิ้น</li>
                                    </ul>
                                    </div>

                                    <div className='space-y-2'>
                                    <h2 className='text-lg font-bold flex items-center gap-2'>
                                        <span>⚠️</span> กฎการจอง
                                    </h2>
                                    <ol className='list-decimal pl-6 space-y-1'>
                                        <li>จองได้สูงสุด 1-4 ชิ้น (ตามเกณฑ์)</li>
                                        <li>ห้ามจองของซ้ำ</li>
                                        <li>จองมากกว่า 1 ชิ้น ต้องระบุระดับการจอง</li>
                                        <li>จองชิ้นที่ 2 ขึ้นไป ต้องแสดงหลักฐานคะแนน</li>
                                    </ol>
                                    </div>

                                    <div className='space-y-2'>
                                        <h2 className='text-lg font-bold flex items-center gap-2'>
                                            <span>📝</span> ตัวอย่างการจอง
                                        </h2>
                                        <div className='bg-gray-800 p-4 rounded-lg'>
                                            <div>จองของ A = ใช้สิทธิ์แต้ม 4,000-20,000</div>
                                            <div>จองของ B = ใช้สิทธิ์แต้ม 20,000+</div>
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <h2 className='text-lg font-bold flex items-center gap-2'>
                                            <span>🎯</span> เงื่อนไขการได้รับของ
                                        </h2>
                                        <div className='pl-4'>
                                            <div className='mb-2'>สมมติบอสดรอปของ B:</div>
                                            <ol className='list-decimal pl-6 space-y-1'>
                                                <li className='flex items-center gap-2'>
                                                    <span className='text-green-400'>✅</span>
                                                    ถ้ามีแต้ม 20,000+ = ได้รับของตามคิวปกติ
                                                </li>
                                                <li className='flex items-center gap-2'>
                                                    <span className='text-red-400'>❌</span>
                                                    ถ้าแต้มไม่ถึง 20,000+ = ไม่ได้รับของ (ข้ามคิว แต่ยังเป็นหัวคิว)
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <h2 className='text-xl font-bold flex items-center gap-2'>
                                        <span>💡</span> เหตุผลในการปรับระบบ
                                    </h2>
                                    <ul className='list-disc pl-6 space-y-1'>
                                        <li>คะแนนส่วนร่วมสะท้อนความขยันและการช่วยกิลด์</li>
                                        <li>สร้างความเท่าเทียมตามผลงาน
                                            <ul className='list-disc pl-6 mt-1'>
                                                <li>ทำมาก = ได้มาก</li>
                                                <li>ทำน้อย = ได้น้อย</li>
                                            </ul>
                                        </li>
                                        <li>ป้องกันการเอาเปรียบ</li>
                                        <li>สนับสนุนผู้ที่ช่วยผลักดันกิลด์</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};

export default BossRule;