import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Card from './Components/Card'

function App() {
  const [count, setCount] = useState(0)
let myObj = {
  username: "hitesh",
  age:21
}
  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded mb-4'>TAILWIND TEST</h1>
      <Card username="NICK" />
      <Card username="BROWNS" />
    </>
  )
}

export default App
