import { Input } from '@/components/ui/input';
import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';
import { Category } from '@/type/category.type';
import { Media } from '@/type/media.type';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Label } from 'recharts';

export type MediaFormAttr = {
	media: Media;
	onSuccess?: (media: Media) => void;
	onFailure?: (media: Media, err: Error) => void;
};

export const defaultMedia = (media?: Record<string, any>): Media => {
	return {
		id: media?.id ?? undefined,
		type: media?.type ? 1 : 0,
		category: media?.category?.id ?? undefined,
		title: media?.title ?? '',
		duration: media?.duration ?? undefined,
		date: media?.date ?? new Date(),
	};
};

export const MediaForm = ({ media, onSuccess, onFailure }: MediaFormAttr) => {
	const [categories, setCategories] = useState<Category[]>([]);

	const [state, setState] = useState<Media>(media);

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
				onFailure && onFailure(media, e);
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

	return (
		<div className="flex flex-col justify-center items-center gap-10 min-w-10/12">
			<form onSubmit={onSubmit}>
				<div className="grid w-full items-center gap-1.5">
					<Label className="text-lg">Título</Label>
					<Input onChange={onChange} value={state.title} id="title" />

					<div className="flex justify-between">
						<div>
							<Label className="text-lg">Tipo</Label>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Selecione o tipo" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="apple">Apple</SelectItem>
										<SelectItem value="banana">Banana</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label className="text-lg">Categoria</Label>
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Selecione a categoria" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="apple">Apple</SelectItem>
										<SelectItem value="banana">Banana</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				<div className=" flex justify-between">
					<div>
						<Label className="text-lg">Duração</Label>
						<Input placeholder="min." />
					</div>

					<div>
						<Label className="text-lg">Data</Label>
						<Input type="date" />
					</div>
				</div>

				<div className="button"></div>
			</form>
		</div>
	);
};
