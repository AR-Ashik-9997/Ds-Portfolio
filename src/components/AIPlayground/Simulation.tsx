'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-comment-textnodes */
import { useState } from 'react';

type ModelType = 'brain_tumor' | 'income_salary' | 'house_price';

interface PredictionDetails {
  label: string;
  confidence: number;
  probabilities?: Record<string, number>;
}

interface InferenceResponse {
  status: string;
  model_id: string;
  timestamp: string;
  latency_ms: number;
  input_tensor_shape?: string;
  predictions?: PredictionDetails;
  model_metadata?: {
    framework: string;
    device: string;
  };
  error?: string;
  message?: string;
}

const AIPlayground = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>('brain_tumor');
  const [loading, setLoading] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [jsonResponse, setJsonResponse] = useState<InferenceResponse | object>({
    status: 'ready',
    message: 'Select model and click Run FastAPI.'
  });

  // Original templates to prevent adding/deleting keys
  const income_salary_TabularInput = {
    inputs: [
      {
        age: 30,
        "capital-gain": 0,
        "capital-loss": 0,
        education: "Bachelors",
        "education-num": 13,
        fnlwgt: 200000,
        "hours-per-week": 40,
        "marital-status": "Never-married",
        "native-country": "United-States",
        occupation: "Exec-managerial",
        race: "White",
        relationship: "Not-in-family",
        sex: "Male",
        workclass: "Private"
      }
    ]
  };

  const house_price_TabularInput = {
    inputs: [
      {
        "Square_Footage": 2100,
        "Num_Bedrooms": 3,
        "Num_Bathrooms": 2.5,
        "Stories": 2,
        "Year_Built": 2015,
        "Garage_Size": 2,
        "Lot_Size": 6500,
        "Property_Type": "Single-Family",
        "Neighborhood_Quality": 8,
        "Has_Pool": 1,
        "Has_Fireplace": 1,
        "Condition": "Excellent"
      }
    ]
  };

  const [tabularPayload, setTabularPayload] = useState<string>(
    JSON.stringify(income_salary_TabularInput, null, 2)
  );

  // Handle model change and update text area payload accordingly
  const handleModelChange = (newModel: ModelType) => {
    setSelectedModel(newModel);
    if (newModel === 'income_salary') {
      setTabularPayload(JSON.stringify(income_salary_TabularInput, null, 2));
    } else if (newModel === 'house_price') {
      setTabularPayload(JSON.stringify(house_price_TabularInput, null, 2));
    }
  };

  // FastAPI REST API Request Function
  const runFastAPIInference = async () => {
    setLoading(true);
    const startTime = performance.now();

    // FastAPI Backend Endpoint
    const baseUrl = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://127.0.0.1:8000';
    const endpointMap: Record<ModelType, string>
      = {
      brain_tumor: `${baseUrl}/predict/brain-tumor`,
      income_salary: `${baseUrl}/predict/classification`,
      house_price: `${baseUrl}/predict/regression`,
    }
    const fastapiEndpoint = endpointMap[selectedModel] || baseUrl;
    let requestBody;
    try {
      if (selectedModel === 'brain_tumor') {
        requestBody = {
          model_type: selectedModel,
          input_tensor_shape: [1, 3, 224, 224]
        };
      } else {
        const parsedInputs = JSON.parse(tabularPayload);

        // Validation: Check if structure matches and no keys are added/deleted based on selected model
        const activeOriginalTemplate = selectedModel === 'house_price' ? house_price_TabularInput : income_salary_TabularInput;
        const originalKeys = Object.keys(activeOriginalTemplate.inputs[0]).sort();
        const userKeys = parsedInputs?.inputs?.[0] ? Object.keys(parsedInputs.inputs[0]).sort() : [];

        if (
          parsedInputs.inputs.length !== 1 ||
          originalKeys.length !== userKeys.length ||
          !originalKeys.every((key, index) => key === userKeys[index])
        ) {
          throw new Error("Structure violation: You can only edit existing values. You cannot add or delete keys/fields.");
        }

        requestBody = {
          model_type: selectedModel,
          ...parsedInputs
        };
      }
    } catch (err: any) {
      setLoading(false);
      setLatency(0);
      setJsonResponse({
        status: 'error',
        message: err.message || 'Invalid JSON format or structure modification detected.',
        timestamp: new Date().toISOString()
      });
      return;
    }

    try {
      const apiResponse = await fetch(fastapiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! Status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      const endTime = performance.now();
      const calculatedLatency = Math.round(endTime - startTime);

      setLatency(calculatedLatency);
      setJsonResponse({
        ...data,
        timestamp: data.timestamp || new Date().toISOString(),
        latency_ms: calculatedLatency,
      });
    } catch (error) {
      const endTime = performance.now();
      const calculatedLatency = Math.round(endTime - startTime);
      setLatency(calculatedLatency);
      setJsonResponse({
        status: 'error',
        message: `Failed to connect to FastAPI backend at ${fastapiEndpoint}. Make sure your server is running.`,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="playground"
      className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/60"
    >
      <div className="mb-10">
        <h2 className="text-xs font-mono text-teal-400 tracking-widest uppercase mb-2">
          // Interactive Inference
        </h2>
        <h3 className="text-2xl font-bold text-white">
          Live AI Model Testing Playground (FastAPI Connected)
        </h3>
      </div>

      <div className="glass-card rounded-xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Controls */}
        <div className="lg:col-span-5 space-y-4">
          <label className="block text-xs font-mono text-gray-300">
            Select Simulated ML Model Pipeline:
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value as ModelType)}
            className="w-full bg-gray-950 border border-gray-800 text-gray-200 text-xs font-mono rounded-lg p-3 focus:outline-none focus:border-teal-500"
          >
            <option value="brain_tumor">
              PyTorch Brain Tumor Classifier (CNN v2)
            </option>
            <option value="income_salary">
              Income Salary Prediction Model (Tabular)
            </option>
            <option value="house_price">
              House Price Prediction Model (Tabular)
            </option>
          </select>

          <label className="block text-xs font-mono text-gray-300">
            {selectedModel === 'brain_tumor' ? 'Sample Image Payload:' : 'Editable JSON Payload (Values Only):'}
          </label>
          <div className="p-4 rounded-lg bg-gray-950 border border-dashed border-gray-800 space-y-2 overflow-x-auto text-left">
            {selectedModel === 'brain_tumor' ? (
              <div className="text-center py-4">
                <i className="fa-solid fa-file-image text-gray-600 text-2xl"></i>
                <p className="text-xs text-gray-400 font-mono mt-2">
                  Simulated Image Tensor:{' '}
                  <span className="text-teal-400">[1, 3, 224, 224]</span>
                </p>
              </div>
            ) : (
              <textarea
                value={tabularPayload}
                onChange={(e) => setTabularPayload(e.target.value)}
                rows={20}
                className="w-full bg-gray-950 text-teal-300 text-[11px] font-mono p-2 rounded border border-gray-800 focus:outline-none focus:border-teal-500 resize-y"
                placeholder="Edit existing values only..."
              />
            )}
          </div>

          <button
            onClick={runFastAPIInference}
            disabled={loading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold font-mono text-xs rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i> Requesting FastAPI...
              </>
            ) : (
              <>
                <i className="fa-solid fa-bolt"></i> Run FastAPI Inference Request
              </>
            )}
          </button>
        </div>

        {/* Live JSON API Response Canvas */}
        <div className="lg:col-span-7 bg-gray-950 rounded-lg p-4 border border-gray-800 flex flex-col justify-between min-h-70">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3">
            <span className="text-xs font-mono text-gray-400">
              Response Payload ({loading ? 'HTTP 102 Processing...' : 'HTTP 200 OK'})
            </span>
            <span
              id="latency-badge"
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 text-gray-500"
            >
              Latency: {latency !== null ? `${latency} ms` : '-- ms'}
            </span>
          </div>
          <pre
            id="json-response"
            className="text-xs font-mono text-teal-300 overflow-x-auto leading-relaxed flex-1"
          >
            {JSON.stringify(jsonResponse, null, 2)}
          </pre>
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;