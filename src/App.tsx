import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UploadCloud, Settings, ShieldCheck, History, Loader2 } from 'lucide-react';

function App() {
const [image, setImage] = useState(null);
const [analysis, setAnalysis] = useState("");
const [loading, setLoading] = useState(false);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const base64Data = image.split(',')[1];
const prompt = "Agis en expert vétérinaire équin. Analyse cette radio. Identifie les structures et anomalies. Sois précis.";
const result = await model.generateContent([prompt, { inlineData: { data: base64Data, mimeType: "image/jpeg" } }]);
setAnalysis(result.response.text());
} catch (err) {
setAnalysis("Erreur d'analyse. Vérifiez votre clé API.");
}
setLoading(false);
};

return (
<div style={{ minHeight: '100vh', backgroundColor: 'white', fontFamily: 'serif', color: '#0f172a' }}>
<nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<div style={{ backgroundColor: '#10b981', padding: '5px 12px', borderRadius: '8px', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>x</div>
<span style={{ fontWeight: 'bold', fontSize: '20px' }}>Equi.</span>
</div>
<div style={{ display: 'flex', gap: '15px', alignItems: 'center', fontSize: '14px' }}>
<span style={{ color: '#10b981', backgroundColor: '#ecfdf5', padding: '5px 15px', borderRadius: '20px' }}>SÉCURISÉ</span>
</div>
</nav>

);
}

export default App;
