import Header from "../../../components/header";
import React, {Fragment, useEffect, useState} from "react";
import NFTHeader from "../../../components/NFT-header";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, } from "../../../jotai";
import Heads from "../../../components/head";


const newnfts=[
    {
        img:"https://arweave.net/E8hAolqwS05LLRZgwmYJfMYan4WUZwr1KvBrJUdw7P8",
        afimg:"",
        title:"ACID BORYOKU DRAGONZ #0240",
        atitle:"",
        aicon:"",
        time:"1 minute ago",
        atime:"",
    },
    {
        img:"https://arweave.net/56CPBniqNGa5GyziChmhWmp-8ntEu91MDzBsLfm3ugA",
        afimg:"",
        title:"ACID BORYOKU DRAGONZ #0455",
        atitle:"",
        aicon:"",
        time:"1 minute ago",
        atime:"",
    },
    {
        img:"https://www.arweave.net/9H2SgCpXfWmIlaA2JR2WL_vM86KF70UaCwEvMV9UL8A?ext=png",
        afimg:"",
        title:"CANINE #250",
        atitle:"",
        aicon:"",
        time:" 2 minutes ago",
        atime:"",
    },
    {
        img:"https://arweave.net/5pwTwo0MIJ8ls8pZqwrhaj0gwvnwY_UqPI7q_gysKeY",
        afimg:"",
        title:"ACID BORYOKU DRAGONZ #0691",
        atitle:"",
        aicon:"",
        time:" 2 minutes ago",
        atime:"",
    },
    {
        img:"https://www.arweave.net/t9fU_oVP2sbBSdVPzsREetmUuJfBl1WP0hgzR5fcx8g?ext=png",
        afimg:"",
        title:"FISHBALL REPUBLIC #4820",
        atitle:"",
        aicon:"",
        time:" 5 minutes ago",
        atime:"",
    },

]


const Content = () =>{
    return (
        <div className="bg-white dark:bg-neutral-800 p-5 rounded-lg mt-2">
            <div className="mt-5">
                <div className="flex grid md:grid-cols-2 xl:grid-cols-4 text-xs lg:text-sm  ">
                    {newnfts.map(item=>(
                        <div key={item.title} className="rounded-lg border dark:border-neutral-700 my-3 mx-auto lg:m-3 ">

                            <div className="">
                                <Link href={item.atitle}>
                                    <a>
                                        <img className="w-72 h-72 rounded-t"
                                             src={item.img} alt=""/>
                                    </a>
                                </Link>
                            </div>
                            <div className="p-3">
                                <div className="flex text-blue-400 font-semibold justify-between">
                                    <div>
                                        <Link href={item.atitle}>
                                            <a >
                                                {item.title}
                                            </a>
                                        </Link>
                                    </div>
                                    <Link href={item.aicon}>
                                        <a>
                                            <i className="fa fa-asterisk" aria-hidden="true"></i>
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex justify-between mt-3 dark:text-zinc-300">
                                    <div className="flex">
                                        <div>
                                            Minted:
                                        </div>
                                        <div className="mx-1">
                                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                                        </div>
                                        <div >
                                            {item.time}
                                        </div>
                                        <div className="text-blue-400 ml-2">
                                            <Link href={item.atime}>
                                                <a>
                                                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/*<Sort/>*/}
            </div>
        </div>
    )
}
const NewNFT=()=>{
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
        <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
            <Heads/>
            <Header/>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-10 mb-14">
                    <NFTHeader/>
                    <Content/>
                </div>
            </div>
        </div>
    )

}
export default NewNFT
