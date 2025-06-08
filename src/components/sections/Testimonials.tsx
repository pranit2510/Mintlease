'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { StarIcon } from '@heroicons/react/24/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface TestimonialProps {
  id: number;
  name: string;
  location: string;
  vehicle: string;
  savings: number;
  rating: number;
  testimonial: string;
  image: string;
  verified: boolean;
}

const testimonials: TestimonialProps[] = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "San Francisco, CA",
    vehicle: "2023 BMW X5",
    savings: 7200,
    rating: 5,
    testimonial: "The team at Mint Lease saved me over $7,000 on my BMW X5. The process was seamless, and they handled all the negotiations. I couldn't be happier with the service and the final price.",
    image: "/testimonials/sarah-chen.jpg",
    verified: true
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    location: "Austin, TX",
    vehicle: "2024 Mercedes GLC",
    savings: 5850,
    rating: 5,
    testimonial: "Professional service from start to finish. They found me the exact Mercedes I wanted and negotiated a price I never could have gotten myself. The $499 deposit was the best investment I made.",
    image: "/testimonials/michael-rodriguez.jpg",
    verified: true
  },
  {
    id: 3,
    name: "Jennifer Park",
    location: "Miami, FL",
    vehicle: "2023 Audi Q7",
    savings: 8400,
    rating: 5,
    testimonial: "Exceptional experience! Not only did they save me $8,400, but they also secured better financing terms. The white-glove delivery service was the cherry on top. Highly recommend!",
    image: "/testimonials/jennifer-park.jpg",
    verified: true
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Seattle, WA",
    vehicle: "2024 Tesla Model Y",
    savings: 4500,
    rating: 5,
    testimonial: "I was skeptical at first, but Mint Lease delivered exactly what they promised. They even helped me navigate the Tesla ordering process and secured additional incentives I didn't know existed.",
    image: "/testimonials/david-thompson.jpg",
    verified: true
  },
  {
    id: 5,
    name: "Lisa Wang",
    location: "New York, NY",
    vehicle: "2023 Lexus RX",
    savings: 6300,
    rating: 5,
    testimonial: "Outstanding service! They found my dream Lexus RX and saved me thousands. The team kept me informed throughout the entire process. This is how car leasing should be done.",
    image: "/testimonials/lisa-wang.jpg",
    verified: true
  }
];

const StarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ 
  rating, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating ? 'text-orange-500' : 'text-neutral-300'
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<{ 
  testimonial: TestimonialProps; 
  index: number; 
  isActive: boolean;
}> = ({ testimonial, index, isActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.7, 
        scale: isActive ? 1 : 0.95,
        x: `${index * 100}%`
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`absolute inset-0 w-full ${isActive ? 'z-10' : 'z-0'}`}
    >
      <div 
        className="bg-[#FEFCFA] rounded-[20px] p-8 lg:p-10 h-full flex flex-col"
        style={{
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
        }}
      >
        {/* Quote Icon */}
        <div className="mb-6">
          <div className="w-12 h-12 text-emerald-600/30">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-lg lg:text-xl text-neutral-700 leading-relaxed mb-8 flex-grow">
          &ldquo;{testimonial.testimonial}&rdquo;
        </blockquote>

        {/* Customer Info */}
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xl">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>

          {/* Details */}
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-neutral-800">
                {testimonial.name}
              </h4>
              {testimonial.verified && (
                <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <p className="text-neutral-600 text-sm mb-2">{testimonial.location}</p>
            <StarRating rating={testimonial.rating} size="sm" />
          </div>

          {/* Savings */}
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">
              ${testimonial.savings.toLocaleString()}
            </div>
            <div className="text-neutral-600 text-sm">Saved</div>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="mt-6 pt-6 border-t border-neutral-200">
          <div className="text-center">
            <span className="text-neutral-600 text-sm">Leased: </span>
            <span className="font-semibold text-neutral-800">{testimonial.vehicle}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isInView && titleRef.current) {
      gsap.timeline()
        .from(titleRef.current.children, {
          duration: 0.8,
          y: 50,
          opacity: 0,
          stagger: 0.2,
          ease: 'power2.out'
        });
    }
  }, [isInView]);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const totalSavings = testimonials.reduce((sum, t) => sum + t.savings, 0);
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FEF7ED 0%, #FEFCFA 50%, #FEF7ED 100%)',
      }}
    >


      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-neutral-800">Customer </span>
            <span className="text-emerald-600">Success Stories</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
            Don&apos;t just take our word for it. See how we&apos;ve helped thousands of customers 
            save money and get their dream vehicles.
          </p>

          {/* Trust Metrics */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">
                $15M+
              </div>
              <div className="text-neutral-600">Total Savings</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <span className="text-3xl font-bold text-orange-500">{averageRating}</span>
                <StarRating rating={Math.floor(averageRating)} size="lg" />
              </div>
              <div className="text-neutral-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">2,500+</div>
              <div className="text-neutral-600">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-6xl mx-auto relative">
          {/* Navigation Arrows - Outside the card */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 z-20 hover:scale-110"
            style={{
              boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
            }}
          >
            <ChevronLeftIcon className="w-6 h-6 text-neutral-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 z-20 hover:scale-110"
            style={{
              boxShadow: '0 4px 20px rgba(139, 69, 19, 0.08), 0 8px 40px rgba(139, 69, 19, 0.04)',
            }}
          >
            <ChevronRightIcon className="w-6 h-6 text-neutral-600" />
          </button>

          {/* Testimonial Card Container */}
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 lg:h-80 overflow-hidden rounded-[20px]">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index - activeIndex}
                  isActive={index === activeIndex}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === activeIndex 
                    ? 'bg-emerald-600 scale-125' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-neutral-800 mb-4">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Start your journey to significant savings with our professional auto brokerage service.
          </p>
          <motion.button 
            onClick={() => window.location.href = '/lead'}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-10 py-5 rounded-full text-lg transition-all duration-300 group/btn"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              boxShadow: '0 8px 20px -4px rgba(5, 150, 105, 0.3), 0 16px 40px -8px rgba(5, 150, 105, 0.2), 0 32px 64px -16px rgba(0, 0, 0, 0.15), inset 0 2px 0 rgba(255, 255, 255, 0.1)',
            }}
            whileHover={{ 
              y: -3, 
              scale: 1.02,
              background: 'linear-gradient(135deg, #059669 0%, #10b981 30%, #f97316 70%, #ea580c 100%)',
              boxShadow: '0 12px 28px -4px rgba(5, 150, 105, 0.4), 0 20px 48px -8px rgba(5, 150, 105, 0.25), 0 40px 80px -16px rgba(0, 0, 0, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.15)',
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            Get a Quote
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 