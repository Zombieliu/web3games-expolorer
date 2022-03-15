import {atom} from "jotai";
import { atomWithStorage } from 'jotai/utils'


// Set the string key and the initial value
const darkModeAtom = atomWithStorage('darkMode', false)
const darkModeImg=atomWithStorage("img","/web3gb.svg")



const AccountValue = atom("5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM")
const AccountBalanceValue = atom('')

const CopyValue = atom (false)
const BlocksDetailsValue =atom([])

const EventValue = atom([])


const BlockPageNumberValue = atom(1)
const extrinsicPageNumberValue = atom(1)

export{AccountValue,AccountBalanceValue,darkModeAtom,darkModeImg,EventValue,BlocksDetailsValue,CopyValue,BlockPageNumberValue,extrinsicPageNumberValue}
