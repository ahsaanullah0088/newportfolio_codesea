import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Correct import
import { IoMdArrowForward } from "react-icons/io";
import Image from 'next/image';
import { fetchContacts } from '@/styles/redux/Contslice';
import submitformData, { sendEmail, sendformdata } from '../styles/redux/submitformData';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const Contact = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    let [service, setService] = useState([]);
    let ref = useRef(null);
  const contacts = useSelector(state => state.Contact.contacts);
  const status = useSelector(state => state.Contact.status);
  const error = useSelector(state => state.Contact.error);
  const success = useSelector(state => state.formSumbit.success);
  let loading = useSelector(state => state.formSumbit.loading)
  let [isMobile, setIsMobile] = useState(0);
  let [toggle,setToggle] = useState(false);
  let [token,setToken] = useState(false);
  let  [showOrder,setshowOrder] = useState(false);
  let [formData,setFormData] = useState({
  service :contacts &&  "",
  name : "",
  email : "",
  phoneNo : "",
  budget : "100USD - 500USD"
  });
 
  useEffect(() => {
    let fetchData = async () => {
      let d = await dispatch(fetchContacts());
      if (d.payload && d.payload.findServices) {
        setService(d.payload.findServices);
      }
    }
    fetchData();
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
    
  }, [dispatch,router.pathname]);

  let handleChange = async(e) => {
    let {name,value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async(e) => {
         e.preventDefault();
         let data = await dispatch(sendformdata(formData));
         console.log(data)
         let datas = await dispatch(sendEmail(formData));
         if(datas&& datas.payload.success){
          alert("Thanks For Contacting US")
         } else{
          alert("Sorry Your Form Not Submitted")
         }
         setFormData({
          service : contacts.findServices[0].service,
          name : "",
          email : "",
          phoneNo : "",
          budget : "100USD - 500USD"
         })
  };

  const ScrollToElem = async () => {
    if(ref.current){
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      });
    }
  }

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

let date = new Date()

  return (
    <>
    <Head>
      <title>CodeSea - Contact Us</title>
    </Head>
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

       {/* hero section Start */}
       <section className="text-gray-600  body-font">
  <div className="container mx-auto flex px-8  py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Let’s get started with your project
      </h1>
      <p className="mb-8 leading-relaxed">Whether you’re looking to build something new and exciting or need our help with an ongoing project, we’ve got you covered..</p>
      <strong className="text-xl mb-3 font-bold">
      Fill out the contact form below to let us know how we can help.
      </strong>
      <div className="flex justify-center" onClick={ScrollToElem}>
        <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Fill Form</button>
       
      </div>
    </div>
   
  </div>
</section>

       {/* hero section end */}

       {/* form <section></section> */}
       <div className="p-6" ref={ref}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    <form onSubmit={handleSubmit}>
    <div>
        <label className="block font-semibold" htmlFor="name">Select Service</label>
      {
          contacts &&   <select className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-xl p-2 border-none mb-3 block mt-1 w-full"  name="service" required="required" value={formData.service} onChange={handleChange} autoFocus="autofocus" >
              <option value="___">____________________Select Service Below_________________________</option>

          {
            service.map((contact)=>{
              return <>
              <option key={contact._id} value={contact.service}>
                {contact.service}
              </option>
              </>
            })
          }
          </select>
        } 
      
      </div>
      <div>
        <label className="block font-semibold" htmlFor="name">Name</label>
        <input value={formData.name} onChange={handleChange} className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-xl p-2 border-none block mt-1 w-full" id="name" type="text" name="name" required="required" autoFocus="autofocus" />
      </div>

      <div className="mt-4">
        <label className="block font-semibold" htmlFor="email">Email</label>
        <input value={formData.email} onChange={handleChange} className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-xl p-2 border-none block mt-1 w-full" id="email" type="email" name="email" required="required" />
      </div>

      <div className="mt-4">
        <label className="block font-semibold" htmlFor="email">Phone No</label>
        <input value={formData.phoneNo} onChange={handleChange} className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-xl p-2 border-none block mt-1 w-full" id="phoneNo" type="number" name="phoneNo" required="required" />
      </div>

      <label className="block font-semibold" htmlFor="name">Select Budget</label>
        <select value={formData.budget} onChange={handleChange} className=" shadow-inner bg-gray-100 rounded-lg placeholder-black text-xl p-2 border-none mb-3 block mt-1 w-full"  name="budget" required="required" autoFocus="autofocus" >
          <option value="50USD - 100USD">50USD - 100USD</option>
          <option value="100USD - 150USD">100USD - 150USD</option>
          <option value="150USD- 200USD"> - 150USD - 200USD</option>
          <option value="200USD - 250USD">200USD - 250USD</option>
          <option value="250USD - 300USD">250USD - 300USD</option>
          <option value="More Then 300USD">More Then 300USD</option>

          </select>

      <div className="flex items-center justify-between mt-8">
        <button type="submit" className={`flex ${loading ?"cursor-not-allowed" :"cursor-pointer"} items-center justify-center px-3 py-1  border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10`}>
  
  <span className='flex align-middle justify-center text-center'>{loading ? "Submitting" : "Submit"}<IoMdArrowForward className='mx-2 mt-1'/></span>

        </button>
       
      </div>
    </form>

    <aside>
      <div className="bg-gray-100 p-8 rounded">
        <h2 className="font-bold text-2xl">What happens next</h2>
        <ul className="list-disc mt-4 list-inside">
          <li  className='mb-3'>Our business development team contacts you within two working days.</li>
          <li  className='mb-3'>A discovery session is held to understand your project requirements</li>
          <li className='mb-3'> All the information shared is protected under the mNDA</li>
          <li  className='mb-3'>Our technical and business development teams analyze the scope of your project and share the best way forward in a proposal</li>
          <li  className='mb-3'>A software development agreement is signed based on mutually agreed terms of the proposal</li>
        </ul>
      </div>
    </aside>

  </div>
</div>
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

       {/* form section end */}

    </>
  );
};

export default Contact;
