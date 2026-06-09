from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
import os, pickle, re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

# Load symptom matcher
with open(os.path.join(MODELS_DIR, "symptom_vectorizer.pkl"), "rb") as f:
    symptom_vectorizer = pickle.load(f)
with open(os.path.join(MODELS_DIR, "symptom_nn.pkl"), "rb") as f:
    symptom_nn = pickle.load(f)

symptoms_lookup = pd.read_csv(os.path.join(MODELS_DIR, "symptoms_lookup.csv"))
formulations_table = pd.read_csv(os.path.join(MODELS_DIR, "formulations_table.csv"))

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Precompute vectorizer for formulations indications for fallback similarity
ind_texts = formulations_table["Main Indications"].fillna("").astype(str).tolist()
ind_vectorizer = TfidfVectorizer(min_df=1, ngram_range=(1,2))
ind_tfidf = ind_vectorizer.fit_transform(ind_texts)

app = Flask(__name__, template_folder="templates", static_folder="static")

def match_symptom(user_text: str):
    X = symptom_vectorizer.transform([user_text])
    dist, idx = symptom_nn.kneighbors(X, n_neighbors=1)
    i = int(idx[0][0])
    return symptoms_lookup.loc[i, "Symptom"], symptoms_lookup.loc[i, "Description"], float(dist[0][0])

def find_medicine_by_symptom(symptom: str):
    # Direct rule-based match on Main Indications
    mask = formulations_table["Main Indications"].astype(str).str.contains(symptom, case=False, na=False, regex=False)
    if mask.any():
        row = formulations_table[mask].iloc[0]
        return row["Name of Medicine"], row.get("Dose", "Not available"), row.get("Precaution/ Contraindication", "Not available")
    return None, None, None

def find_medicine_by_similarity(user_text: str):
    Xq = ind_vectorizer.transform([user_text])
    sims = cosine_similarity(Xq, ind_tfidf)[0]
    top_idx = int(np.argmax(sims))
    row = formulations_table.iloc[top_idx]
    return row["Name of Medicine"], row.get("Dose", "Not available"), row.get("Precaution/ Contraindication", "Not available")

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json(force=True, silent=True) or {}
    text = data.get("text") or data.get("disease")
    if not text or not str(text).strip():
        return jsonify({"error": "Please provide a symptom or disease description."}), 400

    # 1) NLP symptom match
    symptom, description, dist = match_symptom(text)

    # 2) Try rule-based medicine lookup using matched symptom -> Main Indications
    med, dose, precaution = find_medicine_by_symptom(symptom)

    # 3) Fallback: use text similarity vs Main Indications
    if med is None:
        med, dose, precaution = find_medicine_by_similarity(text)

    return jsonify({
        "symptom": symptom,
        "symptom_explanation": description,
        "medicine": {"name": str(med), "dose": str(dose), "precaution": str(precaution)},
        "meta": {"symptom_similarity": round(1.0 - float(dist), 4)}
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
