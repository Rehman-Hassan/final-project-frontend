import { useEffect, useState } from "react";
import styles from "../../styles/Form.module.css";

const ProductForm = ({ onProductAdd, onProductUpdate, editData }) => {
  const [formData, setFormData] = useState({
    description: "",
    price: "",
    mainCategory: "",
    subCategory: "",
    images: [],
    sizes: [], // ✅ now included
    mainImageIndex: 0, // ✅ for selecting main image
  });

  // Autofill form when editing
  useEffect(() => {
    if (editData) {
      setFormData({
        description: editData.description || "",
        price: editData.price || "",
        mainCategory: editData.mainCategory || "",
        subCategory: editData.subCategory || "",
        images: [],
        sizes: editData.sizes || [],
        mainImageIndex: editData.mainImageIndex || 0,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImages = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let updatedSizes = [...formData.sizes];
    if (checked) {
      updatedSizes.push(value);
    } else {
      updatedSizes = updatedSizes.filter((s) => s !== value);
    }
    setFormData({ ...formData, sizes: updatedSizes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    // Validate required fields
    if (!formData.mainCategory) {
      alert("Please select Main Category");
      return;
    }

    // If mainCategory is STITCHED, UNSTITCHED, or ESSEMBLES, subCategory is required
    const requiresSubCategory = formData.mainCategory === "STITCHED" || formData.mainCategory === "UNSTITCHED" || formData.mainCategory === "ESSEMBLES";
    if (requiresSubCategory && !formData.subCategory) {
      alert("Please select Sub Category (Formals, Summer, Velvet, or Winter)");
      return;
    }

    console.log("Main Category Check Passed:", formData.mainCategory);

    // Validate images (for new products, images are required)
    if (!editData && formData.images.length === 0) {
      alert("Please select at least one image");
      return;
    }

    // Validate description and price
    if (!formData.description) {
      alert("Please enter a description");
      return;
    }

    if (!formData.price) {
      alert("Please enter a price");
      return;
    }

    console.log("All validations passed");

    // For STITCHED, UNSTITCHED, ESSEMBLES - use selected subCategory; for others, set to ALL
    const finalSubCategory = (formData.mainCategory === "STITCHED" || formData.mainCategory === "UNSTITCHED" || formData.mainCategory === "ESSEMBLES") 
      ? formData.subCategory 
      : "ALL";

    const data = new FormData();
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("mainCategory", formData.mainCategory);
    data.append("subCategory", finalSubCategory);
    data.append("category", finalSubCategory); // For backward compatibility
    data.append("mainImageIndex", formData.mainImageIndex); // ✅ Add main image index

    formData.images.forEach((img) => data.append("images", img));
    formData.sizes.forEach((s) => data.append("sizes", s));

    console.log("Submitting product...");

    if (editData) {
      await onProductUpdate(editData._id, data);
    } else {
      await onProductAdd(data);
    }
  };

  // Check if subCategory field should be shown (for STITCHED, UNSTITCHED, and ESSEMBLES)
  const showSubCategory = formData.mainCategory === "STITCHED" || formData.mainCategory === "UNSTITCHED" || formData.mainCategory === "ESSEMBLES";

  const availableSizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className={styles.formContainer}>
      <h2>{editData ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea
          className={styles.textArea}
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Product Description"
        />

        <input
          className={styles.inputField}
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          placeholder="Price"
        />

        {/* Main Category Field */}
        <select
          className={styles.selectField}
          name="mainCategory"
          value={formData.mainCategory}
          onChange={(e) => {
            const newMainCategory = e.target.value;
            // Reset subCategory for categories that don't require it (SHAWLS, DUPATTAS, etc.)
            if (newMainCategory !== "STITCHED" && newMainCategory !== "UNSTITCHED" && newMainCategory !== "ESSEMBLES") {
              setFormData({ ...formData, mainCategory: newMainCategory, subCategory: "" });
            } else {
              handleChange(e);
            }
          }}
          required
        >
          <option value="">Select Main Category *</option>
          <option value="STITCHED">STITCHED</option>
          <option value="UNSTITCHED">UNSTITCHED</option>
          <option value="SHAWLS">SHAWLS</option>
          <option value="ESSEMBLES">ESSEMBLES</option>
          <option value="DUPATTAS">DUPATTAS</option>
        </select>

        {/* Sub Category Field - Only for STITCHED/UNSTITCHED */}
        {showSubCategory && (
          <select
            className={styles.selectField}
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Sub Category *</option>
            <option value="FORMALS">FORMALS</option>
            <option value="SUMMER">SUMMER</option>
            <option value="VELVET">VELVET</option>
            <option value="WINTER">WINTER</option>
          </select>
        )}

        {/* Multiple Images */}
        <input
          className={styles.fileInput}
          type="file"
          onChange={handleImages}
          multiple
        />

        {/* Image Preview and Main Image Selection */}
        {formData.images.length > 0 && (
          <div className={styles.imagePreviewContainer}>
            <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Select Main Image:</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {formData.images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setFormData({ ...formData, mainImageIndex: idx })}
                  style={{
                    cursor: "pointer",
                    border: formData.mainImageIndex === idx ? "3px solid blue" : "2px solid gray",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${idx}`}
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                  <p style={{ fontSize: "12px", textAlign: "center", margin: "5px 0 0 0" }}>
                    {idx === formData.mainImageIndex ? "✓ Main" : `Image ${idx + 1}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Sizes selection */}
        <div className={styles.sizesContainer}>
          {availableSizes.map((s) => (
            <label key={s}>
              <input
                type="checkbox"
                value={s}
                checked={formData.sizes.includes(s)}
                onChange={handleSizeChange}
              />
              {s}
            </label>
          ))}
        </div>

        <button className={styles.submitBtn} type="submit">
          {editData ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
