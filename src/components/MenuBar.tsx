"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function MenuBar() {
  const { data, status } = useSession();

  return (
    <div className="w-full shadow-md bg-white mb-8">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <a className="text-xl font-bold">CTTK</a>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Trang chủ</Link>
            </li>
            <li>
              <a>Dịch vụ</a>
            </li>
            <li>
              <a>Tin tức</a>
            </li>
            <li>
              <a>Giới thiệu</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {status === "loading" && (
            <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
          )}
          {status === "unauthenticated" && (
            <button
              onClick={() => signIn("google")}
              className="btn rounded-full"
            >
              <Image
                alt="Google Logo"
                src="/google.png"
                className="mr-1"
                width={20}
                height={20}
              />
              Đăng nhập với Google
            </button>
          )}
          {status === "authenticated" && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Tailwind CSS Navbar component"
                    src={data.user?.image || "/default-avatar.png"}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-1"
              >
                <li>
                  <a>Tài khoản</a>
                </li>
                <li>
                  <a>Đơn hàng</a>
                </li>
                {data.user?.role === "admin" && (
                  <li>
                    <Link href="/quan-tri">Quản trị</Link>
                  </li>
                )}
                <li>
                  <a
                    className="text-red-500 font-bold hover:bg-red-500 hover:text-white"
                    onClick={() => signOut()}
                  >
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
