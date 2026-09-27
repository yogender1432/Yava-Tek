import { createBrowserRouter } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Products from "./pages/Products"
import Layout from "./pages/Layout"
import Collections from "./pages/Collections"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import LoginUI from "./pages/LoginUI"
import Register from "./pages/Register"
import About from "./pages/About"
 
 const Router  = createBrowserRouter([
    { Path: '/', element: <Layout /> ,
      children:[
        {
          path: '', element: <LandingPage / >, index: true
        },
        {
          path: '/products', element: <Products />
        },
        {
          path: '/collections', element: <Collections />
        },
        {
          path: '/cart', element: <CartPage />
        },
        {
          path: '/checkout', element: <CheckoutPage />
        },
        {
          path: '/login', element: <LoginUI />
        },{
          path: '/register', element: <Register />
        },
        {
          path: '/about', element: <About />
        }
      ]
    }
 ])
 
 export default Router