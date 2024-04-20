import './App.css'
import { Navbar } from './components/Navbar'
import { Booking } from './components/Booking'
import { NonBooking } from './components/NonBooking'
import { Loket } from './components/Loket'
import FormAddAntrian from './components/FormaddAntrian'


function App() {
  
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <FormAddAntrian />
        <Navbar />
        <div className='grid grid-cols-3 gap-3 h-auto w-4/5'>
            <Booking />
            <NonBooking />
            <Loket />
        </div>
      </div>
    </>
  )
}

export default App
