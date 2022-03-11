import Header from "../../components/header";
import React, {Fragment, useEffect, useState} from "react";
import NFTHeader from "../../components/NFT-header";
import Sort from "../../components/sort";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {darkModeAtom, darkModeImg} from "../../jotai";


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
                        <div key={item.title} className="rounded-lg border my-3 mx-auto lg:m-3 ">

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
                                    <div className="text-gray-400 mr-1">
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
                                <div className="flex justify-between mt-3">
                                    <div className="flex">
                                        <div className="mr-2">
                                            <img className="w-6 h-6 rounded-lg" src="/web3gsmall.png" alt=""/>
                                        </div>
                                        <div className="mt-0.5">
                                            {item.money}
                                        </div>
                                    </div>

                                    <div className="flex">
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

                <Sort></Sort>
            </div>
        </>
    )
}
const NFTs=()=>{
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
                    <NFTHeader></NFTHeader>
                    <div className="bg-white p-5 rounded-lg mt-2">
                        <div className="flex ">
                            <div className="mt-0.5 text-base">
                                Sort by:
                            </div>
                            <div>
                                <div className="-mt-2 ml-2 ">
                                    <select
                                        id="location"
                                        name="location"
                                        className="mt-1 block w-full  border py-2 text-base border-gray-300  sm:text-sm rounded-md"
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
