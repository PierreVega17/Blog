import 'setimmediate'; // Asegúrate de que esto sea lo primero que se importe

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StrictMode } from 'react'
import './main.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
                    <App />
    </StrictMode>
)
