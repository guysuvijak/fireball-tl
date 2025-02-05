import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    totalCount: number;
    verifiedCount: number;
};

export const MemberHeader = ({ totalCount, verifiedCount }: Props) => {
    return (
        <div className='flex items-center mb-6'>
            <h1 className='text-3xl font-bold text-white'>
                รายชื่อสมาชิก {totalCount} คน 
                <span className='ml-2 text-lg text-gray-400'>
                    (Verified {verifiedCount} คน)
                </span>
            </h1>
            <span
                data-tooltip-id='member-info-tooltip'
                data-tooltip-content={`ตรา Verified สำหรับสมาชิก\nที่กรอกข้อมูลในดิสคอร์ดแล้ว\n(สามารถกรอกได้ที่ห้อง 《📝》register)`}
                className='cursor-help'
            >
                <FaQuestionCircle className='ml-3 w-6 h-6 text-gray-400 hover:text-gray-300 transition-colors' />
            </span>
        </div>
    )
};