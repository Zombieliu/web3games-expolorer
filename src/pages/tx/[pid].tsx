import React, {Fragment, useCallback, useEffect, useMemo, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import { Dialog,Transition } from '@headlessui/react';
import { CheckCircleIcon} from '@heroicons/react/solid';
import {useQuery} from "graphql-hooks";
import {useManualQuery } from 'graphql-hooks'
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {CopyPopUpBoxState, DarkModeAtom,  EventValue} from "../../jotai";
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


const Tx_Info = `
 query HomePage($tx: String) {
   evmInfos(filter:{
        transactionHash:{
            equalTo:$tx
        }
    }){
        nodes{
            id
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
    const [,setCopy_Sop_up_boxState] = useAtom(CopyPopUpBoxState)


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
            setCopy_Sop_up_boxState(true)
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

                <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                    Extrinsics Details
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
                            {overview.map(item => (
                                <div key={item.extrinsic}>
                                    <div className="md:flex  justify-between lg:justify-start my-3 ">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Extrinsic Name
                                        </div>
                                        <div className="text-gray-800 " id="block">
                                            {item.extrinsic}
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Signer
                                        </div>
                                        <div id={item.signature}
                                             className="text-gray-800  text-xs lg:text-sm  break-words">
                                            {item.signature}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.signature}`);
                                            }}>
                                                <i className="fa fa-clone mt-1 ml-1.5" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60  mr-32">
                                            extrinsic_hash
                                        </div>
                                        <div id={item.extrinsic_hash}
                                             className="text-gray-800   text-xs lg:text-sm  break-words">
                                            {item.extrinsic_hash}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.extrinsic_hash}`);
                                            }}>
                                                <i className="fa fa-clone mt-1 ml-1.5" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Weight
                                        </div>
                                        <div className="text-gray-800 ">
                                            {item.weight}
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32 ">
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
                                    <div className="md:flex justify-between lg:justify-start  my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Parameters
                                        </div>

                                        <div
                                            className="my-5 h-24  overflow-auto bg-white dark:bg-gray-600 rounded-lg ">
                                            <div className="">
                                                <table className="min-w-full divide-y divide-gray-200 ">
                                                    <thead className="bg-gray-100 dark:bg-gray-300 ">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1 text-left text-sm font-semibold text-gray-500  "
                                                        >
                                                            #
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1  text-left text-sm font-semibold text-gray-500  "
                                                        >
                                                            Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1 text-left text-sm font-semibold text-gray-500  "
                                                        >
                                                            Type
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-1 text-left text-sm font-semibold text-gray-500  "
                                                        >
                                                            Data
                                                        </th>
                                                    </tr>
                                                    </thead>

                                                    <tbody
                                                        className=" bg-white dark:bg-gray-300 divide-y divide-gray-200  ">
                                                    {Data.map(item => (
                                                        <tr key={item.id} className="hover:bg-gray-200">
                                                            <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                                {item.id}
                                                            </td>
                                                            <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                                                                {item.Name}
                                                            </td>
                                                            <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-500">
                                                                {item.Type}
                                                            </td>
                                                            <td className="px-6 py-1 whitespace-nowrap text-base text-gray-500">
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
                                        <button id={Events.id} onClick={GetEvent}>
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

                    {/*<Sort/>*/}
                </div>
            </>
        )
}

const Extrinsics=()=>{
    const router = useRouter()
    const [Extrinsics, SetExtrinsicInfo] = useState("")
    const [fetchExtrinsic] = useManualQuery(Tx_Info)

    useEffect(()=>{
        if (router.isReady){
            const pid = router.query.pid
            // SetExtrinsicInfo(`${pid}`)
            const fetchExtrinsicInfo = async (query_data:string) => {
                const data = await fetchExtrinsic({
                    variables: { tx: query_data }
                })
                if (data.data.evmInfos.nodes.length != 0){
                    SetExtrinsicInfo(`${data.data.evmInfos.nodes[0].id}`)
                }
            }
            fetchExtrinsicInfo(`${pid}`)

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
            <div className="mx-auto bg-gray-50 dark:bg-neutral-800  transition duration-700">
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-14">
                        <Overview data={data}/>
                        <div className="mt-5">
                            <div className="my-5 overflow-x-auto bg-white dark:bg-gray-600 rounded-lg ">
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
