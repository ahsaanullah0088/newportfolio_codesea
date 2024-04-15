import Link from 'next/link';
import react, { useState } from 'react';
import { IoIosHome,IoIosCreate  } from "react-icons/io";
import { IoIosCloseCircle } from "react-icons/io";
import { MdCreateNewFolder } from "react-icons/md";
import { PiSignOutThin } from "react-icons/pi";
import { VscSignOut } from "react-icons/vsc";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { AiOutlineOrderedList } from "react-icons/ai";
import { clearToken } from '@/styles/redux/Sing';
import { useRouter } from 'next/router';


let Slider = () =>{

// slider toggle
let [show,setShow] = useState(true);

let ToggleMenu = () => {
  setShow(!show)
}

let router = useRouter();


return(
  <>
  <div className="mx-4 w-10 " onClick={ToggleMenu}>
    <HiOutlineBars3BottomLeft className='fixed text-3xl font-bold mx-3 top-2 left-0 '/>
  </div>
    <aside id="default-sidebar" className={` ${show ? "hidden transition-transform -translate-x-full sm:translate-x-0":"block "} fixed top-0 left-0 z-40 w-16 h-screen " aria-label="Sidebar`}>
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 shadow-lg ">
      <div className="text-xl" onClick={ToggleMenu} >
        <IoIosCloseCircle className='text-red-700' />
      </div>
      <ul className="space-y-2 mt-4 font-medium">
        <li>
          <Link href={"/Dashboard/Home"} className="flex items-center p-2 text-blue-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <svg className="w-5 h-5  transition duration-75 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
             <IoIosHome className='text-3xl mb-2' />
            </svg>
          </Link>
        </li>
        <hr />
        <li>
          <Link href={"/Dashboard/AddService"} className="flex items-center p-2 text-blue-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <svg className="w-5 h-5  transition duration-75 text-blue-600  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
             <MdCreateNewFolder className='text-3xl mb-2' />
            </svg>
          </Link>
        </li>
        <li>
          <Link href={"/Dashboard/create-blog"} className="flex items-center p-2 text-blue-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <svg className="w-5 h-5  transition duration-75 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
             <IoIosCreate  className='text-3xl mb-2' />
            </svg>
          </Link>
        </li>
        <li>
          <Link href={"/Dashboard/Orders"} className="flex items-center p-2 text-blue-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-100 group">
            <svg className="w-5 h-5  transition duration-75 text-blue-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
             <AiOutlineOrderedList  className='text-3xl mb-2' />
            </svg>
          </Link>
        </li>
         <li onClick={()=>{
          localStorage.removeItem("token")
         }}>
          <Link href={"/LogIn"} className="flex  items-center absolute bottom-10  text-gray-900 rounded-lg group">
            <svg className=" w-5 h-5 transition duration-75  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
            <PiSignOutThin className='text-xl text-blue-500 font-bold mr-3' />
            </svg>
          </Link>
        </li>
       
      </ul>
       
        </div>
  </aside>
  </>
)
}

export default Slider;