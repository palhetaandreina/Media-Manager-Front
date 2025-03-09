import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';
import { User } from '@/type/user.type';

export const UserRegisterPage = () => {
	const navigate = useNavigate();

	const [state, setState] = useState<User>({
		name: '',
		email: '',
		password: '',
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		new Backend()
			.updateUser(state)
			.then(() => {
				const message = 'Usuário cadastrado com sucesso!';

				toast.success(message, {
					onClose: () => navigate('/login'),
					...options,
				});
			})
			.catch((e) => {
				const message = e.status === 400 ? e?.response?.data?.message?.at(0) : 'Não foi possível cadastrar o usuário';

				toast.error(message, options);
			});
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// target = elemento que causou o evento

		setState((state) => ({
			...state,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className="flex flex-col justify-center items-center gap-10 min-w-10/12">
			<ToastContainer />
			<h2 className="text-4xl">Criar Conta</h2>

			<form onSubmit={onSubmit}>
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="name" className="text-lg">
						Nome
					</Label>
					<Input value={state.name} onChange={onChange} id="name" />

					<Label htmlFor="email" className="text-lg">
						Email
					</Label>
					<Input id="email" value={state.email} onChange={onChange} placeholder="joão@gmail.com" />

					<Label htmlFor="password" className="text-lg">
						Senha
					</Label>
					<Input id="password" value={state.password} onChange={onChange} type="password" />

					<Label htmlFor="password" className="text-lg">
						Confirmar senha
					</Label>
					<Input type="password" />
				</div>

				<div className="button" style={{ marginTop: '22px' }}>
					<Button type="submit" className="cursor-pointer">
						REGISTRAR
					</Button>
				</div>
			</form>
		</div>
	);
};
