// import type { NextPage } from 'next';
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import Head from 'next/head';
// import Home from "./home";
// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
//
// const IndexPage: NextPage = () => {
//     const router = useRouter()
//     const { t } = useTranslation('footer')
//     return (
//         <div>
//             <Head>
//                 <title>Web3Games</title>
//         <link rel="icon" href="/favicon.ico" />
//         </Head>
//         <Home></Home>
//         </div>
// )
// }
//
// export default IndexPage
//
// export const getStaticProps = async ({ locale }) => ({
//     props: {
//         ...await serverSideTranslations(locale, ['common', 'footer']),
//     },
// })

const Wait = () =>{
    return (
        <div></div>
    )
}


export default Wait