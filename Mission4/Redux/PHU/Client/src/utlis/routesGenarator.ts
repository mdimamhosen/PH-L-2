import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export interface IUserPath {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IUserPath[];
}

export const routeGenarator = (items: IUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
