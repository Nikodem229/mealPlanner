import React, { useState } from 'react';
import DaysNavbar from './components/DaysNavbar';
import MealSection from './components/MealSection';
import SetCaloriesModal from './components/SetCaloriesModal';
import dayjs from "dayjs";

const mealTypes = ["Śniadanie", "II Śniadanie", "Obiad", "Lunch", "Kolacja"];

const App = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [caloriesGoal, setCaloriesGoal] = useState(0);
  const [meals, setMeals] = useState({});

  const formattedDate = selectedDate.format("YYYY-MM-DD");

  const handleAddMeal = (date, mealType, meal) => {
    const key = dayjs(date).format("YYYY-MM-DD");

    setMeals(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [mealType]: [...(prev[key]?.[mealType] || []), meal]
      }
    }));
  };

  const handleEditMeal = (date, mealType, index, updatedMeal) => {
    const key = dayjs(date).format("YYYY-MM-DD");

    setMeals(prev => {
        if (!prev[key] || !prev[key][mealType]) return prev; // Jeśli brak posiłków, nic nie rób

        return {
            ...prev,
            [key]: {
                ...prev[key],
                [mealType]: prev[key][mealType].map((meal, i) =>
                    i === index ? updatedMeal : meal
                )
            }
        };
    });
};


  const handleDeleteMeal = (date, mealType, index) => {
    const key = dayjs(date).format("YYYY-MM-DD");

    setMeals(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [mealType]: prev[key][mealType].filter((_, i) => i !== index)
      }
    }));
  };

  const totalCaloriesForDay = Object.values(meals[formattedDate] || {})
    .flat()
    .reduce((sum, meal) => sum + meal.calories, 0);

  const saveCaloriesGoal = (calories) => {
    setCaloriesGoal(calories);
  };

  return (
    <>
    {caloriesGoal === 0 && <SetCaloriesModal saveCaloriesGoal={saveCaloriesGoal} />}
    <main className='bg-slate-800 min-h-screen pb-20'>

      <DaysNavbar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <h2 className='text-gray-300 text-2xl font-bold text-center my-8'>
        Posiłki na {selectedDate.format("D MMMM")}
      </h2>

      <div>
        {mealTypes.map((mealType, index) => (
          <MealSection
            key={index}
            mealType={mealType}
            date={selectedDate}
            meals={meals[formattedDate]?.[mealType] || []}
            addMeal={handleAddMeal}
            editMeal={handleEditMeal}
            deleteMeal={handleDeleteMeal}
          />
        ))}
      </div>

      <div className='fixed bottom-0 w-full pt-6 pb-4 bg-slate-950 text-gray-200'>
        <div className='relative w-[90%] bg-green-950 py-1 mx-auto rounded'>
          <div
            className='absolute top-0 left-0 py-1 rounded max-w-full'
            style={{
              width: caloriesGoal > 0 ? `${(totalCaloriesForDay / caloriesGoal) * 100}%` : '0%',
              backgroundColor: totalCaloriesForDay > caloriesGoal ? '#9f0712' : 'oklch(0.723 0.219 149.579)'
            }}
          ></div>
        </div>
        <p className='text-gray-200 text-center mt-1 text-sm'>
          Suma kcal: <span className='text-base font-semibold'>{totalCaloriesForDay}</span> / {caloriesGoal}
        </p>
      </div>
    </main>
    </>
  );
};

export default App;
