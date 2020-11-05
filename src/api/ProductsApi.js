import React from 'react';
import {useQuery, queryCache} from 'react-query';
import axios from 'axios';

//process.env.REACT_APP_API_URL
//https://stackoverflow.com/questions/48378337/create-react-app-not-picking-up-env-files
const apiURL = `http://localhost:5000/api/products`

const loadingProduct = {
  name: 'Loading...',
  style: 'loading...',
}

function loadingProducts(length){
  return Array.from({length: length}, (v, index) => ({
    id: `loading-product-${index}`,
    ...loadingProduct,
  }))
}

const productQueryConfig = {
  // staleTime: 1000 * 60 * 5,
  // cacheTime: 1000 * 60 * 5,
}

function useBaseList(page = 1, pageSize = 4, filterQueryString = ''){
  const [hasNext, setHasNext] = React.useState(false)
  const [hasPrevious, setHasPrevious] = React.useState(false)
  const [totalCount, setTotalCount] = React.useState(null)
  const [totalPages, setTotalPages] = React.useState(null)
 
  return {
    queryKey: ['products', { page, pageSize }],
    queryFn: () =>
      axios.get(`${apiURL}?pagenumber=${page}&pagesize=${pageSize}&${filterQueryString}`)
        .then((res) => {
          let pagination = JSON.parse(res.headers["x-pagination"]);
          
          setHasNext(pagination.hasNext);
          setHasPrevious(pagination.hasPrevious);
          setTotalCount(pagination.hasNext);
          setTotalPages(pagination.hasPrevious);
  
          return res.data;
        }),
    config: {
      onSuccess(products) {
        for (const product of products) {
          queryCache.setQueryData(
            ['product', {productId: product.productId}],
            product,
            productQueryConfig,
          )
        }
  
        if(hasNext){
          let pagePlus = page++;
          // queryCache.setQueryData(
          //   ['products', { page, pageSize}],
          //   axios.get(`${apiURL}?pagenumber=${pagePlus}&pagesize=${pageSize}&${filterQueryString}`),
          //   productQueryConfig,
          // )

          // queryCache.prefetchQuery(['products', { page, pageSize}], () =>  axios.get(`${apiURL}?pagenumber=${pagePlus}&pagesize=${pageSize}&${filterQueryString}`))
        }
      },
      ...productQueryConfig
    },
    hasNext,
    hasPrevious,
    totalCount,
    totalPages,
  };
}

// get list
function useGetProductsList(page, pageSize, filterQueryString) {
  const base = useBaseList(page, pageSize, filterQueryString)
  const results = useQuery(base)
  
  return { ...results, products: results.data ?? loadingProducts(pageSize), hasNext: base?.hasNext, hasPrevious: base?.hasPrevious, totalCount: base?.totalCount, totalPages: base?.totalPages }
}

// get individual
function useGetProduct(productId) {
  const results = useQuery('product',
  () => axios.get(`${apiURL}/${productId}`)
    .then((res) => res.data),
    {
      initialData: () =>
        queryCache.getQueryData('products')?.find((d) => d.productId === productId),
      staleTime: 2000,
    })

    return { ...results, products: results.data ?? loadingProducts }
}

export { useGetProduct, useGetProductsList }
