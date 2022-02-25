import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/solid";
import Link from "next/link";
import React from "react";


const Sort=()=>{
    return(
        <div>
            <div className="rounded-md   flex justify-end my-5" aria-label="Pagination">
                <Link href="#">
                <a

                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                </Link>

                <div>
                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                    <Link href="#">
                    <a
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                        1
                    </a>
                    </Link>
                    <Link href="#">
                    <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        2
                    </a>
                    </Link>
                    <Link href="#">
                    <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50  md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                        3
                    </a>
                    </Link>
                    <Link href="#">
                    <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50  md:inline-flex relative items-center px-4 py-2 border text-sm font-medium">
                        4
                    </a>
                    </Link>
                    <Link href="#">
                    <a className="bg-white border-gray-300 hidden lg:inline-block text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                        5
                    </a>
                    </Link>

                </div>
                <Link href="#">
                <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
            </Link>

            </div>
        </div>
    )
}
export default Sort
