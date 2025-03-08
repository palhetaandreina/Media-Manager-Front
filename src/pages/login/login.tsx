import { Link, useNavigate } from 'react-router-dom';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { Backend } from '@/lib/backend';
import { options } from '@/lib/toastify.ts/toastify.constants';
import '@/style/style.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

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

	useEffect(() => {
		const title = document.title;
		document.title = 'Login';

		return () => {
			document.title = title;
		};
	});

	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="flex flex-col justify-center items-center gap-4 min-w-10/12">
				<ToastContainer />
				<div>
					<h2 className="text-4xl">Fazer Login</h2>
				</div>

				<form onSubmit={onSubmit}>
					<div className="grid w-full items-center gap-1.5">
						<Label htmlFor="email" className="text-lg">
							Email:
						</Label>
						<Input value={state.email} onChange={onChange} id="email" placeholder="joão@gmail.com" />

						<Label htmlFor="password" className="text-lg">
							Senha:
						</Label>
						<Input value={state.password} onChange={onChange} id="password" type="password" />
					</div>

					<div className="checkbox" style={{ margin: '20px auto' }}>
						<Checkbox
							checked={state.remember}
							onCheckedChange={toggleRemember}
							className="items-top flex space-x-2"
							id="terms"
						/>
						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Lembrar senha
						</label>
					</div>

					<div className="button">
						<Button type="submit">Entrar</Button>
					</div>
				</form>

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<p>Não tem uma conta? &nbsp;</p>
					<Link to="/user/register" className="underline italic">
						Clique aqui
					</Link>
				</div>
			</div>
		</div>
	);
};
