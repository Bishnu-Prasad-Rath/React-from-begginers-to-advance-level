import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data=useLoaderData()
    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/hiteshchoudhary')
    //     .then(response => response.json())
    //     .then(data => {console.log(data)
    //     setData(data)})
    // },[])
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      GITHUB FOLLOWERS:{data.followers}
    </div>
  )
}

export default Github

export const githubInfoFolder =  async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}
