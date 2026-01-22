// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// import DetailSideImages from "../components/ProductDetailComponents/DetailSideImages";
// import DetailCenterImages from "../components/ProductDetailComponents/DetailCenterImages";
// import ImageDetails from "../components/ProductDetailComponents/ImageDetails";

// const DetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/products/${id}`);
//         setProduct(res.data);
//         if (res.data.images?.length > 0) {
//           setSelectedImage(`http://localhost:5000/uploads/${res.data.images[0]}`);
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   const images = product.images?.map(
//     (img) => `http://localhost:5000/uploads/${img}`
//   ) || [];

//   return (
//     <div className="container-fluid mt-5 px-5">
//       <div className="row">
//         {/* Side Images */}
//         <div className="col-md-2 order-md-1 order-2">
//           <DetailSideImages
//             images={images}
//             selectedImage={selectedImage}
//             onSelectImage={setSelectedImage}
//           />
//         </div>

//         {/* Center Images */}
//         <div className="col-md-5 order-md-2 order-1">
//           <DetailCenterImages
//             images={images}
//             selectedImage={selectedImage}
//             onSelectImage={setSelectedImage}
//           />
//         </div>

//         {/* Product Details */}
//         <div className="col-md-5 order-md-3 order-3">
//           <ImageDetails product={product} navigate={navigate} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import DetailSideImages from "../components/ProductDetailComponents/DetailSideImages";
import DetailCenterImages from "../components/ProductDetailComponents/DetailCenterImages";
import ImageDetails from "../components/ProductDetailComponents/ImageDetails";
import RelatedProducts from "../components/ProductDetailComponents/RelatedProducts";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(res.data);

        if (res.data.images?.length > 0) {
          // Use mainImageIndex if available, otherwise use first image
          const imageIndex = res.data.mainImageIndex || 0;
          setSelectedImage(res.data.images[imageIndex]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const images = product.images || [];

  return (
    <div className="container-fluid mt-5 px-md-5 ps-2">
      <div className="row">

        {/* SIDE IMAGES */}
        <div className="col-md-2 order-md-1 order-2">
          <DetailSideImages
            images={images}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />
        </div>

        {/* CENTER IMAGE */}
        <div className="col-md-5 order-md-2 order-1">
          <DetailCenterImages
            images={images}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="col-md-5 order-md-3 order-3">
          <ImageDetails product={product} navigate={navigate} />
        </div>

      </div>
   <div className="row">
  <div className="col">
    <RelatedProducts
      mainCategory={product.mainCategory}
      currentProductId={product._id}
    />
  </div>
</div>
    </div>
  );
};

export default DetailPage;
