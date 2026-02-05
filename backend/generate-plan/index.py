import json
import os
import psycopg2
from psycopg2.extras import Json

def handler(event: dict, context) -> dict:
    """
    Создаёт персонализированный план тренировок и питания на основе данных пользователя
    """
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        motivation = body.get('motivation')
        gender = body.get('gender')
        diet = body.get('diet')
        meal_schedule = body.get('mealSchedule')
        work_areas = body.get('workArea', [])
        height = body.get('height')
        current_weight = body.get('currentWeight')
        target_weight = body.get('targetWeight')
        current_body = body.get('currentBody')
        target_body = body.get('targetBody')
        
        bmi = current_weight / ((height / 100) ** 2)
        
        weight_diff = current_weight - target_weight
        daily_calorie_deficit = abs(weight_diff) * 7700 / 30
        base_calories = 1800 if gender == 'female' else 2200
        daily_calories = int(base_calories - daily_calorie_deficit)
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute(f"""
            INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.users 
            (motivation, gender, diet, meal_schedule, work_areas, height, 
             current_weight, target_weight, current_body, target_body, bmi, daily_calories)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
        """, (motivation, gender, diet, meal_schedule, work_areas, height,
              current_weight, target_weight, current_body, target_body, bmi, daily_calories))
        
        user_id = cur.fetchone()[0]
        
        workouts = generate_workouts(work_areas, target_body, gender)
        
        cur.execute(f"""
            INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.workout_plans 
            (user_id, plan_name, description, difficulty)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (user_id, 'Программа "Худей за 30 дней"', 
              f'Персональный план на основе ваших целей и параметров', 
              'Средняя'))
        
        plan_id = cur.fetchone()[0]
        
        for idx, workout in enumerate(workouts[:30], 1):
            cur.execute(f"""
                INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.workouts 
                (plan_id, day_number, name, duration, calories_burn, exercises)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (plan_id, idx, workout['name'], workout['duration'], 
                  workout['calories'], Json(workout['exercises'])))
        
        meals = generate_meals(daily_calories, diet, meal_schedule)
        
        for meal in meals:
            cur.execute(f"""
                INSERT INTO {os.environ['MAIN_DB_SCHEMA']}.meal_plans 
                (user_id, day_number, meal_type, recipe_name, calories, protein, carbs, fat, ingredients)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (user_id, meal['day'], meal['type'], meal['name'], 
                  meal['calories'], meal['protein'], meal['carbs'], meal['fat'], Json(meal['ingredients'])))
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'userId': user_id,
                'planId': plan_id,
                'bmi': round(bmi, 2),
                'dailyCalories': daily_calories,
                'message': 'Ваш персональный план готов!'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }


def generate_workouts(work_areas: list, target_body: int, gender: str) -> list:
    """Генерирует персонализированные тренировки на 30 дней"""
    
    base_workouts = {
        'chest': [
            {'name': 'Отжимания от пола', 'sets': 3, 'reps': 12},
            {'name': 'Жим гантелей лёжа', 'sets': 3, 'reps': 10},
        ],
        'arms': [
            {'name': 'Сгибания на бицепс', 'sets': 3, 'reps': 12},
            {'name': 'Разгибания на трицепс', 'sets': 3, 'reps': 12},
        ],
        'abs': [
            {'name': 'Скручивания', 'sets': 3, 'reps': 20},
            {'name': 'Планка', 'sets': 3, 'reps': '60 сек'},
        ],
        'legs': [
            {'name': 'Приседания', 'sets': 4, 'reps': 15},
            {'name': 'Выпады', 'sets': 3, 'reps': 12},
        ],
        'full_body': [
            {'name': 'Берпи', 'sets': 3, 'reps': 10},
            {'name': 'Jumping Jacks', 'sets': 3, 'reps': 30},
        ]
    }
    
    workouts = []
    for day in range(30):
        exercises = []
        
        if 'full_body' in work_areas:
            exercises.extend(base_workouts['full_body'])
        else:
            for area in work_areas:
                if area in base_workouts:
                    exercises.extend(base_workouts[area][:1])
        
        intensity = 'Высокая' if target_body >= 4 else 'Средняя'
        duration = 45 if target_body >= 4 else 30
        calories = 350 if intensity == 'Высокая' else 250
        
        workouts.append({
            'name': f'День {day + 1}: Тренировка {work_areas[0] if work_areas else "full_body"}',
            'duration': duration,
            'calories': calories,
            'exercises': exercises
        })
    
    return workouts


def generate_meals(daily_calories: int, diet: str, meal_schedule: str) -> list:
    """Генерирует план питания на неделю"""
    
    meals_per_day = 4 if meal_schedule == 'yes' else 3
    calories_per_meal = daily_calories // meals_per_day
    
    vegetarian_meals = [
        {'name': 'Овсянка с бананом', 'protein': 12, 'carbs': 54, 'fat': 8, 
         'ingredients': ['Овсянка', 'Банан', 'Мёд']},
        {'name': 'Греческий салат', 'protein': 8, 'carbs': 18, 'fat': 20, 
         'ingredients': ['Огурцы', 'Помидоры', 'Оливки', 'Сыр фета']},
        {'name': 'Тофу с овощами', 'protein': 20, 'carbs': 25, 'fat': 15, 
         'ingredients': ['Тофу', 'Брокколи', 'Морковь', 'Соевый соус']},
    ]
    
    regular_meals = [
        {'name': 'Омлет с овощами', 'protein': 18, 'carbs': 12, 'fat': 14, 
         'ingredients': ['Яйца', 'Помидоры', 'Шпинат']},
        {'name': 'Куриная грудка с рисом', 'protein': 42, 'carbs': 45, 'fat': 12, 
         'ingredients': ['Курица', 'Рис', 'Овощи']},
        {'name': 'Рыба на пару с брокколи', 'protein': 35, 'carbs': 20, 'fat': 18, 
         'ingredients': ['Лосось', 'Брокколи', 'Лимон']},
    ]
    
    meal_list = vegetarian_meals if diet == 'vegetarian' else regular_meals
    meal_types = ['Завтрак', 'Обед', 'Ужин', 'Перекус']
    
    meals = []
    for day in range(1, 8):
        for i in range(meals_per_day):
            meal = meal_list[i % len(meal_list)].copy()
            meal['day'] = day
            meal['type'] = meal_types[i]
            meal['calories'] = calories_per_meal
            meals.append(meal)
    
    return meals
