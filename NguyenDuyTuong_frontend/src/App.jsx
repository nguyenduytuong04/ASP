import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Banner from './components/Banner'
import Home from './components/Home'
import ProductDetail from './components/ProductDetail'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'
import Register from './components/Register'
import About from './components/About'
import Checkout from './components/Checkout'
import OrderConfirmation from './components/OrderConfirmation'
import NewsList from './components/NewsList'

function App() {

  return (
    <Router>
      <div className='bg-black pb-10'>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={< Home/>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/category/:categorySlug" element={<ProductList />} />
          <Route path="/news" element={<NewsList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
   
  )
}

export default App
