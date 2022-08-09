import { Listbox, Transition,Popover, Disclosure } from '@headlessui/react'
import {CheckIcon, ChevronDownIcon, ChevronUpIcon, SelectorIcon} from '@heroicons/react/solid'
import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Script from 'next/script'
import Header from "../../components/header";
import Tail from "../../components/tail";
import {useQuery} from "graphql-hooks";
import {router} from "next/client";
import {useRouter} from "next/router";
import {useManualQuery } from 'graphql-hooks'
import {useAtom} from "jotai";
import {darkModeAtom, darkModeImg} from "../../jotai";
import {BlockSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import {NextPage} from "next";
import Head from "next/head";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const types = [
    { id: 1, name: 'Block' },
    { id: 2, name: 'BlockHash' },
    { id: 3, name: 'ExtrinsicHash' },
    { id: 4, name: 'Account' },
    // { id: 1, name: 'All Filters' },
    // { id: 2, name: 'Tokens' },
    // { id: 3, name: 'Accounts' },
    // { id: 4, name: 'Contract' },
    // { id: 5, name: 'Txn ID' },
    // { id: 6, name: 'Blocks' },
    // { id: 7, name: 'Websites' },
]
const hotsearch=[
    {
        a:"",
        img:"https://coin.top/production/logo/usdtlogo.png",
        h1:"USDT"
    },
    {
        a:"",
        img:"https://coin.top/production/logo/1002000.png",
        h1:"BTTOLD"
    },
    {
        a:"",
        img:"https://coin.top/production/upload/logo/TFczxzPhnThNSqr5by8tvxsdCFRRz6cPNq.png",
        h1:"NFT"
    },
    {
        a:"",
        img:"https://coin.top/production/upload/logo/TEkxiTehnzSmSe2XqrBj4w32RUN966rdz81.png",
        h1:"USDC"
    },
    {
        a:"",
        img:"https://coin.top/production/upload/logo/TYofwf9oM6CPU1rCTwNnEuwzhB5DTQu8rW.png?t=1623839484546",
        h1:"POSCHE"
    },
]
const tokens=({
    one: [
        {
            a: "",
            img: "https://tronscan.io/static/media/account_icon.e336f78f.png",
            title: "Total Accounts",
            money: "77,488",
            addition: "+145",

        },
        {
            a: "",
            img: "https://tronscan.io/static/media/tvl_icon.4d03b91a.png",
            title: "TVL",
            money: "8,316,287",
            addition: "+2.93%",

        },
        {
            a: "",
            img: "https://tronscan.io/static/media/transition_icon.2d0e2152.png",
            title: "Total Txns",
            money: "2,875,433",
            addition: "+2,965",

        },
        {
            a: "",
            img:"data:image/png;base64,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",
            title: "Total Transfer Value",
            money: "3,618,752",
            addition: "+5,5505",

        },],
    two:[
            {
                a: "",
                img: "https://tronscan.io/static/media/contract_icon.a4d50356.png",
                title: "Contracts",
                money: "1,150,202",
                addition: "+733",

            },
        {
            a: "",
            img: "https://tronscan.io/static/media/token_icon.c1faf8af.png",
            title: "Tokens",
            money: "63",
            addition: "+36",

        },

            {
                a: "",
                img: "https://tronscan.io/static/media/tps_icon.bd4695e2.png",
                title: "Current/Max TPS",
                money: "51/748",
                addition: "255",

            },
            {
                a: "",
                img: "https://tronscan.io/static/media/node_icon.16c4b6b3.png",
                title: "Nodes",
                money: "5292",
                addition: "",

            },
    ]


})
const project=[
    {
        a:"",
        img:"https://tronscan.io/static/media/market.1e107d94.svg",
        title:"Market Cap",
        value:"$6,475,293,449",
        states:"down",
        h1:"",
        percentage:"-3.27%",

    },
    {
        a:"",
        img:"https://tronscan.io/static/media/volume.b3417e72.svg",
        title:"Marker Trading Volurme(24h)",
        value:"$973,582,829",
        states:"up",
        h1:"",
        percentage:"+0.27",

    },
    {
        a:"",
        img:"https://tronscan.io/static/media/tvl_price.53a5e62d.svg",
        title:"Toal W3G Staked",
        value:"28,047,030",
        states:"",
        h1:"Staking Rate",
        percentage:"27.62%",

    },
]
const projectStyle={
    down:"text-red-400",
    up:"text-green-400",
}
const StateStyles={
    finalized:"fa fa-check-circle-o text-green-300 ",
    unfinalized:"fa fa-clock-o text-yellow-500",
    abnormal:"fa fa-times text-red-500",
}

const Blcok_Info = `
 query HomePage($first: Int) {
  blockInfos(first:$first,orderBy:TIMESTAMP_DESC){
    nodes{
      id
      blockHeight
      extrinsicNumber
      eventNumber
      timestamp
    }
  }
}
`


const GET_USER_QUERY = `
 query QueryPage($ctx: String) {
  blockInfos(filter:{
    blockHeight:{
      equalTo:$ctx
    }
  }){
    nodes{
      id
    }
  }
}
`

function DataDiff (blocktime) {
    const start = new Date(blocktime).getTime();
    const end = new Date().getTime();
    const milliseconds = Math.abs(end - start).toString()
    // @ts-ignore
    const seconds = parseInt(String(milliseconds / 1000));
    const minutes = parseInt(String(seconds / 60));
    if (minutes % 60 >=1){
        return seconds % 60 + 60 - 18
    }else {
        return seconds % 60
    }
}



const Search = () =>{
    const router = useRouter()
    const [fetchUser] = useManualQuery(GET_USER_QUERY)

    const fetchUserThenSomething = async (query_data:string) => {
        const block = await fetchUser({
            variables: { ctx: query_data }
        })
        return block
    }
    const [selected, setSelected] = useState(types[0])
    const DataCheck = async (props) =>{
        const key_code = props.nativeEvent.keyCode
        if (key_code == 13){
            if (selected.name == 'Block'){
                const value = props.target.value
                const block = await fetchUserThenSomething(value)
                if (block.data.blockInfos.nodes.length == 0){
                    alert("no this block")
                }else{
                    const hash = block.data.blockInfos.nodes[0].id
                    await router.push(`/blocksdetails/${hash}`)
                }
            }
            else if (selected.name == 'BlockHash'){
                const value = props.target.value
                await router.push(`/blocksdetails/${value}`)
            }
            else if (selected.name == 'ExtrinsicHash'){
                const value = props.target.value
                await router.push(`/extrinsics/${value}`)
            }
            else if (selected.name == 'Account'){
                const value = props.target.value
                await router.push(`/account/${value}`)
            }
            else {
                alert("fuck you")
            }
        }
    }

    const ButtonDataCheck = async () =>{
        const value = (document.getElementById("homeinput") as HTMLInputElement).value
        if (selected.name == 'Block'){
            const block = await fetchUserThenSomething(value)
            if (block.data.blockInfos.nodes.length == 0){
                alert("no this block")
            }else{
                const hash = block.data.blockInfos.nodes[0].id
                await router.push(`/blocksdetails/${hash}`)
            }
        }
        else if (selected.name == 'BlockHash'){
            await router.push(`/blocksdetails/${value}`)
        }
        else if (selected.name == 'ExtrinsicHash'){
            await router.push(`/extrinsics/${value}`)
        }
        else if (selected.name == 'Account'){
            await router.push(`/account/${value}`)
        }
        else {
            alert("no data")
        }
    }
    return (
        <>
            <div className="text-5xl text-black font-medium">
                <div className="mt-5  justify-center hidden xl:flex">
                    <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 -mr-11">
                        <button onClick={ButtonDataCheck}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    <input type="text"
                           id="homeinput"
                           className="bg-gray-200 text-lg rounded-lg  pl-14 w-full  border focus:bg-white outline-none"
                           placeholder="Search by Block/BlockHash/ExtrinsicHash/Address"
                           onKeyDown={DataCheck}
                    />
                    <div className="-ml-44 -my-2 flex">

                        <Listbox value={selected} onChange={setSelected}>
                            {({open}) => (
                                <>
                                    <div className=" relative ">
                                        <Listbox.Button
                                            className="relative w-full border-gray-300  border-l    pl-12    text-left cursor-default   sm:text-base">
                                            <span className="block truncate text-lg w-24 mr-2"> {selected.name}</span>
                                            <span
                                                className="absolute inset-y-0  right-0 flex items-center  pointer-events-none">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                                        </Listbox.Button>

                                        <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options
                                                className="absolute z-10 mt-1 w-44 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto  sm:text-sm">
                                                {types.map((type) => (
                                                    <Listbox.Option
                                                        key={type.id}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={type}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {type.name}
                        </span>
                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-indigo-600',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                        )}
                                                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Listbox>
                    </div>

                </div>
            </div>
        </>
    );
}

const HotSearch = () =>{
    const router = useRouter()
    return(
        <>
            <div className="hidden mt-2  xl:flex" >
                <div className="text-xl mt-1 text-gray-400">
                    Hot Search:</div>
                <div className="flex justify-between">
                    {hotsearch.map(item=>(

                        <div key={item.h1} className="flex ml-5 mt-2">
                            <img  className="w-6 h-6" src={item.img} alt=""/>
                            <Link href={item.a}><a  className="text-xs text-gray-400 mt-1 ml-2 hover:text-blue-400">
                                {item.h1}</a></Link>
                        </div>
                    ))}
                    <Link href="">
                        <a  className="ml-5 text-xl mt-1 text-gray-600 hover:text-yellow-600">
                            more
                            <i className="fa fa-angle-right ml-3 " aria-hidden="true"></i>
                        </a></Link>
                </div>
            </div>
        </>
    )
}

const Announcement = () =>{
    const router = useRouter()
    return(
        <div>
            <div className="flex justify-between mt-5 bg-white dark:bg-gray-600 rounded-lg ">

                <div className="flex p-2">
                    <div className="flex">
                        <div className="text-xl xl:text-2xl text-gray-400 ">
                            <i className="fa fa-bullhorn " aria-hidden="true"></i></div>

                    </div>
                    <div className="text-xs xl:text-sm mt-1.5 text-gray-700 dark:text-gray-400 ml-2 w-11/12 xl:truncate overflow-hidden h-4 xl:h-6">
                        Temporarily suspend the use of interface of nile/tronex/shasta on Tronscan and Trongrid
                    </div>
                </div>
                <div className="mt-3.5 mr-3">
                    <Link  href="">
                        <a className="text-xs xl:text-sm flex text-gray-800 dark:text-gray-400 hover:text-yellow-600">
                            more
                            <i className="fa fa-angle-right ml-2 mt-1" aria-hidden="true"></i>
                        </a>
                    </Link>
                </div>


            </div>
        </div>
    )
}

const Token = () =>{
    const router = useRouter()
    const [enabled, setEnabled] = useState(true)
    const move=()=>{
        setEnabled(!enabled)
    }
    return(
        <>
            <div className="px-5 pt-3 bg-white dark:bg-gray-600  mt-6 rounded-lg shadow-lg">
                <div className=" grid xl:grid-cols-2 ">

                    {tokens.one.map(token=>(

                        <Link key={token.title} href={token.a}>
                            <a className="flex justify-between border-b dark:border-gray-500 py-6 mr-5" >
                                <div className="flex">
                                    <img className="w-12 h-12"
                                         src={token.img} alt=""/>
                                    <div className="ml-12">
                                        <h1 className="text-gray-400 dark:text-gray-200 text-xs xl:text-sm">
                                            {token.title}
                                        </h1>
                                        <h2 className="text-sm dark:text-gray-300 xl:text-xl font-semibold">
                                            {token.money}
                                        </h2>

                                    </div>
                                </div>
                                <div className=" ">
                                    <div className="text-gray-200 text-base flex justify-end">
                                        24h
                                    </div>
                                    <div className="text-green-400 text-sm xl:text-xl">
                                        {token.addition}
                                    </div>

                                </div>
                            </a>
                        </Link>
                    ))}
                </div>

                <div className="">
                    <Disclosure  >
                        {({ open }) => (
                            <>
                                <div className="">
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-900"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-500"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Disclosure.Panel className="grid xl:grid-cols-2">
                                            {tokens.two.map(token=>(
                                                <Link key={token.title} href={token.a}><a className="flex justify-between border-b dark:border-gray-500 py-6 mr-5 " >
                                                    <div className="flex mr-2">
                                                        <img className="w-12 h-12"
                                                             src={token.img} alt=""/>
                                                        <div className="ml-12">
                                                            <h1 className="text-gray-400 dark:text-gray-200 text-xs xl:text-sm">
                                                                {token.title}
                                                            </h1>
                                                            <h2 className="text-sm dark:text-gray-300 xl:text-xl font-semibold">
                                                                {token.money}
                                                            </h2>

                                                        </div>
                                                    </div>
                                                    <div className=" ">
                                                        <div className="text-gray-200 text-base flex justify-end">
                                                            24h
                                                        </div>
                                                        <div className="text-green-400 text-sm xl:text-xl">
                                                            {token.addition}
                                                        </div>

                                                    </div>
                                                </a>
                                                </Link>
                                            ))}

                                        </Disclosure.Panel>
                                    </Transition>
                                    <div className="flex justify-center py-1.5">

                                        <Disclosure.Button onClick={move} className={enabled?"pr-4 text-sm font-medium text-left text-gray-500 hover:text-black":"hidden"}>
                                            <ChevronDownIcon
                                                className={` w-5  `}
                                                aria-hidden="true"
                                            />
                                        </Disclosure.Button>

                                        <Disclosure.Button onClick={move} className={enabled?"hidden":"pr-4 text-sm font-medium text-left text-gray-500 hover:text-black"}>
                                            <ChevronUpIcon
                                                className={` w-5  `}
                                                aria-hidden="true"
                                            />
                                        </Disclosure.Button>
                                    </div>

                                </div>
                            </>

                        )}
                    </Disclosure>

                </div>

            </div>
        </>
    )
}

const Project = () =>{
    const router = useRouter()
    return(
        <>
            <div className="mb-20 xl:mb-0  mt-5 shadow-xl h-80">
                <div className=" p-5 px-7 bg-white dark:bg-gray-600 rounded-lg ">
                    <div className="flex ">
                        <div className="flex justify-between ">
                            <img className="w-16 h-16 mr-6"
                                 src="/web3g2.png" alt=""/>
                            <div>
                                <h1 className="text-xl font-semibold dark:text-gray-50">W3G</h1>
                                <h2 className="text-base text-gray-400 dark:text-gray-400">
                                    Latest Price
                                </h2>
                            </div>
                        </div>
                        <div className="ml-12 xl:ml-20 ">
                            <div className="text-base text-green-500 flex bg-green-200 rounded-lg mb-3">

                                <div className="ml-2  xl:ml-6 py-1">
                                    +100%
                                </div>
                                <i className="fa fa-long-arrow-up  mr-4 xl:ml-2 mt-2" aria-hidden="true"></i>
                            </div>
                            <div className="text-xs xl:text-lg flex dark:text-gray-100">
                                $ 0.07
                                <div className="text-gray-300 text-xs xl:text-base ml-2 mt-0.5">
                                    /USDT
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 pr-2">
                        {project.map(item=>(
                            <Link  key={item.img} href={item.a}>
                                <a>
                                    <div className="flex justify-between pb-2">
                                        <div className="flex">
                                            <img className="w-10 h-10" src={item.img} alt=""/>
                                            <div className="pl-5">
                                                <h1 className="text-sm xl:text-base text-gray-400 dark:text-gray-300">
                                                    {item.title}
                                                </h1>
                                                <h2 className="text-sm xl:text-base dark:text-gray-300">
                                                    {item.value}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-gray-300 text-sm xl:text-base">
                                                {item.h1}
                                            </div>
                                            <div className={classNames(projectStyle[item.states],"text-sm xl:text-base dark:text-gray-300 flex justify-end")} >
                                                {item.percentage}
                                            </div>
                                        </div>
                                    </div>
                                </a></Link>
                        ))}
                    </div>
                </div>


            </div>

        </>
    )
}

const Blocks = () =>{
    const router = useRouter()
    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:10
        }
    })
    const GetBlock = (props) => {
        const value = props.target.id;
        router.push(`/blocksdetails/${value}`)
    }

    if(loading){
        return(
            <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
                <BlockSkeleton/>
            </div>
        )
    }
    if(error){
        return(
            <Error/>
        )
    }


    if (data){
        const blocks = data.blockInfos.nodes
        console.log(data)
        return(
            <>
                <div className="bg-white dark:bg-neutral-800 mb-5 p-5 pb-7 rounded-lg xl:w-7/12 shadow-xl">
                    <div className="text-gray-500 text-2xl mb-5 dark:text-gray-300 font-semibold">
                        Finallized  Blocks
                    </div>
                    <div className="flex flex-col ">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 xl:-mx-8">
                            <div className="py-2   min-w-full sm:px-6 xl:px-8">
                                <div className="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100 dark:bg-gray-300">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-sm font-semibold text-gray-500  "
                                            >
                                                Block
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-sm font-semibold text-gray-500  "
                                            >
                                                Time
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-sm font-semibold text-gray-500  "
                                            >
                                                Ex Count
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-sm font-semibold text-gray-500  "
                                            >
                                                Event
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-300 divide-y divide-gray-200">
                                        {blocks.map(block=>(
                                            <tr key={block.id} className="hover:bg-gray-200" >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                                                    <button id={block.id} onClick={GetBlock}>
                                                        {block.blockHeight}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {DataDiff(block.timestamp)} Second ago
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {block.extrinsicNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500">
                                                    {block.eventNumber}
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
            </>
        )
    }
}

const News = () =>{
    return(
        <><div>
                <div className="bg-white dark:bg-gray-600 px-5 py-7 rounded-lg  xl:px-12 shadow-xl">
                    <div className="text-gray-500 dark:text-gray-200 text-2xl mb-6 font-semibold">
                        News
                    </div>
                    <div className=" xl:w-80">
                        <div className="dark:bg-gray-600">
                            <Link href="https://twitter.com/web3games/lists/1495961454490849280?ref_src=twsrc%5Etfw">
                                <a className="twitter-timeline" data-width="600" data-height="600">
                                    A Twitter List by web3games</a></Link>
                            <Script src="https://platform.twitter.com/widgets.js" charSet="utf-8" ></Script>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Home= ()  =>{
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
        <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
            <Head>
                <title>Web3Games Explorer  | Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className=" mb-14">
                    <div className="my-20">
                        <Search/>
                        {/* future*/}
                        {/*<HotSearch/>*/}
                        {/*<div className=" xl:flex justify-between">*/}
                        {/*    <div className="xl:w-7/12">*/}
                        {/*        <Announcement/>*/}
                        {/*        <Token/>*/}
                        {/*    </div>*/}
                        {/*    <Project/>*/}
                        {/*</div>*/}
                        <div className="mt-20  xl:flex justify-between ">
                            <Blocks/>
                            <News></News>
                        </div>
                    </div>
                </div>
            </div>
            <Tail/>
        </div>

    )
}


export  default Home


