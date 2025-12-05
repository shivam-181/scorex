"use client";
import { useState, useEffect } from "react";

export default function DebugPage() {
  const [status, setStatus] = useState("Testing...");
  const [error, setError] = useState("");
  const [data, setData] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus(`Fetching from: ${apiUrl}/api/football/live`);
        const res = await fetch(`${apiUrl}/api/football/live`);
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }
        const jsonData = await res.json();
        setData(JSON.stringify(jsonData, null, 2));
        setStatus("Success!");
      } catch (err: any) {
        setError(err.message);
        setStatus("Failed");
      }
    };

    testConnection();
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-black text-white p-10 font-mono">
      <h1 className="text-2xl font-bold mb-4">Debug Connection</h1>
      
      <div className="mb-6 border border-gray-700 p-4 rounded">
        <h2 className="text-gray-400 mb-2">Environment Variable</h2>
        <p>NEXT_PUBLIC_API_URL: <span className="text-yellow-400">"{apiUrl}"</span></p>
      </div>

      <div className="mb-6 border border-gray-700 p-4 rounded">
        <h2 className="text-gray-400 mb-2">Connection Status</h2>
        <p className={status === "Success!" ? "text-green-400" : "text-red-400"}>{status}</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {data && (
        <div className="border border-gray-700 p-4 rounded">
          <h2 className="text-gray-400 mb-2">API Response Preview</h2>
          <pre className="text-xs text-gray-300 overflow-auto max-h-96">{data.substring(0, 1000)}...</pre>
        </div>
      )}
    </div>
  );
}
