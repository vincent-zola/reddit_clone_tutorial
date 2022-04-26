// * ========== Imports ==========

import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// * ========== TS Types ==========

export interface Community {
  id: string;
  creatorId: string;
  numberOfMember: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

// interface representing the sniped in our firestore db
interface CommunitySnippet {
  communityId: string;
  // optional because will be there if we created the community ourselves
  isModerator?: boolean;
  imageURL?: string;
}

// interface representing an array of CommunitySnippets from firestore db
interface CommunityState {
  mySnippets: CommunitySnippet[];
  // visitedCommunities
}

// * ========== Atoms ==========

// An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom:

const defaultCommunityState: CommunityState = {
  // empty array of communitySnippets
  mySnippets: []
}




export const communityState = atom<CommunityState>({
  key: 'communitiesState',
  default: defaultCommunityState,
})
