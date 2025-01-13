"use client"
import DateNav from './components/DateNav';
import ProductReviewCard from './components/ProductReviewCard'
import Image from 'next/image'

export default function Home() {
  

  return (
    <aside className="py-8 text-[#5f5f5f] font-raleway bg-[#fafafa] h-full mt-8 px-8 rounded-tl-[25px]">
      <h5 className="font-bold text-[1.5rem] leading-[1.76rem]">Recent Folder</h5>
      <DateNav />
      <div className="flex  mt-8 items-center ">
        <div className='flex gap-4 flex-wrap justify-center group'>
        <ProductReviewCard color='#FFE2E8' name='Product Review' date='12/12/2024' icon='/images/product_icon.svg' />
        <ProductReviewCard color='#EBE8FF' name='Product Review' date='12/12/2024' icon='/images/product_icon2.svg' />
        <ProductReviewCard color='#FFFEE2' name='Product Review' date='12/12/2024' icon='/images/product_icon3.svg' />
        </div>
        <div className='bg-[#EBEBEB] flex flex-col justify-center items-center w-[9.51rem] h-[8.88rem] gap-2 rounded-[17.75px] ml-4 cursor-pointer  border-[1px]'>
          <Image src='/images/product_icon4.svg' width={26.03} height={29.37} alt='add folder icon' />
          <p className='font-bold text-[1.06rem] leading-[1.18rem]'>Add Folder</p>
        </div>
      </div>
    </aside>
  );
}
