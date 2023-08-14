import Image from "next/image";
import { FC } from "react";

interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  username: string;
  image: string;
  bio: string;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  accountId,
  authUserId,
  username,
  image,
  bio,
}) => {
  return (
    <div className="flex flex-col w-full justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={image}
              alt="Profile image"
              className="rounded-full object-cover shadow-2xl"
              fill
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {username}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </div>

      {/* TODO: Commnity */}

      <p className="mt-6 max-w-lg text-base-regular text-light-2">{bio}</p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
