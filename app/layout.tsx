import { Metadata } from "next";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata: Metadata = {
  title: "Rhythms AI",
  description: "Discover & Share AI Rhythms",
  icons: "https://seeklogo.com/images/Y/youtube-music-logo-68BD09F5B8-seeklogo.com.png",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
