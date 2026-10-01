import React, { useState } from 'react';

// Product dataset organized by categories extracted from the Yava Paints dealer rate list
const categoriesData = [
  {
    id: 'distempers',
    name: 'Distempers',
    description: 'High quality interior distempers and wall finishes',
    products: [
      { id: 1, name: 'Happy Lac Distemper', size: '20 KGS', price: '₹809.20', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
      { id: 2, name: 'Ultra Fine Distemper', size: '20 KGS', price: '₹809.20', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' },
      { id: 3, name: 'Happy Lac (Lemon Suffle)', size: '20 KGS', price: '₹949.20', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
      { id: 4, name: 'Happy Lac (Electric Blue)', size: '20 KGS', price: '₹1015.10', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'primers',
    name: 'Primers',
    description: 'Durable dual, interior, and exterior primers for surface preparation',
    products: [
      { id: 7, name: 'Starex Dual Primer', size: '20 LTR', price: '₹1562.40', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
      { id: 8, name: 'Maxwell Dual Primer', size: '20 LTR', price: '₹1562.40', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' },
      { id: 9, name: 'Maxwell Exterior Primer', size: '20 LTR', price: '₹1957.70', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
      { id: 10, name: 'Maxwell Interior Primer', size: '20 LTR', price: '₹1294.60', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'emulsions',
    name: 'Emulsions',
    description: 'Premium interior, exterior, and advance dual-power wall paints',
    products: [
      { id: 13, name: 'Fordax Exterior Emulsion', size: '20 LTR', price: '₹3145.60', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' },
      { id: 14, name: 'Fordax Interior Emulsion', size: '20 LTR', price: '₹2697.00', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
      { id: 15, name: 'Dual Power Emulsion', size: '20 LTR', price: '₹2230.20', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
      { id: 16, name: 'Ever Glow Emulsion', size: '20 LTR', price: '₹6836.80', imageUrl: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'textures',
    name: 'Textures',
    description: 'Decorative and protective heavy-duty surface textures',
    products: [
      { id: 19, name: 'Rudra Texture', size: '25 KGS', price: '₹717.20', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
      { id: 20, name: 'Ultra Texture (BKT)', size: '20 KGS', price: '₹756.90', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'sealants-removers',
    name: 'Sealants & Removers',
    description: 'Roof waterproofing solutions and specialized paint removers',
    products: [
      { id: 21, name: 'Roof Top Sealant', size: '20 LTR', price: '₹4717.80', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
      { id: 22, name: 'Paint Remover', size: '1 LTR', price: '₹196.30', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
    ]
  },
  {
    id: 'brushes',
    name: 'Brushes',
    description: 'Professional paint brushes for clean application',
    products: [
      { id: 23, name: 'Yava 5" Brush', size: '1 Crt (12 Pcs)', price: '₹91.10', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
      { id: 24, name: 'Yava 3" Brush', size: '1 Crt (36 Pcs)', price: '₹35.00', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
      { id: 25, name: 'Yava 2" Brush', size: '1 Crt (70 Pcs)', price: '₹21.00', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
    ]
  }
];

const spaceGridImages = [
  { id: 1, size: 'large', type: 'LIVING ROOM', name: 'Industrial Depth', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, size: 'small-text', text: 'SHOP THIS LOOK', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
  { id: 3, size: 'small-plain', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, size: 'small-plain', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
];

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleNavigateToCategory = (categoryId) => {
    // Standard navigation or router push action
    window.location.href = `/products?category=${categoryId}`;
  };

  const filteredCategories = activeCategory === 'all' 
    ? categoriesData 
    : categoriesData.filter(cat => cat.id === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[#f4f6fb] text-gray-800 font-sans">
      
      {/* SECTION 1: PRODUCT CATALOGUE GALLERY */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-8">
        {/* Header */}
        <div className="mb-12 space-y-3">
          <h1 className="font-serif text-4xl font-bold text-[#002B49]">Yava Paints Catalogue</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Explore our product catalog ranging from emulsions and distempers to high-grade primers and application tools.
          </p>
        </div>

        {/* Gallery Layout */}
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* 1. Sidebar Category Filter */}
          <aside className="w-full md:w-64 space-y-8 shrink-0">
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-[#002B49] uppercase">Product Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === 'all'
                      ? 'bg-[#002B49] text-white shadow-sm'
                      : 'bg-white hover:bg-gray-100 border border-gray-100 text-gray-700'
                  }`}
                >
                  <span>All Products</span>
                </button>

                {categoriesData.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-[#002B49] text-white shadow-sm'
                        : 'bg-white hover:bg-gray-100 border border-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 ml-2">
                      {category.products.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* 2. Products Display by Category */}
          <main className="flex-1 space-y-12">
            {filteredCategories.map(category => (
              <div key={category.id} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                
                {/* Category Header with View More Link */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#002B49] font-serif">{category.name}</h2>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  <button
                    onClick={() => handleNavigateToCategory(category.id)}
                    className="text-sm font-semibold text-[#002B49] hover:underline flex items-center gap-1 shrink-0"
                  >
                    View More ({category.products.length})
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Grid showing maximum of 4 products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.products.slice(0, 4).map(product => (
                    <div
                      key={product.id}
                      className="group cursor-pointer flex flex-col justify-between border border-gray-100 rounded-xl p-3 hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-3">
                        <div className="relative w-full h-44 rounded-lg overflow-hidden bg-gray-50">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[#002B49] group-hover:underline line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium">Pack: {product.size}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#002B49]">{product.price}</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold bg-[#002B49]/10 text-[#002B49] px-2 py-0.5 rounded">
                          In Stock
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </main>
        </div>
      </section>

      {/* SECTION 2: SEE IT IN YOUR SPACE */}
      <section className="bg-white border-t border-gray-100 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2 className="font-serif text-5xl font-bold text-[#002B49] text-center">
            See it in Your Space
          </h2>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
            {/* 1. Large Feature Card */}
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-xl">
              <img 
                src={spaceGridImages[0].imageUrl} 
                alt="Living Room" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-xs font-bold tracking-widest text-gray-300 uppercase">LIVING ROOM</span>
                <p className="font-serif text-3xl font-bold">Industrial Depth</p>
              </div>
            </div>

            {/* 2. Sub-grid area */}
            <div className="grid grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                <img 
                  src={spaceGridImages[1].imageUrl} 
                  alt="Workspace" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-6 py-3 rounded-full text-[#002B49] font-semibold text-xs tracking-wider shadow-md hover:scale-105 transition-transform">
                    SHOP THIS LOOK
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                  <img 
                    src={spaceGridImages[2].imageUrl} 
                    alt="Paint Finish Close up" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md">
                  <img 
                    src={spaceGridImages[3].imageUrl} 
                    alt="Exterior House" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" 
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}