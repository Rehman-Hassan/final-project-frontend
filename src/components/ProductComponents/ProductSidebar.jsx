import { useState, useEffect } from 'react';
import styles from '../../styles/ProductSidebar.module.css';

const ProductSidebar = ({ products = [], onPriceRangeChange }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRanges, setPriceRanges] = useState([]);

  // Calculate max price from products and generate price ranges
  useEffect(() => {
    if (products && products.length > 0) {
      const prices = products.map(p => p.price).filter(p => !isNaN(p));
      const max = Math.max(...prices);
      setMaxPrice(max);

      // Generate dynamic price ranges based on actual max price
      const quarter = Math.ceil(max / 4);
      const half = Math.ceil(max / 2);
      const threeQuarters = Math.ceil(max * 0.75);
      
      const ranges = [
        { label: 'All Prices', min: 0, max: Infinity },
        { label: `0 - ${quarter} Rs`, min: 0, max: quarter },
        { label: `${quarter} - ${half} Rs`, min: quarter, max: half },
        { label: `${half} - ${threeQuarters} Rs`, min: half, max: threeQuarters },
        { label: `${threeQuarters} - ${max} Rs`, min: threeQuarters, max: max }
      ];
      setPriceRanges(ranges);
    }
  }, [products]);

  const handlePriceRangeChange = (e) => {
    const selectedIndex = e.target.value;
    setSelectedPriceRange(selectedIndex);

    if (selectedIndex === 'all') {
      onPriceRangeChange({ min: 0, max: Infinity });
    } else {
      const range = priceRanges[parseInt(selectedIndex)];
      if (range) {
        onPriceRangeChange({ min: range.min, max: range.max });
      }
    }
  };

  return (
    <div className="d-none d-sm-block">
      <div className={styles.sideBarContainer}>
        <select className={styles.select}>
          <option>Availability</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <select 
          className={styles.select}
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          <option value="all">Price Range</option>
          {priceRanges.slice(1).map((range, index) => (
            <option key={index + 1} value={index + 1}>
              {range.label}
            </option>
          ))}
        </select>

        <select className={styles.select}>
          <option>Type</option>
          <option value="STICHED">STICHED</option>
          <option value="UNSTICHED">UNSTICHED</option>
        </select>

        <select className={styles.select}>
          <option>FABRIC</option>
          <option value="khadar">KHADAR</option>
          <option value="cotton_net">COTTON NET</option>
        </select>

        <select className={styles.select}>
          <option>SIZE</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <select className={styles.select}>
          <option>PIECES</option>
          <option value="3 PIECE">3 PIECE</option>
          <option value="4 PIECE">4 PIECE</option>
        </select>

        <select className={styles.productStyle}>
          <option>PRODUCT STYLE</option>
          <option value="GLOW(1)">GLOW(1)</option>
          <option value="SHIRT(1)">SHIRT(1)</option>
        </select>
      </div>
    </div>
  );
};

export default ProductSidebar;
