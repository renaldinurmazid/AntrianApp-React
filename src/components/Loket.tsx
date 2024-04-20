import nextimg from '../assets/forward-button.png'

export const Loket = () => {
return (
<div className='grid gap-3'>
    <div className='bg-white h-36 border'>
        <div className='bg-blue-900 h-auto p-3 flex justify-between'>
            <h4 className='font-semibold text-white'>LOKET A</h4>
            <button><img src={nextimg} alt="" width={30} /></button>
        </div>
        <div className='h-full py-6'>
            {/* <p className='font-semibold text-2xl'>B 1234 TY</p> */}
        </div>
    </div>
    <div className='bg-white h-36 border'>
        <div className='bg-blue-900 h-auto p-3 flex justify-between'>
            <h4 className='font-semibold text-white'>LOKET B</h4>
            <button><img src={nextimg} alt="" width={30} /></button>
        </div>
        <div className='h-full py-6'>
            <p className='font-semibold text-2xl'>B 1234 TY</p>
        </div>
    </div>
    <div className='bg-white h-36 border'>
        <div className='bg-blue-900 h-auto p-3 flex justify-between'>
            <h4 className='font-semibold text-white'>LOKET C</h4>
            <button><img src={nextimg} alt="" width={30} /></button>
        </div>
        <div className='h-full py-6'>
            <p className='font-semibold text-2xl'>B 1234 TY</p>
        </div>
    </div>
</div>
)
}