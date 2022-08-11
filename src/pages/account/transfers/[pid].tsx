import Header from "../../../components/header";
import React, {Fragment, useEffect, useState} from 'react';
import AccountOverview from '../../../components/Account-overview';
import Tail from '../../../components/tail';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Link from "next/link";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {AccountValue, DarkModeAtom, darkModeImg} from "../../../jotai";
import {useQuery} from "graphql-hooks";
import Error from "../../../components/error";
import {DetailsSkeleton} from "../../../components/skeleton";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const title=[
  {
    title:"Extrinsic Hash"
  },
  {
    title:"Extrinsic Block Height"
  },
  {
    title:"Time",
    i:"fa fa-clock-o ml-1"
  },
  {
    title:"From"
  },
  {
    title:"To"
  },
  {
    title:"Change Amount (W3G)"
  },

]

const StateStyles={
  up:" text-green-300 ",
  down:" text-red-500",
}


const Account_Info = `
 query HomePage($Account: String) {
   accountTransfers(first:5,orderBy:TIMESTAMP_ASC,filter:{
    fromAccount:{
      equalTo:$Account
    }
  }){
    nodes{
      id
      extrinsicHeight
      fromAccount
      toAccount
      balance
      timestamp
    }
  }
}
`

class ExtrinsicsInfo {
  private extrinsicHash: string;
  private blockHeight: string;
  private time: string;
  private from: string;
  private to:string;
  private change:string;

  constructor(
      extrinsicHash:string,
      blockHeight:string,
      time:string,
      from:string,
      to:string,
      change:string
  ) {
    this.extrinsicHash = extrinsicHash
    this.blockHeight = blockHeight
    this.time = time
    this.from = from
    this.to = to
    this.change = change
  }
}


function data_list(data: any){
  console.log(data)
  let times = data.accountTransfers.nodes.length;
  let data_list = [];
  for (let i = 0;i < times;i++){
    let result = new ExtrinsicsInfo(
        data.accountTransfers.nodes[i].id,
        data.accountTransfers.nodes[i].extrinsicHeight,
        GetBlockData(data.accountTransfers.nodes[i].timestamp),
        data.accountTransfers.nodes[i].fromAccount,
        data.accountTransfers.nodes[i].toAccount,
        data.accountTransfers.nodes[i].balance,
    )
    data_list.push(result)
  }
  return data_list
}


function second_data(data:any){
  let times = data.length;
  for (let i = 0;i < times;i++){
    const first1 = data[i].extrinsicHash.slice(0,6)
    const last1 = data[i].extrinsicHash.slice(-5,-1)
    const After1 = first1 + "...." + last1
    data[i].extrinsicHash = After1
    const first2 = data[i].from.slice(0,6)
    const last2 = data[i].from.slice(-5,-1)
    const After2 = first2 + "...." + last2
    data[i].from = After2
    const first3 = data[i].to.slice(0,6)
    const last3 = data[i].to.slice(-5,-1)
    const After3 = first3 + "...." + last3
    data[i].to = After3
    data[i].change = parseInt(String(data[i].change / 1000000000000000000));
  }
  return data
}


function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
}


const Transfers=()=>{
  const router = useRouter();
  const [account,setAccount] = useAtom(AccountValue)
  let [isOpen, setIsOpen] = useState(false)
  useEffect(()=>{
    if (router.isReady){
      const {pid} = router.query;
      setAccount(`${pid}`)
    }
  },[router.isReady])

  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [, setimg] = useAtom(darkModeImg)
  useEffect(()=>{
    if (router.isReady){
      if (enabledNightMode == true){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');

      }
    }
  },[router.isReady])

  const{loading,error,data} = useQuery(Account_Info,{
    variables:{
      Account:account
    }
  })
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  if (loading) {
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
          <DetailsSkeleton/>
        </div>
    )
  }

  if (error) {
    return (
        <div>
          <Error/>
        </div>
    )
  }

  if (data) {
    const first_data = data
    const first = data_list(data)
    // const first_data_check = data_list(first_data)
    const trades = second_data(first)
    return (
        <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-20 mb-14">
              <AccountOverview></AccountOverview>
              <div className="bg-white dark:bg-neutral-800 p-5 rounded-lg mt-2">
                <div className="mt-5">
                  <div className="shadow overflow-auto    sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-400">
                      <thead className="bg-gray-100 dark:bg-neutral-600 text-gray-500 dark:text-neutral-300">
                      <tr>
                        {title.map(title => (
                            <th key={title.title}
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold   "
                            >
                              {title.title}
                              <i className={title.i} aria-hidden="true"></i>
                            </th>
                        ))}
                      </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-neutral-700 text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-neutral-500">
                      {trades.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                            <td className="px-6 py-4 whitespace-nowrap text-sm  text-blue-400  ">
                              <Link href={item.extrinsicHash}>
                                <a className="">
                                  {item.extrinsicHash}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 ">
                              <Link href={item.blockHeight}>
                                <a>
                                  {item.blockHeight}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              <div className="text-gray-800 flex" id="from">
                                <a href={item.afrom} className="mr-1 text-blue-400">
                                  {item.from}
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 text-gray-500 dark:text-zinc-300">
                              <div className="text-gray-800 flex" id="from">
                                <a href={item.afrom} className="mr-1 text-blue-400">
                                  {item.to}
                                </a>
                              </div>
                            </td>
                            <td className={classNames(StateStyles[item.state], "px-6 py-4 whitespace-nowrap text-sm  ")}>
                              {item.change}
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    {/*<Sort></Sort>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tail></Tail>
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
                  <Dialog.Overlay className="fixed inset-0"/>
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
                  <div
                      className="inline-block  text-center max-w-md p-3  overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">

                    <div className="flex justify-center">
                      <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true"/>
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
}
export default Transfers
