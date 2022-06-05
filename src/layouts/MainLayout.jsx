import React from 'react'
import Footer from './../components/Footer';
import Header from "../components/header/Header";

export default function MainLayout({children}) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
