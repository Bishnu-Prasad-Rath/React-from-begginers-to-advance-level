import { useState } from 'react'
import './App.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Card from './Card.jsx'  

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Card/>
      <Footer />
    </>
  )
}

export default App
