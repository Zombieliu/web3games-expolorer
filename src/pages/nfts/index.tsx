import Header from "../../components/header";
import React, {Fragment, useEffect, useState} from "react";
import NFTHeader from "../../components/NFT-header";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, } from "../../jotai";
import Heads from "../../components/head";


const allnfts=[
    {
        img:"https://bafybeiaoktelkjneaqwiuvpugjs4oosdxhu3p7ynfykg7o5crutrxi7rnm.ipfs.dweb.link/1021.png",
        afimg:"",
        title:"INVOKERSNFT #1021",
        atitle:"",
        aicon:"",
        soldon:"Magiceden",
        asoldon:"",
        money:"1.002",
        time:"10 minutes ago",
    },
    {
        img:"https://www.arweave.net/ZhUUJszypIyc4s-XJ_kOTBUIvYISvqyvqh3y47RRs_E?ext=png",
        afimg:"",
        title:"SOCEAN PATHFINDER I",
        atitle:"",
        aicon:"",
        soldon:" Digital Eyes",
        asoldon:"",
        money:"1.39",
        time:"about 1 month ago",
    },
    {
        img:"https://www.arweave.net/eFfUpt1stBIlTvyHodBWTOMTJWXWrtKj21QBlRgq7KY?ext=png",
        afimg:"",
        title:"DUCK #3664",
        atitle:"",
        aicon:"",
        soldon:"Solanart",
        asoldon:"",
        money:"3.2",
        time:"about 1 month ago",
    },
    {
        img:"https://www.arweave.net/qZ2K4mhqqw8sjXj52zExEQkToABu_Rzisws45sxS6O8?ext=gif",
        afimg:"",
        title:"LOYAL FOUNDER #100",
        atitle:"",
        aicon:"",
        soldon:"Magiceden",
        asoldon:"",
        money:"0.66203928",
        time:"1 minute ago",
    },
    {
        img:"https://arweave.net/zmYGERlGdBfZnAX6NIPKsgR_I9oCESnDpznLyoCFcYM",
        afimg:"",
        title:"HONSHU WOLF #1265",
        atitle:"",
        aicon:"",
        soldon:"Magiceden",
        asoldon:"",
        money:"1.102",
        time:"4 minutes ago",
    }
]

const Content = () =>{
    return(
        <>
            <div className="mt-5">
                <div className="flex grid md:grid-cols-2 xl:grid-cols-4 text-xs lg:text-sm">
                    {allnfts.map(item=>(
                        <div key={item.title} className="rounded-lg border dark:border-neutral-700 my-3 mx-auto lg:m-3 ">

                            <div className="">
                                <Link  href={item.atitle}>
                                    <a>
                                        <img className="w-72 h-72 rounded-t"
                                             src={item.img} alt=""/>
                                    </a>
                                </Link>
                            </div>
                            <div className="p-3">
                                <div className="flex text-blue-400 font-semibold justify-between">
                                    <div>
                                        <a href={item.atitle}>
                                            {item.title}
                                        </a>
                                    </div>
                                    <Link href={item.aicon}>
                                        <a>
                                            <i className="fa fa-asterisk" aria-hidden="true"></i>
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex">
                                    <div className="text-gray-700 dark:text-gray-200 mr-1">
                                        Sold on:
                                    </div>
                                    <div className="text-blue-400  ">
                                        <Link href={item.asoldon}>
                                            <a>
                                                {item.soldon}
                                            </a>
                                        </Link>
                                    </div>

                                </div>
                                <div className="flex justify-between mt-3 items-center">
                                    <div className="flex">
                                        <div className="mr-2">
                                            <img className="w-6 h-6 rounded-lg" src="/web3gsmall.png" alt=""/>
                                        </div>
                                        <div className="mt-0.5 dark:text-gray-100">
                                            {item.money}
                                        </div>
                                    </div>

                                    <div className="flex dark:text-gray-100">
                                        <div className="mr-2">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                        </div>
                                        <div>
                                            {item.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/*<Sort></Sort>*/}
            </div>
        </>
    )
}
const NFTs=()=>{
    const router = useRouter()

    useEffect(()=>{
        if (router.isReady){

        }
    },[router.isReady])
    return(
        <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
            <Heads/>
            <Header/>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-10 mb-14">
                    <NFTHeader/>
                    <div className="bg-white border dark:border-neutral-700 dark:bg-neutral-800 p-5 rounded-lg mt-2">
                        <div className="flex items-center">
                            <div className="mt-0.5 text-base dark:text-gray-200">
                                Sort by:
                            </div>
                            <div>
                                <div className=" ml-2 ">
                                    <select
                                        id="location"
                                        name="location"
                                        className="mt-1 block w-full  border px-1 py-2 text-base border-gray-300 dark:border-neutral-800 dark:bg-neutral-500 dark:text-gray-200 outline-none sm:text-sm rounded-md"
                                        defaultValue="Last Trade"
                                    >
                                        <option>Last Trade</option>
                                        <option>Trade Count </option>

                                    </select>
                                </div>

                            </div>
                        </div>
                        <Content/>
                    </div>
                    </div>

            </div>

        </div>
    )

}
export default NFTs
