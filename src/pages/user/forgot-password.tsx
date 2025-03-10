import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTitle } from '@/hooks/use-title';
import { Backend } from '@/lib/backend';
import { Link, useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');

	const navigate = useNavigate();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		new Backend()
			.sendResetPasswordEmail(email)
			.then((token) => {
				toast.success('Email de recuperação enviado', {
					autoClose: 2000,
					onClose() {
						navigate('/user/reset-password?token=' + token);
					},
				});
			})
			.catch((e) => {
				console.error(e.message);
				toast.error('Não foi possível enviar o email de recuperação');
			});
	};

	useTitle('Esqueci minha senha');

	return (
		<div className="flex flex-col items-center">
			<ToastContainer />

			<main className="flex p-6">
				<form onSubmit={onSubmit}>
					<Card>
						<CardHeader>
							<CardTitle>Recuperação de senha</CardTitle>
							<CardDescription>Clique em 'enviar email' para receber um email de recuperação de senha.</CardDescription>
						</CardHeader>

						<CardContent className="space-y-2">
							<div className="grid w-full items-center gap-2">
								<Label htmlFor="name">Email</Label>
								<Input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
							</div>
						</CardContent>

						<CardFooter className="flex justify-end gap-6">
							<Link to="/login">
								<Button variant="ghost" type="reset">
									Cancelar
								</Button>
							</Link>

							<Button disabled={!email.trim().length} type="submit">
								Enviar email
							</Button>
						</CardFooter>
					</Card>
				</form>
			</main>
		</div>
	);
};
