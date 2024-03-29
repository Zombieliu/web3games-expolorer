import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {PageNumberValue, DarkModeAtom, extrinsicPageNumberValue, SelectNumber, CopyPopUpBoxState} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import {showAccount, showSmallAccount} from "../../utils";
import Heads from "../../components/head";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
    {
        title:"Txh Hash"
    },
    {
        title:"Method "
    },
    {
        title:"Block",
    },
    {
        title:"Age"
    },
    {
        title:"From"
    },
    {
        title:""
    },
    {
        title:"To"
    },
    {
        title:"Value"
    },
    {
        title:"Txn Fee"
    },
]

const extrinsic = [
    {
        TxhHash:"0x0c8ee83b555f0ede1a",
        Method:"Mint",
        Block:"15313963",
        Age:"9",
        From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        icon: "fa fa-arrow-right",
        To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        Value: "0",
        TxnFee: "0.00064646"
    },
    {
        TxhHash:"0x0c8ee83b555f0ede1a3",
        Method:"Mint",
        Block:"15313963",
        Age:"9",
        From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        icon: "fa fa-arrow-right",
        To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        Value: "0",
        TxnFee: "0.00064646"
    }, {
        TxhHash:"0x0c8ee83b555f0ede1a4",
        Method:"Mint",
        Block:"15313963",
        Age:"9",
        From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        icon: "fa fa-arrow-right",
        To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        Value: "0",
        TxnFee: "0.00064646"
    }, {
        TxhHash:"0x0c8ee83b555f0ede1a5",
        Method:"Mint",
        Block:"15313963",
        Age:"9",
        From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        icon: "fa fa-arrow-right",
        To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        Value: "0",
        TxnFee: "0.00064646"
    }, {
        TxhHash:"0x0c8ee83b555f0ede1a7",
        Method:"Mint",
        Block:"15313963",
        Age:"9",
        From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        icon: "fa fa-arrow-right",
        To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
        Value: "0",
        TxnFee: "0.00064646"
    },



]


const Blcok_Info = `
 query HomePage($first: Int) {
  blockInfos(first:20,offset:$first,orderBy:TIMESTAMP_DESC){
    nodes{
      id
      blockHeight
      extrinsicNumber
      eventNumber
      timestamp
    }
    totalCount
  }
}
`


const Sort=(props:any)=>{
    // const extrinsic_number = props.data.extrinsicInfos.totalCount
    //
    let extrinsic_number_pages = (20 / 20)
    //
    //
    // if (extrinsic_number_pages > 500){
    //     extrinsic_number_pages = 500
    // }

    const router = useRouter()

    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    const [select_number,setSelect_number] = useAtom(SelectNumber)
    useEffect(()=>{
        if (router.isReady){
        }
    },[router.isReady])


    const Select = (e) =>{
        setSelect_number(Number(e.target.value))
        SetextrinsicPageNumber(1)
    }

    const addPageCounter = ()=>{
        // if (extrinsicPageNumber != extrinsic_number_pages){
        //     SetextrinsicPageNumber(extrinsicPageNumber + 1)
        // }
    }

    const decPageCounter = ()=>{
        // if (extrinsicPageNumber != 1){
        //     SetextrinsicPageNumber(extrinsicPageNumber - 1)
        // }
    }

    const lastPage = ()=>{
        // SetextrinsicPageNumber(extrinsic_number_pages)
    }

    const firstPage = ()=>{
        SetextrinsicPageNumber(1)
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
    )
}



const Blocks=()=>{
    const router = useRouter()
    const [,setCopy_Sop_up_boxState] = useAtom(CopyPopUpBoxState)
    const [PageNumber,] = useAtom(PageNumberValue)
    useEffect(()=>{
        if (router.isReady){

        }
    },[router.isReady])

    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:(PageNumber - 1) * 20
        },
    })

    const GetHash = (props) => {
        const value = props.target.id;
        router.push(`/evm_transactionsDetail/${value}`)
    }

    const GetBlock = (props) => {
        const value = props.target.id;
        router.push(`/evm_blocks_block/${value}`)
    }

    const GetAddress = (props) =>{
        const value = props.target.id;
        router.push(`/evm_address/${value}`)
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

            setCopy_Sop_up_boxState(true)
        }
    }



    if (loading) {
        return (
            <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                <DetailsSkeleton/>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <Error/>
            </div>
        )

    }

    if (data) {
        // console.log(data)
        return (
            <div className="mx-auto bg-white dark:bg-W3GBG  transition duration-700">
                <Heads/>
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-14">
                        <div className="mx-auto flex justify-between items-center">

                            <div className="text-xl my-2 lg:my-0 text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                Transactions
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
                                <div className="border-b  dark:border-W3GInfoBorderBG overflow-auto rounded-t-lg  ">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                        <thead className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
                                        <tr>
                                            {tokenstitle.map(title => (
                                                <th key={title.title}
                                                    scope="col"
                                                    className="py-6   text-sm xl:text-base  font-semibold   "
                                                >
                                                    {title.title}
                                                    {/*<i className={title.i} aria-hidden="true"></i>*/}
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                        {extrinsic.map(item => (
                                            <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                                                <td className="px-4 py-4 whitespace-nowrap  font-medium text-blue-400  font-medium">
                                                    <button id={item.TxhHash} onClick={GetHash} >
                                                        {classNames(showSmallAccount(item.TxhHash,))}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap  font-medium  text-white  font-medium">
                                                    <button className="bg-cyan-300 px-3 py-1 rounded-md">
                                                        {item.Method}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400  font-medium">
                                                    <button id={item.Block} onClick={GetBlock} >
                                                        {item.Block}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                                    {item.Age} secs ago
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                                                    <button id={item.From}  onClick={GetAddress}  >
                                                        {classNames(showSmallAccount(item.From,))}
                                                    </button>
                                                </td>
                                                <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                                    <div className="bg-green-300 rounded-full w-4 items-center">
                                                    <i className={item.icon} aria-hidden="true"></i>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                                                    <button id={item.To} onClick={GetAddress} >
                                                        {classNames(showSmallAccount(item.To,))}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                                    {item.Value} W3G
                                                </td>
                                                <td className="px-10 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                                    {item.TxnFee}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                </div>
                                <Sort data={data}></Sort>
                            </div>
                        </div>

                    </div>

                </div>
                <Tail></Tail>

            </div>
        )
    }
}
export default Blocks
