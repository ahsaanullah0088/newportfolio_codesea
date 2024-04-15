import React, { useEffect, useState } from 'react';
import Slider from "./Components/Slider"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CheckRoutes, getAnalytics } from '../../styles/redux/AdminDashboard';
import { useRouter } from 'next/router';

const Home = () => {

  let dispatch = useDispatch();
  let [data,setData] = useState({});
  let router = useRouter()

  // get redux state data 
  let loading = useSelector(state => state.admin.loading)
 

  useEffect(()=>{
    let getData = async()=>{
      let data = await dispatch(CheckRoutes());
      if(!data){
      alert("You Need To Login First")
       router.push("/Login")
        return;
      }else{
        if(data &&  data.payload.data.admin){
          let resp = await dispatch(getAnalytics());
          setData(resp.payload);
        } else{
          router.push("/LogIn")
          return;
        }
      }
     
      
    } 
    if(localStorage.getItem("token")){
      getData()
    }else{
      router.push("/")
    }
  },[dispatch])


  return (
   <div className="flex  align-middle text-center">
   <Slider/>
   <div className="mx-4">
    {
      loading && <div role="status" className='flex w-44 mx-auto h-screen my-9'>
      <svg aria-hidden="true" className="w-12 h-12 m-auto text-4xl text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
    }
   <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div className="w-full sm:p-4 px-4 mb-6">
            <h1 className="title-font font-medium  text-xl mb-2 text-blue-900">
             Hi Ahmed ! Here Is Analytics Of Your App
            </h1>
            <div className="leading-relaxed">
              Your App Analytics Like Connected User,Number Of Blogs,Live Services,Total Orders Are Shown Blow.
            </div>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900">{data.userCount}</h2>
            <p className="leading-relaxed">Users</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900">{data.blogCount}</h2>
            <p className="leading-relaxed">Blogs Live</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900">{data.newServiceCount}</h2>
            <p className="leading-relaxed">Services Live</p>
          </div>
          <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-gray-900">{data.serviceCount}</h2>
            <p className="leading-relaxed">Total Orders</p>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
          <img
            className="object-cover object-center w-full h-full"
            src="../images/codesea-logo/cover.png" // Replace with actual image source
            alt="stats"
          />
        </div>
      </div>
    </section>
   </div>
   </div>
  )
}

export default Home