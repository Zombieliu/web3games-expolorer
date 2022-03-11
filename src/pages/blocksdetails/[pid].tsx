import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import Sort from "../../components/sort";
import {CheckCircleIcon, XIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useRouter} from "next/router";
import {useQuery} from "graphql-hooks";
import {useAtom} from "jotai";
import { darkModeAtom, BlocksDetailsValue, CopyValue } from '../../jotai';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}



const tokenstitle=[
    {
        title:"Extrinsic ID"
    },
    {
        title:"Hash"
    },
    {
        title:"Nonce",
    },
    {
        title:"Result"
    },
    {
        title:"Signer By"
    },
]



const Block_Info = `
 query HomePage($Block: String) {
  extrinsicInfos(filter:{
    blockHashId:{
      equalTo:$Block
    }
  }){
    nodes{
      id
      extrinsicHeight
      signerId
      success
      nonce
      blockHash{
        id
        blockHeight
        parentBlockHash
        extrinsicsHash
        state
        contentHash
        extrinsicNumber
        timestamp
      }
    }
  }
}
`

class extrinsicInfo {
    private id: string;
    private extrinsicHash: string;
    private nonce: string;
    private state: string;
    private by: string;
    private address: string;

    constructor(
        id:string,
        extrinsicHash:string,
        nonce:string,
        state:string,
        by:string,
        address:string,
    ) {
        this.id = id
        this.extrinsicHash = extrinsicHash
        this.nonce = nonce
        this.state = state
        this.by = by
        this.address = address
    }
}

function data_list(data: any){
        console.log(data)
        let times = data.extrinsicInfos.nodes.length;
        let data_list = [];
        for (let i = 0;i < times;i++){
            if (data.extrinsicInfos.nodes[i].signerId == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"){
                let result = new extrinsicInfo(
                    data.extrinsicInfos.nodes[i].extrinsicHeight,
                    data.extrinsicInfos.nodes[i].id,
                    data.extrinsicInfos.nodes[i].nonce,
                    data.extrinsicInfos.nodes[i].success,
                    "system",
                    data.extrinsicInfos.nodes[i].signerId,
                )
                data_list.push(result)
            }else{
                let result = new extrinsicInfo(
                    data.extrinsicInfos.nodes[i].extrinsicHeight,
                    data.extrinsicInfos.nodes[i].id,
                    data.extrinsicInfos.nodes[i].nonce,
                    data.extrinsicInfos.nodes[i].success,
                    data.extrinsicInfos.nodes[i].signerId,
                    data.extrinsicInfos.nodes[i].signerId,
                )
                data_list.push(result)
            }
        }
        return data_list
}

