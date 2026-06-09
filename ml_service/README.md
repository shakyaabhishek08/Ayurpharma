
# Ayurvedic ML Pipeline + Flask App

## What this includes
- TF-IDF + NearestNeighbors to match your input to the closest Symptom description.
- Rule-based medicine selection by matching the symptom to *Main Indications* in the formulations CSV.
- Fallback: TF-IDF similarity between your input text and *Main Indications* to pick the most relevant medicine.
- Dose and Precaution pulled directly from the same row of the formulations table.
- Trained KMeans clustering model on the Prakriti features (saved for later extension).

## Run locally
```bash
cd /mnt/data
python3 app.py
```
Open http://localhost:5000

## Files of interest
- app.py
- templates/index.html
- models/ (all pickles and helper CSVs)
