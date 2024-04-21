import './App.css'
import { Navbar } from './components/Navbar'
import { Loket } from './components/Loket'
import FormAddAntrian from './components/FormaddAntrian'
import { ListData } from './components/ListData'
import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs} from 'firebase/firestore'
import db from './firebase'

export interface Antrian {
  id: string;
  typeantrian: string;
  noantrian: string;
  noplate: string;
  created_at: Date;
}

function App() {
  const [bookingData, setBookingData] = useState<Antrian[]>([]);
  const [nonBookingData, setNonBookingData] = useState<Antrian[]>([]);
  const antrianCollections = collection(db, "antrians");

  const [currentAntrianBooking, setCurrentAntrianBooking] = useState<Antrian | null>(null);
  const [currentAntrianNonBooking, setCurrentAntrianNonBooking] = useState<Antrian | null>(null);
  const [loketIDBooking, setLoketIDBooking] = useState<string>('');
  const [loketIDNonBooking, setLoketIDNonBooking] = useState<string>('');

  const [currentAntrianLoketA, setCurrentAntrianLoketA] = useState<string>('');
  const [currentAntrianLoketB, setCurrentAntrianLoketB] = useState<string>('');
  const [currentAntrianLoketC, setCurrentAntrianLoketC] = useState<string>('');

  const fetchData = async () => {
      try {
          const snapshot = await getDocs(antrianCollections);
          const datalist: Antrian[] = snapshot.docs.map((doc) => ({
             id: doc.id,
             ...doc.data(),
          } as Antrian));

          datalist.sort((a, b) => {return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()});

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

  const handleNext = (loketID: string, name: string) => {
    if(loketID === 'A') {
      setCurrentAntrianNonBooking(nonBookingData[0] || null);
      setNonBookingData(nonBookingData.slice(1));
      setLoketIDNonBooking(name); 
    } else if(loketID === 'B') {
      setCurrentAntrianBooking(bookingData[0] || null);
      setBookingData(bookingData.slice(1));
      setLoketIDBooking(name); 
    } else if(loketID === 'C') {
      const nextBooking = bookingData[0];
      const nextNonBooking = nonBookingData.find(antrian => antrian.typeantrian === 'non-booking');
      if (nextBooking) {
        setCurrentAntrianBooking(nextBooking);
        setBookingData(bookingData.slice(1));
        setLoketIDBooking(name);
      } else if (nextNonBooking) {
        setCurrentAntrianNonBooking(nextNonBooking);
        setNonBookingData(nonBookingData.filter(antrian => antrian !== nextNonBooking));
        setLoketIDNonBooking(name);
      }
    } 
  }

  const handleCloseBooking = async () => {
      await deleteDoc(doc(db, 'antrians', currentAntrianBooking?.id || ''));
      setCurrentAntrianBooking(null);
      setLoketIDBooking('');
  }
  const handleCloseNonBooking = async () => {
      await deleteDoc(doc(db, 'antrians', currentAntrianNonBooking?.id || ''));
      setCurrentAntrianNonBooking(null);
      setLoketIDNonBooking('');
  }

  const handleCentangBooking = () => {
    const nomorplat = currentAntrianBooking?.noplate || '';
    if(loketIDBooking === 'C') {
      setCurrentAntrianLoketC(nomorplat);
      setCurrentAntrianBooking(null);
      setLoketIDBooking('')
    } else {
      setCurrentAntrianLoketB(nomorplat);
      setCurrentAntrianBooking(null);
      setLoketIDBooking('')
    }
  }
  const handleCentangNonBooking = () => {
    const nomorplat = currentAntrianNonBooking?.noplate || '';
    if(loketIDNonBooking === 'C') {
      setCurrentAntrianLoketC(nomorplat);
      setCurrentAntrianNonBooking(null);
      setLoketIDNonBooking('')
    } else {
      setCurrentAntrianLoketA(nomorplat);
      setCurrentAntrianNonBooking(null);
      setLoketIDNonBooking('')
    }
  }
  
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <FormAddAntrian />
        <Navbar />
        <div className='grid grid-cols-3 gap-3 h-auto w-4/5'>
          <ListData handleClose={handleCloseBooking} handleCentang={handleCentangBooking} type="BOOKING" data={bookingData} currentAntrian={currentAntrianBooking} loketID={loketIDBooking}/>
          <ListData handleCentang={handleCentangNonBooking} handleClose={handleCloseNonBooking} type="NON BOOKING" data={nonBookingData} currentAntrian={currentAntrianNonBooking} loketID={loketIDNonBooking}/>
        <div className='grid gap-3'>
            <Loket loketID="A" handleCLick={() => handleNext('A', 'A')} name='loket A' currentAntrian={currentAntrianLoketA}/>
            <Loket loketID="B" handleCLick={() => handleNext('B', 'B')} name='loket B' currentAntrian={currentAntrianLoketB}/>
            <Loket loketID="C" handleCLick={() => handleNext('C', 'C')} name='loket C' currentAntrian={currentAntrianLoketC}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
