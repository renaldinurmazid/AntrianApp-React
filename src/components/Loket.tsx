import nextimg from '../assets/forward-button.png'

interface loketProps {
    loketID: string
    handleCLick: () => void
    name: string
    currentAntrian: string
}

export const Loket = (props: loketProps) => {
return (
    <div className='bg-white h-32 border'>
        <div className='bg-blue-900 h-auto p-3 flex justify-between'>
            <h4 className='font-semibold text-white'>LOKET {props.loketID}</h4>
            <button onClick={props.handleCLick} name={props.name}><img src={nextimg} alt="" width={30} /></button>
        </div>
            <p className='text-2xl font-semibold text-center'>{props.currentAntrian}</p>
    </div>
)
}