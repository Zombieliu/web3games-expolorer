import Header from "../../components/header";
import React, { Fragment, useState } from 'react';
import Link from 'next/link';
import Tail from '../../components/tail';
import Sort from '../../components/sort';
import AccountOverview from '../../components/Account-overview';
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
    title:"Instructions"
  },
  {
    title:"By"
  },
  {
    title:"Fee(W3G)"
  },
]
const collections=[
  {
    id:"1",
    signature:'5Q7Dg7iuF29gKZFEpj8zQiGwYwg',
    block:"#122238261",
    time:"41 minutes ago",
    instructions:"Vote",
    by:"This account",
    fee:"0.000005",

  },
  {
    id:"2",
    signature:'5Q7Dg7iuF29gKZFEpj8zQiGwYwg',
    block:"#122238261",
    time:"41 minutes ago",
    instructions:"Vote",
    by:"This account",
    fee:"0.000005",

  },
  {
    id:"3",
    signature:'5Q7Dg7iuF29gKZFEpj8zQiGwYwg',
    block:"#122238261",
    time:"41 minutes ago",
    instructions:"Vote",
    by:"This account",
    fee:"0.000005",

  },


]

const Account=()=>{
  return(
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
                  {collections.map(item=>(
                    <tr key={item.id} className="hover:bg-gray-200" >
                      <td className="px-6 py-4 whitespace-nowrap text-blue-400 text-sm font-medium  ">
                        <Link href=''>
                        <a >
                          {item.signature}
                        </a></Link>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-400 font-medium ">
                        <Link href='' >
                        <a  className="">
                            {item.block}
                        </a>
                        </Link>
                      </td>
                      <td className="px-6 py-6 whitespace-nowrap text-sm text-gray-500">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.instructions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.by}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                        {item.fee}
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



    </div>
  )

}
export default Account
