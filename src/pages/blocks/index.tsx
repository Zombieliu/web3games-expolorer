import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {BlockPageNumberValue, DarkModeAtom, SelectNumber} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import {showAccount} from "../../utils";
import Heads from "../../components/head";
import client from "../../post/post";
import {log} from "util";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
  {
    title:"Block"
  },
  {
    title:"Block Hash "
  },
  {
    title:"Time",
    i:"fa fa-clock-o ml-1"
  },
  {
    title:"Extrinsic"
  },
  {
    title:"Event"
  },
  {
    title:"Treasury Revenue"
  },
]



function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
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



  const block_number:number = props.data.total


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

const Blocks=()=>{
  const router = useRouter()
  let [isOpen, setIsOpen] = useState(false)

  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [BlockPageNumber,] = useAtom(BlockPageNumberValue)
  const [selectNumber,] = useAtom(SelectNumber)
  const extrinsic = {
    total:"",
    items: [{
      block_num:"",
      block_hash:"",
      timestamp:"",
      extrinsicNum:"",
      eventNum:"",
      event:"",
      fee:"",
    }
    ]}
  const [blocksInfo,setBlocksInfo] = useState(extrinsic)
  useEffect(()=>{
    if (router.isReady){
      if (enabledNightMode == true){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }

      const call = async () =>{
        let ret = await client.callApi('block/GetAll', {
          pageIndex: (BlockPageNumber - 1) * selectNumber,
          limit: selectNumber
        });
        if (ret.res != undefined) {
          setBlocksInfo(JSON.parse(ret.res.content))
          console.log(JSON.parse(ret.res.content))

        }
        // Error
        if (!ret.isSucc) {
          return;
        }
      }
      call()
    }
  },[router.isReady,selectNumber,BlockPageNumber])


  const GetBlock = (props) => {
    const value = props.target.id;
    router.push(`/blocksdetails/${value}`)
  }

  if (blocksInfo.total=="") {
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
          <DetailsSkeleton/>
        </div>
    )
  }else{
    return (
        <div className="mx-auto bg-white dark:bg-W3GBG transition duration-700">
          <Heads/>
          <Header/>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-10 mb-14">
              <div className="mx-auto flex justify-between items-center">

                <div className="text-xl my-2 lg:my-0 text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                  BLOCKS
                </div>
              </div>

              <div className="my-5 overflow-x-auto shadow dark:bg-W3GInfoBG rounded-lg ">
                <div className=" min-w-full  rounded-lg border dark:border-W3GInfoBorderBG">
                  <div className="border-b border-b dark:border-W3GInfoBorderBG overflow-auto rounded-t-lg  ">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                      <thead className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
                      <tr>
                        {tokenstitle.map(title => (
                            <th key={title.title}
                                scope="col"
                                className="p-6 w-36 text-sm xl:text-base  font-semibold   "
                            >
                              {title.title}
                              <i className={title.i} aria-hidden="true"></i>
                            </th>
                        ))}
                      </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                      {blocksInfo.items.map(item => (
                          <tr key={item.block_hash} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  ">
                              <button id={item.block_hash} onClick={GetBlock}>
                                {item.block_num}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  ">
                              <button id={item.block_hash} onClick={GetBlock}>
                                {classNames(showAccount(item.block_hash,))}
                                {/*<i className="fa fa-clone mr-1  " aria-hidden="true"></i>*/}
                              </button>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {GetBlockData(item.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                              {item.extrinsicNum}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                              {item.eventNum}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              <div className="flex justify-center w-36">
                                <div className="flex">
                                  {item.fee}0
                                  <div className="ml-0.5 bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                                    W3G
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>

                  <Sort data={blocksInfo}></Sort>
                </div>
              </div>

            </div>

          </div>
          <Tail></Tail>


        </div>
    )
  }

}
export default Blocks
