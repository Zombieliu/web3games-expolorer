import Link from "next/link"
import React, {useEffect, useState} from "react"
import {useAtom} from "jotai";
import {DarkModeAtom, darkModeImg} from "../../jotai";
import {useRouter} from "next/router";



const ends =[
    {
        title:"Explore",
        content:[
            {
                h1:"Home",
                href:"https://web3games.org/",
            },
            {
                h1:"Team",
                href:"https://web3games.org/team",
            },
            {
                h1:"Token",
                href:"https://web3games.org/token",
            }
        ]

    },
    {
        title:"Resources",
        content:[
            {
                h1:"Docs",
                href:"https://docs.web3games.org/",
            },
            {
                h1:"Medium",
                href:"https://medium.com/web3games",
            },
            {
                h1:"GitHub",
                href:"https://github.com/web3gamesofficial",
            }
        ]

    },
    {
        title:"Participate",
        content:[
            {
                h1:"Discord",
                href:"https://discord.com/invite/web3games",
            },
            {
                h1:"Twitter",
                href:"https://twitter.com/web3games",
            },
            {
                h1:"Telegram",
                href:"https://t.me/web3gamesofficial",
            }
        ]

    }
]
const participate=[
    {
        href:"https://t.me/web3gamesofficial",
        icon:"fa fa-telegram"
    },
    {
        href:"https://twitter.com/web3games",
        icon:"fa fa-twitter",
    },
    {
        href:"https://discord.com/invite/web3games",
        icon:"fa fa-reddit",
    },
    {
        href:"https://medium.com/web3games",
        icon:"fa fa-medium",
    }

]
const Tail=()=>{
    const router = useRouter()
    const [enabledNightMode,] = useAtom(DarkModeAtom)
    const [img, ] = useAtom(darkModeImg)
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
        <div className="border-t border-gray-200 bg-white dark:bg-W3GTopBG/80 backdrop-blur-sm  dark:border-W3GNavigationBorder pt-12 pb-1 px-10    ">
            <div className="md:flex justify-between  max-w-7xl mx-auto">
                <div className="text-center md:flex justify-between ">
                    {ends.map(end=>(
                    <div key={end.title} className="mx-10" >
                    <div className="text-gray-700 font-semibold text-base dark:text-gray-300">
                        {end.title}
                    </div>
                        {end.content.map(item=>(
                    <div key={item.h1} className="my-3 text-gray-500 text-sm transition  duration-300 transform hover:translate-x-2 dark:text-gray-400">

                        <Link href={item.href}>
                        <a>
                            {item.h1}
                        </a>
                        </Link>
                    </div>))}
                    </div>
                    ))}
                </div>
                <div>
                    <div  className="flex justify-center md:justify-end " >
                    <img  src={img} alt=""/>
                    </div>
                    <div className="my-5 text-gray-500 text-sm text-center">
                        The best block explorer of Web3Games
                    </div>
                    <div className="flex justify-center md:justify-start mt-10">
                        {participate.map(item=>(
                    <div key={item.icon} className="mr-5">
                        <Link href={item.href}>
                        <a  className="text-gray-500 hover:text-gray-500">
                        <i className={item.icon} aria-hidden="true"></i></a></Link>

                    </div> ))}
                    </div>
                </div>

            </div>
            <div className="max-w-7xl mx-auto md:pl-10 my-5 text-gray-500">
            © 2021 Web3Games</div>
        </div>
    )
}
export  default Tail
