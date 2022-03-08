import Link from 'next/link'
import { useManualQuery } from 'graphql-hooks'
import {useEffect} from "react";
import {useRouter} from "next/router";


const Block_Info = `
 query HomePage($Block: String) {
  blockInfos(filter:{
    id:{
      equalTo:"14"
    }
  })
  {
    nodes{
      blockHash
      parentBlockHash
      extrinsicsHash
      state
      contentHash
      extrinsicNumber
      timestamp
    }
  }
}
`



const Test = () =>{
    // const route = useRouter()
    // const [fetchUserBlockInfo] = useManualQuery(Block_Info)
    // const fetchBlock = async (Block) => {
    //     const{data} = await fetchUserBlockInfo({
    //         variables: { Block }
    //     })
    //     console.log(data)
    //     // return user
    // }
    //
    //
    // useEffect(()=>{
    //     if (route.isReady) {
    //         const pid = route.query.pid
    //         changeBlock(`${pid}`)
    //     }
    // },[route.isReady])




    return (
        <ul>
            {/*<button onClick={fetchUserThenSomething}>*/}
            {/*    1*/}
            {/*</button>*/}
            <li>
                <Link href="/post/abc">
                    <a>Go to pages/post/[pid].js</a>
                </Link>
            </li>
            <li>
                <Link href="/post/abc?foo=bar">
                    <a>Also goes to pages/post/[pid].js</a>
                </Link>
            </li>
            <li>
                <Link href="/post/abc/a-comment">
                    <a>Go to pages/post/[pid]/[comment].js</a>
                </Link>
            </li>
        </ul>
    )
}

export default Test