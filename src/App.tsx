import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UploadCloud } from 'lucide-react';

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
const apiKey = import.meta.env.VITE_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const base64Data = image.split(',')[1];
const result = await model.generateContent([
"Analyse cette radio de cheval en tant qu'expert.",
{ inlineData: { data: base64Data, mimeType: "image/jpeg" } }
]);
setAnalysis(result.response.text());
} catch (err) {
setAnalysis("Erreur. Vérifiez la clé API sur Vercel.");
}
setLoading(false);
};

return (
<div style={{ minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
<nav style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
<span style={{ fontWeight: 'bold', fontSize: '24px', color: '#10b981' }}>Equi.</span>
<div style={{ color: '#10b981', fontWeight: 'bold' }}>SÉCURISÉ</div>
</nav>
<main style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
<h1>Expertise <span style={{ color: '#10b981' }}>Radiographique</span></h1>
<div style={{ border: '2px dashed #ccc', padding: '40px', borderRadius: '20px', backgroundColor: '#f9f9f9' }}>
{image ? (
<div>
<img src={image} style={{ maxWidth: '100%', borderRadius: '10px' }} />
{!loading && <button onClick={runAnalysis} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#000', color: '#fff', borderRadius: '20px', cursor: 'pointer' }}>Analyser</button>}
</div>
) : (
<label style={{ cursor: 'pointer' }}>
<UploadCloud size={48} style={{ margin: '0 auto' }} />
<input type="file" style={{ display: 'none' }} onChange={handleImage} />
<p>Cliquez pour charger la radio</p>
</label>
)}
{loading && <p>Analyse IA en cours...</p>}
</div>
{analysis && <div style={{ marginTop: '20px', textAlign: 'left', padding: '20px', backgroundColor: '#eee', borderRadius: '10px' }}>{analysis}</div>}
</main>
</div>
);
}
