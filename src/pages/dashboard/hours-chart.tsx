import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Backend } from '@/lib/backend';

type HoursChartData = { month: string; hours: number };

export const HoursChart = () => {
	const [dataset, setDateset] = useState<HoursChartData[]>([]);

	useEffect(() => {
		const from = dayjs().startOf('year').toDate();
		const to = dayjs().endOf('year').toDate();

		new Backend()
			.getHoursStats('month', from, to)
			.then((response) => {
				const data = [];

				const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
				const map = new Map<string, number>(Object.entries(response));

				let aux = new Date(from);
				let i = 0;

				do {
					const key = aux.toISOString().slice(0, 7);

					const minutes: number = map.has(key) ? map.get(key)! : 0;

					data.push({
						month: months[aux.getMonth()],
						hours: minutes / 60,
					});

					aux.setMonth(aux.getMonth() + 1);
				} while (aux.getTime() < to.getTime());

				setDateset(data);
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);

	const chartConfig = {
		hours: {
			label: 'Horas gastas',
			color: '#60a5fa',
		},
	};

	console.log(dataset);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-col items-center">Total de horas assistidas</CardTitle>
			</CardHeader>

			<CardContent>
				<ChartContainer config={chartConfig} className="min-h-[200px] pr-7 w-full">
					<LineChart data={dataset}>
						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>

						<YAxis />

						<ChartTooltip content={<ChartTooltipContent indicator="line" className="w-2" />} />
						<ChartLegend content={<ChartLegendContent />} />

						<Line dataKey="hours" type="linear" stroke="var(--color-hours)" strokeWidth={2} dot={true} />
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
};
