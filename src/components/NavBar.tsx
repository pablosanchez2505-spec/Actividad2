import { IonButton, IonButtons, IonToolbar } from '@ionic/react';
import { useLocation } from 'react-router-dom';

const links = [
  { path: '/clients', label: 'Ver clientes' },
  { path: '/clients/new', label: 'Añadir clientes' },
  { path: '/about', label: 'About' },
];

const NavBar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <IonToolbar color="primary">
      <IonButtons slot="start">
        {links.map(({ path, label }) => (
          <IonButton
            key={path}
            routerLink={path}
            fill={pathname === path ? 'solid' : 'clear'}
            color={pathname === path ? 'light' : undefined}
          >
            {label}
          </IonButton>
        ))}
      </IonButtons>
    </IonToolbar>
  );
};

export default NavBar;
