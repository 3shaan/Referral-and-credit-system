import Footer from '@/features/landing-page/footer';
import { HeroSection } from '@/features/landing-page/hero-section';
import Navbar from '@/features/landing-page/navbar';
import { ProductSection } from '@/features/landing-page/product-section';

export default function Home() {
  const a = '';
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <Footer />
    </div>
  );
}
