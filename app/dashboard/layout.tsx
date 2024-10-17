import Navbar from "../../components/ui/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-5 flex h-screen flex-col gap-5">
      <Navbar />
      {children}
    </div>
  );
}
