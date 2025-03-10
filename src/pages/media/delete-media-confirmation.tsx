import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';
import { Media } from '@/type/media.type';

export type DeleteMediaConfirmationAttr = {
	onClose: (modified: boolean) => void;
	media: Media;
};

export const DeleteMediaConfirmation = ({ onClose, media }: DeleteMediaConfirmationAttr) => {
	const onConfirm = () => {
		new Backend()
			.deleteMedia(media.id!)
			.then(() => toast.success('Mídia deletada com sucesso', options))
			.catch((e) => {
				console.error(e.message);
				toast.error('Não foi possível deletar mídia', options);
			})
			.finally(() => onClose(true));
	};

	const onOpenChange = (open: boolean) => {
		!open && onClose(false);
	};

	return (
		<Dialog open onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Excluir midia</DialogTitle>
				</DialogHeader>

				<DialogDescription className="max-w-md">
					Tem certeza que deseja excluir {media.type}: <strong>{media.title}</strong>?
				</DialogDescription>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="ghost" type="button">
							Cancelar
						</Button>
					</DialogClose>

					<Button variant="destructive" onClick={onConfirm}>
						Excluir
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
