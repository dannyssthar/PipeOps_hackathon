import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Generate some synthetic data for demonstration
data = {
    'doctor_id': [1, 1, 1, 2, 2, 2],
    'patient_preference': [9, 14, 18, 10, 13, 17],
    'availability': [1, 0, 1, 1, 0, 1],  # 1 for available, 0 for not available
    'time_slot': [9, 14, 18, 10, 13, 17]  # This should be the label we predict
}

df = pd.DataFrame(data)

# Features and Labels
X = df[['doctor_id', 'patient_preference', 'availability']]
y = df['time_slot']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'appointment_scheduler.pkl')
