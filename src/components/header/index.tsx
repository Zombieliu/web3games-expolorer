import {Dialog, Listbox, Popover, Tab, Transition, } from "@headlessui/react";
import Link from "next/link";
import { Switch } from '@headlessui/react'
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import React, {Fragment, useEffect, useState} from "react";
import { message, Button, Space } from 'antd';
import {CheckIcon, ChevronDownIcon} from "@heroicons/react/solid";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const navigation = [
    { id:1 ,name: 'Home', href: '/home' },
    { id:2 ,name: 'Tokens', href: '/tokens' },
    { id:3 ,name: 'NFTs', href: '/nfts' },
    { id:4 ,name: 'Faucet', href: '/faucet' },

]

const publishingOptions = [
    { title: 'Mainnet', href: 'https://api.devnet.solana.com', },
    { title: 'Testnet', href: 'https://api.devnet.solana.com',  },
    { title: 'Devnet', href: 'https://api.devnet.solana.com',  },
]

const Header=()=>{


    const [opentrue, setOpentrue] = useState(false)
    //
    //黑夜
    const [enabled, setEnabled] = useState(false)
    //背景图
    const [img, setimg] = useState('/web3gb.svg')
    //
    const [selected, setSelected] = useState(publishingOptions[0])

    function dartchange() {
        setEnabled(!enabled);
        if(enabled){
            document.documentElement.classList.remove('dark');
            setimg("web3gb.svg")
        }else{
            document.documentElement.classList.add('dark');
            setimg("web3gw1.svg")
        }
    }
    const connect = () => {
        message.success('This is a normal message');
    };

    const login =() => {
        setOpentrue(true)

    }
    let net
  const  getNet=()=>{
        net =document.getElementById("NET").innerHTML
      console.log(net)

  }


    return(
        <header>
            <Popover className="relative bg-white  ">
                <div className="flex  fixed z-20 inset-x-0 bg-white dark:bg-black   transition duration-700 mb-10 pl-5 mb-5 justify-between items-center  p-3 md:p-3 sm:px-6 lg:justify-end md:space-x-10 lg:px-10  ">

                    <div className=" flex w-full justify-between lg:justify-start">
                        <div className="flex justify-start  ">
                            <Link  href="/">
                                <a>
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className=" w-auto h-14  "
                                        src={img}
                                        alt=""
                                    />
                                </a></Link>

                        </div>



                        <Tab.Group as="nav" className="hidden  lg:flex  space-x-10 py-3 pt-3 pl-10">

                            {navigation.map((item) => (
                                <Tab.List key={item.name}>
                                <Link  href={item.href}>
                                <a  className=" ">
                                    <Tab  className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5 text-sm leading-5  rounded-lg text-base font-medium text-black  dark:text-white ',
                                            ' focus: ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                            selected
                                                ? 'text-black font-semibold '
                                                : ''
                                        )
                                    }>
                                        {item.name}
                                    </Tab>

                                </a>
                                </Link>
                                </Tab.List>
                            ))}



                        </Tab.Group>
                    </div>
                    {/*切换*/}
                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Change published status</Listbox.Label>
                                <div className="relative mr-2">
                                    <div className="inline-flex  rounded-md ">
                                        <div className="relative z-0 inline-flex   rounded-md  ">


                                            <Listbox.Button className="pt-1">

                                                <div className="relative  items-center bg-indigo-500 text-center   rounded-lg  text-white">
                                                    <img
                                                        className="w-14 h-10 rounded-lg"
                                                        src="/web3g1.png"
                                                        alt=""
                                                    />
                                                    <p id="NET" className="hidden mx-1 my-1  text-center text-sm font-medium">{selected.title}</p>
                                                </div>
                                            </Listbox.Button>
                                        </div>
                                    </div>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="origin-top-right absolute z-10 right-0 w-52  rounded-md shadow-lg overflow-hidden bg-gray-50   ">
                                            {publishingOptions.map((option) => (
                                                <Listbox.Option
                                                    key={option.title}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? '' : 'text-gray-900',
                                                            '  relative p-2  text-sm'
                                                        )
                                                    }
                                                    value={option}
                                                >
                                                    {({ selected, active }) => (
                                                       <button onClick={getNet}><div className="flex flex-col ">
                                                            <div className="flex justify-between text-base">
                                                                <p  className={selected ? 'font-normal' : 'font-semibold'}>{option.title}</p>
                                                                {selected ? (
                                                                    <span className='text-blue-400' >
                                                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                                ) : null}
                                                            </div>
                                                            <p className={classNames(active ? '  ' : 'text-indigo-200', 'text-blue-400')}>
                                                                {option.href}
                                                            </p>
                                                        </div></button>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <div className="-mr-2  my-0.5 lg:hidden">
                        <Popover.Button className="bg-white  rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>


                    <div className="hidden lg:flex w-full justify-end md:flex-1 ">
                        <div>
                            <button onClick={login} className="bg-gray-900 dark:bg-gray-600 transition duration-700  w-36 p-3 text-gray-100 dark:text-gray-300 rounded-lg mr-10 flex justify-center">
                                Connect Wallet
                            </button>
                        </div>

                        <div className="flex justify-center mt-3 mr-2">

                        <Switch
                            checked={enabled}
                            onChange={dartchange}
                            className={classNames(
                                enabled ? 'bg-gray-600' : 'bg-gray-200',
                                'relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200   '
                            )}
                        >
                            <span className="sr-only">Use setting</span>

                            <span
                                aria-hidden="true"
                                className={classNames(
                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 rounded-full    transform ring-0 transition ease-in-out duration-200'
                                )}
                            >

                                    <div className="flex justify-center text-center ml-0.5 px-2.5 p-0.5 bg-white dark:bg-gray-700 dark:text-yellow-400 rounded-full  text-lg">

                                <i className={enabled?" fa fa-sun-o":"fa fa-moon-o "} aria-hidden="true"></i>
                            </div>

                                </span>
                        </Switch>
                        </div>

                        <select
                            id="location"
                            name="location"
                            className="mt-2 block dark:bg-black h-8 dark:text-gray-200 font-medium  text-base text-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue="English"
                        >
                            <option>English</option>

                        </select>

                    </div>


                </div>

                <div className="fixed z-20 inset-x-0">
                    <Transition
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute my-auto  fixed z-20 inset-x-0  min-h-screen  inset-y-auto   p-2 transition transform origin-top-right lg:hidden"
                        >
                            <div className="rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-black   transition duration-700 divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-14 w-auto"
                                                src={img}
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>

                                </div>
                                <div className="py-6 ">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center ">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="text-base font-medium text-gray-900  dark:text-white   transition duration-700 "
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>


                                </div>
                                <div className="flex justify-center p-5 items-center">
                                    <div className=" w-full   ">
                                        <div className="flex justify-center ">
                                            <button  className="bg-black w-36 p-2 text-center text-white rounded-lg   ">
                                                Connect Wallet
                                            </button>
                                        </div>

                                        <div className="flex justify-between">

                                        <select
                                            id="location"
                                            name="location"
                                            className="mt-1 block   font-medium  text-base text-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            defaultValue="English"
                                        >
                                            <option>English</option>

                                        </select>
                                            <Switch
                                              checked={enabled}
                                              onChange={dartchange}
                                              className={classNames(
                                                enabled ? 'bg-gray-600' : 'bg-gray-200',
                                                'relative inline-flex flex-shrink-0 h-7 w-12 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200   '
                                              )}
                                            >
                                                <span className="sr-only">Use setting</span>

                                                <span
                                                  aria-hidden="true"
                                                  className={classNames(
                                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                                    'pointer-events-none inline-block h-5 w-5 rounded-full    transform ring-0 transition ease-in-out duration-200'
                                                  )}
                                                >

                                    <div className="flex justify-center text-center ml-0.5 px-2.5 p-0.5 bg-white dark:bg-gray-700 dark:text-yellow-400 rounded-full  text-lg">

                                <i className={enabled?" fa fa-sun-o":"fa fa-moon-o "} aria-hidden="true"></i>
                            </div>

                                </span>
                                            </Switch>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>

                    </Transition>
                    <Transition.Root show={opentrue} as={Fragment}>
                        <Dialog as="div" className="fixed z-20 inset-0 overflow-y-auto " onClose={setOpentrue}>
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                {/* This element is to trick the browser into centering the modal contents. */}
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;
          </span>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:y-8 sm:align-middle  sm:p-6 lg:p-12 ">
                                        <div>
                                            <div className='flex justify-between text-xl font-light	'>

                                                    <div className=" font-bold mb-2 text-2xl">
                                                        Connect your wallet
                                                    </div>
                                                <button  onClick={() => setOpentrue(false)}
                                                         className="fa fa-times " aria-hidden="true"></button>
                                            </div>
                                            <div className="text-base text-gray-600 w-96 mr-8">
                                                Connect with one of available wallet providers or create a new wallet.</div>


                                            <button className="bg-black flex justify-between text-white p-4 rounded-lg w-full my-8">
                                                <div className="text-lg font-semibold">
                                                    MetaMask
                                                </div>
                                                <div>
                                                    <img className="w-8 h-8" src="https://portal.web3games.org/icon-wallet-metamask.svg" alt=""/>
                                                </div>
                                            </button>

                                            <button className="bg-black flex justify-between text-white p-4 rounded-lg w-full my-8">
                                                <div className="text-lg font-semibold">
                                                    WalletConnect
                                                </div>
                                                <div>
                                                    <img className="w-8 h-8" src="https://portal.web3games.org/icon-wallet-walletconnect.svg" alt=""/>
                                                </div>
                                            </button>
                                            <button className="bg-black flex justify-between text-white p-4 rounded-lg w-full my-8">
                                                <div className="text-lg font-semibold">
                                                   Polkadotjs
                                                </div>
                                                <div>
                                                    <img className="w-8 h-8 rounded-lg" src="https://cdn.discordapp.com/attachments/876498266550853642/908665467273613392/unknown.png" alt=""/>
                                                </div>
                                            </button>
                                            <div className="text-sm text-gray-500 w-96 ">
                                                We do not own your private keys and cannot access your funds without your confirmation.
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </div>
            </Popover>
        </header>
    )
}

export default Header
