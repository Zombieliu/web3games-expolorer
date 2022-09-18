import Header from "../../components/header";
import React, {Fragment, useEffect, useState} from 'react';
import Link from 'next/link';
import Tail from '../../components/tail';
import AccountOverview from '../../components/Account-overview';
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {AccountBalanceValue, AccountValue, BlockPageNumberValue, DarkModeAtom, SelectNumber} from "../../jotai";
import {useQuery} from "graphql-hooks";
import axios from "axios";
import Error from "../../components/error";
import {DetailsSkeleton} from "../../components/skeleton";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {showAccount} from "../../utils";


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


const Account_Info = `
 query HomePage($Account: String) {
   accounts(filter:{
    id:{
      equalTo:$Account
    }
  }){
    nodes{
      id
      extrinsicInfosBySignerId(first:5,orderBy:TIMESTAMP_ASC){
        nodes{
          id
          extrinsicHeight
          timestamp
        }
      }
    }
  }
}
`

class ExtrinsicsInfo {
  private extrinsicHash: string;
  private blockHeight: string;
  private time: string;
  private active: string;

  constructor(
      extrinsicHash:string,
      blockHeight:string,
      time:string,
      active:string,
  ) {
    this.extrinsicHash = extrinsicHash
    this.blockHeight = blockHeight
    this.time = time
    this.active = active
  }
}
let extrinsic_number_pages = (20 / 20)

function data_list(data: any){
  if (data.accounts.nodes.length != 0){
    let times = data.accounts.nodes[0].extrinsicInfosBySignerId.nodes.length;
    let data_list = [];
    for (let i = 0;i < times;i++){
      let result = new ExtrinsicsInfo(
          data.accounts.nodes[0].extrinsicInfosBySignerId.nodes[i].id,
          data.accounts.nodes[0].extrinsicInfosBySignerId.nodes[i].extrinsicHeight,
          GetBlockData(data.accounts.nodes[0].extrinsicInfosBySignerId.nodes[i].timestamp),
          ""
      )
      data_list.push(result)
    }
    return data_list
  }else{
    let data_list = []
    let null_data = new ExtrinsicsInfo (
        "",
        "",
        "",
        ""
    )
    data_list.push(null_data)
    return data_list
  }
}

function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
}

function insertStr(source, start, newStr){
  return source.slice(0, start) + newStr + source.slice(start);
}
const Sort=(props:any)=>{


  const router = useRouter()
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [BlockPageNumber,SetBlockPageNumber] = useAtom(BlockPageNumberValue)
  const [select_number,setSelect_number] = useAtom(SelectNumber)
  useEffect(()=>{
    if (router.isReady){
      if (enabledNightMode == true){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }
    }
  },[router.isReady])



  const block_number:number = props.data.accounts.totalCount


  const Select = (e) =>{
    setSelect_number(Number(e.target.value))
    SetBlockPageNumber(1)
  }

  let block_number_pages:number = Math.ceil(block_number / select_number)

  if (block_number_pages > 500){
    block_number_pages = 500
  }

  const addPageCounter = async ()=>{
    if (BlockPageNumber != block_number_pages){
      SetBlockPageNumber(BlockPageNumber + 1)
    }

  }

  const decPageCounter = ()=>{
    if (BlockPageNumber != 1){
      SetBlockPageNumber(BlockPageNumber - 1)
    }
  }

  const lastPage = ()=>{
    SetBlockPageNumber(block_number_pages)
  }

  const firstPage = ()=>{
    SetBlockPageNumber(1)
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
              Page {BlockPageNumber} of {block_number_pages}
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
const Account=()=>{
  const [account,setAccount] = useAtom(AccountValue)
  const [,setBalance] = useAtom(AccountBalanceValue)
  const router = useRouter();
  useEffect(()=>{
    if (router.isReady){
      const {pid} = router.query;
      setAccount(`${pid}`)
      axios.get(`https://explorer-devnet-restful-api.web3games.org/api/get_balance?account=${pid}`, {
      })
          .then(function (response) {
            if (response.data.data.length > 19){
              const data = response.data.data
              const new_data = data.substring(0,16)
              console.log(new_data)
              const result = insertStr(new_data,8,'.')
              setBalance(result)
            }else if(response.data.data.length > 8 && response.data.data.length < 20){
              const data = response.data.data
              const result = insertStr(data,-8,'.')
              setBalance(result)
            }
            else{
              setBalance(response.data.data)
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }
  },[router.isReady])

  const [enabledNightMode,] = useAtom(DarkModeAtom)
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



  if (loading) {
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
          <DetailsSkeleton/>
        </div>
    )
  }

  if (error) {
    return (
        <Error/>
    )

  }

  if (data) {
    const collections = data_list(data)

    return (
        <div className="mx-auto bg-gray-50 dark:bg-neutral-900  transition duration-700">
          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-10 mb-14">
              <div>
                <AccountOverview></AccountOverview>
              </div>
              <div className="  rounded-lg mt-2">
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
                      {collections.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                            <td className="px-6 py-4 whitespace-nowrap text-blue-400 text-sm font-medium  ">
                              <Link href={`/extrinsics/${item.extrinsicHash}`}>
                                <a>
                                  {classNames(showAccount(item.extrinsicHash,))}
                                </a></Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                              <Link href={`/extrinsics/${item.extrinsicHash}`}>
                                <a className="">
                                  {item.blockHeight}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.time}
                            </td>
                            {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                            {/*  {item.active}*/}
                            {/*</td>*/}
                            {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                            {/*  {item.by}*/}
                            {/*</td>*/}

                            {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">*/}
                            {/*  {item.fee}*/}
                            {/*</td>*/}

                          </tr>
                      ))}
                      </tbody>
                    </table>
                    <Sort data={data}></Sort>
                  </div>


                </div>
              </div>
            </div>

          </div>
          <Tail></Tail>


        </div>
    )
  }
}
export default Account
