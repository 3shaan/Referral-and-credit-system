import type { Product } from '@repo/validation';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  cart: (Product & { quantity: number })[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  removeAllFromCart: () => void;
};

const useAddToCart = create<State>()(
  persist(
    set => ({
      cart: [],
      addToCart: (product: Product) =>
        set((state) => {
          const existingProduct = state.cart.find(
            item => item._id === product._id,
          );
          if (existingProduct) {
            return {
              cart: state.cart.map(item =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      decreaseQuantity: (productId: string) =>
        set((state) => {
          const item = state.cart.find(item => item._id === productId);
          if (item?.quantity === 1) {
            return {
              cart: state.cart.filter(item => item._id !== productId),
            };
          }
          return {
            cart: state.cart.map(item =>
              item._id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          };
        }),
      increaseQuantity: (productId: string) =>
        set(state => ({
          cart: state.cart.map(item =>
            item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),
      removeFromCart: (productId: string) =>
        set(state => ({
          cart: state.cart.filter(item => item._id !== productId),
        })),
      removeAllFromCart: () => set(() => ({ cart: [] })),
    }),
    {
      name: 'cart-storage', // key in localStorage
    },
  ),
);

export default useAddToCart;
