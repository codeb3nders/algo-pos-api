
import React from 'react'

async function getData() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY29mZmVlLWFsZ28tYWRtaW5AZ21haWwuY29tIiwic3ViIjoiNjU2MzJiZWEzMGYyNDU4MTY0MmI3MDA4IiwiaWF0IjoxNzAxMjQ2NjY2LCJleHAiOjE3MDEyNTAyNjZ9.8VtmYBiMp8-5evTyQVDCWJByxLWdYb7cOi1eZ8ahj7k';

//...

const headers = {
  Authorization: `Bearer ${token}`
}

const res = await fetch('http://localhost:3005/', {headers});


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

      export default async function Inventory() {
  const data = await getData();

  
  return <div>
    <h1>Inventory...</h1>
    {data.map((item: any)=>{
      console.log(item.ingredient);
      return <div key={item._id}>{item.ingredient}</div>

    })}
  </div>;
}
