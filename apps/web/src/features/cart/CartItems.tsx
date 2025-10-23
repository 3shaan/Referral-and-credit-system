'use client';
import { Trash } from 'lucide-react';
import Image from 'next/image';

import useAddToCart from '@/hooks/add-to-cart';

const CartItems = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart }
    = useAddToCart();
  return (
    <>
      {cart.map((item) => {
        return (
          <tr
            className="border-b border-solid border-[#e9e9e9]"
            key={item._id}
          >
            <td className="cr-cart-name w-[40%] py-[25px] px-3.5 text-[#444] text-[16px] text-left bg-[#f7f7f8]">
              <div className="text-[#444] font-medium text-[14px] flex leading-normal tracking-[0.6px] items-center">
                <Image
                  src={item.image || ''}
                  alt={item.name}
                  className="cr-cart-img mr-5 w-[60px] border border-solid border-[#e9e9e9] rounded-[5px]"
                  width={100}
                  height={100}
                />
                {item.name}
              </div>
            </td>
            <td className="cr-cart-price py-[25px] px-2.5 text-[#555] text-[15px] font-medium text-left bg-[#f7f7f8]">
              <span className="amount text-[#555] text-[15px] font-medium text-left">
                {item.price}
                {' '}
                TK
              </span>
            </td>
            <td className="cr-cart-qty py-[25px] px-2.5 text-[#444] text-[16px] text-left bg-[#f7f7f8]">
              <div className="cart-qty-plus-minus w-20 h-[30px] my-0 mx-auto relative overflow-hidden flex bg-white border border-solid border-[#e9e9e9] rounded-[5px] items-center justify-between">
                <button
                  type="button"
                  className="plus h-[25px] w-[25px] -mt-0.5 border-0 bg-transparent flex justify-center items-center"
                  onClick={() => increaseQuantity(item._id)}
                >
                  +
                </button>
                <input
                  type="text"
                  placeholder="."
                  // defaultValue={item.quantity}
                  value={item.quantity}
                  disabled
                  className="quantity w-[30px] m-0 p-0 text-[#444] float-left text-[14px] font-semibold leading-[38px] h-auto text-center outline-0"
                />
                <button
                  type="button"
                  className="minus h-[25px] w-[25px] -mt-0.5 border-0 bg-transparent flex justify-center items-center"
                  onClick={() => decreaseQuantity(item._id)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
              </div>
            </td>
            <td className="cr-cart-subtotal py-[25px] px-3.5 text-[#555] font-medium text-[15px] text-left bg-[#f7f7f8]">
              {item.price * item.quantity}
              {' '}
              TK
            </td>
            <td className="cr-cart-remove py-[25px] px-3.5 w-[90px] text-[#555] font-medium text-[15px] text-right bg-[#f7f7f8]">
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
