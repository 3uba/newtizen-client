import {createRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import style from "../../styles/pages/Creator.module.scss"
import dynamic from "next/dynamic";
import axios from "axios";
import {contentURL} from "../../config/axios";
import searcherStyles from "../../styles/components/Searcher.module.scss"
import {Router, useRouter} from "next/router";

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

const ReactQuill = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

export default function Creator(props) {
    const [article, setArticle] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const [code, setCode] = useState(null)
    const [sended, setSend] = useState(false)
    const [location, setLocation] = useState(0)
    const [countries, setCountries] = useState(props.countries)
    const country1 = createRef()
    const country2 = createRef()
    const country3 = createRef()
    const mailRef = createRef();
    const nameRef = createRef();
    const categoryRef = createRef();
    const titleRef = createRef();
    const router = useRouter();

    function resetForm() {
        if(confirm("Jesteś pewny, ta akcja spowoduje wyczyszczenie całego formularza")) {
            router.reload()
        }
    }

    async function createArticle () {
        let send = true

        try {
            [mailRef, titleRef, categoryRef, nameRef].forEach(item => {
                if(!item.current.value || item.current.value === "Wybierz kategorie") {
                    item.current.style.border = "1px solid red";
                    send = false
                } else {
                    item.current.style.border = "0px"
                }
            })

            if(!location) throw "Wybierz kraj lub kraje"

            if(location === 1) {
                if(country1.current.value === "---" && country2.current.value === "---") {
                    [country1, country2].forEach(item => item.current.style.border = "1px solid red")
                    send = false
                } else {
                    [country1, country2].forEach(item => item.current.style.border = "0")
                }
            }

            if(location === 2) {
                if(country3.current.value === "---") {
                    country3.current.style.border = "1px solid red";
                    send = false
                } else {
                    country3.current.style.border = "0";
                }
            }

            if(article.length < 50 || article.length > 1000) throw "Artykuł powinien posiadać od 50 do 400 znaków"
            if(!send) throw "Uzupełnij wszystkie pola"

            let data = {
                'email': mailRef.current.value,
                'author': nameRef.current.value,
                'category': categoryRef.current.value,
                'title': titleRef.current.value,
                'code': code ? code : "",
                'slug':  ((titleRef.current.value).toLowerCase().trim()).replaceAll(" ", "_"),
                'content': article,
                'fromCountry': country1.current ? country1.current.value : "",
                'toCountry': country2.current ? country2.current.value : "",
                'motherCountry': country3.current ? country3.current.value : ""
            }

            const res = await axios.post(`${contentURL}/api/posts`, {
                headers: {
                    "Content-Type": "application/json"
                },
                data
            })

            setModal(res.data.verifyEmail)
            setMessage(res.data.message)
            setError(res.data.error)
            setSend(res.data.sended ? res.data.sended : false)
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className={style.creator}>
            <span className={style.creator__info} hidden={(message === '')}
                  style={{"color" : (error) ? "#E63946":"#256700",  "background": (error) ? "#E6394611" : "#18e51811"}}>
                {message}
            </span>
            {modal ?
                (
                    <div className={style.creator__modal}>
                        <div>
                            <span>
                                <label>Sprawdź skrzynkę mailową, został wysłany kod weryfikacyjny</label>
                                <input type={"number"} onChange={e => setCode(e.currentTarget.value)} value={code} placeholder={'Podaj kod'}/>
                            </span>
                            <button onClick={createArticle}>Zweryfikuj maila</button>
                            <button className={style.creator__warnBtn} onClick={resetForm}>Anuluj</button>
                        </div>
                    </div>
                ) : ""
            }
            {(!sended) ? (
                <>
                    <span className={style.creator__codeInfo}>
                        Na czas konkursu, funkcja wysyłania maili jest wyłączona, kod weryfikacyjny to `1234`
                    </span>
                    <span className={style.creator__title}>
                        Kreator artykółów
                    </span>
                    <span className={style.creator__span}>
                        <label>
                            Podaj swojego maila
                        </label>
                        <input type={"text"} ref={mailRef} placeholder={"example@mail.com"} />
                    </span>
                    <span className={style.creator__span}>
                        <label>
                            Podaj swoje imię
                        </label>
                        <input type={"text"} ref={nameRef} placeholder={"Gall Anonim"} />
                    </span>
                    <div className={searcherStyles.searcher__content__radios}>
                        <label className={style.creator__selectText}>
                            <input onClick={() => setLocation(1)} name="location" type={"radio"} value={"Za granicą"}/> Za granica
                        </label>
                        <label className={style.creator__selectText}>
                            <input onClick={() => setLocation(2)} name="location" type={"radio"} value={"W kraju"}/> W kraju
                        </label>
                    </div>
                    {(location === 1) ? (
                        <div className={searcherStyles.searcher__content__box}>
                            <div className={style.creator__div}>
                                <label className={style.creator__selectText}>Wybierz kraj</label>
                                <select ref={country1}>
                                    <option selected={true} disabled={true} hidden={true}>---</option>
                                    {countries.map(({name, icon}) => (
                                        <option value={name.toLowerCase()} key={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={style.creator__div}>
                                <label className={style.creator__selectText}>Wybierz kraj</label>
                                <select ref={country2}>
                                    <option selected={true} disabled={true} hidden={true}>---</option>
                                    {countries.map(({name, icon}) => (
                                        <option value={name.toLowerCase()} key={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ): ""}
                    {(location === 2) ? (
                        <div className={searcherStyles.searcher__content__box}>
                            <div className={style.creator__div}>
                                <label className={style.creator__selectText}>Wybierz kraj</label>
                                <select ref={country3}>
                                    <option selected={true} disabled={true} hidden={true}>---</option>
                                    {countries.map(({name, icon}) => (
                                        <option value={name.toLowerCase()} key={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    ): ""}
                    <span className={style.creator__span}>
                        <label>
                            Tytuł artykułu
                        </label>
                        <input type={"text"} ref={titleRef} placeholder={"Nowe zasady związane z ..."} />
                    </span>
                    <span className={style.creator__span}>
                        <div>
                            <label>
                                Treść artykułu
                            </label>
                            <span>
                                <select ref={categoryRef}>
                                    <option disabled={true} selected={true} hidden>
                                        Wybierz kategorie
                                    </option>
                                    <option value={"ruch_drogowy"}>
                                        Ruch drogowy
                                    </option>
                                    <option value={"prawo"}>
                                        Prawo
                                    </option>
                                    <option value={"podatki"}>
                                        Podatki
                                    </option>
                                    <option value={"karalnosc"}>
                                        Karalość
                                    </option>
                                </select>
                            </span>
                        </div>
                    </span>
                    <ReactQuill className={style.creator__textField} theme={"snow"} modules={modules} formats={formats} value={article} onChange={setArticle}  />
                    <button onClick={createArticle}>Stwórz artykuł</button>
                    <button className={style.creator__warnBtn} onClick={resetForm}>Anuluj</button>
                </>
            ) : ""}
        </div>
    )
}

export const getStaticProps = async () => {
    const {data: {data: {attributes}}} = await axios.get(`https://newtizen-server.herokuapp.com/api/home`)

    return {
        props: {
            countries: attributes.countries,
        },
        revalidate: 30
    }
}
