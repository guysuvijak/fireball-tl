import React from 'react';
import { LuShield, LuSword, LuSwords } from 'react-icons/lu';
import { TbBow } from 'react-icons/tb';
import { GiCrossbow, GiCrystalWand } from 'react-icons/gi';
import { FaBook } from 'react-icons/fa';

interface Members {
    name: string;
    w1: string;
    w2: string;
};

const PositionLayout = () => {
    const getWeaponIcon = (weapon: string) => {
        const iconProps = 'w-5 h-5';
        switch (weapon?.toLowerCase()) {
        case 'gs':
            return <LuSword className={`${iconProps} text-red-500`} />;
        case 'sns':
            return <LuShield className={`${iconProps} text-blue-500`} />;
        case 'wand':
            return <FaBook className={`${iconProps} text-green-500`} />;
        case 'staff':
            return <GiCrystalWand className={`${iconProps} text-purple-500`} />;
        case 'dagger':
            return <LuSwords className={`${iconProps} text-yellow-500`} />;
        case 'xbow':
            return <GiCrossbow className={`${iconProps} text-orange-500`} />;
        case 'bow':
            return <TbBow className={`${iconProps} text-pink-500`} />;
        default:
            return null;
        }
    };

    const positions = {
        frontLine: {
            title: 'Front Line',
            members: [
                { name: 'MeteorVIIx', w1: 'sns', w2: 'gs' },
                { name: 'Penzilgon', w1: 'sns', w2: 'wand' },
                { name: 'BR13', w1: 'sns', w2: 'gs' },
                { name: '...', w1: 'wand', w2: 'staff' },
                { name: '...', w1: 'wand', w2: 'staff' },
                { name: '...', w1: 'wand', w2: 'staff' },
            ]
        },
        midLine: {
            title: 'Mid Line',
            members: [
                { name: 'Marshiez', w1: 'xbow', w2: 'gs' },
                { name: 'LanaNewerth', w1: 'dagger', w2: 'xbow' },
                { name: 'PaoQ', w1: 'dagger', w2: 'gs' },
                { name: 'B3nZury', w1: 'bow', w2: 'dagger' },
                { name: '...', w1: 'wand', w2: 'staff' },
                { name: '...', w1: 'wand', w2: 'staff' },
            ]
        },
        backLine: {
            title: 'Back Line', 
            members: [
                { name: 'Kypriz', w1: 'bow', w2: 'staff' },
                { name: 'SonTeeN', w1: 'bow', w2: 'staff' },
                { name: 'StxywithZxro', w1: 'bow', w2: 'staff' },
                { name: 'RaggaeWiz', w1: 'wand', w2: 'staff' },
                { name: '...', w1: 'wand', w2: 'staff' },
                { name: '...', w1: 'wand', w2: 'staff' },
            ]
        }
    };

    const PositionBox = ({ title, members }: {title: string, members: Members[]}) => (
        <div className='w-full max-w-md mb-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
            <div className='p-4'>
                <h3 className='text-lg font-bold mb-3 text-center text-gray-200'>{title}</h3>
                <div className='grid grid-cols-2 gap-2'>
                    {members.map((member: Members, idx: number) => (
                        <div 
                            key={idx} 
                            className='flex items-center space-x-2 p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition-colors duration-200'
                        >
                            <div className='flex items-center space-x-1'>
                                <div className='flex-shrink-0'>{getWeaponIcon(member.w1)}</div>
                                <div className='flex-shrink-0'>{getWeaponIcon(member.w2)}</div>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-white'>{member.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className='flex flex-col relative h-[calc(100vh-64px)]'>
            <div className='flex flex-col items-center p-4 space-y-4 min-h-full w-full'>
                <h2 className='text-2xl font-bold mb-4 text-white sticky top-0 bg-[#121212] py-2 w-full text-center z-10'>
                    Guild War Position Layout
                </h2>
                <div className='w-full max-w-md h-full flex flex-col items-center overflow-auto'>
                    {Object.entries(positions).map(([key, data]) => (
                        <div key={key} className='w-full'>
                            <PositionBox title={data.title} members={data.members} />
                            {key !== 'backLine' && (
                                <div className='w-full flex justify-center my-2'>
                                    <div className='w-1 h-8 bg-gray-300'></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PositionLayout;