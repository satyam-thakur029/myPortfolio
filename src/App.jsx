
import './App.css'
import './index.css';
import About from './sections/About'
import Contact from './sections/Contact'
import Experiences from './sections/Experiences'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Navbar from './sections/Navbar'
import Projects from './sections/Projects '
import Testimonial from './sections/Testimonial '

function App() {
  

  return (
    <div className="container mx-auto max-w-7xl">
    <Navbar />
    <Hero />
    <About />
    <Projects />
    <Experiences />
    <Testimonial />
    <Contact />
    <Footer/>
   
  </div>
  )
}

export default App
