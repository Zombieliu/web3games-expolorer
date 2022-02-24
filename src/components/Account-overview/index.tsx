import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';

const navigation = [

  { id:1 ,name: 'Transactions ', href:'/account' },
  { id:2 ,name: 'W3G Transfers', href:'/account/transfers' },

]
const overview = [
  {
    img:"/web3gsmall.png",
    name: 'DbKZitpBR',
    amount: '1',
    value:"",
    href: '',

  },
  {
    img:"/web3gsmall.png",
    name: 'DbKZitpBR',
    amount: '5',
    value:"",
    href: '',

  },
  {
    img:"/web3gsmall.png",
    name: 'DbKZitpBR',
    amount: '1',
    value:"",
    href: '',
  },
]

const AccountOverview=()=>{
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
    <div>
      <div className="lg:flex justify-between ">
        <div className="text-xl my-2 lg:my-0 lg:text-3xl font-bold  dark:text-gray-300">
          Account
        </div>
        <div className="flex ">
          <input type="text"
                 className=" text-xs rounded-lg  pl-3 pr-20 w-96 border bg-white dark:border-gray-500 dark:bg-gray-700 outline-none"
                 placeholder="Search transactions, blocks, programs and token"
          />
          <div className="flex justify-center z-10 text-gray-800 text-3xl py-3 -ml-11">
            <i className="fa fa-search" aria-hidden="true"></i></div>
        </div>
      </div>
      <div className="flex">
        <div id="account" className="text-xs mt-2 lg:text-base mr-2">
          8QLfmTYxnws98ogFfxdpvRSfSR7U9HLcighZHNfFNQwT
        </div>
        <div>
          <button onClick={() => {
            // @ts-ignore
            Copy("account");
          }}> <i className="fa fa-clone mt-2 lg:mt-3" aria-hidden="true"></i></button>
        </div>
      </div>

      <div className="lg:flex justify-between py-6 w-full">
        <div className="bg-white p-5 rounded-lg w-full mb-2 lg:w-1/2 mr-10 shadow-lg">
          <div className="text-xl font-semibold mb-3">
            Overview
          </div>
          <div className="flex  ">
          <div className='flex-col justify-between mr-20 text-gray-400'>
            <div className="mb-3">
              W3G Balance
            </div>
            <div className='mb-3'>
              W3G Token Balance
            </div>
          </div>

          <div className="">
            <div className="flex mb-3">
            <div className="font-semibold mr-1 "> 0.6795615 W3G </div> <div className="text-gray-600">($55.2)</div>
            </div>
            <div>
              <div className="flex mb-3">
               <div className="font-semibold mr-1"> 4 SPL tokens </div>
                <div className="text-gray-600">($0.28)</div>
              </div>
            </div>
          </div>
          </div>
          <div className="w-full    top-16">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                ${open ? '' : 'text-opacity-90'}
                text-black group bg-orange-700 px-3 py-2 w-full border bg-gray-100 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <div className="flex justify-between w-full">

                      <div className="flex">
                        <img className='w-8 h-8 ' src='/web3gsmall.png' alt='' />

                        <div className="mt-1 ml-2">
                          XSB
                        </div>
                      </div>
                      <div className="mt-1">
                        125
                      </div>
                      <div className="mt-1">
                        $0.28
                      </div>
                    <ChevronDownIcon
                      className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 mt-1.5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                      aria-hidden="true"
                    />
                    </div>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10     mt-3   w-full">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

                        <div className="p-4 bg-gray-100 flex justify-between font-semibold text-sm">

                          <div className=" w-1/3">
                            Token
                          </div>
                          <div className="w-1/3">
                            Amount
                          </div>
                          <div className=" w-1/3">
                            Value
                          </div>
                        </div>
                        <div className="relative  bg-white px-1 py-2 lg:p-4 ">
                          <div className="flex justify-items-start py-2 lg:p-2 border-b hover:bg-gray-200">

                            <Link href="">
                            <a  className="flex w-1/3 mr-1 ">
                              <div>
                              <img className='w-7 h-7 lg:w-8 lg:h-8 ' src='/web3gsmall.png' alt='' />
                              </div>

                              <div className="ml-2 ">
                              <div className="-mt-0.5 text-sm font-semibold">
                                XSB
                              </div>
                                <div className="text-xs">
                                  $0.00229394
                                </div>
                              </div>
                            </a>
                            </Link>
                            <div className="mt-1 w-1/3">
                              125
                            </div>
                            <div className="mt-1 w-1/3">
                              $0.28
                            </div>

                          </div>
                          {overview.map((item) => (
                            <div key={item.href} className="flex justify-items-start py-2 lg:p-2 border-b hover:bg-gray-200">

                              <Link href=''>
                              <a  className="flex w-1/3 mr-1">
                                <div>
                                  <img className='w-7 h-7 lg:w-8 lg:h-8 ' src={item.img} alt='' />
                                </div>

                                <div className="ml-2 ">
                                  <div className="mt-1.5 text-sm font-semibold">
                                    {item.name}
                                  </div>
                                </div>
                              </a>
                              </Link>
                              <div className="mt-1 w-1/3">
                                {item.amount}
                              </div>
                              <div className="mt-1 w-1/3">
                                {item.value}
                              </div>

                            </div>
                          ))}
                        </div>

                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>


        </div>
        <div className="bg-white p-5 rounded-lg w-full mb-2 lg:w-1/2 shadow-lg">
          <div className="text-xl font-semibold mb-3">
            More info
          </div>
          <div className="flex justify-between">
            <div className='flex-col justify-between mr-20 text-gray-400'>
              <div className="mb-3">
                W3G Balance
              </div>
              <div className='mb-3'>
                W3G Token Balance
              </div>
            </div>

            <div className="">
              <div className="flex mb-3">
                <div className="font-semibold mr-1 "> 282</div>
              </div>
              <div>
                <div className="flex mb-3">
                  <div className="font-semibold mr-1"> 0 W3G</div>
                </div>
              </div>
            </div>
          </div>



        </div>


      </div>


      <div className="flex justify-start mt-5  font-semibold text-sm lg:text-lg ">
        {navigation.map(item=>(
          <div key={item.id} className="pr-8 text-gray-500 ">
            <Link href={item.href}>
              <a className="hover:text-blue-400 transition duration-300 ">
                {item.name}
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40  -mt-96"
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
export default AccountOverview
