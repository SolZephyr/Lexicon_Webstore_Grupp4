import { ContentWrapper } from "@/components/content-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProductPage() {

    const categories: string[] = [
        "Smartphones",
        "Tablets",
        "Mobile Accessories",
        "Laptops"
    ];

    async function submitProduct(formData: FormData) {
        "use server";
        console.log(formData);
    }

    return (
        <ContentWrapper className="flex flex-col gap-4 py-12 md:py-16 md:gap-8">
            <section>
                <form action={submitProduct}>
                    <h2 className="text-4xl font-bold">Create New Product</h2>

                    {/* Basic information */}
                    <section className="py-4">
                        <Label htmlFor="title">Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Product name" maxLength={50} className="bg-white my-2" />
                        <Label htmlFor="title">SKU (unique)</Label>
                        <Input type="text" id="sku" name="sku" placeholder="ex: SKU-PRO-001" maxLength={20} className="bg-white my-2" />
                        <Label htmlFor="category">Category</Label>
                        <Select>
                            <SelectTrigger id="category" name="category" className="w-[180px] bg-white my-2">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    categories.map((item) => (
                                        <SelectItem key={item.toLowerCase()} value={item}>{item}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                        <Label htmlFor="title">Description</Label>
                        <Textarea id="description" name="description" rows={5} className="bg-white my-2" />
                    </section>

                    {/* Extra information */}
                    <section className="py-4">
                        <Label htmlFor="weight">Weight (grams)</Label>
                        <Input type="number" id="weight" name="weight" min={1} step={1} className="bg-white my-2" />
                    </section>

                    {/* Purchase information */}
                    <section className="py-4">
                        <Label htmlFor="price">Price</Label>
                        <Input type="number" id="price" name="price" min={1} step={0.01} max={99999} className="bg-white my-2" />
                        <Label htmlFor="discount">Discount (percentage)</Label>
                        <Input type="number" id="discount" name="discount" min={0} max={100} step={1} className="bg-white my-2" />
                        <Label htmlFor="stock">Stock (amount)</Label>
                        <Input type="number" id="stock" name="stock" min={0} max={999} step={1} className="bg-white my-2" />
                    </section>
                    <section className="py-4">
                        <Button type="submit" size="lg" className="cursor-pointer">
                            Add product
                        </Button>
                    </section>
                </form>
            </section>
        </ContentWrapper>
    );
}