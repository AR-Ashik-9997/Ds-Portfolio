/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { ModelType } from "./global_interface";


interface InferenceParams {
  selectedModel: ModelType;
  tabularPayload: string;
  imageFile: File | null;
  selectedImage: string;
  housePriceTemplate: any;
  incomeSalaryTemplate: any;
}

export const runAIInferenceAPI = async ({
  selectedModel,
  tabularPayload,
  imageFile,
  selectedImage,
  housePriceTemplate,
  incomeSalaryTemplate,
}: InferenceParams) => {
  const baseUrl = process.env.NEXT_PUBLIC_FASTAPI_URL || '';
  const brainTumorEndpoint = process.env.NEXT_PUBLIC_BTAIN_TUMOR_MODEL_URL || '';

  const endpointMap: Record<ModelType, string> = {
    brain_tumor: `${brainTumorEndpoint}/predict/images`,
    income_salary: `${baseUrl}/predict/classification`,
    house_price: `${baseUrl}/predict/regression`,
  };

  const fastapiEndpoint = endpointMap[selectedModel] || baseUrl;
  let requestBody: any;
  let requestHeaders: Record<string, string> = {};

  if (selectedModel === 'brain_tumor') {
    const formData = new FormData();
    formData.append('model_type', selectedModel);

    if (imageFile) {
      formData.append('file', imageFile);
    } else {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const defaultFile = new File([blob], "sample_brain_mri.jpg", { type: blob.type || "image/jpeg" });
        formData.append('file', defaultFile);
      } catch (fetchErr) {
        console.error("Failed to load default sample image blob:", fetchErr);
      }
    }
    requestBody = formData;
  } else {
    const parsedInputs = JSON.parse(tabularPayload);
    const activeOriginalTemplate = selectedModel === 'house_price' ? housePriceTemplate : incomeSalaryTemplate;
    const originalKeys = Object.keys(activeOriginalTemplate.inputs[0]).sort();
    const userKeys = parsedInputs?.inputs?.[0] ? Object.keys(parsedInputs.inputs[0]).sort() : [];

    if (
      parsedInputs.inputs.length !== 1 ||
      originalKeys.length !== userKeys.length ||
      !originalKeys.every((key, index) => key === userKeys[index])
    ) {
      throw new Error("Structure violation: You can only edit existing values. You cannot add or delete keys/fields.");
    }

    requestBody = JSON.stringify({
      model_type: selectedModel,
      ...parsedInputs
    });
    requestHeaders['Content-Type'] = 'application/json';
  }

  const apiResponse = await fetch(fastapiEndpoint, {
    method: 'POST',
    headers: requestHeaders,
    body: requestBody,
  });

  if (!apiResponse.ok) {
    throw new Error(`HTTP error! Status: ${apiResponse.status}`);
  }

  const data = await apiResponse.json();
  return { data, endpoint: fastapiEndpoint };
};