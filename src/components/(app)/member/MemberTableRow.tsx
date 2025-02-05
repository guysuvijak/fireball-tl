import { motion } from 'framer-motion';
import Image from 'next/image';
import { MemberProps } from '@/types/(app)';
import { memberGradeIconData, memberGradeColorData, memberGradeTooltipData, memberWeaponData } from '@/configs/(app)/member';

interface Props {
    member: MemberProps;
};

export const MemberTableRow = ({ member }: Props) => {
    const GradeIcon = memberGradeIconData[member.grade as keyof typeof memberGradeIconData];

    return (
        <motion.tr layout className='hover:bg-gray-700/50 transition-colors'>
            <td className='px-6 py-3 whitespace-nowrap text-sm text-gray-300'>
                <span 
                    data-tooltip-id='grade-tooltip' 
                    data-tooltip-content={memberGradeTooltipData[member.grade]}
                    className='flex items-center cursor-help'
                >
                    <GradeIcon className={`w-5 h-5 ${memberGradeColorData[member.grade as keyof typeof memberGradeColorData]}`} />
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
                            data-tooltip-content={memberWeaponData[weapon]}
                        >
                            <Image
                                src={`/assets/weapons/${weapon}.webp`}
                                alt={weapon}
                                fill
                                sizes='32px'
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
                {member.status === 1 ? (
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
                ) : (
                    <span className='text-gray-500'>-</span>
                )}
            </td>
        </motion.tr>
    )
};