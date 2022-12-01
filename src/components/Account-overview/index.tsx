import Link from 'next/link';
import React, {Fragment, useEffect, useState} from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import {useAtom} from "jotai";
import {AccountBalanceValue, AccountValue, DarkModeAtom} from "../../jotai";
import {useRouter} from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
  {
    title:"Token"
  },
  {
    title:"Amount "
  },
  {
    title:"Value",
  },

]
const overview = [
  {
    img:"/web3gsmall.png",
    name: 'W3G',
    amount: '1',
    value:"$92.0149",
    href: 'https://web3games.com/',

  },
  // {
  //   img:"/icp.png",
  //   name: 'ICP',
  //   amount: '1',
  //   value:"$18.8330",
  //   href: 'https://dfinity.org/',
  //
  // },
  // {
  //   img:"/near.png",
  //   name: 'Near',
  //   amount: '1',
  //   value:"$11.3020",
  //   href: 'https://near.org/',
  // },
]

const AccountOverview=(props:any)=>{
  const [account,] = useAtom(AccountValue);

  let [isOpen, setIsOpen] = useState(false);
  const [pathname,setPathname] = useState("")
  const router = useRouter()
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  useEffect(()=>{
    if (router.isReady){
      if (enabledNightMode == true){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }

      const content = router.asPath
      const fetchUserBounty = async () => {
        setPathname(content)

      }
      fetchUserBounty()
    }
  },[router.isReady])

  // function insertStr(source, start, newStr){
  //   return source.slice(0, start) + newStr + source.slice(start);
  // }
  //
  //
  // useEffect(()=>{
  //     if (Number(balance) >= 100000000){
  //       const result = insertStr(balance,9,'.')
  //       setBalance(result)
  //     }
  // },[])

  const navigation = [
    { id:1 ,name: 'Extrinsics ', href:`/account/${account}` },
    { id:2 ,name: 'W3G Transfers', href:`/account/w3g-transfers/${account}` },
    { id:3 ,name: 'FT Transfers', href:`/account/ft-transfers/${account}` },
    { id:4 ,name: 'NFT Transfers', href:`/account/nft-transfers/${account}` },
    { id:5 ,name: 'MT Transfers', href:`/account/mt-transfers/${account}` },
  ]


  const Copy=(span)=>{

    const spanText = document.getElementById(span).innerText;
    const oInput = document.createElement('input');
    oInput.value = spanText;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    document.body.removeChild(oInput);
    if(oInput){
      setIsOpen(true)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  return(
    <div>
      <div className="lg:flex justify-between ">
        <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
          Account
        </div>
        {/*<div className="flex ">*/}
        {/*  <input type="text"*/}
        {/*         className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white dark:border-gray-500 dark:bg-gray-700 outline-none"*/}
        {/*         placeholder="Search transactions, blocks, programs and token"*/}
        {/*  />*/}
        {/*  <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 -ml-11">*/}
        {/*    <i className="fa fa-search" aria-hidden="true"></i></div>*/}
        {/*</div>*/}
      </div>
      <div className="flex dark:text-white items-center">
        <div id="account" className="text-xs mt-2 lg:text-base mr-2 ">
          {account}
        </div>
        <div>
          <button onClick={() => {
            // @ts-ignore
            Copy("account");
          }}> <img className="w-4 ml-1 mt-3" src="/copy.svg" alt=""/></button>
        </div>
      </div>

      <div className="lg:flex justify-between py-6 w-full  ">
        <div className="bg-white dark:bg-neutral-800 p-5 rounded-lg w-full mb-2 lg:w-1/2 mr-10 shadow-lg">
          <div className="text-2xl font-semibold mb-3  dark:text-gray-100">
            Overview
          </div>
          <div className="flex  ">
          <div className='flex-col justify-between mr-20 xl:mr-56 text-gray-400'>
            <div className="mb-3 flex">
              <div className="text-black dark:text-white font-semibold mr-1">
                W3G
              </div>
              Balance
            </div>
            {/*<div className='mb-3'>*/}
            {/*  FT Token Balance*/}
            {/*</div>*/}
          </div>

          <div className="">
            <div className="flex mb-3">
            <div className="font-semibold mr-1 dark:text-white">{props.data.amount}  </div>
            <div className="ml-0.5 bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">W3G</div>
            <div className="text-gray-600 dark:text-gray-200">($55.2)</div>
            </div>
            {/*<div>*/}
            {/*  <div className="flex mb-3">*/}
            {/*   <div className="font-semibold mr-1"> 4 FT tokens </div>*/}
            {/*    <div className="text-gray-600">($0.28)</div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          </div>
          <div className="w-full    top-16">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? '' : 'text-opacity-90'}
                text-black group bg-orange-700 px-3 py-2 w-full border bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A5D8F5] focus-visible:ring-opacity-75`}
                  >
                    <div className="flex justify-between w-full dark:text-white">

                      <div className="flex">
                        <img className='w-8 h-8 ' src='/web3gsmall.png' alt='' />

                        <div className="mt-1 ml-2">
                          W3G
                        </div>
                      </div>
                      <div className="mt-1">
                        {props.data.amount}
                      </div>
                      <div className="mt-1">
                        $55.2
                      </div>
                    <ChevronDownIcon
                      className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 mt-1.5 text-black dark:text-white group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10  border border-[#A5D8F5] rounded-lg overflow-hidden  mt-3   w-full">
                      <table className="min-w-full rounded-lg divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                        <thead className="bg-white  dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
                        <tr>
                          {tokenstitle.map(title => (
                              <th key={title.title}
                                  scope="col"
                                  className="p-6 w-36 text-sm  font-semibold   "
                              >
                                {title.title}
                                {/*<i className={title.i} aria-hidden="true"></i>*/}
                              </th>
                          ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                        {overview.map(item => (
                            <tr key={item.href} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                              <td className="px-6 py-2  whitespace-nowrap text-sm font-medium   ">
                                <Link href={item.href}>
                                  <a  className="flex  items-center text-left">
                                    <div>
                                      <img className='w-8 h-8' src={item.img} alt='' />
                                    </div>
                                    <div className="ml-2 ">
                                      <div className=" text-sm font-semibold">
                                        {item.name}
                                      </div>
                                      <div className="text-xs">
                                        $0.00229394
                                      </div>
                                    </div>

                                  </a>
                                </Link>
                              </td>
                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                <div className="mt-1 ">
                                  {item.amount}
                                </div>
                              </td>

                              <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                <div className="mt-1 ">
                                  {item.value}
                                </div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>


        </div>
        <div className="bg-white dark:bg-neutral-800 dark:text-gray-200 p-5 rounded-lg w-full mb-2 lg:w-1/2 shadow-lg">
          <div className="text-2xl font-semibold mb-3 ">
            More info
          </div>
          <div className="flex justify-between border-b dark:border-gray-500">
            <div className='flex-col justify-between mr-20 text-gray-400 '>
              <div className="mb-3 flex">
                <div className="text-black dark:text-white font-semibold mr-1">
                  W3G
                </div>
                 Balance
              </div>
              {/*<div className='mb-3'>*/}
              {/*  FT Tokens Value*/}
              {/*</div>*/}
            </div>

            <div className="">
              <div className="flex mb-3">
                <div className="font-semibold mr-1 ">  {props.data.amount} </div>
                <div className="ml-0.5 bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                  W3G
                </div>
              </div>
              {/*<div>*/}
              {/*  <div className="flex mb-3">*/}
              {/*    <div className="font-semibold mr-1"> ~= 0 W3G</div>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>


      <div className="flex justify-between mt-5  w-full font-semibold text-sm lg:text-lg bg-white shadow-lg dark:bg-[#262626]  p-2 rounded-md">
        {navigation.map(item=>(
          <div key={item.id} className="pr-8 text-gray-500 ">
            <Link href={item.href}>
              <a className={classNames(`${item.href}` == `${pathname}` ?"bg-clip-text text-transparent  bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3 ":"",'p-2 ')}>
                {item.name}
              </a>
            </Link>
          </div>
        ))}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40  -mt-96"
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
    </div>
  )
}
export default AccountOverview
