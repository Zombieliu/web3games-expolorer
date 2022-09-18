import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import { Dialog,Transition } from '@headlessui/react';
import { CheckCircleIcon} from '@heroicons/react/solid';
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom,  EventValue} from "../../jotai";
import {useManualQuery } from 'graphql-hooks'
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import Link from "next/link";
import {log} from "util";

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




const Event_Info = `
 query HomePage($Event: String) {
   events(filter:{
    id:{
      equalTo:$Event
    }
  }){
  nodes{
    id
    idx
    module
    method
    data
    extrinsicHash
}
  }
}
`
const Extrinsic_Hash =`
query HomePage_Hash($ExtrinsicHash: String){
    extrinsicInfos(filter:{
    id:{
      equalTo:$ExtrinsicHash
    }
  }){
       nodes{ 
        id
    signerId
    meta
    }
  }
}
`




function weight_check(data: any ,data2: any){
    console.log(data)
    // let len = data2.extrinsicInfos.nodes.length - 1;
    let result = JSON.parse(data.events.nodes[0].data)[0].weight
    return `${result}`

}




// function data_type(data:any){
//     let Data = [];
//     const times = JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields.length
//     // console.log(JSON.parse(data.events.nodes[0].extrinsicHash.meta))
//     for (let i =0;i<times;i++){
//         let content = {
//             id : i ,
//             Name : `${JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields[i].name}`,
//             Type : `${JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields[i].typeName}`,
//             Data : `${JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields[i].type}`,
//
//         }
//         Data.push(content)
//     }
//     // let content = {
//     //             id : 0 ,
//     //             Name : `1`,
//     //             Type : `2`,
//     //             Data : `3`,
//     //
//     //         }
//     //         Data.push(content)
//
//     return Data
//
// }


