import React from "react";
import Avatar from "./Avatar";
import { formatTimeAgo } from "../utils/formatDates";
import { UserData } from "../types/Types";

interface CreatorProps {
  creator: UserData;
  createdAt: string;
}

const Creator: React.FC<CreatorProps> = ({ creator, createdAt }) => {
  return (
    <small>
      <Avatar user={creator} size="small" />
      <span>{creator.name}</span>
      {formatTimeAgo(createdAt)}
    </small>
  );
};

export default Creator;
