// app/layout.js
export const metadata = {
  title: "Insta-Mind App",
  description: "AI assistant for Instagram Reels and content ideas"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#fafafa" }}>
        {children}
      </body>
    </html>
  );
}
