import {useRouter} from "next/router";
import {useQuery} from "graphql-hooks";

const Block_Info = `
 query HomePage($Block: String) {
  blockInfos(filter:{
    id:{
      equalTo:$Block
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






const Post = () =>{
    const router = useRouter()
    const { pid } = router.query



    const{loading,error,data}: any = useQuery(Block_Info,{
        variables:{
            Block:"14",
        },
    })


    if (loading){
        console.log(loading)
    }

    if (error){
        console.log(error)
    }

    if (data){
        console.log(data)
    }



    return <p>Post: {pid}</p>
}

export default Post