
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cartContext";

export default function CartPage({ onProceedToCheckout }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  // =====================================================
  // SAFETY
  // =====================================================

  const items = Array.isArray(cartItems) ? cartItems : [];

  // =====================================================
  // HELPERS
  // =====================================================

  const getItemId = (item) => {
    if (!item) return null;

    if (item._id) return String(item._id);
    if (item.id) return String(item.id);

    return null;
  };

  const getItemName = (item) => {
    return item?.title || item?.name || "Product";
  };

  const getItemImage = (item) => {
    if (item?.selectedImage) {
      return item.selectedImage;
    }

    if (Array.isArray(item?.image)) {
      return item.image[0] || "";
    }

    if (item?.image) {
      return item.image;
    }

    return "";
  };

  const getItemPrice = (item) => {
    if (item?.price === undefined || item?.price === null) {
      return 0;
    }

    if (typeof item.price === "string") {
      return (
        parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0
      );
    }

    return Number(item.price) || 0;
  };

  const getItemQuantity = (item) => {
    const quantity = Number(item?.quantity);

    return quantity >= 1 ? quantity : 1;
  };

  // =====================================================
  // TOTALS
  // =====================================================

  const totalItemsCount = items.reduce(
    (total, item) => total + getItemQuantity(item),
    0
  );

  const subtotal = items.reduce((total, item) => {
    const price = getItemPrice(item);
    const quantity = getItemQuantity(item);

    return total + price * quantity;
  }, 0);

  // 18% GST
  const estimatedTax = subtotal * 0.18;

  const shipping = 0;

  const grandTotal = subtotal + estimatedTax + shipping;

  // =====================================================
  // FORMAT PRICE
  // =====================================================

  const formatPrice = (amount) => {
    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  // =====================================================
  // QUANTITY
  // =====================================================

  const handleQuantityChange = (item, newQuantity) => {
    const id = getItemId(item);

    if (!id) return;

    const quantity = Number(newQuantity);

    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    updateQuantity(id, quantity);
  };

  // =====================================================
  // REMOVE
  // =====================================================

  const handleRemove = (item) => {
    const id = getItemId(item);

    if (!id) return;

    removeFromCart(id);
  };

  // =====================================================
  // CHECKOUT
  // =====================================================

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      return;
    }

    if (onProceedToCheckout) {
      onProceedToCheckout();
    }

    navigate("/checkout");
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] text-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">

          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b59844]">
              Fordax
            </p>

            <h1 className="font-serif text-4xl font-bold text-[#002B49] mt-2">
              Your Cart
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Review your selected products before checkout.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-12 md:p-20 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-[#f2f4f8] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#002B49]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>
            </div>

            <h2 className="font-serif text-2xl font-bold text-[#002B49] mt-6">
              Your cart is empty
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              You haven't added any products to your cart yet.
              Explore our products and add something you like.
            </p>

            <NavLink
              to="/products"
              className="inline-flex items-center justify-center mt-6 px-6 py-3 bg-[#002B49] text-white font-semibold text-sm rounded-lg hover:bg-[#001f33] transition-all shadow-md"
            >
              Continue Shopping
            </NavLink>

          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // CART PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* HEADER */}
        <div className="mb-8">

          <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b59844]">
            Fordax
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">

            <div>
              <h1 className="font-serif text-4xl font-bold text-[#002B49] mt-2">
                Your Cart
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                {totalItemsCount}{" "}
                {totalItemsCount === 1 ? "item" : "items"} in your cart
              </p>
            </div>

            <button
              onClick={clearCart}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition"
            >
              Clear Cart
            </button>

          </div>
        </div>

        {/* MAIN CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PRODUCTS */}

          <div className="lg:col-span-2 space-y-4">

            {items.map((item, index) => {
              const id = getItemId(item) || index;
              const name = getItemName(item);
              const image = getItemImage(item);
              const price = getItemPrice(item);
              const quantity = getItemQuantity(item);

              return (
                <div
                  key={id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6"
                >

                  <div className="flex flex-col sm:flex-row gap-5">

                    {/* IMAGE */}

                    <div className="w-full sm:w-32 h-32 bg-[#f6f7f9] rounded-xl overflow-hidden flex-shrink-0">

                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}

                    </div>

                    {/* DETAILS */}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>
                          <h2 className="font-semibold text-lg text-[#002B49]">
                            {name}
                          </h2>

                          {item?.brand && (
                            <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">
                              {item.brand}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemove(item)}
                          className="text-gray-400 hover:text-red-500 transition"
                          aria-label={`Remove ${name}`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.8"
                              d="M6 7h12M9 7V4h6v3m2 0v13H7V7h10z"
                            />
                          </svg>
                        </button>

                      </div>

                      {/* PRICE */}

                      <p className="text-lg font-bold text-[#002B49] mt-4">
                        ₹{formatPrice(price)}
                      </p>

                      {/* QUANTITY */}

                      <div className="flex items-center justify-between mt-5">

                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                quantity - 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                          >
                            −
                          </button>

                          <span className="w-12 text-center font-semibold">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                quantity + 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 transition"
                          >
                            +
                          </button>

                        </div>

                        {/* ITEM TOTAL */}

                        <p className="font-bold text-[#002B49]">
                          ₹{formatPrice(price * quantity)}
                        </p>

                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}

            <div className="pt-2">

              <NavLink
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#002B49] hover:text-[#b59844] transition"
              >
                ← Continue Shopping
              </NavLink>

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div className="lg:col-span-1">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">

              <h2 className="font-serif text-2xl font-bold text-[#002B49]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Items ({totalItemsCount})
                  </span>

                  <span className="font-medium">
                    ₹{formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    GST (18%)
                  </span>

                  <span className="font-medium">
                    ₹{formatPrice(estimatedTax)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium text-green-600">
                    FREE
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">

                  <div className="flex justify-between items-center">

                    <span className="font-semibold text-[#002B49]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#002B49]">
                      ₹{formatPrice(grandTotal)}
                    </span>

                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Inclusive of applicable taxes
                  </p>

                </div>

              </div>

              {/* CHECKOUT BUTTON */}

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full mt-7 py-3.5 bg-[#002B49] text-white rounded-xl font-semibold hover:bg-[#001f33] transition-all shadow-md"
              >
                Proceed to Checkout
              </button>

              {/* SECURITY NOTE */}

              <div className="mt-5 pt-5 border-t border-gray-100">

                <div className="flex items-center gap-3 text-gray-500">

                  <svg
                    className="w-5 h-5 text-[#b59844]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                      d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                    />
                  </svg>

                  <span className="text-xs">
                    Secure checkout &amp; protected payment
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

