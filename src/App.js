import GlobalStyles from "./Global/Styles/GlobalStyles";
import Login from "./pages/Login/login.js";
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from "./routes/routes.js";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;