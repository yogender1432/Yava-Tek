import { NavLink } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="relative bg-[#1A1D20] text-gray-300 px-8 lg:px-16 py-12 font-sans text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-auto ">
        
        {/* Brand Info (Spans 2 columns on large screens) */}
        <div className=" space-y-3 lg:col-span-2  md:col-span-2 mr-5 ">
          <h2 className="font-serif text-2xl md:text-xl font-bold text-white tracking-tight">
            Yavapaints
          </h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            © 2024 Yavapaints. Industrial Reliability, Artistic Expression.
            Engineering the world&apos;s most durable and vibrant pigments.
          </p>
          
          {/* Social / Info Icons */}
          <div className="flex items-center space-x-4 pt-2 text-gray-400">
            {/* Globe / Website Icon */} 
            <a href="#" className="hover:text-white transition-colors" aria-label="Website">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.8" />
                <path strokeWidth="1.8" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </a>

            {/* Email Icon */}
            <a href="#" className="hover:text-white transition-colors" aria-label="Email">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.8" />
                <path strokeWidth="1.8" d="M3 7l9 6 9-6" />
              </svg>
            </a>

            {/* Verification / Quality Badge Icon */}
            <a href="#" className="hover:text-white transition-colors" aria-label="Quality Certification">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3l2.2 1.3 2.5-.4 1.1 2.3 2.4 1-.2 2.6 1.7 2-1 2.4.5 2.5-2.3 1.1-1 2.4-2.6-.2-2 1.7-2.4-1-2.5.5-1.1-2.3-2.4-1 .2-2.6-1.7-2 1-2.4-.5-2.5 2.3-1.1 1-2.4 2.6.2 2-1.7z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Company Links */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest text-[#E1BF4E] uppercase">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><NavLink to="/about" className="hover:text-white transition-colors">About Us </NavLink></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest text-[#E1BF4E] uppercase">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold tracking-widest text-[#E1BF4E] uppercase">
            Join Our Palette
          </h3>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
            <input
              type="email"
              placeholder="Email address"
              className="bg-[#2E3338] text-sm text-gray-200 placeholder-gray-500 px-4 py-2.5 rounded-l-md outline-none border border-transparent focus:border-gray-500 w-full transition-all"
            />
            <button
              type="submit"
              className="bg-[#FFD64D] hover:bg-[#f3c837] text-black font-bold text-xs uppercase px-5 py-3 rounded-r-md transition-colors tracking-wider"
            >
              Join
            </button>
          </form>
           {/* Floating Paintbrush Action Button */}
      <button
        aria-label="Palette Tool"
        className=" bg-[#002B49] text-white p-3 rounded-2xl shadow-xl hover:bg-[#003d66] transition-all hover:scale-105"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 4V3c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h12c.55 0 1-.45 1-1zM6 7v4c0 1.66 1.34 3 3 3h1v7c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-7h1c1.66 0 3-1.34 3-3V7H6z" />
        </svg>
      </button>
        </div>
        
        </div>

     
    </footer>
  );
}