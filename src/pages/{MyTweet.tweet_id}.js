import * as React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

const MyTweetPage = ({ data }) => {
  return (
    <main className="container mx-auto my-8 px-4">
      <Helmet>
        <title>Home Page | {data.site.siteMetadata.title}</title>
      </Helmet>
      <h1 className="text-3xl leading-normal mb-4">
        {data.site.siteMetadata.title}
      </h1>
      <p>{data.myTweet.tweet_text}</p>
    </main>
  );
};

export const query = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    myTweet(id: { eq: $id }) {
      tweet_text
      tweet_id
    }
  }
`;

export default MyTweetPage;
