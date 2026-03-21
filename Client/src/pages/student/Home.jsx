import CallToAction from '../../components/student/CallToAction.jsx'
import Companies from '../../components/student/Companies.jsx'
import CoursesSection from '../../components/student/CoursesSection.jsx'
import Footer from '../../components/student/Footer.jsx'
import Hero from '../../components/student/Hero'
import TestimonalSection from '../../components/student/TestimonalSection.jsx'
import styles from './CSS/Home.module.css'

const Home = () => {
  
  return (
    <div className={styles.div} >
      <Hero />
     <Companies />
     <CoursesSection />
     <TestimonalSection />
     <CallToAction />
     <Footer />
    </div>


  )
}

export default Home