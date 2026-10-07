'use client';

/* eslint-disable react/jsx-no-comment-textnodes */
import  { useState } from 'react';

type ModelType = 'brain_tumor' | 'age_classifier';

interface PredictionDetails {
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
}

interface InferenceResponse {
  status: string;
  model_id: string;
  timestamp: string;
  latency_ms: number;
  input_tensor_shape: string;
  predictions?: PredictionDetails;
  model_metadata?: {
    framework: string;
    device: string;
  };
  error?: string;
}

const AIPlayground = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>('brain_tumor');
  const [loading, setLoading] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [jsonResponse, setJsonResponse] = useState<InferenceResponse | object>({
    status: 'ready',
    message: 'Select model and click Run Inference to trigger backend payload.'
  });

  // REST API Request Function
  const runSimulatedInference = async () => {
    setLoading(true);
    const startTime = performance.now();

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

      if (!apiKey) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        const endTime = performance.now();
        const calculatedLatency = Math.round(endTime - startTime);

        setLatency(calculatedLatency);
        setJsonResponse({
          status: 'success',
          model_id: selectedModel === 'brain_tumor' ? 'brain_tumor_cnn_v2' : 'faces_age_classifier_v1',
          timestamp: new Date().toISOString(),
          latency_ms: calculatedLatency,
          input_tensor_shape: '[1, 3, 224, 224]',
          predictions: selectedModel === 'brain_tumor'
            ? {
                label: 'Glioma Tumor',
                confidence: 0.9842,
                probabilities: { Glioma: 0.9842, Meningioma: 0.0112, No_Tumor: 0.0031, Pituitary: 0.0015 }
              }
            : {
                label: '25-32 years',
                confidence: 0.9415,
                probabilities: { '18-24': 0.042, '25-32': 0.9415, '38-45': 0.0125, '48+': 0.004 }
              },
          model_metadata: {
            framework: 'PyTorch 2.2.1+cu121',
            device: 'NVIDIA RTX 4090'
          }
        });
        return;
      }

      // REST API POST Call to Gemini AI Endpoint
      const promptText = `Act as an AI Machine Learning Inference REST API server. 
Generate a realistic inference response JSON for the model: ${
        selectedModel === 'brain_tumor' ? 'PyTorch Brain Tumor Classifier (CNN v2)' : 'Faces Age-Group Detection Model'
      }.
Output purely valid JSON in this structure:
{
  "status": "success",
  "model_id": "${selectedModel}",
  "input_tensor_shape": "[1, 3, 224, 224]",
  "predictions": {
    "label": "<predicted_class>",
    "confidence": <confidence_score_between_0_and_1>,
    "probabilities": { "<class1>": <prob1>, "<class2>": <prob2>, "<class3>": <prob3> }
  },
  "model_metadata": {
    "framework": "PyTorch 2.2.1+cu121",
    "device": "NVIDIA RTX 4090"
  }
}
Do NOT include markdown block or code formatting, return plain JSON.`;

      const apiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptText }]
              }
            ]
          })
        }
      );

      const data = await apiResponse.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleanJson = rawText.replace(/```json|```/g, '').trim();

      const endTime = performance.now();
      const calculatedLatency = Math.round(endTime - startTime);

      const parsedData = JSON.parse(cleanJson);
      setLatency(calculatedLatency);
      setJsonResponse({
        ...parsedData,
        timestamp: new Date().toISOString(),
        latency_ms: calculatedLatency
      });
    } catch (error) {
      const endTime = performance.now();
      const calculatedLatency = Math.round(endTime - startTime);
      setLatency(calculatedLatency);
      setJsonResponse({
        status: 'error',
        message: 'REST API Request Failed',
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
          Live AI Model Testing Playground
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
            onChange={(e) => setSelectedModel(e.target.value as ModelType)}
            className="w-full bg-gray-950 border border-gray-800 text-gray-200 text-xs font-mono rounded-lg p-3 focus:outline-none focus:border-teal-500"
          >
            <option value="brain_tumor">
              PyTorch Brain Tumor Classifier (CNN v2)
            </option>
            <option value="age_classifier">
              Faces Age-Group Detection Model
            </option>
          </select>

          <label className="block text-xs font-mono text-gray-300">
            Sample Image Payload:
          </label>
          <div className="p-4 rounded-lg bg-gray-950 border border-dashed border-gray-800 text-center space-y-2">
            <i className="fa-solid fa-file-image text-gray-600 text-2xl"></i>
            <p className="text-xs text-gray-400 font-mono">
              Simulated Image Tensor:{' '}
              <span className="text-teal-400">[1, 3, 224, 224]</span>
            </p>
          </div>

          <button
            onClick={runSimulatedInference}
            disabled={loading}
            className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold font-mono text-xs rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i> Fetching REST Response...
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