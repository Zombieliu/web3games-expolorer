import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import "../css/font-awesome.css"
import { appWithTranslation } from 'next-i18next';



function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />

}

// export default MyApp
export default appWithTranslation(MyApp);
