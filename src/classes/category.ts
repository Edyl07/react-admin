export class Category {
    id: number;
    name: string;
    name_ar: string;
    description: string;
    description_ar: string;
    image: string;

    constructor(id: number = 0, name: string = '', name_ar: string = '', description: string = '', description_ar: string = '', image: string = '') {
        this.id = id;
        this.name = name;
        this.name_ar = name_ar;
        this.image = image;
        this.description = description;
        this.description_ar = description_ar;
    }
}