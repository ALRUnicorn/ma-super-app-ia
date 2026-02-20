import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function App() {
const [image, setImage] = useState(null);
const [analysis, setAnalysis] = useState("");

return (
<div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
<h1 style={{ color: '#10b981' }}>Equi. Expertise</h1>
<p>Chargez une radio pour l'analyse IA</p>
<input type="file" onChange={(e) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onloadend = () => setImage(reader.result);
reader.readAsDataURL(file);
}} />
{image && <img src={image} style={{ width: '300px', display: 'block', margin: '20px auto' }} />}
<p style={{ marginTop: '20px' }}>{analysis || "Le diagnostic s'affichera ici."}</p>
</div>
);
}
