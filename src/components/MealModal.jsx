import React, { useState } from 'react'

const MealModal = ({ day, mealType, onClose, addMeal }) => {

    const [mealName, setMealName] = useState('');
    const [mealCalories, setMealCalories] = useState('');

    const handleSubmit = () => {
        if(!mealName || !mealCalories) return;
        addMeal(day, mealType, {name: mealName, calories: parseInt(mealCalories)});
        onClose();
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50'>
            <div className='relative flex flex-col justify-center items-center gap-5 bg-slate-950 text-gray-200 rounded-xl px-5 py-10 min-w-[85%]'>
                <button className='absolute top-5 right-5 bg-slate-900 rounded-full w-[40px] h-[40px] text-xl  text-slate-600 font-extrabold' onClick={onClose}>X</button>
                <h2 className='text-center text-xl font-bold mb-3'>Dodaj posiłek</h2>
                <input
                    type='text'
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    className='bg-slate-800 py-2 px-3 w-full rounded-lg text-xl'
                    placeholder='Nazwa posiłku'
                />
                <div className='flex justify-between items-end w-full'>
                    <input
                        type='number'
                        value={mealCalories}
                        onChange={(e) => setMealCalories(e.target.value)}
                        className='bg-slate-800 py-2 px-3 w-3/4 rounded-lg text-xl'
                        placeholder='Kaloryczność'
                    />
                    <p className='text-gray-300 text-lg'>kcal</p>
                </div>
                <button
                    className='bg-slate-900 py-2 w-full rounded-xl font-bold text-lg mt-3'
                    onClick={handleSubmit}
                >Zapisz posiłek</button>
            </div>
        </div>
    )
}

export default MealModal