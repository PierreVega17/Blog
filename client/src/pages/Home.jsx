import { Link } from "react-router-dom";
import Particles from '../Backgrounds/Particles/Particles';
import DecryptedText from '../TextAnimations/DecryptedText/DecryptedText';
import { useState, useEffect } from "react";

export default function Home() {
  const [animate, setAnimate] = useState(true);

  // Configurar la animación para que se repita cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // Detener la animación
      setTimeout(() => setAnimate(true), 2000); // Reiniciar la animación después de 2 segundos
    }, 4000); // Duración total de la animación + pausa
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Fondo animado */}
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={350}
        particleSpread={25}
        speed={0.3}
        particleBaseSize={110}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1, // Fondo detrás del contenido
        }}
      />

      {/* Contenedor del texto y botones */}
      <div 
        style={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)', // Centrar horizontal y verticalmente
          zIndex: 2, // Asegura que esté encima del fondo
          textAlign: 'center',
        }}
      >
        {/* Texto principal */}
        <div style={{ marginBottom: '40px' }}>
          <DecryptedText
            text="Mi Blog"
            animateOn={animate ? "view" : "hover"} // Controla la animación
            revealDirection="start"
            style={{
              fontSize: '5rem', // Tamaño más grande para el título
              fontWeight: 'bold',
              color: '#ffffff', // Color blanco para resaltar
              textShadow: '0px 0px 10px rgba(255, 255, 255, 0.8)',
              cursor: 'default', // Efecto de brillo
            }}
          />
        </div>

        {/* Botones */}
        <div 
          className="auth-buttons" 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px', 
            alignItems: 'center', 
            flexWrap: 'wrap',
          }}
        >
          <Link 
            to="/login" 
            className="button" 
            style={{
              textDecoration: 'none', 
              padding: '15px 30px', 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              borderRadius: '5px', 
              fontSize: '1.5rem', // Tamaño de fuente más grande
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Sombra para resaltar
              transition: 'transform 0.2s ease', // Animación al pasar el mouse
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Iniciar Sesión
          </Link>
          <Link 
            to="/register" 
            className="button" 
            style={{
              textDecoration: 'none', 
              padding: '15px 30px', 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              borderRadius: '5px', 
              fontSize: '1.5rem', // Tamaño de fuente más grande
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Sombra para resaltar
              transition: 'transform 0.2s ease', // Animación al pasar el mouse
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}