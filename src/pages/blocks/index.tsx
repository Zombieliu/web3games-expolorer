import React, {Fragment, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import Sort from "../../components/sort";
import { message, Button, Space } from 'antd';
import {CheckCircleIcon, XIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";

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
        title:"Time",
        i:"fa fa-clock-o ml-1"
    },
    {
        title:"Result"
    },
    {
        title:"Signer By"
    },
    {
        title:"Weight (W3G)"
    },
]
const Tokens=[
    {
        signature:"QjBU7PxTTGnGuQGpm7KC18wMQ.....",
        asignature:"",
        block:"0xa2285..e6b7b8238e",
        ablock:"",
        time:"13 minutes ago",
        instructions:"Success",
        by:"System",
        aby:"",
        fee:"0.0005",


    },
]
const overview=[
    {
        block:"#28286",
        timestamp:"13 minutes ago",
        UTCtime:"February 22, 2022 12:58:53 PM ",
        blockhash:"57jhBBbH98QEPDaRY8nrSPXitHJQv9YU1PmToKA4XZm4",
        address:"6TkKqq15wXjqEjNg9zqTKADwuVATR9dW3rkNnsYme1ea",
        reward:"0.0029575 W3G ($0.2510)",
        transactions:"1",
        previous:"ED1rmKttuGH1pBiq8hLoHRFhqjhK7uaPmqYYJvzdXy9m",
        Extrinsics:"5Eeh22xf25G6qtgFhBZJYCorYKPVVtQKGkLUd9RQLYfcruhb",
        State:"5EUeR5dYRtLx252PrXvqaVLXpMND6oSbdL1Rme5FBKyeGTC4"
    }
]

const Blocks=()=>{
    let [isOpen, setIsOpen] = useState(false)
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
    return(


        <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">

            <Header></Header>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-20 mb-14">
                    <div className="mx-auto lg:flex justify-between ">

                        <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                            Block Details
                        </div>
                        <div className="flex ">
                            <input type="text"
                                   className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white dark:border-gray-500 dark:bg-gray-700 outline-none"
                                   placeholder="Search transactions, blocks, programs and token"
                            />
                            <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 -ml-11">
                                <i className="fa fa-search" aria-hidden="true"></i></div>


                        </div>

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
                                                 {item.blockhash}
                                             </div>
                                         </div>
                                         <div className="md:flex  my-3">
                                             <div className="font-semibold lg:font-medium w-60 mr-32">
                                                 Parent Block Hash
                                             </div>
                                             <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                 {item.previous}
                                             </div>
                                         </div>
                                         <div className="md:flex  my-3">
                                             <div className="font-semibold lg:font-medium w-60 mr-32">
                                                 Extrinsics Hash
                                             </div>
                                             <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                 {item.Extrinsics}
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
                                         <div className="md:flex  my-3">
                                             <div className="font-semibold lg:font-medium w-60 mr-32">
                                                 Weight
                                             </div>
                                             <div className="text-gray-800">
                                                 {item.reward}
                                             </div>
                                         </div>
                                         <div className="md:flex   my-3">
                                             <div className="font-semibold lg:font-medium w-60 mr-32">
                                                 Extrinsics
                                             </div>
                                             <div className="md:flex text-gray-800">

                                                 <div className="flex ">
                                                     <div>Total</div>
                                                     <div className=" mx-1   font-semibold">{item.transactions}</div>
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
                                                    <i className={title.i} aria-hidden="true"></i>
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-300 divide-y divide-gray-200">
                                            {Tokens.map(token=>(
                                                <tr key={token.signature} className="hover:bg-gray-200" >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                        <Link href="/extrinsics">{token.signature}</Link>
                                                    </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium font-medium ">
                                                    {token.block}
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                                    {token.time}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {token.instructions}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base ">

                                                    <button onClick={() => {
                                                        // @ts-ignore
                                                        Copy("by");
                                                    }}><i className="fa fa-clone mr-1  " aria-hidden="true"></i>
                                                    </button>
                                                    <Link href={token.aby}>
                                                    <a  className="text-blue-400" id="by">
                                                        {token.by}</a></Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                                                    {token.fee}
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
export default Blocks
