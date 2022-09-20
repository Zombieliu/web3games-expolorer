import Header from "../../../components/header";
import React, {Fragment, useEffect, useState} from 'react';
import AccountOverview from '../../../components/Account-overview';
import Tail from '../../../components/tail';
import { Dialog, Transition } from '@headlessui/react';
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid';
import Link from "next/link";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {AccountValue, DarkModeAtom, extrinsicPageNumberValue, SelectNumber} from "../../../jotai";
import {useQuery} from "graphql-hooks";
import Error from "../../../components/error";
import {DetailsSkeleton} from "../../../components/skeleton";
import {showAccount} from "../../../utils";
import Heads from "../../../components/head";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const title=[
  {
    title:"Extrinsic Hash"
  },
  {
    title:"Block Height"
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
  true:" text-green-300 ",
  false:" text-red-500",
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


const W3G_Transfers=()=>{
  let extrinsic_number_pages = (20 / 20)
  const dataInfo = [
    {
      id:"1",
      extrinsicHash:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      blockHeight:"1-0",
      time:"Tue, 06 Sep 2022 02:18:12 GMT",
      from:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      to:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      state:"true",
      afrom:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      change:"0.2",
    },
    {
      id:"1",
      extrinsicHash:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      blockHeight:"1-0",
      time:"Tue, 06 Sep 2022 02:18:12 GMT",
      from:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      to:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      state:"true",
      afrom:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      change:"0.2",
    },
    {
      id:"1",
      extrinsicHash:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      blockHeight:"1-0",
      time:"Tue, 06 Sep 2022 02:18:12 GMT",
      from:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      to:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      state:"true",
      afrom:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      change:"0.2",
    },
    {
      id:"1",
      extrinsicHash:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      blockHeight:"1-0",
      time:"Tue, 06 Sep 2022 02:18:12 GMT",
      from:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      to:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ed",
      state:"true",
      afrom:"0xcca747b57250cc8e53fc50b3271178361d5e629dfc8355372862c49e6ba1239f",
      change:"0.2",
    },

  ]
  const router = useRouter();
  const [account,setAccount] = useAtom(AccountValue)
  let [isOpen, setIsOpen] = useState(false)
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
  const [select_number,setSelect_number] = useAtom(SelectNumber)
  useEffect(()=>{
    const {pid} = router.query;
    setAccount(`${pid}`)
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

  const Select = (e) =>{
    setSelect_number(Number(e.target.value))
    SetextrinsicPageNumber(1)
  }

  const addPageCounter = ()=>{
    // if (extrinsicPageNumber != extrinsic_number_pages){
    //     SetextrinsicPageNumber(extrinsicPageNumber + 1)
    // }
  }

  const decPageCounter = ()=>{
    // if (extrinsicPageNumber != 1){
    //     SetextrinsicPageNumber(extrinsicPageNumber - 1)
    // }
  }

  const lastPage = ()=>{
    // SetextrinsicPageNumber(extrinsic_number_pages)
  }

  const firstPage = ()=>{
    SetextrinsicPageNumber(1)
  }

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
          <Heads/>
          <Header/>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-10 mb-14">
              <AccountOverview></AccountOverview>
              <div className="rounded-lg mt-2">
                <div className="mt-5">
                  <div className="shadow overflow-auto bg-white dark:bg-W3GInfoBG rounded-lg border dark:border-W3GInfoBorderBG ">
                    <table className="min-w-full border-b divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                      <thead className=" text-gray-500 dark:text-neutral-300">
                      <tr>
                        {title.map(title => (
                            <th key={title.title}
                                scope="col"
                                className="p-6  text-left text-sm xl:text-base font-semibold   "
                            >
                              {title.title}
                              <i className={title.i} aria-hidden="true"></i>
                            </th>
                        ))}
                      </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                      {dataInfo.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                            <td className="px-6 py-4 whitespace-nowrap text-sm  text-blue-400  ">
                              <Link  href={`/extrinsics/${item.extrinsicHash}`}>
                                  {classNames(showAccount(item.extrinsicHash,))}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 ">
                              <Link  href={`/extrinsics/${item.extrinsicHash}`}>
                                <a >
                                  {item.blockHeight}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              <div className="text-gray-800 flex" id="from">
                                <a href={item.afrom} className="mr-1 text-blue-400  ">
                                  {classNames(showAccount(item.afrom,))}
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 text-gray-500 dark:text-zinc-300">
                              <div className="text-gray-800 flex" id="from">
                                <a href={item.afrom} className="mr-1 text-blue-400 ">
                                  {classNames(showAccount(item.to,))}
                                </a>
                              </div>
                            </td>
                            <td className={classNames( "px-6 py-4 whitespace-nowrap text-sm  -center")}>
                              <div className="flex justify-center">
                                {item.change}
                                <div className="ml-1 bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                  W3G
                                </div>
                              </div>

                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    <div>
                      <div className="rounded-md  mx-5 mt-10 flex justify-between  my-5" aria-label="Pagination">
                        <div className="flex text-black dark:text-white items-center">
                          Show

                          <select
                              onChange={Select}
                              id="select"
                              className=" block  w-13   p-1 outline-none  text-base  border border-[#7ADFD5] mx-1 sm:text-sm rounded-md text-black bg-white  dark:bg-W3GInfoBG dark:text-white"
                              defaultValue={select_number}
                          >
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>

                          Records

                        </div>
                        <div className="rounded-md   flex justify-end text-neutral-600 dark:text-white">
                          <button
                              onClick={firstPage}
                              className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md  bg-gray-200 dark:bg-[#3F3F3F]  text-sm font-semibold  "
                          >
                            <span className="">First</span>
                          </button>
                          <button
                              onClick={decPageCounter}
                              className="relative inline-flex items-center mx-2 px-2 py-2 rounded-md  bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold "
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <div className="  hidden lg:inline-block rounded-md  relative inline-flex items-center px-4 py-2  bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold ">
                            Page {extrinsicPageNumber} of {extrinsic_number_pages}
                          </div>
                          <button onClick={addPageCounter} className="relative inline-flex items-center mx-2 px-2 py-2 rounded-md bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold ">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                              onClick={lastPage}
                              className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md bg-gray-200 dark:bg-[#3F3F3F] text-sm font-semibold "
                          >
                            <span className="">Last</span>
                          </button>
                        </div>

                      </div>
                    </div>

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
export default W3G_Transfers
