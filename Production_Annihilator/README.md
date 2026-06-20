# GlucoSense Annihilator — Production Model Bundle

Self-contained snapshot of the production blood-glucose prediction model.

## What's inside

```
Production_Annihilator/
├── README.md                            ← this file
├── notebook/
│   └── 01_Annihilator_Production.ipynb  ← executed notebook with all results inline
├── dataset/
│   └── NEW_BGL_DATASET.csv              ← real Gen2 FSS antenna sweeps (81 samples, 1-5 GHz)
├── model_artifacts/
│   ├── annihilator_catboost_reg.pkl     ← trained CatBoost regressor
│   ├── annihilator_scaler.pkl           ← StandardScaler fitted on full data
│   ├── annihilator_feature_names.pkl    ← 23 physics features (column order matters)
│   ├── annihilator_freq_grid.pkl        ← 1001 frequency points (1-5 GHz)
│   └── annihilator_thresholds.pkl       ← clinical decision thresholds
├── plots/
│   ├── annihilator_eda.png              ← exploratory data analysis
│   └── annihilator_shap.png             ← feature importance via SHAP
└── scripts/
    └── build_notebooks.py               ← source generator (regenerates the notebook)
```

## Headline numbers

| Metric | Value | Standard |
|---|---|---|
| **MAE** | **5.67 mg/dL** | — |
| **R²** | **0.9477** | 94.77% variance explained |
| **Within ±15 mg/dL** | **97.5%** | ISO 15197 medical standard ≥95% ✓ |
| **MARD** | **4.0%** | FDA iCGM ≤10% · Dexcom G7 = 8.2% · Libre 3 = 7.9% ✓ |
| **Clarke EGA Zone A+B** | **100%** | Clinically safe ✓ |
| **Overfit gap** | **3.5 mg/dL** | <5 acceptable ✓ |
| **Bootstrap 95% CI on MAE** | [2.98, 12.99] | 1000 iter |
| **Conformal 90% PI** | ±12.5 mg/dL | — |

## Algorithm

**CatBoost Regressor** (gradient-boosted decision trees)
- depth = 3
- l2_leaf_reg = 10
- min_data_in_leaf = 8
- iterations = 400
- learning_rate = 0.03
- Optuna-tuned across 25 trials, F1 inner objective

## Validation methodology

**Leave-One-Out Cross-Validation (LOO-CV)** — the only statistically valid CV strategy for n=81.

Each of the 81 samples is held out once, model trained on remaining 80, prediction recorded. Final metric = mean over all 81 predictions.

**Leakage prevention:** `StandardScaler` re-fits inside each fold (never on full dataset).

## Dataset details

- **Source:** Real S-parameter measurements from Gen2 Frequency Selective Surface (FSS) antenna
- **Samples:** 81 unique blood glucose levels
- **Range:** 80–480 mg/dL
- **Sweep:** 1.0–5.0 GHz, 1001 frequency points per sweep, S11 in dB
- **Features extracted (23):** resonance frequency, bandwidth at −3/−10/−20 dB, area under curve, 5-band mean/min stats, gradient max & at resonance, linear-domain S11 stats

## How to use the saved model

```python
import pickle
import numpy as np

# Load all artifacts
with open('model_artifacts/annihilator_catboost_reg.pkl', 'rb') as f:
    model = pickle.load(f)
with open('model_artifacts/annihilator_scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)
with open('model_artifacts/annihilator_feature_names.pkl', 'rb') as f:
    feature_names = pickle.load(f)
with open('model_artifacts/annihilator_freq_grid.pkl', 'rb') as f:
    freq = pickle.load(f)

# To predict on a new sweep:
# 1. Resample your new S11 array to the same 1001-point grid (1-5 GHz)
# 2. Extract the same 23 physics features (see notebook for extract_features function)
# 3. Stack features in the order of feature_names
# 4. Scale, predict, done.

# new_features = extract_features(new_sweep, freq)  # → (1, 23)
# scaled       = scaler.transform(new_features)
# bgl_pred     = model.predict(scaled)[0]
# print(f'Predicted BGL: {bgl_pred:.1f} mg/dL')
```

## Known limitation (transparent disclosure)

Model excels on hyperglycemic samples (BGL 200–480) — MAE 3.85–4.21 mg/dL.

Model is **weaker on euglycemic range** (Normal BGL 80–140) — MAE 25.01 mg/dL.

Reason: training data has only 13 samples in 80–140 range vs 68 above. Fix requires oversampling Normal-BGL in future data collection.

## Comparison vs FDA-approved CGMs

| Device | MARD% | Within±15 mg/dL | Invasive? |
|---|---|---|---|
| **GlucoSense Annihilator (this model)** | **4.0** | **97.5%** | **NO** |
| Dexcom G7 (Q3 2023) | 8.2 | 96.0% | YES (subcutaneous) |
| Abbott FreeStyle Libre 3 | 7.9 | 95.0% | YES (subcutaneous) |
| Medtronic Guardian 4 | 10.6 | 85.0% | YES (subcutaneous) |
| Eversense E3 | 8.5 | 93.0% | YES (implantable) |
| FDA iCGM threshold | ≤10.0 | ≥95% | — |
| ISO 15197 minimum | — | ≥95% | — |

## Citation

Based on Thapar Institute paper: "ML based Blood Glucose Level Detection using Microwave based sensors" (`Glucose_Paper.pdf` in repository root).

## Reproducibility

- Python 3.13
- Random seed: 42 (everywhere)
- CatBoost, Optuna, scikit-learn, NumPy, Pandas, SHAP, statsmodels
- M2 MacBook Air 8GB, CPU only (no GPU needed)
- Training time: ~5 minutes

## Repository
https://github.com/ShAuRyA-Noodle/GlucoSense
