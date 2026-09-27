import React, { useState } from 'react';

// Sample data structure for the colors in the grid
const initialColors = [
  { id: 1, name: 'Midnight Basin', code: '#1A365D', color: 'bg-[#1A365D]', finish: 'MATTE' },
  { id: 2, name: 'Yavapai Sky', code: '#455F88', color: 'bg-[#455F88]', finish: 'SATIN' },
  { id: 3, name: 'Cloud Horizon', code: '#ADC7F7', color: 'bg-[#ADC7F7]', finish: 'EGGSHELL' },
  { id: 4, name: 'Obsidian Deep', code: '#1A2B3C', color: 'bg-[#1A2B3C]', finish: 'GLOSS' },
  { id: 5, name: 'Storm Peak', code: '#2D476F', color: 'bg-[#2D476F]', finish: 'MATTE' },
  { id: 6, name: 'Arctic Mist', code: '#86A0CD', color: 'bg-[#86A0CD]', finish: 'EGGSHELL' },
  { id: 7, name: 'Abyss', code: '#001B3C', color: 'bg-[#001B3C]', finish: 'GLOSS' },
  { id: 8, name: 'Glacier Frost', code: '#D6E3FF', color: 'bg-[#D6E3FF]', finish: 'MATTE' },
];

const colorFamilies = [
  { name: 'Neutrals', color: 'bg-[#F3F4F6]' },
  { name: 'Blues', color: 'bg-[#002B49]', active: true },
  { name: 'Greens', color: 'bg-[#406637]' },
  { name: 'Reds', color: 'bg-[#A7372D]' },
  { name: 'Yellows', color: 'bg-[#EBC349]' },
];

const finishes = ['Matte', 'Eggshell', 'Satin', 'Gloss'];

const spaceGridImages = [
  { id: 1, size: 'large', type: 'LIVING ROOM', name: 'Industrial Depth', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, size: 'small-text', text: 'SHOP THIS LOOK', imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop' },
  { id: 3, size: 'small-plain', imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, size: 'small-plain', imageUrl: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop' },
];

export default function Collections() {
  const [selectedFinishes, setSelectedFinishes] = useState(['Matte', 'Eggshell', 'Satin']);

  const toggleFinish = (finish) => {
    if (selectedFinishes.includes(finish)) {
      setSelectedFinishes(selectedFinishes.filter(f => f !== finish));
    } else {
      setSelectedFinishes([...selectedFinishes, finish]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f6fb] text-gray-800 font-sans">
      
      {/* SECTION 1: COLOR GALLERY */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-8">
        {/* Header */}
        <div className="mb-12 space-y-3">
          <h1 className="font-serif text-4xl font-bold text-[#002B49]">Color Gallery</h1>
          <p className="text-gray-600 max-w-2xl leading-relaxed">
            Explore our curated collection of over 500 hand-crafted pigments. From industrial endurance to artisanal delicate finishes.
          </p>
        </div>

        {/* Gallery Layout */}
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* 1. Sidebar Filters */}
          <aside className="w-full md:w-64 space-y-10 shrink-0">
            {/* Color Family */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-[#002B49] uppercase">Color Family</h3>
              <div className="space-y-2.5">
                {colorFamilies.map(family => (
                  <button key={family.name} className={`flex items-center w-full p-2.5 rounded-lg border ${family.active ? 'bg-[#002B49] text-white' : 'bg-white hover:bg-gray-100 border-gray-100'}`}>
                    <div className={`w-5 h-5 rounded-full ${family.color} ${!family.active ? 'border border-gray-200' : ''}`} />
                    <span className="ml-3 text-sm font-medium">{family.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Finish */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-[#002B49] uppercase">Finish</h3>
              <div className="space-y-2.5">
                {finishes.map(finish => (
                  <label key={finish} className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={selectedFinishes.includes(finish)} onChange={() => toggleFinish(finish)} className="w-5 h-5 accent-[#002B49]" />
                    <span className="text-sm font-medium text-gray-700">{finish}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Usage */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest text-[#002B49] uppercase">Usage</h3>
              <div className="space-y-2.5">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="usage" checked className="w-5 h-5 accent-[#002B49]" />
                  <span className="text-sm font-medium text-gray-700">Interior</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="radio" name="usage" className="w-5 h-5 accent-[#002B49]" />
                  <span className="text-sm font-medium text-gray-700">Exterior</span>
                </label>
              </div>
            </div>
          </aside>

          {/* 2. Color Grid */}
          <main className="flex-1 space-y-6">
            {/* Grid Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 48 results for <span className="font-semibold text-gray-900">&quot;Blues&quot;</span></p>
              <div className="flex items-center text-sm font-medium">
                <span className="text-gray-500 mr-2">SORT BY:</span>
                <span className="text-gray-900 font-semibold">Popularity</span>
                <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>

            {/* The Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {initialColors.map(color => (
                <div key={color.id} className="bg-white rounded-lg p-1 group cursor-pointer shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`w-full h-44 rounded ${color.color}`} />
                  <div className="p-3 space-y-1 relative">
                    <h4 className="text-base font-bold text-[#002B49] group-hover:underline">{color.name}</h4>
                    <p className="text-xs text-gray-500">{color.code}</p>
                    <span className="absolute bottom-3 right-3 text-[10px] font-bold text-[#002B49] bg-gray-100 px-2 py-0.5 rounded tracking-wider uppercase">{color.finish}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center pt-8">
              <nav className="flex items-center space-x-1.5 text-sm font-medium">
                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded bg-[#002B49] text-white">1</button>
                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-50">2</button>
                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-50">3</button>
                <span className="px-1 text-gray-400">...</span>
                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-50">12</button>
                <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 bg-white text-gray-500 hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </nav>
            </div>
          </main>
        </div>
      </section>

      {/* SECTION 2: SEE IT IN YOUR SPACE (With Zoom on Hover) */}
      <section className="bg-white border-t border-gray-100 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <h2 className="font-serif text-5xl font-bold text-[#002B49] text-center">
            See it in Your Space
          </h2>

          {/* Optimized Grid Layout using absolute positions and hover zoom */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
            
            {/* 1. Large Feature Card (Industrial Depth) */}
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
              
              {/* Top half: Small Card with Text button */}
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

              {/* Bottom half: Two smaller image tiles */}
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