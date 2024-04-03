// Typescript

import React, { useEffect, useState } from 'react'
import ProductDescription from './components/ProductDescrip';
import Nav from './components/Nav';
import PaginationButton from './Pagination';
const Yangi = () => {
     const [search, setSearch] = useState< string | null>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [product, setProduct] = useState([]);
    const recordsPerPage = 5;
    const firstIndex = (currentPage - 1) * recordsPerPage;
    const lastIndex = currentPage * recordsPerPage;

  type ProductData = {
    id: number,
    name: string,
    category: string,
    description: string,
    price: number
  }[]
    
      const filteredProducts = product.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) || product.name.toUpperCase().includes(search.toUpperCase()));
  const records = filteredProducts.slice(firstIndex, lastIndex);

 

    useEffect(() => {
    setCurrentPage(1); 
  }, [search]); 

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('https://apigenerator.dronahq.com/api/b5U_puJf/dhshs', {

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res[0].products);
                setProduct(res[0].products);
            })
    }, []);
     const handleProductClick = (products): Promise<ProductData> => {
    setSelectedProduct(products);
  };

    const handleButtonClick = (event, product): Promise<ProductData> => {
    event.stopPropagation(); // Prevent click event from bubbling to the product item
    setSelectedProduct(product);
    };

  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
      <div> 
          <h1>Products</h1>
          <Nav searchQuery={search} setSearchQuery={setSearch} />
          {product.length > 0 ? (
           <div>
                  {records.filter((products)=> products.name.toLowerCase().includes(search)).map((products) => (
                  
            <div key={products.id} onClick={() => handleProductClick(products.id)}>
              {/* <p>ID: {products.id}</p> */}
              <p>Name: {products.name}</p>
              <p>Price: {products.price} {products.currency}</p>
              <p>Category: {products.category}</p>
                          {/* <p>Description: {products.description}</p> */}
                          <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(event) => handleButtonClick(event, products)}>Show Description</button>
          {selectedProduct && selectedProduct.name === products.name && (
                              <ProductDescription products={products} onClose={handleClose} />
                              
          )}
            </div>

              ))}
 {filteredProducts.length === 0 && (
            <p>There is <b>no</b> such product</p>
          )}
       

          </div>
          ): (
              <h5>Loading...</h5>
          )}
        
          
          <PaginationButton currentPage={currentPage} totalPages={Math.ceil(product.length / recordsPerPage)} setCurrentPage={setCurrentPage} />
    </div>
    )
    
    
}



export default Yangi