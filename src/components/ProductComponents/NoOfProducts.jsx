import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { BsGrid3X3Gap } from "react-icons/bs";

import styles from "../../styles/NoOfProduct.module.css";

const NoOfProducts = ({ count, onGridLayoutChange }) => {
  const [selectedLayout, setSelectedLayout] = useState(2);

  const handleLayoutChange = (columns) => {
    setSelectedLayout(columns);
    onGridLayoutChange(columns);
  };

  return (
    <div className={`container-fluid ${styles.position}`}>
      <div className="row">
        {/* Icons column */}
        <div
          className="col-4 col-md-3 col-lg-2 text-center"
          style={{ borderRight: "1px solid black" }}
        >
          <button
            className={`${styles.gridButton} ${
              selectedLayout === 2 ? styles.active : ""
            }`}
            onClick={() => handleLayoutChange(2)}
            title="2 Columns"
          >
            <FaBars className={styles.icon} />
          </button>
          <button
            className={`${styles.gridButton} ${
              selectedLayout === 3 ? styles.active : ""
            }`}
            onClick={() => handleLayoutChange(3)}
            title="3 Columns"
          >
            <MdGridView className={styles.icon} />
          </button>
          <button
            className={`${styles.gridButton} ${
              selectedLayout === 4 ? styles.active : ""
            }`}
            onClick={() => handleLayoutChange(4)}
            title="4 Columns"
          >
            <BsGrid3X3Gap className={styles.icon} />
          </button>
        </div>

        {/* Products count */}
        <div className="col-4 col-md-6 col-lg-8 text-center fw-bold">
          {count} &nbsp;&nbsp; products
        </div>

        {/* Sort by */}
        <div
          className="col-4 col-md-3 col-lg-2 text-center"
          style={{ borderLeft: "1px solid black" }}
        >
          <select className={styles.sortBy}>
            <option>S O R T&nbsp;&nbsp;BY</option>
            <option>Price Low to High</option>
            <option>Price High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NoOfProducts;
