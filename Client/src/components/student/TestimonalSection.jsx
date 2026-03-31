import { useState } from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import styles from './CSS/TestimonalSection.module.css'
import TestimonialModal from './TestimonialModal'

const TestimonalSection = () => {
    const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  return (
    <div className={styles.div}>
      <h2>Testimonals</h2>
    <p className={styles.divP}>Hear from our learners as they share their journeys of transformation, success, and how our <br /> platform has made a difference in their lives.</p>
    <div className={styles.CardContainer}>
      {dummyTestimonial.map((testimonial, index)=> (
        <div key={index} className={styles.parentContainer}>
          <div className={styles.container}>
          <img className={styles.img} src={testimonial.image} alt={testimonial.name} />
          <div>
            <h1 className={styles.h1}>{testimonial.name}</h1>
            <p className={styles.role}>{testimonial.role}</p>
          </div>
          
          </div>
          <div className={styles.starContainer2}>
           <div className={styles.starContainer}>
             {
              [...Array(5)].map((_,i)=>(
                <img className={styles.star} key={i} src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} alt='star' />
              ))
            }
           </div>
            <p className={styles.feedback}>{testimonial.feedback}</p>
          </div>
          <a href="#" className={styles.readMore} onClick={() => setSelectedTestimonial(testimonial)}>Read More</a>
          </div>
      ))}
    </div>
     <TestimonialModal
        isOpen={!!selectedTestimonial}
        testimonial={selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
      />
    </div>
  )
}

export default TestimonalSection