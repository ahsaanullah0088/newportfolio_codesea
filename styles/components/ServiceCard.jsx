import { useRouter } from 'next/router'
import React from 'react'

const ServiceCard = ({servicesdata}) => {

    let router = useRouter();

   
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

export default ServiceCard