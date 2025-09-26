import { Breadcrumbs } from "@/components/breadcrumbs";

export default async function BreadcrumbSlot({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const formattedName = name.toLowerCase().replace(/-/g, " ");

  const links = [
    { href: "/", title: "Home" },
    { href: "/products", title: "Products" },
  ];

  return (
    <Breadcrumbs links={links} current={formattedName} />
  );
}