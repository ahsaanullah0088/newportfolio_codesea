import React, { useEffect, useState } from 'react'
import Slider from './Components/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeStatus, GetOrders } from '../../styles/redux/AdminDashboard';
import { FaEye } from "react-icons/fa";
import { CheckRoutes } from '../../styles/redux/AdminDashboard';
import { useRouter } from 'next/router';

const Orders = () => {

    let dispatch = useDispatch();
    let router = useRouter()
    let [orders,setOrders] = useState([]);
    let [model,setModel] = useState(true);
    
    let [id,setId] = useState({});
    let [status,setstatus] = useState("" );
    let [disable,setdisable] = useState(true);
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
            let data = await dispatch(GetOrders());
            setOrders(data.payload.orders);
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
        
    },[dispatch]);

    let toggleMenu = (id) => {
        setModel(true);
        setId(id);
        setstatus(id.data.Status)
    }

    function getDate(dateString) {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero for months < 10
      const day = String(date.getDate()).padStart(2, '0'); // Add leading zero for days < 10
      const year = date.getFullYear();
    
      return `${month}/${day}/${year}`; // Return formatted date string in MM/DD/YYYY format
    }

    let handleSubmit = async(e) => {
      e.preventDefault();
      let val = await dispatch(ChangeStatus({status,_id:id.data._id}))
     if(val.payload.success){
      setModel(false)
      alert("Status Updated SucessFully ....")
      setdisable(true)
     } else{
      alert("Some Issue Happen ....")
      setdisable(true)


     }
    }

    let handleChange = async(e) =>{
      setstatus(e.target.value)
      setdisable(false)
    }

  return (
          <div className="flex">
            <Slider/>
            <section className="text-gray-600 body-font w-99 m-auto">
      <div className="container mx-auto flex px-5 py-5 items-center justify-center flex-col">
      
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Orders List Page
          </h1>
          <p className="mb-8 leading-relaxed">
           Here You Can See Your Orders On Daily Basis.
          </p>
        
        </div>
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src="../images/orders.jpg"
        />
      </div>
     <div className="flex flex-col justify-center px-4 w-full">
        <h1 className='font-bold mb-3 text-2xl'>
            The Orders Is Below
        </h1>
        {
           Object.keys(id).length > 0 && model &&  <div className="flex justify-center my-4 items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <br />
                 
                  <button
                    className="bg-transparent border-0 text-black float-right"
                  >
                    <span  onClick={()=> setModel(false)} className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                  
                </div>
                <div className="relative p-6 flex-auto">
                  
                <div className="flex mt-3 justify-between">
                    <h2>Order GET AT : </h2>
                      <span>{
                      getDate(id.data.createdAt)
                        }</span>
                  </div>
                  <h1 className="text-center  mb-3">
                    Order Details Are Below 
                  </h1>
                    <label className="block text-black text-sm font-bold mb-1">
                      Name
                    </label>
                    <input value={Object.keys(id).length > 0 && id.data.name} readOnly className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Email
                    </label>
                    <input value={Object.keys(id).length > 0 && id.data.email} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Phone Number
                    </label>
                    <input value={Object.keys(id).length > 0 && id.data.phoneNo} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Service
                    </label>
                    <input value={Object.keys(id).length > 0 && id.data.service} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Budget
                    </label>
                    <input value={Object.keys(id).length > 0 && id.data.budget} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  <form className="bg-gray-200 my-4 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <label className="block text-black text-sm font-bold mb-1">
                      Status
                    </label>
                    <input value={status} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <button onClick={ handleSubmit}
                    className={` my-4 ${disable ? "hidden" :"bg-blue-500"} text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1`}
                    type="submit"
                  
                  >
                    Submit
                  </button>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
               
                  <button
                  onClick={()=> setModel(false)}
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        }
     </div>
     {
        loading ? ( <div role="status" className='flex justify-center w-44 mx-auto h-screen my-9'>
        <svg aria-hidden="true" className="w-12 h-12 m-auto text-4xl text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>) : (
        <div className="flex flex-col ">
        <div className="-m-1.5 overflow-x-hidden">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full px-4 overflow-x-hidden divide-y divide-gray-200 dark:divide-gray-700">
                <thead className='bg-gray-100'>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Phone 
                    </th>
                    
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">
                      Preview
                    </th>
                  </tr>
                </thead>
                <tbody>
                {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Orders Found
                  </td>
                </tr>
              )}{
                orders && orders.length > 0 && orders.map((data)=>{
                    return(
                        <tr key={data._id} className='hover:bg-gray-100'>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  ">
                          {data.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  ">
                          {data.phoneNo}
                        </td>
                       
                        <td className="px-6 py-4 whitespace-nowrap text-sm  ">
                         {data.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm  ">
                         {data.Status}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button onClick={()=> toggleMenu({data})} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                          <FaEye/>
                          </button>
                        </td>
                      </tr>
                      
                    )
                })
            }
            
 
      
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )
      }
      </section>
      
          </div>
    )
}

export default Orders