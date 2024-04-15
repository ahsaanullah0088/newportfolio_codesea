import React, { useState,useEffect } from 'react'
import Slider from './Components/Slider'
import { useDispatch } from 'react-redux';
import { PostService } from '../../styles/redux/AdminDashboard';
import { CheckRoutes } from '../../styles/redux/AdminDashboard';
import { useRouter } from 'next/router';



const AddService = () => {
  let dispatch = useDispatch();
  let router = useRouter();
  useEffect(()=>{
    let getData = async()=>{
      let data = await dispatch(CheckRoutes());
      if(!data){
      alert("You Need To Login First")
       router.push("/LogIn")
        return;
      }else{
        if(data &&  !data.payload.data.admin){
          router.push("/LogIn")
          return;
        } else{
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
  // service form state
  let [service,setservice] = useState("");
  let HandleChange = async(e) => {
    let {name,value} = e.target;
    setservice(value); 
  }

  let handleSubmit = async(e) => {
    e.preventDefault();
    let data = await dispatch(PostService({service}));
    if(data.payload.success){
      alert("Service Added SucessFully !..")
      setservice("")
    }else{
      alert("Some Isssue Has Been Occured...")
    }
  }

  return (
    <div className="flex">
      <Slider/>
      <section className="text-gray-600 body-font w-99 m-auto">
      <div className="container mx-auto flex px-5 py-11 items-center justify-center flex-col">
      
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Service Entry Form
          </h1>
          <p className="mb-8 leading-relaxed">
           Here You Can Enter Service Which You Want To Provide Your User by Filling Below Simlple Form.
          </p>
        
        </div>
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="../images/ser.jpg"
        />
      </div>
      <div className="my-2 ">
      <form 
           onSubmit={handleSubmit}
            className="flex flex-wrap w-full m-auto justify-center"
            // Add an `onSubmit` handler here to handle form submission (optional)
          >
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">
                Service Name
                </label>
                <input
                  type="text"
                  value={service}
                  onChange={HandleChange}
                  id="text"
                  name="service"
                  placeholder='Enter Service Name'
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required // Add `required` attribute for validation
                />
              </div>
            </div>
            
            <div className="p-2 w-full">
              <button className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg`}>
                Add Service
              </button>
            </div>
          </form>
      </div>
      </section>
    </div>
  )
}

export default AddService