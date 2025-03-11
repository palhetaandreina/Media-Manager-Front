import { Header } from '@/components/header';
import { useTitle } from '@/hooks/use-title';
import { CategoriesChart } from './categories-chart';
import { HoursChart } from './hours-chart';

export const DashboardPage = () => {
	useTitle('Dashboard');

	return (
		<div>
			<Header title="Estatísticas" />

			<div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-cols-5 p-6 gap-6">
				<HoursChart />

				<CategoriesChart />
			</div>
		</div>
	);
};
