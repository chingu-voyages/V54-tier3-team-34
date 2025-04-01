import { useEffect } from "react";

export function AiService({ apiHandler, formData, isSubmitted, setIsSubmitted, setResponse }) {
  useEffect(() => {
    async function fetchAIResponse() {
      if (!isSubmitted) return;
      try {
        const response = await apiHandler(formData);
        setResponse(response);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setResponse("**Error:** Unable to fetch response");
      } finally {
        setIsSubmitted(false);
      }
    }
    fetchAIResponse();
  }, [isSubmitted, formData, setIsSubmitted, apiHandler, setResponse]);

  return null; 
}