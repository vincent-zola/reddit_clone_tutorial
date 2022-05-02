// * ========== Imports ==========

import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React from "react";
import { Community } from "../../../atoms/communitiesAtom";
import { firestore } from "../../../firebase/clientApp";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import Header from "../../../components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts/Posts";

// * ========== TS Types ==========

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  // * ========== HTML ==========
  if (!communityData) {
    return <NotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />

      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <div>RHS</div>
        </>
      </PageContent>
    </>
  );
};

// * ========== ServerSide Rendering ==========
// naming is important, next.js will know by the use of the word getServerSideProps to render it on the server
// context parameter is an object containing keys like query, params, req, res...
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // get community data and pass it to client
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      // query: is the URL part, which represents [communityId]
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        // .exists() firebase fn. check if community exists
        communityData: communityDoc.exists()
          ? JSON.parse(
              // .data() helps us extract the data form the firestore obj.
              // JSON.stringify() helps us to convert the Timestamp inside the firestore obj.
              // .id: firebase fn. which grabs the name of the document, in our case community name
              JSON.stringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    //   Could add error page here
    console.log("getServerSideProps error", error);
  }
}

export default CommunityPage;
