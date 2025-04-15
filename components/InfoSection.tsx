"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TypewriterEffectSmooth } from '@/components/typewriter-effect';
import Link from 'next/link';

export default function InfoSection() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  // Title words for typewriter effect
  const titleWords = [
    { text: "About" },
    { text: "Us" },
    { text: "&" },
    { text: "Our" },
    { text: "Programs" },
  ];

  return (
    <div className="container mx-auto px-4 font-['Sarpanch']">
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 font-['Sarpanch'] tracking-wider">
          <TypewriterEffectSmooth words={titleWords} />
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
      </div>
      
      {/* Bennett University Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 font-['Sarpanch']">Bennett University</h2>
            <p className="text-gray-300 mb-4 font-['Sarpanch']">
              Bennett University is a premier educational institution established by the Times Group, India's largest media conglomerate. Founded with a vision to provide Ivy League quality education, the university is located in Greater Noida, near Delhi NCR.
            </p>
            <p className="text-gray-300 mb-4 font-['Sarpanch']">
              The university offers undergraduate, postgraduate, and doctoral programs across various disciplines including Engineering, Management, Law, Media, and Liberal Arts. Bennett University is committed to providing a transformative educational experience that prepares students for leadership roles in a rapidly evolving global landscape.
            </p>
            <p className="text-gray-300 font-['Sarpanch']">
              With state-of-the-art infrastructure, industry partnerships, and a focus on research and innovation, Bennett University stands at the forefront of academic excellence in India.
            </p>
          </div>
          <div className="md:w-1/2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/bennett-campus.jpg" 
              alt="Bennett University Campus" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>
      
      {/* IRCO Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 font-['Sarpanch']">About IRCO</h2>
            <p className="text-gray-300 mb-4 font-['Sarpanch']">
              The International Relations and Collaborations Office (IRCO) at Bennett University serves as the gateway to global opportunities for students and faculty. IRCO facilitates international partnerships, exchange programs, and collaborative research initiatives with prestigious institutions worldwide.
            </p>
            <p className="text-gray-300 mb-4 font-['Sarpanch']">
              Through strategic alliances with universities across the globe, IRCO enables students to gain international exposure, cultural understanding, and a global perspective that is essential in today's interconnected world.
            </p>
            <p className="text-gray-300 font-['Sarpanch']">
              IRCO's mission is to foster a globally engaged campus community and to position Bennett University as a hub for international academic collaboration and innovation.
            </p>
          </div>
          <div className="md:w-1/2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/irco-office.jpg" 
              alt="IRCO Office" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>
      
      {/* Testimonial Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 md:p-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-6 relative">
              <Image 
                src="/abhay-bhansal.jpg" 
                alt="Abhay Bhansal" 
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 font-['Sarpanch']">Abhay Bhansal</h3>
            <p className="text-gray-400 mb-2 font-['Sarpanch']">Director, International Relations</p>
            <div className="w-16 h-0.5 bg-blue-500 mb-6"></div>
            <p className="text-gray-300 italic text-lg mb-6 font-['Sarpanch']">
              "At Bennett University, we believe in providing our students with a truly global education. Through our international partnerships and exchange programs, we are creating future leaders who understand the complexities of our interconnected world and are equipped to address global challenges with innovative solutions."
            </p>
            <div className="flex space-x-2">
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400">★</span>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* IAS About Section */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-6 font-['Sarpanch']">International Affairs Society</h2>
            <p className="text-gray-300 mb-4 font-['Sarpanch']">
              The International Affairs Society (IAS) is a student-led organization at Bennett University that serves as a platform for students interested in global politics, diplomacy, and international relations. Founded with the vision to foster a deeper understanding of world affairs, IAS organizes various activities including debates, model United Nations conferences, guest lectures, and workshops.
            </p>
            <p className="text-gray-300 mb-4 font-['Sarpanch']">
              IAS members engage in discussions on current global issues, policy analysis, and diplomatic simulations that enhance their critical thinking, public speaking, and leadership skills. The society also publishes research papers and newsletters on international affairs.
            </p>
            <p className="text-gray-300 font-['Sarpanch']">
              Through its activities, IAS aims to create a community of globally aware individuals who can contribute meaningfully to international discourse and policy-making in their future careers.
            </p>
          </div>
          <div className="md:w-1/2 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image 
              src="/ias-team.jpg" 
              alt="IAS Team" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>
      
      {/* Glimpse Gallery */}
      <motion.section 
        className="mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center font-['Sarpanch']">Glimpses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="relative h-48 md:h-64 rounded-lg overflow-hidden group">
              <Image 
                src={`/glimpse-${num}.jpg`} 
                alt={`Glimpse ${num}`} 
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4 text-sm font-['Sarpanch']">IAS Event {num}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
      
      {/* Programs Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center font-['Sarpanch']">Programs For You</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Program Card 1 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative h-48">
              <Image 
                src="/program-1.jpg" 
                alt="Global Leadership Program" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 font-['Sarpanch']">Global Leadership Program</h3>
              <p className="text-gray-400 mb-4 font-['Sarpanch']">A comprehensive program designed to develop leadership skills in an international context.</p>
              <Link href="/programs/global-leadership" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-['Sarpanch']">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Program Card 2 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative h-48">
              <Image 
                src="/program-2.jpg" 
                alt="Diplomatic Studies" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 font-['Sarpanch']">Diplomatic Studies</h3>
              <p className="text-gray-400 mb-4 font-['Sarpanch']">An intensive course on diplomatic protocols, international negotiations, and conflict resolution.</p>
              <Link href="/programs/diplomatic-studies" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-['Sarpanch']">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Program Card 3 */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative h-48">
              <Image 
                src="/program-3.jpg" 
                alt="International Policy Workshop" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 font-['Sarpanch']">International Policy Workshop</h3>
              <p className="text-gray-400 mb-4 font-['Sarpanch']">A hands-on workshop on policy formulation, analysis, and implementation in global contexts.</p>
              <Link href="/programs/policy-workshop" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-['Sarpanch']">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link href="/programs" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors font-['Sarpanch']">
            View All Programs
          </Link>
        </div>
      </motion.section>
    </div>
  );
}