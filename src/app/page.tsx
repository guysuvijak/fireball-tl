'use client';
import Image from 'next/image';

const Index = () => {
    return (
        <div className='flex flex-col w-screen h-screen justify-center items-center'>
            <div>
                <Image src='/assets/logo.png' alt='fireball-logo' width='160' height='160' className='rounded-full' />
            </div>
            <h1 className='mt-4 font-bold text-2xl text-white'>🔥 F I R E B 4 L L</h1>
        </div>
    );
};

export default Index;