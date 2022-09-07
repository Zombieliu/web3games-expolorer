import {atom} from "jotai";
import { atomWithStorage } from 'jotai/utils'


// Set the string key and the initial value
const DarkModeAtom = atomWithStorage('darkMode', false)




const AccountValue = atom("5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM")
const AccountBalanceValue = atom('')

const CopyValue = atom (false)
const BlocksDetailsValue =atom([])

const EventValue = atom([])


const BlockPageNumberValue = atom(1)
const extrinsicPageNumberValue = atom(1)

const SelectNumber = atom(20)

export{AccountValue,AccountBalanceValue,DarkModeAtom,EventValue,BlocksDetailsValue,CopyValue,BlockPageNumberValue,extrinsicPageNumberValue,SelectNumber}
