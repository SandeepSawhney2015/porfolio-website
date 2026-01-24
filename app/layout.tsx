import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollHint from "@/components/ScrollHint";


const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Personal Website",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <NavBar />
        {children}
        <ScrollHint idleMs={9000} />
        <Analytics/>
        <Footer />
      </body>
    </html>
  );
}
