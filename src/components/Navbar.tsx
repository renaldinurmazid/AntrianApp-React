import { format } from "date-fns/format";
import { useEffect, useState } from "react";

export const Navbar = () => {
const date = new Date();
const formatDate = 'EEEE dd MMM, yyyy';
const today = format(date, formatDate);

const [timeNow, setTimeNow] = useState(new Date());

useEffect(() => {
  const interval = setInterval(() => {
    setTimeNow(new Date());
  }, 1000);
  return () => clearInterval(interval);
},[]);

const formatedTime = timeNow.toLocaleTimeString();

  return (
    <nav className='flex justify-between items-center py-3 w-4/5'>
        <p className="text-blue-800 font-bold font-poppins">DUMMY LOGO</p>
        <p className="text-blue-800 font-bold font-poppins">QMS</p>
        <div className="">
            <p className="text-2xl font-bold text-right text-blue-800">{formatedTime}</p>
            <p className="font-semibold text-blue-800">{today}</p>
        </div>
    </nav>
  )
}
