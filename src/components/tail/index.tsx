import Link from "next/link"
import React, {useEffect, useState} from "react"
import {useAtom} from "jotai";
import {DarkModeAtom} from "../../jotai";
import {useRouter} from "next/router";
import {Switch} from "@headlessui/react";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
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

    const [enabledNightMode,setEnabledNightMode] = useAtom(DarkModeAtom)


    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
        }
    },[router.isReady])
    function dartchange() {
        if(enabledNightMode){
            setEnabledNightMode(!enabledNightMode);
            document.documentElement.classList.remove('dark');

        }else{
            setEnabledNightMode(!enabledNightMode);
            document.documentElement.classList.add('dark');
        }
    }
    return(
        <div className="border-t border-gray-200 bg-white dark:bg-W3GTopBG/80 backdrop-blur-sm  dark:border-W3GNavigationBorder pt-12 pb-1 px-10    ">
            <div className="md:flex justify-between  max-w-7xl mx-auto ">
                <div className="text-center md:flex justify-between  mt-4">
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
                    <img className="w-48"    src={classNames(enabledNightMode?"/web3gw1.svg":"/web3gb.svg") } alt=""/>
                    </div>
                    <div className="my-5 text-gray-500 text-sm text-center">
                        The best block explorer of Web3Games
                    </div>
                    <div className="flex w-full justify-center md:justify-end  ">
                        <div className="flex justify-center mt-3 ">

                            <Switch
                                checked={enabledNightMode}
                                onChange={dartchange}
                                className={classNames(
                                    enabledNightMode ? 'bg-gray-600' : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200   '
                                )}
                            >
                                <span className="sr-only">Use setting</span>

                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        enabledNightMode ? 'translate-x-5' : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full    transform ring-0 transition ease-in-out duration-200'
                                    )}
                                >

                                    <div className="flex justify-center text-center ml-0.5 px-2.5 p-0.5 bg-white dark:bg-gray-700 dark:text-yellow-400 rounded-full  text-lg">

                                <i className={enabledNightMode?" fa fa-sun-o":"fa fa-moon-o "} aria-hidden="true"></i>
                            </div>

                                </span>
                            </Switch>
                        </div>

                        {/*<select*/}
                        {/*    id="location"*/}
                        {/*    name="location"*/}
                        {/*    className="mt-2 block dark:bg-black h-8 dark:text-gray-200 font-medium  text-base text-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"*/}
                        {/*    defaultValue="English"*/}
                        {/*>*/}
                        {/*    <option>English</option>*/}

                        {/*</select>*/}

                    </div>
                    <div className="flex justify-center md:justify-end mt-10">
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
