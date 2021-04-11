package beans.parents;

public class Review {

    private int id;
    private int customer_id;
    private int product_id;
    private String text;

    public Review() {
    }

    public Review(int customer_id, int product_id, String text) {
        this.customer_id = customer_id;
        this.product_id = product_id;
        this.text = text;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
