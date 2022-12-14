import React from 'react';
import {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import '../styles/App.css';
import TableLinks from './TableLinks';
import PostCreateForm from './PostCreateForm';
import PutUpdateForm from './PutUpdateForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TableLinks/>} />
      <Route path="/create-link" element={<PostCreateForm/>} />
      <Route path="/edit-link/:id" element={<PutUpdateForm/>} />
    </Routes>
  );
}

export default App;
