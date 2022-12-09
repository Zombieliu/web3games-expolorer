import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {
  AccountInfo,
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
import client from "../../../post/post";
import {chain_api} from "../../../chain/web3games";
import {cropData} from "../../../utils/math";
import Link from "next/link";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
}
const Sort=(props:any)=>{
  const router = useRouter()
  const [PageNumber,SetPageNumber] = useAtom(PageNumberValue)
  const [select_number,setSelect_number] = useAtom(SelectNumber)
  useEffect(()=>{
    if (router.isReady){

    }
  },[router.isReady])

  const block_number:number =props.data


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
      title:"Name"
    },
    {
      title:"Token ID"
    },

  ]

  const Transfers = [
    {
      extrinsicHash:"",
      timestamp:"",
      fromAccount:"",
      toAccount:"",
      balance:"",
      name:"",
      fungibleTokenId:"",

    },

  ]
  const router = useRouter();
  const [transfers,setTransfers] = useState(Transfers)
  const [account,setAccount] = useAtom(AccountValue)
  const [,setCopy_Sop_up_boxState] = useAtom(CopyPopUpBoxState)
  const [,setAccountInfo] = useAtom(AccountInfo)
  const [total,setTotal] = useState(0)
  const [PageNumber,] = useAtom(PageNumberValue)
  const [selectNumber,] = useAtom(SelectNumber)
  const [requestState,setRequestState] = useState(false)
  useEffect(()=>{
    const {pid} = router.query;
    setAccount(`${pid}`)
    const Account = `${pid}`
    if (router.isReady){
      const query_balance = async ()=>{
        let  ret = await client.callApi('tokenFungible/ListTokenFungibleTransfer', {
          fromAccount: Account,
          toAccount:Account,
          pageIndex: (PageNumber - 1) * selectNumber,
          limit: selectNumber
        });
        console.log(ret)
        if(ret.res != undefined){
          const data = JSON.parse(ret.res.content)
          setTotal(data.total)
          setTransfers(data.items)

          setRequestState(true)
        }

        const api = await chain_api()
        const balance = await api.query.system.account(Account);
        if(balance !==undefined){
          const accountInfo = {
            amount:  cropData((balance.data.free/Math.pow(10, 18)),4)
          }
          setAccountInfo(accountInfo)
        }

        // console.log(`${balance.data.free}`)
      }
      query_balance()
    }
  },[router.isReady])




  const Copy=(span)=>{

    const spanText = span;
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
            <div className={total==0?"flex justify-center mt-10":"hidden"}>
              No Data
            </div>
            <div className={total==0?"hidden":"rounded-lg mt-2"}>
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
                {transfers.map(item => (
                    <tr key={item.extrinsicHash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 text-xs items-center">
                      <td className="px-6 py-4 whitespace-nowrap   text-blue-400  font-medium">
                        <div className="flex">
                          <button id={item.extrinsicHash} onClick={GetHash}>
                            {classNames(showAccount(item.extrinsicHash,))}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                        {GetBlockData(item.timestamp)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap   text-gray-500 dark:text-zinc-300  font-medium">
                        <div className={item.fromAccount == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"?"hidden":""}>
                          <div className={account ==item.fromAccount?"hidden":""}>
                            <button onClick={() => {
                              // @ts-ignore
                              Copy(`${item.fromAccount}`);}} className="text-neutral-600 ">
                              <img className="w-4 mr-1 -mb-1" src="/copy.svg" alt=""/>
                            </button>
                            <Link href={`/account/${item.fromAccount}`} className="text-gray-800 flex">
                              <a  className="mr-1 text-blue-400 ">
                                {showSmallAccount(item.fromAccount)}
                              </a>
                            </Link>
                          </div>
                          <div className={account ==item.fromAccount?"":"hidden"} >
                            <div  className="mr-1">
                              {showSmallAccount(item.fromAccount)}
                            </div>
                          </div>
                        </div>
                        <div className={item.fromAccount == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"?"":"hidden"}>
                          Zero System Account
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  font-medium text-white   font-medium">
                        <div className={classNames("bg-green-300  rounded-md p-0.5 px-2")}>
                          {classNames(item.toAccount ==account?"IN":"OUT")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  font-medium text-gray-500 dark:text-zinc-300  ">
                        <div className={item.toAccount == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"?"hidden":""}>
                          <div className={account ==item.toAccount?"hidden":""}>
                            <button onClick={() => {
                              // @ts-ignore
                              Copy(`${item.toAccount}`);}} className="text-neutral-600 ">
                              <img className="w-4 mr-1 -mb-1" src="/copy.svg" alt=""/>
                            </button>
                            <Link href={`/account/${item.toAccount}`} className="text-gray-800 flex">
                              <a  className="mr-1 text-blue-400 ">
                                {showSmallAccount(item.toAccount)}
                              </a>
                            </Link>
                          </div>
                          <div className={account ==item.toAccount?"":"hidden"} >

                            <button id={item.toAccount} onClick={GetAddress}  >
                              {showSmallAccount(item.toAccount)}
                            </button>
                          </div>
                        </div>
                        <div className={item.toAccount == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"?"":"hidden"}>
                          Zero System Account
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowra p  text-gray-500 dark:text-zinc-300">
                        {item.balance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap  text-gray-500 dark:text-zinc-300">
                        {item.fungibleTokenId}
                      </td>


                    </tr>
                ))}
                </tbody>
              </table>
              <Sort data={total} ></Sort>
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
