import Axios from "../Axios"

const uploadFile = (body)=>{
 return Axios.post('/document', body);
}

const getDocuments = () =>{
  return Axios.get('document');
}

export {uploadFile, getDocuments}
