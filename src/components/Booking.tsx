import { collection, getDocs, query, where } from 'firebase/firestore';
import close from '../assets/close.png'
import centang from '../assets/tick.png'
import db from '../firebase';
import { useEffect, useState } from 'react';

interface Antrian {
    id: string;
    typeantrian: string;
    noantrian: string;
    noplate: string;
}

export const Booking = () => {
const [data, setData] = useState<Antrian[]>([]);
const antrianCollections = collection(db, "antrians");

const fetchData = async () => {
    try {
        const q = query(antrianCollections, where("typeantrian", "==", "booking"));
        const snapshot = await getDocs(q);
        const datalist: Antrian[] = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
        } as Antrian));
        setData(datalist);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
    fetchData();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

return (
<div className='bg-white border'>
    <div className='bg-blue-900 h-auto p-3 border border-gray-400 flex justify-between '>
        <p className='text-white font-semibold text-left'>TIKET BOKING</p>
        <div className='flex gap-3'>
            <button><img src={close} alt="" width={20} /></button>
            <button><img src={centang} alt="" width={25} /></button>
        </div>
    </div>
    <div className='bg-blue-900 h-auto py-4 px-10'>
        <div className='flex justify-between items-center'>
            <p className='text-7xl font-bold text-white'>B2</p>
            <p className='text-2xl font-semibold text-white'>B 1233 TY</p>
        </div>
        <p className='text-xl mt-2 font-semibold text-white'>MENUJU LOKET B</p>
        {/* <p className='text-2xl font-semibold text-white'>ANTRIAN</p> */}
    </div>
    <div className='grid grid-cols-2'>
        <div className='py-5'>
            {data.map((item) => (
            <p className='text-2xl font-semibold py-3'>{item.noantrian}</p>
            ))}
        </div>
        <div className='py-5'>
            {data.map((item) => (
            <p className='text-2xl py-3'>{item.noplate}</p>
            ))}
        </div>
    </div>
</div>
)
}