'use client';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { LuArrowUpDown } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';

interface Member {
    grade: string;
    character: string;
    nickname: string;
    weapons: string[];
    reputation: number;
    role: string;
    location?: string;
    status?: boolean;
}

type SortConfig = {
    key: keyof Member | null;
    direction: 'asc' | 'desc';
};

const GRADE_TOOLTIPS: { [key: string]: string } = {
    "👑": "Leader",
    "🎓": "Advisor",
    "🛡️": "Guardian",
    "😀": "Member"
};

const WEAPON_TOOLTIPS: { [key: string]: string } = {
    sns: "Sword & Shield",
    gs: "Greatsword",
    bow: "Longbow",
    staff: "Staff",
    dagger: "Dagger",
    wand: "Wand",
    xbow: "Crossbow"
};

export default function Member() {
    const [members] = useState<Member[]>([
        { grade: "👑", character: "MeteorVllx", nickname: "กาย", weapons: ["sns", "gs"], reputation: 12320, role: "DPS" },
        { grade: "🎓", character: "Penzilgon", nickname: "Jamie Oliver", weapons: ["sns", "wand"], reputation: 47699, role: "Support" },
        { grade: "🎓", character: "B3nZury", nickname: "เบนซ์", weapons: ["dagger", "bow"], reputation: 32976, role: "DPS" },
        { grade: "🛡️", character: "Kypriz", nickname: "หมี", weapons: ["bow", "staff"], reputation: 23316, role: "DPS" },
        { grade: "🛡️", character: "Marshiez", nickname: "หมูทอง", weapons: ["xbow", "gs"], reputation: 20579, role: "DPS" },
    ]);

    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

    const sortedMembers = useMemo(() => {
        let result = [...members];

        if (sortConfig.key) {
            result.sort((a, b) => {
                const aValue = a[sortConfig.key as keyof Member];
                const bValue = b[sortConfig.key as keyof Member];

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
                }

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.direction === 'asc' 
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                return 0;
            });
        }

        return result;
    }, [members, sortConfig]);

    const handleSort = (key: keyof Member) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const getWeaponIcon = (weapon: string) => {
        const icons: { [key: string]: string } = {
            sns: "🛡️",
            gs: "🗡️",
            bow: "🏹",
            staff: "🔮",
            dagger: "⚔️",
            wand: "📚",
            xbow: "✝️"
        };
        return icons[weapon] || weapon;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto px-4 py-8"
        >
            <h1 className="text-3xl font-bold text-white mb-6">รายชื่อสมาชิก</h1>
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-900/50">
                            <tr>
                                {(['grade', 'character', 'nickname', 'weapons', 'reputation', 'role'] as const).map((column) => (
                                    <th key={column} className="px-6 py-3 text-left relative">
                                        <button
                                            onClick={() => handleSort(column)}
                                            className="text-xs font-medium text-gray-300 uppercase tracking-wider hover:text-white flex items-center space-x-1"
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
                        <tbody className="divide-y divide-gray-700">
                            {sortedMembers.map((member) => (
                                <motion.tr 
                                    key={member.character}
                                    layout
                                    className="hover:bg-gray-700/50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <span 
                                            data-tooltip-id="grade-tooltip" 
                                            data-tooltip-content={GRADE_TOOLTIPS[member.grade]}
                                        >
                                            {member.grade}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{member.character}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.nickname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <div className="flex space-x-2">
                                            {member.weapons.map((weapon, idx) => (
                                                <span 
                                                    key={idx} 
                                                    className="text-lg cursor-help"
                                                    data-tooltip-id="weapon-tooltip"
                                                    data-tooltip-content={WEAPON_TOOLTIPS[weapon]}
                                                >
                                                    {getWeaponIcon(weapon)}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {member.reputation.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.role}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tooltips */}
            <Tooltip 
                id="grade-tooltip" 
                className="z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg"
            />
            <Tooltip 
                id="weapon-tooltip"
                className="z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg"
            />
        </motion.div>
    );
}