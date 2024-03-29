import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {PageNumberValue, DarkModeAtom,  extrinsicPageNumberValue, CopyPopUpBoxState} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import Heads from "../../components/head";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


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
const overview=
    {

        height:3342,
        timestamp:"28",
        transactions:"20",
        reward:"0.0027516712",
        gasUsed:"458,943 (3.08%）",
        gasLimit:"15,000,000",
        hash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        parentHash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        Nonce:"0x00000000000000",

    }

const Blocks=()=>{
    const router = useRouter()
    const [,setCopy_Sop_up_boxState] = useAtom(CopyPopUpBoxState)
    const [PageNumber,] = useAtom(PageNumberValue)
    const [number,setNumber] = useState(0)

    useEffect(()=>{
        if (router.isReady){
            const number = Number(router.query.pid)
            // @ts-ignore
            setNumber(number)
        }
    },[router.isReady])

    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:(PageNumber - 1) * 20
        },
    })

    const addPageCounter = (e)=>{
      setNumber(e)
    }

    const decPageCounter = (e)=>{
        setNumber(e)
    }

    const GetTransactions = () => {
        router.push("/evm_transactions")
    }

    const GetBlock = (props) => {
        const value = props.target.id;
        router.push(`/evm_blocks_block/${value}`)
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
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG  transition duration-700">
                <Heads/>
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-14">
                        <div className="mx-auto lg:flex justify-between items-center">

                            <div className=" my-2 lg:my-0 text-3xl font-bold text-black dark:text-white  flex ">
                                Block
                                <div className="text-gray-600 text-xl ml-4 mt-2">
                                    #{overview.height}
                                </div>
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

                        <div className="my-5  bg-white dark:bg-W3GInfoBG rounded-lg border dark:border-W3GInfoBorderBG ">
                            <div className=" min-w-full  dark:text-neutral-300 ">
                                <div className="flex  text-xl font-semibold items-center p-5 border-b dark:border-W3GInfoBorderBG rounded-t-lg">
                                    <div className="bg-clip-text text-transparent bg-gradient-to-r from-W3G1    via-W3G2 to-W3G3 ">
                                        Overview
                                    </div>
                                </div>
                                <div className="text-black dark:text-white  text-sm ">
                                        <div key={overview.height} className="divide-y divide-gray-200 dark:divide-W3GInfoBorderBG px-5  items-center">

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    Block Height:
                                                </div>
                                                <div className="flex items-center mt-2 md:mt-0">
                                                    <div className="text-gray-800  dark:text-white" id="block">
                                                        {number}
                                                    </div>
                                                    <div className="ml-2  items-center">
                                                        <button
                                                            onClick={()=>addPageCounter(number + 1)}
                                                            className="relative inline-flex items-center py-1 bg-neutral-600 mr-1 rounded-l-md   text-sm  text-white"
                                                        >
                                                            <span className="sr-only">Previous</span>
                                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>

                                                        <button
                                                            onClick={()=>decPageCounter(number - 1)}
                                                            className="relative inline-flex items-center py-1 bg-neutral-600  rounded-r-md  text-sm  text-white">
                                                            <span className="sr-only">Next</span>
                                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    Timestamp:
                                                </div>
                                                <div className="flex items-center mt-2 md:mt-0">
                                                    <div>
                                                        <i className="fa fa-clock-o mr-1" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="text-gray-800  dark:text-white">
                                                        {overview.timestamp} secs ago (Aug-11-2022 08:30:34 AM +UTC)
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    Transactions:
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 text-left">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        <div className="flex items-center">
                                                        <button onClick={GetTransactions} className="bg-green-200 dark:bg-green-300 rounded-md py-1 px-2 mr-1 ">
                                                        {overview.transactions} Transactions
                                                        </button>
                                                        and
                                                        </div>
                                                        <div className="flex items-center mt-1 md:mt-0">
                                                        <div className="bg-green-200 dark:bg-green-300 rounded-md py-1 px-2 mr-1 md:mx-1 ">
                                                            {overview.transactions}  contract internal transaction
                                                        </div>
                                                        in this block
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    By Reward:
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                            {overview.reward} W3G
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                  Gas Used：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.gasUsed}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    Gas Limit：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.gasLimit}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                   Hash：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center w-full truncate md:text-clip" >
                                                        {overview.hash}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                   Parent Hash：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div onClick={GetBlock} id={overview.parentHash} className="cursor-pointer text-blue-400 md:flex items-center w-full truncate md:text-clip" >
                                                        {overview.parentHash}
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    Nonce:
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.Nonce}
                                                    </div>
                                                </div>
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
    }
}
export default Blocks
