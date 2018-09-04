export interface User {
  id: number;
  name: string;
  nickName: string;
  email?: string;
  avatar: string;
  deptID: number;
  [key: string]: any;
}
