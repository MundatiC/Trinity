import React, {useState, useEffect} from 'react';
import './Profile.css';
import FlipMove from "react-flip-move";
import Post from './Post';
const data2 =  [
  {
      "PostId": 16,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T15:37:31.840Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 15,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T13:08:55.200Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 1,
      "CommentCount": 0,
      "ImageUrls": "",
      "VideoUrls": ""
  },
  {
      "PostId": 14,
      "UserId": 79,
      "Content": "Wicked",
      "CreatedAt": "2023-07-06T12:41:59.973Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 13,
      "UserId": 79,
      "Content": "Hi yaal",
      "CreatedAt": "2023-07-06T12:38:06.817Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 12,
      "UserId": 70,
      "Content": "Check out this image and video!",
      "CreatedAt": "2023-07-06T12:31:29.137Z",
      "User": "Mbugua",
      "ProfilePicture": "profile.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 11,
      "UserId": 70,
      "Content": "Check out this image and video!",
      "CreatedAt": "2023-07-04T09:55:06.147Z",
      "User": "Mbugua",
      "ProfilePicture": "profile.jpg",
      "LikeCount": 1,
      "CommentCount": 13,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 16,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T15:37:31.840Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 15,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T13:08:55.200Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 1,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 14,
      "UserId": 79,
      "Content": "Wicked",
      "CreatedAt": "2023-07-06T12:41:59.973Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 13,
      "UserId": 79,
      "Content": "Hi yaal",
      "CreatedAt": "2023-07-06T12:38:06.817Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 12,
      "UserId": 70,
      "Content": "Check out this image and video!",
      "CreatedAt": "2023-07-06T12:31:29.137Z",
      "User": "Mbugua",
      "ProfilePicture": "profile.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 11,
      "UserId": 70,
      "Content": "Check out this image and video!",
      "CreatedAt": "2023-07-04T09:55:06.147Z",
      "User": "Mbugua",
      "ProfilePicture": "profile.jpg",
      "LikeCount": 1,
      "CommentCount": 13,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  }
]
const data3 =  [
  {
      "PostId": 16,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T15:37:31.840Z",
      "User": "Caleb",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 15,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T13:08:55.200Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 1,
      "CommentCount": 0,
      "ImageUrls": "",
      "VideoUrls": ""
  },
  {
      "PostId": 14,
      "UserId": 79,
      "Content": "Wicked",
      "CreatedAt": "2023-07-06T12:41:59.973Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 13,
      "UserId": 79,
      "Content": "Hi yaal",
      "CreatedAt": "2023-07-06T12:38:06.817Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 12,
      "UserId": 70,
      "Content": "Check out this image and video!",
      "CreatedAt": "2023-07-06T12:31:29.137Z",
      "User": "Mbugua",
      "ProfilePicture": "profile.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 11,
      "UserId": 70,
      "Content": "Check out this image and video!",
      "CreatedAt": "2023-07-04T09:55:06.147Z",
      "User": "Mbugua",
      "ProfilePicture": "profile.jpg",
      "LikeCount": 1,
      "CommentCount": 13,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 16,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T15:37:31.840Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 0,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  },
  {
      "PostId": 15,
      "UserId": 79,
      "Content": "Bang",
      "CreatedAt": "2023-07-06T13:08:55.200Z",
      "User": "MbuguaLenn",
      "ProfilePicture": "https://res.cloudinary.com/trinity-social/image/upload/v1688916649/y6q3qjenboawshlpmmwb.jpg",
      "LikeCount": 1,
      "CommentCount": 0,
      "ImageUrls": "https://res.cloudinary.com/trinity-social/image/upload/v1688636280/tpii9dqwed9hkds8tnwr.jpg,https://res.cloudinary.com/trinity-social/image/upload/v1688636279/bymyaj1b9uvzai65hdje.jpg",
      "VideoUrls": "https://res.cloudinary.com/trinity-social/video/upload/v1688636285/gjvryfpz61q4l5tx4equ.mp4"
  }
]

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");


  useEffect(() => {
    setPosts(data2);
  }, [])

  const data = {
    UserId: 104,
    Username: 'Vavi',
    email: 'lennymbugua258@gmail.com',
    CreatedAt: '2023-07-10T09:39:10.493Z',
    ProfilePicture: 'https://res.cloudinary.com/trinity-social/image/upload/v1688971147/oe1jl5lej1udr4nfofug.jpg',
    FollowersCount: 0,
    FollowingCount: 5,
    Bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredPosts = activeTab === "posts" ? posts : data3;


  return (
    <>
      <div className="profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {data.ProfilePicture ? (
              <img src={data.ProfilePicture} alt="Avatar" />
            ) : (
              <i className="fa fa-user fa-5x" aria-hidden="true"></i>
            )}
          </div>
          <div className="profile-info">
            <h2>{data.Username}</h2>
            <p className="name">{data.Name}</p>
          </div>
        </div>
        <div className="profile-bio">
          <p>{data.Bio}</p>
        </div>
        <div className="profile-stats">
          <div className="followers">
            <span className="count">{data.FollowersCount}</span>
            <span className="label">Followers</span>
          </div>
          <div className="following">
            <span className="count">{data.FollowingCount}</span>
            <span className="label">Following</span>
          </div>
        </div>
        <div className="profile-tabs">
          <div
            className={`tab ${activeTab === "posts" ? "active" : ""}`}
            onClick={() => handleTabChange("posts")}
          >
            POSTS
          </div>
          <div
            className={`tab ${activeTab === "likes" ? "active" : ""}`}
            onClick={() => handleTabChange("likes")}
          >
            LIKES
          </div>
        </div>
        <FlipMove>
          {filteredPosts.map((post) => (
            <Post key={post.PostId} post={post} />
          ))}
        </FlipMove>
      </div>
    </>
  );
};

export default Profile;
