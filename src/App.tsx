import { RouterProvider } from 'react-router-dom';
import { router } from './routes.ts'
import Provider from './store/provider/index.tsx';

function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App;
