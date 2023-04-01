import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'

function Feed() {
  return (
    <div>
        <div className="flex items-center justify-between">
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon className='w-8 h-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125'/>
        </div>
        
    </div>
  )
}

export default Feed