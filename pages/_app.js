import '../styles/globals.scss';
import Footer from "../components/Footer";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </>
  )
}

export default MyApp
