import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `relative pb-2 transition-colors duration-200 ${
      isActive
        ? "text-[#002B49] font-semibold"
        : "text-gray-700 hover:text-[#002B49]"
    }`;

  return (
    <nav className="w-full bg-[#f4f6fb] px-8 py-4 flex items-center justify-between border-b border-gray-200/60">

      {/* Brand Logo & Name */}
      <div className="flex items-center space-x-3 cursor-pointer">
        {/* Drop Icon */}
        <div className="w-8 h-8 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#002B49] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          </svg>
        </div>

        {/* Brand Text */}
        <NavLink
          to="/"
          className="font-serif text-2xl font-bold tracking-tight text-[#002B49]"
        >
          Yavapaints
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-10 text-sm font-medium">

        {/* Inspiration */}
        <NavLink to="/" className={navLinkClass}>
          {({ isActive }) => (
            <>
              Inspiration

              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#002B49] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </>
          )}
        </NavLink>

        {/* Colour Collections */}
        <NavLink to="/collections" className={navLinkClass}>
          {({ isActive }) => (
            <>
              Colour Collections

              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-[#002B49] transition-all duration-300 ${
                  isActive ? "w-full" : "w-0"
                }`}
              />
            </>
          )}
        </NavLink>

        {/* Products */}
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

      {/* Search Bar & Cart */}
      <div className="flex items-center space-x-6">

        {/* Search Input */}
        <div className="relative flex items-center">
          <svg
            className="w-4 h-4 text-gray-500 absolute left-3.5 pointer-events-none"
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
            placeholder="Find your perfect shade"
            className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-[#e5ecf6] text-sm text-gray-700 rounded-xl placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#002B49]/30 transition-all"
          />
        </div>

        {/* Cart */}
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

        {/* Login */}
        <NavLink
          to="/login"
          className="relative p-1 text-[#002B49] hover:opacity-80 transition-opacity"
        >
          Login
        </NavLink>

      </div>
    </nav>
  );
}