create table customer
(
    customerID       int auto_increment
        primary key,
    customerEmail    varchar(255) not null,
    customerName     varchar(255) not null,
    customerSurname  varchar(255) not null,
    customerAddress  varchar(255) not null,
    customerPassword varchar(255) not null,
    customerIsAdmin  tinyint(1)   not null
);

create table cart
(
    cartID      int auto_increment
        primary key,
    customer_id int not null,
    constraint Cart_fk0
        foreign key (customer_id) references customer (customerID)
);

create table orders
(
    orderID     int auto_increment
        primary key,
    customer_id int not null,
    constraint Order_fk0
        foreign key (customer_id) references customer (customerID)
);

create table product
(
    productID       int auto_increment
        primary key,
    productPrice    decimal(5, 2) not null,
    productText     varchar(700)  not null,
    productName     varchar(255)  not null,
    productCategory varchar(255)  not null,
    productQuantity int           null,
    productImg250   varchar(50)   null,
    productImg550   varchar(50)   null
);

create table product_cart
(
    cart_id    int not null,
    product_id int not null,
    quantity   int not null,
    constraint Product_Cart_fk0
        foreign key (cart_id) references cart (cartID),
    constraint Product_Cart_fk1
        foreign key (product_id) references product (productID)
);

create table product_order
(
    order_id   int not null,
    product_id int not null,
    quantity   int not null,
    reviewed   int null,
    constraint Product_Order_fk0
        foreign key (order_id) references orders (orderID),
    constraint Product_Order_fk1
        foreign key (product_id) references product (productID)
);

create table review
(
    reviewID     int auto_increment
        primary key,
    customer_id  int          not null,
    product_id   int          not null,
    reviewRating int          not null,
    reviewText   varchar(255) not null,
    constraint Review_fk0
        foreign key (customer_id) references customer (customerID),
    constraint Review_fk1
        foreign key (product_id) references product (productID)
);

