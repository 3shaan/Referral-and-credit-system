import CartItems from './cart-items';
import OrderNowButton from './order-now-button';

export default function CartPage() {
  return (
    <section className=" mt-20  max-[1200px]:pt-[70px]">
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full ">
          <div className="w-full px-3">
            <div
              className="mb-[30px] aos-init aos-animate"
            >
              <div className="cr-banner mb-[15px] text-center">
                <h2 className="font-Manrope text-[32px] font-bold leading-[1.2] text-[#2b2b2d] max-[1200px]:text-[28px] max-[992px]:text-[25px] max-[768px]:text-[22px]">
                  Cart
                </h2>
              </div>
              <div className="cr-banner-sub-title w-full">
                <p className="max-w-[600px] m-auto font-Poppins text-[14px] text-[#212529] leading-[22px] text-center max-[1200px]:w-[80%] max-[992px]:w-full">
                  All Added Product Shows Here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full">
          <div className="w-full px-3">
            <div
              className="cr-cart-content max-[768px]:overflow-x-scroll aos-init aos-animate"

            >
              <div className="flex flex-wrap w-full max-[768px]:w-[700px]">
                <form action="#" className="w-full">
                  <div className="cr-table-content">
                    <table className="w-full border-[1px] border-solid border-[#e9e9e9] rounded-[5px] overflow-hidden">
                      <thead>
                        <tr className="border border-solid border-indigo-600 bg-indigo-300">
                          <th className="p-[15px] text-[#444] text-[15px] font-semibold text-left capitalize align-middle whitespace-nowrap leading-none tracking-[0]]">
                            Product
                          </th>
                          <th className="p-[15px] text-[#444] text-[15px] font-semibold text-left capitalize align-middle whitespace-nowrap leading-none tracking-[0] ">
                            price
                          </th>
                          <th className="p-[15px] text-[#444] text-[15px] font-semibold text-center capitalize align-middle whitespace-nowrap leading-none tracking-[0] ">
                            Quantity
                          </th>
                          <th className="p-[15px] text-[#444] text-[15px] font-semibold text-left capitalize align-middle whitespace-nowrap leading-none tracking-[0] ">
                            Total
                          </th>
                          <th className="p-[15px] text-[#444] text-[15px] font-semibold text-left capitalize align-middle whitespace-nowrap leading-none tracking-[0] ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <CartItems />
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-10 w-full">
          <OrderNowButton />

        </div>
      </div>
    </section>
  );
}
