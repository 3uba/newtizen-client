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
                    query: {...query, verified: true }
                }).then(r => {})
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
                        local: personCountry,
                        verified: true
                    }
                }).then(r => {})
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
                  Niewa??ne sk??d jeste??, i gdzie jeste??
              </span>
              <div className={style.home__welcome__table}>
                  <span><AiOutlineCheck /> Czytaj artyk????y ludzi na temat prawa</span>
                  <span><AiOutlineCheck /> Zadawaj pytania i komentuj</span>
                  <span><AiOutlineCheck /> Dziel sie wiedz?? i w??asnymi do??wiadczeniami </span>
              </div>
          </div>
          <div className={style.home__searcher}>
              <div className={style.home__searcher__container}>
                  <p className={style.home__searcher__prgf}>
                      Wybierasz sie gdzie???<br />Sprawd?? jakie zasady tam obowi??zuj??
                  </p>
                  <div className={style.home__searcher__box}>
                      <label className={style.home__searcher__label}>
                        <p className={style.home__searcher__quest}>Sk??d jeste???</p>
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
                        <p className={style.home__searcher__quest}>Dok??d sie wybierasz?</p>
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
                  <p className={style.home__searcher__prgf}>Nie jeste?? pewny zasad w swoim kraju? <br/> Sprawd?? r??wnie?? jakie zasady obowi??zuja u ciebie</p>
                  <div className={style.home__searcher__box}>
                      <label className={style.home__searcher__label}>
                          <p className={style.home__searcher__quest}>Wybierz sw??j kraj</p>
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
                  NNewtizen, portal dla wszystkich obywateli, kt??rzy chc??
                  by?? rzetelnie doinformowani na temat praw, jakie nami rz??dz??.<br />
                  Newtizen ma za zadanie w prosty spos??b wskaza?? prawa w kraju,
                  jak r??wnie?? r????nice praw w r????nych krajach tak, aby??my <br/>
                  mieli poj??cie, co mo??emy, czego nie mo??emy robi?? i co
                  robi??/jak sobie radzi?? jak ju?? si?? sta??o.

              </p>

              <h1>Geneza powstania</h1>

              <p>
                  Aplikacja powsta??a z my??l??, zebrania najwa??niejszych i prawdziwych
                  informacji ze ??wiata praw, <br /> nie tylko z Polski ale i z
                  ca??ego ??wiata. <br />
                  W internecie jest pe??no blog??w, portali z newsami kt??re,
                  zach??caj?? przez fajne nag????wki czy obrazki, <br /> ale skupiaj?? si?? na wszystkim,
                  r??wnie?? na informacjach zb??dnych. <br /><br />

                  Artyku??y w internecie mo??emy podzieli?? na 2 rodzaje:
              </p>

              <ol>
                  <li>Tworzone przez prase, wyre??yserowane, przepe??nione wiedz??
                      bez rozwiazania</li>
                  <li>Kt??re tworz?? ludzie, przepe??nione bezwarto??ciowymi informacjami,
                    cz??sto r??wnie?? nieprawdziwymi
                  </li>
              </ol>

              <p>
                  Na szcze??cie, my rozwi??zujemy ten problem, bo tworz?? ten serwis
                  ludzie, <b>ale</b> wszystkie tre??ci s?? weryfikowane przed opublikowaniem. <br/>
              </p>

              <h1>Dlaczego artyk????y tworz?? ludzie?</h1>

              <p>
                  Bo to w??a??nie oni, <u>najprawdopodobniej</u> mieli z tym styczno???? w prawdziwym ??yciu. <br />
                  I to w??a??nie oni mog?? przedstawi?? i pom??c zrozumie??, czasem zawi??e paragrafy z ustaw
              </p>

              <h1>Podsumowuj??c</h1>

              <p>
                  Newtizen, to zbi??r infromacji
              </p>

              <ol>
                  <li>
                    <s>nielosowy atryku??</s>
                  </li>
                  <li>
                      <s>nie historia kolegii</s>
                  </li>
                  <li>
                      <s>ani domys??y wujka</s>
                  </li>
              </ol>

              <p>
                  <b><u>Newtizen to zbi??r zasad, praw i prawdziwych historii <br />
                      Stworzony poto aby?? by?? poinformowany o wszystkim, zawsze i wsz??dzie</u></b>

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