DROP TABLE IF EXISTS inventory, items, products, purchases, vendors, sales, purchase_orders, order_items CASCADE;

CREATE TABLE vendors (
    VendorID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    VendorID INT REFERENCES vendors(VendorID)
);

CREATE TABLE purchase_orders (
    POID SERIAL PRIMARY KEY,
    VendorID INT REFERENCES vendors(VendorID),
    DateCreated DATE,
    Status VARCHAR(50)
);

CREATE TABLE order_items (
    OrderItemID SERIAL PRIMARY KEY,
    POID INT REFERENCES purchase_orders(POID),
    ProductID INT REFERENCES products(ProductID),
    UnitPrice DECIMAL(10, 2),
    Quantity INT
);

CREATE TABLE sales (
    SaleID SERIAL PRIMARY KEY,
    ProductID INT REFERENCES products(ProductID),
    QuantitySold INT NOT NULL,
    DateSold DATE NOT NULL
);

CREATE TABLE inventory (
    InventoryID SERIAL PRIMARY KEY,
    ProductID INT REFERENCES products(ProductID),
    Quantity INT NOT NULL
);


INSERT INTO vendors (Name) VALUES
('UNFI'),
('TONY'),
('WAREHOUSE');

INSERT INTO products (Name, UnitPrice, VendorID) VALUES
('Almond Milk', 7.11, 1),
('Yogurt', 4.82, 1),
('Cheese', 5.50, 1),
('Bread', 2.50, 1),
('Eggs', 3.00, 1),
('Milk', 1.50, 1),
('Onions', 3.61, 2),
('Organic Apples', 2.86, 2),
('Potatoes', 1.20, 2),
('Carrots', 1.50, 2),
('Tomatoes', 2.00, 2),
('Cucumbers', 1.30, 2),
('Rice', 6.13, 3),
('Olive Oil', 6.6, 3),
('Pasta', 2.50, 3),
('Spices', 1.20, 3),
('Sugar', 0.90, 3),
('Flour', 1.00, 3);


INSERT INTO sales (ProductID, QuantitySold, DateSold) VALUES
(13, 5, '2023-09-01'),
(14, 7, '2023-09-02'),
(15, 9, '2023-09-03'),
(16, 11, '2023-09-04'),
(17, 13, '2023-09-05'),
(18, 15, '2023-09-06'),
(1, 5, '2023-08-30'),
(2, 20, '2023-08-30'),
(3, 10, '2023-08-29'),
(4, 15, '2023-08-31'),
(5, 30, '2023-09-01'),
(6, 25, '2023-09-02'),
(7, 12, '2023-09-03'),
(8, 8, '2023-09-04'),
(9, 6, '2023-09-05'),
(10, 20, '2023-08-22'),
(11, 15, '2023-08-21'),
(12, 10, '2023-08-20'),
(13, 5, '2023-08-19'),
(14, 7, '2023-08-18'),
(15, 9, '2023-08-17'),
(16, 11, '2023-08-16'),
(17, 13, '2023-08-15'),
(18, 15, '2023-08-14');


INSERT INTO inventory (ProductID, Quantity) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1);

