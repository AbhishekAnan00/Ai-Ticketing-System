import "./globals.css";


export const metadata = {
  title: "ai ticketing system",
  description: "an ai ticketing system for streamlined support.",
};

export default function RootLayout({ children }) {
  return (
     <html lang="en">
      <body style={{margin:0,
        fontFamily:"Arial, san-serif"
      }}>
        {children}
      </body>
     </html>
  );
}
