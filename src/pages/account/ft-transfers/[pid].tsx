import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {
  AccountValue,
  CopyPopUpBoxState,
  DarkModeAtom,
  extrinsicPageNumberValue,
  PageNumberValue,
  SelectNumber
} from "../../../jotai";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition} from "@headlessui/react";
import Header from "../../../components/header";
import AccountOverview from "../../../components/Account-overview";
import Tail from "../../../components/tail";
import {showAccount, showSmallAccount} from "../../../utils";
import Heads from "../../../components/head";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Sort=(props:any)=>{
  const router = useRouter()
  const [PageNumber,SetPageNumber] = useAtom(PageNumberValue)
  const [select_number,setSelect_number] = useAtom(SelectNumber)
  useEffect(()=>{
    if (router.isReady){

    }
  },[router.isReady])

  const block_number:number =1
  // props.data

  const Select = (e) =>{
    setSelect_number(Number(e.target.value))
    SetPageNumber(1)
  }

  let block_number_pages:number = Math.ceil(block_number / select_number)

  if (block_number_pages > 500){
    block_number_pages = 500
  }

  const addPageCounter = async ()=>{
    if (PageNumber != block_number_pages){
      SetPageNumber(PageNumber + 1)
    }

  }

  const decPageCounter = ()=>{
    if (PageNumber != 1){
      SetPageNumber(PageNumber - 1)
    }
  }

  const lastPage = ()=>{
    SetPageNumber(block_number_pages)
  }

  const firstPage = ()=>{
    SetPageNumber(1)
  }

  return(
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
              Page {PageNumber} of {block_number_pages}
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
  )
}
const FT_Transfers = () =>{
  const tokenstitle=[
    {
      title:"Txn Hash"
    },
    {
      title:"Age"
    },
    {
      title:"From"
    },
    {
      title:""
    },
    {
      title:"To"
    },
    {
      title:"Value"
    },
    {
      title:"Token"
    },
  ]

  const extrinsic = [
    {
      State:true,
      TxhHash:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      Age:"9",
      From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      icon: "fa fa-arrow-right",
      To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      Value: "99.1803",

      Token:"",
      TxnFee: "0.00064646"
    },
    {
      State:true,
      TxhHash:"0x0c8ee83b555f0ede1a3",
      Method:"Mint",
      Block:"15313963",
      Age:"9",
      From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      icon: "fa fa-arrow-right",
      To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      Value: "0",
      TxnFee: "0.00064646"
    },
    {
      State:true,
      TxhHash:"0x0c8ee83b555f0ede1a4",
      Method:"Mint",
      Block:"15313963",
      Age:"9",
      From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      icon: "fa fa-arrow-right",
      To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      Value: "0",
      TxnFee: "0.00064646"
    },
    {
      State:false,
      TxhHash:"0x0c8ee83b555f0ede1a5",
      Method:"Mint",
      Block:"15313963",
      Age:"9",
      From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      icon: "fa fa-arrow-right",
      To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      Value: "0",
      TxnFee: "0.00064646"
    },
    {
      State:false,
      TxhHash:"0x0c8ee83b555f0ede1a7",
      Method:"Mint",
      Block:"15313963",
      Age:"9",
      From: "0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      icon: "fa fa-arrow-right",
      To:"0x0c8ee83b555f0ede1a0x0c8ee83b555f0ede1a",
      Value: "0",
      TxnFee: "0.00064646"
    },



  ]

  const [,setCopy_Sop_up_boxState] = useAtom(CopyPopUpBoxState)
  const router = useRouter()
  const [account,setAccount] = useAtom(AccountValue)
  useEffect(()=>{
    const {pid} = router.query;
    setAccount(`${pid}`)
    if (router.isReady){

    }
  },[router.isReady])


  const Copy=(span)=>{
    console.log(span)
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
      setCopy_Sop_up_boxState(true)
    }
  }

  const GetHash = (props) => {
    const value = props.target.id;
    router.push(`/evm_transactionsDetail/${value}`)
  }

  const GetAddress = (props) =>{
    const value = props.target.id;
    router.push(`/evm_address/${value}`).then(r => {
      location.reload()
    })
  }


  return(
      <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
        <Heads/>
        <Header/>
        <div className="max-w-7xl mx-auto py-16  px-4 ">
          <div className="my-10 mb-14">
            <AccountOverview/>
            <div className="rounded-lg mt-2">
              <div className="mt-5">
        <div className="my-5 overflow-x-auto  dark:bg-W3GInfoBG rounded-lg ">
          <div className=" min-w-full  ">
            <div className="shadow overflow-auto bg-white dark:bg-W3GInfoBG  rounded-lg  border  dark:border-W3GInfoBorderBG">
              <table className="min-w-full border-b divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                <thead className=" text-gray-500 dark:text-neutral-300">
                <tr>
                  {tokenstitle.map(title => (
                      <th key={title.title}
                          scope="col"
                          className="py-6   text-sm xl:text-base  font-semibold   "
                      >
                        {title.title}
                        {/*<i className={title.i} aria-hidden="true"></i>*/}
                      </th>
                  ))}
                </tr>
                </thead>
                <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300 divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                {extrinsic.map(item => (
                    <tr key={item.TxhHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                      <td className="px-4 py-4 whitespace-nowrap   text-blue-400  font-medium">
                        <div className="flex">
                          <button id={item.TxhHash} onClick={GetHash}>
                            {classNames(showAccount(item.TxhHash,))}
                          </button>

                          <div className={classNames(item.State?"hidden":"text-red-400")}>
                            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                          </div>
                        </div>


                      </td>

                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                        {item.Age} secs ago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400   font-medium">
                        <button id={item.From} onClick={GetAddress} >
                          {classNames(showAccount(item.From))}
                        </button>
                        <button onClick={() => {
                          // @ts-ignore
                          Copy(`${item.From}`);}} className="text-neutral-600">
                           <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                        </button>
                      </td>
                      <td className=" py-4 whitespace-nowrap  font-medium text-white   font-medium">
                        <div className={classNames(item.State?"bg-green-300 ":"bg-red-400","rounded-md p-0.5")}>
                          {classNames(item.State?"IN":"OUT")}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap  font-medium text-blue-400  ">
                        <button id={item.To} onClick={GetAddress} >
                          {classNames(showAccount(item.To))}
                        </button>
                        <button onClick={() => {
                          // @ts-ignore
                          Copy(`${item.To}`);}} className="text-neutral-600">
                           <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                        {item.Value}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap font-medium text-blue-400 ">
                        <div className=" flex items-center">
                          <img className="w-3 mr-1 rounded-full" src="/USDT.png" alt=""/>
                          Tether USD (USDT)
                        </div>

                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
              <Sort ></Sort>
            </div>
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
        <Tail></Tail>
      </div>
  )
}

export default FT_Transfers
