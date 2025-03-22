import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-4">
      <div className="container mx-auto flex justify-around">
        <Link href="mailto:example@example.com" className="hover:underline">Email</Link>
        <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</Link>
        <Link href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</Link>
        <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</Link>
        <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</Link>
      </div>
    </footer>
  )
}

export default Footer