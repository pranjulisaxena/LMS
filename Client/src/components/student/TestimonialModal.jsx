import { useEffect } from 'react';
import styles from './CSS/TestimonialModal.module.css'

const TestimonialModal = ({ isOpen, onClose, testimonial }) => {
   // 🔥 LOCK SCROLL

  if (!isOpen || !testimonial) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles.closeBtn} onClick={onClose}>✖</button>

        <img src={testimonial.image} alt={testimonial.name} className={styles.img} />

        <h2>{testimonial.name}</h2>
        <p className={styles.role}>{testimonial.role}</p>

        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span key={i}>{i < Math.floor(testimonial.rating) ? "⭐" : "☆"}</span>
          ))}
        </div>

        <p className={styles.fullText}>{testimonial.feedback}</p>

      </div>
    </div>
  )
}

export default TestimonialModal