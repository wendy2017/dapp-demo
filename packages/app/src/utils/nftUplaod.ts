import { NFTStorage } from 'nft.storage'
// Wendy TODO   后续添加文件上传功能，目前用已经存在的
const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_TOKEN ?? ''

//正常的imgUri对应的应该是一个上传的文件file
const IPFSupload = async (data, file) => {
  try {
    const client = new NFTStorage({
      token: NFT_STORAGE_TOKEN,
    })
    const metadata = await client.store({
      name: data.name,
      description: data.description,
      imgUri: data?.imgUri,
      image: new File([file], file.name, { type: file.type }),
    })
    console.log(metadata)
    return metadata
  } catch (error) {
    console.error(error)
  } finally {
    console.log('finish')
  }
}

export default IPFSupload
