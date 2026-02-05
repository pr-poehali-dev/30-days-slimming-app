import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface OnboardingData {
  motivation: string;
  gender: string;
  diet: string;
  mealSchedule: string;
  workArea: string[];
  height: number;
  currentWeight: number;
  targetWeight: number;
  currentBody: number;
  targetBody: number;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    motivation: '',
    gender: '',
    diet: '',
    mealSchedule: '',
    workArea: [],
    height: 170,
    currentWeight: 70,
    targetWeight: 65,
    currentBody: 3,
    targetBody: 4,
  });

  const totalSteps = 11;
  const progress = (step / totalSteps) * 100;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleWorkArea = (area: string) => {
    setData(prev => ({
      ...prev,
      workArea: prev.workArea.includes(area)
        ? prev.workArea.filter(a => a !== area)
        : [...prev.workArea, area]
    }));
  };

  const nextStep = () => {
    if (step === totalSteps - 1) {
      onComplete(data);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(prev => prev - 1);
  };

  const bodyTypes = [
    { id: 1, label: 'Полная', emoji: '⚫' },
    { id: 2, label: 'Избыточный вес', emoji: '🔴' },
    { id: 3, label: 'Средняя', emoji: '🟡' },
    { id: 4, label: 'Спортивная', emoji: '🟢' },
    { id: 5, label: 'Фитнес', emoji: '💪' },
  ];

  const weights = Array.from({ length: 121 }, (_, i) => 40 + i);
  const heights = Array.from({ length: 91 }, (_, i) => 140 + i);

  const renderWheelPicker = (
    value: number,
    options: number[],
    onChange: (val: number) => void,
    unit: string
  ) => {
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const element = e.currentTarget;
      const scrollTop = element.scrollTop;
      const itemHeight = 60;
      const index = Math.round(scrollTop / itemHeight);
      if (options[index] !== value) {
        onChange(options[index]);
      }
    };

    return (
      <div className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-x-0 top-[120px] h-[60px] bg-orange-500/10 border-y-2 border-orange-500 rounded-lg z-10 pointer-events-none" />
        <div
          className="h-full overflow-y-auto snap-y snap-mandatory scroll-smooth px-4 scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollSnapType: 'y mandatory' }}
        >
          <div className="h-[120px]" />
          {options.map((option) => (
            <div
              key={option}
              className="h-[60px] flex items-center justify-center snap-center"
            >
              <span
                className={`text-4xl font-bold transition-all ${
                  option === value
                    ? 'text-orange-500 scale-125'
                    : 'text-gray-400 scale-90'
                }`}
              >
                {option} {unit}
              </span>
            </div>
          ))}
          <div className="h-[120px]" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-fade-in">
        {step > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Шаг {step} из {totalSteps - 1}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Card className="bg-white shadow-xl border-2 border-gray-100 overflow-hidden">
          <CardContent className="p-8">
            {step === 0 && (
              <div className="space-y-8 text-center">
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/a76e9083-bbfe-4ff3-a301-9da5bffda897.jpg"
                    alt="Fitness motivation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-gray-900">
                    Добро пожаловать!
                  </h1>
                  <p className="text-xl text-gray-600">
                    Приложение "Худей за 30 дней"
                  </p>
                  <p className="text-gray-500">
                    Создайте персональный план тренировок и начните путь к здоровому телу уже сегодня
                  </p>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-6 text-lg"
                  onClick={nextStep}
                >
                  Начать
                </Button>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Что мотивирует вас?</h2>
                  <p className="text-gray-600">Выберите вашу главную цель</p>
                </div>
                <div className="grid gap-3">
                  {[
                    { value: 'gain_form', label: 'Набрать форму', icon: 'TrendingUp' },
                    { value: 'photo_look', label: 'Лучше выглядеть', icon: 'Camera' },
                    { value: 'confidence', label: 'Чувствовать уверенность', icon: 'Smile' },
                    { value: 'sports_ability', label: 'Улучшить спортивные способности', icon: 'Zap' },
                    { value: 'stress_relief', label: 'Снять стресс', icon: 'Heart' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.motivation === option.value ? 'default' : 'outline'}
                      className={`h-auto py-4 justify-start text-left ${
                        data.motivation === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white'
                          : 'border-2 border-gray-200 hover:border-orange-500 text-gray-700'
                      }`}
                      onClick={() => updateData('motivation', option.value)}
                    >
                      <Icon name={option.icon as any} className="mr-3" size={24} />
                      {option.label}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                    disabled={!data.motivation}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Выберите пол</h2>
                  <p className="text-gray-600">Для персонализации программы</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div
                    className={`cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${
                      data.gender === 'female' ? 'border-orange-500 shadow-xl' : 'border-gray-200'
                    }`}
                    onClick={() => updateData('gender', 'female')}
                  >
                    <img
                      src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/a76e9083-bbfe-4ff3-a301-9da5bffda897.jpg"
                      alt="Женщина"
                      className="w-full h-64 object-cover"
                    />
                    <div className={`p-4 text-center font-bold text-lg ${
                      data.gender === 'female' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      Женский
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-2xl overflow-hidden border-4 transition-all ${
                      data.gender === 'male' ? 'border-orange-500 shadow-xl' : 'border-gray-200'
                    }`}
                    onClick={() => updateData('gender', 'male')}
                  >
                    <img
                      src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/deb73872-f5b1-4b75-8bb8-47a97ba1ec15.jpg"
                      alt="Мужчина"
                      className="w-full h-64 object-cover"
                    />
                    <div className={`p-4 text-center font-bold text-lg ${
                      data.gender === 'male' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      Мужской
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                    disabled={!data.gender}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Какого питания вы придерживаетесь?</h2>
                  <div className="h-48 rounded-2xl overflow-hidden my-4">
                    <img
                      src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/46298928-882c-403e-910d-d5a6f889c567.jpg"
                      alt="Healthy food"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'regular', label: 'Обычная еда', icon: 'UtensilsCrossed' },
                    { value: 'vegetarian', label: 'Вегетарианская', icon: 'Leaf' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.diet === option.value ? 'default' : 'outline'}
                      className={`h-32 flex-col gap-3 ${
                        data.diet === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white'
                          : 'border-2 border-gray-200 hover:border-orange-500'
                      }`}
                      onClick={() => updateData('diet', option.value)}
                    >
                      <Icon name={option.icon as any} size={48} />
                      <span className="text-lg font-bold">{option.label}</span>
                    </Button>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                    disabled={!data.diet}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Придерживаетесь ли вы определённых часов для приёма пищи?</h2>
                  <p className="text-gray-600">Это поможет составить график питания</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'yes', label: 'Да', icon: 'CheckCircle2', desc: 'Ем по расписанию' },
                    { value: 'no', label: 'Нет', icon: 'XCircle', desc: 'Ем когда захочу' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.mealSchedule === option.value ? 'default' : 'outline'}
                      className={`h-40 flex-col gap-3 ${
                        data.mealSchedule === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white'
                          : 'border-2 border-gray-200 hover:border-orange-500'
                      }`}
                      onClick={() => updateData('mealSchedule', option.value)}
                    >
                      <Icon name={option.icon as any} size={56} />
                      <div className="text-center">
                        <div className="text-xl font-bold">{option.label}</div>
                        <div className="text-sm opacity-80">{option.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                    disabled={!data.mealSchedule}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Над чем вы хотите поработать?</h2>
                  <p className="text-gray-600">Выберите одну или несколько зон</p>
                  <div className="h-48 rounded-2xl overflow-hidden my-4">
                    <img
                      src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/8602f404-c59d-4e9f-925a-1fcf32aadb58.jpg"
                      alt="Workout zones"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'chest', label: 'Грудь', icon: 'Heart' },
                    { value: 'arms', label: 'Руки', icon: 'Dumbbell' },
                    { value: 'abs', label: 'Пресс', icon: 'Activity' },
                    { value: 'legs', label: 'Ноги', icon: 'Footprints' },
                    { value: 'full_body', label: 'Всё тело', icon: 'User' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.workArea.includes(option.value) ? 'default' : 'outline'}
                      className={`h-24 flex-col gap-2 ${
                        data.workArea.includes(option.value)
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white'
                          : 'border-2 border-gray-200 hover:border-orange-500'
                      }`}
                      onClick={() => toggleWorkArea(option.value)}
                    >
                      <Icon name={option.icon as any} size={32} />
                      <span className="font-bold">{option.label}</span>
                    </Button>
                  ))}
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                    disabled={data.workArea.length === 0}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Укажите свой рост</h2>
                  <div className="text-6xl">📏</div>
                </div>
                {renderWheelPicker(data.height, heights, (val) => updateData('height', val), 'см')}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Какой у вас текущий вес?</h2>
                  <div className="text-6xl">⚖️</div>
                </div>
                {renderWheelPicker(data.currentWeight, weights, (val) => updateData('currentWeight', val), 'кг')}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Какой вес вы хотите достичь?</h2>
                  <div className="text-6xl">🎯</div>
                </div>
                {renderWheelPicker(data.targetWeight, weights, (val) => updateData('targetWeight', val), 'кг')}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Какова ваша текущая форма тела?</h2>
                  <div className="text-6xl">👤</div>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <div className="absolute inset-x-0 top-[120px] h-[60px] bg-orange-500/10 border-y-2 border-orange-500 rounded-lg z-10 pointer-events-none" />
                  <div className="h-full overflow-x-auto snap-x snap-mandatory flex items-center px-4 gap-8 scrollbar-hide">
                    <div className="w-[200px] shrink-0" />
                    {bodyTypes.map((type) => (
                      <div
                        key={type.id}
                        className="w-[200px] shrink-0 snap-center cursor-pointer"
                        onClick={() => updateData('currentBody', type.id)}
                      >
                        <div className={`text-center space-y-4 transition-all ${
                          data.currentBody === type.id ? 'scale-125' : 'scale-90 opacity-50'
                        }`}>
                          <div className="text-7xl">{type.emoji}</div>
                          <p className={`font-bold text-lg ${
                            data.currentBody === type.id ? 'text-orange-500' : 'text-gray-600'
                          }`}>
                            {type.label}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="w-[200px] shrink-0" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                  >
                    Далее
                  </Button>
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Какую форму тела вы хотите достичь?</h2>
                  <div className="text-6xl">💫</div>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <div className="absolute inset-x-0 top-[120px] h-[60px] bg-orange-500/10 border-y-2 border-orange-500 rounded-lg z-10 pointer-events-none" />
                  <div className="h-full overflow-x-auto snap-x snap-mandatory flex items-center px-4 gap-8 scrollbar-hide">
                    <div className="w-[200px] shrink-0" />
                    {bodyTypes.map((type) => (
                      <div
                        key={type.id}
                        className="w-[200px] shrink-0 snap-center cursor-pointer"
                        onClick={() => updateData('targetBody', type.id)}
                      >
                        <div className={`text-center space-y-4 transition-all ${
                          data.targetBody === type.id ? 'scale-125' : 'scale-90 opacity-50'
                        }`}>
                          <div className="text-7xl">{type.emoji}</div>
                          <p className={`font-bold text-lg ${
                            data.targetBody === type.id ? 'text-orange-500' : 'text-gray-600'
                          }`}>
                            {type.label}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="w-[200px] shrink-0" />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1 border-2" onClick={prevStep}>
                    Назад
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500"
                    onClick={nextStep}
                  >
                    Завершить
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
