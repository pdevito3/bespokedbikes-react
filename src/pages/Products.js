import React from 'react';
import { useGetProduct, useGetProductsList } from '../api/ProductsApi';

function Products(props){
  const productsQuery = useGetProductsList();
  // const single = useGetProduct(1604961493);

  return (
    <>
      <div className="text-purple-500 p-10">
        { (productsQuery.isSuccess || productsQuery.isLoading) && (
          productsQuery.products.map((product, index) => (
            <div key={product.productId} className="flex space-x-5">
              <p>{product.style}</p>
              <p>{product.name}</p>
            </div>
          )))
        }
      </div>

      {
        productsQuery.hasNext && (
          <p>Next</p>
        )
      }
      {/* {single.isSuccess && (
        <p>{single.data.name}</p> 
      )} */}
    </>
  );
}

export default Products;
