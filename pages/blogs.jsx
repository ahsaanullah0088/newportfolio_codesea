import React, { useEffect, useState } from 'react'
import BlogsCard from '../styles/components/BlogsCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogsData,getData,searchBlogs } from '../styles/redux/BlogSlice';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Blogs = () => {
  const dispatch = useDispatch();
  const [blogsData, setBlogsData] = useState([]);
  let [tempBlog,setTempBlog] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const loading = useSelector(state => state.blogs.loading);
 const error = useSelector(state => state.Contact.error);
  // check for token
  let [isMobile, setIsMobile] = useState(0);
  let [toggle,setToggle] = useState(false);
  let [token,setToken] = useState(false);
  let  [showOrder,setshowOrder] = useState(false);
 let router = useRouter()
  useEffect(() => {
    let func = async() =>{
      let datas = await dispatch(getBlogsData());
    setBlogsData(datas.payload.blogs)
    setTempBlog(datas.payload.blogs)
    }
    func();
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

  const handleChange = e => {
    setSearchVal(e.target.value);
    if(e.target.value === "") {
      setBlogsData(tempBlog)
    }
  };

  const search = e => {
    e.preventDefault();
    const searchBlog = [];
    for(const blogs of blogsData){
      if(blogs.title.toLocaleLowerCase().includes(searchVal) || blogs.description.toLocaleLowerCase().includes(searchVal)){
        searchBlog.push(blogs)
      }
    }
    return setBlogsData(searchBlog);
    
  };

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

const BlogsCard = ({blogs}) => {
  return (
    <div className="p-4 md:w-1/3 cursor-pointer" >
    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" onClick={()=>router.push("/Previewblogs/blog?blog="+blogs.title)}>
      <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={blogs.imageUrl} alt="blog" />
      <div className="p-6">
        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{blogs.title}</h1>
        <p className="leading-relaxed mb-3">{blogs.description.substr(0,20)}....</p>
        <div className="flex items-center cursor-pointer flex-wrap">
          <div className="text-indigo-500 inline-flex items-center md:mb-2  lg:mb-0">Learn More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
          
         
        </div>
      </div>
    </div>
  </div>

  )
}
  
  return (
    <>
    <Head>
      <title>CodeSea - Blogs</title>
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
      <div className="text-center  pt-24 flex flex-col">
        <h1 className="text-center text-2xl font-bold">
          Our Blogs
        </h1>
        <h5>Discover insightful articles, tips, trends, and stories in our diverse and informative blog section.</h5>
      </div>
      <form className="max-w-md py-8 px-8 mx-auto">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input value={searchVal} onChange={handleChange} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
        <button onClick={search} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
    </div>
</form>

{/* blogs cards */}
{
  loading && <div role="status" className='flex w-44 mx-auto h-screen my-9'>
  <svg aria-hidden="true" className="w-12 h-12 m-auto text-4xl text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
  </svg>
  <span className="sr-only">Loading...</span>
</div>
}

{
  blogsData.length=== 0 &&
  <div className="mt-7">
<h1 className="text-center">
  No Blogs Found For {searchVal}
</h1>
  </div>
}

<section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4">
      {
        blogsData.map((blogs)=>{
          return <BlogsCard key={blogs._id} blogs={blogs}/>
        })
      }
      </div>
      </div>
</section>

{/* blogs card ebnd */}
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


export default Blogs;