const Overview = () =>{
    const router = useRouter()
    const [,setIsOpen] = useAtom(CopyValue)
    const Copy=(span)=>{
        console.log(span)
        const spanText = document.getElementById(span).innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand('Copy');
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        if(oInput){
            setIsOpen(true)
        }
    }

    return(
      <>
          <div className="mt-5">
              <div className="my-5  bg-white dark:bg-gray-600 rounded-lg  ">
                  <div className="py-5 min-w-full  p-5 dark:text-gray-200">
                      <div className="flex my-5 text-xl font-semibold text-gray-700">

                          <div>
                              Overview
                          </div>

                      </div>
                      <div className="text-gray-400 text-sm ">
                          {overview.map(item=>(
                            <div key={item.block}>
                                <div className="md:flex justify-between lg:justify-start  my-3 ">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        Block
                                    </div>
                                    <div className="text-gray-800 " id="block">
                                        {item.block}  <button onClick={() => {
                                        // @ts-ignore
                                        Copy("block");
                                    }}> <i className="fa fa-clone mt-1" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div className="md:flex  justify-between lg:justify-start my-3">
                                    <div className="font-semibold justify-between lg:font-medium  w-60 mr-32">
                                        Timestamp
                                    </div>
                                    <div className="h-auto  lg:flex">
                                        <div className="text-gray-800 ">
                                            {item.timestamp}
                                        </div>
                                        <div className="flex">
                                            <div className="mx-3 hidden lg:inline-block">
                                                |
                                            </div>
                                            <div className="md:flex">
                                                <div className="">
                                                    <i className="fa fa-clock-o" aria-hidden="true"></i>  {item.UTCtime} +UTC
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" md:flex justify-between lg:justify-start my-3 ">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        Block Hash
                                    </div>
                                    <div id={item.blockHash} className="text-gray-800 text-xs lg:text-sm   break-words ">
                                        {item.blockHash} &nbsp;
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.blockHash}`);}}>
                                            <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:flex justify-between lg:justify-start my-3">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        Parent Block Hash
                                    </div>
                                    <div id={item.parentBlockHash} className="text-gray-800  text-xs lg:text-sm  break-words">
                                        {item.parentBlockHash} &nbsp;
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.parentBlockHash}`);}}>
                                            <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:flex justify-between lg:justify-start my-3">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        Extrinsics Hash
                                    </div>
                                    <div id={item.extrinsicsHash} className="text-gray-800  text-xs lg:text-sm break-words ">
                                        {item.extrinsicsHash} &nbsp;
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.extrinsicsHash}`);}}>
                                            <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:flex justify-between lg:justify-start my-3 ">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        Content Hash
                                    </div>
                                    <div id={item.contentHash} className="text-gray-800  text-xs lg:text-sm break-words ">
                                        {item.contentHash} &nbsp;
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.contentHash}`);}}>
                                            <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:flex justify-between lg:justify-start my-3">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        State Hash
                                    </div>
                                    <div id={item.State} className="text-gray-800  text-xs lg:text-sm  break-words">
                                        {item.State} &nbsp;
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.State}`);}}>
                                            <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="md:flex  justify-between lg:justify-start my-3">
                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                        Extrinsics
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start text-gray-800">

                                        <div className="flex ">
                                            <div>Total</div>
                                            <div className=" mx-1   font-semibold">{item.extrinsicNumber}</div>
                                            <div>Extrinsics</div>
                                        </div>

                                    </div>

                                </div>
                            </div> ))}
                      </div>

                  </div>
              </div>
          </div></>
    )
}

const Extrinsic = () =>{
    const router = useRouter()
    return(
      <>
          <div className="mt-5">
              <div className="my-5 overflow-x-auto bg-white dark:bg-gray-600 rounded-lg ">
                  <div className="py-2 min-w-full  p-5 dark:text-gray-200">
                      <div className="flex my-5 text-xl font-semibold text-gray-700">

                          <div>
                              Extrinsic
                          </div>

                      </div>
                      <div className="shadow overflow-auto border-b  border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-100 dark:bg-gray-300">
                              <tr>
                                  {tokenstitle.map(title=>(
                                    <th key={title.title}
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-500  "
                                    >
                                        {title.title}
                                        <i className={title.title} aria-hidden="true"></i>
                                    </th>
                                  ))}
                              </tr>
                              </thead>
                              <tbody className="bg-white dark:bg-gray-300 divide-y divide-gray-200">
                              {Tokens.map(token=>(
                                <tr key={token.id} className="hover:bg-gray-200" >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                        <button id={token.extrinsicHash} onClick={GetExtrinsics}>
                                            {token.id}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                                        <button id={token.extrinsicHash} onClick={GetExtrinsics}>
                                            {token.extrinsicHash}
                                        </button>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                        {token.nonce}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {token.state ? "success" : "fail"}
                                    </td>
                                    <td  className="px-6 py-4 whitespace-nowrap text-base ">
                                        <button onClick={getAccount} className="text-blue-400" id={token.address}>
                                            {token.by}
                                        </button>
                                    </td>
                                </tr>
                              ))}
                              </tbody>
                          </table>
                      </div>

                      <Sort></Sort>
                  </div>
              </div>
          </div>
      </>
    )
}
const BlocksDetails=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(darkModeAtom)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

    const [Block,changeBlock] = useState('0xa5f01bf449536de62bb9719134ca7e28a90a8c837fe07cc2b81733fe163049d1')
    useEffect(()=>{
        if (router.isReady) {
            const pid = router.query.pid
            console.log(pid)
            changeBlock(`${pid}`)
        }
    },[router.isReady])

    const{loading,error,data}: any = useQuery(Block_Info,{
        variables:{
            Block
        }
    })

    function DataDiff (blockTime) {
        const start = new Date(blockTime).getTime();
        const end = new Date().getTime();
        const milliseconds = Math.abs(end - start).toString()
        // @ts-ignore
        const seconds = parseInt(String(milliseconds / 1000));
        const minutes = parseInt(String(seconds / 60));
        const hours = parseInt(String(minutes / 60));
        const days = parseInt(String(hours / 24));
        if (days >= 1){
            let new_hours = hours - days * 24
            let new_minutes = minutes  - hours * 60
            let new_seconds = seconds - minutes * 60
            return `${days} days ${new_hours} hours ${new_minutes} minutes ${new_seconds} seconds ago`
        }else if (hours >= 1){
            let new_minutes = minutes  - hours * 60
            let new_seconds = seconds - minutes * 60
            return `${hours} hours ${new_minutes} minutes ${new_seconds} seconds ago`
        }else if (minutes >= 1){
            let new_seconds = seconds - minutes * 60
            return `${minutes} minutes ${new_seconds} seconds ago`
        }else if (seconds >= 1){
            return `${seconds} seconds ago`
        }else{
            return `now`
        }
    }

    function GetBlockData(blockTime) {
        const start = new Date(blockTime).toUTCString();
        return `${start}`
    }

    async function getAccount(e){
       await router.push(`/account/${e.target.id}`)
    }



    const GetExtrinsics = (props) => {
        const value = props.target.id;
        router.push(`/extrinsics/${value}`)
    }

    if (loading){
        return(
            <div>
                {loading}
            </div>
        )
    }

    if(error){
        return(
            <div>
                {error}
            </div>
        )

    }

    // console.log(data.blockInfos.nodes[0])
    if (data){
        console.log(data)
        // console.log(data.blockInfos.nodes[0]);
        let time = DataDiff(data.extrinsicInfos.nodes[0].blockHash.timestamp)
        let utc = GetBlockData(data.extrinsicInfos.nodes[0].blockHash.timestamp)
        // console.log(DataDiff(data.blockInfos.nodes[0].timestamp));
        const overview=[
            {
                block:`#${data.extrinsicInfos.nodes[0].blockHash.blockHeight}`,
                timestamp:time,
                UTCtime:utc,
                blockHash:data.extrinsicInfos.nodes[0].blockHash.id,
                parentBlockHash:data.extrinsicInfos.nodes[0].blockHash.parentBlockHash,
                extrinsicsHash:data.extrinsicInfos.nodes[0].blockHash.extrinsicsHash,
                contentHash:data.extrinsicInfos.nodes[0].blockHash.contentHash,
                State:data.extrinsicInfos.nodes[0].blockHash.state,
                extrinsicNumber:data.extrinsicInfos.nodes[0].blockHash.extrinsicNumber,
            }
        ]
        const Tokens = data_list(data)

        return(
            <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">
                <Header></Header>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-20 mb-14">
                        <div className="mx-auto lg:flex justify-between ">
                            <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                                Block Details
                            </div>
                        </div>
                        <Overview/>
                        <Extrinsic/>
                    </div>

                </div>
                <Tail></Tail>


            </div>
        )
    }
}
export default BlocksDetails
