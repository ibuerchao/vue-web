import JSEncrypt from 'jsencrypt/bin/jsencrypt'
// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCRkNokhMqpFS6QOzGIgXeI4/QXw7dGnUNHuvNinl2d2r80LmYSTYUq7qGYSmKaFMBNd/wbSVvxPLEqdxFUukIKuCtFQxO4ZhYq6+eyHCbJgZn8/uxMg6tb5xGUmV4dQX1mf7dLV1jF3+1Wi/DB/csW5TcMVeCpFeJktLNb+S/tMwIDAQAB'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  let encrypt = encryptor.encrypt(txt);
  console.log(encrypt)
  return encrypt // 对需要加密的数据进行加密
}

