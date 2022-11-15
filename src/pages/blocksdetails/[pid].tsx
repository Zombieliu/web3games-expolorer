import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, XIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useRouter} from "next/router";
import {useQuery} from "graphql-hooks";
import {useAtom} from "jotai";
import { DarkModeAtom, BlocksDetailsValue, CopyValue } from '../../jotai';
import Error from  '../../components/error'
import {BlockSkeleton, DetailsSkeleton} from "../../components/skeleton";
import {showAccount, showSmallAccount} from "../../utils";
import Heads from "../../components/head";
import client from "../../post/post";

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
        title:"Nonce",
    },
    {
        title:"Result"
    },
    {
        title:"Signer By"
    },
]




function DataDiff (blockTime) {
    const start = new Date(blockTime).getTime();
    const end = new Date().getTime();
    const milliseconds = Math.abs(end - start).toString()
    // @ts-ignore
    const seconds = parseInt(String(milliseconds / 1000));
    const minutes = parseInt(String(seconds / 60));
    const hours = parseInt(String(minutes / 60));
    const days = parseInt(String(hours / 24));
    if (days >= 1){
        let new_hours = hours - days * 24
        let new_minutes = minutes  - hours * 60
        let new_seconds = seconds - minutes * 60
        return `${days} days ${new_hours} hours ${new_minutes} minutes ${new_seconds} seconds ago`
    }else if (hours >= 1){
        let new_minutes = minutes  - hours * 60
        let new_seconds = seconds - minutes * 60
        return `${hours} hours ${new_minutes} minutes ${new_seconds} seconds ago`
    }else if (minutes >= 1){
        let new_seconds = seconds - minutes * 60
        return `${minutes} minutes ${new_seconds} seconds ago`
    }else if (seconds >= 1){
        return `${seconds} seconds ago`
    }else{
        return `now`
    }
}


