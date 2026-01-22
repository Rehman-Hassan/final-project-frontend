import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaCcVisa } from "react-icons/fa";
import styles from "../styles/Footer.module.css";
import { useState } from "react";

const Footer = () => {
  const [expandedSections, setExpandedSections] = useState({
    about: true,
    service: true,
    policies: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
      <div className={`container-fluid mt-4 ${styles.footerContainer}`}>
        <div className="row ps-lg-5 py-5">

          {/* About Section */}
          <div className={`col-12 col-md-6 col-lg-6 ${styles.footerText}`}>
            <h6 
              className={`${styles.footerHeading} ${expandedSections.about ? styles.expanded : styles.collapsed}`}
              onClick={() => toggleSection('about')}
            >
              About
              <span className={styles.expandIcon}>+</span>
            </h6>
            <div className={`${styles.footerContent} ${expandedSections.about ? styles.show : ''}`}>
              <p className={styles.footerPara}>Who We Are</p>
              <p className={styles.footerPara}>Our Responsibility</p>
              <p className={styles.footerPara}>Service We Provide</p>
              <p className={styles.footerPara}>Careers</p>
              <p className={styles.footerPara}>
                Our Shop: First Floor, Dolmen Mall,
                <br />
                Shop No F-06, A Block DHA Phase 6, Lahore
              </p>
            </div>
          </div>

          {/* Customer Service */}
          <div className={`col-12 col-md-4 col-lg-4 ${styles.footerText}`}>
            <h6 
              className={`${styles.footerHeading} ${expandedSections.service ? styles.expanded : styles.collapsed}`}
              onClick={() => toggleSection('service')}
            >
              CUSTOMER SERVICE
              <span className={styles.expandIcon}>+</span>
            </h6>
            <div className={`${styles.footerContent} ${expandedSections.service ? styles.show : ''}`}>
              <p className={styles.footerPara}>Contact Us</p>
              <p className={styles.footerPara}>Dispatch Timeline</p>
              <p className={styles.footerPara}>Exchange Information</p>
              <p className={styles.footerPara}>Email: info@baroque.pk</p>
              <p className={styles.footerPara}>Call Us At: UAN 301-111-332</p>
              <p className={styles.footerPara}>Whatsapp: +92 325 3123389</p>
            </div>
          </div>

          {/* Policies */}
          <div className={`col-12 col-md-2 col-lg-2 ${styles.footerText}`}>
            <h6 
              className={`${styles.footerHeading} ${expandedSections.policies ? styles.expanded : styles.collapsed}`}
              onClick={() => toggleSection('policies')}
            >
              POLICIES
              <span className={styles.expandIcon}>+</span>
            </h6>
            <div className={`${styles.footerContent} ${expandedSections.policies ? styles.show : ''}`}>
              <p className={styles.footerPara}>Privacy Policy</p>
              <p className={styles.footerPara}>Refund Policy</p>
              <p className={styles.footerPara}>Shipping Policy</p>
              <p className={styles.footerPara}>Term of Service</p>
              <p className={styles.footerPara}>Legal</p>
            </div>
          </div>

        </div>

        {/* Social Icons */}
        <div className="container-fluid px-lg-5">
          <div className="row">
            <div className={`col ${styles.socialIcons}`}>
              <FaFacebookF size={25} />
              <FaInstagram size={25} />
              <FaYoutube size={25} />
              <FaTiktok size={25} />
              <FaWhatsapp size={25} />
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className={`container-fluid px-lg-5 ${styles.footerBottom}`}>
          <div className="row align-items-center">
            {/* Country Select */}
            <div className={`col-6 ${styles.countrySelect}`}>
              <select className={styles.countrySelect}>
                <option>Pakistan</option>
                <option>India</option>
                <option>UK</option>
              </select>
            </div>

            {/* Copyright */}
            <div className={`col-4 ${styles.alignCenter}`}>
              <span style={{ color: "#FFFFFFA6" }}>© 2025-BAROQUE</span>
            </div>

            {/* Visa Icons */}
            <div className={`col-2 ${styles.visaIcons}`}>
              <FaCcVisa size={35} color="#1a1aff" />
              <FaCcVisa size={35} color="#ff6600" />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Footer;
