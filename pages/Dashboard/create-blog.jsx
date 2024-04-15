import React, { useState,useEffect } from 'react'
import Slider from './Components/Slider'
import { useDispatch, useSelector } from 'react-redux';
import { PostModel } from '../../styles/redux/AdminDashboard';
import { CheckRoutes } from '../../styles/redux/AdminDashboard';
import { useRouter } from 'next/router';


const createblog = () => {
  let router = useRouter()

  let dispatch = useDispatch();
  useEffect(()=>{
    let getData = async()=>{
      let data = await dispatch(CheckRoutes());
      if(!data){
      alert("You Need To Login First")
       router.push("/LogIn")
        return;
      }else{
        if(!data.payload.data.admin){
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

  // blog state
  let [blog,setBlog] = useState({
    title : "",
    imageUrl : "",
    description : ""
  });
  let loading = useSelector(state => state.admin.loading)

  let handleChange = async(e) => {
    let {name,value} = e.target;
    setBlog((preval)=>({
      ...preval,
      [name] : value
    }))
  }

  let handleSubmit = async(e) =>{
    e.preventDefault();
    let data =  await dispatch(PostModel(blog))
    if(data.payload.success){
      alert("Blog Posted SuccessFully !......")
      setBlog({
        title : "",
    imageUrl : "",
    description : ""
      });
    }else{
      alert("Blog Not Posted  !......")
    }
  }

  return (
    <div className="flex">
      <Slider/>
      
      <section className="text-gray-600 body-font w-99 m-auto">
      <div className="container mx-auto flex px-5 py-11 items-center justify-center flex-col">
      
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Create Blog Form 
          </h1>
          <p className="mb-8 leading-relaxed">
            What Sort Of Topic You Thought Today I Hope It Will Be Great And Engage Audience.
          </p>
        
        </div>
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="../images/blog.jpg"
        />
      </div>
     <div className="my-4">
     <form onSubmit={handleSubmit}
            className="flex flex-wrap -m-2"
            // Add an `onSubmit` handler here to handle form submission (optional)
          >
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="text" className="leading-7 text-sm text-gray-600">
                  Title
                </label>
                <input
                  type="text"
                  value={blog.title}
                  id="text"
                  onChange={handleChange}
                  name="title"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required // Add `required` attribute for validation
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="imageUrl" className="leading-7 text-sm text-gray-600">
                  Image Url
                </label>
                <input
                  type="url"
                  value={blog.imageUrl}
                  onChange={handleChange}
                  id="imageUrl"
                  name="imageUrl"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  required // Add `required` attribute for validation
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="description" className="leading-7 text-sm text-gray-600">
                  Description Of Blog
                </label>
                <textarea
                 value={blog.description}
                 onChange={handleChange}
                  id="description"
                  name="description"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  required // Add `required` attribute for validation
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button className={` ${loading ? "cursor-wait" : "cursor-pointer"} flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg`}>
                Submit
              </button>
            </div>
          </form>
     </div>
    </section>
    
      </div>
  )
}

export default createblog