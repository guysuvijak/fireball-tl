'use client';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { LuArrowUpDown } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { FaChessKing, FaChessBishop, FaChessKnight, FaChessPawn, FaQuestionCircle } from 'react-icons/fa';
import Image from 'next/image';

interface Member {
    grade: number;
    character: string;
    nickname: string;
    discord: string;
    weapons: string[];
    role: string;
    status: number;
    pve: number;
    pvp: number;
    style?: number;
}

type SortConfig = {
    key: keyof Member | null;
    direction: 'asc' | 'desc';
};

const GRADE_MAP = {
    3: 'Leader',
    2: 'Advisor',
    1: 'Guardian',
    0: 'Member'
} as const;

const GRADE_COLORS = {
    3: 'text-yellow-400',
    2: 'text-purple-400',
    1: 'text-cyan-500',
    0: 'text-slate-400'
} as const;

const GRADE_ICONS = {
    3: FaChessKing,
    2: FaChessBishop,
    1: FaChessKnight,
    0: FaChessPawn
} as const;

const GRADE_TOOLTIPS: { [key: number]: string } = {
    3: 'Guild Leader',
    2: 'Guild Advisor',
    1: 'Guild Guardian',
    0: 'Guild Member'
};

const WEAPON_TOOLTIPS: { [key: string]: string } = {
    swordshield: 'Sword & Shield',
    greatsword: 'Greatsword',
    longbow: 'Longbow',
    staff: 'Staff',
    dagger: 'Dagger',
    wand: 'Wand',
    crossbow: 'Crossbow'
};

export default function Member() {
    const [ members, setMembers ] = useState<Member[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ sortConfig, setSortConfig ] = useState<SortConfig>({ key: null, direction: 'asc' });

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('/data/member.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch members data');
                }
                const data = await response.json();
                setMembers(data.members);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const sortedMembers = useMemo(() => {
        let result = [...members];
        if (sortConfig.key) {
            result.sort((a, b) => {
                // Special case for weapons column - sort by role instead
                if (sortConfig.key === 'weapons') {
                    return sortConfig.direction === 'asc' 
                        ? a.role.localeCompare(b.role)
                        : b.role.localeCompare(a.role);
                }

                // Special case for style column - sort by pve value
                if (sortConfig.key === 'style') {
                    return sortConfig.direction === 'asc'
                        ? a.pve - b.pve
                        : b.pve - a.pve;
                }

                const aValue = a[sortConfig.key as keyof Member];
                const bValue = b[sortConfig.key as keyof Member];
                
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
                }
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                return 0;
            });
        }
        return result;
    }, [members, sortConfig]);

    const handleSort = (key: keyof Member | any) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const verifiedCount = useMemo(() => {
        return members.filter(member => member.status === 1).length;
    }, [members]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-white">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='container mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col'
        >
            <div className='flex items-center mb-6'>
                <h1 className='text-3xl font-bold text-white'>
                    รายชื่อสมาชิก {members.length} คน 
                    <span className='ml-2 text-lg text-gray-400'>
                        (Verified {verifiedCount} คน)
                    </span>
                </h1>
                <span
                    data-tooltip-id='member-info-tooltip'
                    data-tooltip-content={`ตรา Verified สำหรับสมาชิก\nที่กรอกข้อมูลในดิสคอร์ดแล้ว\n(สามารถกรอกได้ที่ห้อง 《📝》register)`}
                    className='cursor-help'
                >
                    <FaQuestionCircle className='ml-3 w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors' />
                </span>
            </div>
            <div className='bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden flex-1 flex flex-col min-h-0'>
                <div className='overflow-auto flex-1'>
                    <table className='min-w-full'>
                        <thead className='bg-gray-900/50 sticky top-0 z-10'>
                            <tr>
                                {(['grade', 'character', 'nickname', 'discord', 'weapons', 'style'] as const).map((column) => (
                                    <th key={column} className='px-6 py-3 text-left relative bg-gray-900/50'>
                                        <button
                                            onClick={() => handleSort(column)}
                                            className='text-xs font-medium text-gray-300 uppercase tracking-wider hover:text-white flex items-center space-x-1'
                                        >
                                            <span>{column}</span>
                                            <LuArrowUpDown className={`w-4 h-4 ${
                                                sortConfig.key === column ? 'text-orange-500' : 'text-gray-400'
                                            }`} />
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-700'>
                            {sortedMembers.map((member) => {
                                const GradeIcon = GRADE_ICONS[member.grade as keyof typeof GRADE_ICONS];
                                return (
                                    <motion.tr 
                                        key={member.character}
                                        layout
                                        className='hover:bg-gray-700/50 transition-colors'
                                    >
                                        <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-300'>
                                            <span 
                                                data-tooltip-id='grade-tooltip' 
                                                data-tooltip-content={GRADE_TOOLTIPS[member.grade]}
                                                className='flex items-center cursor-help'
                                            >
                                                <GradeIcon className={`w-5 h-5 ${GRADE_COLORS[member.grade as keyof typeof GRADE_COLORS]}`} />
                                            </span>
                                        </td>
                                        <td className='px-6 py-3 whitespace-nowrap text-sm font-medium text-white'>
                                            <div className='flex items-center space-x-2'>
                                                <span>{member.character}</span>
                                                <span className={`px-2 py-0.5 text-xs rounded-full ${
                                                    member.status === 1 
                                                        ? 'bg-green-500/20 text-green-400' 
                                                        : 'bg-red-500/20 text-red-400'
                                                }`}>
                                                    {member.status === 1 ? 'Verified' : 'None'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-300'>{member.nickname}</td>
                                        <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-300'>{member.discord}</td>
                                        <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-300'>
                                            <div className='flex items-center space-x-2'>
                                                {member.weapons.map((weapon, idx) => (
                                                    <div 
                                                        key={idx}
                                                        className='relative w-8 h-8 cursor-help'
                                                        data-tooltip-id='weapon-tooltip'
                                                        data-tooltip-content={WEAPON_TOOLTIPS[weapon]}
                                                    >
                                                        <Image
                                                            src={`/assets/weapons/${weapon}.webp`}
                                                            alt={weapon}
                                                            fill
                                                            className='object-contain'
                                                        />
                                                    </div>
                                                ))}
                                                <span className='px-2 py-0.5 text-xs rounded-full bg-blue-500/20 text-blue-400'>
                                                    {member.role}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-300'>
                                            <div 
                                                className='w-32 h-2 bg-gray-700 rounded overflow-hidden cursor-help'
                                                data-tooltip-id='style-tooltip'
                                                data-tooltip-content={`PVE ${member.pve}% / PVP ${member.pvp}%`}
                                            >
                                                <div className='flex h-full'>
                                                    <div 
                                                        className='bg-green-500 h-full'
                                                        style={{ width: `${member.pve}%` }}
                                                    />
                                                    <div 
                                                        className='bg-red-500 h-full'
                                                        style={{ width: `${member.pvp}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Tooltip 
                id='grade-tooltip' 
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg'
            />
            <Tooltip 
                id='weapon-tooltip'
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg'
            />
            <Tooltip 
                id='style-tooltip'
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg'
            />
            <Tooltip 
                id='member-info-tooltip'
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg whitespace-pre-line'
            />
        </motion.div>
    );
}