import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ILink } from '../modules/ILinks';
import { UrlService } from '../services/UrlService';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PostCreateForm() {
  const[formData, setFormData] = useState({longUrl:''});
  const navigation = useNavigate();

  const redirectToMainPage = () => {
    const path:string = '/';
    navigation(path);
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    const link:ILink = {
        id: 0,
        longUrl: formData.longUrl,
        shortUrl: '',
        dateCreate: new Date,
        countClick: 0
    }

    UrlService.createLink(link)
    .then((response) => redirectToMainPage())
    .catch(error => console.log(error.message));
  }

  return (
    <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4'>
        <h1 className='display-6 fw-bold py-2 text-truncate'>Create new link</h1>
        <div>
          <form action='post'>
              <div className='form-group'>
                  <label className='fw-bold h5'>Long url</label>
                  <input placeholder='https://www.youtube.com/' className='form-control' value={formData.longUrl} name="longUrl" type="text" onChange={handleChange}></input>
              </div>

              <button className='btn btn-primary mx-1 my-2' onClick={handleSubmit}>Submit</button>
              <button className='btn btn-danger mx-1 my-2' onClick={redirectToMainPage}>Cancel</button>
          </form> 
        </div>
        
    </div>
  )
}
