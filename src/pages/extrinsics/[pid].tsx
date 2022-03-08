import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import Sort from "../../components/sort";
// import Dialogue from "/../../../playerlink-platform/src/components/dialogue";
import Link from 'next/link'
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from '@heroicons/react/solid';
import {router} from "next/client";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";

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
// const Events=[
//     {x
//         eventid:"1",
//         action:"tokenNonFungible.TokenCreated",
//         by:"Alice",
//         fee:"0.0005",
//     },
// ]

class EventInfo {
    private eventid: string;
    private action: string;
    private by: string;
    private fee: string;

    constructor(
        eventid:string,
        action:string,
        by:string,
        fee:string,
    ) {
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
            data.eventInfos.nodes[i].eventID,
            `${data.eventInfos.nodes[i].section}.${data.eventInfos.nodes[i].method}`,
            "alice",
            "0.005"
        )
        data_list.push(result)
    }
    return data_list
}

const Extrinsics=()=>{
    const router = useRouter()
    let [isOpen, setIsOpen] = useState(false)
    const [Extrinsics,changeExtrinsics] = useState('0x80ff7d00383ed974f87490259f589ad1e3e1c03ae36612b50167c378b416ec85')

    useEffect(()=>{
        if (router.isReady) {
            const pid = router.query.pid
            changeExtrinsics(`${pid}`)
        }
    },[router.isReady])

    const{loading,error,data}: any = useQuery(Extrinsics_Info,{
        variables:{
            Extrinsics
        }
    })


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

    const GetEvent = (props) => {
        const value = props.target.innerHTML;
        router.push(`/event/${value}`)
    }

    if (loading){
        return(
            <div>
                {loading}
            </div>
        )
    }

    if(error){
        return(
            <div>
                {error}
            </div>
        )

    }
    if (data){
        // data.eventInfos.nodes[0].extrinsicInfo.extrinsic_Hash
        console.log(data)
        const weight = weight_check(data)
        const Events = data_list(data)
        const overview=[
            {
                extrinsic:`${JSON.parse(data.eventInfos.nodes[0].extrinsicHash.meta).name}`,
                signature:data.eventInfos.nodes[0].extrinsicHash.signerId,
                extrinsic_hash:data.eventInfos.nodes[0].extrinsicHash.id,
                weight,
                events:data.eventInfos.nodes.length,
                parameters:[
                    {
                        name:"id",
                        type:"u32",
                        value:"0"
                    },
                    {
                        name:"id",
                        type:"u32",
                        value:"0"
                    },
                    {
                        name:"id",
                        type:"u32",
                        value:"0"
                    },
                    {
                        name:"id",
                        type:"u32",
                        value:"0"
                    },

                ]
            }
        ]
    return(

        <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">

            <Header></Header>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-20 mb-14">
                    <div className="mx-auto lg:flex justify-between ">

                        <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                            Extrinsics Details
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
                                        <div key={item.extrinsic}>
                                            <div className="md:flex   my-3 ">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Extrinsic Name
                                                </div>
                                                <div className="text-gray-800 " id="block">
                                                    {item.extrinsic}  <button onClick={() => {
                                                    // @ts-ignore
                                                    Copy("block");
                                                }}> <i className="fa fa-clone mt-1" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                            <div className="md:flex  my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    signature
                                                </div>
                                                <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                    {item.signature}
                                                </div>
                                            </div>
                                            <div className="md:flex  my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    extrinsic_hash
                                                </div>
                                                <div className="text-gray-800 flex text-xs lg:text-sm  ">
                                                    {item.extrinsic_hash}
                                                </div>
                                            </div>
                                            <div className="md:flex  my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Weight
                                                </div>
                                                <div className="text-gray-800">
                                                    {item.weight}
                                                </div>
                                            </div>
                                            <div className="md:flex   my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-32">
                                                    Events
                                                </div>
                                                <div className="md:flex text-gray-800">

                                                    <div className="flex ">
                                                        <div>Total</div>
                                                        <div className=" mx-1   font-semibold">{item.events}</div>
                                                        <div>Events</div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="md:flex  my-3">
                                                <div className="font-semibold lg:font-medium w-60 mr-48">
                                                    Parameters
                                                </div>
                                                <div className="text-gray-800 -ml-2 w-11/12">
                                                      <div className="">
                                                          <Disclosure  >

                                                              {({ open }) => (
                                                                <>
                                                                    <div className="">

                                                                        <div className="flex  -mt-1">
                                                                            <Disclosure.Button  className='pr-4 text-sm font-medium  flex text-left text-gray-500 hover:text-black'>
                                                                                Date
                                                                                <ChevronDownIcon
                                                                                  className={` w-5  `}
                                                                                  aria-hidden="true"
                                                                                />

                                                                            </Disclosure.Button>

                                                                        </div>
                                                                        <Transition
                                                                          as={Fragment}
                                                                          enter="transition ease-out duration-100"
                                                                          enterFrom="opacity-0 translate-y-1"
                                                                          enterTo="opacity-100 translate-y-0"
                                                                          leave="transition ease-in duration-100"
                                                                          leaveFrom="opacity-100 translate-y-0"
                                                                          leaveTo="opacity-0 translate-y-1"
                                                                        >
                                                                            <Disclosure.Panel className="grid xl:grid-cols-1 bg-gray-300 rounded-lg w-full p-3">
                                                                                {item.parameters.map(parameter=>(
                                                                                  <div key={parameter.type} className="flex justify-between border  dark:border-gray-500   mb-2" >
                                                                                      <div className="flex  bg-white w-full">
                                                                                          <div className="border-r w-24 px-2 flex">
                                                                                              {parameter.name}
                                                                                              <div className="text-gray-500 pl-2">
                                                                                                  {parameter.type}
                                                                                              </div>
                                                                                          </div>
                                                                                          <div className="pl-2 bg-whites w-full">
                                                                                              {parameter.value}
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                                ))}

                                                                            </Disclosure.Panel>
                                                                        </Transition>


                                                                    </div>
                                                                </>

                                                              )}
                                                          </Disclosure>

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
                                        Events
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
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-300 divide-y divide-gray-200">
                                        {Events.map(Events=>(
                                            <tr key={Events.eventid} className="hover:bg-gray-200" >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 font-medium font-medium">
                                                    <button onClick={GetEvent}>
                                                        {Events.eventid}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                                    {Events.action}
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
                            <div className="inline-block  text-center max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                                <div className="flex justify-center">
                                    <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
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
    }
}
export default Extrinsics
