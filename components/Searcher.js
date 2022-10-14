import style from "../styles/Searcher.module.scss";
import {useState} from "react";
import axios from "axios";
import {contentURL} from "../config/axios";

export default function Searcher({home}) {
    const [location, setLocation] = useState(0)
    const {countries} = home;

    return (
        <div className={style.searcher}>
            <div className={style.searcher__content}>
                <div className={style.searcher__content__box__row}>
                    <label className={style.searcher__content__label}>
                        <input onClick={() => setLocation(1)} name="location" type={"radio"} value={"Za granicą"}/> Za granica
                    </label>
                    <label className={style.searcher__content__label}>
                        <input onClick={() => setLocation(2)} name="location" type={"radio"} value={"W kraju"}/> W kraju
                    </label>
                {(location === 1) ? (
                    <div className={style.searcher__content__box__column}>
                        <p className={style.searcher__content__p}>Skąd jesteś</p>
                        <select ref={input1} onChange={(e) => setFirstCountry(e.target.value)}>
                            <option selected={true} disabled={true} hidden={true}>---</option>
                            {countries.map(({name, icon}) => (
                                <option value={name.toLowerCase()} key={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <p className={style.searcher__content__p}>Dokąd jedziesz</p>
                        <select ref={input2} onChange={(e) => setFirstCountry(e.target.value)}>
                            <option selected={true} disabled={true} hidden={true}>---</option>
                            {countries.map(({name, icon}) => (
                                <option value={name.toLowerCase()} key={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                ): ""}
                {(location === 2) ? (
                    <div className={style.searcher__content__box__column}>
                        <p className={style.searcher__content__p}>Skąd jesteś </p>

                        <select ref={input3} onChange={(e) => setFirstCountry(e.target.value)}>
                            <option selected={true} disabled={true} hidden={true}>---</option>
                            {countries.map(({name, icon}) => (
                                <option value={name.toLowerCase()} key={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                ): ""}
                </div>

                <div>
                    <p className={style.searcher__content__p}>Wybierz interesujące cie katerogie</p>
                    {/*<span>*Możesz nic nie wybierać wtedy wyświetli sie wszystko</span>*/}
                    <div className={style.searcher__content__box__column}>
                        <span>
                            <input type={"checkbox"} value={""} />
                            <label>
                                &nbsp;Ruch drogowy
                            </label>
                        </span>
                        <span>
                            <input type={"checkbox"} value={""} />
                            <label>
                                &nbsp;Prawa
                            </label>
                        </span>
                        <span>
                            <input type={"checkbox"} value={""} />
                            <label>
                                &nbsp;Podatki
                            </label>
                        </span>
                        <span>
                            <input type={"checkbox"} value={""} />
                            <label>
                                &nbsp;Karalność
                            </label>
                        </span>
                    </div>
                </div>
                <div>
                    <span>
                        <input type={"checkbox"} value={""} />
                        <label>
                            &nbsp;Wyświetlaj tylko zweryfikowane posty
                        </label>
                    </span>

                </div>
            </div>
        </div>
    )
}


export const getStaticProps = async () => {
    const {data: {data: {attributes}}} = await axios.get(`${contentURL}/api/home`)

    return {
        props: {
            home: attributes,
        },
        revalidate: 30
    }
}