import { ToastContainer } from 'react-toastify';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTitle } from '@/hooks/use-title';
import { User } from '@/type/user.type';
import { UserAccountForm } from './update-account';
import { UserPasswordForm } from './update-password';

export const defaultUser = (user?: User): User => {
	return {
		id: undefined,
		email: user?.email ?? '',
		name: user?.name ?? '',
		password: '',
	};
};

export const UpdateUser = ({ tab = 'account' }: { tab: 'account' | 'password' }) => {
	useTitle('Perfil');

	return (
		<div className="flex flex-col items-center">
			<ToastContainer />

			<main className="flex p-6">
				<Tabs defaultValue={tab} className="w-[400px]">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="account">Editar conta</TabsTrigger>
						<TabsTrigger value="password">Editar senha</TabsTrigger>
					</TabsList>

					<TabsContent value="account">
						<UserAccountForm />
					</TabsContent>

					<TabsContent value="password">
						<UserPasswordForm />
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
};
