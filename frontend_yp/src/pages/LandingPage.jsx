import React from 'react';
import { NavLink } from 'react-router-dom';

// Data for Trending Yava Paints Products (extracted from Dealer Rate List)
const trendingPalettes = [
  {
    name: 'Ever Glow Emulsion',
    code: '20 LTR',
    price: '₹6,836.80',
    category: 'Emulsions',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Dual Power Advance Emulsion',
    code: '20 LTR',
    price: '₹5,435.00',
    category: 'Emulsions',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Roof Top Sealant',
    code: '20 LTR',
    price: '₹4,717.80',
    category: 'Sealants',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Fordax Exterior Emulsion',
    code: '20 LTR',
    price: '₹3,145.60',
    category: 'Emulsions',
    imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Starex Dual Primer',
    code: '20 LTR',
    price: '₹1,562.40',
    category: 'Primers',
    imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'Happy Lac Distemper',
    code: '20 KGS',
    price: '₹809.20',
    category: 'Distempers',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
  },
];

// Data for Shop By Room Section
const roomCategories = [
  {
    title: 'Bedroom',
    description: 'Serene finishes for ultimate rest.',
    imageUrl: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Workspace',
    description: 'Authority meets creativity.',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Kitchen',
    description: 'Durable, vibrant, culinary hubs.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop',
  },
];

export default function LandingPage() {
  return (
    <div className="w-full bg-white text-gray-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative w-full h-[85vh] min-h-[550px] bg-cover bg-center flex items-center justify-start px-6 md:px-16"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop')`,
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Glassmorphism Card */}
        <div className="relative z-10 max-w-xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl text-white space-y-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
            The Architecture of Color.
          </h1>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            Experience paint engineered for industrial reliability and curated for artistic expression. Transform your space with Yava Paints&apos; premium finishes.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <NavLink
              to="/collections"
              className="bg-white text-[#002B49] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md"
            >
              Explore Collections
            </NavLink>
            <NavLink
              to="/cart"
              className="border border-white text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-all"
            >
              Order Swatches
            </NavLink>
          </div>
        </div>
      </section>

      {/* 2. TRENDING PRODUCTS / PALETTE SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#002B49] uppercase">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#002B49] mt-1">
              Featured Yava Coatings
            </h2>
          </div>
          <NavLink
            to="/collections"
            className="text-xs font-semibold text-[#002B49] underline underline-offset-4 hover:opacity-80"
          >
            View All Products
          </NavLink>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingPalettes.map((item, index) => (
            <NavLink key={index} to="/collections" className="space-y-2 group cursor-pointer block">
              <div className="relative w-full h-44 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-white/90 text-[#002B49] px-1.5 py-0.5 rounded shadow-sm">
                  {item.category}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#002B49] truncate">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-[10px] text-gray-500 font-medium">{item.code}</p>
                  <p className="text-xs font-bold text-[#002B49]">{item.price}</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY ROOM (With Image Zoom on Hover) */}
      <section className="bg-[#f4f6fb] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#002B49] text-center">
            Shop by Room
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roomCategories.map((room, index) => (
              <div
                key={index}
                className="group relative h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                {/* Background Image with Zoom Effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url('${room.imageUrl}')` }}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Room Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                  <h3 className="font-serif text-2xl font-bold">{room.title}</h3>
                  <p className="text-xs text-gray-300">{room.description}</p>
                  <div className="pt-2">
                    <NavLink
                      to="/collections"
                      className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-xs px-4 py-2 rounded-md hover:bg-white hover:text-black transition-all"
                    >
                      Shop Colors
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERTISE & SUPPORT SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image & Experience Badge Side */}
          <div className="relative">
            {/* Top Yellow Accent Block */}
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-[#E9C349] -z-10 rounded-tl-lg" />

            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://ik.imagekit.io/0gtu7pff5/Gemini_Generated_Image_tbmfu7tbmfu7tbmf.png"
                alt="Painter Application"
                className="w-full h-[450px] object-cover"
              />

              {/* Glass Stats Overlay Box */}
              <div className="absolute bottom-0 left-0 bg-white/80 backdrop-blur-md p-6 rounded-tr-2xl border-t border-r border-white/50 max-w-xs space-y-1">
                <span className="text-3xl font-bold text-[#002B49]">15+</span>
                <p className="text-xs text-gray-700 font-medium leading-tight">
                  Years of industrial expertise in every gallon.
                </p>
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#002B49] uppercase">
              Expertise & Support
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#002B49] leading-tight">
              Professional Services for Contractors & Homeowners
            </h2>

            {/* Feature List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="mt-1 text-[#002B49]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">On-Site Color Matching</h4>
                  <p className="text-xs text-gray-600">Precision tech to match any surface or shade preference.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 text-[#002B49]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Industrial Grade Coatings</h4>
                  <p className="text-xs text-gray-600">Durability that exceeds commercial standards for every project.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="mt-1 text-[#002B49]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Pro-Network Referrals</h4>
                  <p className="text-xs text-gray-600">Connect with certified Yava Paints master applicators.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button className="bg-[#002B49] text-white text-xs font-bold px-6 py-3 rounded-md hover:bg-[#003d66] transition-colors shadow-md">
                Inquire About Services
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}