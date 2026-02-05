-- Таблица для хранения пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Данные онбординга
    motivation VARCHAR(100),
    gender VARCHAR(20),
    diet VARCHAR(50),
    meal_schedule VARCHAR(20),
    work_areas TEXT[],
    
    -- Физические параметры
    height INTEGER,
    current_weight DECIMAL(5,2),
    target_weight DECIMAL(5,2),
    current_body INTEGER,
    target_body INTEGER,
    
    -- Расчётные данные
    bmi DECIMAL(5,2),
    daily_calories INTEGER,
    target_days INTEGER DEFAULT 30
);

-- Таблица для хранения тренировочных планов
CREATE TABLE IF NOT EXISTS workout_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    plan_name VARCHAR(200),
    description TEXT,
    difficulty VARCHAR(20),
    total_days INTEGER DEFAULT 30
);

-- Таблица для конкретных тренировок
CREATE TABLE IF NOT EXISTS workouts (
    id SERIAL PRIMARY KEY,
    plan_id INTEGER REFERENCES workout_plans(id),
    day_number INTEGER,
    
    name VARCHAR(200),
    duration INTEGER,
    calories_burn INTEGER,
    exercises JSONB,
    
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP
);

-- Таблица для рецептов питания
CREATE TABLE IF NOT EXISTS meal_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    day_number INTEGER,
    meal_type VARCHAR(50),
    
    recipe_name VARCHAR(200),
    calories INTEGER,
    protein DECIMAL(5,2),
    carbs DECIMAL(5,2),
    fat DECIMAL(5,2),
    ingredients JSONB
);

-- Таблица для отслеживания прогресса
CREATE TABLE IF NOT EXISTS progress_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    weight DECIMAL(5,2),
    body_type INTEGER,
    notes TEXT
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);
CREATE INDEX IF NOT EXISTS idx_workout_plans_user ON workout_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_workouts_plan ON workouts(plan_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress_logs(user_id);
