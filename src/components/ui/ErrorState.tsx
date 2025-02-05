export const ErrorState = ({ message }: { message: string }) => {
    return (
        <div className='flex justify-center items-center h-64'>
            <div className='text-red-500'>Error: {message}</div>
        </div>
    )
};