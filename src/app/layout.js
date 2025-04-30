import "@/styles/normalise.css";
import "@/styles//globals.css";

export const metadata = {
  title: "Pokemon App",
  description: "A Pokemon Next.js app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
