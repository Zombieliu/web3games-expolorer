import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import { Dialog,Transition } from '@headlessui/react';
import { CheckCircleIcon} from '@heroicons/react/solid';
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom,  EventValue} from "../../jotai";
import {BlockSkeleton, DetailsSkeleton} from "../../components/skeleton";
import Heads from "../../components/head";
import client from "../../post/post";
import {cropData} from "../../utils/math";

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

const Extrinsics=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)

    const OverviewType={
        method: "",
        section: "",
        signer: "",
        is_signed:"",
        extrinsic_hash: "",
        weight_info:"",
        events: "",
        success:""
    }
    const [overview,setOverview] =useState(OverviewType)
    const [data,SetData]= useState([])
    class OverviewDate {
        private id: string;
        private name: string;
        private type: string;
        private data : string;

        constructor(
            id:string,
            name:string,
            type:string,
            data:string,

        ) {
            this.id = id
            this.name = name
            this.type = type
            this.data = data
        }
    }

    const [overviewDate,setOverviewDate] =useState([])
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
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

    const [getData,setGetData]= useState(false)
    useEffect(()=>{
        if (router.isReady){
            const extrinsic_hash = router.query.slug[0];
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            const query = async ()=> {
                let ret = await client.callApi('extrinsic/GetByExtHash', {
                    extrinsicHash:extrinsic_hash,
                });

                    if (ret.res.content != "") {
                        setOverview(JSON.parse(ret.res.content))
                        console.log(JSON.parse(JSON.parse(ret.res.content).args).now)
                        let length = JSON.parse(JSON.parse(ret.res.content).meta).args.length
                        let data_list = []
                        for (let i = 0 ; i<length;i++){
                            let result = new OverviewDate(
                                String(i),
                                JSON.parse(JSON.parse(ret.res.content).meta).args[i].name,
                                JSON.parse(JSON.parse(ret.res.content).meta).args[i].type,
                                JSON.parse(JSON.parse(ret.res.content).args).now,
                            )
                            data_list.push(result)

                        }
                        setOverviewDate(data_list)
                        setGetData(true)
                        const eventData =  await client.callApi('event/GetByExt', {
                            blockNum:Number(JSON.parse(ret.res.content).block_num),
                            extrinsicIndex:Number(JSON.parse(ret.res.content).extrinsic_num),

                        });
                        if(eventData.res != undefined) {
                            console.log(JSON.parse(eventData.res.content))
                            SetData(JSON.parse(eventData.res.content))
                            // console.log("-------------1",JSON.parse(eventData.res.content))
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

    const GetEvent = (  block_num, eventIndex) => {
        router.push(`/event/${block_num}/${eventIndex}`)
    }

    if(!getData){
        return(
            <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                <DetailsSkeleton/>
            </div>
        )
    }else
        return(
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG transition duration-700">
                <Heads/>
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
                                                    {overview.section}({overview.method})
                                                </div>
                                            </div>
                                            <div className="md:flex justify-between lg:justify-start my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Signer
                                                </div>
                                                <div id="address"
                                                     className="text-gray-800 dark:text-white text-xs lg:text-sm  break-words">
                                                    {overview.is_signed ? overview.signer :"system"}
                                                    <button onClick={() => {
                                                        // @ts-ignore
                                                        Copy(`address`);
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
                                                    {JSON.parse(overview.weight_info).weight}
                                                </div>
                                            </div>
                                            <div className="md:flex justify-between lg:justify-start my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32 ">
                                                    PartialFee
                                                </div>
                                                <div className="md:flex text-gray-800 dark:text-white">
                                                    <div className={overview.success?"text-green-400":""}>{overview.success?"Success":"Fail"}</div>
                                                </div>
                                            </div>
                                            <div className="md:flex justify-between lg:justify-start my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32 ">
                                                    PartialFee
                                                </div>
                                                <div className="md:flex text-gray-800 dark:text-white">
                                                    <div className="">  {(parseFloat(String(cropData((JSON.parse(overview.weight_info).partialFee / Math.pow(10, 18)), 5))))} W3G</div>
                                                </div>
                                            </div>
                                            <div className="md:flex justify-between lg:justify-start my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32 ">
                                                    Events
                                                </div>
                                                <div className="md:flex text-gray-800 dark:text-white">

                                                    <div className="flex ">
                                                        <div>Total</div>
                                                        <div className=" mx-1   font-semibold">{data.length}</div>
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
                                                            {overviewDate.map((item,index) => (
                                                                <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-left">
                                                                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                        {index}
                                                                    </td>
                                                                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                        {item.name}
                                                                    </td>
                                                                    <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                                        {item.type}
                                                                    </td>
                                                                    <td className="px-6 py-1 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                                                                        {item.data}
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
                                                <tr key={Events.event_index} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium font-medium">
                                                        <button id={Events.event_index}  onClick={()=>GetEvent(Events.block_num,Events.event_index)}>
                                                            {Events.block_num}-{Events.event_index}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                        {Events.section}({Events.method})
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
export default Extrinsics
