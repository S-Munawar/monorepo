import { useState, useEffect } from "react";
import { API_URL } from "@monorepo/api-interface";

import { Route, Routes, Link } from 'react-router-dom';

import { Games } from '@monorepo/react-lib';


export function App() {
  // const [apiResponse, setApiResponse] = useState<ApiResponse>({ message: "Loading..." });

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     try {
  //       const res = await fetch(API_URL);
  //       const data = await res.json();
  //       setApiResponse(data);
  //     } catch (err) {
  //       console.error("Error fetching API:", err);
  //       setApiResponse({ message: "Error fetching API" });
  //     }
  //   };
  //   fetchApi();
  // }, []);

  return (
    <div>
    <Games url={API_URL} />
    </div>
  );
}

export default App;


 
if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html
  
  const { it, expect, beforeEach } = import.meta.vitest;
  let render: typeof import('@testing-library/react').render;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getAllByText } = render(<App />);
    expect(getAllByText(new RegExp('Welcome mono2', 'gi')).length > 0).toBeTruthy();
  });

}
 
