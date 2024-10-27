'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Index = () => {
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
                ease: "easeOut"
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
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div 
            className='flex flex-col w-full min-h-screen justify-center items-center bg-gradient-to-b from-gray-900 to-black p-4'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className='relative'
                variants={logoVariants}
                whileHover="hover"
            >
                <div className='relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56'>
                    <Image 
                        src='/assets/logo.png' 
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
    );
};

export default Index;