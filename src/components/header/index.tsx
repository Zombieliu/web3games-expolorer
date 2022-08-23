import { Dialog, Disclosure, Listbox, Popover, Tab, Transition } from '@headlessui/react';
import Link from "next/link";
import { Switch } from '@headlessui/react'
import {MenuIcon, XIcon} from "@heroicons/react/outline";
import React, {Fragment, useEffect, useState} from "react";
import { CheckCircleIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { CopyValue, DarkModeAtom} from '../../jotai'
import { useAtom } from 'jotai';
import {useRouter} from "next/router";
import {use} from "i18next";
import {log} from "util";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const navigation = [
    { id:1 ,name: 'Home', href: '/home' },
    { id:2 ,name: 'Faucet', href: '/faucet' },

]
const blockchain=[
    {
        name:"Extrinsic",
        href:"/extrinsic",
    },
    {
        name:"Blocks",
        href:"/blocks",
    },
    {
        name:"EVM Blocks",
        href:"/evm_blocks",
    },
    {
        name:"EVM Transactions",
        href:"/evm_transactions",
    },

]

const publishingOptions = [
    // { title: 'Mainnet', href: 'https://api.devnet.solana.com', },
    { img:"/web3g2.png", title: 'Testnet', href: 'http://testnet-explorer.web3games.org/home', show:"testnet-explorer.web3games"},
    { img:"/web3g2.png", title: 'Devnet', href: 'http://devnet-explorer.web3games.org/home',  show:"devnet-explorer.web3games"},
]

const Copy = () =>{
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const  [isOpen, setIsOpen] = useAtom(CopyValue)
    return(
      <>
          <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="fixed inset-0 z-40  -mt-72"
                onClose={closeModal}
              >
                  <div className="min-h-screen px-4 text-center ">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                          <Dialog.Overlay className="fixed inset-0" />
                      </Transition.Child>

                      {/* This element is to trick the browser into centering the modal contents. */}
                      <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                      >
              &#8203;
            </span>
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                          <div className="inline-block  text-center max-w-md p-3  overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">

                              <div className="flex justify-center">
                                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                              </div>
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                  Copy successfully !
                              </Dialog.Title>
                          </div>
                      </Transition.Child>
                  </div>
              </Dialog>
          </Transition>

          </>
    )
}
const Header=()=>{
    const router = useRouter()
    const [enabledNightMode,setEnabledNightMode] = useAtom(DarkModeAtom)

    const [selected, setSelected] = useState(publishingOptions[0])
    const [SwitchState,setSwitchState] = useState(false)


    useEffect(()=>{
        if (router.isReady){
            if (enabledNightMode == true){
                document.documentElement.classList.add('dark');
            }else{
                document.documentElement.classList.remove('dark');
            }
            console.log(enabledNightMode)
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

    let net

    const getNet=(e)=>{
        router.push(e.target.id)
  }


    return(
        <header>
            <Popover className="relative bg-white  ">
                <div className="flex  fixed z-20 inset-x-0 bg-white/95 dark:bg-W3GTopBG/80 backdrop-blur-sm    transition duration-700 mb-10 pl-5 mb-5 justify-between items-center  p-2  sm:px-6 lg:justify-end md:space-x-10 lg:px-10  ">

                    <div className=" flex w-full justify-between lg:justify-start items-center">
                        <div className="flex justify-start  ">
                            <Link  href="/">
                                <a>
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className=" w-auto h-14  "
                                        src={classNames(enabledNightMode?"/web3gw1.svg":"/web3gb.svg") }
                                        // src="/web3gw1.svg"
                                        alt=""
                                    />
                                </a>
                            </Link>

                        </div>



                        <Tab.Group as="nav" className="hidden  lg:flex  space-x-10   pl-10">

                            {navigation.map((item) => (
                                <Tab.List key={item.name}>
                                <Link  href={item.href}>
                                <a  className=" ">
                                    <Tab  className={({ selected }) =>
                                        classNames(
                                            'w-full py-2.5  leading-5  rounded-lg text-base font-medium text-black  dark:text-white outline-none',
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
                            <Disclosure>

                                {({ open }) => (
                                  <>
                                      <div className="relative">

                                          <div className="flex  ">
                                              <Disclosure.Button  className='w-full py-2.5 text-sm leading-5  rounded-lg text-base font-medium text-black  dark:text-white flex focus: ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'>
                                                  Blockchain
                                                  <ChevronDownIcon
                                                    className={` w-5  `}
                                                    aria-hidden="true"
                                                  />

                                              </Disclosure.Button>
                                          </div>
                                          <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                          >
                                              <Disclosure.Panel className="absolute border-t border-gray-400 bg-white dark:bg-neutral-700 w-40 shadow-2xl rounded-b-lg mt-3 p-2">
                                                  {blockchain.map(item=>(
                                                    <a key={item.name} href={item.href} className="text-sm flex text-base hover:bg-gray-100 hover:text-black dark:hover:text-white dark:hover:bg-black rounded-md dark:border-gray-500 dark:text-gray-300  mb-2" >
                                                        <div className="  w-48">
                                                            <div className="p-2">
                                                                {item.name}
                                                            </div>

                                                        </div>
                                                    </a>
                                                  ))}

                                              </Disclosure.Panel>
                                          </Transition>


                                      </div>
                                  </>

                                )}
                            </Disclosure>




                        </Tab.Group>
                    </div>
                    {/*切换*/}

                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <Listbox.Label className="sr-only">Change published status</Listbox.Label>
                                <div className="relative  mt-2.5">
                                    <div className="inline-flex  rounded-md ">
                                        <div className="relative z-0 inline-flex   rounded-full  ">
                                            <Listbox.Button className="">

                                                <div className="relative rounded-lg   text-center  ">
                                                    <img
                                                        className="w-12  rounded-lg"
                                                        src="/web3g1.png"
                                                        alt=""
                                                    />
                                                    {/*<p id="NET" className="hidden mx-1 my-1  text-center text-sm font-medium">{selected.title}</p>*/}
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
                                        <Listbox.Options  className="origin-top-right absolute z-10 right-0 w-80  rounded-md shadow-lg overflow-hidden bg-gray-50  dark:bg-neutral-800 ">
                                            {publishingOptions.map((option) => (
                                                <Listbox.Option
                                                    key={option.title}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-gray-200 dark:bg-black' : 'text-gray-900 ',
                                                            '  relative m-3  text-sm rounded-md'
                                                        )
                                                    }
                                                    value={option}
                                                >
                                                    {({ selected, active }) => (
                                                       <button id={option.href} onClick={getNet}>
                                                           <div className={classNames(active ? '  ' : 'text-indigo-200', 'flex  p-2')}>
                                                               <img className="w-11 mr-4 " src={option.img} alt=""/>
                                                           <div className="flex flex-col ">
                                                            <div   className="flex justify-between text-sm">
                                                                <p id={option.href} className={selected ? 'font-normal text-black dark:text-gray-100' : 'font-semibold text-black dark:text-gray-100' }>
                                                                    {option.title}</p>
                                                                {selected ? (
                                                                    <span id={option.href} className='text-blue-400' >
                                                                        <CheckIcon  className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </div>
                                                            <p id={option.href} className={classNames(active ? '  ' : '', 'text-blue-400')}>
                                                                {option.show}
                                                            </p>
                                                        </div>
                                                           </div>
                                                       </button>
                                                    )}
                                                </Listbox.Option>

                                            ))}
                                            <div className="m-3 ">
                                                <div className="p-2">
                                                    <div className="font-semibold dark:text-gray-100">
                                                        Custom RPC
                                                    </div>
                                                    <input type="text"
                                                           className="mt-2 bg-gray-200 dark:bg-neutral-900 dark:placeholder-neutral-500 dark:text-gray-300  text-xs md:text-sm w-full  rounded-lg p-1.5 border dark:border-neutral-600  focus:border-black dark:focus:border-gray-200 focus:bg-white dark:bg-gray-300  outline-none"
                                                           placeholder="Enter RPC..."
                                                           id="RPC"
                                                    />
                                                    <button className="w-full text-center py-1 mt-2 bg-gray-200 dark:bg-neutral-700 dark:text-neutral-600 border dark:border-neutral-600 rounded-md cursor-not-allowed">
                                                        Connect
                                                    </button>

                                                </div>


                                            </div>


                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    <div className="  my-0.5 lg:hidden">
                        <Popover.Button className="bg-white  rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100  focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
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
                            <div className="rounded-lg  shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-black   transition duration-700 divide-y-2 divide-gray-50 dark:divide-neutral-700">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <img
                                                className="h-14 w-auto"
                                                src={enabledNightMode?"web3gw1.svg":"web3gb.svg"}
                                                alt="Workflow"
                                            />
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100  focus:ring-indigo-500">
                                                <span className="sr-only">Close menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>

                                </div>
                                <div className="py-6 ">
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center ">
                                        {navigation.map((item) => (
                                          <Link key={item.name} href={item.href}>
                                            <a
                                                className="text-base font-medium text-gray-900  dark:text-white   transition duration-700 "
                                            >
                                                {item.name}
                                            </a>
                                          </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>

                    </Transition>
                </div>
            </Popover>
            <Copy/>
        </header>
    )
}

export default Header
