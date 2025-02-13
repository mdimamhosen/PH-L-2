import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type TSideBarItem = {
  key: string;
  label: ReactNode;
  children?: TSideBarItem[];
};

export interface IUserPath {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IUserPath[];
}

export const sidebarItemsGenarator = (items: IUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSideBarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);
  return sidebarItems;
};
