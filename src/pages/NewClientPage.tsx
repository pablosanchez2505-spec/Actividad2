import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ClientInput } from '../interfaces/Client';
import { createClient } from '../services/ClientsService';

const NewClientPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const client: ClientInput = {
      name: String(formData.get('name')).trim(),
      email: String(formData.get('email')).trim(),
      phone: String(formData.get('phone')).trim() || null,
    };

    try {
      await createClient(client);
      navigate('/clients');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'No se pudo guardar el cliente.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo cliente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="container">
          <h1 className="h3 mb-3">Crear cliente</h1>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit} className="vstack gap-3">
            <div>
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input id="name" name="name" className="form-control" required />
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
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input id="phone" name="phone" type="tel" className="form-control" />
            </div>
            <div>
              <IonButton type="submit" disabled={isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar'}
              </IonButton>
              <IonButton fill="clear" routerLink="/clients">
                Cancelar
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewClientPage;
