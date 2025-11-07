import "./globals.scss";
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Sales Management System</title>
        <meta name="description" content="Professional sales management platform" />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
