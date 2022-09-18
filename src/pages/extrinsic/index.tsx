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


const Block_Info = `
 query HomePage($select: Int,$first: Int) { 
  extrinsicInfos(first:$select,offset:$first,orderBy:TIMESTAMP_DESC){
    nodes{
      id
      extrinsicHeight
      timestamp
      nonce
      success
      signerId
    }
    totalCount
  }
}
`

class extrinsicInfo {
  private extrinsicHeight: string;
  private id: string;
  private time: string;
  private state: string;
  private signerId: string;
  private fee : string;

  constructor(
      id:string,
      extrinsicHeight:string,
      time:string,
      state:string,
      signerId:string,
      fee:string
  ) {
    this.extrinsicHeight = extrinsicHeight
    this.id = id
    this.time = time
    this.state = state
    this.signerId = signerId
    this.fee = fee
  }
}




function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
}


function data_list(data: any){
  let times = data.extrinsicInfos.nodes.length;
  let data_list = [];
  for (let i = 0;i < times;i++){
    if (data.extrinsicInfos.nodes[i].signerId == "5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM"){
      let result = new extrinsicInfo(
          data.extrinsicInfos.nodes[i].extrinsicHeight,
          data.extrinsicInfos.nodes[i].id,
          GetBlockData(data.extrinsicInfos.nodes[i].timestamp),
          data.extrinsicInfos.nodes[i].success,
          "system",
          "0.522222"
      )
      data_list.push(result)
    }else{
      let result = new extrinsicInfo(
          data.extrinsicInfos.nodes[i].extrinsicHeight,
          data.extrinsicInfos.nodes[i].id,
          GetBlockData(data.extrinsicInfos.nodes[i].timestamp),
          data.extrinsicInfos.nodes[i].success,
          data.extrinsicInfos.nodes[i].signerId,
          "0.522222"
          // data.extrinsicInfos.nodes[i].fee,
      )
      data_list.push(result)
    }
  }
  return data_list
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

  const extrinsic_number = props.data.extrinsicInfos.totalCount

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

const Transactions=()=> {
  const router = useRouter()
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [extrinsicPageNumber,] = useAtom(extrinsicPageNumberValue)
  const [selectNumber,] = useAtom(SelectNumber)
  useEffect(()=>{
      if (router.isReady){
        if (enabledNightMode == true){
          document.documentElement.classList.add('dark');
        }else{
          document.documentElement.classList.remove('dark');
        }
      }
  },[router.isReady])



  let [isOpen, setIsOpen] = useState(false)


  const {loading, error, data}: any = useQuery(Block_Info, {
    variables:{
      select:selectNumber,
      first:(extrinsicPageNumber - 1) * selectNumber
    },
  })

  const Copy = (span) => {

    const spanText = document.getElementById(span).innerText;
    const oInput = document.createElement('input');
    oInput.value = spanText;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand('Copy');
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    document.body.removeChild(oInput);
    if (oInput) {

      setIsOpen(true)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const GetExtrinsics = (props) => {
    const value = props.target.id;
    const id = document.getElementById(props.target.id).innerText

    router.push(`/extrinsics/${value}/${id}`)
  }

  async function getAccount(e){
    await router.push(`/account/${e.target.id}`)
  }

  if (loading) {
    return (
        <div className="animate-pulse max-w-7xl mx-auto py-16  px-4 my-20">
          <DetailsSkeleton/>
        </div>
    )
  }

  if (error) {
    console.log(error)
    return (
        <div>
          <Error/>
        </div>
    )

  }

  if (data) {
    console.log(data)
    const extrinsic = data_list(data)
    return (
        <div className="mx-auto bg-white dark:bg-W3GBG  transition duration-700">

          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-2 ">
            <div className="my-10 mb-14">
              <div className="mx-auto flex justify-between items-center">

                <div className="text-xl my-2 lg:my-0 text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                  Extrinsic
                </div>
                {/*<div className="flex ">*/}
                {/*    <input type="text"*/}
                {/*           className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white  dark:bg-neutral-900  dark:text-white dark:focus:border-neutral-400 focus:border-neutral-700    dark:border-neutral-700 outline-none"*/}
                {/*           placeholder="Search transactions, blocks, programs and token"*/}
                {/*           autoComplete="off"*/}
                {/*    />*/}
                {/*    <div className="flex justify-center z-10 text-gray-800 dark:text-gray-300 text-3xl py-3 -ml-11">*/}
                {/*        <i className="fa fa-search" aria-hidden="true"></i></div>*/}


                {/*</div>*/}

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
                      {extrinsic.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                            <td className="px-7 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium ">
                              <button id={item.extrinsicHeight} className="w-20" onClick={GetExtrinsics}>
                                {item.id}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium ">
                              <button id={item.extrinsicHeight} onClick={GetExtrinsics}>
                                {classNames(showAccount(item.extrinsicHeight,))}
                              </button>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.time}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              { item.state ? "success" : "fail"}
                            </td>
                              <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                                {classNames(item.signerId == 'system'? "system": showSmallAccount(item.signerId))}
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
                                  <div className="flex">
                                    {item.fee}
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

                  <Sort data={data}></Sort>
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
export default Transactions
