import { z } from "zod";
/*
    Hela Zod för Product:

    const schema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    discountPercentage: z.number().optional(),
    rating: z.number().optional(),
    stock: z.number().optional(),
    tags: z.array(z.string()).optional(),
    brand: z.string().optional(),
    sku: z.string().optional(),
    weight: z.number().optional(),
    dimensions: z
        .object({
        width: z.number(),
        height: z.number(),
        depth: z.number()
        })
        .optional(),
    warrantyInformation: z.string().optional(),
    shippingInformation: z.string().optional(),
    availabilityStatus: z.string().optional(),
    reviews: z
        .array(
        z.object({
            rating: z.number(),
            comment: z.string(),
            date: z.string(),
            reviewerName: z.string(),
            reviewerEmail: z.string()
        })
        )
        .optional(),
    returnPolicy: z.string().optional(),
    minimumOrderQuantity: z.number().optional(),
    meta: z
        .object({
        createdAt: z.string(),
        updatedAt: z.string(),
        barcode: z.string(),
        qrCode: z.string()
        })
        .optional(),
    images: z.array(z.string()).optional(),
    thumbnail: z.string().optional()
    });
*/
// export const create = z.object({
//     title: z.string().nonempty({ error: "Title is required" }),
//     description: z.string().nonempty({ error: "Description is required" }),
//     category: z.string().nonempty({ error: "Category is required" }),
//     price: z.number({ error: "Price is required" }).gt(0, { error: 'The product can not be free' }),
//     discountPercentage: z.number().gte(0, { error: "Discount percentage is required" }),
//     stock: z.number({ error: "Stock is required: Can be 0" }),
//     brand: z.string().nonempty({ error: "Brand is required" }),
//     weight: z.number({ error: 'Weight is required' }).gt(0, { error: 'Product cannot be weightless' }),
//     dimensions: z.object({
//         width: z.number({ error: "Width is required" }).gt(0, { error: "Very thin product" }),
//         height: z.number({ error: "Height is required" }).gt(0, { error: "Very short product" }),
//         depth: z.number({ error: "Depth is required" }).gt(0, { error: "Very thin product" })
//     }),
//     warrantyInformation: z.string().nonempty({ error: "Warranty is required" }),
//     shippingInformation: z.string().nonempty({ error: "Shipping is required" }),
// });

export type entryFormProduct = z.infer<typeof entryForm>;

const requiredGreaterThanZero = z.number({ error: "Required" }).gt(0, { error: "Must be greater than 0" })
const notEmpty = z.string().nonempty({ error: "Required" });

export const entryForm = z.object({
    title: notEmpty,
    description: notEmpty,
    category: notEmpty,
    price: requiredGreaterThanZero,
    weight: requiredGreaterThanZero,
    dimensions_width: requiredGreaterThanZero,
    dimensions_height: requiredGreaterThanZero,
    dimensions_depth: requiredGreaterThanZero,
    brand: notEmpty,
    warranty: notEmpty,
    shipping: notEmpty,
    discount: z.number(),
    stock: z.number(),
}).transform(o => {
    const { title, description, category, price, stock, brand, weight, warranty, shipping, discount, dimensions_width, dimensions_height, dimensions_depth } = o;
    return {
        title,
        description,
        category: category.toLowerCase().split(' ').join('-'),
        price,
        stock,
        brand,
        weight,
        warrantyInformation: warranty,
        shippingInformation: shipping,
        discountPercentage: discount,
        dimensions: {
            width: dimensions_width,
            height: dimensions_height,
            depth: dimensions_depth
        }
    };
});
