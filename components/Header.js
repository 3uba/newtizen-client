import style from "../styles/components/Header.module.scss"
import Link from "next/link"

export default function Header() {
    return (
        <div className={style.header}>
            <Link passHref href={"/"}>
                <span className={style.header__label}>
                    newtizen
                </span>
            </Link>
            <Link passHref href={"/creator"}>
                <span className={style.header__button}>
                    Stwórz artykół!
                </span>
            </Link>
        </div>
    )
}