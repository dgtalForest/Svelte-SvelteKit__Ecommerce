import { db } from '$lib/server/db';
import { productImage } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { zfd } from 'zod-form-data';

export const load = async ({ params }) => {
	const images = await db
		.select()
		.from(productImage)
		.where(eq(productImage.productId, params.productId));

	return { images };
};

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			cloudinaryId: zfd.text()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db.delete(productImage).where(eq(productImage.cloudinaryId, res.data.cloudinaryId));

		return { success: true };
	},
	create: async ({ request, params }) => {
		const data = await request.formData();

		const schema = zfd.formData({
			cloudinaryId: zfd.text(),
			width: zfd.numeric(),
			height: zfd.numeric()
		});

		const res = schema.safeParse(data);

		if (!res.success) {
			error(400, res.error.name);
		}

		await db.insert(productImage).values({
			width: res.data.width,
			height: res.data.height,
			cloudinaryId: res.data.cloudinaryId,
			productId: params.productId
		});

		return { success: true };
	}
};
