import { useState, useMemo } from 'react';
import { type MemberProps, type MemberSortProps } from '@/types/(app)';

export const useMemberSort = (members: MemberProps[]) => {
    const [sortConfig, setSortConfig] = useState<MemberSortProps>({ 
        key: null, 
        direction: 'asc' 
    });

    const sortedMembers = useMemo(() => {
        let result = [...members];
        if (sortConfig.key) {
            result.sort((a, b) => {
                if (sortConfig.key === 'weapons') {
                    return sortConfig.direction === 'asc' 
                        ? a.role.localeCompare(b.role)
                        : b.role.localeCompare(a.role);
                }

                if (sortConfig.key === 'style') {
                    return sortConfig.direction === 'asc'
                        ? a.pve - b.pve
                        : b.pve - a.pve;
                }

                const aValue = a[sortConfig.key as keyof MemberProps];
                const bValue = b[sortConfig.key as keyof MemberProps];
                
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

    const handleSort = (key: keyof MemberProps) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    return { sortedMembers, sortConfig, handleSort };
};