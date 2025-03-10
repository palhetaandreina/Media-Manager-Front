import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Media } from '@/type/media.type';
import { MediaForm } from './media-form';

export type MediaFormContainerAttr = {
	onClose: (modified: boolean) => void;
	media: Media;
};

export const MediaFormContainer = ({ onClose, media }: MediaFormContainerAttr) => {
	const onOpenChange = (open: boolean) => {
		!open && onClose(false);
	};

	const modalTitle = media?.id != undefined ? 'Editar mídia' : 'Adicionar mídia';

	return (
		<Dialog open onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{modalTitle}</DialogTitle>
				</DialogHeader>

				<MediaForm onSuccess={() => onClose(true)} onFailure={() => onClose(false)} media={media} />
			</DialogContent>
		</Dialog>
	);
};
