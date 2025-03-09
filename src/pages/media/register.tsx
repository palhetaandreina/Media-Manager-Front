import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToastContainer } from 'react-toastify';

export const MediaRegisterPage = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-10 min-w-10/12">
			<ToastContainer />
			<Card className="w-[420px]">
				<CardHeader>
					<CardTitle>Adicionar mídia</CardTitle>
					<CardDescription>Insira os filmes/séries que já assistiu</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-1.5">
							<Label className="text-lg">Título</Label>
							<Input />

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
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button className="cursor-pointer" type="submit">
						adicionar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
