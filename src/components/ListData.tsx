import close from '../assets/close.png'
import centang from '../assets/tick.png'
import {Antrian} from '../App'

interface ListProps{
    type:  string;
    data: Antrian[];
    loketID: string;
    currentAntrian: Antrian | null;
    handleClose: () => void;
    handleCentang: () => void;
}

export const ListData = (props: ListProps) => {
  const data = props.data

  return (
    <div className='bg-white border'>
    <div className='bg-blue-900 h-auto p-3 border border-gray-400 flex justify-between '>
        <p className='text-white font-semibold text-left'>TIKET {props.type}</p>
        <div className='flex gap-3'>
            <button onClick={props.handleClose}><img src={close} alt="" width={20} /></button>
            <button onClick={props.handleCentang}><img src={centang} alt="" width={25} /></button>
        </div>
    </div>
    <div className='bg-blue-900 h-auto py-4 px-10'>
        {props.currentAntrian === null ? 
        <p className=' text-white text-2xl font-semibold py-3 text-center'>ANTRIAN</p>
        : <div>
            <div className='flex justify-between items-center'>
            <p className='text-5xl font-bold text-white'>{props.currentAntrian?.noantrian}</p>
            <p className='text-2xl font-semibold text-white'>{props.currentAntrian?.noplate}</p>
            </div> 
            <p className='text-xl mt-2 font-semibold text-white'>MENUJU LOKET {props.loketID}</p>
        </div>
    }
    </div>
    <div className='grid grid-cols-2'>
        <div className='py-5'>
            {data.map((item) => (
            <p className='text-2xl font-semibold py-3 text-left px-10'>{item.noantrian}</p>
            ))}
        </div>
        <div className='py-5'>
            {data.map((item) => (
            <p className='text-2xl py-3 text-left'>{item.noplate}</p>
            ))}
        </div>
    </div>
</div>
  )
}
