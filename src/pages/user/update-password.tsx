import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Backend } from '@/lib/backend';

export const UserPasswordForm = () => {
	const [password, setPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');

	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');

	const navigate = useNavigate();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmation) {
			toast.warn('Senhas não correspondem');
			return;
		}

		if (!token) {
			toast.error('Não possui token');
			return;
		}

		new Backend()
			.updatePassword(token, password)
			.then(() => {
				toast.success('Senha atualizada', {
					onClose() {
						navigate('/login');
					},
				});
			})
			.catch((e) => {
				toast.error('Não foi possível alterar senha');
				console.error(e);
			});
	};

	return (
		<form onSubmit={onSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Senha</CardTitle>
					<CardDescription>Altere sua senha aqui. Após salvar você será desconectado.</CardDescription>
				</CardHeader>

				<CardContent className="space-y-2">
					<div className="grid w-full items-center gap-2">
						<Label htmlFor="password">Nova senha</Label>

						<Input
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							minLength={8}
							required
						/>
					</div>

					<div className="grid w-full items-center gap-2">
						<Label htmlFor="confirmation">Confirmar senha</Label>
						<Input
							id="confirmation"
							value={confirmation}
							onChange={(e) => setConfirmation(e.target.value)}
							type="password"
							minLength={8}
							required
						/>
					</div>
				</CardContent>

				<CardFooter>
					<Button type="submit">Salvar</Button>
				</CardFooter>
			</Card>
		</form>
	);
};
