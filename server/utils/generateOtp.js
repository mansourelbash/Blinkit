const generatedOtp = () => {
    return Math.floor(Math.random() * 900000) + 10000 // 0 to 900000
}

export default generatedOtp