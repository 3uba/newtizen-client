import {contentURL} from "../../config/axios";
import axios from "axios"
import Link from "next/link";
import Searcher from "../../components/Searcher";
import Post from "../../components/Post";
import style from "../../styles/pages/Home.module.scss";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import fetch from "isomorphic-fetch";


export default function Home({blogPosts, filters}) {
    const router = useRouter()
    const {filtersVerified} = filters

    const [firstCountry, setFirstCountry] = useState('')
    const [secondCountry, setSecondCountry] = useState('')
    const [motherCountry, setMotherCountry] = useState('')
    const [verified, setVerified] = useState(filtersVerified ?? true)
    const [traffic, setTraffic] = useState(false)
    const [laws, setLaws] = useState(false)
    const [taxes, setTaxes] = useState(false)
    const [penalty, setPenalty] = useState(false)
    const [posts, setPosts] = useState(blogPosts)

    function Search() {
        let params = {};

        if (firstCountry && secondCountry)
            if (firstCountry !== secondCountry) {
                params = {
                    ...params,
                    from: firstCountry,
                    to: secondCountry
                }
            } else {
                params = {
                    ...params,
                    local: firstCountry
                }
            }

        if (motherCountry) params = {...params, local: motherCountry }

        let category = []

        if (traffic) category.push("ruch_drogowy")
        if (laws) category.push("prawo")
        if (taxes) category.push("podatki")
        if (penalty) category.push("karalnosc")

        if (verified) params = {...params, verified: 'true'}
        params = {...params, cat: category}

        router.push({
            pathname: '/articles',
            query: params
        }, '', {shallow: false}).then(() => {
            router.reload()
        })
    }

    return (
        <div className={style.articles}>
            <div className={style.articles__searcher}>
                <Searcher
                    setFirstCountry={setFirstCountry}
                    setSecondCountry={setSecondCountry}
                    setMotherCountry={setMotherCountry}
                    setVerified={setVerified}
                    verified={verified}
                    traffic={traffic}
                    laws={laws}
                    taxes={taxes}
                    penalty={penalty}
                    setTraffic={setTraffic}
                    setLaws={setLaws}
                    setTaxes={setTaxes}
                    setPenalty={setPenalty}
                    search={Search}
                />
            </div>
            <div className={style.articles__container}>
                {(posts.data.length > 0) ? posts.data.map(({attributes}, key) => {
                    return (
                        <Post key={key} attributes={attributes}/>
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
    const {from, to, local, verified, cat} = query

    let url = `https://newtizen-server.herokuapp.com/api/posts?`;

    let params = [];

    if (from) params.push(`filters[fromCountry][$eq]=${from}`)
    if (to) params.push(`filters[toCountry][$eq]=${to}`)
    if (local) params.push(`filters[motherCountry][$eq]=${local}`)
    if (verified) params.push(`filters[verified][$eq]=true`)

    if(typeof cat === "object")
        cat.map(item => {
            params.push(`filters[category][$eq]=${item}`)
        })

    if(typeof cat === "string")
        params.push(`filters[category][$eq]=${cat}`)

    params.map(item => {
        url += item + "&"
    })

    const {data} = await (query) ? await axios.get(url) : await axios.get(`${contentURL}/api/posts?populate=*&locale=all`)
    return {
        blogPosts: data,
        filters: {from: from, to: to,local: local, verified: verified},
        revalidate: 30
    }
}
