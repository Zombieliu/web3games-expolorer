import React, {Fragment, useEffect, useState} from "react";
import Header from "../../components/header";
import Tail from "../../components/tail";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import {Dialog, Transition } from "@headlessui/react";
import {useQuery} from "graphql-hooks";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {BlockPageNumberValue, DarkModeAtom, darkModeImg} from "../../jotai";
import {DetailsSkeleton} from "../../components/skeleton";
import Error from "../../components/error";


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
]


const Blcok_Info = `
 query HomePage($first: Int) {
  blockInfos(first:20,offset:$first,orderBy:TIMESTAMP_DESC){
    nodes{
      id
      blockHeight
      extrinsicNumber
      eventNumber
      timestamp
    }
    totalCount
  }
}
`

// const After_Block_Info = `
//  query HomePage($offsetNumber: Int) {
//   blockInfos(first:20,offset:$offsetNumber,orderBy:TIMESTAMP_DESC){
//     nodes{
//       id
//       blockHeight
//       extrinsicNumber
//       eventNumber
//       timestamp
//     }
//   }
// }
// `

class BlockInfo {
  private id: string;
  private blockHeight: string;
  private time: string;
  private extrinsicNumber: string;
  private eventNumber: string;

  constructor(
      id:string,
      blockHeight:string,
      time:string,
      extrinsicNumber:string,
      eventNumber:string,
  ) {
    this.id = id
    this.blockHeight = blockHeight
    this.time = time
    this.extrinsicNumber = extrinsicNumber
    this.eventNumber = eventNumber
  }
}

function data_list(data: any){
  let times = data.blockInfos.nodes.length;
  let data_list = [];
  for (let i = 0;i < times;i++){
    let result = new BlockInfo(
        data.blockInfos.nodes[i].id,
        data.blockInfos.nodes[i].blockHeight,
        GetBlockData(data.blockInfos.nodes[i].timestamp),
        data.blockInfos.nodes[i].extrinsicNumber,
        data.blockInfos.nodes[i].eventNumber,
    )
    data_list.push(result)
  }
  return data_list
}

function GetBlockData(blockTime) {
  const start = new Date(blockTime).toUTCString();
  return `${start}`
}

const Sort=(props:any)=>{
  const block_number:number = props.data.blockInfos.totalCount

  let block_number_pages:number = (block_number / 20)

  if (block_number_pages > 500){
    block_number_pages = 500
  }

  const router = useRouter()
  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [BlockPageNumber,SetBlockPageNumber] = useAtom(BlockPageNumberValue)

  useEffect(()=>{
    if (router.isReady){
      if (enabledNightMode == true){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }
    }
  },[router.isReady])



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
        <div className="rounded-md   flex justify-end my-5" aria-label="Pagination">
          <button
              onClick={firstPage}
              className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="">First</span>
          </button>
          <button
              onClick={decPageCounter}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="bg-white border-gray-300 hidden lg:inline-block text-gray-500  relative inline-flex items-center px-4 py-2 border text-sm font-medium">
            Page {BlockPageNumber} of {block_number_pages}
          </div>
          <button onClick={addPageCounter} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
              onClick={lastPage}
              className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <span className="">Last</span>
          </button>
        </div>
      </div>
  )
}

const Blocks=()=>{
  const router = useRouter()
  let [isOpen, setIsOpen] = useState(false)

  const [enabledNightMode,] = useAtom(DarkModeAtom)
  const [BlockPageNumber,] = useAtom(BlockPageNumberValue)

  useEffect(()=>{
    if (router.isReady){
      if (enabledNightMode == true){
        document.documentElement.classList.add('dark');
      }else{
        document.documentElement.classList.remove('dark');
      }
    }
  },[router.isReady])

  const{loading,error,data} = useQuery(Blcok_Info,{
    variables:{
      first:(BlockPageNumber - 1) * 20
    },
  })


  const Copy=(span)=>{

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

      setIsOpen(true)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const GetBlock = (props) => {
    const value = props.target.id;
    router.push(`/blocksdetails/${value}`)
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
    // console.log(data)
    const extrinsic = data_list(data)
    return (
        <div className="mx-auto bg-gray-50 dark:bg-neutral-800  transition duration-700">

          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-20 mb-14">
              <div className="mx-auto lg:flex justify-between ">

                <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
                  Blocks
                </div>
                <div className="flex ">
                  <input type="text"
                         className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white  dark:bg-neutral-800  dark:text-white dark:focus:border-neutral-400 focus:border-neutral-700  dark:bg-gray-300  dark:border-neutral-700 outline-none"
                         placeholder="Search transactions, blocks, programs and token"
                         autoComplete="off"
                  />
                  <div className="flex justify-center z-10 text-gray-800 dark:text-gray-300 text-3xl py-3 -ml-11">
                    <i className="fa fa-search" aria-hidden="true"></i></div>


                </div>

              </div>

              <div className="my-5 overflow-x-auto bg-white dark:bg-neutral-800 rounded-lg ">
                <div className="py-2 min-w-full  p-5 ">
                  <div className="flex my-5 text-xl font-semibold text-gray-700 dark:text-gray-200">

                    <div>
                      Blocks
                    </div>

                  </div>
                  <div className="shadow overflow-auto  sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-400">
                      <thead className="bg-gray-100 dark:bg-neutral-600 text-gray-500 dark:text-neutral-300">
                      <tr>
                        {tokenstitle.map(title => (
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
                      {extrinsic.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium">
                              <button id={item.id} onClick={GetBlock}>
                                {item.blockHeight}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  font-medium">

                              <button id={item.id} onClick={GetBlock}>{item.id}
                                {/*<i className="fa fa-clone mr-1  " aria-hidden="true"></i>*/}
                            </button>

                            </td>

                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              {item.time}

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">

                              {item.eventNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-base text-gray-500 dark:text-zinc-300">
                              {item.extrinsicNumber}
                            </td>
                            {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">*/}
                            {/*  {item.result}*/}
                            {/*</td>*/}
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
export default Blocks
