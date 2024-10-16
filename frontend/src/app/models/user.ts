import { RoleType } from "../data/role";

export interface User {
  firstName?: string;
  lastName?: string;
  email?: string;
  passowrd?: string;
  phone?: string;
  role?: RoleType;
  token: string;
  success?: boolean
}
