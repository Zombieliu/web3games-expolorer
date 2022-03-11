import React, {Fragment, useEffect, useState} from "react";
import Link from 'next/link'
import Header from "../../components/header";
import Tail from "../../components/tail";
import Sort from "../../components/sort";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {router} from "next/client";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {darkModeAtom} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const tokenstitle=[
  {
    title:"Extrinsic ID"
  },
  {
    title:"Hash"
  },
  {
    title:"Time",
    i:"fa fa-clock-o ml-1"
  },
  {
    title:"Result"
  },
  {
    title:"Signer By"
  },
]


const Block_Info = `
 query {
  extrinsicInfos(first:20,orderBy:TIMESTAMP_DESC){
    nodes{
      id
      extrinsicHeight
      timestamp
      nonce
      success
      signerId
    }
  }
}
`

class extrinsicInfo {
  private extrinsicHeight: string;
  private id: string;
  private time: string;
  private nonce: string;
  private state: string;
  private by: string;
  private address : string;

  constructor(
      id:string,
      extrinsicHeight:string,
      time:string,
      nonce:string,
      state:string,
      by:string,
      address:string
  ) {
    this.extrinsicHeight = extrinsicHeight
    this.id = id
    this.time = time
    this.nonce = nonce
    this.state = state
    this.by = by
    this.address = address
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
          data.extrinsicInfos.nodes[i].nonce,
          data.extrinsicInfos.nodes[i].success,
          "system",
          data.extrinsicInfos.nodes[i].signerId,
      )
      data_list.push(result)
    }else{
      let result = new extrinsicInfo(
          data.extrinsicInfos.nodes[i].extrinsicHeight,
          data.extrinsicInfos.nodes[i].id,
          GetBlockData(data.extrinsicInfos.nodes[i].timestamp),
          data.extrinsicInfos.nodes[i].nonce,
          data.extrinsicInfos.nodes[i].success,
          data.extrinsicInfos.nodes[i].signerId,
          data.extrinsicInfos.nodes[i].signerId,
      )
      data_list.push(result)
    }
  }
  return data_list
}

const Transactions=()=> {
  const router = useRouter()
  const [enabledNightMode,] = useAtom(darkModeAtom)

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


  const {loading, error, data}: any = useQuery(Block_Info, {})

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
    router.push(`/extrinsics/${value}`)
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
    return (
        <div>
          <Error/>
        </div>
    )

  }

  if (data) {
    const extrinsic = data_list(data)
    return (
        <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">

          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-20 mb-14">
              <div className="mx-auto lg:flex justify-between ">

                <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                  Extrinsic
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

              <div className="my-5 overflow-x-auto bg-white dark:bg-gray-600 rounded-lg ">
                <div className="py-2 min-w-full  p-5 dark:text-gray-200">
                  <div className="flex my-5 text-xl font-semibold text-gray-700">

                    <div>
                      Extrinsics
                    </div>

                  </div>
                  <div className="shadow overflow-auto border-b  border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100 dark:bg-gray-300">
                      <tr>
                        {tokenstitle.map(title => (
                            <th key={title.title}
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-500  "
                            >
                              {title.title}
                              <i className={title.i} aria-hidden="true"></i>
                            </th>
                        ))}
                      </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-300 divide-y divide-gray-200">
                      {extrinsic.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium">
                              <button id={item.extrinsicHeight} onClick={GetExtrinsics}>
                                {item.id}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                              <button id={item.extrinsicHeight} onClick={GetExtrinsics}>
                                {item.extrinsicHeight}
                              </button>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                              {item.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              { item.state ? "success" : "fail"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base ">

                              <button onClick={() => {
                                // @ts-ignore
                                Copy(item.address);
                              }}><i className="fa fa-clone mr-1  " aria-hidden="true"></i>
                              </button>

                              <button onClick={getAccount} className="text-blue-400" id={item.address}>
                                {item.by}
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>

                  <Sort></Sort>
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
