import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let[counter, setCounter] = useState(15)
//  let counter=5;
 const addValue = () =>{
  console.log("Clicked",Math.random());
  if (counter==20) {
    setCounter(counter)
  }else{
    setCounter(counter+1)
  }
//  counter=counter+1
//   setCounter(counter)
 }
 const removeValue = () =>{
  if (counter==0) {
    setCounter(counter)
  }else{
    setCounter(counter-1)
  }
  // counter=counter-1;
  // setCounter(counter)
 }
  return (
    <>
     <h1>Chai aur React</h1>
     <h2>Counter value: {counter}</h2>
     <button onClick={addValue}>Add value</button>
     <br />
     <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
