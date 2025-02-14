import { jwtDecode } from "jwt-decode";

export const verifyToken = (encoddedtoken: string) => {
  return jwtDecode(encoddedtoken);
};
