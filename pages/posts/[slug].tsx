import ErrorPage from "next/error";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../../components/Layout/Container";
import { PostContentContainer } from "../../components/Layout/PostContentContainer";
import { PostContent } from "../../components/Post/PostContent";
import { PostTitle } from "../../components/Post/PostTitle";
import { CoverImage } from "../../components/Shared/CoverImage";
import { DateText } from "../../components/Shared/DateText";
import { HomeButton } from "../../components/Shared/HomeButton";
import { InfoBar } from "../../components/Shared/InfoBar";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { markdownToHtml } from "../../lib/markdownToHtml";

export type PostProps = {
  slug: string;
  title: string;
  excerpt: string;
  timestamp: number;
  coverImage: string;
  ogImage: {
    url: string;
  };
  content: string;
};

interface Props {
  post: PostProps;
}

const Post: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) return <ErrorPage statusCode={404} />;

  return (
    <>
      <InfoBar>
        <span>The source code for this blog is available on </span>
        <Link
          href={`https://github.com/wsenh/me/tree/main/public/static/posts/${post.slug}`}
          passHref
        >
          <a
            aria-label="source code"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Github
          </a>
        </Link>
        .
      </InfoBar>
      <Container>
        <HomeButton />
        {router.isFallback ? (
          <>loading...</>
        ) : (
          <>
            <article className="my-12">
              <Head>
                <title>{post.title}</title>
                <meta property="og:image" content={post.ogImage.url} />
                <link href="/static/hightlights/prism.css" rel="stylesheet" />
              </Head>
              <PostTitle content={post.title} />
              <CoverImage src={post.coverImage} free />
              <div className="my-6">
                <PostContentContainer>
                  <DateText unixtimestamp={post.timestamp} />
                  <PostContent content={post.content} />
                </PostContentContainer>
              </div>
            </article>
          </>
        )}
      </Container>
    </>
  );
};

interface Params {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: getAllPosts().map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export default Post;
