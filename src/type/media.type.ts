export type Media = {
	id?: number;
	type: 'Filme' | 'Série';
	category: {
		id: number;
		name: string;
	} | null;
	title: string;
	duration: number;
	date: Date;
};
