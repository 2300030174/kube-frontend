import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { getProducts } from "../services/productService";
import { useNavigate } from "react-router-dom";
import "./style.css";

const BASE_URL = 'http://localhost:30083/back1';

const Computers = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts("computers"); // API fetch
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add items to the cart!");
      navigate("/login");
      return;
    }

    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-container">
      <h2>Computers</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                // Display inline base64 if present, fallback to API URL
                src={product.imagePath.startsWith("data:") 
                      ? product.imagePath 
                      : `${BASE_URL}/api/products/images/${product.imagePath}`}
                alt={product.name}
              />
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No computers available.</p>
        )}
      </div>
    </div>
  );
};

export default Computers;
