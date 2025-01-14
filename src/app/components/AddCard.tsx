import Image from "next/image";

interface AddCardProps {
    image: string;
    title: string
    width: number;
    height: number
}

const AddCard: React.FC<AddCardProps> = ({image, title, width, height}) => {
  return (
    <div className="bg-[#EBEBEB] flex flex-col justify-center items-center w-[9.51rem] h-[8.88rem] gap-3 rounded-[17.75px] ml-2 cursor-pointer min-w-fit  border-[1px] p-4 md:p-0">
          <Image
            src={image}
            width={width}
            height={height}
            alt="add folder icon"
          />
          <p className="font-bold text-[1.06rem] leading-[1.18rem]">
            {title}
          </p>
        </div>
  )
}

export default AddCard