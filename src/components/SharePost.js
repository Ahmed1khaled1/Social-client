import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CloseIcon from "@mui/icons-material/Close";

import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserImg from "./UserImg";
import { setPosts } from "state";
import axios from "axios";

function SharePost() {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    if (!image && !post.trim()) {
      alert("You need to add text or an image to post!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", _id);
    
    if (image) {
      formData.append("picture", image);
    }

    if (post.trim()) {
      // Only include if there's text
      formData.append("description", post);
    }
    console.log("Image:", image);

    try {
      const response = await axios.post(
        `https://social-server-tau.vercel.app/posts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      window.location.reload();
      console.log("Post successful:", response.data);
      dispatch(setPosts(response.data ));
      setPost(""); // Reset text input
      setImage(null); // Reset image input
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="dark:bg-grey-800 bg-white p-3 rounded-xl text-left">
      <div className="flex flex-col justify-between items-center w-full">
        <div className="flex w-full">
          <UserImg image={picturePath} />
          <input
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="what's in your mind..."
            className="w-full ml-5 rounded-full p-2 focus:outline-none dark:bg-grey-700 bg-grey-10"
          />
        </div>
        <Dropzone
          className="mt-3"
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="p-2 mt-3 w-full rounded-md cursor-pointer 
            dark:bg-grey-800 border border-grey-300"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!image ? (
                <p className="text-grey-300">Add image Here</p>
              ) : (
                <div className="flex justify-between items-center">
                  {image.name}
                  <EditOutlinedIcon />
                </div>
              )}
            </div>
          )}
        </Dropzone>
        {image && (
          <div className="relative mt-3">
            <img src={URL.createObjectURL(image)} alt="" className="w-full" />
            <DeleteOutlineOutlinedIcon
              className="cursor-pointer text-grey-400 text-4xl absolute top-1 right-1"
              onClick={() => setImage(null)}
            />
          </div>
        )}
        <hr className="m-3" />
        <div className="relative w-full flex justify-between items-center">
          <div
            onClick={() => setIsImage(!isImage)}
            className="flex gap-1 items-center cursor-pointer"
          >
            <AddPhotoAlternateOutlinedIcon />
            <div>Image</div>
          </div>
          <div className="hidden lg:flex gap-1 items-center cursor-pointer">
            <GifBoxOutlinedIcon />
            <div>Clip</div>
          </div>
          <div className="hidden lg:flex gap-1 items-center cursor-pointer">
            <AttachFileOutlinedIcon />
            <div>Attachment</div>
          </div>
          <div className="hidden lg:flex gap-1 items-center cursor-pointer">
            <MicNoneOutlinedIcon />
            <div>Audio</div>
          </div>
          <div className="lg:hidden flex gap-1 items-center cursor-pointer">
            <button
              value={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
            >
              {isOpen ? <CloseIcon /> : <MoreHorizOutlinedIcon />}
            </button>
          </div>
          {isOpen && (
            <div
              className="lg:hidden absolute rounded-lg top-[45px] z-10 right-[40%] 
  w-[50%] bg-grey-100 dark:bg-grey-700 p-2 gap-3"
            >
              <div className="flex gap-1 items-center cursor-pointer">
                <GifBoxOutlinedIcon />
                <div className="">Clip</div>
              </div>
              <div className="flex gap-1 items-center cursor-pointer">
                <AttachFileOutlinedIcon />
                <div className="">Attachment</div>
              </div>
              <div className="flex gap-1 items-center cursor-pointer">
                <MicNoneOutlinedIcon />
                <div className="">Audio</div>
              </div>
            </div>
          )}

          <button
            disabled={!post && !image}
            onClick={handlePost}
            className="dark:bg-grey-600 bg-grey-50 py-1 px-4 rounded-lg dark:text-white text-grey-800 font-medium cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharePost;
