import * as React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";

const IndexPage = ({ data }) => {
  return (
    <main className="container mx-auto my-8 px-4">
      <Helmet>
        <title>Home Page | {data.site.siteMetadata.title}</title>
      </Helmet>
      <h1 className="text-3xl leading-normal mb-4">
        {data.site.siteMetadata.title}
      </h1>
      <ul>
        {data.allMyTweet.nodes.map((tweet) => (
          <Link key={tweet.tweet_id} to={tweet.tweet_id}>
            <li className="mb-2">{tweet.tweet_text}</li>
          </Link>
        ))}
      </ul>
    </main>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMyTweet {
      nodes {
        tweet_id
        tweet_text
      }
    }
  }
`;

export default IndexPage;
