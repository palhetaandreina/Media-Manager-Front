import { Link } from 'react-router-dom';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import '@/style/style.css';

export const LoginPage = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-4">
			<div className="flex flex-col justify-center items-center gap-4 min-w-10/12">
				<div>
					<h2 className="text-4xl">Fazer Login</h2>
				</div>

				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="email" className="text-lg">
						Email:
					</Label>
					<Input placeholder="joão@gmail.com" />
				</div>

				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="password" className="text-lg">
						Senha:
					</Label>
					<Input type="password" />
				</div>

				<div className="checkbox">
					<Checkbox className="items-top flex space-x-2" id="terms" />
					<label
						htmlFor="terms"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Lembrar senha
					</label>
				</div>

				<div className="button">
					<Button>Entrar</Button>
				</div>

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<p>Não tem uma conta? &nbsp;</p>{' '}
					<Link to="/" className="underline italic">
						Clique aqui
					</Link>
				</div>
			</div>
		</div>
	);
};
