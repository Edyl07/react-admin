export class Product {
    id: number;
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    price: number;

    constructor(id: number = 0, title: string = '', title_ar: string = '', description: string = '', description_ar: string = '', image: string = '', price: number = 0) {
        this.id = id;
        this.title = title;
        this.title_ar = title_ar;
        this.image = image;
        this.description = description;
        this.description_ar = description_ar;
        this.price = price;
    }
}