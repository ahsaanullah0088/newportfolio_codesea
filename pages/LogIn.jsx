import Link from 'next/link'
import React, { useState,useEffect } from 'react'
import { logReq } from '@/Api';
import { useRouter } from 'next/router';
import Head from 'next/head';

const LoginIn = () => {
let date = new Date;
  // import rouetr
  let router = useRouter();

// login useState
let [FormData,setFormData] = useState({
  email : "",
  password : ""
});

// on change function
let handleChange = (e) => {
  let {name,value} = e.target;
 setFormData((preval)=>({
  ...preval,
  [name] : value
 }))
}

// submit form 
let handleSubmit = async(e) => {
  e.preventDefault();
  let req= await logReq(FormData);
  if(req.success){
    alert("login Successfull");
    localStorage.setItem("token",JSON.stringify(req.token));
    return router.push("/")
  }else{
    alert("Inavlid Credentials")
  }

}
let [isMobile, setIsMobile] = useState(0);
  let [toggle,setToggle] = useState(false);
  let [token,setToken] = useState(false);
  let  [showOrder,setshowOrder] = useState(false);




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
     {isMobile > 800 && (
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
      {isMobile <= 800 && (
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
    <section className="h-screen py-8">
      <Head>
        <title>CodeSea - LogIn Page</title>
      </Head>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href={"/"} className="flex items-center mb-6 text-2xl font-semibold ">
            <img className="w-12 h-12 rounded-full mr-2" src="./images/codesea-logo/default.png" alt="logo" />
            codeSea
        </Link>
        <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-white dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                        <input value={FormData.email} onChange={handleChange}  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input value={FormData.password} onChange={handleChange} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 font-bold">Remember me</label>
                            </div>
                        </div>
                    
                    </div>
                    <button type="submit" className={`  w-full text-white  bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-800 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Sign in</button>
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link href={"/Singup"} className="font-medium text-blue-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>
<footer className={`${router.pathname === "/Dashboard/Home" ||router.pathname ===  "/Dashboard/create-blog" ||router.pathname ===  "/Dashboard/AddService" || router.pathname === "/Dashboard/Orders"  ? "hidden":"block"} text-gray-600 body-font`}>
  <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    <img src="./images/codesea-logo/default.png" className="h-12 rounded-full" alt="codesea Logo" />
      <span className="ml-3 text-xl">codesea</span>
    </a>
    <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© {date.getFullYear()} Tailblocks —
      <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">All Right Reserved</a>
    </p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a className="text-gray-500" target='_blank' href='https://www.facebook.com/profile.php?id=61557908442815' >
        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </a>
      <a className="ml-3 text-gray-500">
        <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>
      <a className="ml-3 text-gray-500"  target='_blank' href='https://www.instagram.com/code_seas/' >
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </a>
      <a className="ml-3 text-gray-500" target='_blank' href="https://www.linkedin.com/company/code-sea/" >
        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
      </a>
    </span>
  </div>
</footer>
</>
  )
}

export default LoginIn