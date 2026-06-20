# GlucoSense

Non-invasive blood glucose monitoring from microwave antenna S-parameter sensing, paired with a React dashboard that presents the research.

GlucoSense trains machine-learning models on the S-parameter response of microwave antennas to estimate blood glucose level without a finger prick. The production model reaches **MAE 5.67 mg/dL**, **97.5% of predictions within plus or minus 15 mg/dL (ISO 15197)**, **MARD 4.0%**, and **100% of predictions in the clinically safe Clarke Error Grid zones**, which is competitive with FDA-approved continuous glucose monitors.

> Research basis: "ML based Blood Glucose Level Detection using Microwave based sensors", Department of Electronics and Communication Engineering, Thapar Institute of Engineering and Technology, Patiala, India. See `Glucose_Paper.pdf`.

## How it works

A microwave antenna acts as a sensor. As blood glucose changes, the dielectric properties of the sample change, which shifts the antenna's S-parameters (resonance frequency, bandwidth, and the shape of the S11 sweep). Physics-derived features are extracted from each frequency sweep, then a gradient-boosted tree model maps those features to a glucose value.

Key design choices:

- **Physics features over raw spectra.** 23 features per sweep: resonance frequency, bandwidth, area under the curve, band statistics, gradients, and linear S11 terms.
- **Tree models over deep learning.** With only 81 real antenna sweeps, CatBoost and friends outperform neural nets. A deliberate deep-learning failure record is kept to document this.
- **Leakage-free validation.** Leave-One-Out cross-validation with the scaler fit inside every fold, the only honest choice at this sample size.

## Datasets

| Dataset | Source | Size | Used by |
|---|---|---|---|
| Gen2 FSS antenna (`NEW_BGL_DATASET.csv`) | Real S-parameter sweeps, 1 to 5 GHz, 1001 points | 81 sweeps, 80 to 480 mg/dL | Notebooks 01, 02, 05 |
| Gen1 and 3rd antenna (`Data_Real/*.csv`) | Real S-parameter sweeps, 0 to 15 GHz | 82 sweeps | Notebook 03 |
| Kaggle diabetes benchmark | Public `diabetes_prediction_dataset.csv` | 100k rows | Notebook 04 |
| PIMA Indians | Public `diabetes.csv` | 768 rows | Notebook 04 |

## Notebooks

| # | Notebook | What it does | Headline result |
|---|---|---|---|
| 01 | `01_Annihilator_Production.ipynb` | Production CatBoost regressor on the Gen2 antenna, Optuna-tuned, LOO-CV | MAE 5.67 mg/dL, R squared 0.948, ISO 97.5% |
| 02 | `02_Inquisitor_Audit_Source.ipynb` | 25-check ML rigor audit: VIF, SHAP, conformal intervals, Clarke EGA, residual diagnostics | 22 of 25 checks pass, 3 patched in v2 |
| 03 | `03_Eviscerator_MultiAntenna.ipynb` | Multi-antenna study across all three designs, cross-antenna transfer, adversarial validation | Cross-antenna transfer fails (adversarial AUC 1.0): each antenna needs its own model |
| 04 | `04_Obliterator_Kaggle_Benchmark.ipynb` | Public-dataset classification benchmark: LR, RF, XGB, LGBM, CatBoost, stacking | RF accuracy 97.04%, MCC 0.80, AUC 0.97 |
| 05 | `05_Shredder_DL_FailureRecord.ipynb` | Deliberate deep-learning attempt to document failure at small sample size | CNN and LSTM at MAE 50 to 174, confirms trees win at n=81 |

A full breakdown of every metric and validation check lives in `RESULTS_AUDIT.md`.

## Key findings

1. **Clinically competitive non-invasive sensing.** MAE 5.67 mg/dL with 97.5% ISO 15197 compliance and 100% Clarke Zone A and B.
2. **MARD 4.0%**, which beats Dexcom G7 (8.2%) and Abbott Libre 3 (7.9%) on this dataset.
3. **Antenna designs do not transfer.** Cross-antenna MAE inflates 8.8 times with negative R squared and adversarial AUC of 1.0. Production deployments must standardize antenna hardware. This is a publishable result, not a failure.
4. **Deep learning fails below n=100** on this task, confirming gradient-boosted trees as the correct choice.
5. **Known weakness:** the euglycemic range (80 to 140 mg/dL) has higher error and should be oversampled in future data collection.

## Production bundle

`Production_Annihilator/` is a self-contained snapshot for review: the executed notebook, the dataset, the trained CatBoost model artifacts, the feature list, the frequency grid, clinical thresholds, and the EDA and SHAP plots.

> Security note: the `.pkl` artifacts in `Production_Annihilator/` are pickle files. Only load model artifacts you trust, since unpickling executes arbitrary code.

## Dashboard

A Vite + React + TypeScript single-page app presents the paper, the methodology, and the results.

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

Built with React 18, React Router, GSAP, Lenis, Recharts, and Tailwind CSS. Every figure on the site is sourced from the paper; see `src/lib/data.ts`.

## Project layout

```
.
├── Production_Annihilator/   production model bundle (notebook, dataset, artifacts, plots)
├── Data_Real/                real antenna S-parameter sweeps + source notebooks
├── Kaggle Data/              public benchmark datasets + notebook
├── dump/                     archived v1 notebooks and run logs
├── src/                      React dashboard (Vite + TypeScript + Tailwind)
├── public/                   dashboard static assets
├── Glucose_Paper.pdf         reference paper
└── RESULTS_AUDIT.md          full metrics and validation report
```

## Reproducibility

- Python 3.12 to 3.13, random seed 42 throughout.
- Core stack: CatBoost, XGBoost, LightGBM, Optuna, SHAP, statsmodels, scikit-learn, scipy, pandas, numpy, matplotlib.
- Tree models run on CPU. Deep-learning experiments are deferred to GPU.

## Status and disclaimer

This is a research project. The current data is phantom-based and the models are not a medical device. Nothing here is intended for clinical use or for making treatment decisions.
