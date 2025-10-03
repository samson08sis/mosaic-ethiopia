import { User } from "@/types/auth";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProfileImage({ user }: { user: User }) {
  const [renderImage, setRenderImage] = useState(true);

  return (
    // <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
    //  {user?.avatar ? (
    //    <img
    //      src={user.avatar}
    //      alt={user.name}
    //      className="w-full h-full object-cover"
    //    />
    //   ) : (
    //    <User className="h-5 w-5 text-primary-600" />
    //   )}
    // </div>

    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center overflow-hidden">
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt={user.name}
          width={100}
          height={100}
          className="w-full h-full object-cover transition-opacity duration-300"
          // onError={(e) => {
          //   const target = e.target as HTMLImageElement;
          //   target.src = "/bg-6.jpg";
          // }}
          // placeholder="blur"
          // blurDataURL="/bg-9.jpg"
        />
      ) : (
        <UserIcon className="h-5 w-5 text-primary-600" />
      )}
    </div>
  );
}
