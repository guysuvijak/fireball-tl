import { MemberProps, MemberSortProps } from '@/types/(app)';
import { MemberTableHeader } from './MemberTableHeader';
import { MemberTableBody } from './MemberTableBody';

interface Props {
    members: MemberProps[];
    sortConfig: MemberSortProps;
    onSort: (key: keyof MemberProps) => void;
};

export const MemberTable = ({ members, sortConfig, onSort }: Props) => {
    return (
        <div className='overflow-auto flex-1'>
            <table className='min-w-full'>
                <MemberTableHeader sortConfig={sortConfig} onSort={onSort} />
                <MemberTableBody members={members} />
            </table>
        </div>
    )
};