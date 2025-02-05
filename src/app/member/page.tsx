'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MemberTable, MemberHeader, MemberTooltip } from '@/components/(app)/member';
import { LoadingState, ErrorState } from '@/components/ui';
import { useMember } from '@/hooks/useMember';
import { useMemberSort } from '@/hooks/useMemberSort';
import { MemberProps } from '@/types/(app)';

const Member = () => {
    const { data: members = [], isLoading, error } = useMember();
    const { sortedMembers, sortConfig, handleSort } = useMemberSort(members);

    const verifiedCount = useMemo(() => 
        members.filter((member: MemberProps) => member.status === 1).length, 
        [members]
    );

    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error.message} />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='container mx-auto px-4 py-8 h-[calc(100vh-64px)] flex flex-col'
        >
            <MemberHeader
                totalCount={members.length}
                verifiedCount={verifiedCount}
            />

            <div className='bg-gray-800/80 backdrop-blur-sm rounded-lg overflow-hidden flex-1 flex flex-col min-h-0'>
                <MemberTable
                    members={sortedMembers}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                />
            </div>

            <MemberTooltip />
        </motion.div>
    )
};

export default Member;