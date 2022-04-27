// * ========== Imports ==========

import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import {
  Community,
  CommunitySnippet,
  communityState,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";

// *========== Variables & Functions ==========

const useCommunityData = () => {
  const [user] = useAuthState(auth);

  //   contains atom: default: mySnippets: [] will be populated with snippets from user
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // * decide to join or leave community

  const onJoinOrLeaveCommunity = (
    // communityData: data from firestore db about the community itself
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
    try {
      // get the users snippets
      // path to the snippets
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      // snippets will now contain all communitySnippets from user
      // .docs: returns an array of all our snippets
      // .data() Retrieves all fields in the document as an Object.
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      // push snippets to recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        // CommunitySnippet[] defined in communitiesAtom.ts
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message);
    }
    setLoading(false);
  };
  // retrieve snippets if user changes
  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  // * Join Community

  const joinCommunity = async (communityData: Community) => {
    //   batch write
    //   creating a new community snippet
    try {
      // writeBatch: is a set of write operations on one or more documents.
      const batch = writeBatch(firestore);
      // snipped which will bu pushed to db
      const newSnipped: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      // declare path and write new snippet to the user
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnipped
      );

      // updating the numberOfMembers (1)
      batch.update(doc(firestore, "communities", communityData.id), {
        // numberOfMembers declared in communitiesAtom.ts
        numberOfMembers: increment(1),
      });
      // execute all batch fn. from above
      await batch.commit();

      // update recoil state = communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnipped],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // * Leave Community
  // communityId: is the name of the community
  const leaveCommunity = (communityId: string) => {
    //   batch write
    //   deleting a community snippet from user
    // updating the numberOfMembers (-1)
    // update recoil state = communityState.mySnippets
  };

  return {
    // data and functions
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
