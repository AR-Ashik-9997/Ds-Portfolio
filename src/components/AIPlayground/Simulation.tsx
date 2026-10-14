/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { house_price_TabularInput, income_salary_TabularInput, InferenceResponse, ModelType } from '@/Shared/types/global_interface';
import { runAIInferenceAPI } from '@/Shared/types/aiService';


const AIPlayground = () => {
  const [selectedModel, setSelectedModel] = useState<ModelType>('brain_tumor');
  const [loading, setLoading] = useState<boolean>(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [jsonResponse, setJsonResponse] = useState<InferenceResponse | object>({
    status: 'ready',
    message: 'Select model and click Run FastAPI.'
  });
  const [selectedImages, setSelectedImages] = useState<string[]>(["https://i.ibb.co.com/s9PZZqQk/Tr-aug-me-46.jpg"]);
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);

  const [tabularPayload, setTabularPayload] = useState<string>(
    JSON.stringify(income_salary_TabularInput, null, 4)
  );

  const handleModelChange = (newModel: ModelType) => {
    setSelectedModel(newModel);
    setLatency(null);
    setJsonResponse({
      status: 'ready',
      message: 'Select model and click Run FastAPI.'
    });
    setImageFiles(null);
    setSelectedImages(["https://i.ibb.co.com/s9PZZqQk/Tr-aug-me-46.jpg"])
    if (newModel === 'income_salary') {
      setTabularPayload(JSON.stringify(income_salary_TabularInput, null, 4));
    } else if (newModel === 'house_price') {
      setTabularPayload(JSON.stringify(house_price_TabularInput, null, 4));
    }
  };

  const runFastAPIInference = async () => {
    setLoading(true);
    const startTime = performance.now();

    try {
      const { data } = await runAIInferenceAPI({
        selectedModel,
        tabularPayload,
        imageFile: imageFiles,
        selectedImage: selectedImages[0] || "",
        housePriceTemplate: house_price_TabularInput,
        incomeSalaryTemplate: income_salary_TabularInput,
      });

      const endTime = performance.now();
      const calculatedLatency = Math.round(endTime - startTime);

      setLatency(calculatedLatency);
      setJsonResponse({
        ...data,
        latency_ms: calculatedLatency,
      });
    } catch (err: any) {
      const endTime = performance.now();
      const calculatedLatency = Math.round(endTime - startTime);
      setLatency(calculatedLatency);
      setJsonResponse({
        message: err.message || 'Failed to connect to FastAPI backend. Make sure your server is running.',
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
            {selectedModel === 'brain_tumor' ? 'Sample Image Payload (Single or Multiple):' : 'Editable JSON Payload (Values Only):'}
          </label>

          {selectedModel === 'brain_tumor' ? (
            <div className="p-4 rounded-lg bg-gray-950 border border-dashed border-gray-800 space-y-2 overflow-x-auto text-left">
              <div className="text-center py-4 flex flex-col items-center">
                {/* Image Previews Container */}
                <div className="w-full min-h-28 mb-3 rounded-lg bg-gray-950 p-3 flex flex-wrap items-center justify-center gap-3">
                  {selectedImages.length > 0 ? (
                    selectedImages.map((url, idx) => (
                      <div key={idx} className="w-20 h-20 rounded-md border border-gray-700 overflow-hidden shrink-0 bg-gray-950 shadow-md">
                        <img src={url} alt={`Payload ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <i className="fa-solid fa-file-image text-gray-600 text-3xl"></i>
                  )}
                </div>

                <div className="flex flex-col items-center w-full my-3">
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 hover:text-teal-300 cursor-pointer transition-colors w-fit mx-auto"
                  >
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span>Upload custom image(s)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const filesArray = Array.from(files);

                        const allAreImages = filesArray.every((file) => file.type.startsWith('image/'));

                        if (!allAreImages) {
                          setErrorMessage("⚠️ Please select valid image files only. Non-image files are not allowed.");
                          setImageFiles([]);
                          setSelectedImages([]);
                          e.target.value = "";
                          return;
                        }

                        setErrorMessage(null);
                        setImageFiles(filesArray);
                        const urls = filesArray.map((file) => URL.createObjectURL(file));
                        setSelectedImages(urls);
                      }
                    }}
                  />
                  {errorMessage && (
                    <p className="text-xs font-mono text-red-500 flex items-center gap-1 mt-2 text-center animate-pulse">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>
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

          <button
            onClick={runFastAPIInference}
            disabled={loading || Boolean(errorMessage)}
            className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold font-mono text-xs rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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

        {/* Live JSON API Response Canvas with clear gaps between items */}
        <div className="lg:col-span-7 bg-gray-950 rounded-lg p-4 border border-gray-800 flex flex-col justify-start min-h-70">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-3 shrink-0">
            <span className="text-xs font-mono text-teal-300">
              Response Payload ({loading ? 'HTTP 102 Processing...' : 'HTTP 200 OK'})
            </span>
            <span
              id="latency-badge"
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 text-teal-300"
            >
              Latency: {latency !== null ? `${latency} ms` : '-- ms'}
            </span>
          </div>

          {/* Added data-lenis-prevent attribute here */}
          <div
            data-lenis-prevent
            className="overflow-x-auto overflow-y-auto flex-1 space-y-4 max-h-75 overscroll-contain pr-1"
          >
            {/* If response contains numeric index keys, render them with clear vertical gaps */}
            {selectedModel === 'brain_tumor' && typeof jsonResponse === 'object' && jsonResponse !== null && !('status' in jsonResponse) ? (
              <div className="space-y-4">
                {Object.entries(jsonResponse).map(([key, value]) => {
                  if (key === 'latency_ms') return null;
                  return (
                    <div key={key} className="p-3 bg-gray-950/60 border border-teal-800/80 rounded-lg space-y-1">
                      <div className="text-[11px] font-mono text-teal-400 font-semibold mb-1">
                        Image Index [{key}]:
                      </div>
                      <pre className="text-xs font-mono text-teal-300 leading-relaxed whitespace-pre-wrap">
                        {JSON.stringify(value, null, 4)}
                      </pre>
                    </div>
                  );
                })}
                {/* Latency info at the bottom if present */}
                {'latency_ms' in jsonResponse && (
                  <div className="text-[11px] font-mono text-gray-400 pt-2 border-t border-gray-800/60">
                    latency_ms: {(jsonResponse as any).latency_ms}
                  </div>
                )}
              </div>
            ) : (
              <pre
                id="json-response"
                className="text-xs font-mono text-teal-300 leading-relaxed whitespace-pre-wrap"
              >
                {JSON.stringify(jsonResponse, null, 4)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIPlayground;