import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import "../css/font-awesome.css"
import { appWithTranslation } from 'next-i18next';
import { GraphQLClient, ClientContext } from 'graphql-hooks'


const client = new GraphQLClient({
    url: 'http://localhost:3000',
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ClientContext.Provider value={client}>
          <Component {...pageProps} />
      </ClientContext.Provider>
  )
}

// export default MyApp
export default appWithTranslation(MyApp);
