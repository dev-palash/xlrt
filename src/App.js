import logo from './logo.svg';
import './App.css';
import FileUpload from './components/Fileupload/FileUpload';
import Table from './components/Table/Table';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <FileUpload />
      <Table />
    </>
  );
}

export default App;
