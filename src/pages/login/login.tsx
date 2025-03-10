import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTitle } from '@/hooks/use-title';
import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';

export const Login = () => {
	const navigate = useNavigate();

	const [state, setState] = useState({
		email: '',
		password: '',
		remember: false,
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		new Backend()
			.login(state)
			.then((response) => {
				state.remember
					? // Salva a chave permanentemente no navegador
					  localStorage.setItem('token', response.access_token)
					: // Salva a chave enquanto a sessão durar
					  sessionStorage.setItem('token', response.access_token);

				navigate('/dashboard');
			})
			.catch((e) => {
				const message = e.status == '401' ? 'Usuário não encontrado' : 'Não foi possível realizar o login';
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

	const toggleRemember = () => {
		setState((state) => ({
			...state,
			remember: !state.remember,
		}));
	};

	useTitle('Login');

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="flex flex-col justify-center items-center gap-4 min-w-10/12">
				<ToastContainer />

				<Card>
					<CardHeader>
						<CardTitle>Fazer Login</CardTitle>
					</CardHeader>

					<CardContent>
						<form onSubmit={onSubmit}>
							<div className="flex flex-col gap-5">
								<div className="grid w-full items-center gap-2">
									<Label htmlFor="email">Email:</Label>

									<Input value={state.email} onChange={onChange} id="email" placeholder="joão@gmail.com" />
								</div>

								<div className="grid w-full items-center gap-2">
									<Label htmlFor="password">Senha:</Label>
									<Input value={state.password} onChange={onChange} id="password" type="password" />
								</div>

								<div className="flex align-middle justify-between gap-3">
									<div className="flex gap-3">
										<Checkbox
											checked={state.remember}
											onCheckedChange={toggleRemember}
											className="items-top flex space-x-2"
											id="remember"
										/>

										<label
											htmlFor="remember"
											className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										>
											Lembrar senha
										</label>
									</div>

									<Link to="/user/forgot-password" className="underline">
										Esqueci a senha
									</Link>
								</div>

								<div className="button">
									<Button
										disabled={!state.email.trim().length || !state.password.trim().length}
										className="cursor-pointer"
										type="submit"
									>
										Entrar
									</Button>
								</div>
							</div>
						</form>

						<div className="flex justify-center mt-6">
							<p>Não tem uma conta? &nbsp;</p>

							<Link to="/user/register" className="underline italic">
								Clique aqui
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
