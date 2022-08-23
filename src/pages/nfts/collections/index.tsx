import Header from "../../../components/header";
import React, {useEffect} from "react";
import NFTHeader from "../../../components/NFT-header";
import Link from 'next/link';
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, } from "../../../jotai";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const title=[
    {
        title:"#"
    },
    {
        title:"Collection"
    },
    {
        title:"Items"
    },
    {
        title:"attributes"
    },
    {
        title:"Floor Price(W3G)"
    },
    {
        title:"Volume 24h(W3G)"
    },
    {
        title:"Last Trade "
    },
    {
        title:"Traded on"
    },
]
const collections=[
    {
        id:"1",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Magic Ticket: Normie",
        href:"",
        items:"507",
        attributes:"2",
        floorattributes:"1.25",
        volume:"4,488,69",
        lasttrade:"20 minutes ago",
        traded:[
            {
                id:"1",
                href:"",
                img:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png"
            },


        ]
    },
    {
        id:"1",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Magic Ticket: Normie",
        href:"",
        items:"507",
        attributes:"2",
        floorattributes:"1.25",
        volume:"4,488,69",
        lasttrade:"20 minutes ago",
        traded:[
            {
                id:"1",
                href:"",
                img:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png"
            },


        ]
    },
    {
        id:"1",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Magic Ticket: Normie",
        href:"",
        items:"507",
        attributes:"2",
        floorattributes:"1.25",
        volume:"4,488,69",
        lasttrade:"20 minutes ago",
        traded:[
            {
                id:"1",
                href:"",
                img:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png"
            },


        ]
    },
    {
        id:"1",
        img:"https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        name:"Magic Ticket: Normie",
        href:"",
        items:"507",
        attributes:"2",
        floorattributes:"1.25",
        volume:"4,488,69",
        lasttrade:"20 minutes ago",
        traded:[
            {
                id:"1",
                href:"",
                img:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png"
            },


        ]
    },


]

 const Content = () =>{
    return(
        <>
            <div className="bg-white dark:bg-neutral-800  p-5 rounded-lg mt-2">
                <div className="mt-5">
                    <div className="shadow overflow-auto    sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-500">
                            <thead className="bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-300">
                            <tr>
                                {title.map(title=>(
                                    <th key={title.title}
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold   "
                                    >
                                        {title.title}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-neutral-700 text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-neutral-500">
                            {collections.map(item=>(
                                <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600" >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  ">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium flex">

                                        <Link href={item.href} ><a className="flex">
                                            <img className="-ml-2 w-8 h-8 rounded-full"
                                                 src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt=""/>
                                            <div className="mt-2 ml-2">
                                                {item.name}
                                            </div>
                                        </a></Link>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {item.items}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {item.attributes}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {item.floorattributes}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {item.volume}
                                    </td>
                                    <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        <div>
                                            {item.lasttrade}
                                            <Link href=""><a className="text-blue-400">
                                                <i className="fa fa-arrow-right" aria-hidden="true"></i></a></Link>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex">
                                        {item.traded.map(item=>(

                                            <Link key={item.id} href={item.href}>
                                                <a className="mr-.05">
                                                    <img className="w-8 h-8 rounded-lg" src={item.img} alt=""/></a></Link>
                                        ))}
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>

        </>
    )
 }
const Collections=()=>{
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
            <Header></Header>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-10 mb-14">
                    <NFTHeader></NFTHeader>
                    <Content/>
                </div>

            </div>

        </div>
    )

}
export default Collections
