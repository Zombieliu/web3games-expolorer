import Header from "../../components/header";
import React, {Fragment, useEffect, useState} from 'react';
import Link from 'next/link';
import Tail from '../../components/tail';
import AccountOverview from '../../components/Account-overview';
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {
  AccountInfo,
  AccountValue,
  PageNumberValue,
  SelectNumber
} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {showAccount} from "../../utils";
import Heads from "../../components/head";
import {chain_api} from "../../chain/web3games";
import {cropData} from "../../utils/math";
import client from "../../post/post";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const title=[
  {
    title:"Extrinsic ID"
  },
  {
    title:"Block"
  },
  {
    title:"Extrinsic Hash"
  },
  {
    title:"Time",
    i:"fa fa-clock-o ml-1"
  },
  {
    title:"Result",
  },
  {
    title:"Action",
  },
  // {
  //   title:"Active"
  // },
  // {
  //   title:"By"
  // },
  // {
  //   title:"Fee(W3G)"
  // },
]


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



  const block_number:number = props.data


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

const Extrinsics =
    [
      {
        block_hash:"",
        extrinsic_num:"",
        block_num:"",
        extrinsic_hash:"",
        success:"",
        section:"",
        method:"",
        timestamp:"",

      }
    ]

const Account=()=>{
  const [account,setAccount] = useAtom(AccountValue)
  const [total,setTotal] = useState(0)
  const [extrinsics,setExtrinsics] = useState(Extrinsics)
  const [,setAccountInfo] = useAtom(AccountInfo)
  const [requestState,setRequestState] = useState(false)
  const [PageNumber,] = useAtom(PageNumberValue)
  const [selectNumber,] = useAtom(SelectNumber)
  const router = useRouter();
  useEffect(() =>{
    if (router.isReady){
      const pid = (router.query);
      setAccount(`${pid.pid}`)
      const Account = `${pid.pid}`;
      const query_balance = async ()=>{
        let  ret = await client.callApi('extrinsic/GetAll', {
        signer:Account,
          pageIndex: (PageNumber - 1) * selectNumber,
          limit: selectNumber
        });

        if(ret.res != undefined){
          const data = JSON.parse(ret.res.content)
          setTotal(data.total)
          setExtrinsics(data.items)
          // console.log(`${balance.data.free}`)
        }
        const api = await chain_api()
        // @ts-ignore
        const balance  = await api.query.system.account(pid.pid);
        if(balance !== undefined){
          const accountInfo = {
            amount:  cropData((balance['data'].free/Math.pow(10, 18)),4)
          }
          setAccountInfo(accountInfo)
        }
        setRequestState(true)
      }
      query_balance()
    }
  },[router.isReady,selectNumber,PageNumber])

  if (requestState) {

    return (
        <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
          <Heads/>
          <Header/>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-10 mb-14">
              <div>
                <AccountOverview></AccountOverview>
              </div>
              <div className={total==0?"flex justify-center mt-10":"hidden"}>
                No Data
              </div>
              <div className={total==0?"hidden":"rounded-lg mt-2"}>
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
                      <tbody
                          className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                      {extrinsics.map(item => (
                          <tr key={item.extrinsic_hash} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                            <td className="px-6 py-4 whitespace-nowrap text-blue-400 text-sm font-medium  ">
                              <Link href={`/extrinsics/${item.extrinsic_hash}`}>
                                <a>
                                  {item.block_num}-{item.extrinsic_num}
                                </a></Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                              <Link href={`/blocksdetails/${item.block_hash}`}>
                                <a className="">
                                  {item.block_num}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                              <Link href={`/extrinsics/${item.extrinsic_hash}`}>
                                <a className="">
                                  {classNames(showAccount(item.extrinsic_hash))}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {GetBlockData(item.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300 ">
                              <img className={item.success?"w-6":"hidden"}  src="/successful.svg" alt=""/>
                              <img className={item.success?"hidden":"w-6"} src="/fail.svg" alt=""/>

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.section}-{item.method}
                            </td>

                          </tr>
                      ))}
                      </tbody>
                    </table>
                    <Sort data={total}></Sort>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tail></Tail>
        </div>
    )

  } else {
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
          <DetailsSkeleton/>
        </div>
    )
  }


}
export default Account
