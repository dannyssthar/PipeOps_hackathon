import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Generate some mock data
# In a real scenario, you should replace this with actual data loading and preprocessing
np.random.seed(42)
doctor_ids = np.random.randint(1, 10, size=100)
patient_preferences = np.random.randint(0, 24, size=100)
availability = np.ones(100)  # Assuming availability is always 1 for simplicity
time_slots = (patient_preferences + np.random.randint(0, 3, size=100)) % 24  # Mock target variable

# Stack features together
X = np.stack([doctor_ids, patient_preferences, availability], axis=1)
y = time_slots

# Train a RandomForest model
model = RandomForestClassifier()
model.fit(X, y)

# Save the model to a file
joblib.dump(model, 'appointment_scheduler.pkl')
