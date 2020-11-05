import React from 'react';
import {  useGetProductsList } from '../api/ProductsApi';

function Products(props){
  const [page, setPage] = React.useState(1);
  const productsQuery = useGetProductsList(page);
  // const single = useGetProduct(1604961493);

  const headerStyles = "px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider";

  return (
    <>
      <div className="text-purple-500 p-10">
        { (productsQuery.isSuccess || productsQuery.isLoading) && (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-t-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className={headerStyles}>Name</th>
                        <th className={headerStyles}>Style</th>
                        <th className="px-6 py-3 bg-gray-50"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productsQuery.products.map((product) => (
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                          {product.style}
                          </td>
                          <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:justify-end">                      
                      <PageButtons page={page} setPage={setPage} hasPreviousPage={productsQuery.hasPrevious} hasNextPage={productsQuery.hasNext}></PageButtons>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          )
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


function PageButtons(props) {
  return ( 
    <>
      { props.hasPreviousPage && (
        <button onClick={ () => props.setPage(props.page - 1) } className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          Previous
        </button>
      )}
      { props.hasNextPage && (
        <button onClick={ () => props.setPage(props.page + 1) } className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
          Next
        </button>
      )}
    </>
   );
}

export default Products;
