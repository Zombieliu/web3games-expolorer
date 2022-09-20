import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useManualQuery, useQuery} from "graphql-hooks";
import {router} from "next/client";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, extrinsicPageNumberValue, SelectNumber} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import {showAccount, showSmallAccount} from "../../utils";
import Heads from "../../components/head";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
    {
        title:"Event ID"
    },
    {
        title:"Action"
    },
    {
        title:"Time",
    },
    {
        title:"Extrinsic Hash"
    },
    {
        title:"Extrinsic Signer"
    },
]


const Block_Info = `
 query HomePage($select: Int,$first: Int) { 
  events(first:$select,offset:$first,orderBy:TIMESTAMP_DESC){
     nodes{
      id
      module
      method
      timestamp
      extrinsicHash
      }
    totalCount
  }
}
`

const Extrinsic_Hash = `
query HomePage($select: Int,$first: Int) { 
  extrinsicInfos(first:$select,offset:$first,orderBy:TIMESTAMP_DESC){
       nodes{
    extrinsicHeight
   id
   signerId
    }
  }
}
`


class extrinsicInfo {
    private id: string;
    private action: string;
    private time: string;
    private hash : string;
    private signerId: string;
    private totalCount: string;


    constructor(
        id:string,
        action:string,
        time:string,
        hash:string,
        signerId:string,
        totalCount:string

    ) {
        this.id = id
        this.action = action
        this.time = time
        this.hash = hash
        this.signerId = signerId
        this.totalCount = totalCount

    }
}

function GetBlockData(blockTime) {
    const start = new Date(blockTime).toUTCString();
    return `${start}`
}

// function data_list(block_Info_data: any ,extrinsicInfos_data:any){
//     let times = block_Info_data.events.nodes.length;
//     let data_list = [];
//     for (let i = 0;i < times;i++){
//         if (block_Info_data.events.nodes[i].signerId == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"){
//             let result = new extrinsicInfo(
//                 block_Info_data.events.nodes[i].id,
//                 `${block_Info_data.events.nodes[i].module}.${block_Info_data.events.nodes[i].method}`,
//                 GetBlockData(block_Info_data.events.nodes[i].timestamp),
//                 extrinsicInfos_data.extrinsicInfos.nodes[i].extrinsicHeight,
//                 // data.events.nodes[i].signerId,
//                 "system",
//
//             )
//             data_list.push(result)
//         }else{
//             let result = new extrinsicInfo(
//
//                 block_Info_data.events.nodes[i].id,
//                 `${block_Info_data.events.nodes[i].module}.${block_Info_data.events.nodes[i].method}`,
//                 GetBlockData(block_Info_data.events.nodes[i].timestamp),
//                 extrinsicInfos_data.extrinsicInfos.nodes[i].extrinsicHeight,
//                 extrinsicInfos_data.extrinsicInfos.nodes[i].signerId
//
//             )
//             data_list.push(result)
//         }
//     }
//     return data_list
// }


