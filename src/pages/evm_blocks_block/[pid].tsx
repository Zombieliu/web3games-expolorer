import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {BlockPageNumberValue, DarkModeAtom, darkModeImg, extrinsicPageNumberValue} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";


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
        block:`props.data.extrinsicInfos.nodes[0].blockHash.blockHeight`,
        timestamp:"28",
        transactions:"20",
        collator:"0x1d44ddqgweibrf2873gbshbf92gbb183447",
        reward:"0.0027516712",
        difficulty:"0",
        totalDifficulty:"0",
        size:"3,736",
        gasUsed:"458,943 (3.08%）",
        gasLimit:"15,000,000",
        hash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        parentHash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        Uncles:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        Nonce:"0x00000000000000",

    }

const Blocks=()=>{
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)

    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [BlockPageNumber,] = useAtom(BlockPageNumberValue)
    const [number,setNumber] = useState(0)

    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            const number = Number(router.query.pid)
            // @ts-ignore
            setNumber(number)
        }
    },[router.isReady])

    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:(BlockPageNumber - 1) * 20
        },
    })

    const addPageCounter = (e)=>{
      setNumber(e)
    }

    const decPageCounter = (e)=>{
        setNumber(e)
    }

    function closeModal() {
        setIsOpen(false)
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

                <Header></Header>
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
                            <div className=" min-w-full   dark:text-neutral-300 ">
                                <div className="flex  text-xl font-semibold py-2.5 px-5 border-b dark:border-W3GInfoBorderBG rounded-t-lg">
                                    <div className="bg-clip-text text-transparent bg-gradient-to-r from-W3G1    via-W3G2 to-W3G3 ">
                                        Overview
                                    </div>
                                </div>
                                <div className="text-black dark:text-white  text-sm ">
                                        <div key={overview.block} className="divide-y divide-gray-200 dark:divide-W3GInfoBorderBG px-5  items-center">

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
                                                    By Collator:
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        <div className="text-blue-400 mr-1 ">
                                                            {overview.collator}
                                                        </div>
                                                        (Pathrocknetwork) in 12 secs
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
                                                    Difficulty：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.difficulty}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                  Total  Difficulty：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.totalDifficulty}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                   Size：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.size} Butes
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
                                                    <div className="text-gray-800  dark:text-white md:flex items-centerw-full truncate md:text-clip" >
                                                        {overview.hash}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                   Parent Hash：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <button onClick={GetBlock} id={overview.parentHash} className="text-blue-400 md:flex items-center w-full truncate md:text-clip" >
                                                        {overview.parentHash}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                    Sha3Uncles:
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center w-full truncate md:text-clip" >
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
                                <Dialog.Overlay className="fixed inset-0"/>
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
                                <div
                                    className="inline-block  text-center max-w-md p-3  overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">

                                    <div className="flex justify-center">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true"/>
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
export default Blocks
