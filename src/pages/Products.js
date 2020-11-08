import React from 'react';
import {  useGetProductsList, useGetProduct, useCreateProduct, prefetchProduct, usePutProduct, usePatchProduct } from '../api/ProductsApi';
import ModifyProducts from '../components/ModifyProducts'
import { compare } from 'fast-json-patch';
import Filter from '../components/Filter'

function Products(){
  const [productId, setProductId] = React.useState();
  const [product, setProduct] = React.useState();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(8);
  const productsQuery = useGetProductsList(page, pageSize);
  const productQuery = useGetProduct(productId)
  const [addModalIsOpen, setAddModalIsOpen] = React.useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
  const [createProduct, createProductInfo] = useCreateProduct();
  const [putProduct, putProductInfo] = usePutProduct();
  const [patchProduct, patchProductInfo] = usePatchProduct();

  const onPut = async (values) => {
    putProduct(values)
  }

  const onPatch = async (values) => {
    let patchDoc = compare(product, values)
    patchProduct({productId: values.productId, patchDoc})
  }

  React.useLayoutEffect(() => {
    let current = true;
    if(productId){
      if(current)
        setProduct(productQuery.data)
    }

    return () => {
      current = false
      setProductId(null)
    }
  },[productId, productQuery.data])

  // React.useLayoutEffect(() => {
  //   let current = true;
  //   if(productId){
  //     axios.get(`http://localhost:5000/api/products/${productId}`)
  //       .then((res) => {
  //         if(current)
  //           setProduct(res.data)
  //       })
  //   }

  //   return () => {
  //     current = false
  //   }
  // },[productId])

  function openEditModal(newProductId) {
    setProductId(newProductId)
    setEditModalIsOpen(true)
    putProductInfo.reset();
  }
  
  function openAddModal() {
    setAddModalIsOpen(true)
    createProductInfo.reset();
  }

// abstract this all out into a hook
  function removeFromListByProperty(nameKey, prop, myArray){
    for (var i=0; i < myArray.length; i++) {
      if (myArray[i][prop] === nameKey)
        myArray.splice(i,1);
    }
    return myArray
  }

  const equalityEnum = {
    equal: 1,
    contains: 2,
  }
  const [filterQueryList, setFilterQueryList] = React.useState([])
  const [queryString, setQueryString] = React.useState("")
  function updateFilterQuery({key, equality, value, propertyName}){ 
    let newList = removeFromListByProperty(key, 'key', Object.assign(filterQueryList));
    newList.push({key, operation: {equality, value, propertyName}});

    setFilterQueryList(newList)
    buildQueryString(newList)
  }

  function buildQueryString(list){
    console.log(list.length)
    console.log(list)
    let calculatedString = "";
    for(var filter=0; filter < list.length; filter++ ){
      if(list[filter].operation.value.length > 0)
        calculatedString += `${calculatedString.length === 0 ? "&filters=" : ""}${filter > 0 ? "," : ""}${list[filter].operation.propertyName}${list[filter].operation.equality === equalityEnum.contains ? "@=*" : "=="}${list[filter].operation.value}`
    }
    setQueryString(calculatedString)
  }

  return (
    <>
      <div className="">
        <div className="pb-5 border-b border-gray-200 space-y-3 sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:space-y-0">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Products - filtered by {queryString}
          </h2>
          <div>
            <span className="shadow-sm rounded-md">
              <button onClick={() => openAddModal()} type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out">
                Add new product
              </button>
            </span>
          </div>
        </div>

        { (productsQuery.isSuccess || productsQuery.isLoading) && (
          <div className="pt-5 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-t-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 pt-3 pb-1 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 pt-3 pb-1 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Style</th>
                        <th className="px-6 pt-3 pb-1 bg-gray-50"></th>
                      </tr>
                      <tr>
                        <th className="pl-6 py-2 bg-gray-50"><Filter propertyName="Name" updateFilterQuery={updateFilterQuery} /></th>
                        <th className="pl-6 py-2 bg-gray-50"><Filter propertyName="Style" updateFilterQuery={updateFilterQuery} /></th>
                        <th className="bg-gray-50"></th>
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
                            <button onClick={() => openEditModal(product.productId)} onMouseEnter={() => prefetchProduct(product.productId)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:block">
                      <p className="text-sm leading-5 text-gray-700 space-x-1">
                        Showing
                        <span className="px-1 font-medium">{productsQuery.products.length === 0 ? 0 : (page * productsQuery.currentPageSize)-productsQuery.currentPageSize + 1}</span>
                        to
                        <span className="pr-1 font-medium">{productsQuery.products.length === 0 ? 0 : ((page * productsQuery.currentPageSize)-productsQuery.currentPageSize + 1) + productsQuery.products.length - 1}</span>
                        of
                        <span className="pr-1 font-medium">{productsQuery.totalCount}</span>
                        results
                      </p>
                    </div>
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

      
      {(
        <>
          <ModifyProducts
            isOpen={addModalIsOpen}
            setIsOpen={setAddModalIsOpen}
            onSubmit={createProduct}
            clearOnSubmit
            createProductInfo
            submitText={
              createProductInfo.isLoading
                ? 'Saving...'
                : createProductInfo.isError
                ? 'Error!'
                : createProductInfo.isSuccess
                ? 'Saved!'
                : 'Add Product'
            }
          />
            
          {/* you can use either onPut or onPatch depending on if you want to update with patch or put */}
          <ModifyProducts
            isOpen={editModalIsOpen}
            setIsOpen={setEditModalIsOpen}
            initialValues={product}
            onSubmit={onPatch}
            editProductInfo = {patchProductInfo}
            submitText={
              patchProductInfo.isLoading
                ? 'Saving...'
                : patchProductInfo.isError
                ? 'Error!'
                : patchProductInfo.isSuccess
                ? 'Saved!'
                : 'Save Product'
            }
            />
        </>
      )}
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
