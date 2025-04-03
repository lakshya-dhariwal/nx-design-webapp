import { FirebaseApp, initializeApp } from "firebase/app";
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
import { useGemini } from "../gemini/gemini.hook";

const firebaseConfig = {
    apiKey: "AIzaSyDtO7IULuYJ9p8O0mkc6_M3RQCKIomumQE",
    authDomain: "lattice-30c9e.firebaseapp.com",
    projectId: "lattice-30c9e",
    storageBucket: "lattice-30c9e.firebasestorage.app",
    messagingSenderId: "895788951084",
    appId: "1:895788951084:web:5e55b337a475ad5dc59389",
    measurementId: "G-741KS326FD",
};

let app: FirebaseApp;

app = initializeApp(firebaseConfig);

const firebaseAPIKey = firebaseConfig.apiKey;

const vertexAI = getVertexAI(app);
const { aiFunctionTools } = useGemini();
const geminiModel = getGenerativeModel(vertexAI, {
    model: "gemini-1.5-flash",
    tools: aiFunctionTools,
});

export { firebaseAPIKey, geminiModel };
