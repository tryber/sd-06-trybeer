import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarAdmin from '../../../design-components/SideBarAdmin';
import Loader from '../../../design-components/Loader';
import DetailAdminCard from './components/DetailAdminCard';
import ButtonDelivered from './components/ButtonDelivered';

const styling = 'text-sm md:text-base lg:text-lg text-green-500';

function AdminOrderDetail() {
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState({});
  const [status, setStatus] = useState('');

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/sales/${id}`)
      .then((response) => {
        console.log(response.data);
        setSale(response.data);
        setStatus(response.data[0].status);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [id]);

  const handleClick = () => {
    axios.put(`http://localhost:3001/sales/${id}`)
      .then(() => {
        setStatus('Entregue');
        document.getElementById('deliver-button').style.display = 'none';
      })
      .catch((err) => console.log(err.message));
  };

  return (
    loading ? <Loader /> : (
      <div>
        <SideBarAdmin />
        <DetailAdminCard sale={ sale } status={ status } />
        <div
          className="flex justify-center"
        >
          {(status === 'Entregue')
            ? <span className={ styling }>Pedido Entregue!</span>
            : <ButtonDelivered handleClick={ handleClick } />}
        </div>
      </div>
    )
  );
}

export default AdminOrderDetail;
