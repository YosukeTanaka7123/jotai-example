import { Outlet, createRootRoute } from "@tanstack/react-router";

import Header from "~/components/Header";

export const Route = createRootRoute({
  component: () => {
    console.log("rendering RootRoute");

    return (
      <div className="flex flex-col w-screen h-screen">
        <div className="grow-0">
          <Header />
        </div>
        <div className="grow p-4">
          <Outlet />
        </div>
      </div>
    );
  },
});
