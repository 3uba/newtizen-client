import {contentURL} from "../../config/axios";
import axios from "axios"
import Link from "next/link";

export default function Home({blogPosts}) {
    console.log(blogPosts.data)

    return (
        <>
            <p>hhh </p>
            {blogPosts.data.map(({attributes : {title, slug}}) => {
                return (
                    <Link passHref href={`/blog/${slug}`}>
                        <p>{title}</p>
                    </Link>
                )
            })}
        </>
    )
}

export const getStaticProps = async () => {
    const {data} = await axios.get(`${contentURL}/api/posts?populate=*&locale=all`)

    return {
        props: {
            blogPosts: data,
        },
        revalidate: 30
    }
}