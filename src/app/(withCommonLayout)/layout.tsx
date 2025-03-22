import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div >{children}</div>
      <Footer />
    </>
  );
};

export default CommonLayout;
