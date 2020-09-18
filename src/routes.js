import React from "react";
import Index from './pages/Index';
import Salespersons from './pages/Salespersons';
import Projects from './pages/Projects';

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
      path: "/projects",
      exact: true,
      page: () => <Projects/>
    }
  ];

  export default routes;