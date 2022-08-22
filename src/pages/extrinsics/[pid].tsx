import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import { Dialog,Transition } from '@headlessui/react';
import { CheckCircleIcon} from '@heroicons/react/solid';
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, darkModeImg, EventValue} from "../../jotai";
import {useManualQuery } from 'graphql-hooks'
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
        title:"Action",
    },
]



const Extrinsics_Info = `
 query HomePage($Extrinsics: String) {
  eventInfos(filter:{
    extrinsicHashId:{
      equalTo:$Extrinsics
    }
  }){
    nodes{
      id
      eventID
      method
      section
      meta
      data
      extrinsicHash{
        id
        signerId
        meta
      }
    }
  }
}
`


class EventInfo {
    private id:string
    private eventid: string;
    private action: string;
    private by: string;
    private fee: string;

    constructor(
        id:string,
        eventid:string,
        action:string,
        by:string,
        fee:string,
    ) {
        this.id = id
        this.eventid = eventid
        this.action = action
        this.by = by
        this.fee = fee
    }
}

function weight_check(data: any){
    let len = data.eventInfos.nodes.length - 1;
    let result = JSON.parse(data.eventInfos.nodes[len].data)[0].weight
    return `${result}`

}


function data_list(data: any){
    let times = data.eventInfos.nodes.length;
    // console.log(times)
    let data_list = [];
    for (let i = 0;i < times;i++){
        // if (data.extrinsicInfos.nodes[i].signerId == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"){
        //     let result = new extrinsicInfo(
        //         data.extrinsicInfos.nodes[i].extrinsicHeight,
        //         data.extrinsicInfos.nodes[i].id,
        //         data.extrinsicInfos.nodes[i].nonce,
        //         data.extrinsicInfos.nodes[i].success,
        //         "system",
        //         data.extrinsicInfos.nodes[i].signerId,
        //     )
        //     data_list.push(result)
        // }else{
        //     let result = new extrinsicInfo(
        //         data.extrinsicInfos.nodes[i].extrinsicHeight,
        //         data.extrinsicInfos.nodes[i].id,
        //         data.extrinsicInfos.nodes[i].nonce,
        //         data.extrinsicInfos.nodes[i].success,
        //         data.extrinsicInfos.nodes[i].signerId,
        //         data.extrinsicInfos.nodes[i].signerId,
        //     )
        //     data_list.push(result)
        // }

        let result = new EventInfo(
            data.eventInfos.nodes[i].id,
            data.eventInfos.nodes[i].eventID,
            `${data.eventInfos.nodes[i].section}.${data.eventInfos.nodes[i].method}`,
            "alice",
            "0.005"
        )
        data_list.push(result)
    }
    return data_list
}

function data_type(data:any){
    let Data = [];
    const times = JSON.parse(data.eventInfos.nodes[0].extrinsicHash.meta).fields.length
    for (let i =0;i<times;i++){
        let content = {
            id : i ,
            Name : `${JSON.parse(data.eventInfos.nodes[i].extrinsicHash.meta).fields[i].name}`,
            Type : `${JSON.parse(data.eventInfos.nodes[i].extrinsicHash.meta).fields[i].typeName}`,
            Data : `${JSON.parse(data.eventInfos.nodes[i].extrinsicHash.meta).fields[i].type}`,

        }
        Data.push(content)
    }
    return Data

}



