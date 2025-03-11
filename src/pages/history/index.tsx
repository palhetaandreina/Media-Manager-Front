import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Backend } from '@/lib/backend';
import { normalize } from '@/lib/search-filter';
import { Media } from '@/type/media.type';
import { DeleteMediaConfirmation } from '../media/delete-media-confirmation';
import { MediaCard } from '../media/media-card';
import { defaultMedia } from '../media/media-form';
import { MediaFormContainer } from '../media/media-form-container';

import { ExportFileMenu } from '@/components/dropdown-menu';
import { useTitle } from '@/hooks/use-title';
import '@/style/style.css';

export const HistoryPage = () => {
	const [history, setHistory] = useState<Media[]>([]);

	const [media, setMedia] = useState<Media | undefined>();
	const [deletingMedia, setDeletingMedia] = useState<Media | undefined>();

	const [search, setSearch] = useState('');

	const refresh = () => {
		new Backend()
			.getMedias()
			.then((response) => setHistory(response))
			.catch((e) => {
				toast.error('Não foi possível buscar mídias');
				console.error(e);
			});
	};

	const onFormCancel = (modified: boolean) => {
		setMedia(undefined);
		modified && refresh();
	};

	const onDeletingCancel = (modified: boolean) => {
		setDeletingMedia(undefined);
		modified && refresh();
	};

	useEffect(() => refresh(), []);

	const filtered = history.filter((media) => {
		const normSearch = normalize(search.trim());

		return normalize(media.title).includes(normSearch) || normalize(media.category?.name).includes(normSearch);
	});

	const NoResult = () => {
		if (!history.length) {
			return <p>Nenhuma mídia encontrada.</p>;
		}

		if (!filtered.length) {
			return <p>Nenhuma mídia corresponde a busca.</p>;
		}

		return null;
	};

	useTitle('Histórico');

	return (
		<div>
			<ToastContainer />

			<Header title="Histórico" />

			<div className="flex flex-row p-6 justify-between gap-3">
				<Input
					placeholder="Busque pelo título ou categoria..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>

				<Button className="cursor-pointer" onClick={() => setMedia(defaultMedia())}>
					Adicionar
				</Button>

				<ExportFileMenu />
			</div>

			<div className="flex flex-col p-6 gap-3">
				{filtered.map((media) => (
					<MediaCard
						key={media.id!}
						media={media}
						onEdit={() => setMedia(media)}
						onDelete={() => setDeletingMedia(media)}
					/>
				))}

				<NoResult />
			</div>

			{media != undefined ? <MediaFormContainer media={media} onClose={onFormCancel} /> : null}

			{deletingMedia != undefined ? <DeleteMediaConfirmation media={deletingMedia} onClose={onDeletingCancel} /> : null}
		</div>
	);
};
