
import  { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/context/cartContext";

// IMPORTANT:
// Your previous URL had 127.2.0.1.
// Use 127.0.0.1 if your backend is running locally.
const API_URL = "http://127.2.0.1:7000/api/yp/products";

// ---------------------------------------------------------
// GET PRODUCT ID
// ---------------------------------------------------------
const getProductId = (product) => {
  if (!product) return null;

  if (product._id) {
    if (
      typeof product._id === "object" &&
      product._id.$oid
    ) {
      return String(product._id.$oid);
    }

    return String(product._id);
  }

  if (product.id) {
    return String(product.id);
  }

  if (product.productId) {
    return String(product.productId);
  }

  return null;
};

// ---------------------------------------------------------
// GET PRODUCT IMAGES
// ---------------------------------------------------------
const getProductImages = (product) => {
  if (!product) return [];

  if (Array.isArray(product.image)) {
    return product.image.filter(Boolean);
  }

  if (typeof product.image === "string" && product.image.trim()) {
    return [product.image];
  }

  return [];
};

// ---------------------------------------------------------
// GET PRODUCT TITLE
// ---------------------------------------------------------
const getProductTitle = (product) => {
  return (
    product?.title ||
    product?.name ||
    "Product"
  );
};

// ---------------------------------------------------------
// GET PRICE
// ---------------------------------------------------------
const getProductPrice = (price) => {
  if (
    price === undefined ||
    price === null ||
    price === ""
  ) {
    return null;
  }

  if (typeof price === "string") {
    const parsed = parseFloat(
      price.replace(/[^0-9.-]+/g, "")
    );

    return Number.isNaN(parsed) ? null : parsed;
  }

  const parsed = Number(price);

  return Number.isNaN(parsed) ? null : parsed;
};

// =========================================================
// PRODUCTS COMPONENT
// =========================================================
export default function Products() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addingToCart, setAddingToCart] = useState(false);

  // =======================================================
  // FETCH PRODUCTS FROM BACKEND
  // =======================================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL);

        console.log("Products API response:", response.data);

        // Support:
        // { data: [...] }
        // OR
        // [...]
        const productsList =
          Array.isArray(response.data)
            ? response.data
            : response.data?.data;

        // -----------------------------------------------
        // IMPORTANT:
        // DO NOT ADD DEFAULT/HARDCODED PRODUCTS HERE
        // -----------------------------------------------
        if (!Array.isArray(productsList)) {
          setProducts([]);
          setProduct(null);

          setError(
            "Invalid product data received from server."
          );

          return;
        }

        // Remove invalid records that don't have an ID
        const validProducts = productsList.filter(
          (item) => getProductId(item)
        );

        console.log(
          "Valid products:",
          validProducts
        );

        setProducts(validProducts);

        // No products from backend
        if (validProducts.length === 0) {
          setProduct(null);
          return;
        }

        // Select first DATABASE product
        const firstProduct = validProducts[0];

        setProduct(firstProduct);

        // Set first image
        const firstImages =
          getProductImages(firstProduct);

        setSelectedImage(
          firstImages.length > 0
            ? firstImages[0]
            : ""
        );
      } catch (err) {
        console.error(
          "Failed to fetch products:",
          err
        );

        setProducts([]);
        setProduct(null);

        if (err.response) {
          setError(
            `Server error: ${err.response.status}`
          );
        } else if (err.request) {
          setError(
            "Backend server is not responding. Please make sure your backend is running."
          );
        } else {
          setError(
            "Unable to load products."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =======================================================
  // SELECT PRODUCT
  // =======================================================
  const handleProductSelect = (item) => {
    if (!item) return;

    const id = getProductId(item);

    if (!id) {
      console.error(
        "Selected product does not have an ID:",
        item
      );
      return;
    }

    setProduct(item);

    const images =
      getProductImages(item);

    setSelectedImage(
      images.length > 0
        ? images[0]
        : ""
    );
  };

  // =======================================================
  // ADD TO CART
  // =======================================================
  const handleAddToCart = () => {
    if (!product) {
      console.error(
        "Cannot add product: no product selected."
      );
      return;
    }

    const productId =
      getProductId(product);

    if (!productId) {
      console.error(
        "Cannot add product: product ID missing.",
        product
      );
      return;
    }

    console.log(
      "Adding product to cart:",
      {
        id: productId,
        title: getProductTitle(product),
        price: product.price,
        selectedImage,
      }
    );

    try {
      setAddingToCart(true);

      addToCart(
        product,
        selectedImage
      );

      // Go to cart after adding
      navigate("/cart");
    } catch (err) {
      console.error(
        "Error adding product to cart:",
        err
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // =======================================================
  // LOADING
  // =======================================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#002B49]">
        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-[#002B49] border-t-transparent rounded-full animate-spin" />

          <p className="text-sm font-semibold">
            Loading products...
          </p>

        </div>
      </div>
    );
  }

  // =======================================================
  // ERROR
  // =======================================================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">

        <div className="max-w-md text-center">

          <div className="text-5xl mb-5">
            ⚠️
          </div>

          <h2 className="text-2xl font-bold text-[#002B49]">
            Unable to Load Products
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 px-6 py-3 rounded-lg bg-[#002B49] text-white text-sm font-semibold hover:bg-[#003d66]"
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // =======================================================
  // NO PRODUCTS
  // =======================================================
  if (
    !product ||
    products.length === 0
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">

        <div className="text-center">

          <div className="text-6xl mb-5">
            🎨
          </div>

          <h2 className="text-2xl font-bold text-[#002B49]">
            No Products Found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            No products are currently available.
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 px-6 py-3 bg-[#002B49] text-white rounded-lg text-sm font-semibold"
          >
            Refresh
          </button>

        </div>

      </div>
    );
  }

  // =======================================================
  // CURRENT PRODUCT DATA
  // =======================================================

  const images =
    getProductImages(product);

  const title =
    getProductTitle(product);

  const productId =
    getProductId(product);

  const price =
    getProductPrice(product.price);

  const features =
    Array.isArray(product.features)
      ? product.features
      : [];

  const applications =
    Array.isArray(product.applications)
      ? product.applications
      : Array.isArray(product.application)
        ? product.application
        : [];

  const surfaceTypes =
    Array.isArray(product.surfaceTypes)
      ? product.surfaceTypes
      : [];

  const colours =
    Array.isArray(product.availableColours)
      ? product.availableColours
      : [];

  const removes =
    Array.isArray(product.removes)
      ? product.removes
      : [];

  // =======================================================
  // UI
  // =======================================================
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">

      {/* ================================================= */}
      {/* BREADCRUMBS */}
      {/* ================================================= */}

      <div className="max-w-7xl mx-auto px-6 pt-6">

        <div className="text-xs text-gray-500 font-medium">

          <button
            type="button"
            onClick={() =>
              navigate("/")
            }
            className="hover:text-[#002B49]"
          >
            Home
          </button>

          <span className="mx-2">
            &gt;
          </span>

          <span className="text-[#002B49] font-semibold">
            Products
          </span>

          <span className="mx-2">
            &gt;
          </span>

          <span className="text-[#002B49] font-semibold">
            {title}
          </span>

        </div>

      </div>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <section className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* ============================================= */}
          {/* PRODUCT LIST */}
          {/* ============================================= */}

          <aside className="lg:col-span-3">

            <div className="sticky top-6">

              <div className="mb-5">

                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#b59844]">
                  Fordax
                </p>

                <h2 className="text-2xl font-serif font-bold text-[#002B49] mt-1">
                  Products
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  Select a product to view its details.
                </p>

              </div>

              <div className="space-y-2 max-h-[650px] overflow-y-auto pr-2">

                {products.map(
                  (item, index) => {

                    const itemId =
                      getProductId(item);

                    const itemTitle =
                      getProductTitle(item);

                    const itemImages =
                      getProductImages(item);

                    const isSelected =
                      String(productId) ===
                      String(itemId);

                    return (
                      <button
                        key={itemId || index}
                        type="button"
                        onClick={() =>
                          handleProductSelect(item)
                        }
                        className={`w-full text-left rounded-xl border p-3 transition-all ${
                          isSelected
                            ? "border-[#002B49] bg-[#002B49] text-white shadow-md"
                            : "border-gray-200 bg-white hover:border-[#b59844] hover:shadow-sm"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          {/* IMAGE */}

                          <div
                            className={`w-14 h-14 rounded-lg flex items-center justify-center overflow-hidden shrink-0 ${
                              isSelected
                                ? "bg-white/10"
                                : "bg-gray-100"
                            }`}
                          >

                            {itemImages.length > 0 ? (

                              <img
                                src={itemImages[0]}
                                alt={itemTitle}
                                className="w-full h-full object-contain"
                              />

                            ) : (

                              <span className="text-xl">
                                🎨
                              </span>

                            )}

                          </div>

                          {/* TEXT */}

                          <div className="min-w-0">

                            <p
                              className={`text-xs font-bold leading-snug ${
                                isSelected
                                  ? "text-white"
                                  : "text-[#002B49]"
                              }`}
                            >
                              {itemTitle}
                            </p>

                            <p
                              className={`text-[10px] mt-1 line-clamp-2 ${
                                isSelected
                                  ? "text-white/70"
                                  : "text-gray-500"
                              }`}
                            >
                              {item.category ||
                                "Product"}
                            </p>

                          </div>

                        </div>

                      </button>
                    );
                  }
                )}

              </div>

            </div>

          </aside>

          {/* ============================================= */}
          {/* PRODUCT DETAILS */}
          {/* ============================================= */}

          <main className="lg:col-span-9">

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

              {/* ========================================= */}
              {/* IMAGE */}
              {/* ========================================= */}

              <div>

                <div className="bg-[#f5f6f8] rounded-2xl border border-gray-100 p-8 min-h-[500px] flex items-center justify-center">

                  {selectedImage ? (

                    <img
                      src={selectedImage}
                      alt={title}
                      className="w-full max-h-[480px] object-contain rounded-xl transition-transform duration-500 hover:scale-105"
                    />

                  ) : (

                    <div className="text-center text-gray-400">

                      <div className="text-7xl mb-4">
                        🎨
                      </div>

                      <p className="text-sm">
                        Product image not available
                      </p>

                    </div>

                  )}

                </div>

                {/* IMAGE THUMBNAILS */}

                {images.length > 0 && (

                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                    {images.map(
                      (image, index) => (

                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setSelectedImage(image)
                          }
                          className={`w-20 h-20 shrink-0 rounded-lg border-2 overflow-hidden bg-gray-50 ${
                            selectedImage === image
                              ? "border-[#002B49]"
                              : "border-gray-200"
                          }`}
                        >

                          <img
                            src={image}
                            alt={`${title} ${index + 1}`}
                            className="w-full h-full object-contain"
                          />

                        </button>

                      )
                    )}

                  </div>

                )}

              </div>

              {/* ========================================= */}
              {/* DETAILS */}
              {/* ========================================= */}

              <div className="space-y-7">

                {/* CATEGORY */}

                <div>

                  <span className="inline-flex border border-[#b59844] text-[#b59844] text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full uppercase">
                    {product.category ||
                      "FORDAX PRODUCT"}
                  </span>

                </div>

                {/* BRAND */}

                <p className="text-xs uppercase tracking-[0.25em] font-bold text-gray-400">
                  {product.brand ||
                    "Fordax"}
                </p>

                {/* TITLE */}

                <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#002B49] leading-tight">
                  {title}
                </h1>

                {/* DESCRIPTION */}

                <div>

                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-2">
                    Product Description
                  </h3>

                  <p className="text-sm text-gray-600 leading-7">
                    {product.description ||
                      "No product description available."}
                  </p>

                </div>

                {/* PRICE */}

                {price !== null && (

                  <div className="border-y border-gray-200 py-5">

                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Price
                    </p>

                    <p className="text-3xl font-bold text-[#002B49] mt-1">
                      ₹
                      {price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                )}

                {/* FEATURES */}

                {features.length > 0 && (

                  <div>

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-4">
                      Key Features
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {features.map(
                        (feature, index) => (

                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                          >

                            <span className="w-5 h-5 rounded-full bg-[#002B49] text-white flex items-center justify-center text-[10px] shrink-0">
                              ✓
                            </span>

                            <span className="text-xs text-gray-700 font-medium">
                              {feature}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* APPLICATIONS */}

                {applications.length > 0 && (

                  <div>

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-3">
                      Applications
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {applications.map(
                        (application, index) => (

                          <span
                            key={index}
                            className="px-3 py-2 rounded-full bg-[#f2f4f7] text-xs text-gray-700 border border-gray-200"
                          >
                            {application}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* COLOURS */}

                {colours.length > 0 && (

                  <div>

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-3">
                      Available Colours
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {colours.map(
                        (colour, index) => (

                          <span
                            key={index}
                            className="px-4 py-2 rounded-md border border-gray-200 text-xs font-semibold text-gray-700"
                          >
                            {colour}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* ADD TO CART */}

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={
                    addingToCart
                  }
                  className={`w-full ${
                    addingToCart
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#002B49] hover:bg-[#003d66]"
                  } text-white font-bold text-xs uppercase tracking-wider py-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md`}
                >

                  {addingToCart ? (
                    "Adding..."
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
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

                      Add to Cart
                    </>
                  )}

                </button>

              </div>

            </div>

            {/* =========================================== */}
            {/* PRODUCT SPECIFICATIONS */}
            {/* =========================================== */}

            <div className="mt-12 border-t border-gray-200 pt-8">

              <h2 className="font-serif text-2xl font-bold text-[#002B49] mb-6">
                Product Specifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* SURFACES */}

                {surfaceTypes.length > 0 && (

                  <div className="border border-gray-200 rounded-xl p-5">

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-3">
                      Suitable Surfaces
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {surfaceTypes.map(
                        (surface, index) => (

                          <span
                            key={index}
                            className="text-xs bg-gray-50 border border-gray-200 px-3 py-2 rounded-md"
                          >
                            {surface}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* APPLICATION */}

                {Array.isArray(
                  product.application
                ) &&
                  product.application.length >
                    0 && (

                    <div className="border border-gray-200 rounded-xl p-5">

                      <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-3">
                        Application Areas
                      </h3>

                      <ul className="space-y-2">

                        {product.application.map(
                          (
                            application,
                            index
                          ) => (

                            <li
                              key={index}
                              className="flex items-start gap-2 text-xs text-gray-600"
                            >

                              <span className="text-[#b59844] font-bold">
                                •
                              </span>

                              {application}

                            </li>

                          )
                        )}

                      </ul>

                    </div>

                  )}

                {/* REMOVES */}

                {removes.length > 0 && (

                  <div className="border border-gray-200 rounded-xl p-5 md:col-span-2">

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-3">
                      Removes
                    </h3>

                    <div className="flex flex-wrap gap-2">

                      {removes.map(
                        (item, index) => (

                          <span
                            key={index}
                            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-700"
                          >
                            {item}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                )}

                {/* PACK SIZE */}

                {product.packSizes && (

                  <div className="border border-gray-200 rounded-xl p-5">

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-2">
                      Pack Sizes
                    </h3>

                    <p className="text-sm text-gray-600">
                      {product.packSizes}
                    </p>

                  </div>

                )}

                {/* ALTERNATE NAME */}

                {product.alternateNameOnPack && (

                  <div className="border border-gray-200 rounded-xl p-5">

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-2">
                      Also Known As
                    </h3>

                    <p className="text-sm text-gray-600">
                      {product.alternateNameOnPack}
                    </p>

                  </div>

                )}

                {/* CRACK CAPACITY */}

                {product.crackCapacityInDescription && (

                  <div className="border border-gray-200 rounded-xl p-5">

                    <h3 className="text-xs uppercase tracking-widest font-bold text-[#002B49] mb-2">
                      Crack Filling Capacity
                    </h3>

                    <p className="text-sm text-gray-600">
                      {
                        product.crackCapacityInDescription
                      }
                    </p>

                    {product.crackCapacityShownOnPack && (

                      <p className="text-xs text-gray-400 mt-2">
                        Pack specification:{" "}
                        {
                          product.crackCapacityShownOnPack
                        }
                      </p>

                    )}

                  </div>

                )}

              </div>

            </div>

            {/* PRODUCT NOTE */}

            {product.note && (

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">

                <h3 className="text-xs uppercase tracking-widest font-bold text-amber-800 mb-2">
                  Product Note
                </h3>

                <p className="text-xs text-amber-700 leading-6">
                  {product.note}
                </p>

              </div>

            )}

          </main>

        </div>

      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="rounded-2xl bg-[#002B49] text-white p-8 md:p-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>

              <p className="text-[#b59844] text-[10px] uppercase tracking-widest font-bold">
                Brand
              </p>

              <h3 className="font-serif text-2xl font-bold mt-2">
                {product.brand ||
                  "Fordax"}
              </h3>

            </div>

            <div>

              <p className="text-[#b59844] text-[10px] uppercase tracking-widest font-bold">
                Category
              </p>

              <h3 className="text-sm font-semibold mt-2">
                {product.category ||
                  "Paint & Coating"}
              </h3>

            </div>

            <div>

              <p className="text-[#b59844] text-[10px] uppercase tracking-widest font-bold">
                Product
              </p>

              <h3 className="text-sm font-semibold mt-2">
                {title}
              </h3>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}