export interface ICurrentUser {
  currentUser: {
    id: string;
    email: string;
    iat: number;
  } | null;
}
