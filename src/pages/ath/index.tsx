import React, { useState } from 'react';
import dynamic from "next/dynamic";
import One from "../../components/one";


// const One = dynamic(import('../../components/one'))

const Ath = () =>{
    const [nowTime,setTime] = useState(Date.now())

    // const changeTime= async ()=>{ //把方法变成异步模式
    //     const moment = await import('moment') //等待moment加载完成
    //     // @ts-ignore
    //     setTime(moment.default(Date.now()).format()) //注意使用defalut
    // }

    return (
        <>
            <div>现在时间是：{nowTime}</div>
            <One/>
            {/*<div><button onClick={changeTime}>改变时间格式</button></div>*/}
        </>
    )
}

export default Ath



