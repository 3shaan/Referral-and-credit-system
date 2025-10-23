import CartPage from '@/features/cart/cart';
import Navbar from '@/features/landing-page/navbar';

export default async function Cart() {
  return (
    <div>
      <Navbar />
      <CartPage />
    </div>
  );
}
