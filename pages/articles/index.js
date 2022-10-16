import {contentURL} from "../../config/axios";
import axios from "axios"
import Link from "next/link";
import Searcher from "../../components/Searcher";
import Post from "../../components/Post";
import style from "../../styles/Home.module.scss";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Home({blogPosts, filters}) {
    const router = useRouter()

    const [firstCountry, setFirstCountry] = useState('')
    const [secondCountry, setSecondCountry] = useState('')
    const [motherCountry, setMotherCountry] = useState('')
    const [verified, setVerified] = useState(false)
    const [traffic, setTraffic] = useState(false)
    const [laws, setLaws] = useState(false)
    const [taxes, setTaxes] = useState(false)
    const [penality, setPenality] = useState(false)
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

        if (traffic) category.push("traffic")
        if (laws) category.push("laws")
        if (taxes) category.push("taxes")
        if (penality) category.push("penality")

        if (verified) params = {...params, verif: true}
        params = {...params, cat: category}

        router.push({
            pathname: '/articles',
            query: params
        }, '', {shallow: false}).then(() => {
            console.log('success')
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
                    penality={penality}
                    setTraffic={setTraffic}
                    setLaws={setLaws}
                    setTaxes={setTaxes}
                    setPenality={setPenality}
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
    const {from, to, local, verif, cat} = query

    let url = `${contentURL}/api/posts?`;

    let params = [];

    if (from) params.push(`filters[fromCountry][$eq]=${from}`)
    if (to) params.push(`filters[toCountry][$eq]=${to}`)
    if (local) params.push(`filters[motherCountry][$eq]=${local}`)
    if (verif) params.push(`filters[verified][$eq]=${verif}`)

    let caterogies;

    console.log(typeof cat)

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
        filters: {from: from, to: to,local: local},
        revalidate: 30
    }
}
