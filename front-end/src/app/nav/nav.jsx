'use client'

import { useRouter } from "next/navigation"

export default function NAV () {
    const router = useRouter()
return(
    <div className=" fixed w-full top-0 bg-white h-15 border-b-2 border-grey-500">
        <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-5 my-1" onClick={() => router.push('/lista')}>LISTAGEM</button>
        <button className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 mx-5 my-1" onClick={() => router.push('/')}>HOME</button>
        
    </div>
)

}