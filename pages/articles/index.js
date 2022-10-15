import {contentURL} from "../../config/axios";
import axios from "axios"
import Link from "next/link";
import Searcher from "../../components/Searcher";
import Article from "../../components/Article";
import style from "../../styles/Home.module.scss";

export default function Home({blogPosts}) {
    return (
        <div className={style.articles}>
            <div className={style.articles__searcher}>
                <Searcher />
            </div>
            <div className={style.articles__container}>
                {(blogPosts.data.length > 0) ? blogPosts.data.map(({attributes}, key) => {
                    return (
                        <Article key={key} attributes={attributes}/>
                    )
                }) : (
                    <div>
                        Cisza, zzz nic niema
                    </div>
                )}
            </div>
        </div>
    )
}

Home.getInitialProps = async ({ query }) => {
    const {from, to, local} = query

    let url = `${contentURL}/api/posts?`;

    let params = [];

    if (from) params.push(`filters[fromCountry][$eq]=${from}`)
    if (to) params.push(`filters[toCountry][$eq]=${to}`)
    if (local) params.push(`filters[motherCountry][$eq]=${local}`)

    params.map(item => {
        url += item + "&"
    })

    const {data} = await (query) ? await axios.get(url) : await axios.get(`${contentURL}/api/posts?populate=*&locale=all`)

    return {
        blogPosts: data,
        revalidate: 30
    }
}
