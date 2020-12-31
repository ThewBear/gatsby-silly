const fetch = require("node-fetch");

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  let finished = false;
  let next_token = null;
  const tweets = [];

  while (!finished) {
    const response = await fetch(
      `https://api.twitter.com/2/users/411965376/tweets?max_results=100${
        next_token ? "&pagination_token=" + next_token : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TWITTER}`,
        },
      }
    ).then((res) => res.json());

    tweets.push(...response.data);

    if (response.meta.next_token) {
      next_token = response.meta.next_token;
    } else {
      finished = true;
    }
  }

  const promises = [];

  tweets.forEach((tweet) => {
    promises.push(
      createNode({
        id: createNodeId(`my-tweet-${tweet.id}`),
        tweet_id: tweet.id,
        tweet_text: tweet.text,
        parent: null,
        internal: {
          type: `MyTweet`,
          contentDigest: createContentDigest(JSON.stringify(tweet)),
        },
      })
    );
  });

  return Promise.all(promises);
};
