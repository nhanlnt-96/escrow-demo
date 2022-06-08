import React from 'react';
import Header from '../components/header/Header';
import PageTitle from '../components/pageTitle/PageTitle';

export default function MainLayout({children}) {
  return (
      <div>
        <Header/>
        <PageTitle title={'Escrow'}/>
        <main>
          {children}
        </main>
      </div>
  );
}
