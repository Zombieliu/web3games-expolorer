import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {router} from "next/client";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, extrinsicPageNumberValue, SelectNumber} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";


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
        title:"Extrinsic ID"
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
      extrinsicHash{
        extrinsicHeight
        id
      signerId
        }
      }
    totalCount
  }
}
`

class extrinsicInfo {
    private id: string;
    private action: string;
    private time: string;
    private idx: string;
    private hash : string;
    private signerId: string;


    constructor(
        id:string,
        action:string,
        time:string,
        idx:string,
        hash:string,
        signerId:string,

    ) {
        this.id = id
        this.action = action
        this.time = time
        this.idx = idx
        this.hash = hash
        this.signerId = signerId

    }
}

function GetBlockData(blockTime) {
    const start = new Date(blockTime).toUTCString();
    return `${start}`
}

function data_list(data: any){
    let times = data.events.nodes.length;
    let data_list = [];
    for (let i = 0;i < times;i++){
        if (data.events.nodes[i].signerId == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"){
            let result = new extrinsicInfo(
                data.events.nodes[i].id,
                `${data.events.nodes[i].module}.${data.events.nodes[i].method}`,
                GetBlockData(data.events.nodes[i].timestamp),
                data.events.nodes[i].extrinsicHash.extrinsicHeight,
                data.events.nodes[i].extrinsicHash.id,

                // data.events.nodes[i].signerId,
                "system",

            )
            data_list.push(result)
        }else{
            let result = new extrinsicInfo(

                data.events.nodes[i].id,
                `${data.events.nodes[i].module}.${data.events.nodes[i].method}`,

                GetBlockData(data.events.nodes[i].timestamp),
                data.events.nodes[i].extrinsicHash.extrinsicHeight,
                data.events.nodes[i].extrinsicHash.id,
                data.events.nodes[i].extrinsicHash.signerId,
            )
            data_list.push(result)
        }
    }
    return data_list
}

const Sort=(props:any)=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
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

    const extrinsic_number = props.data.events.totalCount

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

    return(
        <div>
            <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                <div className="flex text-black dark:text-white items-center">
                    Show
                    <div className="p-0.5 mx-1 rounded-md bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                        <select
                            onChange={Select}
                            id="select"
                            className=" block  w-13   p-1 outline-none  text-base    sm:text-sm rounded-md text-black bg-white  dark:bg-black dark:text-white"
                            defaultValue={select_number}
                        >
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
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
    )
}

const Transactions=()=> {
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [extrinsicPageNumber,] = useAtom(extrinsicPageNumberValue)
    const [selectNumber,] = useAtom(SelectNumber)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])



    let [isOpen, setIsOpen] = useState(false)


    const {loading, error, data}: any = useQuery(Block_Info, {
        variables:{
            select:selectNumber,
            first:(extrinsicPageNumber - 1) * selectNumber
        },
    })

    const Copy = (span) => {

        const spanText = document.getElementById(span).innerText;
        const oInput = document.createElement('input');
        oInput.value = spanText;
        document.body.appendChild(oInput);
        oInput.select();
        document.execCommand('Copy');
        oInput.className = 'oInput';
        oInput.style.display = 'none';
        document.body.removeChild(oInput);
        if (oInput) {

            setIsOpen(true)
        }
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const GetEventDetails = (props) => {
        const value = props.target.id;
        router.push(`/event/${value}`)
    }

    async function getAccount(e){
        await router.push(`/account/${e.target.id}`)
    }

    if (loading) {
        return (
            <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                <DetailsSkeleton/>
            </div>
        )
    }

    if (error) {
        console.log(error)
        return (
            <div>
                <Error/>
            </div>
        )

    }

    if (data) {
        console.log(data)
        const extrinsic = data_list(data)
        return (
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG  transition duration-700">

                <Header></Header>
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
                        <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
                            <div className=" min-w-full   ">
                                <div className="shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
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
                                            <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 divide-x divide-gray-200 dark:divide-W3GInfoBorderBG">
                                                <td className="px-7 py-4 whitespace-nowrap text-sm font-medium  text-blue-400 font-medium ">
                                                    <button id={item.id}  onClick={GetEventDetails}>
                                                        {item.id}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-zinc-300  font-medium ">
                                                       <div className="w-52  truncate">
                                                        {item.action}
                                                       </div>
                                                </td>
                                                <td className="px-6 py-4 w-12 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    <div className="  ">
                                                        {item.time}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-zinc-300">
                                                    <div className="w-20">
                                                        {item.idx}
                                                    </div>

                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    <div className="w-44  truncate">
                                                        {item.hash}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    <div className="w-44  truncate">
                                                        {item.signerId}
                                                    </div>
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
export default Transactions
