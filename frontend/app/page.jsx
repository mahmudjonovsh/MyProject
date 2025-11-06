import { Header, HeroSection, FeaturesSection, ProductGrid, Footer } from './components';

export default function Home() {
  return (
    <div className="app">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}
