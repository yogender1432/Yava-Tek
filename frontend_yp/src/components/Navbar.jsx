import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Comprehensive dataset from Yava Paints Dealer Rate List
const searchableProducts = [
  // Distempers
  { id: 1, name: "Happy Lac Distemper", size: "20 KGS", price: "₹809.20", category: "Distempers", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Ultra Fine Distemper", size: "20 KGS", price: "₹809.20", category: "Distempers", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Happy Lac Distemper (Lemon Suffle)", size: "20 KGS", price: "₹949.20", category: "Distempers", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Happy Lac Distemper (Electric Blue)", size: "20 KGS", price: "₹1015.10", category: "Distempers", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" },
  
  // Primers
  { id: 5, name: "Starex Dual Primer", size: "20 LTR", price: "₹1562.40", category: "Primers", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Maxwell Dual Primer", size: "20 LTR", price: "₹1562.40", category: "Primers", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Maxwell Exterior Primer", size: "20 LTR", price: "₹1957.70", category: "Primers", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Maxwell Interior Primer", size: "20 LTR", price: "₹1294.60", category: "Primers", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  
  // Emulsions
  { id: 9, name: "Fordax Exterior Emulsion", size: "20 LTR", price: "₹3145.60", category: "Emulsions", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Fordax Interior Emulsion", size: "20 LTR", price: "₹2697.00", category: "Emulsions", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "Dual Power Emulsion", size: "20 LTR", price: "₹2230.20", category: "Emulsions", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop" },
  { id: 12, name: "Dual Power Advance Emulsion", size: "20 LTR", price: "₹5435.00", category: "Emulsions", imageUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop" },
  { id: 13, name: "Ever Glow Emulsion", size: "20 LTR", price: "₹6836.80", category: "Emulsions", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop" },
  
  // Textures & Sealants & Removers
  { id: 14, name: "Rudra Texture", size: "25 KGS", price: "₹717.20", category: "Textures", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  { id: 15, name: "Roof Top Sealant", size: "20 LTR", price: "₹4717.80", category: "Sealants", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop" },
  { id: 16, name: "Paint Remover", size: "1 LTR", price: "₹196.30", category: "Removers", imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop" },
  
  // Brushes
  { id: 17, name: "Yava 5\" Brush", size: "1 Crt (12 Pcs)", price: "₹91.10", category: "Brushes", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop" },
  { id: 18, name: "Yava 3\" Brush", size: "1 Crt (36 Pcs)", price: "₹35.00", category: "Brushes", imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop" }
];

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Filter products based on active search input
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setIsSearchOpen(false);
    } else {
      const filtered = searchableProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    }
  }, [searchTerm]);

  // Close search dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    navigate(`/collections?category=${product.category.toLowerCase()}`);
  };

  const navLinkClass = ({ isActive }) =>
    `relative pb-2 transition-colors duration-200 ${
      isActive
        ? "text-[#002B49] font-semibold"
        : "text-gray-700 hover:text-[#002B49]"
    }`;

  return (
    <nav className="w-full bg-[#f4f6fb] px-4 md:px-8 py-3 flex items-center justify-between border-b border-gray-200/60 sticky top-0 z-50">

      {/* Brand Logo & Name */}
      <NavLink to="/" className="flex items-center space-x-3 cursor-pointer shrink-0">
        <div className="h-10 w-auto">
          <img 
            src="https://yavapaints.com/assets/img/logo.png" 
            alt="Yava Paints Logo" 
            className="h-full object-contain"
          />
        </div>
      </NavLink>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-10 text-sm font-medium">
        <NavLink to="/" className={navLinkClass}>
          {({ isActive }) => (
            <>
              Inspiratio
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#002B49] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </>
          )}
        </NavLink>

        <NavLink to="/collections" className={navLinkClass}>
          {({ isActive }) => (
            <>
              Collections
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#002B49] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </>
          )}
        </NavLink>

        <NavLink to="/products" className={navLinkClass}>
          {({ isActive }) => (
            <>
              Products
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#002B49] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </>
          )}
        </NavLink>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex items-center space-x-4 md:space-x-6">

        {/* Live Search Input with Dropdown */}
        <div className="relative flex items-center" ref={searchRef}>
          <svg
            className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => searchTerm.trim() !== "" && setIsSearchOpen(true)}
            placeholder="Find products, primers, emulsions..."
            className="w-48 sm:w-64 lg:w-80 pl-10 pr-4 py-2 bg-[#e5ecf6] text-sm text-gray-700 rounded-xl placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#002B49]/30 transition-all"
          />

          {/* Search Results Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50 divide-y divide-gray-100">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#002B49] truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {product.category} • {product.size}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#002B49] shrink-0">
                      {product.price}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-xs text-gray-500 text-center">
                  No Yava Paints products found for &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart Link */}
        <NavLink
          to="/cart"
          aria-label="Shopping Cart"
          className="relative p-1 text-[#002B49] hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>

          {/* Badge */}
          <span className="absolute -top-1.5 -right-2 bg-[#e0be42] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
            0
          </span>
        </NavLink>

        {/* Login Link */}
        <NavLink
          to="/login"
          className="hidden sm:inline-block text-sm font-semibold text-[#002B49] hover:opacity-80 transition-opacity"
        >
          Login
        </NavLink>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#002B49] focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#f4f6fb] border-b border-gray-200 p-4 flex flex-col space-y-3 md:hidden shadow-lg z-40">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-800 hover:text-[#002B49]">
            Inspiration
          </NavLink>
          <NavLink to="/collections" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-800 hover:text-[#002B49]">
            Collections
          </NavLink>
          <NavLink to="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-gray-800 hover:text-[#002B49]">
            Products
          </NavLink>
          <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-[#002B49]">
            Login
          </NavLink>
        </div>
      )}

    </nav>
  );
}