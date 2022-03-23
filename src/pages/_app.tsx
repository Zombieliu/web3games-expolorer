import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import "../css/font-awesome.css"
import { appWithTranslation } from 'next-i18next';
import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { useGraphQLClient } from '../graphql/graphql-client'


function MyApp({ Component, pageProps }: AppProps) {
    const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState)
  return (
      <ClientContext.Provider value={graphQLClient}>
          <Component {...pageProps} />
      </ClientContext.Provider>
  )
}

// export default MyApp
export default appWithTranslation(MyApp);