const Transactions=()=> {
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [selectNumber,] = useAtom(SelectNumber)
    const [block_Info] = useManualQuery(Block_Info)
    const [extrinsic_Hash] = useManualQuery(Extrinsic_Hash)
    const [totalCount,SetTotalCount]= useState(0)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    const [select_number,setSelect_number] = useAtom(SelectNumber)
    const extrinsicType = [
        {
           id:"",
           action:"",
           time:"",
           hash:"",
           signerId:"",
            totalCount:"",
        }
    ]
    const [extrinsic,setExtrinsic ]= useState(extrinsicType)
    const [extrinsic_number,setExtrinsic_number]  = useState(0)



    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            const query = async ()=>{
                const data = await (await QueryBlock_Info()).data
                const data2 = await (await QueryExtrinsicInfos()).data
                SetTotalCount(data)
                setExtrinsic_number(data.events.totalCount)
                let times = data.events.nodes.length;
                let data_list = [];
                for (let i = 0;i < times;i++){
                    if (data.events.nodes[i].signerId == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"){
                        let result = new extrinsicInfo(

                            data.events.nodes[i].id,
                            `${data.events.nodes[i].module}.${data.events.nodes[i].method}`,
                            GetBlockData(data.events.nodes[i].timestamp),
                            data.events.nodes[i].extrinsicHash,
                            // data.events.nodes[i].signerId,
                            "system",
                            data.events.totalCount,


                        )
                        data_list.push(result)
                        setExtrinsic(data_list)
                    }else{
                        let result = new extrinsicInfo(
                            data.events.nodes[i].id,
                            `${data.events.nodes[i].module}.${data.events.nodes[i].method}`,
                            GetBlockData(data.events.nodes[i].timestamp),
                            data.events.nodes[i].extrinsicHash,
                            data2.extrinsicInfos.nodes[i].signerId,
                            data.events.totalCount,

                        )
                        data_list.push(result)
                        setExtrinsic(data_list)
                    }
                }


                // await SetBlock_Info_data(data)
                // await SetExtrinsicInfos_data(data2)
            }
            query()
            // fetchUserThenSomething()
        }
    },[router.isReady,extrinsic])

    const QueryBlock_Info = async () => {
        const result = await block_Info({
            variables: {
                select:selectNumber,
                first:(extrinsicPageNumber - 1) * selectNumber
            }
        })
        return result
    }

    const QueryExtrinsicInfos = async () => {
        const result = await extrinsic_Hash({
            variables: {
                select:selectNumber,
                first:(extrinsicPageNumber - 1) * selectNumber
            }
        })
        return result
    }

    const Select = (e) =>{
        SetextrinsicPageNumber(1)
        setSelect_number(Number(e.target.value))
    }


    let extrinsic_number_pages = Math.ceil(extrinsic_number / select_number)

    if (extrinsic_number_pages > 500){
        extrinsic_number_pages = 500
    }

    const addPageCounter = ()=>{
        if (extrinsicPageNumber != extrinsic_number_pages){
            SetextrinsicPageNumber(extrinsicPageNumber + 1)
        }
    }

    const decPageCounter = ()=>{
        if (extrinsicPageNumber != 1){
            SetextrinsicPageNumber(extrinsicPageNumber - 1)
        }
    }

    const lastPage = ()=>{
        SetextrinsicPageNumber(extrinsic_number_pages)
    }

    const firstPage = ()=>{
        SetextrinsicPageNumber(1)

    }



    const GetEventDetails = (props) => {
        const value = props.target.id;
        const  id = document.getElementById(props.target.id).innerText
        console.log(id)
        router.push(`/event/${value}/${id}`)
    }

    const GetExtrinsics = (props) =>{
        const value = props.target.id;
        const id = document.getElementById(props.target.id).innerText

        router.push(`/extrinsics/${value}/${id}`)

    }

    async function getAccount(e){
        await router.push(`/account/${e.target.id}`)
    }



    if (extrinsic.length>0) {
        return (
            <div className="mx-auto  bg-white dark:bg-W3GBG  transition duration-700">
                <Heads/>
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-2 ">
                    <div className="my-10 mb-14">

                        <div className="mx-auto flex justify-between items-center">

                            <div className="text-xl my-2 lg:my-0 text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                EVENTS
                            </div>
                            {/*<div className="flex ">*/}
                            {/*    <input type="text"*/}
                            {/*           className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white  dark:bg-neutral-900  dark:text-white dark:focus:border-neutral-400 focus:border-neutral-700    dark:border-neutral-700 outline-none"*/}
                            {/*           placeholder="Search transactions, blocks, programs and token"*/}
                            {/*           autoComplete="off"*/}
                            {/*    />*/}
                            {/*    <div className="flex justify-center z-10 text-gray-800 dark:text-gray-300 text-3xl py-3 -ml-11">*/}
                            {/*        <i className="fa fa-search" aria-hidden="true"></i></div>*/}


                            {/*</div>*/}

                        </div>
                        <div className="my-5 overflow-x-auto shadow dark:bg-W3GInfoBG rounded-lg ">
                            <div className=" min-w-full  rounded-lg border dark:border-W3GInfoBorderBG">
                                <div className="border-b dark:border-W3GInfoBorderBG overflow-auto rounded-t-lg  ">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                        <thead className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
                                        <tr>
                                            {tokenstitle.map(title => (
                                                <th key={title.title}
                                                    scope="col"
                                                    className="p-6 w-36 text-sm xl:text-base  font-semibold   "
                                                >
                                                    {title.title}
                                                    {/*<i className={title.i} aria-hidden="true"></i>*/}
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                        {extrinsic.map(item => (
                                            <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                <td className="px-7 py-4 whitespace-nowrap text-sm font-medium  text-blue-400 font-medium ">
                                                    <button id={item.hash}  onClick={GetEventDetails}>
                                                        {item.id}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-zinc-300  font-medium ">
                                                    {item.action}
                                                </td>
                                                <td className="px-6 py-4 w-12 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {item.time}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                                    <button id={item.hash} onClick={GetExtrinsics}>
                                                        {classNames(showAccount(item.hash))}
                                                        <div id={item.hash} className="hidden">
                                                            {item.id}
                                                        </div>
                                                        {/*{item.hash}*/}
                                                    </button>
                                                </td>

                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {classNames(item.signerId == 'system'? "system": showSmallAccount(item.signerId))}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                                        <div className="flex text-black dark:text-white items-center">
                                            Show
                                            <select
                                                onChange={Select}
                                                id="select"
                                                className=" block  w-13   p-1 outline-none  text-base  border border-[#7ADFD5] mx-1 sm:text-sm rounded-md text-black bg-white  dark:bg-W3GInfoBG dark:text-white"
                                                defaultValue={select_number}
                                            >
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                                <option value="100">100</option>
                                            </select>

                                            Records

                                        </div>
                                        <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                                            <button
                                                onClick={firstPage}
                                                className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md  bg-gray-200 dark:bg-[#3F3F3F]  text-sm font-semibold  "
                                            >
                                                <span className="">First</span>
                                            </button>
                                            <button
                                                onClick={decPageCounter}
                                                className="relative inline-flex items-center mx-2 px-2 py-2 rounded-md  bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold "
                                            >
                                                <span className="sr-only">Previous</span>
                                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                            <div className="  hidden lg:inline-block rounded-md  relative inline-flex items-center px-4 py-2  bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold ">
                                                Page {extrinsicPageNumber} of {extrinsic_number_pages}
                                            </div>
                                            <button onClick={addPageCounter} className="relative inline-flex items-center mx-2 px-2 py-2 rounded-md bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold ">
                                                <span className="sr-only">Next</span>
                                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                            <button
                                                onClick={lastPage}
                                                className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold "
                                            >
                                                <span className="">Last</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <Tail></Tail>


            </div>
        )

    }else {

        return (
            <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                <DetailsSkeleton/>
            </div>
        )
    }
}
export default Transactions
