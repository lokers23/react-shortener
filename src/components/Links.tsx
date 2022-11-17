import React from 'react';
import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ILink } from '../modules/ILinks';
import { UrlService } from '../services/UrlService';
import '../styles/Links.css';

import 'bootstrap/dist/css/bootstrap.min.css';

interface IState{
  loading: boolean;
  links: ILink[];
  errorMsg: string;
}

const Links: React.FC = () => {
  const navigation = useNavigate();
  const [event, setEvent] = useState(false);//МОЖЕТ ПОПРОБОВАТЬ ДРУГОЙ ВИД const [, toogle] = useState()
  const [state, setState] = useState<IState>({
    loading: false,
    links:[] as ILink[],
    errorMsg: ''
  });

  useEffect(() => {
    setState({...state, loading:true});
    UrlService.getLinks()
    .then(response => setState({...state, loading:false, links:response.data}))
    .catch(error => console.log({...state, loading:false, errorMsg:error.message}));
      
  },[event]);

  const {loading, links, errorMsg} = state;


  const deleteLink = (id:number) => {

    const isConfirm:boolean = window.confirm("Do you want to delete this entry?");

    if(isConfirm){
      UrlService.deleteLink(id)
      .then(response => {response.data ? setEvent(!event) : alert("Delete is unsuccessful.")})
      .catch(error => console.log(error.message));
    }
  }

  const redirectToEditLink = (id:number) => {
    navigation(`/edit-link/${id}`);
  }

  return (
    <div className='container'>
        <Link to='/create-link' className='btn btn-primary my-2'>Create new link</Link>
        <table className='table'>
            <thead className='thead-dark table-info'>
                <tr>
                    <th>Long url</th>
                    <th>Shor url</th>
                    <th>Date create</th>
                    <th>Count of click</th>
                    <th></th>
                </tr>
            </thead>
            <tbody className='body-table'>
            {links.length > 0 && links.map(link =>(
                <tr key={link.id}>
                    <td>{link.longUrl}</td>
                    <td>{link.shortUrl}</td>
                    <td>{new Date(link.dateCreate).toLocaleDateString()}</td>
                    <td>{link.countClick}</td>
                    <td className='td-buttons'>
                        <button className='btn btn-warning mx-1 my-1' onClick={() => redirectToEditLink(link.id)}>Edit</button>
                        <button className='btn btn-danger mx-1 my-1' onClick={() => deleteLink(link.id)}>Delete</button>
                        
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}

export default Links;