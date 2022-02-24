import Header from "../../../components/header";
import React, {Fragment, useState} from "react";
import NFTHeader from "../../../components/NFT-header";
import Sort from "../../../components/sort";
import Link from "next/link";


const newnfts=[
    {
        img:"https://arweave.net/E8hAolqwS05LLRZgwmYJfMYan4WUZwr1KvBrJUdw7P8",
        afimg:"",
        title:"ACID BORYOKU DRAGONZ #0240",
        atitle:"",
        aicon:"",
        time:"1 minute ago",
        atime:"",
    },
    {
        img:"https://arweave.net/56CPBniqNGa5GyziChmhWmp-8ntEu91MDzBsLfm3ugA",
        afimg:"",
        title:"ACID BORYOKU DRAGONZ #0455",
        atitle:"",
        aicon:"",
        time:"1 minute ago",
        atime:"",
    },
    {
        img:"https://www.arweave.net/9H2SgCpXfWmIlaA2JR2WL_vM86KF70UaCwEvMV9UL8A?ext=png",
        afimg:"",
        title:"CANINE #250",
        atitle:"",
        aicon:"",
        time:" 2 minutes ago",
        atime:"",
    },
    {
        img:"https://arweave.net/5pwTwo0MIJ8ls8pZqwrhaj0gwvnwY_UqPI7q_gysKeY",
        afimg:"",
        title:"ACID BORYOKU DRAGONZ #0691",
        atitle:"",
        aicon:"",
        time:" 2 minutes ago",
        atime:"",
    },
    {
        img:"https://www.arweave.net/t9fU_oVP2sbBSdVPzsREetmUuJfBl1WP0hgzR5fcx8g?ext=png",
        afimg:"",
        title:"FISHBALL REPUBLIC #4820",
        atitle:"",
        aicon:"",
        time:" 5 minutes ago",
        atime:"",
    },

]


const newNFT=()=>{
    return(
        <div className="mx-auto bg-gray-50 dark:bg-current  transition duration-700">
            <Header></Header>
            <div className="max-w-7xl mx-auto py-16  px-4 ">
                <div className="my-20 mb-14">
                    <NFTHeader></NFTHeader>
                    <div className="bg-white p-5 rounded-lg mt-2">
                        <div className="mt-5">
                            <div className="flex grid md:grid-cols-2 xl:grid-cols-4 text-xs lg:text-sm  ">
                                {newnfts.map(item=>(
                                    <div key={item.title} className="rounded-lg border my-3 mx-auto lg:m-3 ">

                                        <div className="">
                                            <Link href={item.atitle}>
                                            <a>
                                                <img className="w-72 h-72 rounded-t"
                                                     src={item.img} alt=""/>
                                            </a>
                                            </Link>
                                        </div>
                                        <div className="p-3">
                                            <div className="flex text-blue-400 font-semibold justify-between">
                                                <div>
                                                    <Link href={item.atitle}>
                                                    <a >
                                                        {item.title}
                                                    </a>
                                                    </Link>
                                                </div>
                                                <Link href={item.aicon}>
                                                <a>
                                                    <i className="fa fa-asterisk" aria-hidden="true"></i>
                                                </a>
                                                </Link>
                                            </div>
                                            <div className="flex justify-between mt-3">
                                                <div className="flex">
                                                    <div>
                                                        Minted:
                                                    </div>
                                                    <div className="mx-1">
                                                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                    </div>
                                                    <div>
                                                        {item.time}
                                                    </div>
                                                    <div className="text-blue-400 ml-2">
                                                        <Link href={item.atime}>
                                                        <a>
                                                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                                        </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Sort></Sort>
                        </div>
                    </div>



                </div>

            </div>

        </div>
    )

}
export default newNFT
