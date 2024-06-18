from flask import Flask, request, render_template, jsonify
import joblib
import logging

app = Flask(__name__)

# Setup logging
logging.basicConfig(filename='app.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(name)s %(message)s')
logger = logging.getLogger(__name__)

# Load your machine learning model
try:
    model = joblib.load('appointment_scheduler.pkl')
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error(f"Error loading model: {e}")
    raise e

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/live-chat')
def live_chat():
    return render_template('live-chat.html')

@app.route('/optimize-schedule', methods=['POST'])
def optimize_schedule():
    try:
        # Extract data from JSON request
        request_data = request.get_json()
        doctor_id = request_data.get('doctor_id')
        patient_preference = request_data.get('patient_preference')
        
        # Ensure all required data is present
        if doctor_id is None or patient_preference is None:
            return jsonify({"error": "Missing data: doctor_id and patient_preference are required"}), 400

        # Assuming availability is always 1 for this example
        availability = 1

        # Predict the time slot
        predicted_time_slot = model.predict([[doctor_id, patient_preference, availability]])

        # Prepare response as a dictionary
        response = {
            'suggested_time': int(predicted_time_slot[0])  # Convert to int if necessary
        }

        return jsonify(response)
    except Exception as e:
        logger.error(f"Error in /optimize-schedule: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
