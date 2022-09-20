import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import { Dialog,Transition } from '@headlessui/react';
import { CheckCircleIcon} from '@heroicons/react/solid';
import {useRouter} from "next/router";
import {useManualQuery, useQuery} from 'graphql-hooks'
import {useAtom} from "jotai";
import {DarkModeAtom, } from "../../jotai";
import Error from "../../components/error";
import {DetailsSkeleton} from "../../components/skeleton";
import Heads from "../../components/head";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Event_Info = `
 query HomePage($Event: String) {
   events(filter:{
    id:{
      equalTo:$Event
    }
  }){
    nodes{
    id
    module
    method
    rawType
    data
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
       
        meta
    }
  }
}
`


// extrinsicHash{
// meta
// }

// function data_type(data:any){
//     let Data = [];
//     const times = JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields.length
//     console.log(JSON.parse(data.events.nodes[0].data))
//     for (let i =0;i<times;i++){
//         let content = {
//             id : i ,
//             Name : `${JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields[i].name}`,
//             Type : `${JSON.parse(data.events.nodes[0].extrinsicHash.meta).fields[i].typeName}`,
//             Data : `${JSON.parse(data.events.nodes[0].data)[i]}`,
//         }
//         Data.push(content)
//     }
//     return Data
//
// }


const Events=()=>{
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [event_Info] = useManualQuery(Event_Info)
    const [extrinsic_Hash] = useManualQuery(Extrinsic_Hash)
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [dataState,setDataState] = useState(true)

    const OverviewType={
        event:"",
        id:"",
    }
    const [overview,setOverview] =useState(OverviewType)

    const dataType = [
        {
            id:"",
            Name:"",
            Type:"",
            Data:"",

        }
    ]
    const [data,SetData ]= useState(dataType)

    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }

            const id = router.query.slug[1]
            const hash = router.query.slug[0];
            const query = async ()=>{
                const data = await (await QueryEvent_Info(id)).data
                const data2 = await (await QueryExtrinsic_Hash(hash)).data
                console.log(data,data2)
                if(data.events.nodes.length !== 0 && data2.extrinsicInfos.nodes.length !== 0){

                let Data = [];
                const overview2=
                    {
                        event:`${data.events.nodes[0].module}.${data.events.nodes[0].method}`,
                        id:`${data.events.nodes[0].id}`,
                    }
                setOverview(overview2)
                const times = JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields.length
                for (let i =0;i<times;i++){
                    let content = {
                        id : i ,
                        Name : `${JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields[i].name}`,
                        Type : `${JSON.parse(data2.extrinsicInfos.nodes[0].meta).fields[i].typeName}`,
                        Data : `${JSON.parse(data2.extrinsicInfos.nodes[0].meta)[i]}`,
                    }
                    Data.push(content)
                    SetData(Data)
                }
            }else {
                    setDataState(false)
                }
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

    // if (loading){
    //     return(
    //         <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
    //             <DetailsSkeleton/>
    //         </div>
    //     )
    // }

    // if(error){
    //     return(
    //         <Error/>
    //     )
    //
    // }
    if(dataState){
        return (

            <div className="mx-auto bg-gray-50 dark:bg-W3GBG transition duration-700">
                <Heads/>
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-40">
                        <div className="mx-auto lg:flex justify-between ">

                            <div className="text-xl my-2  lg:text-3xl font-bold  dark:text-gray-300">
                                Event Details
                            </div>
                            {/*<div className="flex ">*/}
                            {/*    <input type="text"*/}
                            {/*           className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white dark:border-gray-500 dark:bg-gray-700 outline-none"*/}
                            {/*           placeholder="Search transactions, blocks, programs and token"*/}
                            {/*    />*/}
                            {/*    <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 -ml-11">*/}
                            {/*        <i className="fa fa-search" aria-hidden="true"></i></div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="my-5">
                            <div className="py-5  bg-white dark:bg-neutral-800 rounded-lg  ">
                                <div className=" min-w-full  p-5 dark:text-gray-300">
                                    <div className="flex  text-xl font-semibold text-gray-700 dark:text-neutral-200 ">
                                        Overview
                                    </div>
                                    <div className="text-black dark:text-white text-sm ">

                                        <div key={overview.event}>
                                            <div className="md:flex justify-between lg:justify-start  my-3 ">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Event Name
                                                </div>
                                                <div className="text-gray-800 dark:text-white" id="block">
                                                    {overview.event}
                                                </div>
                                            </div>
                                            <div className="md:flex justify-between lg:justify-start   ">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Parameters
                                                </div>

                                                <div className="text-gray-800 dark:text-white" id="block">
                                                    {/*{overview.id}*/}- -
                                                </div>

                                            </div>
                                            <div className=" rounded-lg mt-2 md:mt-4 w-full  ">
                                                <div className="shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
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

                                                        <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                                        {data.map(item => (
                                                            <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                                    {item.id}
                                                                </td>
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                    {item.Name}
                                                                </td>
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                    {item.Type}
                                                                </td>
                                                                <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                    <div className="">
                                                                        {item.Data}
                                                                    </div>

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

                </div>
                <Tail></Tail>

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


            </div>
        )

    }else{
        return (
            <Error/>
        )
    }
}
export default Events
