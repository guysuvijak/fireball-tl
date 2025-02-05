import { useQuery } from '@tanstack/react-query';
import { MemberProps } from '@/types/(app)';

export const useMember = () => {
    return useQuery<MemberProps[]>({
        queryKey: ['members'],
        queryFn: async () => {
            const response = await fetch('/data/member.json');
            if (!response.ok) {
                throw new Error('Failed to fetch members');
            }
            const data = await response.json();
            return data.members;
        }
    });
};