import React, { Fragment } from "react";
import MainFeaturedPost from "./MainFeaturedPost";
import { Grid } from "@material-ui/core";
import FeaturedPost from "./FeaturedPost";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…"
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 13",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  },
  {
    title: "Post title",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  },
  {
    title: "Another Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text"
  }
];

const Landing: React.FC = () => {
  return (
    <Fragment>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container direction="row" spacing={2} justify="center">
        {featuredPosts.map(post => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
    </Fragment>
  );
};

export default Landing;
