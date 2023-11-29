import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./likePost.css";

function LikePost({ post }) {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  // const likes = useSelector((state) => state.postLikes[post?.id])

  useEffect(() => {}, []);

  return (
    <div className="comment-react-post">
      <button
        onMouseEnter={(e) => e.currentTarget.classList.add("animate-button")}
        onMouseLeave={(e) =>
          setTimeout(e.currentTarget.classList.remove("animate-button"), 3000)
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          onMouseEnter={(e) => e.currentTarget.classList.add("animate")}
          onMouseLeave={(e) =>
            setTimeout(e.currentTarget.classList.remove("animate"), 3000)
          }
        >
          <path
            d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
            stroke="#707277"
            stroke-width="2"
            stroke-linecap="round"
            fill="#707277"
            onMouseEnter={(e) => e.currentTarget.classList.add('animate-path') }
            onMouseLeave={(e) => setTimeout(() => {e.currentTarget.classList.remove('animate-path')}, 3000)}
          ></path>
        </svg>
      </button>
      <vr />
      {/* <span>{likes ? Object.values(likes).length : 0}</span> */}
      <span>0</span>
    </div>
  );
}

export default LikePost;
