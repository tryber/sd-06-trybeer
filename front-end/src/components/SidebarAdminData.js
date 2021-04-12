import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';

const SidebarAdminData = [
  {
    label: 'Pedidos',
    path: '/admin/orders',
    icon: <FaIcons.FaCartPlus />,
    id: 'side-menu-item-orders',
  },
  {
    label: 'Meu Perfil',
    path: '/admin/profile',
    icon: <ImIcons.ImProfile />,
    id: 'side-menu-item-profile',
  },
  {
    label: 'Sair',
    path: '/login',
    icon: <AiIcons.AiOutlineLogout />,
    id: 'side-menu-item-logout',
  },
];

export default SidebarAdminData;
