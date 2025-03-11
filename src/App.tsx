import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { HistoryPage } from './pages/history';
import { Login } from './pages/login/login';
import { UserRegisterPage } from './pages/user/register';
import { UpdateUser } from './pages/user/update-user';

import '@/style/style.css';
import { DashboardPage } from './pages/dashboard';
import { ForgotPasswordPage } from './pages/user/forgot-password';

type PrivateRouteProps = {
	children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const token = sessionStorage.getItem('token') || localStorage.getItem('token');

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/user/register" element={<UserRegisterPage />} />
				<Route
					path="/media/history"
					element={
						<PrivateRoute>
							<HistoryPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/user/update"
					element={
						<PrivateRoute>
							<UpdateUser tab="account" />
						</PrivateRoute>
					}
				/>
				<Route path="/user/reset-password" element={<UpdateUser tab="password" />} />
				<Route path="/user/forgot-password" element={<ForgotPasswordPage />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<DashboardPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
