import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Laptops = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Hardcoded service providers
    const serviceProviders = [
      {
        id: 1,
        name: "John Doe",
        domain: "Plumbing",
        mobile: "+91 9876543210",
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPnE_fy9lLMRP5DLYLnGN0LRLzZOiEpMrU4g&s",
      },
      {
        id: 2,
        name: "Jane Smith",
        domain: "Electrician",
        mobile: "+91 9123456780",
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdrkNdumT-XgDOUdMgaleHw1Zr1F2cB0satw&s",
      },
      {
        id: 3,
        name: "Bob Johnson",
        domain: "House Cleaning",
        mobile: "+91 9988776655",
        imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkL4nwNk6k_5nZ_F5Mmo4QauoglmkDTd9VRJ_gd_n1WTQkCPrv7b2n-_iz_cBgpCubDyI&usqp=CAU",
      },
    ];

    setProducts(serviceProviders);
  }, []);

  const handleAddToCart = (provider) => {
    addToCart(provider);
    navigate("/cart"); // Redirect to cart page after adding service
  };

  return (
    <div className="product-container">
      <h2>Hire Service Providers</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((provider) => (
            <div key={provider.id} className="product-card">
              <img src={provider.imagePath} alt={provider.name} />
              <h4>{provider.name}</h4>
              <p>Domain: {provider.domain}</p>
              <p>Mobile: {provider.mobile}</p>
              <button onClick={() => handleAddToCart(provider)}>Hire</button>
            </div>
          ))
        ) : (
          <p>No service providers available.</p>
        )}
      </div>
    </div>
  );
};

export default Laptops;
