import {useEffect} from "react";
import {useRouter} from "next/router";

const Test = (props)=>{
    const { serverItem } = props
    const router = useRouter()
    const {pid} = router.query
    const clientItem = { name: `client ${pid}` }
    const item = serverItem || clientItem

    useEffect(()=>{
        if (router.isReady && !item){
            // fetch item with pid
        }
    },[router.isReady])

    console.log("render")
    return (
        <div>
            {`${item.name}`}
        </div>
    )
}

export async function getServerSideProps({ params }: any) {
    try {
        const { pid } = params
        if (+pid  === 1) {
            return { props: {} }
        }
        const serverItem = { name: `${pid} Henry Liu`  } // await api.get(null, `project/slug/${slug}`, {})
        if (serverItem) {
            return {
                props: {
                    serverItem,
                },
            }
        }
    } catch (error) {
        console.log('error', error)
    }
    return { props: {} }
}
export default Test