import { useState } from 'react';

import { FileDown } from 'lucide-react';

import { Backend } from '@/lib/backend';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const ExportFileMenu = () => {
	const [open, setOpen] = useState(false);

	const exportPDF = () => {
		new Backend()
			.downloadPDF()
			.then((response) => {
				// create file link in browser's memory
				const href = URL.createObjectURL(response.data);

				// create "a" HTML element with href to file & click
				const link = document.createElement('a');
				link.href = href;
				link.setAttribute('download', 'report.pdf'); //or any other extension
				document.body.appendChild(link);
				link.click();

				// clean up "a" element & remove ObjectURL
				document.body.removeChild(link);
				URL.revokeObjectURL(href);
			})
			.catch((e) => console.error(e.message));
	};

	return (
		// <div>
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="default">Exportar</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				{/* <DropdownMenuLabel>Exportar arquivo</DropdownMenuLabel> */}
				{/* <DropdownMenuSeparator /> */}

				<DropdownMenuGroup>
					<DropdownMenuItem onClick={exportPDF}>
						<FileDown color="red" />
						Baixar PDF
					</DropdownMenuItem>

					<DropdownMenuItem disabled>
						<FileDown color="yellow" />
						Baixar CSV
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
		// </div>
	);
};
