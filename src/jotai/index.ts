import {atom} from "jotai";
import { atomWithStorage } from 'jotai/utils'
import {useState} from "react";


// Set the string key and the initial value
const DarkModeAtom = atomWithStorage('darkMode', true)




const AccountValue = atom("5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM")
const AccountBalanceValue = atom('')

const CopyValue = atom (false)
const BlocksDetailsValue =atom([])

const EventValue = atom([])


const BlockPageNumberValue = atom(1)
const extrinsicPageNumberValue = atom(1)

const SelectNumber = atom(20)

const PopUpBoxInfo = atom({
    type:"",
    hash:"",
    state:false
})
const PopUpBoxState = atom(false)


const accountInfo = {
    amount:0,
}
const AccountInfo = atom(accountInfo)

export{PopUpBoxInfo,AccountInfo,PopUpBoxState,AccountValue,AccountBalanceValue,DarkModeAtom,EventValue,BlocksDetailsValue,CopyValue,BlockPageNumberValue,extrinsicPageNumberValue,SelectNumber}
