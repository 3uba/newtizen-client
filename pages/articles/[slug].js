import axios from "axios";
import {contentURL} from "../../config/axios";
import style from "../../styles/pages/Article.module.scss"
import Post from "../../components/Post";
import {capitalizeFirstLetter} from "../../utils";

export default function Home({postContent: {data}}) {
    const {attributes: {title, content, author, createdAt, motherCountry, fromCountry, toCountry, posts}} = data[0]
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

            <div className={style.article__recommendations}>
                <span className={style.article__recommendations__title}>
                    Rekomendowane posty
                </span>
                <div>
                    {(posts.data.length > 0) ? posts.data.map(({attributes}, key) => {
                        return (
                            <Post key={key} attributes={attributes}/>
                        )
                    }) : (
                        <div>
                            Brak rekomendowanych postów
                        </div>
                    )}
                </div>
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
    const {data} = await axios.get(`${contentURL}/api/posts?filters[slug][$eq]=${slug}&populate=*`);

    return {
        props: { postContent: data },
        revalidate: 30,
    }
}