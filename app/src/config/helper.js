function convertUnixTStoStr(unix_timestamp){
    return new Date(unix_timestamp * 1000).toLocaleDateString("en-US")
}

export { convertUnixTStoStr }