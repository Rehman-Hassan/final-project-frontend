import { useEffect, useState } from "react";
import styles from "../styles/HomeGrid.module.css";
import HomeHeading from "./HomeHeading";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeGrid = () => {
  let heading1 = "OWN YOUR NEW LOOK";
  let heading2 = "READY TO WEAR";
  let heading3 = "CHANTELLE COLLECTION";
  let heading4 = "ESSENTIALS";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
          timeout: 5000 // 5 second timeout
        });
        setProducts(res.data);
      } catch (err) {
        // Silently fail if server not available
        if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
          console.warn("Server not available yet");
          return;
        }
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Get mainCategory products count for subCategories
  const getMainCategoriesForSubCategory = (subCategory) => {
    const mainCategories = products
      .filter(
        (p) =>
          (p.mainCategory === "STITCHED" || p.mainCategory === "UNSTITCHED") &&
          p.subCategory === subCategory
      )
      .map((p) => p.mainCategory);
    return [...new Set(mainCategories)]; // unique
  };

  return (
    <>
      <HomeHeading>{heading1}</HomeHeading>
      <div className="container">
        {/* First Row */}
        <div className="row gy-5 gy-md-3">
          <div className={`col-12 col-md-6 ${styles.gridItem}`}>
            <div className={styles.zoom}>
              <Link to="/product?mainCategory=STITCHED&heading=STITCHED">
                <img src="/image1.webp" alt="Home Grid 1" className="img-fluid" />
                <button className={styles.shopNow}>STITCHED</button>
              </Link>          
            </div>
          </div>

          <div className={`col-12 col-md-6 ${styles.gridItem}`}>
            <div className={styles.zoom}>
              <Link to="/product?mainCategory=UNSTITCHED&heading=UNSTITCHED">
                <img src="/image2.webp" alt="Home Grid 2" className="img-fluid" />
                <button className={styles.shopNow}>UNSTITCHED</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <HomeHeading>{heading2}</HomeHeading>
        <div className="row gy-5 gy-md-3">
          {["WINTER", "SUMMER", "FORMALS"].map((subCat, idx) => {
            const mainCats = getMainCategoriesForSubCategory(subCat);
            // if (mainCats.length === 0) return null; // agar product nahi hai, button hide
            return (
              <div className={`col-12 col-md-4 ${styles.gridItem}`} key={idx}>
                <div className={styles.zoom}>
                  <Link
                    to={`/product?subCategory=${subCat}&heading=READY TO WEAR`}
                  >
                    <img src={`/image${3 + idx}.webp`} alt={subCat} className="img-fluid" />
                    <button className={styles.shopNow}>{subCat}</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Third Row */}
        <HomeHeading>{heading3}</HomeHeading>
        <div className="row gy-5 gy-md-3">
          <div className={`col-12 col-md-6 ${styles.gridItem}`}>
            <Link to="/product?mainCategory=STITCHED&heading=STITCHED">
              <img src="/image6.webp" alt="Home Grid 6" className="img-fluid" />
              <button className={styles.shopNow}>STITCHED</button>
            </Link>
          </div>

          <div className={`col-12 col-md-6 ${styles.gridItem}`}>
            <div className={styles.zoom}>
              <Link to="/product?mainCategory=UNSTITCHED&heading=UNSTITCHED">
                <img src="/image7.webp" alt="Home Grid 7" className="img-fluid" />
                <button className={styles.shopNow}>UNSTITCHED</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Fourth Row */}
        <HomeHeading>{heading4}</HomeHeading>
        <div className="row gy-5 gy-md-3">
          <div className={`col-12 col-md-4 ${styles.gridItem}`}>
            <div className={styles.zoom}>
              <Link to="/product?mainCategory=SHAWLS&heading=SHAWL">
                <img src="/image8.webp" alt="Home Grid 8" className="img-fluid" />
                <button className={styles.shopNow}>SHAWLS</button>              
              </Link>
            </div>
          </div>

          <div className={`col-12 col-md-4 ${styles.gridItem}`}>
            <div className={styles.zoom}>
              <Link to="/product?mainCategory=ESSEMBLES&heading=ESSEMBLES">
                <img src="/image9.webp" alt="Home Grid 9" className="img-fluid" />
                <button className={styles.shopNow}>ESSEMBLES</button>             
              </Link>
            </div>           
          </div>

          <div className={`col-12 col-md-4 ${styles.gridItem}`}>
            <div className={styles.zoom}>
              <Link to="/product?mainCategory=DUPATTAS&heading=DUPATTAS">
                <img src="/image10.webp" alt="Home Grid 10" className="img-fluid" />
                <button className={styles.shopNow}>DUPATTAS</button>             
              </Link>
            </div>     
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeGrid;
