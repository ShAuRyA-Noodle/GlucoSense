// SOURCE OF TRUTH — All values from:
// "ML based Blood Glucose Level Detection using Microwave based sensors"
// Thapar Institute of Engineering and Technology, Patiala, India
// DO NOT add any value not directly from the paper.

export const PAPER_TITLE =
  "ML based Blood Glucose Level Detection using Microwave based sensors";

export const INSTITUTION =
  "Thapar Institute of Engineering and Technology, Patiala, India";

export const DEPARTMENT =
  "Department of Electronics and Communication Engineering";

// Only these three authors are displayed on the website.
export const AUTHORS: {
  name: string;
  email: string;
  role: string;
  initials: string;
  isPI?: boolean;
}[] = [
  {
    name: "Shaurya Punj",
    email: "spunj_be23@thapar.edu",
    role: "Research Contributor",
    initials: "SP",
  },
  {
    name: "Nidhi Upadhyay",
    email: "nupadhyay_phd22@thapar.edu",
    role: "PhD Scholar",
    initials: "NU",
  },
  {
    name: "Dr. Amanpreet Kaur",
    email: "amanpreet.kaur@thapar.edu",
    role: "Principal Investigator",
    initials: "AK",
    isPI: true,
  },
];

// Verbatim abstract from paper
export const ABSTRACT =
  "This article presents a new, painless way to monitor blood sugar levels without using needles. It uses a microwave based antenna as a sensor to detect changes in blood glucose levels. The changes in the S-parameters of the antenna are then used to train machine learning model like Logistic Regression, Random Forest, XGBoost, and CatBoost to predict the blood sugar level accurately. The study found that some models, especially CatBoost, work very well with an exceptional AUC of 0.97. Overall, this method that uses antenna as sensor for capturing S parameter data for varying blood glucose levels with Machine learning offer a safe, quick, and comfortable alternative for people with diabetes to regularly check their blood sugar levels.";

export const KEYWORDS = [
  "Non invasive Blood Glucose Monitoring",
  "Logistic Regression",
  "Random Forest",
  "XGBoost",
  "CatBoost",
];

// Epidemiological stats — from paper (citing Saeedi et al., 2019)
export const STATS = {
  worldwideDiabetics: 828_000_000,
  indiaDiabetics: 212_000_000,
  indiaFraction: "roughly a quarter",
} as const;

// Problem framing — verbatim from paper
export const PROBLEM_QUOTES = [
  {
    quote:
      "The measurement of BGL using needle can be uncomfortable as it causes pain, numb sensations, or can even cause shock to young people.",
    context: "On current fingerprick methods",
    accentColor: "#DC2626",
  },
  {
    quote:
      "There is lack in and inconsistency in comparison with finger stick method, easily affected by environmental factors for reverse iontophoresis, the experimental error ranges are exceptionally high for sonophoresis.",
    context: "On existing non-invasive alternatives",
    accentColor: "#F59E0B",
  },
] as const;

// The physics of microwave glucose sensing — verbatim from paper
export const PHYSICS_STEPS = [
  {
    number: "01",
    title: "Microwave Signal Emitted",
    body: "When the microwaves are emitted by the antenna it interacts with the blood in the tissues consisting of glucose molecule. These glucose molecules are polar in nature and thus in presence of an electric field they tend to align themselves in the direction of electric field in order to minimize the energy causing the molecules to vibrate or oscillate.",
    color: "#0891B2",
  },
  {
    number: "02",
    title: "Dielectric Property Shifts",
    body: "Blood's dielectric property changes with variations in BGL, indicating an in-proportion frequency shift because of the varying Blood glucose levels. This characteristic implies that the microwave sensor is ideally adapted for the non-invasive assessment of biological parameters, such as BGL.",
    color: "#22D3EE",
  },
  {
    number: "03",
    title: "S-Parameters Measured",
    body: "Relationship between the electric field during EM wave propagation and polar glucose molecules brings out the alterations in dielectric properties of the material that leads to the modifications in microwave signals. This can be measured and glucose level in specimen can be determined accordingly.",
    color: "#059669",
  },
  {
    number: "04",
    title: "Debye Model Applied",
    body: "Debye's model is used to describe the relationship between BGL and the blood plasma's dielectric characteristics, correlating the BGL in human tissues to dielectric properties of the blood.",
    color: "#8B5CF6",
  },
] as const;

