const Encryption = require("./encryption")
const ethers = require("ethers")
const utils = ethers.utils

const privateKey = "0x7a7ac95588a98d1203f4781e3aa3fcc3e86c81edd637257b34393e7e602ded36"

const algorithm = "aes-256-cbc";
const timestamp = new Date().getTime().toString();

const signingKey = new utils.SigningKey(privateKey);
const messageBytes = utils.toUtf8Bytes(timestamp);
const messageDigest = utils.keccak256(messageBytes);
const signature = signingKey.signDigest(messageDigest);
const signingAddress = signingKey.address;

const encryption = new Encryption(algorithm, timestamp);
encryption.encrypt(signingAddress).then(data => {
    const message = data.toString("hex")

    const request = {timestamp, message, messageDigest, signature}
    console.log(JSON.stringify(request));
})