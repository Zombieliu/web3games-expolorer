import Header from "../../../components/header";
import React, {useEffect} from "react";
import NFTHeader from "../../../components/NFT-header";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom} from "../../../jotai";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const title=[
    {
        title:"#"
    },
    {
        title:"NFT"
    },
    {
        title:"Sold on"
    },
    {
        title:"Price(W3G)"
    },
    {
        title:"Buyer"
    },
    {
        title:"Transaction"
    },
    {
        title:"Time",
        i:"fa fa-clock-o"
    },

]
const trades=[
    {
        id:"1",
        img:"https://www.arweave.net/8hv1jEW1jv5dbcrKszYw3GivVgjLIB64COl-RTy10tc?ext=png",
        name:"Meta Ocean Box - AREA (-7,3)",
        aname:"",
        sold:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png",
        asold:"",
        price:"4.252",
        buyer:"5zVgPyDqmqd3qxfqmmZJZ...",
        abuyer:"",
        transaction:"8qvsZT3dmW5N2pgjtztqS6...",
        atransaction:"",
        time:"1 minute ago",

    },
    {
        id:"2",
        img:"https://www.arweave.net/8hv1jEW1jv5dbcrKszYw3GivVgjLIB64COl-RTy10tc?ext=png",
        name:"Meta Ocean Box - AREA (-7,3)",
        aname:"",
        sold:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png",
        asold:"",
        price:"4.252",
        buyer:"5zVgPyDqmqd3qxfqmmZJZ...",
        abuyer:"",
        transaction:"8qvsZT3dmW5N2pgjtztqS6...",
        atransaction:"",
        time:"1 minute ago",

    },
    {
        id:"3",
        img:"https://www.arweave.net/8hv1jEW1jv5dbcrKszYw3GivVgjLIB64COl-RTy10tc?ext=png",
        name:"Meta Ocean Box - AREA (-7,3)",
        aname:"",
        sold:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png",
        asold:"",
        price:"4.252",
        buyer:"5zVgPyDqmqd3qxfqmmZJZ...",
        abuyer:"",
        transaction:"8qvsZT3dmW5N2pgjtztqS6...",
        atransaction:"",
        time:"1 minute ago",

    },
    {
        id:"4",
        img:"https://www.arweave.net/8hv1jEW1jv5dbcrKszYw3GivVgjLIB64COl-RTy10tc?ext=png",
        name:"Meta Ocean Box - AREA (-7,3)",
        aname:"",
        sold:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png",
        asold:"",
        price:"4.252",
        buyer:"5zVgPyDqmqd3qxfqmmZJZ...",
        abuyer:"",
        transaction:"8qvsZT3dmW5N2pgjtztqS6...",
        atransaction:"",
        time:"1 minute ago",

    },
    {
        id:"5",
        img:"https://www.arweave.net/8hv1jEW1jv5dbcrKszYw3GivVgjLIB64COl-RTy10tc?ext=png",
        name:"Meta Ocean Box - AREA (-7,3)",
        aname:"",
        sold:"https://solscan.io/static/media/logo-magiceden.c03f39c4.png",
        asold:"",
        price:"4.252",
        buyer:"5zVgPyDqmqd3qxfqmmZJZ...",
        abuyer:"",
        transaction:"8qvsZT3dmW5N2pgjtztqS6...",
        atransaction:"",
        time:"1 minute ago",

    },

]

const Content = () =>{
    return(
        <>
            <div className="bg-white dark:bg-neutral-800 p-5 rounded-lg mt-2">
                <div className="mt-5">
                    <div className="shadow overflow-auto    sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-500">
                            <thead className="bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-300">
                            <tr>
                                {title.map(title=>(
                                    <th key={title.title}
                                        scope="col"
                                        className="px-6 py-3 text-left text-sm font-semibold  "
                                    >
                                        {title.title}
                                        <i className={title.i} aria-hidden="true"></i>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-neutral-700 text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-neutral-500">
                            {trades.map(item=>(
                                <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600" >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  ">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium flex">
                                        <a href={item.aname}  className="flex mt-1.5">
                                            <img className="-ml-2 w-8 h-8 rounded-full"
                                                 src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" alt=""/>
                                            <div className="mt-2 ml-2">
                                                {item.name}
                                            </div>
                                        </a>
                                    </td>
                                    <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        <a href={item.asold}>
                                            <img className="w-8 h--8" src={item.sold} alt=""/>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {item.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400">
                                        <a href={item.abuyer}>
                                            {item.buyer}
                                        </a>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 ">
                                        <a href={item.atransaction}>
                                            {item.transaction}
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                        {item.time}
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
const Trades=()=>{
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
export default Trades
