import React from "react";
import Index from './pages/Index';
import Team from './pages/Team';
import Projects from './pages/Projects';

export const routes =
  [
    {
      path: "/",
      exact: true,
      page: () => <Index/>
    },
    {
      path: "/team",
      exact: true,
      page: () => <Team/>
    },
    {
      path: "/projects",
      exact: true,
      page: () => <Projects/>
    }
  ];

  export default routes;