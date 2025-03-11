import { useEffect, useState } from 'react';

import { Backend } from '@/lib/backend';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

export const CategoriesChart = () => {
	const [dataset, setDataset] = useState<Record<string, any>>([]);

	useEffect(() => {
		new Backend()
			.getCategoriesStats()
			.then((response) => setDataset(response))
			.catch((e) => {
				console.error(e);
			});
	}, []);

	const seriesData = Object.keys(dataset).map((key) => {
		return {
			category: key, // A chave será usada como categoria no eixo X
			movie: dataset[key].filmes ?? 0, // Verifica se existe "filmes", caso contrário, usa 0
			show: dataset[key].series ?? 0, // Verifica se existe "series", caso contrário, usa 0
		};
	});

	const chartConfig = {
		movie: {
			label: 'Filme',
			color: 'hsl(352, 83%, 91%)',
		},
		show: {
			label: 'Série',
			color: 'hsl(347, 77%, 50%)',
		},
	};

	return (
		<Card className="py-6 pt-2">
			<CardHeader className="flex items-center relative">
				<CardTitle style={{ height: 36, lineHeight: '36px' }}>Categoria mais assistidas</CardTitle>
			</CardHeader>

			<ChartContainer config={chartConfig} className="pr-7 w-full">
				<BarChart accessibilityLayer data={seriesData}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="category"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						// tickFormatter={(value) => value.slice(0, 3)}
					/>

					<YAxis />
					<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
					<Bar dataKey="show" id="show" fill="var(--color-show)" radius={4} />
					<Bar dataKey="movie" id="movie" fill="var(--color-movie)" radius={4} />
				</BarChart>
			</ChartContainer>
		</Card>
	);
};
