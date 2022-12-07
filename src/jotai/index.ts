import {atom} from "jotai";
import { atomWithStorage } from 'jotai/utils'
import {useState} from "react";


// Set the string key and the initial value
const DarkModeAtom = atomWithStorage('darkMode', false)


const AccountValue = atom("")
const AccountBalanceValue = atom('')

const BlocksDetailsValue =atom([])

const EventValue = atom([])


const PageNumberValue = atom(1)
const extrinsicPageNumberValue = atom(1)

const SelectNumber = atom(20)

const PopUpBoxInfo = atom({
    type:"",
    hash:"",
    state:false
})
const PopUpBoxState = atom(false)
const CopyPopUpBoxState = atom(false)
const accountInfo = {
    amount:0,
}
const AccountInfo = atom(accountInfo)

export{PopUpBoxInfo,CopyPopUpBoxState,AccountInfo,PopUpBoxState,AccountValue,AccountBalanceValue,DarkModeAtom,EventValue,BlocksDetailsValue,PageNumberValue,extrinsicPageNumberValue,SelectNumber}
