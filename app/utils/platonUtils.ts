import  bech32 from 'bech32';

/**
 * 解码 Bech32 地址（支持 Imuachain）
 * @param {string} prefix - 地址前缀，例如 "imua"
 * @param {string} address - Bech32 地址
 * @returns {string} - 解码后的十六进制地址
 */
export function decodeBech32Address(prefix: string, address: string): string {
  const decoded = bech32.decode(address);
  if (decoded.prefix !== prefix) {
    throw new Error(`Invalid prefix: expected ${prefix}, got ${decoded.prefix}`);
  }
  const data = bech32.fromWords(decoded.words);
  return '0x' + Buffer.from(data).toString('hex');
}

/**
 * 将十六进制字符串转换为 Buffer
 * @param {string} hexStr - 十六进制字符串
 * @returns {Buffer} - 转换后的 Buffer
 */
export function hexStrBuf(hexStr: string): Buffer {
  return Buffer.from(hexStr.replace(/^0x/, ''), 'hex');
}

/**
 * 从 EVM 地址转换为 Bech32 地址
 * @param hrp 人类可读前缀，例如 'lat'
 * @param address 0x 开头的 EVM 地址
 */
export function toBech32Address(hrp: string, address: string): string {
  const words = bech32.toWords(Buffer.from(address.replace(/^0x/, ''), 'hex'));
  return bech32.encode(hrp, words);
}

/**
 * 从 Bech32 地址转换为 EVM 地址
 * @param address Bech32 格式地址，例如 lat1xxx...
 */
export function fromBech32Address(address: string): string {
  try {
    const decoded = bech32.decode(address);
    const hexAddress = "0x" + Buffer.from(bech32.fromWords(decoded.words)).toString('hex');
    return hexAddress;
  } catch (error) {
    console.error('Bech32 address decoding error:', error);
    throw new Error('无效的 Bech32 地址格式');
  }
}

/**
 * 将以太坊地址转换为 Imuachain 地址
 * @param {string} ethAddress - 以太坊地址
 * @returns {string} - Imuachain 地址
 */
export const convertToImuachainAddress = (ethAddress: string): string => {
  const hexAddress = ethAddress.toLowerCase();
  const hrp = 'imua'; // Imuachain 地址前缀
  const words = bech32.toWords(Buffer.from(hexAddress.replace(/^0x/, ''), 'hex'));
  return bech32.encode(hrp, words);
}

// 其他实用函数... 