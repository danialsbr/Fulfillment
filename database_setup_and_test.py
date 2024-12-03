import os
from sqlalchemy import create_engine, Column, Integer, String, JSON, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# Database connection
DATABASE_URL = "postgresql://base-user:Q85DL-oL_cj9JRiY3D-krXKW@acd2a225dc2e4030bafa8e92e00de748.db.arvandbaas.ir:5432/defaultdb"
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
Base = declarative_base()

# Define models
class Order(Base):
    __tablename__ = 'orders'
    id = Column(String, primary_key=True)
    customer_name = Column(String)
    order_date = Column(String)
    total_amount = Column(Float)
    status = Column(String)
    data = Column(JSON)

class SKU(Base):
    __tablename__ = 'skus'
    id = Column(String, primary_key=True)
    order_id = Column(String)
    name = Column(String)
    quantity = Column(Integer)
    scanned = Column(Integer)
    price = Column(Float)

# Create tables
Base.metadata.create_all(engine)

# Test data
test_orders = [
    {
        "id": "ORD001",
        "customer_name": "John Doe",
        "order_date": datetime.now().isoformat(),
        "total_amount": 150.00,
        "status": "Pending",
        "data": {
            "shipping_address": "123 Main St, City, Country",
            "payment_method": "Credit Card"
        }
    },
    {
        "id": "ORD002",
        "customer_name": "Jane Smith",
        "order_date": datetime.now().isoformat(),
        "total_amount": 200.00,
        "status": "Processing",
        "data": {
            "shipping_address": "456 Elm St, Town, Country",
            "payment_method": "PayPal"
        }
    }
]

test_skus = [
    {
        "id": "SKU001",
        "order_id": "ORD001",
        "name": "Product A",
        "quantity": 2,
        "scanned": 0,
        "price": 50.00
    },
    {
        "id": "SKU002",
        "order_id": "ORD001",
        "name": "Product B",
        "quantity": 1,
        "scanned": 0,
        "price": 50.00
    },
    {
        "id": "SKU003",
        "order_id": "ORD002",
        "name": "Product C",
        "quantity": 4,
        "scanned": 0,
        "price": 50.00
    }
]

# Insert test data
session = Session()

for order_data in test_orders:
    order = Order(**order_data)
    session.add(order)

for sku_data in test_skus:
    sku = SKU(**sku_data)
    session.add(sku)

session.commit()

# Test queries
print("All Orders:")
orders = session.query(Order).all()
for order in orders:
    print(f"Order ID: {order.id}, Customer: {order.customer_name}, Total: {order.total_amount}, Status: {order.status}")
    skus = session.query(SKU).filter_by(order_id=order.id).all()
    for sku in skus:
        print(f"  SKU: {sku.id}, Product: {sku.name}, Quantity: {sku.quantity}, Scanned: {sku.scanned}")

print("\nPending Orders:")
pending_orders = session.query(Order).filter_by(status="Pending").all()
for order in pending_orders:
    print(f"Order ID: {order.id}, Customer: {order.customer_name}")

print("\nTotal Revenue:")
total_revenue = session.query(Order).with_entities(func.sum(Order.total_amount)).scalar()
print(f"Total Revenue: ${total_revenue:.2f}")

# Close the session
session.close()

print("\nDatabase setup and test completed successfully.")

