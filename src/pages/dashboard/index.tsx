import { Header } from '@/components/header';
import { useTitle } from '@/hooks/use-title';
import { HoursChart } from './hours-chart';

export const DashboardPage = () => {
	useTitle('Dashboard');

	return (
		<div>
			<Header title="Estatísticas" />

			<div className="grid grid-cols-3 p-6">
				<HoursChart />
			</div>
		</div>
	);
};
