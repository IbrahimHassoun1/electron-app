import { createRoot } from 'react-dom/client'
import './index.css'
import App from './ui/App'
import { Provider } from 'react-redux'
import store from './lib/redux/store'


createRoot(document.getElementById('root')).render(
      <Provider store={store}>
      <App />
      </Provider>
)
