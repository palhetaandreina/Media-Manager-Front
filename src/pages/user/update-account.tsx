import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';
import { User } from '@/type/user.type';

export const UserAccountForm = () => {
	const [user, setUser] = useState<User>();

	const onSubmitAccount = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!user) {
			return;
		}

		new Backend()
			.updateUser(user)
			.then(() => {
				const message = 'Informações de usuário atualizada com sucesso';
				toast.success(message, options);
			})
			.catch((e) => {
				const message = e.status === 400 ? e.response.data.message.at(0) : 'Não foi possível atualizar mídia';
				toast.error(message, options);
			});
	};

	useEffect(() => {
		new Backend().getUser().then((response) => {
			setUser({
				id: response.id,
				name: response.name,
				email: response.email,
			});
		});
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(
			(user) =>
				({
					...user,
					[e.target.id]: e.target.value,
				} as User)
		);
	};

	return (
		<form onSubmit={onSubmitAccount}>
			<Card>
				<CardHeader>
					<CardTitle>Email</CardTitle>
					<CardDescription>Faça suas alterações de email aqui. Clique em 'salvar' quando terminar.</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2">
					<div className="grid w-full items-center gap-2">
						<Label htmlFor="name">Nome</Label>
						<Input id="name" onChange={onChange} value={user?.name} />
					</div>

					<div className="grid w-full items-center gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" onChange={onChange} value={user?.email} />
					</div>
				</CardContent>

				<CardFooter>
					<Button type="submit">Salvar alterações</Button>
				</CardFooter>
			</Card>
		</form>
	);
};