// Full 7-stage pipeline from Fig. 1 flowchart in paper
export const PIPELINE_STEPS = [
  {
    step: 1,
    label: "Antenna Sensor",
    description:
      "Flexible microwave antenna on Rogers R5880 substrate with AMC backing captures S-parameter data from a 3-layer tissue phantom",
    tag: "Hardware",
  },
  {
    step: 2,
    label: "Feature Extraction",
    description:
      "S-parameter vs. frequency data is processed to extract relevant electromagnetic signal features for ML input",
    tag: "Processing",
  },
  {
    step: 3,
    label: "Data Preprocessing",
    description:
      "KNN imputation for missing values, Label Encoding for categorical variables, Min-Max scaling for numerical attributes. 80:20 train-test split.",
    tag: "Preprocessing",
  },
  {
    step: 4,
    label: "LSTM",
    description:
      "Long Short-Term Memory network processes spatial-temporal sequences of S-parameter data to capture time-dependent patterns",
    tag: "Deep Learning",
  },
  {
    step: 5,
    label: "Standardisation",
    description:
      "Stacked spatial-temporal features undergo standardisation and normalisation before optimal feature selection via weight optimisation",
    tag: "Optimisation",
  },
  {
    step: 6,
    label: "ML Inference",
    description:
      "CatBoost (AUC 0.97) or Random Forest (97.2% accuracy) predicts blood glucose level from the optimised feature set",
    tag: "ML Model",
  },
  {
    step: 7,
    label: "Raspberry Pi",
    description:
      "Wearable IoT device runs real-time, non-invasive BGL prediction using the trained model. MongoDB + MQTT for data storage and transfer.",
    tag: "IoT Edge",
  },
] as const;

// ML model performance — Table I and Table II from paper
export const ML_MODELS = [
  {
    name: "Logistic Regression",
    shortName: "Log. Reg.",
    auc: 0.93,
    accuracy: 95.0,
    precision: 79.6,
    recall: 52.4,
    f1: 63.2,
    color: "#64748B",
    highlight: null,
    note: null,
  },
  {
    name: "Random Forest",
    shortName: "Rand. Forest",
    auc: 0.95,
    accuracy: 97.2,
    precision: 100.0,
    recall: 65.8,
    f1: 79.4,
    color: "#22C55E",
    highlight: "highest-accuracy",
    note: "Highest accuracy (97.2%) — most effective traditional ML model",
  },
  {
    name: "XGBoost",
    shortName: "XGBoost",
    auc: 0.96,
    accuracy: 96.8,
    precision: 85.7,
    recall: 73.1,
    f1: 78.9,
    color: "#F59E0B",
    highlight: "best-balance",
    note: "Best precision/recall balance — reliable with fewer false positives and negatives",
  },
  {
    name: "CatBoost",
    shortName: "CatBoost",
    auc: 0.97,
    accuracy: 97.1,
    precision: 94.9,
    recall: 68.2,
    f1: 79.4,
    color: "#0891B2",
    highlight: "highest-auc",
    note: "Highest AUC (0.97) — best class discrimination across thresholds",
  },
  {
    name: "TabNet",
    shortName: "TabNet",
    auc: null,
    accuracy: 41.5,
    precision: 12.2,
    recall: 100.0,
    f1: 21.9,
    color: "#8B5CF6",
    highlight: "perfect-recall",
    note: "Perfect recall (100%) — useful for risk-averse screening where missing a diabetic case is critical",
  },
] as const;

// Hardware specs — from paper
export const HARDWARE = {
  antennaSubstrate: "Rogers R5880",
  antennaType: "Flexible antenna with AMC (Artificial Magnetic Conductor) backing",
  simulationTool: "CST MWS V'23",
  phantomLayers: 3,
  iotDevice: "Raspberry Pi",
  signalType: "Microwave S-Parameters",
  iotDescription:
    "IoT-based monitoring system using Raspberry Pi implemented for real-time, non-invasive glucose detection",
} as const;

export const IOT_STACK = [
  { tech: "MongoDB", role: "NoSQL — stores glucose data efficiently" },
  { tech: "MQTT Protocol", role: "Latent-free data transfer" },
  { tech: "Raspberry Pi", role: "Edge computing — real-time prediction" },
] as const;

// Prior work — from literature review in paper
export const PRIOR_WORK = [
  {
    tech: "Narrowband microwave sensor",
    frequency: "1.3 GHz",
    metric: "R² = 0.75",
    source: "Deshmukh & Chorage, 2021",
  },
  {
    tech: "Triple-band monopole antenna",
    frequency: "2.9 / 4.3 / 6.5 GHz",
    metric: "19.43 MHz/mg/dL sensitivity",
    source: "Sharaf et al., 2025",
  },
  {
    tech: "UWB patch antenna (CMT)",
    frequency: "3.15–10.55 GHz",
    metric: "Robust across body conditions",
    source: "Modak et al., 2024",
  },
] as const;

// Verbatim conclusions from paper
export const CONCLUSIONS = {
  bestAUC:
    "CatBoost Algorithm showed the best performance in terms of AUC as 0.97.",
  bestAccuracy:
    "Random-forest achieved the highest accuracy (97.2 percent), making it the most effective traditional ML model.",
  xgboost:
    "XGBoost balanced precision and recall, ensuring reliable predictions with fewer false positives and false negatives.",
  tabnet:
    "TabNet showed poor accuracy but achieved 100 percent recall, making it useful for risk-averse predictions where missing a diabetic case is critical.",
  catboost:
    "CatBoost outperformed XGBoost in categorical feature handling, demonstrating robustness in structured data.",
} as const;

export const FUTURE_WORK =
  "Testing the models on larger and more diverse datasets, including data from real human subjects, would be crucial to validate these findings and assess the generalizability of the models.";
