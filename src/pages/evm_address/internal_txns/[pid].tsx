import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {AccountValue, BlockPageNumberValue, DarkModeAtom, extrinsicPageNumberValue, SelectNumber} from "../../../jotai";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition} from "@headlessui/react";
import Header from "../../../components/header";
import EVMAddress from "../../../components/evm_address_overview";
import Tail from "../../../components/tail";
import {showSmallAccount} from "../../../utils";
import Heads from "../../../components/head";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Sort=(props:any)=>{


    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [BlockPageNumber,SetBlockPageNumber] = useAtom(BlockPageNumberValue)
    const [select_number,setSelect_number] = useAtom(SelectNumber)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])



    // const block_number:number = props.data.accounts.totalCount
    const block_number:number = 1


    const Select = (e) =>{
        setSelect_number(Number(e.target.value))
        SetBlockPageNumber(1)
    }

    let block_number_pages:number = Math.ceil(block_number / select_number)

    if (block_number_pages > 500){
        block_number_pages = 500
    }

    const addPageCounter = async ()=>{
        if (BlockPageNumber != block_number_pages){
            SetBlockPageNumber(BlockPageNumber + 1)
        }

    }

    const decPageCounter = ()=>{
        if (BlockPageNumber != 1){
            SetBlockPageNumber(BlockPageNumber - 1)
        }
    }

    const lastPage = ()=>{
        SetBlockPageNumber(block_number_pages)
    }

    const firstPage = ()=>{
        SetBlockPageNumber(1)
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
                        Page {BlockPageNumber} of {block_number_pages}
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

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [account,setAccount] = useAtom(AccountValue)
    useEffect(()=>{
        const {pid} = router.query;
        setAccount(`${pid}`)
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
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG  transition duration-700">
                <Heads/>
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <EVMAddress/>
                    <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                        <div className=" min-w-full  ">
                            <div className="shadow overflow-auto bg-white dark:bg-W3GInfoBG  rounded-lg  border  dark:border-W3GInfoBorderBG">
                                <table className="min-w-full border-b divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                    <thead className="text-gray-500 dark:text-neutral-300">
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
                                                <button id={item.TxhHash} onClick={GetHash}>
                                                    {classNames(showSmallAccount(item.TxhHash,))}
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
                                                <button id={item.From} onClick={GetAddress} >
                                                    {classNames(showSmallAccount(item.From,))}
                                                </button>
                                                <button onClick={() => {
                                                    // @ts-ignore
                                                    Copy(`${item.From}`);}} className="text-neutral-600">
                                                     <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                                </button>
                                            </td>
                                            <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                                                <div className="bg-green-300 rounded-full w-4 items-center">
                                                    <i className={item.icon} aria-hidden="true"></i>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                                                <button id={item.To} onClick={GetAddress}>

                                                    {classNames(showSmallAccount(item.To,))}
                                                </button>
                                                <button onClick={() => {
                                                    // @ts-ignore
                                                    Copy(`${item.To}`);}} className="text-neutral-600">
                                                     <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                                                {item.Value} W3G
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <Sort ></Sort>
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



        </>
    )
}

export default InternalTxns
