from flask import Flask, request, jsonify
import joblib
import logging
import numpy as np

app = Flask(__name__)

# Load your machine learning model
try:
    model = joblib.load('appointment_scheduler.pkl')
except Exception as e:
    logging.error(f"Failed to load the model: {e}")

# Define fixed availability for all doctors (assuming availability is always 1)
availability = 1

@app.route('/optimize-schedule', methods=['POST'])
def optimize_schedule():
    try:
        # Extract data from JSON request
        request_data = request.get_json()
        
        # Extract doctor_id and patient_preference from request data
        doctor_id = request_data['doctor_id']
        patient_preference = request_data['patient_preference']
        
        # Replace this with your actual model prediction logic
        # Ensure availability is included as a feature for prediction
        predicted_time_slot = model.predict([[doctor_id, patient_preference, availability]])
        
        # Prepare response as a dictionary (ensure it's JSON serializable)
        response = {
            'suggested_time': int(predicted_time_slot[0])  # Convert to int if necessary
        }
     
        return jsonify(response)
    
    except KeyError as e:
        error_message = f"KeyError: Missing key in request data - {e}"
        logging.error(error_message)
        return jsonify({'error': error_message}), 400
    
    except Exception as e:
        error_message = f"Unexpected error occurred: {e}"
        logging.error(error_message)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    # Configure logging to write to a file
    logging.basicConfig(filename='app.log', level=logging.ERROR)
    
    app.run(debug=True)
