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

type WeekChartData = { day: string; hours: number };

export const WeekChart = () => {
	const [dataset, setDateset] = useState<WeekChartData[]>([]);

	useEffect(() => {
		const from = dayjs().startOf('week').toDate();
		const to = dayjs().endOf('week').toDate();

		new Backend()
			.getHoursStats('day', from, to)
			.then((response) => {
				const data = [];

				const weekDay = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
				const map = new Map<string, number>(Object.entries(response));

				let aux = new Date(from);

				do {
					const key = dayjs(aux).format('YYYY-MM-DD');

					const minutes: number = map.has(key) ? map.get(key)! : 0;

					data.push({
						day: weekDay[aux.getDay()],
						hours: minutes / 60,
					});

					aux.setDate(aux.getDate() + 1);
				} while (aux.getTime() < to.getTime());

				setDateset(data);
			})
			.catch((e) => {
				console.error(e);
			});
	}, []);

	const chartConfig = {
		day: {
			label: 'Horas gastas',
			color: 'hsl(347, 77%, 50%)',
		},
	};

	return (
		<Card className="py-6 pt-2">
			<CardHeader className="flex items-center relative">
				<CardTitle style={{ height: 36, lineHeight: '36px' }}>Horas assistidas na seman</CardTitle>
			</CardHeader>

			<ChartContainer config={chartConfig} className="pr-7 w-full">
				<LineChart data={dataset}>
					<CartesianGrid vertical={false} />

					<XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />

					<YAxis />

					<ChartTooltip content={<ChartTooltipContent indicator="line" className="w-2" />} />
					<ChartLegend content={<ChartLegendContent />} />

					<Line dataKey="hours" type="linear" stroke="var(--color-day)" strokeWidth={2} dot />
				</LineChart>
			</ChartContainer>
		</Card>
	);
};
