from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime
import os
from werkzeug.exceptions import BadRequest

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Initialize Firebase Admin SDK
# You'll need to download your service account key JSON file from Firebase Console
# and either set the path in environment variable or place it in your project directory
try:
    # Option 1: Use environment variable for service account key path
    if os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'):
        cred = credentials.ApplicationDefault()
    else:
        # Option 2: Use service account key file (replace with your actual path)
        cred = credentials.Certificate('path/to/your/serviceAccountKey.json')
    
    firebase_admin.initialize_app(cred)
    db = firestore.client()
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    db = None

# Collection name for todos
TODOS_COLLECTION = 'todos'

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

@app.route('/todos', methods=['GET'])
def get_todos():
    """Get all todos"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        todos_ref = db.collection(TODOS_COLLECTION)
        todos = []
        
        for doc in todos_ref.stream():
            todo_data = doc.to_dict()
            todo_data['id'] = doc.id
            todos.append(todo_data)
        
        # Sort by created_at timestamp
        todos.sort(key=lambda x: x.get('created_at', datetime.min), reverse=True)
        
        return jsonify({'todos': todos})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos', methods=['POST'])
def create_todo():
    """Create a new todo"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'Text field is required'}), 400
        
        # Create todo object
        todo = {
            'text': data['text'].strip(),
            'completed': data.get('completed', False),
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }
        
        # Add optional fields
        if 'priority' in data:
            todo['priority'] = data['priority']
        if 'due_date' in data:
            todo['due_date'] = data['due_date']
        if 'category' in data:
            todo['category'] = data['category']
        
        # Add to Firestore
        doc_ref = db.collection(TODOS_COLLECTION).add(todo)
        todo_id = doc_ref[1].id
        
        # Return created todo with ID
        todo['id'] = todo_id
        
        return jsonify({
            'message': 'Todo created successfully',
            'todo': todo
        }), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos/<todo_id>', methods=['GET'])
def get_todo(todo_id):
    """Get a specific todo by ID"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        doc_ref = db.collection(TODOS_COLLECTION).document(todo_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            return jsonify({'error': 'Todo not found'}), 404
        
        todo_data = doc.to_dict()
        todo_data['id'] = doc.id
        
        return jsonify({'todo': todo_data})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos/<todo_id>', methods=['PUT'])
def update_todo(todo_id):
    """Update a specific todo"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Get existing todo
        doc_ref = db.collection(TODOS_COLLECTION).document(todo_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            return jsonify({'error': 'Todo not found'}), 404
        
        # Prepare update data
        update_data = {'updated_at': datetime.now()}
        
        # Update allowed fields
        allowed_fields = ['text', 'completed', 'priority', 'due_date', 'category']
        for field in allowed_fields:
            if field in data:
                if field == 'text':
                    update_data[field] = data[field].strip()
                else:
                    update_data[field] = data[field]
        
        # Update in Firestore
        doc_ref.update(update_data)
        
        # Get updated todo
        updated_doc = doc_ref.get()
        todo_data = updated_doc.to_dict()
        todo_data['id'] = updated_doc.id
        
        return jsonify({
            'message': 'Todo updated successfully',
            'todo': todo_data
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    """Delete a specific todo"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        doc_ref = db.collection(TODOS_COLLECTION).document(todo_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            return jsonify({'error': 'Todo not found'}), 404
        
        # Delete from Firestore
        doc_ref.delete()
        
        return jsonify({'message': 'Todo deleted successfully'})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos/<todo_id>/toggle', methods=['PATCH'])
def toggle_todo(todo_id):
    """Toggle the completed status of a todo"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        doc_ref = db.collection(TODOS_COLLECTION).document(todo_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            return jsonify({'error': 'Todo not found'}), 404
        
        current_data = doc.to_dict()
        new_completed_status = not current_data.get('completed', False)
        
        # Update completion status
        doc_ref.update({
            'completed': new_completed_status,
            'updated_at': datetime.now()
        })
        
        # Get updated todo
        updated_doc = doc_ref.get()
        todo_data = updated_doc.to_dict()
        todo_data['id'] = updated_doc.id
        
        return jsonify({
            'message': 'Todo status toggled successfully',
            'todo': todo_data
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos/bulk-delete', methods=['DELETE'])
def bulk_delete_todos():
    """Delete multiple todos by IDs"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        data = request.get_json()
        
        if not data or 'ids' not in data:
            return jsonify({'error': 'IDs array is required'}), 400
        
        todo_ids = data['ids']
        deleted_count = 0
        
        for todo_id in todo_ids:
            doc_ref = db.collection(TODOS_COLLECTION).document(todo_id)
            if doc_ref.get().exists:
                doc_ref.delete()
                deleted_count += 1
        
        return jsonify({
            'message': f'Successfully deleted {deleted_count} todos',
            'deleted_count': deleted_count
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/todos/completed', methods=['DELETE'])
def delete_completed_todos():
    """Delete all completed todos"""
    try:
        if not db:
            return jsonify({'error': 'Database not initialized'}), 500
        
        todos_ref = db.collection(TODOS_COLLECTION)
        completed_todos = todos_ref.where('completed', '==', True).get()
        
        deleted_count = 0
        for todo in completed_todos:
            todo.reference.delete()
            deleted_count += 1
        
        return jsonify({
            'message': f'Successfully deleted {deleted_count} completed todos',
            'deleted_count': deleted_count
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)