import { Tooltip } from 'react-tooltip';

export const MemberTooltip = () => {
    return (
        <>
            <Tooltip 
                id='grade-tooltip' 
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg' 
            />
            <Tooltip 
                id='weapon-tooltip' 
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg' 
            />
            <Tooltip 
                id='style-tooltip' 
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg' 
            />
            <Tooltip 
                id='member-info-tooltip' 
                className='z-50 bg-gray-900 text-white px-2 py-1 text-sm rounded shadow-lg whitespace-pre-line' 
            />
        </>
    );
};