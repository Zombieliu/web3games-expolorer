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
import client from "../../post/post";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Events=()=>{
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [enabledNightMode,] = useAtom(DarkModeAtom)

    const OverviewType={
        section:"",
        method:"",
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
    const [data,SetData]= useState(dataType)
    const [obtainData,setObtainData] = useState(false)

    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            const eventIndex = Number(router.query.slug[1])
            const blockNum = Number(router.query.slug[0])
            const query = async ()=>{
                let ret = await client.callApi('event/GetByBlockNumAndIndex', {
                    eventIndex: eventIndex,
                    blockNum:blockNum,
                });
                // console.log(JSON.parse(JSON.parse(ret.res.content)[0].meta).fields)

                if(ret.res !==undefined){

                    if ( ret.res.content.length > 2) {
                        setObtainData(true)

                           setOverview(JSON.parse(ret.res.content)[0])
                           const info = []
                           const meta =  JSON.parse(JSON.parse(ret.res.content)[0].meta).fields
                           const data =  JSON.parse(JSON.parse(ret.res.content)[0].data)

                        if(typeof(data[0])=='string' ){
                               for (let i = 0 ;i<meta.length ;i++){
                                let result= {
                                    id:i,
                                    Type:meta[i].typeName,
                                    Data:data[i],
                                }
                                info.push(result)
                                SetData(info)
                            }
                        }else {
                            let a =JSON.parse(ret.res.content)[0].data.slice(1,JSON.parse(ret.res.content)[0].data.length-1)
                            for (let i = 0 ;i<meta.length ;i++){
                                let result= {
                                    id:i,
                                    Type:meta[i].typeName,
                                    Data:a,
                                }
                                info.push(result)
                                SetData(info)
                            }

                            console.log(data[0])
                        }


                    }
                }

                // Error
                if (!ret.isSucc) {
                    return;
                }
            }

            query()
        }
    },[router.isReady])

    function closeModal() {
        setIsOpen(false)
    }

    if (obtainData){
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
                        </div>
                        <div className="my-5">
                            <div className="py-5  bg-white dark:bg-neutral-800 rounded-lg  ">
                                <div className=" min-w-full  p-5 dark:text-gray-300">
                                    <div className="flex  text-xl font-semibold text-gray-700 dark:text-neutral-200 ">
                                        Overview
                                    </div>
                                    <div className="text-black dark:text-white text-sm ">
                                        <div>
                                            <div className="md:flex justify-between lg:justify-start  my-3 ">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Event Name
                                                </div>
                                                <div className="text-gray-800 dark:text-white" id="block">
                                                    {overview.section}-({overview.method})
                                                </div>
                                            </div>
                                            <div className="md:flex justify-between lg:justify-start   ">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Parameters
                                                </div>
                                                <div className="">
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
                                                                {data.map((item,index )=> (
                                                                    <tr key={index} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                                        <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                            {item.id}
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
    }else
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
            <DetailsSkeleton/>
        </div>
    )

}
export default Events
