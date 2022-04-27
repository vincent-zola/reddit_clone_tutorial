// * ========== Imports ==========

import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { Community, communityState } from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

// *========== Variables & Functions ==========

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  console.log(user?.uid);
  
  //   contains atom: default: mySnippets: []
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // * decide to join or leave community
  // communityData: data from firestore db about the community itself
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //   is the user signed in?
    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
    // if not => open auth modal
  };

  //* get user snippet from firestore db
  const getMySnippets = async () => {
    setLoading(true);
    // get the users snippets
    // path to the snippets
    const snippetDocs = await getDocs(
        // ! how do we get the snippets if the uid and the document id are different?
      collection(firestore, `users/${user?.uid}/communitySnippets`)
    );
    try {
    } catch (error) {
      console.log("getMySnippets error", error);
    }
  };

  // * Join Community

  const joinCommunity = (communityData: Community) => {};

  // * Leave Community
  // communityId: is the name of the community
  const leaveCommunity = (communityId: string) => {};

  return {
    // data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
