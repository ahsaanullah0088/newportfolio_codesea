import { useRouter } from 'next/router'
import React from 'react'

const BlogsCard = ({blogs}) => {
  let router = useRouter();
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

export default BlogsCard