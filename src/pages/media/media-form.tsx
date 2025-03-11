import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';
import { Category } from '@/type/category.type';
import { MediaDTO } from '@/type/media-dto.type';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Media } from '@/type/media.type';

export type MediaFormAttr = {
	media?: Media;
	onSuccess?: (media: Media) => void;
	onFailure?: (media: Media, err: Error) => void;
};

export const toDTO = (media?: Media): MediaDTO => {
	return {
		id: media?.id ?? undefined,
		type: media?.type ? 1 : 0,
		category: media?.category?.id ?? 0,
		title: media?.title ?? '',
		duration: media?.duration ?? 0,
		date: media?.date ?? new Date(),
	};
};

export const defaultMedia = (): Media => {
	return {
		type: 'Filme',
		category: null,
		title: '',
		duration: 0,
		date: new Date(),
	};
};

export const MediaForm = ({ media, onSuccess, onFailure }: MediaFormAttr) => {
	const [categories, setCategories] = useState<Category[]>([]);

	const [state, setState] = useState<MediaDTO>(toDTO(media));

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		new Backend()
			.updateMedia(state)
			.then((response) => {
				const message = 'Mídia cadastrada com sucesso';

				toast.success(message, options);

				const media = {
					...response,
					user: response?.user.id,
					category: response?.category.id,
				};

				onSuccess && onSuccess(media);
			})
			.catch((e) => {
				const message = e.status === 400 ? e?.response?.data?.message?.at(0) : 'Não foi possível cadastrar mídia';

				toast.error(message, options);
				onFailure && onFailure(media!, e);
			});
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// target = elemento que causou o evento

		setState((state) => ({
			...state,
			[e.target.id]: e.target.value,
		}));
	};

	useEffect(() => {
		new Backend()
			.getCategories()
			.then((categories) => setCategories(categories))
			.catch((e) => {
				toast.error('Não foi possível listar as categorias', options);
				console.error(e.message);
			});
	}, []);

	const onCancel = () => onSuccess && onSuccess(media!);

	return (
		<form onSubmit={onSubmit} className="w-full">
			<div className="flex flex-col justify-center items-center gap-3 min-w-10/12">
				<div className="grid w-full items-center gap-3">
					<Label className="text-left font-semibold">Título</Label>
					<Input onChange={onChange} value={state.title} id="title" />
				</div>

				<div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="grid w-full items-center gap-3">
						<Label className="text-left font-semibold">Tipo</Label>

						<Select
							value={String(state.type)}
							onValueChange={(value) => setState((state) => ({ ...state, type: Number(value) }))}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selecione a categoria" />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup>
									<SelectItem value={String(1)}>Série</SelectItem>
									<SelectItem value={String(0)}>Filme</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="grid w-full items-center gap-3">
						<Label className="text-left font-semibold">Categoria</Label>

						<Select
							value={String(state.category)}
							onValueChange={(value) => setState((state) => ({ ...state, category: Number(value) }))}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selecione o tipo" />
							</SelectTrigger>

							<SelectContent>
								<SelectGroup className="max-h-24">
									{categories.map((category) => {
										return <SelectItem value={String(category.id)}>{category.name}</SelectItem>;
									})}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className="grid w-full xs:grid-cols-1 sm:grid-cols-2 gap-3">
					<div className="grid w-full items-center gap-3">
						<Label className="text-left font-semibold">Duração</Label>
						<Input value={state.duration} onChange={onChange} id="duration" placeholder="min." />
					</div>

					<div className="grid w-full items-center gap-3">
						<Label className="text-left font-semibold">Data</Label>
						<Input value={String(state.date)} onChange={onChange} id="date" type="date" />
					</div>
				</div>

				<div className="w-full flex justify-end mt-6 gap-3">
					<Button className="cursor-pointer" variant="ghost" type="reset" onClick={onCancel}>
						Cancelar
					</Button>

					<Button className="cursor-pointer" type="submit">
						Confirmar
					</Button>
				</div>
			</div>
		</form>
	);
};
