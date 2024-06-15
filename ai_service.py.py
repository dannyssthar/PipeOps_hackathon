from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

# Mock data for doctor availability
DOCTOR_AVAILABILITY = {
    'doctor1': [
        '2024-06-16T09:00:00',
        '2024-06-16T10:00:00',
        '2024-06-16T11:00:00'
    ],
    'doctor2': [
        '2024-06-16T13:00:00',
        '2024-06-16T14:00:00',
        '2024-06-16T15:00:00'
    ]
}

def find_optimal_time(preferences, availability):
    # Simple heuristic: find the earliest available slot
    for slot in availability:
        slot_time = datetime.datetime.fromisoformat(slot)
        if slot_time > datetime.datetime.now():
            return slot_time
    return None

@app.route('/optimize_schedule', methods=['POST'])
def optimize_schedule():
    data = request.json
    patient_preferences = data.get('preferences', {})
    doctor_id = data.get('doctorId', 'doctor1')
    
    availability = DOCTOR_AVAILABILITY.get(doctor_id, [])
    optimal_time = find_optimal_time(patient_preferences, availability)
    
    if optimal_time:
        return jsonify({"optimal_time": optimal_time.isoformat()})
    else:
        return jsonify({"error": "No available slots found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
