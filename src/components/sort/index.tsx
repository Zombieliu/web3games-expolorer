import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useAtom} from "jotai";
import {darkModeAtom, } from "../../jotai";


const Sort=()=>{
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
    return(
        <div>
            <div className="rounded-md   flex justify-end my-5" aria-label="Pagination">
                <Link href="#">
                    <a

                        className="relative inline-flex items-center px-2 py-2 mr-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="">First</span>
                    </a>
                </Link>
                <Link href="#">
                <a

                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                </Link>
                    <div className="bg-white border-gray-300 hidden lg:inline-block text-gray-500  relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        Page 1 of 11
                    </div>

                <Link href="#">
                <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
            </Link>
                <Link href="#">
                    <a

                        className="relative inline-flex items-center px-2 py-2 ml-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="">Last</span>
                    </a>
                </Link>

            </div>
        </div>
    )
}
export default Sort
