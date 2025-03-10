export const normalize = (text?: string) => {
	// Referencia https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/normalize#par%C3%A2metros
	return (text || '')
		?.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
};
