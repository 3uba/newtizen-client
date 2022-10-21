import {createRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import style from "../../styles/pages/Creator.module.scss"
import dynamic from "next/dynamic";

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

export default function Creator() {
    const [article, setArticle] = useState('')

    const mailRef = createRef();
    const nameRef = createRef();
    const categoryRef = createRef();
    const titleRef = createRef();

    return (
        <div className={style.creator}>
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
            <span className={style.creator__span}>
                <label>
                    Tytuł artykułu
                </label>
                <input type={"text"} ref={nameRef} placeholder={"Nowe zasady związane z ..."} />
            </span>
            <span className={style.creator__span}>
                <div>
                    <label>
                        Treść artykułu
                    </label>
                    <span>
                        <select>
                            <option disabled={true} selected={true} hidden>
                                Wybierz kategorie
                            </option>
                        </select>
                    </span>
                </div>
            </span>
            <ReactQuill theme={"snow"} modules={modules} formats={formats} value={article} onChange={setArticle}  />
            <button>Stwórz artykuł</button>
        </div>
    )
}