import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Header = ({ title }: { title: string }) => {
	return (
		<header className="flex min-h-16 pl-6 pr-6 items-center justify-center shadow-md">
			<h1 style={{ flex: 1, fontSize: 18 }}>{title}</h1>

			<div className="flex">
				<Link to="/dashboard">
					<Button variant="link">Dashboard</Button>
				</Link>

				<Link to="/media/history">
					<Button variant="link">Histórico</Button>
				</Link>

				<Link to="/login">
					<Button variant="link">Sair</Button>
				</Link>
			</div>
		</header>
	);
};