const Overview = (props:any) => {
    console.log(props)
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

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

    const Data = data_type(props.data)
    const weight = weight_check(props.data)
    const overview = [
                {
                    extrinsic: `${JSON.parse(props.data.eventInfos.nodes[0].extrinsicHash.meta).name}`,
                    signature: props.data.eventInfos.nodes[0].extrinsicHash.signerId,
                    extrinsic_hash: props.data.eventInfos.nodes[0].extrinsicHash.id,
                    weight,
                    events: props.data.eventInfos.nodes.length,
                }
            ]
    return(
        <>
            <div className="mx-auto lg:flex justify-between ">

                <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold text-gray-700 dark:text-gray-300">
                    Extrinsics Details
                </div>
            </div>
            <div className="mt-5">
                <div className="my-5  bg-white dark:bg-neutral-800 rounded-lg  ">
                    <div className="py-5 min-w-full  p-5 dark:text-gray-200">
                        <div className="flex my-5 text-xl font-semibold text-gray-700 dark:text-gray-100">
                            <div>
                                Overview
                            </div>
                        </div>
                        <div className="text-gray-400 text-sm dark:text-gray-300">
                            {overview.map(item => (
                                <div key={item.extrinsic}>
                                    <div className="md:flex  justify-between lg:justify-start my-3 ">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Extrinsic Name
                                        </div>
                                        <div className="text-gray-800 dark:text-white" id="block">
                                            {item.extrinsic}
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Signer
                                        </div>
                                        <div id={item.signature}
                                             className="text-gray-800 dark:text-white text-xs lg:text-sm  break-words">
                                            {item.signature} &nbsp;
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.signature}`);
                                            }}>
                                                <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60  mr-32">
                                            extrinsic_hash
                                        </div>
                                        <div id={item.extrinsic_hash}
                                             className="text-gray-800  dark:text-white text-xs lg:text-sm  break-words">
                                            {item.extrinsic_hash} &nbsp;
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.extrinsic_hash}`);
                                            }}>
                                                <i className="fa fa-clone mt-1" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Weight
                                        </div>
                                        <div className="text-gray-800 dark:text-white">
                                            {item.weight}
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32 ">
                                            Events
                                        </div>
                                        <div className="md:flex text-gray-800 dark:text-white">

                                            <div className="flex ">
                                                <div>Total</div>
                                                <div className=" mx-1   font-semibold">{item.events}</div>
                                                <div>Events</div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start  my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Parameters
                                        </div>

                                        <div className=" bg-white dark:bg-neutral-800 rounded-lg mt-2 md:mt-0 w-full xl:w-6/12">
                                            <div className="overflow-y-auto h-44 w-full">
                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-500">
                                                    <thead className="bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-300">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1 text-left text-sm font-semibold   "
                                                        >
                                                            #
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1  text-left text-sm font-semibold   "
                                                        >
                                                            Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1 text-left text-sm font-semibold   "
                                                        >
                                                            Type
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1 text-left text-sm font-semibold   "
                                                        >
                                                            Data
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                        <tbody
                                                            className="bg-white dark:bg-neutral-700 text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-neutral-500">
                                                        {Data.map(item => (
                                                            <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                                    {item.id}
                                                                </td>
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                    {item.Name}
                                                                </td>
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                    {item.Type}
                                                                </td>
                                                                <td className="px-6 py-1 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                                                                    {item.Data}
                                                                </td>
                                                            </tr>

                                                        ))}
                                                        </tbody>
                                                    </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>))}
                        </div>

                    </div>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-40  "
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
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
                                className="inline-block  text-center max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                                <div className="flex justify-center">
                                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true"/>
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Copy successfully !
                                </Dialog.Title>

                                {/*<div className="mt-4">*/}
                                {/*    <button*/}
                                {/*        type="button"*/}
                                {/*        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"*/}
                                {/*        onClick={closeModal}*/}
                                {/*    >*/}
                                {/*        Got it, thanks!*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )

}


const Events = (props) =>{
    const router = useRouter()

    const Events = data_list(props.data)

    const GetEvent = (props) => {
        const value = props.target.id;
        router.push(`/event/${value}`)
    }

        return(
            <>
                <div className="py-2 min-w-full  p-5 dark:text-gray-200">
                    <div className="flex my-5 text-xl font-semibold text-gray-700 dark:text-gray-300">
                            Events
                    </div>
                    <div className="shadow overflow-auto    sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-500">
                            <thead className="bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-300">
                            <tr>
                                {tokenstitle.map(title=>(
                                    <th key={title.title}
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold   "
                                    >
                                        {title.title}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-neutral-700 text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-neutral-500">
                            {Events.map(Events=>(
                                <tr key={Events.eventid} className="hover:bg-gray-200 dark:hover:bg-neutral-600" >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium font-medium">
                                        <button id={Events.id} onClick={GetEvent}>
                                            {Events.eventid}
                                        </button>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {Events.action}
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                        </table>
                    </div>

                    {/*<Sort/>*/}
                </div>
            </>
        )
}

const Extrinsics=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [Extrinsics, SetExtrinsicInfo] = useState("")

    useEffect(()=>{
        if (router.isReady){
            const pid = router.query.pid
            SetExtrinsicInfo(`${pid}`)
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])


    const{loading,error,data}: any = useQuery(Extrinsics_Info,{
        variables:{
            Extrinsics
        }
    })

    if (loading){
        return(
            <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                <DetailsSkeleton/>
            </div>
        )
    }

    if(error){
        return(
            <Error/>
        )

    }

    if(data.eventInfos.nodes.length == 0){
        return (
            <Error/>
        )
    }else{
        return(
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG transition duration-700">
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-14">
                        <Overview data={data}/>
                        <div className="mt-5">
                            <div className="my-5 overflow-x-auto bg-white dark:bg-neutral-800 rounded-lg ">
                                <Events data={data}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Tail></Tail>
            </div>
        )
    }


}
export default Extrinsics
