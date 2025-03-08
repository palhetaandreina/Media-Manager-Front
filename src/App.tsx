import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login/login';
import { UserRegister } from './pages/user/register';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/user/register" element={<UserRegister />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
