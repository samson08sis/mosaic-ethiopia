import ThemeProvider from "./contexts/ThemeContext";
import LanguageProvider from "./contexts/LanguageContext";

// Simple Navbar component
function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">Mosaic Ethiopia</h1>
      </div>
    </nav>
  );
}

// Simple Hero component
function Hero() {
  return (
    <div className="bg-blue-500 text-white p-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Explore the World</h1>
      <p className="text-xl">Discover amazing places with us</p>
    </div>
  );
}

// Simple Footer component
function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 p-4 text-center">
      <p>
        &copy; {new Date().getFullYear()} Mosaic Ethiopia. All rights reserved.
      </p>
    </footer>
  );
}

// Main App component
export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <Hero />
          <main className="flex-grow container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to Mosaic Ethiopia
            </h2>
            <p>Your journey begins here.</p>
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
