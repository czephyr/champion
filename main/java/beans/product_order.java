package beans;

public class product_order {

    private int order_id;
    private String name;
    private int product_id;
    private int quantity;
    private boolean reviewed;
    private double price;

    public product_order(String name, int product_id, int quantity, double price) {
        this.name = name;
        this.product_id = product_id;
        this.quantity = quantity;
        this.price = price;
    }

    public product_order() {
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
