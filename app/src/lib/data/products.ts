import { PostStatus, Product, ProductList, ProductsFilter, SearchParamsString, SidebarFilterValues, ThinProduct, ThinProductList } from "../types";
import { entryFormProduct } from "../validations/product";
//const baseURI = 'https://dummyjson.com/products';
const baseURI = 'https://kippeves.se/products';

const thinFields = 'select=title,price,discountPercentage,thumbnail,rating,stock';

export const getProduct = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${baseURI}/${id}`);
        return await response.json() as Product;
    } catch (e) {
        throw (e);
    }
}

export const getProductsById = async (ids: number[], variant?: 'hero' | 'short'): Promise<Product[]> => {
    try {
        const URI = ids.join(',');
        let finalURI = `${baseURI}/${URI}`;
        if (variant)
            finalURI += `/${variant}`;
        const response = await fetch(finalURI);
        return await response.json();
    } catch (e) {
        throw (e);
    }
}

export function convertProductParamsToFilter({ params }: { params: SearchParamsString }): ProductsFilter {
    return {
        ...params,
        limit: params.limit ? parseInt(params.limit) : undefined,
        page: params.page ? parseInt(params.page) : undefined,
        categories: params.categories?.split(','),
        brand: params.brand?.split(","),
        priceMin: params.priceMin ? parseFloat(params.priceMin) : undefined,
        priceMax: params.priceMax ? parseFloat(params.priceMax) : undefined
    };
};

function filterToParams(filter: ProductsFilter) {
    const params = new URLSearchParams();
    const { limit = 12, page = 1, sort = "id", order = "desc", categories, search, brand, stock, priceMin, priceMax } = filter;
    if (limit > 0)
        params.set("limit", limit.toString())
    params.set("skip", `${(page - 1) * limit}`);
    params.set("sort", sort);
    params.set("order", order);

    if (stock)
        params.set("inStock", '1');
    if (priceMin)
        params.set("priceMin", priceMin.toString());
    if (priceMax)
        params.set("priceMax", priceMax.toString());
    if (search)
        params.set("q", search);
    if (brand)
        params.set("brand", brand.join())
    if (categories && !categories?.includes("all"))
        params.set("categories", categories.join())
    return params;
}

export const getFilterValues = async ({ categories, values = [] }: { categories?: string[], values: string[] }) => {
    try {
        const params = new URLSearchParams();
        if (categories)
            params.set("categories", categories.join())
        params.set("select", values.join());

        const uri = `${baseURI}/distinct?${params}`;
        const response = await fetch(uri);
        return await response.json() as SidebarFilterValues;
    } catch (e) {
        throw (e);
    }
}

export const getThinProduct = async (id: number): Promise<ThinProduct> => {
    try {
        const response = await fetch(`${baseURI}/${id}?${thinFields}`);
        return await response.json() as ThinProduct;
    } catch (e) {
        throw (e);
    }
}

export const getRandomProducts = async (): Promise<ThinProduct[]> => {
    const URI = `${baseURI}/featured`
    try {
        const request = await fetch(URI);
        return await request.json();
    } catch (e) {
        throw (e);
    }
}


export const getBrandsByProducts = async (): Promise<{ brand: string[] }> => {
    const params = '/distinct?select=brand';
    const decoded = decodeURIComponent(`${baseURI}${params}`);
    const request = await fetch(decoded);
    return await request.json();
}

export const postProduct = async (product: entryFormProduct): Promise<PostStatus> => {
    try {

        const uri = `${baseURI}/add`
        const request = await fetch(uri, {
            method: "POST",
            body: JSON.stringify({ ...product }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await request.json();
        if (result.status)
            return {
                result: "success", id: result.id
            }
        return {
            result: "error", exception: result.message
        }
    }
    catch (e) {
        return { result: "error", exception: `Error: ${e}` }
    }
}

export const deleteProduct = async (id: string) => {
    try {
        const uri = `${baseURI}/${id}`
        const request = await fetch(uri, {
            method: "DELETE"
        });
        const result = await request.json();
        if (result.success)
            return {
                result: "success", id: result.id
            }
        return {
            result: "error", exception: result.message
        }
    }
    catch (e) {
        return { result: "error", exception: `Error: ${e}` }
    }
}

export const editProduct = async (id: number, product: entryFormProduct): Promise<PostStatus> => {
    try {
        const uri = `${baseURI}/${id}`
        const request = await fetch(uri, {
            method: "PUT",
            body: JSON.stringify({ ...product }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await request.json();
        console.debug(result)
        if (result.status)
            return {
                result: "success", id: result.id
            }
        return {
            result: "error", exception: result.message
        }
    }
    catch (e) {
        return { result: "error", exception: `Error: ${e}` }
    }
}

export const getFullProductsByFilter = async (filter: ProductsFilter): Promise<ProductList> => {
    const params = filterToParams(filter);
    const decoded = decodeURIComponent(`${baseURI}?${params}`);
    const request = await fetch(decoded);
    return await request.json();
}

export const getThinProductsByFilter = async (filter: ProductsFilter): Promise<ThinProductList> => {
    const params = filterToParams(filter);
    const decoded = decodeURIComponent(`${baseURI}?${thinFields}&${params}`);
    const request = await fetch(decoded);
    return await request.json();
}