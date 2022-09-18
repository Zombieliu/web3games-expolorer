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


const Blcok_Info = `
 query HomePage($select: Int,$first: Int) {
  blockInfos(first:$select,offset:$first,orderBy:TIMESTAMP_DESC){
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
  private fee: string;

  constructor(
      id:string,
      blockHeight:string,
      time:string,
      extrinsicNumber:string,
      eventNumber:string,
      fee:string,
  ) {
    this.id = id
    this.blockHeight = blockHeight
    this.time = time
    this.extrinsicNumber = extrinsicNumber
    this.eventNumber = eventNumber
    this.fee = fee
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
        (0.52222222).toFixed(6)
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



  const block_number:number = props.data.blockInfos.totalCount


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
      select:selectNumber,
      first:(BlockPageNumber - 1) * selectNumber
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
        <div className="mx-auto bg-white dark:bg-W3GBG transition duration-700">

          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-10 mb-14">
              <div className="mx-auto flex justify-between items-center">

                <div className="text-xl my-2 lg:my-0 text-3xl font-bold  bg-clip-text text-transparent bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3">
                  BLOCKS
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
                      {extrinsic.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-neutral-600 ">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  ">
                              <button id={item.id} onClick={GetBlock}>
                                {item.blockHeight}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400  ">
                              <button id={item.id} onClick={GetBlock}>
                                  {classNames(showAccount(item.id,))}
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">
                              <div className="flex justify-center w-36">
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
export default Blocks
