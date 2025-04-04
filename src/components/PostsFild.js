import Post from "./Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

function PostsFild({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts) || [];
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch(
        "https://social-server-tau.vercel.app/posts",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data) {
        dispatch(
          setPosts({
            posts: data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            }),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://social-server-tau.vercel.app/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data) {
      dispatch(
        setPosts({
          posts: data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }),
        })
      );
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <Post
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </>
    </div>
  );
}

export default PostsFild;
