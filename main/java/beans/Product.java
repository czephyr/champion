package beans;

public class Product {

	private int id;
	private String name;
	private double price;
	private String text;
	private String category;
	private String img250;
	private String img550;
	private int quantity;


	public Product() {
	}

	public String getImg250() {
		return img250;
	}

	public void setImg250(String img250) {
		this.img250 = img250;
	}

	public String getImg550() {
		return img550;
	}

	public void setImg550(String img550) {
		this.img550 = img550;
	}

	public Product(int productID, String productName, double productPrice, String productText, String productCategory, int productQuantity, String productImg250, String productImg550) {
		this.id = productID;
		this.name = productName;
		this.price = productPrice;
		this.text = productText;
		this.category = productCategory;
		this.quantity = productQuantity;
		this.img250 = productImg250;
		this.img550 = productImg550;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Product(int id, String name, double price, String text, String category) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.text = text;
		this.category = category;
	}

	public Product(int id, String name, double price, String text, String category, int quantity) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.text = text;
		this.category = category;
		this.quantity = quantity;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}


	@Override
	public String toString() {
		return "Product{" +
			"id=" + id +
			", name='" + name + '\'' +
			", price=" + price +
			", text='" + text + '\'' +
			", category='" + category + '\'' +
			'}';
	}
}
