const fs = require("fs");
const path = require("path");

const Product = require("../models/product.model");

// =====================================================
// UPLOADS DIRECTORY
// =====================================================

const uploadsDirectory = path.join(__dirname, "..", "uploads");

// =====================================================
// RESOLVE PRODUCT IMAGES
// =====================================================
// Accepts:
// "SuperLuxuryEmulsion.jpeg"
// "uploads/SuperLuxuryEmulsion.jpeg"
// "/uploads/SuperLuxuryEmulsion.jpeg"
// "C:\\project\\uploads\\SuperLuxuryEmulsion.jpeg"
// =====================================================

const resolveProductImages = (images) => {
  if (!Array.isArray(images)) {
    return [];
  }

  return images
    .filter(Boolean)
    .map((image) => {
      const imageString = String(image).trim();

      // Get only filename
      const filename = path.basename(imageString);

      // Actual file location
      const imagePath = path.join(
        uploadsDirectory,
        filename
      );

      console.log("Checking image:");
      console.log("Filename:", filename);
      console.log("Path:", imagePath);

      // Check whether file exists
      if (!fs.existsSync(imagePath)) {
        const error = new Error(
          `Image not found in uploads folder: ${filename}`
        );

        error.statusCode = 400;

        throw error;
      }

      // Store consistent path in MongoDB
      return `uploads/${filename}`;
    });
};

// =====================================================
// PARSE ARRAY
// =====================================================

const parseArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed)
      ? parsed
      : [parsed];
  } catch (error) {
    return [value];
  }
};

// =====================================================
// CREATE SINGLE PRODUCT
// =====================================================

const createProduct = async (req, res) => {
  try {
    const {
      brand,
      name,
      title,
      category,
      price,
      description,
      features,
      application,
      applications,
      availableColours,
      alternateNameOnPack,
      surfaceTypes,
      removes,
      crackCapacityInDescription,
      crackCapacityShownOnPack,
      packSizes,
      note,
      imageSource,
      image,
    } = req.body;

    // =================================================
    // PRODUCT TITLE
    // =================================================

    const productTitle = title || name;

    if (!productTitle || !category || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Title/name, category and description are required.",
      });
    }

    // =================================================
    // HANDLE IMAGES
    // =================================================

    let imagePaths = [];

    // CASE 1:
    // Images uploaded using multer
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map((file) => {
        const filename = path.basename(file.filename);

        return `uploads/${filename}`;
      });
    }

    // CASE 2:
    // Existing image paths sent in JSON
    else if (Array.isArray(image)) {
      imagePaths = resolveProductImages(image);
    }

    // =================================================
    // CREATE PRODUCT
    // =================================================

    const newProduct = new Product({
      brand: brand || "Fordax",

      name: name || productTitle,

      title: productTitle,

      category,

      price:
        price !== undefined &&
        price !== ""
          ? Number(price)
          : undefined,

      description,

      image: imagePaths,

      features: parseArray(features),

      application: parseArray(application),

      applications: parseArray(applications),

      availableColours: parseArray(
        availableColours
      ),

      alternateNameOnPack,

      surfaceTypes: parseArray(
        surfaceTypes
      ),

      removes: parseArray(removes),

      crackCapacityInDescription,

      crackCapacityShownOnPack,

      packSizes,

      note,

      imageSource,
    });

    // =================================================
    // SAVE
    // =================================================

    const savedProduct =
      await newProduct.save();

    return res.status(201).json({
      success: true,

      message:
        "Product created successfully",

      product: savedProduct,
    });

  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,

      message:
        error.statusCode === 400
          ? error.message
          : "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// SAVE MULTIPLE PRODUCTS
// =====================================================

