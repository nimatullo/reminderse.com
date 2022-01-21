import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function Card({ title, description, date, img }: any) {
  return (
    <div className="main-card rounded-box drop-shadow-xl">
      <a href="#">
        <div className="imgArea">
          <Image
            className="text-secondary"
            width={150}
            height={150}
            src={img}
          />
        </div>
        <div className="cardInfo bg-primary-content">
          <div className="entryTitle">{title}</div>
          <div className="secondary">{description}</div>
          <div className="secondary date">{date}</div>
        </div>
        <div className="dropdownMenu">
          <BsThreeDotsVertical />
        </div>
      </a>
    </div>
  );
}
