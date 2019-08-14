# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.

SELECT p.productname as Product, c.categoryname as Category FROM Products as p
join categories as c on c.categoryid = p.categoryid


### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.

SELECT o.orderid, o.orderdate, s.shippername FROM [Orders] as o
join shippers as s on o.shipperid = s.shipperid
where o.orderdate < '1997-01-09'


### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.

SELECT p.productname, od.quantity, od.orderid FROM [Products] as p
join orderdetails as od on od.productid = p.productid
where od.orderid=10251


### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.

SELECT o.orderid, c.customername, e.lastname FROM [Orders] as o
join customers as c on c.customerid = o.customerid
join employees as e on e.employeeid = o.employeeid


### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 