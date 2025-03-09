import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ToastContainer } from 'react-toastify';
import { MediaForm, defaultMedia } from './media-form';

export const MediaRegisterPage = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-10 min-w-10/12">
			<ToastContainer />
			<Card className="w-[420px]">
				<CardHeader>
					<CardTitle>Adicionar mídia</CardTitle>
					<CardDescription>Insira os filmes/séries que já assistiu</CardDescription>
				</CardHeader>
				<CardContent>
					<MediaForm media={defaultMedia()} />
				</CardContent>
			</Card>
		</div>
	);
};
