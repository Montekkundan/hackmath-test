
import { Inter } from "next/font/google";
import Link from "next/link";

import { Suspense } from "react";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

async function Footer() {
  return (
    <footer className="bg-accent-1 border-accent-2 border-t">
      <div className="container mx-auto px-5">
          <div className="flex flex-col items-center py-28 lg:flex-row">
            <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
              <Link href="/">
                Home
              </Link>
            </h3>
            {/* <div className="flex flex-col items-center justify-center lg:w-1/2 lg:flex-row lg:pl-4">
              <a
                href="/"
                className="mx-3 mb-6 border border-black bg-black py-3 px-12 font-bold text-white transition-colors duration-200 hover:bg-white hover:text-black lg:mb-0 lg:px-8"
              >
                Read Documentation
              </a>
              <a
                href="/"
                className="mx-3 font-bold hover:underline"
              >
                View
              </a>
            </div> */}
            </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          <main>{children}</main>
          <Suspense>
            <Footer />
          </Suspense>
        </section>
      </body>
    </html>
  );
}