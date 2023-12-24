import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Footer, NavBar } from "@/components";

import ProvidersQuery from "@/query/provider.query";
import Providers from "@/redux/provider";

export const metadata: Metadata = {
  title: "Car Hub",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ProvidersQuery>
        <Providers>
          <Toaster position={"top-center"} />

          <body className={"relative"}>
            <NavBar />

            {children}
            <Footer />
          </body>
        </Providers>
      </ProvidersQuery>
    </html>
  );
}
