// src/ComicGenerator.js

import React, { useState } from 'react';
import './style.css'; // Import your existing CSS file
const ComicPanel = ({ panelId, generateComic, comicPanels, generateSpeechBubble, comicBubble }) => {
    //console.log("ComicPanel start");
  const [panelText, setPanelText] = useState('');

  return (
    <div className="panel-container">
        <div id="photoContainer" className="mt-4">
            {comicBubble.map((panel) =>
              panel.id === panelId ? (
                <div class="text-container">
                    <p> {panel.panelText}</p>
                </div>
              ) : null
            )}
            {comicPanels.map((panel) =>
              panel.id === panelId ? (
                <img key={panel.id} src={panel.imageUrl} alt={`Comic Panel ${panel.id}`} />
              ) : null
            )}
        </div>
      <label htmlFor={panelId}>Panel {panelId}:</label>
      <textarea
        id={panelId}
        name="panels"
        value={panelText}
        onChange={(e) => setPanelText(e.target.value)}
        rows="4"
        cols="50"
        className="form-control"
      ></textarea>
      <button
        type="button"
        className="btn btn-primary mt-2"
        onClick={() => generateComic(panelId, panelText)}
      >
        Generate Panel {panelId}
      </button>
      <button
        type="button"
        className="btn btn-success mt-2"
        onClick={() => generateSpeechBubble(panelId, panelText)}
      >
        Speech Bubble
      </button>
    </div>
  );
};

const ComicGenerator = () => {
    const [comicPanels, setComicPanels] = useState([]);
    const [comicBubble, setComicBubble] = useState([]);
  
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

    const generateSpeechBubble = async (panelId, panelText) => {
        if (panelText.trim() !== '') {
            setComicBubble((prevTexts) => [
                ...prevTexts,
                { id: panelId, panelText },
            ]);
        }
    };

    const clearComic = () => {
      setComicPanels([]);
      setComicBubble([]);
    };
  
    return (
        <div className="container mt-5">
        <h1 className="mb-4">Comic Generator</h1>
        {/* <div id="photoContainer" className="mt-4">
          {comicPanels.map((panel) => (
            <img key={panel.id} src={panel.imageUrl} alt={`Comic Panel ${panel.id}`} />
          ))}
        </div> */}
        <div className="panel-controls">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((panelId) => (
            <ComicPanel key={panelId} panelId={panelId} generateComic={generateComic} comicPanels={comicPanels} 
                    generateSpeechBubble={generateSpeechBubble} comicBubble={comicBubble} />
          ))}
          <button type="button" className="btn btn-delete mt-4" onClick={clearComic}>
            Clear All
          </button>
        </div>
      </div>
    );
};

export default ComicGenerator;
