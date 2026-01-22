// import styles from '../../styles/ProductLink.module.css'

// const ProductLinks = () => {
//   return (
//     <div className="container">
//     <div className="row">
//       <div className="col">
//         <nav className="text-center">
//           <span>
//             <a
//               href="#"
//               className={`${styles.formal} ${styles.link} ms-3 me-5`}
//             >
//               FORMALS
//             </a>
//           </span>

//           <span>
//             <a
//               href="#"
//               className={`${styles.link} me-5`}
//             >
//               SUMMER
//             </a>
//           </span>

//           <span>
//             <a
//               href="#"
//               className={`${styles.link} me-5`}
//             >
//               VELVET
//             </a>
//           </span>

//           <span>
//             <a
//               href="#"
//               className={styles.link}
//             >
//               WINTER
//             </a>
//           </span>
//         </nav>
//       </div>
//     </div>
//    </div> 
//   )
// }

// export default ProductLinks

import { useNavigate } from "react-router-dom";
import styles from '../../styles/ProductLink.module.css';

const ProductLinks = ({ mainCategory, selectedSubCategory, onSelectSubCategory, products = [] }) => {
  const navigate = useNavigate();

  // Subcategories for STITCHED, UNSTITCHED, and ESSEMBLES
  const allSubCategories = ["FORMALS", "SUMMER", "VELVET", "WINTER"];

  // Show subcategories if:
  // 1. mainCategory is STITCHED, UNSTITCHED, or ESSEMBLES (category specific filters)
  // 2. OR selectedSubCategory exists without mainCategory (filtering FORMALS from all categories)
  const showCategoryFilters = mainCategory === "STITCHED" || mainCategory === "UNSTITCHED" || mainCategory === "ESSEMBLES";
  const showSubCategoryFilters = selectedSubCategory && !mainCategory;

  // Get available mainCategories for current subCategory (when no mainCategory is selected)
  const availableMainCategories = showSubCategoryFilters
    ? [...new Set(
        products
          .filter(
            (p) =>
              p.subCategory === selectedSubCategory &&
              p.mainCategory &&
              p.mainCategory !== "ALL" &&
              p.mainCategory !== ""
          )
          .map((p) => p.mainCategory)
      )]
    : [];

  // Get available subcategories for current mainCategory
  const availableSubCategories = showCategoryFilters
    ? [...new Set(
        products
          .filter(
            (p) =>
              p.mainCategory === mainCategory &&
              p.subCategory &&
              p.subCategory !== "ALL" &&
              p.subCategory !== ""
          )
          .map((p) => p.subCategory)
      )]
    : [];

  const handleCategoryClick = (mainCat) => {
    if (mainCat === "") {
      // Reset to show all for current subCategory
      navigate(`/product?subCategory=${selectedSubCategory}`);
      if (onSelectSubCategory) onSelectSubCategory("");
    } else {
      // Filter by mainCategory with current subCategory
      navigate(`/product?mainCategory=${mainCat}&subCategory=${selectedSubCategory}`);
      if (onSelectSubCategory) onSelectSubCategory(selectedSubCategory);
    }
  };

  const handleSubCategoryClick = (subCat) => {
    if (subCat === "") {
      // Reset to show all products in main category
      navigate(`/product?mainCategory=${mainCategory}`);
      if (onSelectSubCategory) onSelectSubCategory("");
    } else {
      // Filter by subcategory
      navigate(`/product?mainCategory=${mainCategory}&subCategory=${subCat}`);
      if (onSelectSubCategory) onSelectSubCategory(subCat);
    }
  };

  // Show main category filters if we have a sub category selected without main category
  if (showSubCategoryFilters) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <nav className="text-center">
              {/* Show all option first */}
              <span key="all">
                <button
                  className={`${styles.link} ${!mainCategory ? styles.active : ""} me-3`}
                  onClick={() => handleCategoryClick("")}
                >
                  ALL
                </button>
              </span>
              {availableMainCategories.map((cat) => (
                <span key={cat}>
                  <button
                    className={`${styles.link} ${mainCategory === cat ? styles.active : ""} me-3`}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </button>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  }

  // Show sub category filters for STITCHED/UNSTITCHED/ESSEMBLES
  if (showCategoryFilters) {
    const subCategories = availableSubCategories.length > 0 ? availableSubCategories : allSubCategories;

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <nav className="text-center">
              {subCategories.map((cat) => (
                <span key={cat}>
                  <button
                    className={`${styles.link} ${selectedSubCategory === cat ? styles.active : ""} me-3`}
                    onClick={() => handleSubCategoryClick(cat)}
                  >
                    {cat}
                  </button>
                </span>
              ))}
              {/* Show all option */}
              <span>
                <button
                  className={`${styles.link} ${!selectedSubCategory ? styles.active : ""}`}
                  onClick={() => handleSubCategoryClick("")}
                >
                  ALL
                </button>
              </span>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ProductLinks;
