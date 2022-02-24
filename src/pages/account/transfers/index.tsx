

import Header from "../../../components/header";
import React, { Fragment, useState } from 'react';
import AccountOverview from '../../../components/Account-overview';
import Tail from '../../../components/tail';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Sort from '../../../components/sort';
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const title=[
  {
    title:"Signature"
  },
  {
    title:"Block"
  },
  {
    title:"Time",
    i:"fa fa-clock-o ml-1"
  },
  {
    title:"From"
  },
  {
    title:"To"
  },
  {
    title:"Change Amount (W3G)"
  },

]
const trades=[
  {
    id:"1",
    signature:"3GDDhQJ5gKDLpYU6FZRVS",
    asignature:"",
    block:"#86220024",
    ablock:"",
    time:"8 months ago",
    afrom:"",
    from:"2ojv9B...WGHG8S",
    to:"This account",
    changeamoun:"+ 9.89",
    state:"up"

  },
  {
    id:"2",
    signature:"3GDDhQJ5gKDLpYU6FZRVS",
    asignature:"",
    block:"#86220024",
    ablock:"",
    time:"8 months ago",
    afrom:"",
    from:"2ojv9B...WGHG8S",
    to:"This account",
    changeamoun:"+ 9.89",
    state:"up"

  },
  {
    id:"3",
    signature:"3GDDhQJ5gKDLpYU6FZRVS",
    asignature:"",
    block:"#86220024",
    ablock:"",
    time:"8 months ago",
    afrom:"",
    from:"2ojv9B...WGHG8S",
    to:"This account",
    changeamoun:"+ 9.89",
    state:"down"

  },
  {
    id:"4",
    signature:"3GDDhQJ5gKDLpYU6FZRVS",
    asignature:"",
    block:"#86220024",
    ablock:"",
    time:"8 months ago",
    afrom:"",
    from:"2ojv9B...WGHG8S",
    to:"This account",
    changeamoun:"+ 9.89",
    state:"down"


  },

]
const StateStyles={
  up:" text-green-300 ",
  down:" text-red-500",
}

const Transfers=()=>{
  let [isOpen, setIsOpen] = useState(false)
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
  return(
    <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">
      <Header></Header>
      <div className="max-w-7xl mx-auto py-16  px-4 ">
        <div className="my-20 mb-14">
          <AccountOverview></AccountOverview>
          <div className="bg-white p-5 rounded-lg mt-2">
            <div className="mt-5">
              <div className="shadow overflow-auto border-b  border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 dark:bg-gray-300">
                  <tr>
                    {title.map(title=>(
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
                  {trades.map(item=>(
                    <tr key={item.id} className="hover:bg-gray-200" >
                      <td className="px-6 py-4 whitespace-nowrap text-sm  text-blue-400  ">
                        <Link href={item.asignature}>
                         <a   className="">
                            {item.signature}
                        </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-400 ">
                        <Link href={item.ablock}>
                        <a>
                          {item.block}
                        </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">

                      <div className="text-gray-800 flex" id="from">
                        <Link href={item.afrom}>
                       <a  id="from" className="mr-1 text-blue-400">
                         {item.from}
                       </a> </Link><button onClick={() => {
                        // @ts-ignore
                        Copy("from");
                      }}> <i className="fa fa-clone mt-1" aria-hidden="true"></i></button>
                      </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                        {item.to}
                      </td>
                      <td className={classNames(StateStyles[item.state],"px-6 py-4 whitespace-nowrap text-sm  ")}>
                        {item.changeamoun}
                      </td>


                    </tr>
                  ))}
                  </tbody>
                </table>
                <Sort></Sort>
              </div>


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
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block  text-center max-w-md p-3  overflow-hidden text-left align-middle transition-all transform bg-green-50 shadow-xl rounded-2xl">

                <div className="flex justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
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
export default Transfers
