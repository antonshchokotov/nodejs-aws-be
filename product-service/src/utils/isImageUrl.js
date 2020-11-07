import axios from 'axios'

const isImageUrl = async url => {
  try {
    const res = await axios.get(url)
    return res.headers['content-type'].startsWith('image')
  } catch (error) {
    return false
  }
}

export default isImageUrl