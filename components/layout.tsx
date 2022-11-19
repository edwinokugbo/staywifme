import Navbar from "./nav/Navbar";
import Footer from "./layout/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar fixed={true} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
