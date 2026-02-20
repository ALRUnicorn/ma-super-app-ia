import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UploadCloud, ShieldCheck, Loader2 } from 'lucide-react';

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
"Agis en expert vétérinaire équin. Analyse cette radio et identifie les anomalies.",
{ inlineData: { data: base64Data, mimeType: "image/jpeg" } }
]);
setAnalysis(result.response.text());
} catch (err) {
setAnalysis("Erreur d'analyse. Vérifiez votre clé API dans Vercel.");
}
setLoading(false);
};

return (
<div style={{ minHeight: '100vh', backgroundColor: 'white', color: '#0f172a', fontFamily: 'serif' }}>
<nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #f1f5f9' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<div style={{ backgroundColor: '#10b981', color: 'white', padding: '5px 12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '20px' }}>x</div>
<span style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Equi.</span>
</div>
<div style={{ color: '#10b981', backgroundColor: '#ecfdf5', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>SÉCURISÉ</div>
</nav>

);
}
