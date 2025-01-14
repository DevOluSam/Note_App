import Image from 'next/image';
import React from 'react'

interface ProductReviewCardProps {
  color: string; 
  name: string;
  date: string;
  icon: string;
}

const ProductReviewCard: React.FC<ProductReviewCardProps> = ({ color, name, date, icon}) => {
  return (
    <div style={{ backgroundColor: color }} className='w-[17.94rem] h-[10.5rem] rounded-[21px] p-6 flex flex-col gap-8 cursor-pointer group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 duration-500 min-w-fit'>
     <div className='flex justify-between items-center'>
        <Image src={icon} alt={name} width={30.8} height={34.75} />
        <Image src='/images/more_icon.svg' alt='dropdown icon' width={24} height={24} />
     </div>
      <div >
      <h3 className='font-bold text-[1.25rem] leading-[1.49rem] text-[#4C4B4B] mb-2'>{name}</h3>
      <p className='text-[#7A7A7A] font-semibold text-[0.88rem] leading-[1.03rem] '>{date}</p>
      </div>
    </div>
  )
}

export default ProductReviewCard;
