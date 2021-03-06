import React from 'react';
import {useQuery, queryCache, useMutation} from 'react-query';
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
  const [currentPageSize, setCurrentPageSize] = React.useState(null)
 
  return {
    queryKey: ['products', { page, pageSize, filterQueryString }],
    queryFn: () =>
      axios.get(`${apiURL}?pagenumber=${page}&pagesize=${pageSize}&${filterQueryString}`)
        .then((res) => {
          let pagination = JSON.parse(res.headers["x-pagination"]);
          
          setHasNext(pagination.hasNext);
          setHasPrevious(pagination.hasPrevious);
          setTotalCount(pagination.totalCount);
          setTotalPages(pagination.totalPages);
          setCurrentPageSize(pagination.pageSize);
  
          return res.data;
        }),
    config: {
      onSuccess(products) {
        for (const product of products) {
          queryCache.setQueryData(
            ['products', {productId: product.productId}],
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
    currentPageSize,
  };
}

// get list
function useGetProductsList(page, pageSize, filterQueryString) {
  const base = useBaseList(page, pageSize, filterQueryString)
  const results = useQuery(base)
  
  return { ...results, products: results.data ?? loadingProducts(pageSize)
    ,hasNext: base?.hasNext
    ,hasPrevious: base?.hasPrevious
    ,totalCount: base?.totalCount
    ,totalPages: base?.totalPages
    ,currentPageSize : base?.currentPageSize }
}

// get individual
const fetchProduct = (productId) => {if(productId) axios.get(`${apiURL}/${productId}`).then((res) => res.data)}
function useGetProduct(productId) {
  const results = useQuery(
    ['products', { productId }],
    fetchProduct(productId),
    {
      enabled: false
      // initialData: () =>
      //   queryCache.getQueryData('products')?.find((d) => d.productId === productId),
      // staleTime: 2000,
    })

    return { ...results, products: results.data ?? loadingProducts }
}

export const prefetchProduct = (productId) => {
queryCache.prefetchQuery(['products', { productId }], fetchProduct(productId), {
  staleTime: 5000,
})
}

// create product
function useCreateProduct(page, pageSize) {
return useMutation(
  (values) => axios.post(apiURL, values).then((res) => res.data),
  {
    onError: (err, variables, recover) =>
      typeof recover === 'function' ? recover() : null,
    onSuccess: () => {
      queryCache.invalidateQueries('products')
    },
  }
)
}

//patch product
function usePutProduct() {
  return useMutation(
    (product) => axios.put(`${apiURL}/${product.productId}`, product).then((res) => res.data),
    {
      // onMutate: (values) => {
      //   queryCache.cancelQueries('products')
  
      //   const oldPost = queryCache.getQueryData(['products', values.id])
  
      //   queryCache.setQueryData(['products', values.id], values)
  
      //   return () => queryCache.setQueryData(['products', values.id], oldPost)
      // },
      // onError: (error, values, rollback) => rollback(),
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
      onSuccess: (data, variables) => {
        queryCache.invalidateQueries('products')
        // queryCache.invalidateQueries(['products', variables.productId])
      },
    }
  )
}

function usePatchProduct() {
  return useMutation(
    (props) => axios.patch(`${apiURL}/${props.productId}`, props.patchDoc),
    {
      // onError: (error, values, rollback) => rollback(),
      onError: (err, variables, recover) =>
        typeof recover === 'function' ? recover() : null,
      onSuccess: (data, variables) => {
        queryCache.invalidateQueries('products')
        // queryCache.invalidateQueries(['products', variables.productId])
      },
    }
  )
}

export { useGetProduct, useGetProductsList, useCreateProduct, usePutProduct, usePatchProduct }
