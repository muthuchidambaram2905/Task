'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
//import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { Fragment, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import headerNavLinks from '../../data/headerNavLinks'

const About = () => {
  const [navShow, setNavShow] = useState(false)
  const navRef = useRef(null)
console.log(headerNavLinks)
  const onToggleNav = () => {
    // setNavShow((status) => {
    //   if (status) {
    //     enableBodyScroll(navRef.current)
    //   } else {
    //     // Prevent scrolling
    //     disableBodyScroll(navRef.current)
    //   }
    //   return !status
    // })
  }

//   useEffect(() => {
//     return clearAllBodyScrollLocks
//   })

  return (
    <>
              <nav
                ref={navRef}
                className="mt-8 flex h-full basis-0 flex-col items-center overflow-y-auto pt-2 pl-12 text-left bg-gray-900"
              >
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hover:text-primary-500 dark:hover:text-primary-400 mb-4 py-2 pr-4 text-2xl font-bold tracking-widest text-white outline outline-0 dark:text-gray-100"
                    onClick={onToggleNav}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>

              
            
          
    </>
  )
}

export default About