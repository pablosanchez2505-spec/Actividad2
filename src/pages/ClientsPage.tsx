import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';

import NavBar from '../components/NavBar';
import type { Client } from '../interfaces/Client';
import { deleteClient, getClients } from '../services/ClientsService';

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadClients = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      setClients(await getClients());
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudieron cargar los clientes.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Quieres eliminar este cliente?')) {
      return;
    }

    try {
      await deleteClient(id);
      setClients((currentClients) => currentClients.filter((client) => client.id !== id));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo eliminar el cliente.',
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
        <NavBar />
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h3">Listado de clientes</h1>
            <IonButton routerLink="/clients/new">Nuevo cliente</IonButton>
          </div>

          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {isLoading ? (
            <p role="status">Cargando clientes...</p>
          ) : clients.length === 0 ? (
            <p>No hay clientes registrados.</p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone || '—'}</td>
                      <td className="text-nowrap">
                        <IonButton
                          fill="clear"
                          size="small"
                          routerLink={`/clients/${client.id}/edit`}
                        >
                          Editar
                        </IonButton>
                        <IonButton
                          color="danger"
                          fill="clear"
                          size="small"
                          onClick={() => void handleDelete(client.id)}
                        >
                          Eliminar
                        </IonButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClientsPage;
