import style from "../styles/components/Post.module.scss"
import Link from "next/link";

import {MdVerified} from 'react-icons/md'

export default function Post({attributes : {title, content, slug, category, verified, createdAt}}) {
    let finalContent = (content) ? content.substring(0, 200) : ""
    finalContent = (finalContent) ? finalContent.substring(0, Math.min(finalContent.length, finalContent.lastIndexOf(" "))) : ""

    return (
        <div className={style.article}>
            <div className={style.article__border}>
                <div className={style.article__category}>
                    <span className={style.article__category__text}>{category}</span>
                    {(verified) ? (
                            <MdVerified style={{ color: "#457B9D" }} color="#457B9D" />
                        ) : ""}
                </div>
                <div className={style.article__content}>
                    <h1 className={style.article__title}>{title}</h1>
                    <p className={style.article__shortContent}>{finalContent}...</p>
                    <Link passHref href={`/articles/${slug}`}>
                        <a className={style.article__readmore}>Czytaj dalej</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}