
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

// Get a consistent product ID
const getProductId = (product) => {
  if (!product) return null;

  // Normal MongoDB/Mongoose ID
  if (product._id) {
    if (typeof product._id === "object" && product._id.$oid) {
      return String(product._id.$oid);
    }

    return String(product._id);
  }

  // Normal frontend ID
  if (product.id) {
    return String(product.id);
  }

  // Other possible API ID
  if (product.productId) {
    return String(product.productId);
  }

  return null;
};

// Get product image safely
const getProductImage = (product, selectedImage) => {
  if (selectedImage) {
    return selectedImage;
  }

  if (Array.isArray(product?.image)) {
    return product.image.find(Boolean) || "";
  }

  if (product?.image) {
    return product.image;
  }

  return "";
};

// Convert price safely to number
const getProductPrice = (price) => {
  if (price === undefined || price === null || price === "") {
    return 0;
  }

  if (typeof price === "string") {
    return parseFloat(price.replace(/[^0-9.-]+/g, "")) || 0;
  }

  return Number(price) || 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // =========================================================
  // ADD TO CART
  // =========================================================
  const addToCart = (product, selectedImage = "") => {
    if (!product) {
      console.error("addToCart: Product is missing");
      return;
    }

    const productId = getProductId(product);

    if (!productId) {
      console.error("addToCart: Product ID is missing:", product);
      return;
    }

    const imageSrc = getProductImage(product, selectedImage);
    const price = getProductPrice(product.price);

    const productTitle =
      product.title ||
      product.name ||
      "Fordax Product";

    const category =
      product.category ||
      "General";

    const brand =
      product.brand ||
      "Fordax";

    setCartItems((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => String(item._id || item.id) === String(productId)
      );

      // Product already exists
      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];

        const existingItem = updatedCart[existingIndex];

        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: Number(existingItem.quantity || 1) + 1,
        };

        return updatedCart;
      }

      // New product
      const newItem = {
        _id: productId,
        title: productTitle,
        name: productTitle,
        price,
        image: imageSrc,
        selectedImage: imageSrc,
        category,
        brand,
        quantity: 1,
      };

      return [...prevCart, newItem];
    });

    console.log("Added to cart:", {
      id: productId,
      title: productTitle,
      price,
      image: imageSrc,
    });
  };

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================
  const updateQuantity = (id, newQuantity) => {
    const normalizedId = String(id);

    const quantity = Number(newQuantity);

    if (quantity < 1) {
      removeFromCart(normalizedId);
      return;
    }

    setCartItems((prevCart) =>
      prevCart.map((item) => {
        const itemId = String(item._id || item.id);

        if (itemId === normalizedId) {
          return {
            ...item,
            quantity,
          };
        }

        return item;
      })
    );
  };

  // =========================================================
  // REMOVE FROM CART
  // =========================================================
  const removeFromCart = (id) => {
    const normalizedId = String(id);

    setCartItems((prevCart) =>
      prevCart.filter((item) => {
        const itemId = String(item._id || item.id);

        return itemId !== normalizedId;
      })
    );
  };

  // =========================================================
  // CLEAR CART
  // =========================================================
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cart: cartItems,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// =========================================================
// USE CART HOOK
// =========================================================
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return context;
};

