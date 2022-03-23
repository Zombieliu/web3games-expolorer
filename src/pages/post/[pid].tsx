import {useManualQuery } from 'graphql-hooks'
import {initializeGraphQL} from "../../graphql/graphql-client";
import graphQLRequest from "../../graphql/graphql-request";



const Extrinsics_Info = `
 query HomePage($Extrinsics: String) {
  eventInfos(filter:{
    extrinsicHashId:{
      equalTo:$Extrinsics
    }
  }){
    nodes{
      id
      eventID
      method
      section
      meta
      data
      extrinsicHash{
        id
        signerId
        meta
      }
    }
  }
}
`



function Post({ post }) {
    console.log(post)
    // const FetchExtrinsicInfo = async (Extrinsics:string) => {
    //     const ExtrinsicInfo = await FetchExtrinsics({
    //         variables: { Extrinsics }
    //     })
    //     return ExtrinsicInfo
    // }
    //
    // console.log(post)
    // const [FetchExtrinsics] = useManualQuery(Extrinsics_Info)
    return(
        <div>
            1
        </div>
    )
}


export const allPostsQueryOptions = (params) => ({
    variables: { Extrinsics:params },
})


// This function gets called at build time
export async function getStaticPaths(data) {
    console.log(data)
    const posts = [
        {
            id:"1"
        },
        {
            id:"2"
        }
    ]

    // Get the paths we want to pre-render based on posts
    const paths = posts.map((post) => ({
        params: { pid: post.id },
    }))

    return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    // const client = initializeGraphQL()
    // await graphQLRequest(client, Extrinsics_Info, allPostsQueryOptions(params))


    const post = {
        id:1
    }

    // Pass post data to the page via props
    return { props: { post } }

    // return {
    //     props: {
    //         initialGraphQLState: client.cache.getInitialState(),
    //     },
    //     revalidate: 1,
    // }
}

export default Post