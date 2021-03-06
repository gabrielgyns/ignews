import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/client";
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import { formatDateComplete } from "../../../utils";

import styles from '../post.module.scss';

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updateAt: string;
    }
}

const THIRTY_MINUTES = 60 * 30;

export default function PostPreview({ post }: PostPreviewProps) {
    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`);
        }
    }, [session]);

    return (
        <>
            <Head>
                <title> {post.title} | Ignews </title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updateAt}</time>
                    <div
                        className={`${styles.post__content} ${styles.post__previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.post__continueReading}>
                        Wanna continue reading?

                        <Link href="/">
                            <a>Subscribe now 🤗</a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updateAt: formatDateComplete(response.last_publication_date)
    }


    return {
        props: {
            post
        },
        redirect: THIRTY_MINUTES,
    }
}
