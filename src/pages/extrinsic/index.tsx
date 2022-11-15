import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {router} from "next/client";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {DarkModeAtom, extrinsicPageNumberValue, SelectNumber} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";
import {showAccount, showSmallAccount} from "../../utils";
import Heads from "../../components/head";
import client from "../../post/post";
import { cropData } from "../../utils/math";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
  {
    title:"Extrinsic ID"
  },
  {
    title:"Extrinsic Hash"
  },
  {
    title:"Time",
  },
  {
    title:"Result"
  },
  {
    title:"Signer By"
  },
  {
    title:"Fee(W3G)"
  },
]

function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
}


const Sort=(props:any)=>{


  const router = useRouter()
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [extrinsicPageNumber,SetextrinsicPageNumber] = useAtom(extrinsicPageNumberValue)
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

  const extrinsic_number = props.data.total

  const Select = (e) =>{
    SetextrinsicPageNumber(1)
    setSelect_number(Number(e.target.value))
  }

  let extrinsic_number_pages = Math.ceil(extrinsic_number / select_number)


  if (extrinsic_number_pages > 500){
    extrinsic_number_pages = 500
  }




  const addPageCounter = ()=>{
    if (extrinsicPageNumber != extrinsic_number_pages){
      SetextrinsicPageNumber(extrinsicPageNumber + 1)
    }
  }

  const decPageCounter = ()=>{
    if (extrinsicPageNumber != 1){
      SetextrinsicPageNumber(extrinsicPageNumber - 1)
    }
  }

  const lastPage = ()=>{
    SetextrinsicPageNumber(extrinsic_number_pages)
  }

  const firstPage = ()=>{
    SetextrinsicPageNumber(1)

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
  )
}

const Extrinsic=()=> {
  const router = useRouter()
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [extrinsicPageNumber,] = useAtom(extrinsicPageNumberValue)
  const [selectNumber,] = useAtom(SelectNumber)
  const extrinsic = {
    total:"",
    items: [{
      block_num:"",
      extrinsic_num:"",
      extrinsic_hash:"",
      timestamp:"",
      success:"",
      is_signed:"",
      signer:"",
      weight_info:"",
    }
    ]}
  const [extrinsicInfo,setExtrinsicInfo] = useState(extrinsic)
  useEffect(()=>{
      if (router.isReady){
        const call = async () =>{
          let ret = await client.callApi('extrinsic/GetAll', {
            pageIndex: (extrinsicPageNumber - 1) * selectNumber,
            limit: selectNumber
          });
          console.log(JSON.parse(ret.res.content))
          if (ret.res != undefined) {
            setExtrinsicInfo(JSON.parse(ret.res.content))
          }
          if (!ret.isSucc) {
            return;
          }
        }
        call()
        if (enabledNightMode == true){
          document.documentElement.classList.add('dark');
        }else{
          document.documentElement.classList.remove('dark');
        }
      }
  },[router.isReady,selectNumber,extrinsicPageNumber])

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }



  const GetExtrinsics = (props) => {
    const value = props.target.id;
    console.log(value)
    router.push(`/extrinsics/${value}`)
  }


  async function getAccount(e){
    await router.push(`/account/${e.target.id}`)
  }


  if(extrinsicInfo.total!==""){
    return (
        <div className="mx-auto bg-white dark:bg-W3GBG  transition duration-700">
          <Heads/>
          <Header/>
          <div className="max-w-7xl mx-auto py-16  px-2 ">
            <div className="my-10 mb-14">
              <div className="mx-auto flex justify-between items-center">

                <div className="text-xl my-2 lg:my-0 text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                  Extrinsic
                </div>

              </div>
              <div className="my-5 overflow-x-auto shadow dark:bg-W3GInfoBG rounded-lg ">
                <div className=" min-w-full  rounded-lg border dark:border-W3GInfoBorderBG">
                  <div className=" border-b dark:border-W3GInfoBorderBG overflow-auto rounded-t-lg  ">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-W3GInfoBorderBG ">
                      <thead className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300">
                      <tr>
                        {tokenstitle.map(title => (
                            <th key={title.title}
                                scope="col"
                                className="p-6 w-36 text-sm xl:text-base  font-semibold   "
                            >
                              {title.title}
                              {/*<i className={title.i} aria-hidden="true"></i>*/}
                            </th>
                        ))}
                      </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-W3GInfoBG text-gray-500 dark:text-neutral-300  divide-y divide-gray-200 dark:divide-W3GInfoBorderBG text-center">
                      {extrinsicInfo.items.map(item => (
                          <tr key={item.block_num} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                            <td className="px-7 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium ">
                              <button id={item.extrinsic_hash} className="w-20" onClick={GetExtrinsics}>
                                {item.block_num}-{item.extrinsic_num}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium ">
                              <button id={item.extrinsic_hash} onClick={GetExtrinsics}>
                                {classNames(showAccount(item.extrinsic_hash))}
                              </button>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {GetBlockData(item.timestamp)}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.success ? "success" : "fail"}
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {classNames(item.is_signed ? showSmallAccount(item.signer) : "system")}
                            </td>
                            {/*<button onClick={() => {*/}
                            {/*  // @ts-ignore*/}
                            {/*  Copy(item.address);*/}
                            {/*}}><i className="fa fa-clone mr-1  " aria-hidden="true"></i>*/}
                            {/*</button>*/}
                            {/*<button onClick={getAccount} className="text-blue-400 dark:text-indigo-400" id={item.address}>*/}
                            {/*  {item.by}*/}
                            {/*</button>*/}
                            <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-500 dark:text-zinc-300">
                              <div className="flex justify-center ">
                                <div  className="flex">
                                  {(parseFloat(String(cropData((JSON.parse(item.weight_info).partialFee / Math.pow(10, 18)), 5))))}
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

                  <Sort data={extrinsicInfo}></Sort>
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
  }else{
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
          <DetailsSkeleton/>
        </div>
    )
  }


}
export default Extrinsic
