'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  CalendarDaysIcon, 
  MagnifyingGlassIcon, 
  TruckIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

interface StepProps {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  delay: number;
}

const ProcessStep: React.FC<StepProps> = ({ 
  step, 
  title, 
  description, 
  icon, 
  features, 
  delay 
}) => {
  const stepRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stepRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      {/* Connection Line */}
      {step < 3 && (
        <div className="hidden lg:block absolute top-24 left-1/2 w-32 h-0.5 bg-gradient-to-r from-primary-emerald to-primary-emerald-light transform translate-x-8 z-0">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: delay + 0.3 }}
            className="w-full h-full bg-gradient-to-r from-primary-emerald to-primary-emerald-light origin-left"
          />
        </div>
      )}

      {/* Step Card */}
      <div className="glass luxury-card p-8 text-center hover:transform hover:scale-105 transition-all duration-300">
        {/* Step Number */}
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-emerald text-white text-2xl font-bold shadow-glow">
          {step}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 p-4 rounded-2xl bg-gradient-to-br from-primary-emerald/10 to-primary-emerald-light/10 border border-primary-emerald/20">
            <div className="w-full h-full text-primary-emerald">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-neutral-800 mb-4">
          {title}
        </h3>
        <p className="text-neutral-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.5 + (index * 0.1) }}
              className="flex items-center text-neutral-600 text-sm"
            >
              <CheckCircleIcon className="w-5 h-5 text-primary-emerald mr-3 flex-shrink-0" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });

  const steps = [
    {
      step: 1,
      title: "Book Consultation",
      description: "Secure your spot with a $499 refundable deposit. Schedule a consultation that fits your timeline and preferences.",
      icon: <CalendarDaysIcon className="w-full h-full" />,
      features: [
        "100% refundable if not satisfied",
        "Flexible scheduling options",
        "In-person or virtual meetings",
        "No hidden fees or commitments"
      ]
    },
    {
      step: 2,
      title: "Vehicle Sourcing",
      description: "Our experts locate your dream vehicle through our extensive dealer network and negotiate the best possible price.",
      icon: <MagnifyingGlassIcon className="w-full h-full" />,
      features: [
        "Access to 500+ dealer network",
        "Professional price negotiation",
        "Vehicle history verification",
        "Market analysis & comparisons"
      ]
    },
    {
      step: 3,
      title: "White-Glove Delivery",
      description: "Complete paperwork handling, financing optimization, and convenient delivery to your location.",
      icon: <TruckIcon className="w-full h-full" />,
      features: [
        "Paperwork handled for you",
        "Financing rate optimization",
        "Delivery to your location",
        "Post-purchase support"
      ]
    }
  ];

  const guarantees = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Money-Back Guarantee",
      description: "100% refund if we don't save you money"
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      title: "Transparent Pricing",
      description: "No hidden fees, clear cost breakdown"
    },
    {
      icon: <CheckCircleIcon className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Every vehicle thoroughly inspected"
    }
  ];

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

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 bg-gradient-to-br from-neutral-50 to-neutral-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-radial opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-radial opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process ensures you get the best deal with minimal effort. 
            From consultation to delivery, we handle everything professionally.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.step}
              {...step}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass luxury-card p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-800 mb-4">
              Our <span className="gradient-text">Guarantees</span>
            </h3>
            <p className="text-neutral-600 text-lg">
              We stand behind our service with industry-leading guarantees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-primary-emerald/10 to-primary-emerald-light/10 border border-primary-emerald/20 group-hover:shadow-glow transition-all duration-300">
                  <div className="text-primary-emerald">
                    {guarantee.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-neutral-800 mb-2">
                  {guarantee.title}
                </h4>
                <p className="text-neutral-600">
                  {guarantee.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-neutral-800 mb-4">
            Ready to Save Thousands on Your Next Car?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join 2,500+ satisfied customers who have saved over $15 million with our expert auto brokerage service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/booking'}
              className="bg-gradient-emerald text-white px-8 py-4 rounded-lg font-semibold hover:shadow-glow hover:scale-105 transition-all duration-300"
            >
              Book $499 Consultation
            </button>
            <button 
              onClick={() => window.location.href = '/calculator'}
              className="bg-white text-primary-emerald px-8 py-4 rounded-lg font-semibold border-2 border-primary-emerald hover:bg-primary-emerald hover:text-white transition-all duration-300"
            >
              Calculate Savings
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 