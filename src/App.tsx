import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login } from './pages/login/login';
import { MediaRegisterPage } from './pages/media/register';
import { UserRegisterPage } from './pages/user/register';

import '@/style/style.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/user/register" element={<UserRegisterPage />} />
				<Route path="/media/register" element={<MediaRegisterPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