const GetBlockData = (blockTime) => {
    const start = new Date(blockTime).toUTCString();
    return `${start}`
}
const BlocksDetails=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)

    const [hash,setHash] = useState("")
    const [data,setData] = useState({})
    const [extrinsislcData,setExtrinsislcData] = useState([])
    useEffect(()=>{
        if (router.isReady){
            const pid = router.query.pid
            // @ts-ignore
            setHash(router.query.pid)
            const call = async () =>{
                let ret = await client.callApi('block/GetBy', {
                    // @ts-ignore
                    numOrHash:pid
                });

                if(ret.res !== undefined){
                    if (ret.res.content != "") {
                        setData(JSON.parse(ret.res.content))
                        const extrinsislcData = await client.callApi('extrinsic/GetAll', {
                            pageIndex: 0,
                            blockNum:Number(JSON.parse(ret.res.content).block_num)
                        });
                        if (extrinsislcData.res != undefined) {
                            setExtrinsislcData(JSON.parse(extrinsislcData.res.content).items)
                            console.log(JSON.parse(extrinsislcData.res.content))
                        }
                        if (!extrinsislcData.isSucc) {
                            return;
                        }
                    }
                }
                if (!ret.isSucc) {
                    return;
                }
            }
            call()
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])

    async function getAccount(e){
        await router.push(`/account/${e.target.id}`)
    }
    const GetExtrinsics = (props) => {
        const value = props.target.id;
        router.push(`/extrinsics/${value}`)
    }

    if(hash !=="0xf6d1b714a2c2edbe3ab0983bd5b0a191191162ece397e922778c63080e33a1e9"){
        if(extrinsislcData.length !== 0 ){
            return (
                <div className="mx-auto bg-gray-50 dark:bg-W3GBG  transition duration-700">
                    <Heads/>
                    <Header/>
                    <div className="max-w-7xl mx-auto py-16  px-4 ">
                        <div className="my-10 mb-14">
                            <div className="mx-auto lg:flex justify-between ">
                                <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-200">
                                    Block Details
                                </div>
                            </div>
                            <Overview data={[data,extrinsislcData]}/>
                            <div className="mt-5">
                                <div className="my-5 overflow-x-auto bg-white dark:bg-W3GBG rounded-lg ">
                                    <div className="py-2 min-w-full  p-5 dark:text-gray-200">
                                        <div className="flex my-5 text-2xl font-semibold text-gray-700 dark:text-white">
                                            Extrinsic
                                        </div>
                                        <div className="shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                                <thead className="bg-white dark:bg-W3GInfoBG text-gray-500  dark:text-neutral-300">
                                                <tr >
                                                    {tokenstitle.map(title=>(
                                                        <th key={title.title}
                                                            scope="col"
                                                            className="px-6 py-3   font-semibold "
                                                        >
                                                            {title.title}
                                                            <i className={title.title} aria-hidden="true"></i>
                                                        </th>
                                                    ))}
                                                </tr>
                                                </thead>

                                                <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                                {extrinsislcData.map(token=>(
                                                    <tr key={token.extrinsic_hash} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                                                        <td className="px-12 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                            <button id={token.extrinsic_hash} onClick={GetExtrinsics}>
                                                                {token.extrinsic_num}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                                                            <button id={token.extrinsic_hash} onClick={GetExtrinsics}>
                                                                {classNames(showAccount(token.extrinsic_hash,))}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                            {token.nonce ==""? "-":token.nonce}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                            { token.success ? "success" : "fail"}
                                                        </td>
                                                        <td  className="px-12 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                            <button id={token.signer} onClick={getAccount} className="text-blue-400" >
                                                                {classNames(token.is_signed ? showSmallAccount(token.signer):"system")}
                                                            </button>
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
        else
            return (
                <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                    <DetailsSkeleton/>
                </div>
            )
    }else {
        return (
            <div className="mx-auto bg-gray-50 dark:bg-W3GBG  transition duration-700">
                <Heads/>
                <Header/>
                <div className="max-w-7xl mx-auto py-16  px-4 ">
                    <div className="my-10 mb-14">
                        <div className="mx-auto lg:flex justify-between ">
                            <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-200">
                                Block Details
                            </div>
                        </div>
                        <Overview data={[data,extrinsislcData]}/>
                        <div className="mt-5">
                            <div className="my-5 overflow-x-auto bg-white dark:bg-W3GBG rounded-lg ">
                                <div className="py-2 min-w-full  p-5 dark:text-gray-200">
                                    <div className="flex my-5 text-2xl font-semibold text-gray-700 dark:text-white">
                                        Extrinsic
                                    </div>
                                    <div className="shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                            <thead className="bg-white dark:bg-W3GInfoBG text-gray-500  dark:text-neutral-300">
                                            <tr >
                                                {tokenstitle.map(title=>(
                                                    <th key={title.title}
                                                        scope="col"
                                                        className="px-6 py-3   font-semibold "
                                                    >
                                                        {title.title}
                                                        <i className={title.title} aria-hidden="true"></i>
                                                    </th>
                                                ))}
                                            </tr>
                                            </thead>

                                            <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                            {extrinsislcData.map(token=>(
                                                <tr key={token.extrinsic_hash} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                                                    <td className="px-12 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                        <button id={token.extrinsic_hash} onClick={GetExtrinsics}>
                                                            {token.extrinsic_num}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                                                        <button id={token.extrinsic_hash} onClick={GetExtrinsics}>
                                                            {classNames(showAccount(token.extrinsic_hash,))}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                        {token.nonce ==""? "-":token.nonce}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                        { token.success ? "success" : "fail"}
                                                    </td>
                                                    <td  className="px-12 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                        <button id={token.signer} onClick={getAccount} className="text-blue-400" >
                                                            {classNames(token.is_signed ? showSmallAccount(token.signer):"system")}
                                                        </button>
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

const Overview = (props:any) =>{
    const [,setIsOpen] = useAtom(CopyValue)
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

    let time = DataDiff(props.data.timestamp)
    let utc = GetBlockData(props.data.timestamp)
    const overview=[
        {
            block:props.data[0].block_num,
            timestamp:time,
            UTCtime:utc,
            blockHash:props.data[0].block_hash,
            parentBlockHash:props.data[0].parent_block_hash,
            extrinsicsHash:props.data[0].extrinsics_hash,
            contentHash:props.data[0].contentHash,
            State:props.data[0].state_hash,
            extrinsicNumber:props.data[1].length,
        }
    ]
    return(
        <>
            <div className="mt-5">
                <div className="my-5  bg-white dark:bg-neutral-800 rounded-lg  ">
                    <div className="py-5 min-w-full  p-5 dark:text-gray-200">
                        <div className="flex my-5 text-xl font-semibold dark:text-neutral-200">

                            <div>
                                Overview
                            </div>

                        </div>
                        <div className="text-black dark:text-white text-sm ">
                            {overview.map(item=>(
                                <div key={item.block}>
                                    <div className="md:flex justify-between lg:justify-start  my-3 ">
                                        <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                            Block
                                        </div>
                                        <div className="text-gray-800  dark:text-white items-center " id="block">
                                            {item.block}  <button onClick={() => {
                                            // @ts-ignore
                                            Copy("block");
                                        }}>    <img className="w-4 ml-1 -mb-1" src="/copy.svg" alt=""/></button>
                                        </div>
                                    </div>
                                    <div className="md:flex  justify-between lg:justify-start my-3">
                                        <div className="font-semibold justify-between lg:font-medium  w-60 mr-32">
                                            Timestamp
                                        </div>
                                        <div className="h-auto  lg:flex">
                                            <div className="text-gray-800 dark:text-white ">
                                                {item.timestamp}
                                            </div>
                                            <div className="flex">
                                                <div className="mx-3 hidden lg:inline-block">
                                                    |
                                                </div>
                                                <div className="md:flex dark:text-white">
                                                    <div className="">
                                                        <i className="fa fa-clock-o" aria-hidden="true"></i>  {item.UTCtime} +UTC
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" md:flex justify-between lg:justify-start my-3 ">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Block Hash
                                        </div>
                                        <div id={item.blockHash} className="text-gray-800 dark:text-white text-xs lg:text-sm   break-words ">
                                            {item.blockHash}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.blockHash}`);}}>
                                                <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Parent Block Hash
                                        </div>
                                        <div id={item.parentBlockHash} className="text-gray-800 dark:text-white  text-xs lg:text-sm  break-words">
                                            {item.parentBlockHash}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.parentBlockHash}`);}}>
                                                <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Extrinsics Hash
                                        </div>
                                        <div id={item.extrinsicsHash} className="text-gray-800 dark:text-white text-xs lg:text-sm break-words ">
                                            {item.extrinsicsHash}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.extrinsicsHash}`);}}>
                                                <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3 ">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Content Hash
                                        </div>
                                        <div id={item.contentHash} className="text-gray-800 dark:text-white text-xs lg:text-sm break-words ">
                                            {item.contentHash}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.contentHash}`);}}>
                                                <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            State Hash
                                        </div>
                                        <div id={item.State} className="text-gray-800 dark:text-white text-xs lg:text-sm  break-words">
                                            {item.State}
                                            <button onClick={() => {
                                                // @ts-ignore
                                                Copy(`${item.State}`);}}>
                                                <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:flex  justify-between lg:justify-start my-3">
                                        <div className="font-semibold lg:font-medium w-60 mr-32">
                                            Extrinsics
                                        </div>
                                        <div className="md:flex justify-between lg:justify-start text-gray-800 dark:text-white">

                                            <div className="flex ">
                                                <div>Total</div>
                                                <div className=" mx-1   font-semibold">{item.extrinsicNumber}</div>
                                                <div>Extrinsics</div>
                                            </div>

                                        </div>

                                    </div>
                                </div> ))}
                        </div>

                    </div>
                </div>
            </div></>
    )
}

export default BlocksDetails
