import { Calendar, Clapperboard, Drama, Pencil, Slash, Trash2 } from 'lucide-react';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Media } from '@/type/media.type';

export type MediaCardAttr = {
	media: Media;
	onEdit: VoidFunction;
	onDelete: VoidFunction;
};

export const MediaCard = ({ media, onEdit, onDelete }: MediaCardAttr) => {
	return (
		<Card>
			<CardContent className="flex">
				<div className="flex-11/12">
					<h1 className="font-bold">{media.title}</h1>

					<span className="flex mt-2" style={{ fontSize: '13px' }}>
						<Calendar className="mr-2" size="16px" height="20px" />
						<span style={{ height: '20px' }}>{new Date(media.date)?.toLocaleDateString('pt-Br')}</span>
					</span>

					<div className="mt-2">
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem>
									<Clapperboard size="16px" />
									{media.type}
								</BreadcrumbItem>

								<BreadcrumbSeparator>
									<Slash />
								</BreadcrumbSeparator>

								<BreadcrumbItem>
									<Drama size="16px" />
									{media.category?.name}
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</div>

				<div className="flex gap-3">
					<div>
						<Button variant="destructive" onClick={onDelete} size="icon">
							<Trash2 />
						</Button>
					</div>

					<div>
						<Button onClick={onEdit} size="icon" variant="outline">
							<Pencil />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
