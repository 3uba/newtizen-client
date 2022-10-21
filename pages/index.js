import {createRef, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import axios from "axios";
import {AiOutlineCheck} from "react-icons/ai"
import style from "../styles/pages/Leading.module.scss";
import {contentURL} from "../config/axios";

export default function Home({home}) {
    const router = useRouter();
    const input1 = createRef();
    const input2 = createRef();
    const input3 = createRef();
    const {greetings, countries, description} = home
    const [firstCountry, setFirstCountry] = useState('');
    const [secondCountry, setSecondCountry] = useState('');
    const [personCountry, setPersonCountry] = useState('');

    function Search (e, btn) {
        e.preventDefault()

        if (btn === 1) {
            if (firstCountry !== '' && secondCountry !== '') {
                let query = (firstCountry === secondCountry) ?
                    {
                        local: firstCountry
                    } : {
                        from: firstCountry,
                        to: secondCountry
                    }
                router.push({
                    pathname: `/articles`,
                    query: query
                }).then(r => (console.log(r)))
            } else {
                input1.current.style.color = "red"
                input2.current.style.color = "red"
            }
        }
        if (btn === 2) {
            if (personCountry !== '') {
                router.push({
                    pathname: `/articles`,
                    query: {
                        local: personCountry
                    }
                }).then(r => (console.log(r)))
            } else {
                input3.current.style.color = "red"
            }
        }
    }

  return (
      <div className={style.home}>
          <div className={style.home__welcome}>
              <span className={style.home__welcome__span}>
                  Sprawdzaj wszystkie prawa, w jednym miejscu <br />
                  Nieważne skąd jesteś, i gdzie jesteś
              </span>
              <div className={style.home__welcome__table}>
                  <span><AiOutlineCheck /> Czytaj artykóły ludzi na temat prawa</span>
                  <span><AiOutlineCheck /> Zadawaj pytania i komentuj</span>
                  <span><AiOutlineCheck /> Dziel sie wiedzą i własnymi doświadczeniami </span>
              </div>
          </div>
          <div className={style.home__searcher}>
              <div className={style.home__searcher__container}>
                  <p className={style.home__searcher__prgf}>
                      Wybierasz sie gdzieś?<br />Sprawdź jakie zasady tam obowiązują
                  </p>
                  <div className={style.home__searcher__box}>
                      <label className={style.home__searcher__label}>
                        <p className={style.home__searcher__quest}>Skąd jesteś?</p>
                        <select ref={input1} onChange={(e) => setFirstCountry(e.target.value)}>
                            <option selected={true} disabled={true} hidden={true}>---</option>
                            {countries.map(({name, icon}) => (
                                <option value={name.toLowerCase()} key={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                      </label>
                      <label className={style.home__searcher__label}>
                        <p className={style.home__searcher__quest}>Dokąd sie wybierasz?</p>
                        <select ref={input2} onChange={(e) => setSecondCountry(e.target.value)}>
                            <option selected={true} disabled={true} hidden={true}>---</option>
                            {countries.map(({name, icon}) => (
                                <option value={name.toLowerCase()} key={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                      </label>
                  </div>
                  <button className={style.home__searcher__btn} onClick={(e) => Search(e, 1)}>
                      <span>
                        Szukaj
                      </span>
                  </button>
              </div>
              <div className={style.home__searcher__container}>
                  <p className={style.home__searcher__prgf}>Nie jesteś pewny zasad w swoim kraju? <br/> Sprawdź również jakie zasady obowiązuja u ciebie</p>
                  <div className={style.home__searcher__box}>
                      <label className={style.home__searcher__label}>
                          <p className={style.home__searcher__quest}>Wybierz swój kraj</p>
                          <select ref={input3} onChange={(e) => setPersonCountry(e.target.value)}>
                              <option selected={true} disabled={true} hidden={true}>---</option>
                              {countries.map(({name, icon}) => (
                                  <option value={name.toLowerCase()} key={name}>
                                      {name}
                                  </option>
                              ))}
                          </select>
                      </label>
                  </div>
                  <button className={style.home__searcher__btn} onClick={(e) => Search(e, 2)}>
                      <span>
                        Szukaj
                      </span>
                  </button>
              </div>
          </div>
          <div className={style.home__desc}>
              <h1>Czym jest newtizen?</h1>

              <p>
                  Newtizen, portal dla wszystkich obywateli, którzy chcą
                  być rzetelnie doinformowani na temat praw jakie nami rządzą.<br />
                  Newtizen ma za zadanie w prosty sposób wskazać prawa w kraju,
                  jak również różnice praw w różnych krajach tak abyśmy <br/>
                  mieli pojęcie co możemy, czego nie możemy robić i co
                  robić/jak sobie radzić jak już się stało.
              </p>

              <h1>Geneza powstania</h1>

              <p>
                  Aplikacja powstała z myślą, zebrania najważniejszych i prawdziwych
                  informacji ze świata praw, <br /> nie tylko z Polski ale i z
                  całego świata. <br />
                  W internecie jest pełno blogów, portali z newsami które,
                  zachęcają przez fajne nagłówki czy obrazki, <br /> ale skupiają się na wszystkim,
                  również na informacjach zbędnych. <br /><br />

                  Artykuły w internecie możemy podzielić na 2 rodzaje:
              </p>

              <ol>
                  <li>Tworzone przez prase, wyreżyserowane, przepełnione wiedzą
                      bez rozwiazania</li>
                  <li>Które tworzą ludzie, przepełnione bezwartościowymi informacjami,
                    często również nieprawdziwymi
                  </li>
              </ol>

              <p>
                  Na szczeście, my rozwiązujemy ten problem, bo tworzą ten serwis
                  ludzie, <b>ale</b> wszystkie treści są weryfikowane przed opublikowaniem. <br/>
              </p>

              <h1>Dlaczego artykóły tworzą ludzie?</h1>

              <p>
                  Bo to właśnie oni, <u>najprawdopodobniej</u> mieli z tym styczność w prawdziwym życiu. <br />
                  I to właśnie oni mogą przedstawić i pomóc zrozumieć, czasem zawiłe paragrafy z ustaw
              </p>

              <h1>Podsumowując</h1>

              <p>
                  Newtizen, to zbiór infromacji
              </p>

              <ol>
                  <li>
                    <s>nie losowy atrykuł</s>
                  </li>
                  <li>
                      <s>nie historia kolegii</s>
                  </li>
                  <li>
                      <s>ani domysły wujka</s>
                  </li>
              </ol>

              <p>
                  <b><u>Newtizen to zbiór zasad, praw i prawdziwych historii <br />
                      Stworzony poto abyś był poinformowany o wszystkim, zawsze i wszędzie</u></b>

              </p>
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