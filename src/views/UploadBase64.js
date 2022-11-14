import React, { useEffect, useState } from 'react';
import axios from 'axios'


export default function App({ dataInput }) {

  const [files, setFiles] = useState([]);
  const reader = new FileReader();

  useEffect(() => {
    axios.get("https://backend.missingpets.art/blob", {
    })
      .then((response) => {
       
        let toString = response.data.data.toString('base64')
        setFiles(response.data.data.toString('base64'))

        

      });
  }, [])


  const data = [localStorage.avatar];

  return (
    <div>

    </div>
  );
}
