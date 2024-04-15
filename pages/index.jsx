import React, { useEffect, useState } from 'react';
import { FaUserCheck } from "react-icons/fa";
import { MdIncompleteCircle } from "react-icons/md";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { useRouter } from 'next/router';
import { MdDeveloperMode } from "react-icons/md";
import { FaLaptopCode, FaMobileAlt, FaTools, FaWordpress, FaBrain, FaSearch } from 'react-icons/fa';
import ServiceCard from '../styles/components/ServiceCard';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch } from 'react-redux';


const index = () => {

  let router = useRouter();

  // check for token
  let [isMobile, setIsMobile] = useState(0);
  let [toggle,setToggle] = useState(false);
  let [token,setToken] = useState(false);
  let  [showOrder,setshowOrder] = useState(false);
  let dispatch = useDispatch();



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

let date = new Date();


// clear token
let HandleToken = () => {
  localStorage.removeItem("token")
  setToken(false)
  router.push("/")
}



  let cartIcon = {
    user : (
      <FaUserCheck />
    ),
    complete : (
      <MdIncompleteCircle />
    ),
    office : (
      <RiHomeOfficeFill />
    ),
    rating : (
      <MdOutlineGeneratingTokens />
    )
  }

  const cardData = [
    { id: 1, icon: cartIcon.user, value: "2.7K", label: "User" },
    { id: 2, icon: cartIcon.complete, value: "150+", label: "Project Completed" },
    { id: 3, icon: cartIcon.office, value: 2, label: "Offices" },
    { id: 4, icon: cartIcon.rating, value: "4.7", label: "Rating" }
  ]

  // services objects
  const services = [
    {
      name: "Web Development",
      icon: <FaLaptopCode />,
      description: "Our web development service offers customized solutions for building and maintaining websites tailored to your business needs. "
    },
    {
      name: "Mobile Development",
      icon: <FaMobileAlt />,
      description: "With our mobile development service, we specialize in creating high-quality mobile applications for iOS and Android platforms. ."
    },
    {
      name: "DevOps",
      icon: <FaTools />,
      description: "Our DevOps service combines software development and IT operations to streamline the software delivery process and improve collaboration between development and IT teams. "
    },
    {
      name: "WordPress Development",
      icon: <FaWordpress />,
      description: "As experts in WordPress development, we offer comprehensive solutions for building and maintaining WordPress websites and applications. "
    },
    {
      name: "Artificial Intelligence",
      icon: <FaBrain />,
      description: "Our artificial intelligence service leverages cutting-edge technologies to develop intelligent systems that can perform tasks traditionally requiring human intelligence. "
    },
    {
      name: "SEO (Search Engine Optimization)",
      icon: <FaSearch />,
      description: "Our SEO service focuses on improving your website's visibility in search engine results pages (SERPs) to drive organic traffic and increase your online presence. "
    }
    // Add more services as needed
  ];


  const Analytics = ({card}) => {
    return (
      <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <div className="border-2 border-gray-200 py-6 rounded-lg">
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="text-blue-500 w-12 text-xl h-12 mb-3 inline-block"
        viewBox="0 0 24 24"
      >
        {card.icon}
        </svg>
        <h2 className="title-font font-medium text-3xl text-gray-900">{card.value}</h2>
        <p className="leading-relaxed">{card.label}</p>
      </div>
    </div>
    )
  }
  const ServiceCard = ({servicesdata}) => {


   
  return (
    <div className="p-4 lg:w-1/2 mb-3">
    <div className="h-full flex  sm:flex-row   flex-col items-center sm:justify-start justify-center text-center sm:text-left">
    <div className="text-8xl text-blue-600 mt-3">
    {servicesdata.icon }
    </div>
      <div className="flex-grow sm:pl-8">
        <h2 className="title-font font-medium text-lg text-gray-900">{servicesdata.name}</h2>
        <p className="mb-4">{servicesdata.description}</p>
      </div>
    </div>
    <div onClick={()=>{
        router.push("/Contact")
    }} className="flex  justify-center -mt-4 ">
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 mx-12 text-center ">Want Service</button>
    </div>
  </div>
  )
}
  

  return (

    <div>
      <Head>
      <title>codesea-Home0-</title>
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

      <div className="mt-4">
      <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Empowering Your Success with Streamlined Tech Solutions
          </h1>
          <p className="mb-8 leading-relaxed">At CodeSea, we're committed to empowering your success by providing efficient and streamlined tech solutions tailored to your needs. Our comprehensive range of services encompasses everything from innovative web design and development to strategic digital marketing strategies.</p>
          <div className="flex justify-center">
            <button onClick={()=>{
              changePage("/Contact")
            }} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Contact US</button>
            <button onClick={()=>{
              changePage("/about")
            }} className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">About Us</button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="../images/990.jpg" />
        </div>
      </div>
    </section>
      </div>
      <div >
      <section className="text-gray-600 body-font">
      <div className="container px-5  mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">A Journey Of <span className="text-blue-600">New Era</span></h1>
         
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          {
            cardData.map((card)=>{
              return <Analytics key={card.id} card={card} />
            })
          }
        </div>
      </div>
    </section>
    {/* ====== Services Section Start */}
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-2 text-gray-900 tracking-widest">OUR SERVICES</h1>
          <span className="text-xl text-blue-600">
            Why Choose Us ?
          </span>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">We Provide You Flexible Scalible And Reliable Tect Solutions To Our Customers</p>
        </div>
        <div className="flex flex-wrap -m-4">
          {
            services.map((servicesdata)=>{
              return <ServiceCard key={servicesdata.title + servicesdata.description} servicesdata={servicesdata}/>
            })
          }
        </div>
      </div>
    </section>
{/* ====== Services Section End */}

<div className="mt-3">
<div className="text-center lg:w-2/3 w-full m-auto">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">We're proud of our accomplishments</h1>
      <p className="mb-8 px-4 leading-relaxed">As a result of codesea's experience and work ethic, we have formed valuable industry partnerships over the years. This has not only helped us in getting certified from industry leaders, but also in acquiring new businesses and customers.</p>
      </div>
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
    </div>
  )
}

export default index