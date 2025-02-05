export interface MemberProps {
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
};

export interface MemberSortProps {
    key: keyof Member | null;
    direction: 'asc' | 'desc';
};