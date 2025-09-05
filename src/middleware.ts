// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  () => {}, // không cần logic phụ
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // nếu chưa login
        if (!token) return false;

        // chỉ admin mới vào /quan-tri
        if (pathname.startsWith("/quan-tri")) {
          return (token as any)?.role === "admin";
        }

        // các route khác (vd /dashboard) chỉ cần login
        return true;
      },
    },
  }
);

// chỉ áp dụng middleware cho 2 khu vực này
export const config = {
  matcher: ["/quan-tri/:path*"],
};
