const cropData = (num,n) =>{
    return parseInt(String(num * Math.pow(10, n))) / Math.pow(10, n)

}
export {
    cropData
}
