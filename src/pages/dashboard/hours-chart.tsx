import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
			color: 'hsl(347, 77%, 50%)',
		},
	};

	return (
		<Card className="py-6 pt-2">
			<CardHeader className="flex items-center relative">
				<CardTitle style={{ height: 36, lineHeight: '36px' }}>Total de horas assistidas</CardTitle>
			</CardHeader>

			<ChartContainer config={chartConfig} className="pr-7 w-full">
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

					<Line dataKey="hours" type="linear" stroke="var(--color-hours)" strokeWidth={2} dot />
				</LineChart>
			</ChartContainer>
		</Card>
	);
};
