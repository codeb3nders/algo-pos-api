'use client';

import { getAllInventory } from '@/apis/inventory.api';
import React, { useEffect, useState } from 'react';

export default function Inventory() {
  const [data, setData] = useState([]);

  const getInventory = async () => {
    const result = await getAllInventory();
    setData(result.data);
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      {data.map((item: any) => {
        return <div key={item._id}>{item.ingredient}</div>;
      })}
    </div>
  );
}
