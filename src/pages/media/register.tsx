import { ToastContainer } from 'react-toastify';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MediaForm } from './media-form';

export const MediaRegisterPage = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-10 min-w-10/12">
			<ToastContainer />

			<Card className="max-w-md">
				<CardHeader>
					<CardTitle>Adicionar mídia</CardTitle>
					<CardDescription>Insira os filmes/séries que já assistiu</CardDescription>
				</CardHeader>

				<CardContent>
					<MediaForm />
				</CardContent>
			</Card>
		</div>
	);
};
