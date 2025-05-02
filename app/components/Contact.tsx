'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader';

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('2PKrQpMjwAmcNyUx3');
    console.log('EmailJS initialized');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 50,
        damping: 20
      } 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitError('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      console.log('Starting email submission...');
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Ravi Kiran',
      };

      console.log('Template params:', templateParams);
      console.log('Using service ID:', 'service_ffqc72k');
      console.log('Using template ID:', 'template_ffqc72k');
      console.log('Using public key:', '2PKrQpMjwAmcNyUx3');

      const result = await emailjs.send(
        'service_ffqc72k',
        'template_ffqc72k',
        templateParams,
        '2PKrQpMjwAmcNyUx3'
      );

      console.log('Email sent successfully:', result);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error('Error sending email:', error);
      let errorMessage = 'Failed to send message. Please try again later.';
      
      if (error.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: 'fa-envelope',
      title: 'Email',
      content: 'ravi742t7p@gmail.com',
      link: 'mailto:ravi742t7p@gmail.com'
    },
    {
      icon: 'fa-phone',
      title: 'Phone',
      content: '+91 9347280958',
      link: 'tel:+919347280958'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Location',
      content: 'Visakhapatnam, Andhra Pradesh, India',
      link: null
    }
  ];
  
  const socialLinks = [
    {
      icon: 'fa-linkedin',
      link: 'https://www.linkedin.com/in/ravi-kiran'
    },
    {
      icon: 'fa-github',
      link: 'https://github.com/RaviKiran752'
    },
    {
      icon: 'fa-medium',
      link: 'https://medium.com/@ravi742t7p'
    }
  ];

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <SectionHeader title="Get In Touch" />
        
        <motion.div 
          className="contact-content"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div 
            className="contact-info"
            variants={containerVariants}
          >
            {contactInfo.map((item, index) => (
              <motion.div 
                className="contact-item"
                key={index}
                variants={itemVariants}
              >
                <i className={`fas ${item.icon}`}></i>
                <div>
                  <h3>{item.title}</h3>
                  {item.link ? (
                    <p><a href={item.link}>{item.content}</a></p>
                  ) : (
                    <p>{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              className="contact-social"
              variants={itemVariants}
            >
              <h3>Connect With Me</h3>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.link} 
                    target="_blank"
                    whileHover={{ y: -5, color: "#6c63ff", backgroundColor: "#fff" }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    <i className={`fab ${social.icon}`}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="contact-form"
            variants={itemVariants}
          >
            {submitError && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.div>
            )}
            
            {submitSuccess && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Message sent successfully!
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="Subject" 
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </motion.div>
              
              <motion.div 
                className="form-group"
                variants={itemVariants}
              >
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your Message" 
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
              </motion.div>
              
              <motion.button 
                type="submit" 
                className="btn btn-primary"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 