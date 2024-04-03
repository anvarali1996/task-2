import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Products() {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apigenerator.dronahq.com/api/b5U_puJf/dhshs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data[0].products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>;
  }

  const productItem = products.find(product => product.id === parseInt(productId));

  if (!productItem) {
    return <div className="text-center mt-8">Product not found</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">{productItem.name}</h2>
          <p className="text-gray-600 mb-2">Category: {productItem.category}</p>
          <p className="text-gray-700">{productItem.description}</p>
        </div>
        <div className="p-4 bg-gray-100 flex justify-between items-center">
          <p className="text-xl font-semibold">Price: {productItem.price} { productItem.currency}</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Products;
