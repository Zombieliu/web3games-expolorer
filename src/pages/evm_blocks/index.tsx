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
import Heads from "../../components/head";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
    {
        title:"Block"
    },
    {
        title:"Age "
    },
    {
        title:"Txn",
        i:"fa fa-clock-o ml-1"
    },
    {
        title:"Gas Used"
    },
    {
        title:"Gas Limit"
    },
    {
        title:"Treasury Revenue"
    },
]

const extrinsic = [
    {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
    },
    {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
    }, {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
    }, {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
    }, {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
    }, {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
    }, {
        block:"3123123",
        age:"14",
        txn:"1",
        gasUsed:"0.145263 (70.12%)",
        gasLimit:"0",
        treasuryRevenue:"0.145263 (70.12%)",
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
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    const [select_number,setSelect_number] = useAtom(SelectNumber)


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


    const GetBlock = (props) => {
        const value = props.target.id;
        router.push(`/evm_blocks_block/${value}`)
    }

    const GetTxn = (props) => {
        const value = props.target.id;
        router.push(`/evm_transactions`)
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
                                BLOCKS
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
                                            <tr key={item.block} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                <td className="px-6 py-4  whitespace-nowrap text-sm font-medium text-blue-400  ">
                                                    <button id={item.block} onClick={GetBlock}>
                                                        {item.block}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {item.age} Second ago
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  ">
                                                    <button id={item.txn} onClick={GetTxn}>
                                                        {item.txn}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                                                    {item.gasUsed}
                                                </td>
                                                <td className="px-16 py-4  whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                                                    {item.gasLimit}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                  {item.treasuryRevenue}
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
