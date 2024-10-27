import Link from 'next/link'
 
export default function NotFoundPage() {
    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <h2 className='text-[36px] font-medium text-[#FFFFFF]'>Not Found</h2>
            <p className='text-[24px] text-[#CCCCCC]'>Could not find requested resource</p>
            <Link href='./' className='text-[20px] underline text-blue-600'>Back</Link>
        </div>
    )
}