import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/header/Header'
import Navbar from './components/navigation/Navbar'
import SectionWhite from './components/section/SectionWhite'
import SectionDark from './components/section/sectionDark'
import ContactForm from './components/section/form'
import Footer from './components/section/Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Header/>
        <SectionWhite/>
        <SectionDark/>
        <ContactForm/>
        <Footer/>
      </div>
    </>
  )
}

export default App
