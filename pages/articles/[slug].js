import axios from "axios";
import {contentURL} from "../../config/axios";
import style from "../../styles/Article.module.scss"

export default function Home({postContent: {data}}) {
    const {attributes: {title, content, author, createdAt, motherCountry, fromCountry, toCountry}} = data[0]
    return (
        <div className={style.article}>
            <div className={style.article__box}>
                <p className={style.article__box__country}>
                    {(motherCountry) ? `Kraj: ${motherCountry}`
                        : ((fromCountry && toCountry) ? `${fromCountry} -> ${toCountry}`
                                : ""
                        )}
                </p>
                <span>
                    <p>Autor: {author}</p>
                    <p>{createdAt.slice(0, 10).replaceAll("-", ".")}</p>
                </span>
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
        </div>
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