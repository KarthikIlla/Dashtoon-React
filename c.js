// src/ComicGenerator.js

import React, { useState } from 'react';
import './style.css';
const ComicPanel = ({ panelId, generateComic }) => {
    const [panelText, setPanelText] = useState('');

    return (
      <div className="panel-container">
        <label htmlFor={panelId}>Panel {panelId}:</label>
        <textarea
          id={panelId}
          name="panels"
          value={panelText}
          onChange={(e) => setPanelText(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
        <button
          type="button"
          className="btn btn-primary mt-2"
          onClick={() => generateComic(panelId, panelText)}
        >
          Generate Panel {panelId}
        </button>
      </div>
    );
};

const ComicGenerator = () => {
    const [comicPanels, setComicPanels] = useState([]);
    const panelIds = Array.from({ length: 10 }, (_, index) => index + 1);
  
    const queryAPI = async (data) => {
        console.log("Querying API with data:", data);

        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: {
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        const result = await response.blob();
        console.log("API response:", result);
        return result;
    };
  
    const generateComic = async (panelId, panelText) => {
      if (panelText.trim() !== '') {
        const data = { inputs: panelText };
  
        try {
          const imageBlob = await queryAPI(data);
          const imageUrl = URL.createObjectURL(imageBlob);
  
          setComicPanels((prevPanels) => [
            ...prevPanels,
            { id: panelId, imageUrl },
          ]);
        } catch (error) {
          console.error('Error generating comic:', error);
        }
      }
    };
  
    const clearComic = () => {
      setComicPanels([]);
    };
  
    return (
      <div className="container mt-5">
        <h1 className="mb-4">Comic Generator</h1>
        {panelIds.map((panelId) => (
          <ComicPanel key={panelId} panelId={panelId} generateComic={generateComic} />
        ))}
        <button type="button" className="btn btn-success mt-4" onClick={clearComic}>
          Clear generated panels
        </button>
        <div className="mt-4">
          {comicPanels.map((panel) => (
            <img key={panel.id} src={panel.imageUrl} alt={`Comic Panel ${panel.id}`} />
          ))}
        </div>
      </div>
    );
};

export default ComicGenerator;
