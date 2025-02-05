import { MemberProps } from '@/types/(app)';
import { MemberTableRow } from './MemberTableRow';

interface Props {
  members: MemberProps[];
};

export const MemberTableBody = ({ members }: Props) => {
    return (
        <tbody className='divide-y divide-gray-700'>
            {members.map((member) => (
                <MemberTableRow key={member.character} member={member} />
            ))}
        </tbody>
    )
};