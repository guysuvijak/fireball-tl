import Link from 'next/link';
 
const NotFoundPage = () => {
    return (
        <div className='flex flex-1 flex-col w-screen h-screen items-center justify-center'>
            <h2 className='text-[24px] md:text-[36px] font-medium text-[#FFFFFF]'>Not Found</h2>
            <p className='text-[16px] md:text-[24px] text-[#CCCCCC]'>Could not find requested resource</p>
            <Link href='./' className='text-[16px] md:text-[20px] underline text-blue-600'>Back</Link>
        </div>
    )
};

export default NotFoundPage;