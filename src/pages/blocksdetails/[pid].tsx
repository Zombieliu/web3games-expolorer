import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import Sort from "../../components/sort";
import {CheckCircleIcon, XIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useRouter} from "next/router";
import {useQuery} from "graphql-hooks";


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



// const Block_Info = `
//  query HomePage($Block: String) {
//   blockInfos(filter:{
//     id:{
//       equalTo:$Block
//     }
//   })
//   {
//     nodes{
//       blockHash
//       parentBlockHash
//       extrinsicsHash
//       state
//       contentHash
//       extrinsicNumber
//       timestamp
//     }
//   }
// }
// `

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
      signer
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


// extrinsicInfos(filter:{
//     blockHeight:{
//         equalTo:$Block
//     }
// })
// {
//     nodes{
//     id
//     extrinsicHash
//     meta
//     nonce
//     success
// }
// }

// const Tokens=[
//     {
//         id:data.extrinsicInfos.nodes[0].id,
//         extrinsicHash:data.extrinsicInfos.nodes[0].extrinsicHash,
//         nonce:data.extrinsicInfos.nodes[0].nonce,
//         state:data.extrinsicInfos.nodes[0].success,
//         by:"System",
//         address:"",
//         fee:"0.0005",
//     },
//
// ]

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
        let times = data.extrinsicInfos.nodes.length;
        let data_list = [];
        for (let i = 0;i < times;i++){
            let result = new extrinsicInfo(
                data.extrinsicInfos.nodes[i].extrinsicHeight,
                data.extrinsicInfos.nodes[i].id,
                data.extrinsicInfos.nodes[i].nonce,
                data.extrinsicInfos.nodes[i].success,
                "System",
                "",
            )
            data_list.push(result)
        }
        return data_list
}



const BlocksDetails=()=>{
    const router = useRouter()
    const [Block,changeBlock] = useState('0x2340c482f0c790758b5fc7a0b1ef140e233a6e8e963d7a45e6552adca06feaae')
    let [isOpen, setIsOpen] = useState(false)


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

    const Copy=(span)=>{
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

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
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


        // const Tokens=[
        //     {
        //         id:data.extrinsicInfos.nodes[0].id,
        //         extrinsicHash:data.extrinsicInfos.nodes[0].extrinsicHash,
        //         nonce:data.extrinsicInfos.nodes[0].nonce,
        //         state:data.extrinsicInfos.nodes[0].success,
        //         by:"System",
        //         address:"",
        //         fee:"0.0005",
        //     },
        //
        // ]


        return(
            <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">

                <Header></Header>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-20 mb-14">
                        <div className="mx-auto lg:flex justify-between ">

                            <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                                Block Details
                            </div>
                            {/*<div className="flex ">*/}
                            {/*    <input type="text"*/}
                            {/*           className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white dark:border-gray-500 dark:bg-gray-700 outline-none"*/}
                            {/*           placeholder="Search Block,Extrinsic Hash"*/}
                            {/*    />*/}
                            {/*    <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 -ml-11">*/}
                            {/*        <i className="fa fa-search" aria-hidden="true"></i></div>*/}
                            {/*</div>*/}

                        </div>
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
                                                <div className="md:flex   my-3 ">
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
                                                <div className="md:flex   my-3">
                                                    <div className="font-semibold justify-between lg:font-medium  w-60 mr-32">
                                                        Timestamp
                                                    </div>
                                                    <div className="md:flex">
                                                        <div className="text-gray-800">
                                                            {item.timestamp}
                                                        </div>
                                                        <div className="flex">
                                                            <div className="mx-3 hidden md:inline-block">
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
                                                <div className="md:flex  my-3 ">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Block Hash
                                                    </div>
                                                    <div className="text-gray-800 text-xs lg:text-sm    ">
                                                        {item.blockHash}
                                                    </div>
                                                </div>
                                                <div className="md:flex  my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Parent Block Hash
                                                    </div>
                                                    <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                        {item.parentBlockHash}
                                                    </div>
                                                </div>
                                                <div className="md:flex  my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Extrinsics Hash
                                                    </div>
                                                    <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                        {item.extrinsicsHash}
                                                    </div>
                                                </div>
                                                <div className="md:flex  my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Content Hash
                                                    </div>
                                                    <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                        {item.contentHash}
                                                    </div>
                                                </div>
                                                <div className="md:flex  my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        State Hash
                                                    </div>
                                                    <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                        {item.State}
                                                    </div>
                                                </div>
                                                <div className="md:flex   my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Extrinsics
                                                    </div>
                                                    <div className="md:flex text-gray-800">

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
                        </div>

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
                                                    <td className="px-6 py-4 whitespace-nowrap text-base ">

                                                        <button onClick={() => {
                                                            // @ts-ignore
                                                            Copy("by");
                                                        }}><i className="fa fa-clone mr-1  " aria-hidden="true"></i>
                                                        </button>
                                                        <Link href={token.address}>
                                                            <a  className="text-blue-400" id="by">
                                                                {token.by}</a>
                                                        </Link>
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
                    </div>

                </div>
                <Tail></Tail>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-40  -mt-72"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
              &#8203;
            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="inline-block  text-center max-w-md p-3  overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">

                                    <div className="flex justify-center">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Copy successfully !
                                    </Dialog.Title>
                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        )
    }
}
export default BlocksDetails