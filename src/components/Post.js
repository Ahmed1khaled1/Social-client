import React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import Frind from "./Frind";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

function Post({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const patchLike = async () => {
    try {
      const response = await fetch(
        `https://social-server-tau.vercel.app/posts/${postId}/like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: loggedInUserId }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Failed to patch like:", error);
    }
  };

  return (
    <div className="dark:bg-grey-800 bg-white p-3 rounded-xl mt-5">
      <Frind
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <div className="mt-3">{description}</div>
      {picturePath && (
        <img
          className="my-5"
          src={picturePath}
          alt="post"
        />
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button onClick={patchLike} className="flex items-center gap-2">
            {isLiked ? (
              <FavoriteOutlined className="text-red-500 cursor-pointer" />
            ) : (
              <FavoriteBorderOutlined className="text-red-500 cursor-pointer" />
            )}
            <span>{likeCount}</span>
          </button>
          <ChatBubbleOutlineOutlined
            className="text-gray-500 cursor-pointer"
            onClick={() => setIsComments(!isComments)}
          />
        </div>
        <ShareOutlined className="text-gray-500 cursor-pointer" />
      </div>
      {isComments && (
        <div>
          {comments.map((comment, i) => (
            <div key={`${name}-${i}`}>
              <hr />
              <p className="text-gray-500">{comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
