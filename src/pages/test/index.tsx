import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useManualQuery} from "graphql-hooks";

const GET_USER_QUERY = `
 query  GetUseQuery($select: Int){
  blockInfos(filter:{
  blockHeight:{
      equalTo:$select
    }
  }){
    nodes{
      id
      blockHeight
    }
  }
}
`
const Extrinsic_Hash =`
query HomePage_Hash($ExtrinsicHash: String){
    extrinsicInfos(filter:{
    id:{
      equalTo:$ExtrinsicHash
    }
  }){
       nodes{ 
        id
    signerId
    meta
    }
  }
}
`


const Test = (props)=>{

    const [fetchUser] = useManualQuery(GET_USER_QUERY)
    const [extrinsic_Hash] = useManualQuery(Extrinsic_Hash)
    const fetchUserThenSomething = async (query_data) => {
        const block = await fetchUser({
            variables: { select: query_data }
        })
        return block
    }

    const QueryExtrinsic_Hash = async (ExtrinsicHash) => {
        const result = await extrinsic_Hash({
            variables: {
                ExtrinsicHash
            }
        })
        return result
    }

    const QueryExtrinsic_Hash2 = async (query_data:number) => {
        const block = await fetchUser({
            variables: {
                select: query_data
            }
        })
        return block
    }
    const test2 =async () =>{
        const block = await QueryExtrinsic_Hash2(1234)
        // console.log(block.data.blockInfos.nodes[0].id)
        console.log(block)
    }
    const test =async () =>{
        const block = await QueryExtrinsic_Hash("0xa8861f4454eaffae7f3c64ed7c632efb6dcbf599cc2dd4652cd60cf294e20dee")
        // console.log(block.data.blockInfos.nodes[0].id)
        console.log(block)
    }

    return (
        <div  onClick={test2}>
          11111
        </div>
    )
}

export default Test
