import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import "../css/font-awesome.css"
import store from '../app/store';
import { appWithTranslation } from 'next-i18next';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import memCache from "graphql-hooks-memcache"
import {createClient} from "graphql-ws"


const client = new GraphQLClient({
    // url: 'https://api.subquery.network/sq/Zombieliu/devnet-webe3games',
    url: 'https://api.subquery.network/sq/Zombieliu/web3games-dev-net',
    // cache:memCache(),
    // subscriptionClient:()=>
    //   createClient({
    //       url:"ws://localhost:3000/"
    //   })
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
