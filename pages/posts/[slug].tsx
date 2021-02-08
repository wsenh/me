import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import { markdownToHtml } from "../../lib/markdownToHtml";

export type PostProps = {
  slug: string;
  title: string;
  date: string;
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
    <div>
      {router.isFallback ? (
        <>loading...</>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
              {/* <meta property="og:image" content={post.ogImage.url} /> */}
            </Head>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </>
      )}
    </div>
  );
};

interface Params {
  params: {
    slug: string;
  };
}

export const getStaticProps = async ({ params }: Params) => {
  const post = getPostBySlug(params.slug, ["title", "slug", "content"]);
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
    paths: getAllPosts(["slug"]).map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
};

export default Post;
