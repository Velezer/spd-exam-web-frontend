import { useState, useEffect } from "react";
import TutorialCard from "../components/TutorialCard";
import ProductClient from "../api/ProductClient";
import { notify } from "../utils/notify";
import "../styles/list.css";

function TutorialList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductClient.init();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductClient.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      notify(error.response?.data?.error || "Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="list-container">
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="card-list">
          {products.map((product) => (
            <TutorialCard
              key={product._id}
              id={product._id}
              title={product.name}
              image={product.imgUrl || "https://via.placeholder.com/400x300"}
              createdAt={product.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TutorialList;
