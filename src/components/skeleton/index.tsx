
const HiddenSkeleton = () =>{
    return(
        <div className="lg:flex mb-20 mx-auto">
            <div className=" shadow p-5 rounded-md mb-10  xl:w-7/12 lg:mr-5  grid grid-cols-2 gap-4 ">
                <div className="flex space-x-4 py-3 ">
                    <div className="rounded-lg bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4 py-3 ">
                    <div className="rounded-lg bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4 py-3 ">
                    <div className="rounded-lg bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-4  py-3">
                    <div className="rounded-lg bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                            </div>
                            <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:w-5/12 ">
                <div className="  shadow p-5 rounded-md">
                    <div className="flex ">
                        <div className="rounded-full bg-gray-200 h-10 w-10 mr-8"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                                <div className="space-y-3 h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-4  mt-5 ">
                        <div className="rounded-lg bg-gray-200 h-5 w-5"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-4  mt-5 ">
                        <div className="rounded-lg bg-gray-200 h-5 w-5"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-gray-200 rounded col-span-2"></div>
                                    <div className="h-2 bg-gray-200-200 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



const BlockSkeleton = () =>{
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 shadow rounded-md">
            <div className="w-full  p-5   mb-10 lg:mb-0">
                <div className="flex-1 space-y-10 py-1">
                    <div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div><div className="grid grid-cols-4 gap-12 py-4">
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                    </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>

                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>

                </div>
            </div>
            <div className="w-full  p-5   mb-10 lg:mb-0">
                <div className="flex-1 space-y-10 py-1">
                    <div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div><div className="grid grid-cols-4 gap-12 py-4">
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                    </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>

                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>

                </div>
            </div>
            <div className="w-full  p-5 hidden md:block  mb-10 lg:mb-0">
                <div className="flex-1 space-y-10 py-1">
                    <div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div><div className="grid grid-cols-4 gap-12 py-4">
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                    </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>

                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>

                </div>
            </div>
            <div className="w-full hidden md:block p-5   mb-10 lg:mb-0">
                <div className="flex-1 space-y-10 py-1">
                    <div>
                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div><div className="grid grid-cols-4 gap-12 py-4">
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        <div className="w-2 h-2 bg-gray-200 rounded "></div>
                    </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>

                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>
                        <div className="grid grid-cols-4 gap-12 py-4">
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                            <div className="w-2 h-2 bg-gray-200 rounded "></div>
                        </div>

                        <div className="h-2 bg-gray-200 rounded"></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const DetailsSkeleton = () =>{
    return(
        <>
            <div className="shadow p-5 rounded-md flex-1 space-y-6 py-1 mb-10 lg:mb-10">
                <div className="mt-5 h-2 w-3/12 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                    <div className="lg:flex pb-10 lg:pb-10">
                        <div className="h-2 w-4/12 lg:w-3/12 bg-gray-200 rounded col-span-2 mb-5 lg:mr-32"></div>
                        <div className="h-2 lg:w-5/12 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="lg:flex pb-10 lg:pb-10">
                        <div className="h-2 w-4/12 lg:w-3/12 bg-gray-200 rounded col-span-2 mb-5 lg:mr-32"></div>
                        <div className="h-2 lg:w-5/12 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="lg:flex pb-10 lg:pb-10">
                        <div className="h-2 w-4/12 lg:w-3/12 bg-gray-200 rounded col-span-2 mb-5 lg:mr-32"></div>
                        <div className="h-2 lg:w-5/12 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="lg:flex pb-10 lg:pb-10">
                        <div className="h-2 w-4/12 lg:w-3/12 bg-gray-200 rounded col-span-2 mb-5 lg:mr-32"></div>
                        <div className="h-2 lg:w-5/12 bg-gray-200 rounded col-span-1"></div>
                    </div>
                    <div className="lg:flex pb-10 lg:pb-10">
                        <div className="h-2 w-4/12 lg:w-3/12 bg-gray-200 rounded col-span-2 mb-5 lg:mr-32"></div>
                        <div className="h-2 lg:w-5/12 bg-gray-200 rounded col-span-1"></div>
                    </div>
                </div>

            </div>
            <div className="shadow p-5 rounded-md flex-1 space-y-6 py-1">

                <div className="my-5 h-2 w-3/12 bg-gray-200 rounded "></div>
                <div className="mb-32 h-16   bg-gray-200 rounded ">

                </div>
            </div>

        </>
    )
}

export {HiddenSkeleton,BlockSkeleton,DetailsSkeleton}
