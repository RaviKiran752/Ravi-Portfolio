'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from './SectionHeader';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  link: string;
  image: string;
  reactions?: number;
  comments?: number;
}

const Blogs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const blogPosts: BlogPost[] = [
    {
      title: "What Really Happens When You Type a URL in Your Browser?",
      excerpt: "When you type a URL like https://example.com into your browser and hit Enter, it might feel like magic — a web page appears almost instantly...",
      date: "April 11, 2024",
      link: "https://medium.com/@ravi742t7p/what-really-happens-when-you-type-a-url-in-your-browser-c0990cbd17e5",
      image: "/images/blog_photos/blog-image-1.png",
      reactions: 5
    },
    {
      title: "Decentralized AI (DAI): The Next Evolution of Intelligence",
      excerpt: "Imagine a world where artificial intelligence doesn't live inside the walled gardens of tech giants — but instead, exists freely on...",
      date: "April 11, 2024",
      link: "https://medium.com/@ravi742t7p/decentralized-ai-dai-the-next-evolution-of-intelligence-b961aeb25e0b",
      image: "/images/blog_photos/blog-image-2.png",
      reactions: 32,
      comments: 1
    },
    {
      title: "Jokes About Cat World Domination",
      excerpt: "Cat World Domination Jokes",
      date: "April 10, 2024",
      link: "https://medium.com/@ravi742t7p/jokes-about-cat-world-domination-43f7a9325c82",
      image: "/images/blog_photos/blog-image-3.png"
    }
  ];

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

  return (
    <section id="blogs" className="blogs" ref={sectionRef}>
      <div className="container">
        <SectionHeader title="My Blog Posts" />
        
        <div className="blog-intro">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            I share my thoughts and insights on various topics on my Medium blog. 
            Check out some of my recent articles below or visit my <a href="https://medium.com/@ravi742t7p" target="_blank" rel="noopener noreferrer" className="medium-link">Medium profile</a> for more.
          </motion.p>
        </div>
        
        <motion.div 
          className="blog-posts"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {blogPosts.map((post, index) => (
            <motion.div 
              key={index}
              className="blog-card"
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)' }}
            >
              <div className="blog-image">
                <Image 
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={220}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="blog-content">
                <span className="blog-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  {post.reactions && (
                    <span className="blog-reactions">
                      <i className="fas fa-heart"></i> {post.reactions}
                    </span>
                  )}
                  {post.comments && (
                    <span className="blog-comments">
                      <i className="fas fa-comment"></i> {post.comments}
                    </span>
                  )}
                </div>
                <Link 
                  href={post.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="read-more"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="blog-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a 
            href="https://medium.com/@ravi742t7p" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View All Articles
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blogs; 