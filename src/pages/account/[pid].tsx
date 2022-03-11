import Header from "../../components/header";
import React, {Fragment, useEffect, useState} from 'react';
import Link from 'next/link';
import Tail from '../../components/tail';
import Sort from '../../components/sort';
import AccountOverview from '../../components/Account-overview';
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {AccountBalanceValue, AccountValue, darkModeAtom, darkModeImg} from "../../jotai";
import {useQuery} from "graphql-hooks";
import axios from "axios";
import Error from "../../components/error";
import {DetailsSkeleton} from "../../components/skeleton";


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

const Account=()=>{
  const [account,setAccount] = useAtom(AccountValue)
  const [,setBalance] = useAtom(AccountBalanceValue)
  const router = useRouter();
  useEffect(()=>{
    if (router.isReady){
      const {pid} = router.query;
      setAccount(`${pid}`)
      axios.get(`http://47.242.8.196:3002/api/get/get_balance?account=${pid}`, {
      })
          .then(function (response) {
            if (Number(response.data.data) >= 100000000){
              const result = insertStr(response.data.data,9,'.')
              setBalance(result)
            }else{
              setBalance(response.data.data)
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    }
  },[router.isReady])

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
        <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">
          <Header></Header>
          <div className="max-w-7xl mx-auto py-16  px-4 ">
            <div className="my-20 mb-14">
              <div>
                <AccountOverview></AccountOverview>
              </div>
              <div className="bg-white p-5 rounded-lg mt-2">
                <div className="mt-5">
                  <div className="shadow overflow-auto border-b  border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100 dark:bg-gray-300">
                      <tr>
                        {title.map(title => (
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
                      {collections.map(item => (
                          <tr key={item.id} className="hover:bg-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap text-blue-400 text-sm font-medium  ">
                              <Link href={`/extrinsics/${item.extrinsicHash}`}>
                                <a>
                                  {item.extrinsicHash}
                                </a></Link>

                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                              <Link href={`/extrinsics/${item.extrinsicHash}`}>
                                <a className="">
                                  {item.blockHeight}
                                </a>
                              </Link>
                            </td>
                            <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
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
                    <Sort></Sort>
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
