import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, SelectorIcon} from "@heroicons/react/solid";
import {Dialog, Listbox, Tab, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {BlockPageNumberValue, DarkModeAtom, extrinsicPageNumberValue} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const token = [
    {
        id: 1,
        name: '$804,364,41',
        avatar:
            'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
 const overview=
    {

        address:"0xCD1dsuadg93gub3942958h8hf9428H98h2h79H84",
        timestamp:"28",
        transactions:"20",
        reward:"0.0027516712",
        gasUsed:"458,943 (3.08%）",
        gasLimit:"15,000,000",
        hash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        parentHash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        Nonce:"0x00000000000000",

    }

const Transactions = () =>{
    const tokenstitle=[
        {
            title:"Txn Hash"
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
            Method:"0x741312312",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
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
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1",
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
    // const extrinsic_number = props.data.extrinsicInfos.totalCount
    //
    let extrinsic_number_pages = (20 / 20)
    //
    //
    // if (extrinsic_number_pages > 500){
    //     extrinsic_number_pages = 500
    // }
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

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

    function closeModal() {
        setIsOpen(false)
    }

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
        router.push(`/evm_address/${value}`).then(r => {
            location.reload()
        })

    }


    return(
        <>
            <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                        <div className=" min-w-full  ">
                            <div className="shadow overflow-auto  rounded-lg  border  dark:border-W3GInfoBorderBG">
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
                                    <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                    {extrinsic.map(item => (
                                        <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                                            <td className="px-4 py-4 whitespace-nowrap  font-medium text-blue-400  font-medium">
                                                <button id={item.TxhHash} onClick={GetHash} className="truncate w-36">
                                                    {item.TxhHash}
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
                                                <button id={item.From} onClick={GetAddress}  className="truncate w-36">
                                                    {item.From}
                                                </button>
                                            </td>
                                            <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                                <div className="bg-neutral-600 rounded-md p-1 items-center">
                                                   OUT
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                                                <button id={item.To} onClick={GetAddress} className="truncate w-36" >
                                                    {item.To}
                                                </button>
                                                <button onClick={() => {
                                                    // @ts-ignore
                                                    Copy(`${item.To}`);}} className="text-neutral-600">
                                                    <i className="fa fa-clone mx-1" aria-hidden="true"></i>
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
                                <div>
                                    <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                                        <div className="flex text-black dark:text-white items-center">
                                            Show
                                            <div className="p-0.5 mx-1 rounded-md bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                                <select
                                                    id="location"
                                                    name="location"
                                                    className=" block  w-13   p-1 outline-none  text-base    sm:text-sm rounded-md text-black bg-white  dark:bg-black dark:text-white"
                                                    defaultValue="20"
                                                >
                                                    <option>20</option>
                                                    <option>50</option>
                                                    <option>100</option>
                                                </select>
                                            </div>
                                            Records

                                        </div>
                                        <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                                            <button
                                                onClick={firstPage}
                                                className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md   bg-W3GButtonColor/60 text-sm font-semibold  "
                                            >
                                                <span className="">First</span>
                                            </button>
                                            <button
                                                onClick={decPageCounter}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md  bg-W3GButtonColor/60 text-sm font-semibold "
                                            >
                                                <span className="sr-only">Previous</span>
                                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                            <div className="  hidden lg:inline-block   relative inline-flex items-center px-4 py-2 border-x border-neutral-600  dark:border-gray-200 bg-W3GButtonColor/60 text-sm font-semibold ">
                                                Page {extrinsicPageNumber} of {extrinsic_number_pages}
                                            </div>
                                            <button onClick={addPageCounter} className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-W3GButtonColor/60 text-sm font-semibold ">
                                                <span className="sr-only">Next</span>
                                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                            </button>
                                            <button
                                                onClick={lastPage}
                                                className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-W3GButtonColor/60 text-sm font-semibold "
                                            >
                                                <span className="">Last</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




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

        </>
    )
    }

const InternalTxns = () =>{
    const tokenstitle=[
        {
            title:"Parent Txn Hash"
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
    ]

    const extrinsic = [
        {
            TxhHash:"0x0c8ee83b555f0ede1a",
            Method:"0x741312312",
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
    // const extrinsic_number = props.data.extrinsicInfos.totalCount
    //
    let extrinsic_number_pages = (20 / 20)
    //
    //
    // if (extrinsic_number_pages > 500){
    //     extrinsic_number_pages = 500
    // }
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

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

    function closeModal() {
        setIsOpen(false)
    }

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
        router.push(`/evm_address/${value}`).then(r => {
            location.reload()
        })
    }


    return(
        <>
            <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                <div className=" min-w-full  ">
                    <div className="shadow overflow-auto  rounded-lg  border  dark:border-W3GInfoBorderBG">
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
                            <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                            {extrinsic.map(item => (
                                <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                                    <td className="px-4 py-4 whitespace-nowrap  font-medium text-blue-400  font-medium">
                                        <button id={item.TxhHash} onClick={GetHash} className="truncate w-36">
                                            {item.TxhHash}
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
                                        <button id={item.From} onClick={GetAddress} className="truncate w-36">
                                            {item.From}
                                        </button>
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.From}`);}} className="text-neutral-600">
                                            <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                        <div className="bg-green-300 rounded-full w-4 items-center">
                                            <i className={item.icon} aria-hidden="true"></i>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                                        <button id={item.To} onClick={GetAddress}  className="truncate w-36" >
                                            {item.To}
                                        </button>
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.To}`);}} className="text-neutral-600">
                                            <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                        {item.Value} W3G
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div>
                            <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                                <div className="flex text-black dark:text-white items-center">
                                    Show
                                    <div className="p-0.5 mx-1 rounded-md bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                        <select
                                            id="location"
                                            name="location"
                                            className=" block  w-13   p-1 outline-none  text-base    sm:text-sm rounded-md text-black bg-white  dark:bg-black dark:text-white"
                                            defaultValue="20"
                                        >
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    Records

                                </div>
                                <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                                    <button
                                        onClick={firstPage}
                                        className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md   bg-W3GButtonColor/60 text-sm font-semibold  "
                                    >
                                        <span className="">First</span>
                                    </button>
                                    <button
                                        onClick={decPageCounter}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md  bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <div className="  hidden lg:inline-block   relative inline-flex items-center px-4 py-2 border-x border-neutral-600  dark:border-gray-200 bg-W3GButtonColor/60 text-sm font-semibold ">
                                        Page {extrinsicPageNumber} of {extrinsic_number_pages}
                                    </div>
                                    <button onClick={addPageCounter} className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-W3GButtonColor/60 text-sm font-semibold ">
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={lastPage}
                                        className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="">Last</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




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

        </>
    )
}

const Erc20TokenTxns = () =>{
    const tokenstitle=[
        {
            title:"Txn Hash"
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
            title:"Token"
        },
    ]

    const extrinsic = [
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            Value: "99.1803",

            Token:"",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a3",
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
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a4",
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
            State:false,
            TxhHash:"0x0c8ee83b555f0ede1a5",
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
            State:false,
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
    // const extrinsic_number = props.data.extrinsicInfos.totalCount
    //
    let extrinsic_number_pages = (20 / 20)
    //
    //
    // if (extrinsic_number_pages > 500){
    //     extrinsic_number_pages = 500
    // }
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

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

    function closeModal() {
        setIsOpen(false)
    }

    const GetHash = (props) => {
        const value = props.target.id;
        router.push(`/evm_transactionsDetail/${value}`)
    }

    const GetAddress = (props) =>{
        const value = props.target.id;
        router.push(`/evm_address/${value}`).then(r => {
            location.reload()
        })
    }


    return(
        <>
            <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                <div className=" min-w-full  ">
                    <div className="shadow overflow-auto  rounded-lg  border  dark:border-W3GInfoBorderBG">
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
                            <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                            {extrinsic.map(item => (
                                <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                                    <td className="px-4 py-4 whitespace-nowrap   text-blue-400  font-medium">
                                        <div className="flex">
                                            <button id={item.TxhHash} onClick={GetHash} className="truncate w-36">
                                                {item.TxhHash}
                                            </button>

                                            <div className={classNames(item.State?"hidden":"text-red-400")}>
                                                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                            </div>
                                        </div>


                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                        {item.Age} secs ago
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                                        <button id={item.From} onClick={GetAddress}  className="truncate w-36">
                                            {item.From}
                                        </button>
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.From}`);}} className="text-neutral-600">
                                            <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                        <div className={classNames(item.State?"bg-green-300 ":"bg-red-400","rounded-md p-0.5")}>
                                            {classNames(item.State?"IN":"OUT")}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400  ">
                                        <button id={item.To} onClick={GetAddress}  className="truncate w-36" >
                                            {item.To}
                                        </button>
                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.To}`);}} className="text-neutral-600">
                                            <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                        {item.Value}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-400 ">
                                        <div className=" flex items-center">
                                            <img className="w-3 mr-1 rounded-full" src="/USDT.png" alt=""/>
                                            Tether USD (USDT)
                                        </div>

                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div>
                            <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                                <div className="flex text-black dark:text-white items-center">
                                    Show
                                    <div className="p-0.5 mx-1 rounded-md bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                        <select
                                            id="location"
                                            name="location"
                                            className=" block  w-13   p-1 outline-none  text-base    sm:text-sm rounded-md text-black bg-white  dark:bg-black dark:text-white"
                                            defaultValue="20"
                                        >
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    Records

                                </div>
                                <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                                    <button
                                        onClick={firstPage}
                                        className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md   bg-W3GButtonColor/60 text-sm font-semibold  "
                                    >
                                        <span className="">First</span>
                                    </button>
                                    <button
                                        onClick={decPageCounter}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md  bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <div className="  hidden lg:inline-block   relative inline-flex items-center px-4 py-2 border-x border-neutral-600  dark:border-gray-200 bg-W3GButtonColor/60 text-sm font-semibold ">
                                        Page {extrinsicPageNumber} of {extrinsic_number_pages}
                                    </div>
                                    <button onClick={addPageCounter} className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-W3GButtonColor/60 text-sm font-semibold ">
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={lastPage}
                                        className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="">Last</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




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

        </>
    )
}

const Erc721TokenTxns = () =>{
    const tokenstitle=[
        {
            title:"Txn Hash"
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
            title:"Token ID"
        },

        {
            title:"Token"
        },
        {
            title:"Details"
        }
    ]

    const extrinsic = [
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            Value: "99.1803",
            TokenID:"4153",
            Token:"",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a3",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a4",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a5",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a7",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },



    ]
    // const extrinsic_number = props.data.extrinsicInfos.totalCount
    //
    let extrinsic_number_pages = (20 / 20)
    //
    //
    // if (extrinsic_number_pages > 500){
    //     extrinsic_number_pages = 500
    // }
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

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

    function closeModal() {
        setIsOpen(false)
    }

    const GetHash = (props) => {
        const value = props.target.id;
        router.push(`/evm_transactionsDetail/${value}`)
    }

    const GetAddress = (props) =>{
        const value = props.target.id;
        router.push(`/evm_address/${value}`).then(r => {
            location.reload()
        })
    }


    return(
        <>
            <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                <div className=" min-w-full  ">
                    <div className="shadow overflow-auto  rounded-lg  border  dark:border-W3GInfoBorderBG">
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
                            <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                            {extrinsic.map(item => (
                                <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                                    <td className="px-4 py-4 whitespace-nowrap   text-blue-400  font-medium">
                                        <div className="flex">
                                            <button id={item.TxhHash} onClick={GetHash} className="truncate w-36">
                                                {item.TxhHash}
                                            </button>

                                            <div className={classNames(item.State?"hidden":"text-red-400")}>
                                                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                            </div>
                                        </div>


                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                        {item.Age} secs ago
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-blue-400   font-medium">
                                        <button id={item.From} onClick={GetAddress}  className="truncate w-36">
                                            {item.From}
                                        </button>
                                    </td>
                                    <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                        <div className={classNames(item.State?"bg-green-300 ":"bg-red-400","rounded-md p-0.5 px-2")}>
                                            {classNames(item.State?"IN":"OUT")}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-500 dark:text-zinc-300  ">

                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.To}`);}} className="text-neutral-600">
                                            <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                        </button>
                                        <button id={item.To}   className="truncate w-36" >
                                            Tether: USDT Stablecoin
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-blue-400 ">
                                        {item.TokenID}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  text-blue-400 ">
                                        <div className=" flex items-center">
                                            <img className="w-3 mr-1 rounded-full" src="/USDT.png" alt=""/>
                                            ERC-721: Hip...ids
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-zinc-300">

                                    <div className=" bg-neutral-600 p-1.5 rounded-md flex">
                                        View NFT
                                        <div className="ml-1">
                                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div>
                            <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                                <div className="flex text-black dark:text-white items-center">
                                    Show
                                    <div className="p-0.5 mx-1 rounded-md bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                        <select
                                            id="location"
                                            name="location"
                                            className=" block  w-13   p-1 outline-none  text-base    sm:text-sm rounded-md text-black bg-white  dark:bg-black dark:text-white"
                                            defaultValue="20"
                                        >
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    Records

                                </div>
                                <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                                    <button
                                        onClick={firstPage}
                                        className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md   bg-W3GButtonColor/60 text-sm font-semibold  "
                                    >
                                        <span className="">First</span>
                                    </button>
                                    <button
                                        onClick={decPageCounter}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md  bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <div className="  hidden lg:inline-block   relative inline-flex items-center px-4 py-2 border-x border-neutral-600  dark:border-gray-200 bg-W3GButtonColor/60 text-sm font-semibold ">
                                        Page {extrinsicPageNumber} of {extrinsic_number_pages}
                                    </div>
                                    <button onClick={addPageCounter} className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-W3GButtonColor/60 text-sm font-semibold ">
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={lastPage}
                                        className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="">Last</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

        </>
    )
}

const Erc1155TokenTxns = () =>{
    const tokenstitle=[
        {
            title:"Txn Hash"
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
            title:"Token ID"
        },
        {
            title:"Value"
        },
        {
            title:"Token"
        },
        {
            title:"Details"
        }
    ]

    const extrinsic = [
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            Value: "99.1803",
            TokenID:"4153",
            Token:"",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a3",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a4",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a5",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },
        {
            State:true,
            TxhHash:"0x0c8ee83b555f0ede1a7",
            Method:"Mint",
            Block:"15313963",
            Age:"9",
            From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            icon: "fa fa-arrow-right",
            To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
            TokenID:"4153",
            Value: "0",
            TxnFee: "0.00064646"
        },



    ]
    // const extrinsic_number = props.data.extrinsicInfos.totalCount
    //
    let extrinsic_number_pages = (20 / 20)
    //
    //
    // if (extrinsic_number_pages > 500){
    //     extrinsic_number_pages = 500
    // }
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

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

    function closeModal() {
        setIsOpen(false)
    }

    const GetHash = (props) => {
        const value = props.target.id;
        router.push(`/evm_transactionsDetail/${value}`)
    }

    const GetAddress = (props) =>{
        const value = props.target.id;
        router.push(`/evm_address/${value}`).then(r => {
            location.reload()
        })
    }


    return(
        <>
            <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                <div className=" min-w-full  ">
                    <div className="shadow overflow-auto  rounded-lg  border  dark:border-W3GInfoBorderBG">
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
                            <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                            {extrinsic.map(item => (
                                <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                                    <td className="px-4 py-4 whitespace-nowrap   text-blue-400  font-medium">
                                        <div className="flex">
                                            <button id={item.TxhHash} onClick={GetHash} className="truncate w-36">
                                                {item.TxhHash}
                                            </button>

                                            <div className={classNames(item.State?"hidden":"text-red-400")}>
                                                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                            </div>
                                        </div>


                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                        {item.Age} secs ago
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap  text-blue-400   font-medium">
                                        <button id={item.From} onClick={GetAddress}  className="truncate w-36">
                                            {item.From}
                                        </button>
                                    </td>
                                    <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                        <div className={classNames(item.State?"bg-green-300 ":"bg-red-400","rounded-md p-0.5 px-2")}>
                                            {classNames(item.State?"IN":"OUT")}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-500 dark:text-zinc-300  ">

                                        <button onClick={() => {
                                            // @ts-ignore
                                            Copy(`${item.To}`);}} className="text-neutral-600">
                                            <i className="fa fa-clone mx-1" aria-hidden="true"></i>
                                        </button>
                                        <button id={item.To}  className="truncate w-36" >
                                            Tether: USDT Stablecoin
                                        </button>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-blue-400 ">
                                        {item.TokenID}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                        {item.Value}
                                    </td>


                                    <td className="px-6 py-4 whitespace-nowrap  text-blue-400 ">
                                        <div className=" flex items-center">
                                            <img className="w-3 mr-1 rounded-full" src="/USDT.png" alt=""/>
                                            ERC-721: Hip...ids
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-zinc-300">

                                        <div className=" bg-neutral-600 p-1.5 rounded-md flex">
                                            View NFT
                                            <div className="ml-1">
                                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div>
                            <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                                <div className="flex text-black dark:text-white items-center">
                                    Show
                                    <div className="p-0.5 mx-1 rounded-md bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                        <select
                                            id="location"
                                            name="location"
                                            className=" block  w-13   p-1 outline-none  text-base    sm:text-sm rounded-md text-black bg-white  dark:bg-black dark:text-white"
                                            defaultValue="20"
                                        >
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>
                                    Records

                                </div>
                                <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                                    <button
                                        onClick={firstPage}
                                        className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md   bg-W3GButtonColor/60 text-sm font-semibold  "
                                    >
                                        <span className="">First</span>
                                    </button>
                                    <button
                                        onClick={decPageCounter}
                                        className="relative inline-flex items-center px-2 py-2 rounded-l-md  bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <div className="  hidden lg:inline-block   relative inline-flex items-center px-4 py-2 border-x border-neutral-600  dark:border-gray-200 bg-W3GButtonColor/60 text-sm font-semibold ">
                                        Page {extrinsicPageNumber} of {extrinsic_number_pages}
                                    </div>
                                    <button onClick={addPageCounter} className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-W3GButtonColor/60 text-sm font-semibold ">
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={lastPage}
                                        className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-W3GButtonColor/60 text-sm font-semibold "
                                    >
                                        <span className="">Last</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




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

        </>
    )
}

const  AddressTitle =() => {
   const Title = [
       {
           title:"Transactions"
       },
       {
           title:"Internal Txns"
       },
       {
           title:"Erc20 Token Txns"
       },
       {
           title:"Erc721 Token Txns"
       },
       {
           title:"Erc1155 Token Txns"
       },
   ]

    return (
        <div className="w-full  p-2 sm:px-0">
            <Tab.Group>
                <Tab.List className="grid grid-cols-5 gap-4  rounded-xl bg-white dark:bg-W3GInfoBG p-1">
                    {Title.map((items) => (
                        <div   key={items.title} className="flex mx-auto flex justify-between items-center">
                        <Tab

                            className={({ selected }) =>
                                classNames(
                                    'w-full  py-2.5  font-medium leading-5  text-gray-400 outline-none ',
                                    selected
                                        ? ' bg-clip-text text-transparent  bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3 border-b'
                                        : '  hover:text-gray-500 dark:hover:text-white'
                                )
                            }
                        >
                            <div className="">
                                {items.title}
                            </div>

                        </Tab>
                        </div>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">

                        <Tab.Panel>
                                <Transactions/>
                        </Tab.Panel>

                    <Tab.Panel>
                        <InternalTxns/>
                    </Tab.Panel>

                    <Tab.Panel>
                    <Erc20TokenTxns/>
                    </Tab.Panel>

                    <Tab.Panel>
                    <Erc721TokenTxns/>
                    </Tab.Panel>

                    <Tab.Panel>
                    <Erc1155TokenTxns/>
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

const EVMAddress=()=>{
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(token[0])
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [BlockPageNumber,] = useAtom(BlockPageNumberValue)
    const [number,setNumber] = useState("")

    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            const number = router.query.pid
            // @ts-ignore
            setNumber(number)
            console.log(number)
        }
    },[router.isReady])

    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:(BlockPageNumber - 1) * 20
        },
    })
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

                            <div className=" my-2 lg:my-0 text-3xl font-bold text-black dark:text-white  flex items-center">
                                Address
                                <div className="text-gray-600 text-base ml-4 mt-2" id={number}>
                                    #{number}
                                </div>
                                <div className="text-xs mt-2">
                                <button onClick={() => {
                                    // @ts-ignore
                                    Copy(`${number}`);}} >
                                    <i className="fa fa-clone mx-1 " aria-hidden="true"></i>
                                </button>
                                </div>
                            </div>
                        </div>

                        <div className="my-5  bg-white dark:bg-W3GInfoBG rounded-lg border dark:border-W3GInfoBorderBG ">
                            <div className=" min-w-full  dark:text-neutral-300 ">
                                <div className="flex  text-xl font-semibold items-center p-5 border-b dark:border-W3GInfoBorderBG rounded-t-lg">
                                    <div className="text-black dark:text-white">
                                        Overview
                                    </div>
                                </div>
                                <div className="text-black dark:text-white  text-sm ">
                                        <div  className="divide-y divide-gray-200 dark:divide-W3GInfoBorderBG px-5  items-center">
                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                   Balance:
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                            {overview.reward} W3G
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                  Ether Value：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <div className="text-gray-800  dark:text-white md:flex items-center " >
                                                        {overview.gasUsed}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                                <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                                  Token：
                                                </div>
                                                <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                                    <Listbox value={selected} onChange={setSelected}>
                                                        {({ open }) => (
                                                            <>
                                                                <div className="mt-1 relative">
                                                                    <Listbox.Button className="relative w-72 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-W3GInfoBorderBG rounded-md shadow-sm pl-3 pr-10 py-2 outline-none text-left cursor-default  sm:text-sm">
                                                                        <span className="flex items-center">
                                                                            {/*<img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />*/}
                                                                            <span className="ml-3 block truncate">{selected.name}</span>
                                                                        </span>
                                                                        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                                    </Listbox.Button>

                                                                    <Transition
                                                                        show={open}
                                                                        as={Fragment}
                                                                        leave="transition ease-in duration-100"
                                                                        leaveFrom="opacity-100"
                                                                        leaveTo="opacity-0"
                                                                    >
                                                                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-500 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                            {token.map((person) => (
                                                                                <Listbox.Option
                                                                                    key={person.id}
                                                                                    className={({ active }) =>
                                                                                        classNames(
                                                                                            active ? 'text-white bg-indigo-600 dark:bg-neutral-700' : 'text-gray-900',
                                                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                                        )
                                                                                    }
                                                                                    value={person}
                                                                                >
                                                                                    {({ selected, active }) => (
                                                                                        <>
                                                                                            <div className="flex items-center">
                                                                                                {/*<img src={person.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />*/}
                                                                                                <span
                                                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                                                >
                                                                                                    {person.name}
                                                                                                </span>
                                                                                            </div>

                                                                                            {selected ? (
                                                                                                <span
                                                                                                    className={classNames(
                                                                                                        active ? 'text-white' : 'text-indigo-600 dark:text-neutral-700 ',
                                                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                    )}
                                                                                                >
                                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                </span>
                                                                                            ) : null}
                                                                                        </>
                                                                                    )}
                                                                                </Listbox.Option>
                                                                            ))}
                                                                        </Listbox.Options>
                                                                    </Transition>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Listbox>

                                                </div>
                                            </div>


                                        </div>
                                </div>


                            </div>
                        </div>

                        <AddressTitle/>
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
export default EVMAddress
