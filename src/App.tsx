// src/App.tsx
import { useEffect, useState } from 'react';

type Car = {
  id: number;
  name: string;
  color: string;
};

const App = () => {
  const [cars, setCars] = useState<Car[]>([]);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/garage');
      const data = await response.json();
      if (Array.isArray(data)) {
        setCars(data);
      } else {
        setCars([]);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]);
    }
  };

  const addRandomCar = async () => {
    const namesPart1 = ['Tesla', 'Ford', 'BMW', 'Audi', 'Honda'];
    const namesPart2 = ['Model S', 'Mustang', 'X5', 'A4', 'Civic'];
    const randomName = `${namesPart1[Math.floor(Math.random() * namesPart1.length)]} ${
      namesPart2[Math.floor(Math.random() * namesPart2.length)]
    }`;
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    try {
      // Նոր car-ին տալիս ենք ժամանակային id, եթե backend-ը չի ավելացնում
      const newCar = {
        id: Date.now(),
        name: randomName,
        color: randomColor,
      };

      await fetch('http://127.0.0.1:3000/garage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCar),
      });

      fetchCars();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Garage</h1>
      <button onClick={addRandomCar} style={{ marginBottom: '20px' }}>
        Add Random Car
      </button>

      {Array.isArray(cars) && cars.length > 0 ? (
        <ul>
          {cars.map((car) => (
            <li key={car.id} style={{ color: car.color, marginBottom: '5px' }}>
              {car.name} (#{car.id})
            </li>
          ))}
        </ul>
      ) : (
        <p>No Cars</p>
      )}
    </div>
  );
};

export default App;
