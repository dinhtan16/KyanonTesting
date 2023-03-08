import { Route, Routes } from 'react-router-dom';
import './App.css';
import routes from './routes/routes';

function App() {
  return (
    <Routes>
    {
      routes.map((item,index) => {
        const Page = item.component
        return <Route key={index} path={item.path} element={<Page />}> </Route>
      }) 
    }
    </Routes>
  );
}

export default App;
