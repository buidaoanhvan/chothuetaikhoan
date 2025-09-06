"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const labelMap: Record<string, string> = {
  "quan-tri": "Quản trị",
  "nguoi-dung": "Người dùng",
  "tin-tuc": "Tin tức",
  "san-pham": "Sản phẩm",
  "them-moi": "Thêm mới",
};

export default function Breadcrumbs() {
  const pathname = usePathname(); // ví dụ: /documents/add
  const segments = pathname.split("/").filter(Boolean); // ["documents","add"]

  return (
    <div className="breadcrumbs text-sm my-4">
      <ul>
        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const label = labelMap[segment] || segment;
          const isLast = idx === segments.length - 1;
          return (
            <li key={href}>
              {isLast ? <span>{label}</span> : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
