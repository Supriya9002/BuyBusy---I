import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        const transformedProducts = data.products.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.thumbnail, // ✅ working image
          rating: {
            rate: item.rating,
            count: item.stock, // closest equivalent
          },
        }));

        setProducts(transformedProducts);
      });
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
      {products.map((product) => (
        <div key={product.id} style={{ border: "1px solid #ddd", padding: "10px" }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
            onError={(e) => (e.target.src = "/no-image.png")}
          />
          <h4>{product.title}</h4>
          <p>₹ {product.price}</p>
          <p>⭐ {product.rating.rate} ({product.rating.count})</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
