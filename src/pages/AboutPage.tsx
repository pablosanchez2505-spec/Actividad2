import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import NavBar from '../components/NavBar';

const AboutPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>About</IonTitle>
      </IonToolbar>
      <NavBar />
    </IonHeader>
    <IonContent className="ion-padding">
      <div className="container">
        <h1 className="h3 mb-3">Sobre el proyecto</h1>
        <p>
          Esta aplicación es un gestor de clientes desarrollado con React, Ionic y TypeScript. Se
          conecta a una base de datos PostgreSQL alojada en Supabase, desde donde lee y escribe
          los datos de la tabla <code>clients</code>. Permite consultar el listado de clientes,
          añadir nuevos, editarlos y eliminarlos. El código está en GitHub y el despliegue se hace
          en Vercel con las claves de Supabase como variables de entorno.
        </p>

        <img
          src="/about.webp"
          alt="Ilustración del proyecto de gestión de clientes"
          className="img-fluid rounded mb-4"
          style={{ maxWidth: 480 }}
        />

        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.youtube.com/embed/SqcY0GlETPk"
            title="Vídeo de YouTube sobre React"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </IonContent>
  </IonPage>
);

export default AboutPage;
