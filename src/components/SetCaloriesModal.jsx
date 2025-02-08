import React, { useState } from 'react';

// Funkcja do obliczenia zapotrzebowania kalorycznego na podstawie algorytmu Mifflin-St Jeor
const calculateCalories = (gender, age, weight, height, activityLevel, goal) => {
    let bmr;

    // Obliczanie BMR w zależności od płci
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Współczynniki aktywności
    const activityMultipliers = {
        sedentary: 1.2, // Mała aktywność (brak ćwiczeń)
        light: 1.375,   // Lekka aktywność (1-3 dni w tygodniu)
        moderate: 1.55, // Średnia aktywność (3-5 dni w tygodniu)
        intense: 1.725, // Wysoka aktywność (6-7 dni w tygodniu)
        veryIntense: 1.9 // Bardzo wysoka aktywność (codzienne intensywne ćwiczenia)
    };

    let calories = Math.round(bmr * activityMultipliers[activityLevel]);

    // Dostosowanie kaloryczności do celu
    if (goal === 'lose') {
        calories -= 500; // Deficyt kaloryczny, aby schudnąć
    } else if (goal === 'maintain') {
        // Utrzymanie wagi - bez zmian
    } else if (goal === 'gain') {
        calories += 500; // Nadwyżka kaloryczna, aby przytyć
    }

    return calories;
};

const SetCaloriesModal = ({ saveCaloriesGoal }) => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [goal, setGoal] = useState('maintain');
    const [calories, setCalories] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (age && weight && height) {
            const calculatedCalories = calculateCalories(
                gender,
                parseInt(age),
                parseInt(weight),
                parseInt(height),
                activityLevel,
                goal
            );
            setCalories(calculatedCalories);
            saveCaloriesGoal(calculatedCalories);
        }
    };

    return (
        <div className='absolute left-0 right-0 flex justify-center items-center bg-black/50 z-10'>
            <div className='relative flex flex-col justify-center items-center gap-5 bg-slate-800 text-gray-100 rounded-xl px-8 py-12 w-full h-auto sm:h-auto overflow-y-auto pt-10'>
                <h2 className='text-center text-2xl font-bold mb-4 text-blue-400'>
                    Oblicz zapotrzebowanie kaloryczne
                </h2>
                <form onSubmit={handleSubmit} className='w-full'>
                    <div className='mb-4'>
                        <label className='block text-lg mb-1 text-white'>Płeć</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className='w-full bg-slate-700 py-3 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='male'>Mężczyzna</option>
                            <option value='female'>Kobieta</option>
                        </select>
                    </div>

                    <div className='mb-4'>
                        <label className='block text-lg mb-1 text-white'>Wiek</label>
                        <input
                            type='number'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className='w-full bg-slate-700 py-3 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Wiek'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-lg mb-1 text-white'>Waga (kg)</label>
                        <input
                            type='number'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className='w-full bg-slate-700 py-3 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Waga'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-lg mb-1 text-white'>Wzrost (cm)</label>
                        <input
                            type='number'
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className='w-full bg-slate-700 py-3 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder='Wzrost'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='block text-lg mb-1 text-white'>Poziom aktywności</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className='w-full bg-slate-700 py-3 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='sedentary'>Brak ćwiczeń</option>
                            <option value='light'>Lekka aktywność</option>
                            <option value='moderate'>Średnia aktywność</option>
                            <option value='intense'>Intensywna aktywność</option>
                            <option value='veryIntense'>Bardzo intensywna aktywność</option>
                        </select>
                    </div>

                    <div className='mb-6'>
                        <label className='block text-lg mb-1 text-white'>Cel</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            className='w-full bg-slate-700 py-3 px-4 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        >
                            <option value='lose'>Chcę schudnąć</option>
                            <option value='maintain'>Chcę utrzymać wagę</option>
                            <option value='gain'>Chcę przytyć</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='bg-blue-500 py-3 w-full rounded-xl font-bold text-lg mt-3 hover:bg-blue-600 transition duration-300'
                    >
                        Oblicz cel kaloryczny
                    </button>
                </form>

                {calories && (
                    <div className='mt-4 text-center'>
                        <h3 className='text-lg font-bold text-white'>Twoje zapotrzebowanie kaloryczne to:</h3>
                        <p className='text-xl font-semibold text-blue-400'>{calories} kcal</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SetCaloriesModal;
