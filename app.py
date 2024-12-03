from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Demo data
orders_db = {
    "12345": {
        "id": "12345",
        "customerName": "John Doe",
        "date": "2023-05-01",
        "status": "Processing",
        "transportation": "پست",
        "SKUs": {
            "SKU-001": {"id": "SKU-001", "name": "Product A", "quantity": 2, "scanned": 1},
            "SKU-002": {"id": "SKU-002", "name": "Product B", "quantity": 1, "scanned": 0},
        }
    },
    "12346": {
        "id": "12346",
        "customerName": "Jane Smith",
        "date": "2023-05-02",
        "status": "Shipped",
        "transportation": "اسنپ باکس",
        "SKUs": {
            "SKU-003": {"id": "SKU-003", "name": "Product C", "quantity": 3, "scanned": 3},
            "SKU-004": {"id": "SKU-004", "name": "Product D", "quantity": 1, "scanned": 0},
        }
    },
}

@app.route('/upload', methods=['POST'])
def upload_file():
    # Simulate file upload processing
    if 'file' not in request.files:
        return jsonify({'message': 'No file part in the request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No file selected for uploading'}), 400
    
    # In a real scenario, you would process the file here
    # For demo purposes, we'll just return a success message
    return jsonify({'message': 'File successfully uploaded and processed'}), 200

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders_db)

@app.route('/scan', methods=['POST'])
def scan_sku():
    data = request.json
    order_id = data.get('orderId')
    sku = data.get('sku')
    
    if not order_id or not sku:
        return jsonify({'message': 'Order ID and SKU are required'}), 400
    
    if order_id not in orders_db:
        return jsonify({'message': 'Order not found'}), 404
    
    if sku not in orders_db[order_id]['SKUs']:
        return jsonify({'message': 'SKU not found in this order'}), 404
    
    orders_db[order_id]['SKUs'][sku]['scanned'] += 1
    
    return jsonify({'message': 'SKU scanned successfully', 'order': orders_db[order_id]}), 200

@app.route('/download-updated', methods=['GET'])
def download_file():
    # In a real scenario, you would generate a file here
    # For demo purposes, we'll create a simple JSON file with the current orders data
    with open('updated_orders.json', 'w') as f:
        json.dump(orders_db, f)
    
    return send_file('updated_orders.json', as_attachment=True)

@app.route('/reset', methods=['POST'])
def reset_data():
    global orders_db
    orders_db = {
        "12345": {
            "id": "12345",
            "customerName": "John Doe",
            "date": "2023-05-01",
            "status": "Processing",
            "transportation": "پست",
            "SKUs": {
                "SKU-001": {"id": "SKU-001", "name": "Product A", "quantity": 2, "scanned": 0},
                "SKU-002": {"id": "SKU-002", "name": "Product B", "quantity": 1, "scanned": 0},
            }
        },
        "12346": {
            "id": "12346",
            "customerName": "Jane Smith",
            "date": "2023-05-02",
            "status": "Shipped",
            "transportation": "اسنپ باکس",
            "SKUs": {
                "SKU-003": {"id": "SKU-003", "name": "Product C", "quantity": 3, "scanned": 0},
                "SKU-004": {"id": "SKU-004", "name": "Product D", "quantity": 1, "scanned": 0},
            }
        },
    }
    return jsonify({'message': 'All data has been reset'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

