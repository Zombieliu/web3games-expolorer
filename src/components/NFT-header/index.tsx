import React, {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, darkModeImg} from "../../jotai";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const navigation = [

    { id:1 ,name: 'All NFTs', href:'/nfts' },
    { id:2 ,name: 'Collections', href:'/nfts/collections' },
    { id:3 ,name: 'Trades', href:'/nfts/trades' },
    { id:4 ,name: 'New NFTs', href:'/nfts/newNft' },

]
const NFTHeader=()=>{
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
        <div>
            <div className="lg:flex justify-between  items-center">
                <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                    NFT dashboard
                </div>
                <div className="flex ">
                    <input type="text"
                           className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white  dark:bg-neutral-900  dark:text-white dark:focus:border-neutral-400 focus:border-neutral-700  dark:bg-gray-300  dark:border-neutral-700 outline-none"
                           placeholder="Search transactions, blocks, programs and token"
                           autoComplete="off"
                    />
                    <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 dark:text-gray-300 -ml-11">
                        <i className="fa fa-search" aria-hidden="true"></i></div>
                </div>
            </div>
            <div className="flex justify-start mt-5   text-xs lg:text-lg ">
                {navigation.map(item=>(
                    <div key={item.id} className="pr-8">
                        <Link href={item.href}>
                            <a className="text-gray-700 dark:text-gray-200">
                                {item.name}
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default NFTHeader
