import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.jsx'
import {  RouterProvider } from 'react-router-dom'
import CartPage from './pages/CartPage.jsx'
import { CartProvider } from './components/context/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={Router} />
    </CartProvider>
  </StrictMode>,
)
