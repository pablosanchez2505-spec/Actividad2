import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import type { ClientInput } from '../interfaces/Client';
import { getClient, updateClient } from '../services/ClientsService';

const EditClientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<ClientInput | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setErrorMessage('No se indicó el identificador del cliente.');
      return;
    }

    let isCurrent = true;
    getClient(id)
      .then(({ name, email, phone }) => {
        if (isCurrent) {
          setClient({ name, email, phone });
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setErrorMessage(
            error instanceof Error ? error.message : 'No se pudo cargar el cliente.',
          );
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) {
      return;
    }

    setErrorMessage('');
    setIsSaving(true);
    const formData = new FormData(event.currentTarget);
    const updatedClient: ClientInput = {
      name: String(formData.get('name')).trim(),
      email: String(formData.get('email')).trim(),
      phone: String(formData.get('phone')).trim() || null,
    };

    try {
      await updateClient(id, updatedClient);
      navigate('/clients');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo actualizar el cliente.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar cliente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="container">
          <h1 className="h3 mb-3">Editar cliente</h1>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {!client && !errorMessage ? (
            <p role="status">Cargando cliente...</p>
          ) : client ? (
            <form onSubmit={handleSubmit} className="vstack gap-3">
              <div>
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  defaultValue={client.name}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  defaultValue={client.email}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  defaultValue={client.phone ?? ''}
                />
              </div>
              <div>
                <IonButton type="submit" disabled={isSaving}>
                  {isSaving ? 'Guardando...' : 'Guardar cambios'}
                </IonButton>
                <IonButton fill="clear" routerLink="/clients">
                  Cancelar
                </IonButton>
              </div>
            </form>
          ) : null}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EditClientPage;
