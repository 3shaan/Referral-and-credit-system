'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';

import AddToCartButton from '@/components/products/add-to-cart-button';
import useAddToCart from '@/hooks/add-to-cart';

const CartItems = () => {
  const { cart, removeFromCart }
    = useAddToCart();
  return (
    <>
      {cart.map((item) => {
        return (
          <tr
            className="border-b border-solid border-indigo-200 bg-indigo-50"
            key={item._id}
          >
            <td className="cr-cart-name w-[40%] py-[25px] px-3.5 text-[#444] text-[16px] text-left ">
              <div className="text-[#444] font-medium text-[14px] flex leading-normal tracking-[0.6px] items-center">
                <Image
                  src={item.image || ''}
                  alt={item.name}
                  className="cr-cart-img mr-5 w-[60px] border border-solid  rounded-[5px]"
                  width={100}
                  height={100}
                />
                {item.name}
              </div>
            </td>
            <td className="cr-cart-price py-[25px] px-2.5 text-[#555] text-[15px] font-medium text-left ">
              <span className="amount text-[#555] text-[15px] font-medium text-left">
                {item.price}
                {' '}
                TK
              </span>
            </td>
            <td className="py-[25px] px-2.5 text-[#444] text-[16px] text-left ">
              <div className="w-[100px] flex justify-between items-center">
                <AddToCartButton product={item} />
              </div>
            </td>
            <td className="cr-cart-subtotal py-[25px] px-3.5 text-[#555] font-medium text-[15px] text-left">
              {item.price * item.quantity}
              {' '}
              TK
            </td>
            <td className="cr-cart-remove py-[25px] px-3.5 w-[90px] text-[#555] font-medium text-[15px] text-right">
              <button
                type="button"
                onClick={() => removeFromCart(item._id)}
                className="transition-all duration-300 ease-in-out my-0 mx-auto text-[#555] hover:text-[#fb5555]"
              >
                <Trash className="text-[22px]" />
              </button>
            </td>
          </tr>
        );
      })}
      {cart.length === 0 && (
        <tr>
          <td colSpan={5} className="text-center py-5">
            <p className="text-[16px] text-[#777]">Your cart is empty</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default CartItems;
