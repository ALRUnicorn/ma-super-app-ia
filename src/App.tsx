import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UploadCloud, ShieldCheck, Loader2 } from 'lucide-react';

export default function App() {
const [image, setImage] = useState<string | null>(null);
const [analysis, setAnalysis] = useState("");
const [loading, setLoading] = useState(false);

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || "");

const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (file) {
const reader = new FileReader();
reader.onloadend = () => setImage(reader.result as string);
reader.readAsDataURL(file);
}
};

const runAnalysis = async () => {
if (!image) return;
setLoading(true);
try {
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const base64Data = image.split(',')[1];
const result = await model.generateContent([
"Analyse cette radio de cheval en tant qu'expert vétérinaire.",
{ inlineData: { data: base64Data, mimeType: "image/jpeg" } }
]);
setAnalysis(result.response.text());
} catch (err) {
setAnalysis("Vérifiez votre clé API dans les réglages Vercel.");
}
setLoading(false);
};

return (
<div style={{ minHeight: '100vh', backgroundColor: 'white', color: '#0f172a', fontFamily: 'sans-serif' }}>
<nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #f1f5f9' }}>
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
<div style={{ backgroundColor: '#10b981', color: 'white', padding: '5px 12px', borderRadius: '8px', fontWeight: 'bold' }}>x</div>
<span style={{ fontSize: '24px', fontWeight: 'bold' }}>Equi.</span>
</div>
<div style={{ color: '#10b981', backgroundColor: '#ecfdf5', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>SÉCURISÉ</div>
</nav>
<main style={{ maxWidth: '800px', margin: '60px auto', textAlign: 'center' }}>
<h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>Expertise <span style={{ color: '#10b981', fontStyle: 'italic' }}>Radiographique</span>.</h1>
<div style={{ border: '2px dashed #e2e8f0', borderRadius: '40px', padding: '50px', backgroundColor: '#f8fafc' }}>
{image ? (
<div>
<img src={image} style={{ maxHeight: '300px', borderRadius: '20px', marginBottom: '20px' }} alt="Radio" />
{!loading && <button onClick={runAnalysis} style={{ backgroundColor: '#0f172a', color: 'white', padding: '15px 40px', borderRadius: '30px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Lancer l'expertise</button>}
</div>
) : (
<label style={{ cursor: 'pointer' }}>
<UploadCloud size={60} color="#cbd5e1" style={{ margin: '0 auto' }} />
<input type="file" style={{ display: 'none' }} onChange={handleImage} accept="image/*" />
<p style={{ color: '#94a3b8' }}>Cliquez pour importer votre radio</p>
</label>
)}
{loading && <div style={{ color: '#10b981', fontWeight: 'bold' }}>Analyse en cours...</div>}
</div>
{analysis && (
<div style={{ marginTop: '40px', textAlign: 'left', padding: '30px', backgroundColor: '#f1f5f9', borderRadius: '20px', borderLeft: '6px solid #10b981' }}>
<p style={{ whiteSpace: 'pre-wrap' }}>{analysis}</p>
</div>
)}
</main>
</div>
);
}
