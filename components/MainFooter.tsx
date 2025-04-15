"use client";
import React from 'react';
import Link from 'next/link';
import { Sarpanch } from 'next/font/google';


const sarpanch = Sarpanch({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function MainFooter() {
  return (
    <footer 
      className={`bg-black text-white z-50 relative ${sarpanch.className}`}
      style={{ height: '40vh', position: 'relative' }}
    >
      {/* Aurora background effect */}
      
      
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div>
            <h2 className="text-2xl font-['TAN-Pearl'] mb-3">IRCO | IAS</h2>
            <p className="text-gray-300 mb-4 max-w-md text-sm">
              Empowering future leaders through comprehensive education and training programs
              designed to excel in administrative services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="relative z-20 pointer-events-auto">
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li className="relative z-20"><Link href="/team" className="text-gray-300 hover:text-white transition-colors block py-1 px-2 relative z-20">Team</Link></li>
              <li className="relative z-20"><Link href="/notice" className="text-gray-300 hover:text-white transition-colors block py-1 px-2 relative z-20">Notice</Link></li>
              <li className="relative z-20"><Link href="/about" className="text-gray-300 hover:text-white transition-colors block py-1 px-2 relative z-20">About</Link></li>
              <li className="relative z-20"><Link href="/programs" className="text-gray-300 hover:text-white transition-colors block py-1 px-2 relative z-20">Programs</Link></li>
              <li className="relative z-20"><Link href="/visits" className="text-gray-300 hover:text-white transition-colors block py-1 px-2 relative z-20">Visits</Link></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <svg className="w-4 h-4 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-300">123 Education Street, Delhi, India</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span className="text-gray-300">info@ircoias.com</span>
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span className="text-gray-300">+44 (0)141 345 9976</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
