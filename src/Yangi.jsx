import React, { useEffect, useState } from 'react'
import Nav from './components/Nav';
import PaginationButton from './Pagination';
import { Link } from 'react-router-dom';

const Yangi = () => {
     const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [product, setProduct] = useState([]);
    const recordsPerPage = 5;
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = currentPage * recordsPerPage;
      const filteredProducts = product.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.name.toUpperCase().includes(search.toUpperCase()));
  const records = filteredProducts.slice(firstIndex, lastIndex);

    useEffect(() => {
    setCurrentPage(1);
  }, [search]);


    useEffect(() => {
        fetch('https://apigenerator.dronahq.com/api/b5U_puJf/dhshs', {

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res[0].products);
                setProduct(res[0].products);
            })
    }, []);

  return (
    
  <div className="container mx-auto px-4">
    <h1 className="text-center text-lg font-semibold py-4 bg-blue-600 text-white">Products</h1>
    <Nav searchQuery={search} setSearchQuery={setSearch} />
    <div className="flex flex-wrap justify-center">
      {records
        .filter((product) => product.name.toLowerCase().includes(search))
          .map((product) => (
          
          <div
            key={product.id}
            className="flex flex-col justify-between bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transition duration-300 transform hover:scale-105 w-64 md:w-72 lg:w-80 xl:w-96 mx-3 my-8"
            >
              
            <div className="p-5">
              <Link to={`/product/${product.id}`}>
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              
              <p className="text-gray-700 mb-2">
                Price: {product.price} {product.currency}
              </p>
              <p className="text-gray-500">Category: {product.category}</p></Link>
            </div>
              
          </div>
        ))}
    </div>
    {filteredProducts.length === 0 && (
      <p className="text-gray-600 text-lg">
        There is <b>no</b> such product
      </p>
    )}
    <PaginationButton
      currentPage={currentPage}
      totalPages={Math.ceil(product.length / recordsPerPage)}
      setCurrentPage={setCurrentPage}
      />
  </div>
);
}


export default Yangi