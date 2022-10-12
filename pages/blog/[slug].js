import axios from "axios";
import {contentURL} from "../../config/axios";

export default function Page({postContent: {data}}) {
    console.log(data)

    return (
        <h1 className="text-3xl font-bold ">
            {data.map(({attributes: {title, content}}) => (
                <>
                    <p>{title}</p>
                    <p>{content}</p>
                </>
            ))}
        </h1>
    )
}

export async function getStaticPaths() {
    const {data} = await axios.get(`${contentURL}/api/posts?populate=*&locale=all`)

    const paths = data.data.map((item) => {
        return {
            params: {slug: item.attributes.slug, key: item.attributes.slug}
        }
    })

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const {slug} = context.params
    const {data} = await axios.get(`${contentURL}/api/posts?filters[slug][$eq]=${slug}&populate=deep`);

    return {
        props: { postContent: data },
        revalidate: 30,
    }
}