import { db } from '$lib/server/db';
import { product, productImage } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const fetchOneProduct = async (id: string) => {
	const result = await db
		.select()
		.from(product)
		.where(eq(product.stripeId, id))
		.leftJoin(productImage, eq(product.stripeId, productImage.productId));

	if (result.length === 0) return null;

	const item = {
		stripeId: result[0].product.stripeId,
		price: result[0].product.price,
		name: result[0].product.name,
		desc: result[0].product.desc,
		images: result.map((res) => {
			return {
				cloudinaryId: res.product_image?.cloudinaryId ?? ''
			};
		})
	};

	return item;
};

export const fetchAllProducts = async (take: number, skip: number) => {
	const result = await db
		.select()
		.from(product)
		.leftJoin(productImage, eq(product.stripeId, productImage.productId))
		.offset(skip)
		.limit(take);

	// collapse the results into the form of products
	const updatedResults: {
		stripeId: string;
		price: number;
		name: string;
		desc: string;
		images: {
			cloudinaryId: string;
		}[];
	}[] = [];
	if (result.length > 0) {
		let curId = result[0].product.stripeId;
		updatedResults.push({
			stripeId: result[0].product.stripeId,
			price: result[0].product.price,
			name: result[0].product.name,
			desc: result[0].product.desc,
			images: [
				{
					cloudinaryId: result[0].product_image?.cloudinaryId ?? ''
				}
			]
		});
		let curIdx = 0;
		for (let i = 1; i < result.length; i++) {
			const curResult = result[i];
			if (curId === curResult.product.stripeId) {
				updatedResults[curIdx].images.push({
					cloudinaryId: curResult.product_image?.cloudinaryId ?? ''
				});
			} else {
				updatedResults.push({
					stripeId: curResult.product.stripeId,
					price: curResult.product.price,
					name: curResult.product.name,
					desc: curResult.product.desc,
					images: [
						{
							cloudinaryId: curResult.product_image?.cloudinaryId ?? ''
						}
					]
				});
				curIdx += 1;
				curId = curResult.product.stripeId;
			}
		}
	}

	return updatedResults;
};
