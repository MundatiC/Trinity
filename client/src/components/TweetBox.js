import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import PhotoIcon from "@material-ui/icons/Photo";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetVideo, setTweetVideo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTweetImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setTweetVideo(file);
  };

  const sendTweet = async (e) => {
    e.preventDefault();

    // Check if tweetMessage is empty
    if (tweetMessage.trim().length === 0) {
      toast.error("Please enter a tweet message.");
      return;
    }

    // Handle image and video upload logic here
    let imageUploadUrl = null;
    let videoUploadUrl = null;

    if (tweetImage) {
      const imageData = new FormData();
      imageData.append("file", tweetImage);
      imageData.append("upload_preset", "faozlxxi");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/trinity-social/image/upload",
        imageData
      );
      imageUploadUrl = response.data.secure_url;
    }

    if (tweetVideo) {
      const videoData = new FormData();
      videoData.append("file", tweetVideo);
      videoData.append("upload_preset", "faozlxxi");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/trinity-social/video/upload",
        videoData
      );
      videoUploadUrl = response.data.secure_url;
    }

    // Make API call to your endpoint
    const data = {
      Content: tweetMessage,
      ImageUrls: imageUploadUrl,
      VideoUrls: videoUploadUrl,
    };
    const response = await axios.post("http://localhost:5051/createPost", data, {
      withCredentials: true,
    });

    if (response.status === 200) {
      toast.success("Post created successfully!");
    } else {
      toast.error("Failed to create post.");
    }

    // Reset state
    setTweetMessage("");
    setTweetImage(null);
    setTweetVideo(null);
  };

  return (
    <div className="tweetBox">
      <form onSubmit={sendTweet}>
        <div className="tweetBox__input">
          <Avatar src="https://res.cloudinary.com/trinity-social/image/upload/v1689102278/kf3bjc6u5frthpjsbscs.jpg" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            required
            placeholder="Describe your post here..."
            type="text"
            
          />
        </div>
        <div className="tweetBox__options">
          <label htmlFor="tweet-image" className="tweetBox__option">
            <input
              id="tweet-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <PhotoIcon className="tweetBox__optionIcon" />
            <span>Add Image</span>
          </label>
          <label htmlFor="tweet-video" className="tweetBox__option">
            <input
              id="tweet-video"
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ display: "none" }}
            />
            <VideoLibraryIcon className="tweetBox__optionIcon" />
            <span>Add Video</span>
          </label>
        </div>

        <Button
          type="submit"
          className="tweetBox__tweetButton"
        >
          Post
        </Button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default TweetBox;
