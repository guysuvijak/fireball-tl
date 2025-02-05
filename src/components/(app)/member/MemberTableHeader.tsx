import { LuArrowUpDown } from 'react-icons/lu';
import { MemberProps, MemberSortProps } from '@/types/(app)';
import { memberTableColumnData } from '@/configs/(app)/member';

interface Props {
    sortConfig: MemberSortProps;
    onSort: (key: keyof MemberProps) => void;
};

export const MemberTableHeader = ({ sortConfig, onSort }: Props) => {
    return (
        <thead className='bg-gray-900/50 sticky top-0 z-10'>
            <tr>
                {memberTableColumnData.map((column) => (
                    <th key={column} className='px-6 py-3 text-left relative bg-gray-900/50'>
                        <button
                            onClick={() => onSort(column)}
                            className='text-xs font-medium text-gray-300 uppercase tracking-wider hover:text-white flex items-center space-x-1'
                        >
                            <span>{column}</span>
                            <LuArrowUpDown className={`w-4 h-4 ${sortConfig.key === column ? 'text-orange-500' : 'text-gray-400'}`} />
                        </button>
                    </th>
                ))}
            </tr>
        </thead>
    )
};