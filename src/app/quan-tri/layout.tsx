import MenuBar from "@/components/MenuBar";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function QuanTriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MenuBar />
      <main className="container mx-auto px-4">
        <Breadcrumbs />
        {children}
      </main>
    </>
  );
}
