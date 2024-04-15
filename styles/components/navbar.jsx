import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { clearToken } from '../redux/Sing';

const Navbar = () => {
  let [isMobile, setIsMobile] = useState(0);
  let [toggle,setToggle] = useState(false);
  let [token,setToken] = useState(false);
  let  [showOrder,setshowOrder] = useState(false);
  let dispatch = useDispatch();
  let router = useRouter();



  useEffect(() => {
    let handleSize = async () => {
      setIsMobile(window.innerWidth)
    }
    handleSize();
    window.addEventListener("resize", handleSize);
    const fetchToken = async () => {
      try {
          const chktoken = await localStorage.getItem("token");
          if (chktoken ){
              await setToken(true);
          } else {
             await setToken(false);
          }
      } catch (error) {
          console.error("Error fetching token:", error);
      }
    }
     
      
      fetchToken();

    return () => {
      window.removeEventListener("resize", handleSize)
    }
  }, [router.pathname]);

  // toggle menu
  let showMenu = () => {
    setToggle(!toggle);
  }

  // change page on button
  let changePage = (links) => {
    router.push(links)
  }

  // for order dropdown
let handleView = () => {
  setshowOrder(!showOrder);
}



// clear token
let HandleToken = () => {
  localStorage.removeItem("token")
  setToken(false)
  router.push("/")
}

  return (
    <>
      {isMobile > 1500 && (
        <nav className={`${router.pathname === "/Dashboard/Home" ||router.pathname === "/Dashboard/create-blog" || router.pathname ==="/Dashboard/AddService" || router.pathname === "/Dashboard/Orders" ? "hidden":"block"} bg-white shadow-md dark:bg-white fixed w-full z-20 top-0 start-0 border-b border-white dark:border-white`}>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="./images/codesea-logo/default.png" className="h-12 rounded-full" alt="codesea Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">codesea</span>
            </Link>
           
            <div className="flex  md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
              <button onClick={()=>{
                changePage("/Contact")
              }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contact Us</button>
              {
                token ?  <div>
                <button onClick={handleView} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    OverView
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
    
                {/* Dropdown menu */}
                
            </div>: <button onClick={()=>{
                  changePage("/LogIn")
                }} type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 mx-12 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
              }
             
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                <li>
                  <Link href={"/"} className={`block py-2 px-2 ${router.pathname==="/"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} aria-current="page">Home</Link>
                </li>
                <li>
                  <Link href={"/blogs"} className={`block py-2 px-2 ${router.pathname==="/blogs"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} >Blogs</Link>
                </li>
                <li>
                <Link href={"/about"} className={`block py-2 px-2 ${router.pathname==="/about"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} >About</Link>
                </li>
                <li>
                <Link href={"/Contact"} className={`block py-2 px-2 ${router.pathname==="/Contact"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} >Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          {
            showOrder && token && <div className="absolute right-2">
            <div id="dropdown" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white-700">
                      <ul className="py-2 text-sm  " aria-labelledby="dropdownDefaultButton">
                          <li>
                              <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-500 ">Dashboard</Link>
                          </li>
                         
                          <li>
                              <div  onClick={HandleToken} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-500 ">Sign out</div>
                          </li>
                      </ul>
                  </div>
            </div>
          }
        </nav>
      )}
      {isMobile <= 1500 && (
        <nav className={`${router.pathname === "/Dashboard/Home" || router.pathname === "/Dashboard/create-blog" || router.pathname === "/Dashboard/AddService" || router.pathname === "/Dashboard/Orders"  ? "hidden":"block"} bg-white shadow-md dark:bg-white  fixed w-full z-20 top-0 start-0 border-b border-white dark:border-white`}>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <Link href={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="./images/codesea-logo/default.png" className="h-12 rounded-full" alt="codesea Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">codesea</span>
            </Link>
            <button onClick={showMenu} data-collapse-toggle="navbar-sticky" type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-blue-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>

              </button>
             {
              toggle &&  
              <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                <li>
                  <Link href={"/"} className={`block py-2 px-3 ${router.pathname==="/"?" text-blue md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} aria-current="page">Home</Link>
                </li>
                <li>
                  <Link href={"/blogs"} className={`block py-2 px-3 ${router.pathname==="/blogs"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} >Blogs</Link>
                </li>
                <li>
                <Link href={"/about"} className={`block py-2 px-3 ${router.pathname==="/about"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} >About</Link>
                </li>
                <li>
                <Link href={"/Contact"} className={`block py-2 px-3 ${router.pathname==="/contact"?" md:text-blue-700  md:dark:text-blue-500":""}  rounded  text-dark `} >Contact</Link>
                </li>
                <div className="mt-4">
                <div className="flex justify-center md:order-2 space-x-3 md:space-x-2 rtl:space-x-reverse">
                <button onClick={()=>{
                changePage("/Contact")
              }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contact Us</button>
             {
                token ?  <div>
                <button onClick={handleView} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    OverView
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
    
                {/* Dropdown menu */}
                
            </div>: <button onClick={()=>{
                  changePage("/LogIn")
                }} type="button" className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 mx-12 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
              }
            </div>
                </div>
              </ul>
            </div>
             }
          </div>
          {
            showOrder && <div className="absolute right-2">
            <div id="dropdown" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-white-700">
                      <ul className="py-2 text-sm  " aria-labelledby="dropdownDefaultButton">
                          <li>
                              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-500 ">Dashboard</a>
                          </li>
                          
                          <li>
                              <div  onClick={HandleToken} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-500 ">Sign out</div>
                          </li>
                      </ul>
                  </div>
            </div>
          }
        </nav>
      )}
    </>
  )
}

export default Navbar;
