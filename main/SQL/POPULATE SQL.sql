INSERT INTO Product (productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (19.99, 'Created with premium whey, our formula is packed with an impressive 21g of protein per serving, delivering the protein you need from a high-quality source – that’s why it’s the world’s #1 protein powder.',
        'GREEN LABEL Whey Protein','Champion Green Line', '250pgreen','550pgreen',25);

INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (21.99, 'Created with premium whey, our formula is packed with an impressive 21g of protein per serving, delivering the protein you need from a high-quality source – that’s why it’s the world’s #1 protein powder.',
        'RED LABEL Whey Protein','Champion Red Line', '250pred','550pred',30);

INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (20.99, 'Created with premium whey, our formula is packed with an impressive 21g of protein per serving, delivering the protein you need from a high-quality source – that’s why it’s the world’s #1 protein powder.',
        'BLUE LABEL Whey Protein','Champion Blue Line', '250pblue','550pblue',25);

INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (15.99, 'A popular ingredient in many all-in-one sports supplements, creatine increases your body’s ability to produce energy quickly. Creatine already exists in small amounts in our bodies naturally, but lots of people take it as a supplement to boost their performance in the gym.',
        'GREEN LABEL Creatine Monohydrate Powder','Champion Green Line', '250bgreen','550bgreen',10);
INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (13.99, 'A popular ingredient in many all-in-one sports supplements, creatine increases your body’s ability to produce energy quickly. Creatine already exists in small amounts in our bodies naturally, but lots of people take it as a supplement to boost their performance in the gym.',
        'RED LABEL Creatine Monohydrate Powder','Champion Red Line', '250bred','550bred',13);
INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (17.99, 'A popular ingredient in many all-in-one sports supplements, creatine increases your body’s ability to produce energy quickly. Creatine already exists in small amounts in our bodies naturally, but lots of people take it as a supplement to boost their performance in the gym.',
        'BLUE LABEL Creatine Monohydrate Powder','Champion Blue Line', '250bblue','550bblue',15);

INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (30.99, 'If you’re looking to gain weight, build strength, or increase size then you’re going to have to consume more calories than you burn throughout the day — known as a calorie surplus.',
        'GREEN LABEL Weight Gainer Blend','Champion Green Line', '250jgreen','550jgreen',5);
INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (27.99, 'If you’re looking to gain weight, build strength, or increase size then you’re going to have to consume more calories than you burn throughout the day — known as a calorie surplus.',
        'RED LABEL Weight Gainer Blend','Champion Red Line', '250jred','550jred',40);
INSERT INTO Product ( productPrice, productText, productName, productCategory, productImg250, productImg550, productQuantity)
values (30.99, 'If you’re looking to gain weight, build strength, or increase size then you’re going to have to consume more calories than you burn throughout the day — known as a calorie surplus.',
        'BLUE LABEL Weight Gainer Blend','Champion Blue Line', '250jblue','550jblue',37);



INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('email1@gmail.com', 'Giovanna', 'Giorno', 'Via Largo 15','PASSWORD1', 0);
INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('email2@gmail.com', 'Giacomo', 'Volanti', 'Via Roma 13','PASSWORD2', 0);
INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('email3@gmail.com', 'Alberto', 'Rossi', 'Via Venezia 7','PASSWORD3', 0);
INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('email4@gmail.com', 'Ettore', 'Verdi', 'Via Ferrara 1','PASSWORD4', 0);
INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('email5@gmail.com', 'Paolo', 'Bianchi', 'Via Napoli 56','PASSWORD5', 0);
INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('email6@gmail.com', 'Rossana', 'Rossi', 'Via Bari 12','PASSWORD6', 0);
INSERT INTO Customer (customerEmail,customerName,customerSurname,customerAddress,customerPassword, customerIsAdmin)
values ('admin@gmail.com', 'admin', 'admin', 'Via Admin 1','admin', 0);





#INSERT INTO Review (customer_id,product_id,reviewGrade,reviewText)
#values (1, 2, 3, 'TEXT1');

#INSERT INTO Review (customer_id,product_id,reviewGrade,reviewText)
#values (2, 1, 1, 'TEXT2');

#INSERT INTO Review (customer_id,product_id,reviewGrade,reviewText)
#values (5, 3, 5, 'TEXT3');

#INSERT INTO Review (customer_id,product_id,reviewGrade,reviewText)
#values (1, 3, 4, 'TEXT4');
#INSERT INTO Review (customer_id,product_id,reviewGrade,reviewText)
#values (3, 4, 5, 'TEXT5');

#INSERT INTO Review (customer_id,product_id,reviewGrade,reviewText)
#values (1, 4, 3, 'TEXT1');

INSERT INTO Cart (customer_id)
values (1);
INSERT INTO Cart (customer_id)
values (3);
INSERT INTO Cart (customer_id)
values (5);

INSERT INTO orders (customer_id)
values (1);

INSERT INTO orders (customer_id)
values (1);

INSERT INTO orders (customer_id)
values (2);

INSERT INTO orders (customer_id)
values (3);

INSERT INTO orders (customer_id)
values (5);

INSERT INTO orders (customer_id)
values (1);

INSERT INTO orders (customer_id)
values (4);


INSERT INTO Product_Order (order_id,product_id,quantity)
values (1,2,2);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (1,3,1);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (1,4,1);

INSERT INTO Product_Order (order_id,product_id,quantity)
values (2,1,1);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (2,3,2);

INSERT INTO Product_Order (order_id,product_id,quantity)
values (3,2,2);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (3,5,3);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (3,1,1);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (3,4,1);

INSERT INTO Product_Order (order_id,product_id,quantity)
values (4,1,4);

INSERT INTO Product_Order (order_id,product_id,quantity)
values (5,2,1);

INSERT INTO Product_Order (order_id,product_id,quantity)
values (6,3,1);
INSERT INTO Product_Order (order_id,product_id,quantity)
values (6,4,1);

INSERT INTO Product_Order (order_id,product_id,quantity)
values (7,1,1);

INSERT INTO Product_Cart (cart_id,product_id,quantity)
values (1,3,1);
INSERT INTO Product_Cart (cart_id,product_id,quantity)
values (1,2,3);
INSERT INTO Product_Cart (cart_id,product_id,quantity)
values (1,4,2);
INSERT INTO Product_Cart (cart_id,product_id,quantity)
values (3,1,1);
INSERT INTO Product_Cart (cart_id,product_id,quantity)
values (5,2,1);

#REATE VIEW `Order_Total` AS
#SELECT customerID, SUM(productPrice)
#FROM ((customer INNER JOIN `order` o on customer.customerID = o.customer_id) INNER JOIN product_order on order_id) INNER JOIN product on product_id;
