import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { UploadCloud, Settings, ShieldCheck, History, Loader2 } from 'lucide-react';

function App() {
const [image, setImage] setAnalysis] = useState("");
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
