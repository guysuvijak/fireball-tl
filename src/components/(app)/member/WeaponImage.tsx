import Image from 'next/image';
import { memberWeaponData } from '@/configs/(app)/member';

interface Props {
    weapon: string;
};

export const WeaponImage = ({ weapon }: Props) => {
    return (
        <div
            className='relative w-8 h-8 cursor-help'
            data-tooltip-id='weapon-tooltip'
            data-tooltip-content={memberWeaponData[weapon]}
        >
            <Image
                src={`/assets/weapons/${weapon}.webp`}
                alt={weapon}
                fill
                sizes='32px'
                loading='lazy'
                className='object-contain'
            />
        </div>
    )
};