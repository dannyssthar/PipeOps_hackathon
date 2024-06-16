from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load the trained model
model = joblib.load('appointment_scheduler.pkl')

@app.route('/optimize-schedule', methods=['POST'])
def optimize_schedule():
    data = request.json
    doctor_id = data['doctor_id']
    patient_preference = data['patient_preference']

    # For simplicity, let's assume availability is always 1 (available)
    # You can modify this based on real availability data
    availability = 1

    # Prepare the input data for the model
    input_data = np.array([[doctor_id, patient_preference, availability]])

    # Predict the time slot
    predicted_time_slot = model.predict(input_data)

    response = {
        'suggested_time': predicted_time_slot[0]
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
