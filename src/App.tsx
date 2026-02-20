import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function App() {
const [image, setImage] = useState(null);
const [analysis, setAnalysis] = useState("");
const [loading, setLoading] = useState(false);

const handleImage = (e) => {
const file = e.target.files?.[0];
if (file) {
const reader = new FileReader();
reader.onloadend = () => setImage(reader.result);
reader.readAsDataURL(file);
}
};

const runAnalysis = async () => {
if (!image) return;
setLoading(true);
try {
// @ts-ignore
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const base64Data = image.split(',')[1];
const result = await model.generateContent([
"Agis en expert vétérinaire équin. Analyse cette radio.",
{ inlineData: { data: base64Data, mimeType: "image/jpeg" } }
]);
setAnalysis(result.response.text());
} catch (err) {
setAnalysis("Erreur. Vérifiez votre clé API sur Vercel.");
}
setLoading(false);
};

return (
<div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
<h1 style={{ color: '#10b981' }}>Equi. Expertise</h1>
<div style={{ border: '2px dashed #ccc', padding: '20px', borderRadius: '20px' }}>
<input type="file" onChange={handleImage} accept="image/*" />
{image && <img src={image} style={{ width: '100%', maxWidth: '300px', marginTop: '20px' }} />}
{image && !loading && <button onClick={runAnalysis} style={{ display: 'block', margin: '20px auto', padding: '10px 20px' }}>Lancer l'expertise</button>}
{loading && <p>Analyse en cours...</p>}
</div>
{analysis && <div style={{ marginTop: '20px', textAlign: 'left', background: '#f0f0f0', padding: '15px' }}>{analysis}</div>}
</div>
);
}
