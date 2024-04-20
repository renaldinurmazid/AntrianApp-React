import './App.css'
import { Navbar } from './components/Navbar'
import { Loket } from './components/Loket'
import FormAddAntrian from './components/FormaddAntrian'
import { ListData } from './components/ListData'
import { useEffect, useState } from 'react'
import { collection, getDocs} from 'firebase/firestore'
import db from './firebase'

interface Antrian {
  id: string;
  typeantrian: string;
  noantrian: string;
  noplate: string;
}

function App() {
  const [bookingData, setBookingData] = useState<Antrian[]>([]);
  const [nonBookingData, setNonBookingData] = useState<Antrian[]>([]);
  const antrianCollections = collection(db, "antrians");

  const fetchData = async () => {
      try {
          const snapshot = await getDocs(antrianCollections);
          const datalist: Antrian[] = snapshot.docs.map((doc) => ({
             id: doc.id,
             ...doc.data(),
          } as Antrian));
          
          const bookingList = datalist.filter(item => item.typeantrian === 'booking');
          const nonBookingList = datalist.filter(item => item.typeantrian === 'non-booking');

          setBookingData(bookingList);
          setNonBookingData(nonBookingList);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    
  }
  
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <FormAddAntrian />
        <Navbar />
        <div className='grid grid-cols-3 gap-3 h-auto w-4/5'>
          <ListData type="BOOKING" data={bookingData} />
          <ListData type="NON BOOKING" data={nonBookingData} />
        <div className='grid gap-3'>
            <Loket loketID="A" handleCLick={handleNext} />
            <Loket loketID="B" handleCLick={handleNext}/>
            <Loket loketID="C" handleCLick={handleNext}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
