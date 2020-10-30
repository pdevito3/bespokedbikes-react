import React from "react";
import Index from './pages/Index';
import Salespersons from './pages/Salespersons';
import Products from './pages/Products';

export const routes =
  [
    {
      path: "/",
      exact: true,
      page: () => <Index/>
    },
    {
      path: "/salespersons",
      exact: true,
      page: () => <Salespersons/>
    },
    {
      path: "/products",
      exact: true,
      page: () => <Products/>
    }
  ];

  export default routes;