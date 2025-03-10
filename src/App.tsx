import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HistoryPage } from './pages/history';
import { Login } from './pages/login/login';
import { MediaRegisterPage } from './pages/media/register';
import { UserRegisterPage } from './pages/user/register';
import { UpdateUser } from './pages/user/update-user';

import '@/style/style.css';
import { ForgotPasswordPage } from './pages/user/forgot-password';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/user/register" element={<UserRegisterPage />} />
				<Route path="/media/register" element={<MediaRegisterPage />} />
				<Route path="/media/history" element={<HistoryPage />} />
				<Route path="/user/update" element={<UpdateUser tab="account" />} />
				<Route path="/user/reset-password" element={<UpdateUser tab="password" />} />
				<Route path="/user/forgot-password" element={<ForgotPasswordPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
