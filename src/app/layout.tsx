import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "My Next Todo App",
  description: "Todo app with Next.js + TanStack Query",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
