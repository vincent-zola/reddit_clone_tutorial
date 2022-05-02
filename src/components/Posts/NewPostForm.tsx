// * ========== Imports ==========

import { Alert, AlertIcon, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "../../atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// * ========== TS Types ==========

type NewPostFormProps = {
  user: User;
};

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

const NewPostForm: React.FC<NewPostFormProps> = ({ user }) => {
  const router = useRouter();
  // we use it to visually highlight the formTabs
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // *store post in db
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    // create new post obj => type Post
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user?.uid,
      // the bing operator tells TS that there will be for sure a value
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };

    // store the post in db
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      // check for selectedFile
      if (selectedFile) {
        // store in storage => getDownloadURL (return imageURL)
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        // imageRef: path, selectedFile: what we want to upload, data_url: format
        await uploadString(imageRef, selectedFile, "data_url");
        // create img url, so that we can view the img in the browser
        const downloadURL = await getDownloadURL(imageRef);
        // update post doc by adding imageURL
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      // redirect the user back to the communityPage using the router
    router.back();
    } catch (error: any) {
      console.log("handleCreatePost", error.message);
      setError(true);
    }
    setLoading(false);

    
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
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
