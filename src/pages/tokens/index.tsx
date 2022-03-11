import { Listbox, Transition,Popover, Disclosure } from '@headlessui/react'
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
    SelectorIcon
} from '@heroicons/react/solid'
import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import Sort from "../../components/sort";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {darkModeAtom, darkModeImg} from "../../jotai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
    {
        title:"#"
    },
    {
        title:"Tokens"
    },
    {
        title:"Holders"
    },
    {
        title:"Price"
    },
    {
        title:"24H"
    },
    {
        title:"7D"
    },
    {
        title:"Market Cap(F.D)"
    },
]
const Tokens=[
    {
        id:"1",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"2",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"3",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"4",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"5",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"6",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"7",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"8",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"9",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"10",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"11",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"12",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"13",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"14",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"15",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"16",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"17",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"18",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"19",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"20",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"21",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"22",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"23",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"24",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"25",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"26",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"27",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"28",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"29",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"30",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },
    {
        id:"31",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Wrappde SOL",
        href:"",
        holders:"28,179",
        price:"$76,304",
        time:"-13.75%",
        timestate:"rise",
        week:"-15.34%",
        weekstate:"rise",
        marketcap:"$26,111,094,071",
    },



]
const tokensState={
    rise:"fa fa-arrow-down text-red-300",
    decline:"fa fa-arrow-up text-green-300 ",
}

const Content = ()=>{
    return(
        <>
            <div className="flex my-5 ">
                <div>
                    Total
                </div>
                <div className="mx-1 font-semibold">
                    8596
                </div>
                <div>
                    recognized tokens
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
                    {Tokens.map(token=>(
                        <tr key={token.id} className="hover:bg-gray-200" >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                {token.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium flex">
                                <Link  href={token.href}>
                                    <a className="flex">
                                        <img className="-ml-2 w-8 h-8 rounded-full"
                                             src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt=""/>
                                        <div className="mt-2 ml-2">
                                            {token.name}
                                        </div>
                                    </a>
                                </Link>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                                {token.holders}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {token.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                                <i className={classNames(tokensState[token.timestate],)}  aria-hidden="true">
                                    {token.time}
                                </i>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                                <i className={classNames(tokensState[token.weekstate],)}  aria-hidden="true">
                                    {token.week}
                                </i>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {token.marketcap}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
const Token=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(darkModeAtom)
    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])
    return(
        <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">
            <Header></Header>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-20 mb-14">
                    <div className="lg:flex justify-between ">

                        <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                            Tokens
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
                        <div className="my-5 overflow-x-auto bg-white dark:bg-gray-600 rounded-lg ">
                            <div className="py-2    min-w-full  p-5 dark:text-gray-200">

                                <Content/>
                                <Sort></Sort>
                            </div>
                        </div>
                    </div>
                    </div>

                </div>
            <Tail></Tail>

        </div>
    )
}
export default Token
