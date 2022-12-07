import {useAtom} from "jotai";
import {AccountValue, PageNumberValue, DarkModeAtom, CopyPopUpBoxState} from "../../jotai";
import React, {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {useQuery} from "graphql-hooks";
import {DetailsSkeleton} from "../skeleton";
import Error from "../error";
import Header from "../header";
import {Dialog, Listbox, Transition} from "@headlessui/react";
import {CheckCircleIcon, CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import Tail from "../tail";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const token = [
    {
        id: 1,
        name: '$804,364,41',
        avatar: '/web3gsmall.png',
    },
    {
        id: 1,
        name: '$804,364,41',
        avatar: '/web3gsmall.png',
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
const overview=
    {

        address:"0xCD1dsuadg93gub3942958h8hf9428H98h2h79H84",
        timestamp:"28",
        transactions:"20",
        reward:"0.0027516712",
        gasUsed:"458,943 (3.08%）",
        gasLimit:"15,000,000",
        hash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        parentHash:"0x1dchsdkh239hfiqf9hfwbf943bgjksdhishfih4h0whefn40tihqwh0wth40h",
        Nonce:"0x00000000000000",

    }


const  AddressTitle =() => {
    const [account,] = useAtom(AccountValue);
    const [pathname,setPathname] = useState("")
    const router = useRouter()
    useEffect(()=>{
        if (router.isReady){

            const content = router.asPath
            const fetchUserBounty = async () => {
                setPathname(content)
                console.log(`${content}`)
            }
            fetchUserBounty()
        }
    },[router.isReady])

    const title =[
        { id:1 ,name: 'Transactions', href:`/evm_address/${account}` },
        { id:2 ,name: 'Internal Txns', href:`/evm_address/internal_txns/${account}` },
        { id:3 ,name: 'Erc20 Token Txns', href:`/evm_address/erc20_token_txns/${account}` },
        { id:4 ,name: 'Erc721 Token Txns', href:`/evm_address/erc721_token_txns/${account}` },
        { id:5 ,name: 'Erc1155 Token Txns', href:`/evm_address/erc1155_token_txns/${account}` },
    ]


    return (
        <div className="flex justify-between mt-5  w-full font-semibold text-sm lg:text-lg bg-white shadow-lg dark:bg-[#262626]  p-2 rounded-md">
            {title.map(item=>(
                <div key={item.id} className="pr-8 text-gray-500 ">
                    <Link href={item.href}>
                        <a className={classNames(`${item.href}` == `${pathname}` ?"bg-clip-text text-transparent  bg-gradient-to-r from-W3G1  via-W3G2 to-W3G3  border-black dark:border-neutral-400":"",'p-2 ')}>
                            {item.name}
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

const EVMAddress=()=>{
    const router = useRouter()
    const [,setCopy_Sop_up_boxState] = useAtom(CopyPopUpBoxState)
    const [selected, setSelected] = useState(token[0])
    const [PageNumber,] = useAtom(PageNumberValue)
    const [number,setNumber] = useState("")

    useEffect(()=>{
        if (router.isReady){

            const number = router.query.pid
            // @ts-ignore
            setNumber(number)
            console.log(number)
        }
    },[router.isReady])

    const{loading,error,data} = useQuery(Blcok_Info,{
        variables:{
            first:(PageNumber - 1) * 20
        },
    })
    const Copy=(span)=>{
        console.log(span)
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
            setCopy_Sop_up_boxState(true)
        }
    }


    const GetTransactions = () => {
        router.push("/evm_transactions")
    }

    const GetBlock = (props) => {
        const value = props.target.id;
        router.push(`/evm_blocks_block/${value}`)
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
        return (
            <div className="mt-10 mb-4 ">
                <div className="mx-auto lg:flex justify-between items-center">

                    <div className=" my-2 lg:my-0 text-3xl font-bold text-black dark:text-white  flex items-center">
                        Address
                        <div className="text-gray-600 text-base ml-4 mt-2" id={number}>
                            {number}
                        </div>
                        <div className="text-xs mt-2">
                            <button onClick={() => {
                                // @ts-ignore
                                Copy(`${number}`);}} >
                                <img className="w-4 ml-1" src="/copy.svg" alt=""/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-5  bg-white dark:bg-W3GInfoBG rounded-lg border dark:border-W3GInfoBorderBG ">
                    <div className=" min-w-full  dark:text-neutral-300 ">
                        <div className="flex  text-xl font-semibold items-center p-5 border-b dark:border-W3GInfoBorderBG rounded-t-lg">
                            <div className="text-black dark:text-white">
                                Overview
                            </div>
                        </div>
                        <div className="text-black dark:text-white  text-sm ">
                            <div  className="divide-y divide-gray-200 dark:divide-W3GInfoBorderBG px-5  items-center">
                                <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                    <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                        Balance:
                                    </div>
                                    <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                        <div className="text-gray-800  dark:text-white md:flex items-center " >
                                            {overview.reward} W3G
                                        </div>
                                    </div>
                                </div>

                                <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                    <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                        Ether Value：
                                    </div>
                                    <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                        <div className="text-gray-800  dark:text-white md:flex items-center " >
                                            {overview.gasUsed}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:flex justify-between lg:justify-start  py-4   items-center">
                                    <div className="font-semibold lg:font-medium w-60 mr-32  ">
                                        Token：
                                    </div>
                                    <div className="flex flex-warp items-center mt-2 md:mt-0 ">
                                        <Listbox value={selected} onChange={setSelected}>
                                            {({ open }) => (
                                                <>
                                                    <div className="mt-1 relative">
                                                        <Listbox.Button className="relative w-72 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-W3GInfoBorderBG rounded-md shadow-sm pl-3 pr-10 py-2 outline-none text-left cursor-default  sm:text-sm">
                                                                        <span className="flex items-center">
                                                                            <img src={selected.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                                            <span className="ml-3 block truncate">{selected.name}</span>
                                                                        </span>
                                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                        </span>
                                                        </Listbox.Button>

                                                        <Transition
                                                            show={open}
                                                            as={Fragment}
                                                            leave="transition ease-in duration-100"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-500 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                                {token.map((token) => (
                                                                    <Listbox.Option
                                                                        key={token.id}
                                                                        className={({ active }) =>
                                                                            classNames(
                                                                                active ? 'text-white bg-neutral-700' : 'text-gray-900',
                                                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                                                            )
                                                                        }
                                                                        value={token}
                                                                    >
                                                                        {({ selected, active }) => (
                                                                            <>
                                                                                <div className="flex items-center">
                                                                                    <img src={token.avatar} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                                                    <span
                                                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                                    >
                                                                                                    {token.name}
                                                                                                </span>
                                                                                </div>

                                                                                {selected ? (
                                                                                    <span
                                                                                        className={classNames(
                                                                                            active ? 'text-white' : 'text-indigo-600 dark:text-neutral-700 ',
                                                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                        )}
                                                                                    >
                                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                                </span>
                                                                                ) : null}
                                                                            </>
                                                                        )}
                                                                    </Listbox.Option>
                                                                ))}
                                                            </Listbox.Options>
                                                        </Transition>
                                                    </div>
                                                </>
                                            )}
                                        </Listbox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddressTitle/>
            </div>
        )
    }
}

export default EVMAddress
