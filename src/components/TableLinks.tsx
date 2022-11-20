import React from 'react';
import {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ILink } from '../modules/ILink';
import { UrlService } from '../services/UrlService';
import '../styles/Links.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { IResponse } from '../modules/IResponse';

interface IState<ILink>{
  loading: boolean;
  response: IResponse<ILink[]>;
  errorMsg: string;
}

const TableLinks: React.FC = () => {
  const navigation = useNavigate();
  const [event, setEvent] = useState(false);
  const [state, setState] = useState({
    loading: false,
    response:{} as IResponse<ILink[]>,
    errorMsg: ''
  });

  useEffect(() => {
    setState({...state, loading:true});
    UrlService.getLinks()
    .then(response => {setState({...state, loading:false, response:response.data});})
    .catch(error => console.log({...state, loading:false, errorMsg:error.message}));
      
  },[event]);

  const {loading, response, errorMsg} = state;

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
            {response.data != null && response.data.length > 0 && response.data?.map(link =>(
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

export default TableLinks;
