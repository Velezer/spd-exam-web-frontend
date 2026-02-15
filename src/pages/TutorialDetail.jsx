import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductClient from "../api/ProductClient";
import { notify } from "../utils/notify";
import { isYouTubeUrl, getYouTubeEmbedUrl } from "../utils/youtube";
import { formatRelativeTime } from "../utils/dateFormatter";
import "../styles/detail.css";

function TutorialDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductClient.init();
    fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await ProductClient.getProductById(id);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      notify(error.response?.data?.error || "Product not found", "error");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="detail-container"><p>Loading...</p></div>;
  if (!product) return <div className="detail-container"><p>Product not found</p></div>;

  return (
    <div className="detail-container">
      <div className="description-box">
        <h4>{product.name}</h4>
        {isYouTubeUrl(product.videoUrl) ? (
          <iframe
            width="100%"
            height="400"
            src={getYouTubeEmbedUrl(product.videoUrl)}
            title="Tutorial Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <video width="100%" controls>
            <source src={product.videoUrl} type="video/mp4" />
            Browser Anda tidak mendukung video tag.
          </video>
        )}

        <div className="description-box">
          <p>{formatRelativeTime(product.createdAt)}</p>
        </div>
         
        <div className="description-box">
          <h4>Deskripsi</h4>
          <p>{product.description}</p>
        </div>
      </div>

    </div>
  );
}

export default TutorialDetail;
