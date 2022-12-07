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
import {PageNumberValue, DarkModeAtom, extrinsicPageNumberValue, SelectNumber} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import {showAccount, showSmallAccount} from "../../utils";
import Heads from "../../components/head";
import client from "../../post/post";


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



function GetBlockData(blockTime) {
    const start = new Date(blockTime).toUTCString();
    return `${start}`
}


const Sort=(props:any)=>{
    const [PageNumber,SetPageNumber] = useAtom(PageNumberValue)
    const [select_number,setSelect_number] = useAtom(SelectNumber)


    const block_number:number = props.data.total
    //
    // const block_number:number = props.data.total


    const Select = (e) =>{
        setSelect_number(Number(e.target.value))
        SetPageNumber(1)
    }

    let block_number_pages:number = Math.ceil(block_number / select_number)

    if (block_number_pages > 500){
        block_number_pages = 500
    }

    const addPageCounter = async ()=>{
        if (PageNumber != block_number_pages){
            SetPageNumber(PageNumber + 1)
        }
    }
    const decPageCounter = ()=>{
        if (PageNumber != 1){
            SetPageNumber(PageNumber - 1)
        }
    }

    const lastPage = ()=>{
        SetPageNumber(block_number_pages)
    }

    const firstPage = ()=>{
        SetPageNumber(1)
    }

    return(
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
                        Page {PageNumber} of {block_number_pages}
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
    )
}

const Transactions=()=> {
    const router = useRouter()
    const [PageNumber,] = useAtom(PageNumberValue)
    const [selectNumber,] = useAtom(SelectNumber)
    const extrinsicType =  {
        total:"",
        items: [
            {
            block_num:"",
            extrinsic_hash:"",
            event_index:"",
            timestamp:"",
            method:"",
            section:"",
            signer:""
        }
        ]
    }
    const [extrinsic,setExtrinsic]= useState(extrinsicType)
    useEffect(()=>{
        if (router.isReady){
            const query = async ()=>{
                let ret = await client.callApi('event/GetAll', {
                    pageIndex: (PageNumber - 1) * selectNumber,
                    limit: selectNumber
                });
                if (ret.res != undefined) {
                    setExtrinsic(JSON.parse(ret.res.content))
                    console.log((JSON.parse(ret.res.content)))
                }
                // Error
                if (!ret.isSucc) {
                    return;
                }
            }
            query()
            // fetchUserThenSomething()
        }
    },[router.isReady,selectNumber,PageNumber])


    const GetEventDetails = (blockNum,eventIndex) => {
        router.push(`/event/${blockNum}/${eventIndex}`)
    }

    const GetExtrinsics = (extrinsic_hash) =>{

        if(extrinsic_hash){
            router.push(`/extrinsics/${extrinsic_hash}`)
        }
    }

    async function getAccount(e){
        await router.push(`/account/${e.target.id}`)
    }

    if(extrinsic.items.length !==0){
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
                                        {extrinsic.items.map(item => (
                                            <tr key={item.block_num} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                <td className="px-7 py-4 whitespace-nowrap text-sm font-medium  text-blue-400 font-medium ">
                                                    <button  onClick={()=>GetEventDetails(item.block_num,item.event_index)}>
                                                        {item.block_num}-{item.event_index}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-zinc-300  font-medium ">
                                                    {item.section}-{item.method}
                                                </td>
                                                <td className="px-6 py-4 w-12 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {GetBlockData(item.timestamp)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                                    <button id={item.extrinsic_hash} onClick={()=>GetExtrinsics(item.extrinsic_hash)}>
                                                        {item.extrinsic_hash == null? "system":showAccount(item.extrinsic_hash)}
                                                    </button>
                                                </td>

                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {classNames(item.signer == ''? "system": showSmallAccount(item.signer))}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Sort data={extrinsic}></Sort>
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