const Extrinsics=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)


    const [event_Info] = useManualQuery(Event_Info)
    const [extrinsic_Hash] = useManualQuery(Extrinsic_Hash)

    const OverviewType={
        extrinsic: "",
        signature: "",
        extrinsic_hash: "",
        weight:"",
        events: "data2.extrinsicInfos.nodes.length"
    }
    const [overview,setOverview] =useState(OverviewType)
    const dataType = [
        {
            hash:"",
            id:"",
            Name:"",
            Type:"",
            Data:"",
            action:"",

        }
    ]
    const [data,SetData ]= useState(dataType)
    const OverviewDate =[
        {
            id : "" ,
            Name : "",
            Type : "",
            Data : "",
        }
    ]
    const [overviewDate,setOverviewDate] =useState(OverviewDate)
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



    useEffect(()=>{
        if (router.isReady){
            const id = router.query.slug[1]
            const hash = router.query.slug[0];
            const query = async ()=> {
                const data = await (await QueryEvent_Info(id)).data
                const data2 = await (await QueryExtrinsic_Hash(hash)).data
                console.log(data,data2)
                const weight = weight_check(data,data2)
                const overview =
                    {
                        extrinsic: `${JSON.parse(data2.extrinsicInfos.nodes[0].meta).name}`,
                        signature: data2.extrinsicInfos.nodes[0].signerId,
                        extrinsic_hash: data2.extrinsicInfos.nodes[0].id,
                        weight,
                        events: data2.extrinsicInfos.nodes.length,
                    }

                    setOverview(overview)

                let overviewData = [];
                const overviewTimes = JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields.length

                for (let i =0;i<overviewTimes;i++){
                    let overviewContent = {
                        id : i ,
                        Name : `${JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields[i].name}`,
                        Type : `${JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields[i].typeName}`,
                        Data : `${JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields[i].type}`,

                    }
                    overviewData.push(overviewContent)
                }
                setOverviewDate(overviewData)

                let times = data.events.nodes.length;
                let data_list = [];
                for (let i = 0;i < times;i++) {

                    let result = {
                        id:data.events.nodes[i].id,
                        hash:data.events.nodes[i].extrinsicHash,
                        action: `${data.events.nodes[i].module}.${data.events.nodes[i].method}`,
                }
                    data_list.push(result)
                    SetData(data_list)
                }
            }
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            query()
        }
    },[router.isReady])


    const QueryEvent_Info = async (EventID) => {
        const result = await event_Info({
            variables: {
                Event:EventID
            }
        })
        return result
    }
    const QueryExtrinsic_Hash = async (ExtrinsicHash) => {
        const result = await extrinsic_Hash({
            variables: {
                ExtrinsicHash
            }
        })
        return result
    }
    const GetEvent = (e) => {
        const value = e.target.innerText
        const id = document.getElementById(`${overview.extrinsic_hash}`).innerText
        // console.log(id)
        router.push(`/event/${id}/${value}`)
    }

    if(data.length == 0){
        return (
            <Error/>
        )
    }else{
        return(
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG transition duration-700">
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-14">
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
                                    <div className="text-black text-sm dark:text-white">

                                            <div>
                                                <div className="md:flex  justify-between lg:justify-start my-3 ">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Extrinsic Name
                                                    </div>
                                                    <div className="text-gray-800 dark:text-white" id="block">
                                                        {overview.extrinsic}
                                                    </div>
                                                </div>
                                                <div className="md:flex justify-between lg:justify-start my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Signer
                                                    </div>
                                                    <div id={overview.signature}
                                                         className="text-gray-800 dark:text-white text-xs lg:text-sm  break-words">
                                                        {overview.signature}
                                                        <button onClick={() => {
                                                            // @ts-ignore
                                                            Copy(`${overview.signature}`);
                                                        }}>
                                                            <i className="fa fa-clone ml-1.5 mt-1" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="md:flex justify-between lg:justify-start my-3">
                                                    <div className="font-semibold lg:font-medium w-60  mr-32">
                                                        Extrinsic hash
                                                    </div>
                                                    <div id={overview.extrinsic_hash}
                                                         className="text-gray-800  dark:text-white text-xs lg:text-sm  break-words">
                                                        {overview.extrinsic_hash}
                                                        <button onClick={() => {
                                                            // @ts-ignore
                                                            Copy(`${overview.extrinsic_hash}`);
                                                        }}>
                                                            <i className="fa fa-clone ml-1.5 mt-1" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="md:flex justify-between lg:justify-start my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Weight
                                                    </div>
                                                    <div className="text-gray-800 dark:text-white">
                                                        {overview.weight}
                                                    </div>
                                                </div>
                                                <div className="md:flex justify-between lg:justify-start my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32 ">
                                                        Events
                                                    </div>
                                                    <div className="md:flex text-gray-800 dark:text-white">

                                                        <div className="flex ">
                                                            <div>Total</div>
                                                            <div className=" mx-1   font-semibold">{overview.events}</div>
                                                            <div>Events</div>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="md:flex justify-between lg:justify-start  my-3">
                                                    <div className="font-semibold lg:font-medium w-60 mr-32">
                                                        Parameters
                                                    </div>

                                                    <div className="  mt-2 md:mt-0 w-full xl:w-6/12">
                                                        <div className="overflow-y-auto  w-full shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
                                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                                                <thead className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
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
                                                                <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                                                {overviewDate.map(item => (
                                                                    <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-left">
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
                                            </div>
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
                        <div className="mt-5">
                            <div className="my-5 overflow-x-auto rounded-lg ">
                                <div className=" min-w-full  py-5 dark:text-gray-200">
                                    <div className="flex my-5 text-xl font-semibold text-gray-700 dark:text-gray-300">
                                        Events
                                    </div>
                                    <div className="shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                            <thead className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
                                            <tr>
                                                {tokenstitle.map(title=>(
                                                    <th key={title.title}
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-sm font-semibold"
                                                    >
                                                        {title.title}
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                            {data.map(Events=>(
                                                <tr key={Events.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium font-medium">
                                                        <button id={Events.hash}  onClick={GetEvent}>
                                                            {Events.id}
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
export default Extrinsics
