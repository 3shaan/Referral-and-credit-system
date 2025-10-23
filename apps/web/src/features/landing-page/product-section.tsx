import Image from 'next/image';

import { getAllProducts } from '@/action/products';
import AddToCartButton from '@/components/products/add-to-cart-button';

export async function ProductSection() {
  const productsRes = await getAllProducts();
  const { data: products } = productsRes;
  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600">Use your earned credits to get these amazing products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
            >
              <div className="bg-linear-to-br  h-48 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="object-contain w-full "
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    $
                    {product.price}
                  </span>
                  <AddToCartButton product={product} />

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
