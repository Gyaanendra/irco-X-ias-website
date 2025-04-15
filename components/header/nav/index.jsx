'use client';
import styles from './style.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim';
import Body from './Body';
import Footer from './Footer';
import Image from './Image';

const links = [
    { title: "Home", href: "/", src: "home.png" },
    { title: "PROGRAMS", href: "/programs", src: "programs.png" },
    { title: "VISITS", href: "/visits", src: "visits.png" },
    { title: "Teams", href: "/teams", src: "teams.png" },
    { title: "Contact", href: "/contact", src: "contact.png" },
    { title: "IRCO", href: "/irco", src: "irco.png" }
];

export default function Nav({ closeNav }) { // Accept closeNav prop
    const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

    return (
        <motion.div variants={height} initial="initial" animate="enter" exit="exit" className={styles.nav}>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <Body 
                        links={links} 
                        selectedLink={selectedLink} 
                        setSelectedLink={setSelectedLink} 
                        closeNav={closeNav} // Pass closeNav to Body
                    />
                    <Footer />
                </div>
                <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive} />
            </div>
        </motion.div>
    );
}