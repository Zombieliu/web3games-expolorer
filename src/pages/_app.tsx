import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import "../css/font-awesome.css"
import store from '../app/store';
import { appWithTranslation } from 'next-i18next';
import { GraphQLClient, ClientContext } from 'graphql-hooks'


const client = new GraphQLClient({
    url: 'http://47.242.8.196:3000',
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ClientContext.Provider value={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ClientContext.Provider>
  )
}

// export default MyApp
export default appWithTranslation(MyApp);
