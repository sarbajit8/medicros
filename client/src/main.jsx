import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from'react-router-dom'
import { Provider } from'react-redux';
import store from './store/store.js'
import { Toaster } from './components/ui/toaster'
import { ClerkProvider } from '@clerk/clerk-react'
import './i18n.js'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
<BrowserRouter>
 <Provider store={store}>
 <App />
 <Toaster/>
 </Provider>
 </BrowserRouter>

    </ClerkProvider>

    
  
)
