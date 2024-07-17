import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Layout from "./components/layout";

export const metadata = {
  title: "Marketplace",
  description: "Sample Marketplace App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
