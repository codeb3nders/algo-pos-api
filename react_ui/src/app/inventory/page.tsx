import React from 'react';

async function getData() {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY29mZmVlLWFsZ28tYWRtaW5AZ21haWwuY29tIiwic3ViIjoiNjU2MzJiZWEzMGYyNDU4MTY0MmI3MDA4IiwiaWF0IjoxNzAxMjU0MDg5LCJleHAiOjE3MDEyNTc2ODl9.WmAh7uc4JBc59J0cFRJ5jey_7cQPmWL4px-5aS-uwjg';

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch('http://localhost:3005/', { headers });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Inventory() {
  const data = await getData();

  return (
    <div>
      <h1>Inventory...</h1>
      {data.map((item: any) => {
        console.log(item.ingredient);
        return <div key={item._id}>{item.ingredient}</div>;
      })}
    </div>
  );
}
