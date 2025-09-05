import "next-auth";

declare module "next-auth" {
  interface User {
    id?: string;
    role?: string;
  }

  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string;
      role?: string;
    };
    expires: string;
  }
}
