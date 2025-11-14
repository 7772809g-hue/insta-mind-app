export const metadata = {
  title: "Insta-Mind App",
  description: "Your AI Instagram assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
