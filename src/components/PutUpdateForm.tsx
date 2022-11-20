import React,{useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ILink } from '../modules/ILink';
import { UrlService } from '../services/UrlService';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PutUpdateForm() {
  const params = useParams<{id:string}>();
  const[formData, setFormData] = useState<ILink>({
    id: 0,
    longUrl: '',
    shortUrl: '',
    dateCreate: new Date(),
    countClick: 0
  });

  useEffect(()=>{
    let id:number = parseInt(params.id!);
    UrlService.getLinkById(id)
    .then(response => setFormData(response.data.data))
    .catch(error => console.log(error.message));
  },[]);

  const navigation = useNavigate();

  const redirectToMainPage = (path:string) => {
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
        ...formData
    }

    UrlService.editLink(link)
    .then((response) => redirectToMainPage('/'))
    .catch(error => console.log(error.message));
  }

  return (
    <div className='col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4'>
        <h1 className='display-6 fw-bold py-2 text-truncate'>Create new link</h1>
        <form action='put'>
            <div className='form-group' hidden>
                <label className='fw-bold h5'>id</label>
                <input className='form-control' value={params.id} name="id" type="number"></input>
            </div>
            <div className='form-group'>
                <label className='fw-bold h5'>Long url</label>
                <input className='form-control' value={formData.longUrl} name="longUrl" type="text" onChange={handleChange}></input>
            </div>
            <div className='form-group'>
                <label className='fw-bold h5'>Short url</label>
                <input className='form-control' value={formData.shortUrl} name="shortUrl" type="text" onChange={handleChange}></input>
            </div>
            <div className='form-group'>
                <label className='fw-bold h5'>Date create</label>
                <input className='form-control' value={formData.dateCreate.toLocaleString('en-US')} name="dateCreate" type="datetime-local" onChange={handleChange}></input>
            </div>
            <div className='form-group'>
                <label className='fw-bold h5'>Count click</label>
                <input className='form-control' value={formData.countClick} name="countClick" type="number" onChange={handleChange}></input>
            </div>
            <button className='btn btn-primary mx-1 my-2' onClick={handleSubmit}>Submit</button>
            <button className='btn btn-danger mx-1 my-2' onClick={()=>redirectToMainPage('/')}>Cancel</button>
        </form>
    </div>
  )
}
