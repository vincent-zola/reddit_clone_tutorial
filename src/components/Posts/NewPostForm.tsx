// * ========== Imports ==========

import { Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "../../atoms/postsAtom";

// * ========== TS Types ==========

type NewPostFormProps = {};

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

// *========== Variables & Functions ==========

// items for the Navbar
const formTabs: TabItem[] = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

const NewPostForm: React.FC<NewPostFormProps> = () => {
  // we use it to visually highlight the formTabs
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);

  // *store post in db
  const handleCreatePost = async () => {
    // create new post obj => type Post
    const newPost: Post = {};
    // store the post in db
    // check for selectedFile
    // store in storage => getDownloadURL (return imageURL)
    // update post doc by adding imageURL
    // redirect the user back to the communityPage using the router
  };

  // * image upload Fn.
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // FileReader provided by JS
    const reader = new FileReader();
    // [0] our Image Input element return an Array of uploaded items in our case one Image, therefore read just the only and first item in array.
    if (event.target.files?.[0]) {
      // readAsDataURL() read the binary data and encode it as base64 data url.
      reader.readAsDataURL(event.target.files[0]);
    }
    // store the img in setSelectedFile, readerEvent is just an regular e. event.
    // .onload: Called when a read operation successfully completes.
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  // * Text and Area recorder Fn.
  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // * ========== HTML ==========

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onChange={onTextChange}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
    </Flex>
  );
};
export default NewPostForm;
