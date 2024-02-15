import React from 'react'
import Header from './Header';
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
    <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description}/>
        <meta name="keywords" content={keywords}/>
        <meta name="author" content={author}/>
        <title>{title}</title>
      </Helmet>
    <Header/>
    <main style={{minHeight: '70vh'}}>
    {children}
    <ToastContainer />

    </main>
    <Footer/>
    </>
  ) 
}
Layout.defaultProps = {
    title :'Delicious',
    description : 'mern stack project',
    keywords : 'mern,react,node,mongodb',

}

export default Layout