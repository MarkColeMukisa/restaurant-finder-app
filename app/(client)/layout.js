import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";

export default function ClientLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
