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

const Status = {
    Success:{
        bg:"bg-green-300",
        icon:"fa fa-check-circle-o",
        icon2:"fa fa-check"

    },
    Fail:{
        bg:"bg-red-400",
        icon:"fa fa-times-circle-o",
        icon2:"fa fa-times"
    },
    Processing:{
        bg:"bg-gray-400",
        icon:"fa fa-refresh",
        icon2:"fa fa-refresh"
    }
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
        status:"Success",
        block:"3123123",
        timestamp:"20",
        from:"0x1d44ddqgweibrf2873gbshbf92gbb183447",
        to:"0xae83286572hsudag5474h48fb9bn0anfb040u346h0fwq969347u75",
        value:"0",
        fee:"0",

    }

const EvmTransactionsDetail=()=>{

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
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)

    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [BlockPageNumber,] = useAtom(BlockPageNumberValue)
    const [hash,setHash]= useState("")

    useEffect(()=>{
        if (router.isReady){
            // @ts-ignore
            setHash(router.query.pid)
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }

        }
    },[router.isReady])

    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:(BlockPageNumber - 1) * 20
        },
    })


    function closeModal() {
        setIsOpen(false)
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
                                Transaction Details
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
                                                Transaction Hash：
                                            </div>
                                            <div className="flex items-center mt-2 md:mt-0">
                                                <div  className="text-gray-800  dark:text-white" id={hash}>
                                                    {hash}
                                                    <button onClick={() => {
                                                        // @ts-ignore
                                                        Copy(`${hash}`);}}>
                                                        <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                Status：
                                            </div>
                                            <div className="flex mt-2 md:mt-0 ">
                                            <div className={classNames(`${Status[overview.status].bg}`,"text-base items-center flex px-1 rounded-md text-gray-50")}>
                                                <div className="text-xl mr-1">
                                                <i className={classNames(`${Status[overview.status].icon} `)} aria-hidden="true"></i>
                                                </div>{overview.status}
                                            </div>
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                               Block:
                                            </div>
                                            <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                <div className="text-gray-800  dark:text-white flex items-center " >
                                                    <button id={overview.block} className="text-blue-400 mr-1" onClick={GetBlock}>
                                                        {overview.block}

                                                    </button>
                                                   <div className=" bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-white rounded-md px-2 py-1 md:ml-1">
                                                       30 Block Confirmations
                                                   </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                Timestamp:
                                            </div>
                                            <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                <div className="text-gray-800  dark:text-white flex items-center " >
                                                        <i className="fa fa-clock-o mr-1" aria-hidden="true"></i>
                                                    <div className=" mr-1 ">
                                                        {overview.timestamp} mins ago (Aug-11-2022 08:30:48 AM +UTC)
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                From:
                                            </div>
                                            <div className="flex items-center mt-2 md:mt-0">
                                                <div  className="text-blue-400 flex " id={overview.from}>
                                                    <div className="mr-1 w-64 md:w-full truncate md:text-clip">
                                                        {overview.from}
                                                    </div>
                                                    <button onClick={() => {
                                                        // @ts-ignore
                                                        Copy(`${overview.from}`);}}>
                                                        <i className="fa fa-clone mx-1 text-gray-800  dark:text-white" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                To:
                                            </div>
                                            <div className="flex   mt-2 md:mt-0  ">
                                                <div  className="flex text-gray-800  dark:text-white items-center" id={overview.to}>
                                                    <div>
                                                        Contract:
                                                    </div>
                                                    <div className="text-blue-400 mx-1 w-56 md:w-full truncate md:text-clip">
                                                        {overview.to}
                                                    </div>
                                                    <div className={classNames(`${Status[overview.status].bg}`,"text-sm items-center flex p-1.5 mx-1 rounded-full text-gray-50")}>
                                                        <i className={classNames(`${Status[overview.status].icon2} `)} aria-hidden="true"></i>
                                                    </div>
                                                    <button onClick={() => {
                                                        // @ts-ignore
                                                        Copy(`${overview.to}`);}}>
                                                        <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                Value:
                                            </div>
                                            <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                <div className="text-gray-800  dark:text-white flex items-center " >
                                                    <div className="mr-1 bg-gray-200 dark:bg-gray-500 text-gray-700 dark:text-white rounded-md px-2 py-1 md:ml-1">
                                                        {overview.value} W3G
                                                    </div>
                                                    <div className="text-gray-700 dark:text-white  ">
                                                        ($0.00)
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                            <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                Transaction Fee:
                                            </div>
                                            <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                <div className="text-gray-800  dark:text-white flex items-center " >
                                                    <div className="text-gray-700 dark:text-white mr-1 ">
                                                        {overview.fee} GLMR
                                                    </div>
                                                    <div className="text-gray-700 dark:text-white  ">
                                                        ($0.00)
                                                    </div>
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
export default EvmTransactionsDetail
