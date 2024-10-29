import { useState } from 'react'
import './App.css'

function App() {
  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result)
        setJsonData(content)
        setError(null)
      } catch (err) {
        setError('Error: Invalid JSON file')
        setJsonData(null)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container">
      <h1>JSON File Viewer</h1>

      <div className="upload-section">
        <label htmlFor="file-upload" className="upload-button">
          Choose JSON File
          <input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="file-input"
          />
        </label>
      </div>

      {error && <div className="error">{error}</div>}

      {jsonData && (
        <div className="json-display">
          <h2>JSON Content:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
