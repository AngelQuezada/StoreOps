-- Drop tables if they exist
DROP TABLE IF EXISTS inventory, items, products, purchases, vendors, sales CASCADE;

-- Create vendors table
CREATE TABLE vendors (
    VendorID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL
);

-- Create products table
CREATE TABLE products (
    ProductID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    VendorID INT REFERENCES vendors(VendorID)
);

-- Create inventory table
CREATE TABLE inventory (
    InventoryID SERIAL PRIMARY KEY,
    ProductID INT REFERENCES products(ProductID),
    Quantity INT NOT NULL
);

CREATE TABLE purchases (
    PurchaseID SERIAL PRIMARY KEY,
    VendorID INT REFERENCES vendors(VendorID),
    ProductName VARCHAR(255) NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    Quantity INT NOT NULL,
    DatePurchased DATE NOT NULL
);

-- Create sales table
CREATE TABLE sales (
    SaleID SERIAL PRIMARY KEY,
    ProductID INT REFERENCES products(ProductID),
    QuantitySold INT NOT NULL,
    DateSold DATE NOT NULL
);

CREATE TABLE items (
  ID SERIAL PRIMARY KEY,
  NAME VARCHAR(255),
  unitPrice DECIMAL(10, 2),
  quantity INTEGER,
  vendorID INTEGER REFERENCES vendors(VendorID)
);


-- Seed vendors table
INSERT INTO vendors (Name) VALUES
('UNFI'),
('TONY'),
('WAREHOUSE');

-- Seed products table
INSERT INTO products (Name, UnitPrice, VendorID) VALUES
('Almond Milk', 7.11, 1),
('Yogurt', 4.82, 1),
('Onions', 3.61, 2),
('Organic Apples', 2.86, 2),
('Rice', 6.13, 3),
('Olive Oil', 6.6, 3);

-- Seed inventory table
INSERT INTO inventory (ProductID, Quantity) VALUES
(1, 10),
(2, 5000),
(3, 706),
(4, 707),
(5, 28),
(6, 62);

-- Example data insertion for purchases table
INSERT INTO purchases (VendorID, ProductName, UnitPrice, Quantity, DatePurchased)
VALUES
    (1, 'Almond Milk', 7.11, 50, '2023-08-30'),
    (2, 'Onions', 3.61, 100, '2023-08-30'),
    (3, 'Olive Oil', 6.6, 20, '2023-08-29');

-- Insert sample data into the items table
INSERT INTO items (NAME, unitPrice, quantity, vendorID)
VALUES
  ('Product A', 10.99, 50, 1),
  ('Product B', 15.49, 25, 2),
  ('Product C', 5.99, 100, 1);
