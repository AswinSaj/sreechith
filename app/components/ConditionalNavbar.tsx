'use client'

import { usePathname } from 'next/navigation'
import { NavbarDemo } from './Navbar'
import { useLoading } from '../contexts/LoadingContext'

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const { isLoading } = useLoading()
  
  // Don't show navbar on studio routes
  if (pathname.startsWith('/studio')) {
    return null
  }
  
  // Don't show navbar during loading
  if (isLoading) {
    return null
  }
  
  return <NavbarDemo />
}