const saveMultipleProducts = async (
  req,
  res
) => {
  try {
    let products = req.body;

    // =================================================
    // CHECK ARRAY
    // =================================================

    if (!Array.isArray(products)) {
      return res.status(400).json({
        success: false,

        message:
          "Request body must be an array of products.",
      });
    }

    // =================================================
    // PREPARE PRODUCTS
    // =================================================

    products = products.map((product) => {
      const productTitle =
        product.title || product.name;

      // Resolve images
      const imagePaths =
        resolveProductImages(
          product.image
        );

      return {
        brand:
          product.brand || "Fordax",

        name:
          product.name ||
          productTitle,

        title: productTitle,

        category:
          product.category,

        price:
          product.price !== undefined &&
          product.price !== ""
            ? Number(product.price)
            : undefined,

        description:
          product.description,

        image:
          imagePaths,

        features:
          parseArray(product.features),

        application:
          parseArray(product.application),

        applications:
          parseArray(
            product.applications
          ),

        availableColours:
          parseArray(
            product.availableColours
          ),

        alternateNameOnPack:
          product.alternateNameOnPack,

        surfaceTypes:
          parseArray(
            product.surfaceTypes
          ),

        removes:
          parseArray(
            product.removes
          ),

        crackCapacityInDescription:
          product.crackCapacityInDescription,

        crackCapacityShownOnPack:
          product.crackCapacityShownOnPack,

        packSizes:
          product.packSizes,

        note:
          product.note,

        imageSource:
          product.imageSource,
      };
    });

    // =================================================
    // LOG DATA BEFORE INSERT
    // =================================================

    console.log(
      "Products ready to save:"
    );

    console.log(
      JSON.stringify(
        products,
        null,
        2
      )
    );

    // =================================================
    // INSERT INTO MONGODB
    // =================================================

    const savedProducts =
      await Product.insertMany(
        products
      );

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(201).json({
      success: true,

      message:
        `${savedProducts.length} products saved successfully`,

      products:
        savedProducts,
    });

  } catch (error) {
    console.error(
      "Save Multiple Products Error:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,

      message:
        error.statusCode === 400
          ? error.message
          : "Server Error",

      error: error.message,
    });
  }
};

// =====================================================
// GET ALL PRODUCTS
// =====================================================

const getAllProducts = async (
  req,
  res
) => {
  try {
    let products =
      await Product.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    // =================================================
    // CONVERT IMAGE PATHS TO FULL URL
    // =================================================

    products = products.map(
      (product) => {

        if (
          Array.isArray(
            product.image
          )
        ) {
          product.image =
            product.image
              .filter(Boolean)
              .map(
                (imagePath) => {

                  if (!imagePath) {
                    return null;
                  }

                  // Normalize path
                  const normalizedPath =
                    String(imagePath)
                      .replace(
                        /\\/g,
                        "/"
                      )
                      .replace(
                        /^\/+/,
                        ""
                      );

                  // Already full URL
                  if (
                    normalizedPath.startsWith(
                      "http://"
                    ) ||
                    normalizedPath.startsWith(
                      "https://"
                    )
                  ) {
                    return normalizedPath;
                  }

                  // uploads/filename.jpg
                  if (
                    normalizedPath.startsWith(
                      "uploads/"
                    )
                  ) {
                    return `${req.protocol}://${req.get(
                      "host"
                    )}/${normalizedPath}`;
                  }

                  return normalizedPath;
                }
              )
              .filter(Boolean);
        }

        return product;
      }
    );

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,

      message:
        "Products fetched successfully",

      count:
        products.length,

      data:
        products,
    });

  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Error fetching products",

      error:
        error.message,
    });
  }
};

// =====================================================
// GET SINGLE PRODUCT
// =====================================================

const getProductById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    let product =
      await Product.findById(id)
        .lean();

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found",
      });
    }

    // Convert images to full URLs
    if (
      Array.isArray(product.image)
    ) {
      product.image =
        product.image
          .filter(Boolean)
          .map(
            (imagePath) => {

              const normalizedPath =
                String(imagePath)
                  .replace(
                    /\\/g,
                    "/"
                  )
                  .replace(
                    /^\/+/,
                    ""
                  );

              if (
                normalizedPath.startsWith(
                  "http://"
                ) ||
                normalizedPath.startsWith(
                  "https://"
                )
              ) {
                return normalizedPath;
              }

              if (
                normalizedPath.startsWith(
                  "uploads/"
                )
              ) {
                return `${req.protocol}://${req.get(
                  "host"
                )}/${normalizedPath}`;
              }

              return normalizedPath;
            }
          );
    }

    return res.status(200).json({
      success: true,

      data: product,
    });

  } catch (error) {
    console.error(
      "Get Product Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Error fetching product",

      error:
        error.message,
    });
  }
};

// =====================================================
// DELETE PRODUCT
// =====================================================

const deleteProduct = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,

        message:
          "Product not found",
      });
    }

    // =================================================
    // DELETE PRODUCT IMAGES FROM UPLOADS
    // =================================================

    if (
      Array.isArray(product.image)
    ) {
      product.image.forEach(
        (imagePath) => {

          const filename =
            path.basename(
              String(imagePath)
            );

          const filePath =
            path.join(
              uploadsDirectory,
              filename
            );

          if (
            fs.existsSync(filePath)
          ) {
            fs.unlinkSync(
              filePath
            );
          }
        }
      );
    }

    // =================================================
    // DELETE DATABASE DOCUMENT
    // =================================================

    await Product.findByIdAndDelete(
      id
    );

    return res.status(200).json({
      success: true,

      message:
        "Product deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Error deleting product",

      error:
        error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createProduct,
  saveMultipleProducts,
  getAllProducts,
  getProductById,
  deleteProduct,
};
