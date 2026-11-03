import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/global/Footer";
import { HeaderDesktop } from "@/components/global/HeaderDesktop";
import { HeaderMobile } from "@/components/global/HeaderMobile";
import {
  createGlobalStructuredData,
  getSiteUrl,
  OFFICIAL_LOGO_PATH,
  OPEN_GRAPH_IMAGE_PATH,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
} from "@/lib/site";
import "@/styles/tokens.css";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: OFFICIAL_LOGO_PATH },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: OPEN_GRAPH_IMAGE_PATH, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OPEN_GRAPH_IMAGE_PATH],
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const structuredData = createGlobalStructuredData();

  return (
    <html lang="es" className={manrope.variable}>
      <body>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <a className="skip-link" href="#contenido-principal">
          Saltar al contenido principal
        </a>
        <header>
          <HeaderDesktop />
          <HeaderMobile />
        </header>
        <main id="contenido-principal">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
