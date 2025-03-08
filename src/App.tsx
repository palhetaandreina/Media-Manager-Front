import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/login/login';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
