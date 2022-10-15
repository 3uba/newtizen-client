import style from "../styles/components/Searcher.module.scss";
import {createRef, useEffect, useState} from "react";
import axios from "axios";
import {contentURL} from "../config/axios";

export default function Searcher() {
    const [location, setLocation] = useState(0)
    const [countries, setCountries] = useState()
    const input1 = createRef()
    const input2 = createRef()
    const input3 = createRef()
    const [firstCountry, setFirstCountry] = useState('')
    const [secondCountry, setSecondCountry] = useState('')
    const [motherCountry, setMotherCountry] = useState('')

    useEffect( () => {
        async function fetchData() {
            const {data: {data: {attributes: {countries}}}} = await axios.get(`${contentURL}/api/home`)
            setCountries(countries)
        }
        fetchData()
    }, [])

    return (
        <div className={style.searcher}>
            <div className={style.searcher__content}>
                <div className={style.searcher__content__box__row}>
                    <div className={style.searcher__content__radios}>
                        <label className={style.searcher__content__label}>
                            <input onClick={() => setLocation(1)} name="location" type={"radio"} value={"Za granicą"}/> Za granica
                        </label>
                        <label className={style.searcher__content__label}>
                            <input onClick={() => setLocation(2)} name="location" type={"radio"} value={"W kraju"}/> W kraju
                        </label>
                    </div>
                    {(location === 1) ? (
                        <div className={style.searcher__content__box}>
                            <div>
                                <p className={style.searcher__content__p}>Skąd jesteś</p>
                                <select ref={input1} onChange={(e) => setFirstCountry(e.target.value)}>
                                    <option selected={true} disabled={true} hidden={true}>---</option>
                                    {countries.map(({name, icon}) => (
                                        <option value={name.toLowerCase()} key={name}>
                                            {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <p className={style.searcher__content__p}>Dokąd jedziesz</p>
                                <select ref={input2} onChange={(e) => setSecondCountry(e.target.value)}>
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
                        <div className={style.searcher__content__box}>
                            <div>
                                <p className={style.searcher__content__p}>Skąd jesteś </p>

                                <select ref={input3} onChange={(e) => setMotherCountry(e.target.value)}>
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
                </div>

                <div>
                    <p className={style.searcher__content__p}>Wybierz interesujące cie katerogie</p>
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
