'use client';
import styles from './style.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity } from './anim';
import Nav from './nav';

export default function Index() {
    const [isActive, setIsActive] = useState(false);

    // Function to close the navigation
    const closeNav = () => setIsActive(false);
    
    // Handle body scroll lock when menu is open
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [isActive]);

    return (
        <motion.div 
            className={styles.header}
            animate={{ 
                backgroundColor: isActive ? 'rgb(47, 46, 46)' : 'transparent',
            }}
            transition={{ duration: 0.5 }}
        >
            <div className={`${styles.bar} flex justify-between items-center`}>
                {/* Left logo - increased size */}
                <div className="w-48 md:w-[250px] flex items-center">
                    <Image 
                        src="/bennett.png" 
                        alt="Bennett Logo" 
                        width={250} 
                        height={132} 
                        className="object-contain w-full h-auto"
                        priority
                    />
                </div>

                {/* Menu positioned slightly left of center */}
                <div onClick={() => {setIsActive(!isActive)}} className={`${styles.el} flex-grow flex justify-center -ml-38`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                    <div className={styles.label}>
                        <motion.p 
                            variants={opacity} 
                            animate={!isActive ? "open" : "closed"}
                            transition={{ duration: 0.5 }}
                        >
                            Menu
                        </motion.p>
                        <motion.p 
                            variants={opacity} 
                            animate={isActive ? "open" : "closed"}
                            transition={{ duration: 0.5 }}
                        >
                            Close
                        </motion.p>
                    </div>
                </div>

                {/* Right logo - increased size */}
                <motion.div 
                    variants={opacity} 
                    animate={!isActive ? "open" : "closed"} 
                    className={styles.shopContainer}
                >
                    <div className="w-32 md:w-[130px]">
                        <Image 
                            src="/times.png" 
                            alt="Times Group Logo" 
                            width={130} 
                            height={83} 
                            className="object-contain w-full h-auto"
                        />
                    </div>
                </motion.div>
            </div>
            <div className={`${styles.background} ${isActive ? styles.active : ''}`}></div>
            <AnimatePresence mode="wait">
                {isActive && <Nav closeNav={closeNav} />}
            </AnimatePresence>
        </motion.div>
    );
}