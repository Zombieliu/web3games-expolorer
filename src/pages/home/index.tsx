import { Listbox, Transition,Popover, Disclosure } from '@headlessui/react'
import {CheckIcon, ChevronDownIcon, ChevronUpIcon, SelectorIcon} from '@heroicons/react/solid'
import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Script from 'next/script'
import Header from "../../components/header";
import Tail from "../../components/tail";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useManualQuery } from 'graphql-hooks'
import {useAtom} from "jotai";
import {BlockPageNumberValue, DarkModeAtom, PopUpBoxInfo, PopUpBoxState} from "../../jotai";
import {BlockSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import Head from "next/head";
import { Pop_up_box } from '../../components/pop_up_box';


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
            img: "/homeIcon/1.svg",
            title: "Total Accounts",
            money: "77,488",
            addition: "+145",

        },
        {
            a: "",
            img: "/homeIcon/2.svg",
            title: "TVL",
            money: "8,316,287",
            addition: "+2.93%",

        },
        {
            a: "",
            img: "/homeIcon/3.svg",
            title: "Total Txns",
            money: "2,875,433",
            addition: "+2,965",

        },
        {
            a: "",
            img:"/homeIcon/4.svg",
            title: "Total Transfer Value",
            money: "3,618,752",
            addition: "+5,5505",

        },],
    two:[
            {
                a: "",
                img: "/homeIcon/5.svg",
                title: "Contracts",
                money: "1,150,202",
                addition: "+733",

            },
        {
            a: "",
            img: "/homeIcon/6.svg",
            title: "Tokens",
            money: "63",
            addition: "+36",

        },

            {
                a: "",
                img: "/homeIcon/7.svg",
                title: "Current/Max TPS",
                money: "51/748",
                addition: "255",

            },
            {
                a: "",
                img: "/homeIcon/8.svg",
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

    const [,setPop_up_boxData] =useAtom(PopUpBoxInfo)
    const [,setSop_up_boxState] = useAtom(PopUpBoxState)
    const DataCheck = async (props) =>{
        const key_code = props.nativeEvent.keyCode
        if (key_code == 13){
            if (selected.name == 'Block'){
                const value = props.target.value
                const block = await fetchUserThenSomething(value)
                if (block.data.blockInfos.nodes.length == 0){
                    setPop_up_boxData({
                        state:false,
                        type:"No this block",
                        hash:""
                    })
                    setSop_up_boxState(true)
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
            <Pop_up_box/>
            <div className="text-5xl text-black font-medium ">
                <div className="mt-5  justify-center hidden xl:flex  p-0.5 rounded-lg bg-gradient-to-r from-W3G1 w-full via-W3G2 to-W3G3">
                    <div className="-mr-40 -my-1.5 flex ">

                        <Listbox value={selected} onChange={setSelected}>
                            {({open}) => (
                                <>
                                    <div className=" relative ">
                                        <Listbox.Button
                                            className="relative w-full  border-gray-300    px-6 dark:border-neutral-700   dark:text-white    text-left cursor-default   sm:text-base">
                                            <span className="block truncate  w-28 "> {selected.name}</span>
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
                                                className="absolute z-10 mt-5 w-44 bg-white shadow-lg max-h-60 rounded-md dark:bg-neutral-800  py-1 text-base ring-1 ring-black ring-opacity-5   sm:text-sm">
                                                {types.map((type) => (
                                                    <Listbox.Option
                                                        key={type.id}
                                                        className={({active}) =>
                                                            classNames(
                                                                active ? 'text-white bg-indigo-600  dark:bg-black' : 'text-gray-900',
                                                                'cursor-default select-none relative py-2 pl-8 pr-4'
                                                            )
                                                        }
                                                        value={type}
                                                    >
                                                        {({selected, active}) => (
                                                            <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate dark:text-white')}>
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
                    <input type="text"
                           id="homeinput"
                           className="bg-gray-50 dark:bg-neutral-900  dark:text-white dark:focus:border-neutral-400 focus:border-neutral-700    dark:border-neutral-700   text-lg rounded-lg  pl-48 w-full   focus:bg-white outline-none"
                           placeholder="Search by Block/BlockHash/ExtrinsicHash/Address"
                           onKeyDown={DataCheck}
                           autoComplete="off"
                    />

                    <div className="flex justify-center z-10 text-white dark:text-gray-300 text-3xl dark:bg-[#4F4F4F]  bg-blue-400   rounded-lg m-1  px-4 py-2 -ml-16 ">
                        <button onClick={ButtonDataCheck}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
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
                <div className="text-xl mt-1 text-gray-700 dark:text-gray-100">
                    Hot Search:</div>
                <div className="flex justify-between">
                    {hotsearch.map(item=>(

                        <div key={item.h1} className="flex ml-5 mt-2">
                            <img  className="w-6 h-6" src={item.img} alt=""/>
                            <Link href={item.a}><a  className="text-xs text-gray-600 dark:text-gray-200 mt-1 ml-2 hover:text-blue-400">
                                {item.h1}</a></Link>
                        </div>
                    ))}
                    <Link href="">
                        <a  className="ml-5 text-xl mt-1 text-gray-600 dark:text-gray-400 dark:hover:text-white ">
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
            <div className="flex justify-between mt-5 bg-white dark:bg-neutral-800 rounded-lg ">

                <div className="flex p-2">
                    <div className="flex">
                        <div className="text-xl xl:text-2xl text-gray-400 dark:text-neutral-300">
                            <i className="fa fa-bullhorn " aria-hidden="true"></i></div>

                    </div>
                    <div className="text-xs xl:text-sm mt-1.5 text-gray-700 dark:text-neutral-300 ml-2 w-11/12 xl:truncate overflow-hidden h-4 xl:h-6">
                        Temporarily suspend the use of interface of nile/tronex/shasta on Tronscan and Trongrid
                    </div>
                </div>
                <div className="mt-3.5 mr-3">
                    <Link  href="">
                        <a className="text-xs xl:text-sm flex text-gray-800 dark:text-gray-400 dark:hover:text-white ">
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
            <div className="px-5 pt-3 bg-white dark:bg-neutral-800  mt-6 rounded-lg shadow-lg">

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
                                    <div className="text-gray-400  text-base flex justify-end">
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
                                                        <div className="text-gray-400 text-base flex justify-end">
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

                                        <Disclosure.Button onClick={move} className={enabled?"flex justify-center pr-5 text-sm font-medium text-left text-gray-500 hover:text-black dark:hover:text-white hover:scale-125 transition duration-700 ease-in-out":"hidden"}>
                                            <ChevronDownIcon
                                                className={` w-5  `}
                                                aria-hidden="true"
                                            />
                                        </Disclosure.Button>

                                        <Disclosure.Button onClick={move} className={enabled?"hidden":"pr-5 text-sm font-medium text-left text-gray-500 hover:text-black dark:hover:text-white hover:scale-125 transition duration-700 ease-in-out"}>
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
                <div className=" p-5 px-7 bg-white dark:bg-neutral-800 rounded-lg ">
                    <div className="flex items-center">
                        <div className="flex justify-between items-center">
                            <img className="w-16 h-16 mr-2"
                                 src="/web3g2.png" alt=""/>
                            <div>
                                <div className="flex">
                                    <h1 className="text-xl font-semibold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">W3G</h1>
                                </div>
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
                                        <div className="flex items-center">
                                            <img className="w-10 h-10" src={item.img} alt=""/>
                                            <div className="pl-5">
                                                <h1 className="text-sm xl:text-base text-gray-400 dark:text-gray-500">
                                                    {item.title}
                                                </h1>
                                                <h2 className="text-sm xl:text-base dark:text-gray-200">
                                                    {item.value}
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-gray-400 text-sm  xl:text-base">
                                                {item.h1}
                                            </div>
                                            <div className={classNames(projectStyle[item.states],"text-sm xl:text-base text-gray-500  flex justify-end")} >
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

    const BlocksTitle = [
        {
            title:"Block",
        },
        {
            title:"Time",
        },
        {
            title:"Ex Count",
        },
        {
            title:"Event",
        }
    ]
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
            <div className="animate-pulse w-full mx-auto py-16  ">
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
                    <div className="flex">
                        <div className=" text-2xl mb-5 bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                            Finallized  Blocks
                        </div>
                    </div>

                    <div className="flex flex-col ">
                        <div className="overflow-x-auto ">
                            <div className="   min-w-full  ">
                                <div className="shadow overflow-auto rounded-lg border dark:border-W3GInfoBorderBG ">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                                        <thead className="bg-white  dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 ">
                                        <tr>
                                            {BlocksTitle.map(items=>(
                                            <th
                                                key={items.title}
                                                scope="col"
                                                className=" px-6 py-3 text-left text-sm font-semibold  text-center "
                                            >
                                                {items.title}
                                            </th>

                                                ))}
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                                        {blocks.map(block=>(
                                            <tr key={block.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center " >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium">
                                                    <button id={block.id} onClick={GetBlock}>
                                                        {block.blockHeight}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {DataDiff(block.timestamp)} Second ago
                                                </td>
                                                <td className=" px-14  py-4  whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                                    {block.extrinsicNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
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
    const [enabledNightMode,setEnabledNightMode] = useAtom(DarkModeAtom)
    return(
        <>
            <div className="w-96">
                <div className="flex w-96 text-gray-500 dark:text-gray-200 text-2xl mb-2.5 font-semibold">
                    News
                </div>
                <div className="  rounded-lg p-2 dark:bg-neutral-800 shadow-2xl ">
                    <div className="w-full ">
                        <div className=" "  id="container" >
                            <Link href="https://twitter.com/web3games/lists/1495961454490849280?ref_src=twsrc%5Etfw">
                                <a className="twitter-timeline"  data-width="400"  data-height="620" data-theme={classNames(enabledNightMode?"":"")}>
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
    const [enabledNightMode,] = useAtom(DarkModeAtom)

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
        <div className="mx-auto bg-gray-50 dark:bg-W3GBG  transition duration-700">
            <Head>
                <title>Web3Games Explorer  | Dashboard</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header/>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className=" mb-14">
                    <div className="my-10">
                        <div className="flex">
                        <div className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                            Web3Games Chain
                        </div>
                        </div>
                        <Search/>

                        <HotSearch/>
                        <div className=" xl:flex justify-between">
                            <div className="xl:w-7/12">
                                <Announcement/>
                                <Token/>
                            </div>
                            <Project/>
                        </div>
                        <div className="mt-20 w-full xl:flex justify-between ">
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


