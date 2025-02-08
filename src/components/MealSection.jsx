import React, { useState } from 'react'
import MealModal from './MealModal';
import EditModal from './EditModal'

const MealSection = ({ date, mealType, meals, addMeal, editMeal, deleteMeal }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedMeal, setEditedMeal] = useState({});

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div>
        <div className="flex justify-between items-center px-6 mb-5">
            <div className="flex justify-start items-center gap-6">
                <button
                    className="bg-slate-700 text-white px-4 py-3 rounded cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                +
                </button>
                <h3 className="text-gray-200 text-xl font-semibold">{mealType}</h3>
            </div>
            <p className='text-md text-gray-200 font-semibold'>{totalCalories} kcal</p>
        </div>

        <ul className='px-6 text-gray-300'>
            {meals.map((meal, index) => (
                <li key={index} className='flex justify-between items-center mb-5 pl-17'>
                    <span className='text-lg'>{meal.name}</span>
                    
                    <div className='flex justify-center items-center gap-5'>
                        <span className='text-gray-400'>{meal.calories} kcal</span>
                        <div>
                            <button
                                className="bg-slate-950 px-2 py-1 text-gray-300 rounded mr-2 cursor-pointer"
                                onClick={() => {
                                    setIsEditModalOpen(true);
                                    setEditedMeal({name: meal.name, calories: meal.calories, index: index});
                                }}
                            >
                                E
                            </button>
                            <button
                                className="bg-red-950 px-2 py-1 text-gray-300 rounded cursor-pointer"
                                onClick={() => deleteMeal(date, mealType, index)}
                            >
                                U
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
        
        {isModalOpen && (
            <MealModal
                day={date}
                mealType={mealType}
                onClose={() => setIsModalOpen(false)}
                addMeal={addMeal}
            />
        )}

        {isEditModalOpen && (
            <EditModal
                day={date}
                mealType={mealType}
                onClose={() => setIsEditModalOpen(false)}
                meal={editedMeal}
                editMeal={editMeal}
            />
        )}

    </div>
  )
}

export default MealSection