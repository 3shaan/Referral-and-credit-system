import CartPage from '@/features/cart/cart';
import Navbar from '@/features/landing-page/navbar';

export default async function Cart() {
  return (
    <div className="bg-white w-full h-screen">
      <Navbar />
      <CartPage />
    </div>
  );
}
