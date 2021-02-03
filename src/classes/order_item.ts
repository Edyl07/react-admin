export class OrderItem {
    id: number;
    product_title: string;
    price: number;
    quantity: number;
    order_items: OrderItem[];

    constructor(id: number = 0, product_title: string = '', price: number = 0, quantity: number = 0, order_items: any[] = []){
        this.id = id;
        this.product_title = product_title;
        this.price = price;
        this.quantity = quantity;
        this.order_items = order_items;
    }
}