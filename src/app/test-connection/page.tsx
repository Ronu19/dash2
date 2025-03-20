'use client';

import { testConnection } from '../api/login/actions';
import { useState } from 'react';

export default function TestConnection() {
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    const response = await testConnection();
    setResult(response);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      <button
        onClick={handleTest}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Test Connection
      </button>
      {result && (
        <div className="mt-4 p-4 rounded border">
          <p className={result.success ? "text-green-600" : "text-red-600"}>
            Status: {result.success ? "Success" : "Failed"}
          </p>
          <p>Message: {result.message}</p>
          {!result.success && (
            <>
              <p>Error: {result.error}</p>
              <p>URL Status: {result.url}</p>
              <p>Token Status: {result.token}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
