import { FaChessKing, FaChessBishop, FaChessKnight, FaChessPawn } from 'react-icons/fa';

export const memberGradeColorData = {
    3: 'text-yellow-400',
    2: 'text-purple-400',
    1: 'text-cyan-500',
    0: 'text-slate-400'
} as const;

export const memberGradeIconData = {
    3: FaChessKing,
    2: FaChessBishop,
    1: FaChessKnight,
    0: FaChessPawn
} as const;

export const memberGradeTooltipData: { [key: number]: string } = {
    3: 'Guild Leader',
    2: 'Guild Advisor',
    1: 'Guild Guardian',
    0: 'Guild Member'
};

export const memberWeaponData: { [key: string]: string } = {
    swordshield: 'Sword & Shield',
    greatsword: 'Greatsword',
    longbow: 'Longbow',
    staff: 'Staff',
    dagger: 'Dagger',
    wand: 'Wand',
    crossbow: 'Crossbow'
};

export const memberTableColumnData = ['grade', 'character', 'nickname', 'discord', 'weapons', 'style'] as const;