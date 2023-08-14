"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { Button } from "../ui/button";

interface UserCardProps {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

export const UserCard: FC<UserCardProps> = ({
  id,
  name,
  username,
  imgUrl,
  personType,
}) => {
  const router = useRouter();

  const handleViewProfile = useCallback(
    () => router.push(`/profile/${id}`),
    [router, id]
  );

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button className="user-card_btn" onClick={handleViewProfile}>
        View
      </Button>
    </article>
  );
};

export default UserCard;
