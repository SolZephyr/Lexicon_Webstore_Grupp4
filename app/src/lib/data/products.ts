import { Product, ProductsFilter, SearchParamsString, SidebarFilterValues, ThinProduct, ThinProductList } from "../types";
//const baseURI = 'https://dummyjson.com/products';
const baseURI = 'https://www.kippeves.se/products';
const thinFields = 'select=title,price,discountPercentage,thumbnail,rating,availabilityStatus';

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

export const searchByName = async ({ name, page }: { name: string, page?: { number: number, perPage: number } }): Promise<ThinProductList> => {
    try {
        let URI = `${baseURI}/search?q=${name}&${thinFields}`
        if (page)
            URI += `&skip=${page.perPage * (page.number - 1)}&limit=${page.perPage}`;
        const response = await fetch(URI);
        return await response.json() as ThinProductList;
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

export const getProductsByFilter = async (filter: ProductsFilter): Promise<ThinProductList> => {
    const params = new URLSearchParams();
    const { limit = 12, page = 1, sort = "id", order = "desc", categories, search, brand, stock, priceMin, priceMax } = filter;
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

    const uri = decodeURIComponent(`${baseURI}?${thinFields}&${params}`);
    const decoded = decodeURIComponent(uri);
    const request = await fetch(decoded);
    return await request.json() as ThinProductList;
}