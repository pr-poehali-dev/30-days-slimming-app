import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface OnboardingData {
  motivation: string;
  hasExperience: string;
  gender: string;
  diet: string;
  mealSchedule: string;
  currentBody: number;
  targetBody: number;
  workArea: string[];
  birthYear: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    motivation: '',
    hasExperience: '',
    gender: '',
    diet: '',
    mealSchedule: '',
    currentBody: 0,
    targetBody: 0,
    workArea: [],
    birthYear: 2000,
    height: 170,
    currentWeight: 70,
    targetWeight: 65,
  });

  const totalSteps = 12;
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
    if (step === 12) {
      setLoading(true);
      setTimeout(() => {
        onComplete(data);
      }, 3000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const bodyTypes = [
    { id: 1, label: 'Полная форма', emoji: '🔴' },
    { id: 2, label: 'Избыточный вес', emoji: '🟠' },
    { id: 3, label: 'Средняя форма', emoji: '🟡' },
    { id: 4, label: 'Спортивная', emoji: '🟢' },
    { id: 5, label: 'Накаченная', emoji: '💪' },
  ];

  const years = Array.from({ length: 70 }, (_, i) => 2010 - i);
  const heights = Array.from({ length: 91 }, (_, i) => 140 + i);
  const weights = Array.from({ length: 121 }, (_, i) => 40 + i);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A1F3D] to-[#1A1F2C] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-8 border-orange-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-transparent border-t-orange-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            Создаём ваш личный план тренировок
          </h2>
          <p className="text-muted-foreground">Анализируем ваши данные и подбираем оптимальную программу...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A1F3D] to-[#1A1F2C] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Шаг {step} из {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Что мотивирует вас больше всего?</h2>
                <div className="grid gap-3">
                  {[
                    { value: 'gain_form', label: 'Набрать форму', icon: 'TrendingUp' },
                    { value: 'photo_look', label: 'Для лучшего вида для фото', icon: 'Camera' },
                    { value: 'confidence', label: 'Чувствовать себя уверенно', icon: 'Smile' },
                    { value: 'sports_ability', label: 'Лучшая спортивная способность', icon: 'Zap' },
                    { value: 'stress_relief', label: 'Снять стресс', icon: 'Heart' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.motivation === option.value ? 'default' : 'outline'}
                      className={`h-auto py-4 justify-start text-left ${
                        data.motivation === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                          : 'hover:border-orange-500/50'
                      }`}
                      onClick={() => updateData('motivation', option.value)}
                    >
                      <Icon name={option.icon as any} className="mr-3" size={24} />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Достигали ли вы когда-либо подобной цели?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'yes', label: 'Да', icon: 'CheckCircle2' },
                    { value: 'no', label: 'Нет', icon: 'XCircle' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.hasExperience === option.value ? 'default' : 'outline'}
                      className={`h-32 flex-col gap-3 ${
                        data.hasExperience === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                          : 'hover:border-orange-500/50'
                      }`}
                      onClick={() => updateData('hasExperience', option.value)}
                    >
                      <Icon name={option.icon as any} size={48} />
                      <span className="text-xl">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Выберите пол</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'female', label: 'Женский', icon: 'User' },
                    { value: 'male', label: 'Мужской', icon: 'User' },
                    { value: 'other', label: 'Другое', icon: 'Users' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.gender === option.value ? 'default' : 'outline'}
                      className={`h-32 flex-col gap-3 ${
                        data.gender === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                          : 'hover:border-orange-500/50'
                      }`}
                      onClick={() => updateData('gender', option.value)}
                    >
                      <Icon name={option.icon as any} size={48} />
                      <span className="text-lg">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Какого питания вы придерживаетесь?</h2>
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
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                          : 'hover:border-orange-500/50'
                      }`}
                      onClick={() => updateData('diet', option.value)}
                    >
                      <Icon name={option.icon as any} size={48} />
                      <span className="text-lg">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Придерживаетесь ли вы определённых часов для приёма пищи?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'yes', label: 'Да', icon: 'Clock' },
                    { value: 'no', label: 'Нет', icon: 'Clock' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.mealSchedule === option.value ? 'default' : 'outline'}
                      className={`h-32 flex-col gap-3 ${
                        data.mealSchedule === option.value
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                          : 'hover:border-orange-500/50'
                      }`}
                      onClick={() => updateData('mealSchedule', option.value)}
                    >
                      <Icon name={option.icon as any} size={48} />
                      <span className="text-xl">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Какая сейчас у вас форма тела?</h2>
                <div className="flex justify-around items-end gap-2 py-8">
                  {bodyTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => updateData('currentBody', type.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-110 ${
                        data.currentBody === type.id
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 scale-110'
                          : 'bg-muted/30'
                      }`}
                    >
                      <span className="text-4xl">{type.emoji}</span>
                      <span className="text-xs text-center">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Какую форму тела вы хотите?</h2>
                <div className="flex justify-around items-end gap-2 py-8">
                  {bodyTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => updateData('targetBody', type.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all hover:scale-110 ${
                        data.targetBody === type.id
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 scale-110'
                          : 'bg-muted/30'
                      }`}
                    >
                      <span className="text-4xl">{type.emoji}</span>
                      <span className="text-xs text-center">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Над чем хотите поработать?</h2>
                <p className="text-center text-muted-foreground text-sm">Можно выбрать несколько</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: 'chest', label: 'Грудь', icon: 'Heart' },
                    { value: 'arms', label: 'Руки', icon: 'Dumbbell' },
                    { value: 'abs', label: 'Пресс', icon: 'Square' },
                    { value: 'legs', label: 'Ноги', icon: 'Footprints' },
                    { value: 'full', label: 'Всё тело', icon: 'User' },
                  ].map(option => (
                    <Button
                      key={option.value}
                      variant={data.workArea.includes(option.value) ? 'default' : 'outline'}
                      className={`h-24 flex-col gap-2 ${
                        data.workArea.includes(option.value)
                          ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                          : 'hover:border-orange-500/50'
                      }`}
                      onClick={() => toggleWorkArea(option.value)}
                    >
                      <Icon name={option.icon as any} size={32} />
                      <span>{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Укажите свой год рождения</h2>
                <ScrollArea className="h-[400px] mx-auto max-w-xs">
                  <div className="space-y-2 p-4">
                    {years.map(year => (
                      <Button
                        key={year}
                        variant={data.birthYear === year ? 'default' : 'outline'}
                        className={`w-full ${
                          data.birthYear === year
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0'
                            : 'hover:border-orange-500/50'
                        }`}
                        onClick={() => updateData('birthYear', year)}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Укажите свой рост</h2>
                <div className="flex items-center justify-center gap-8">
                  <div className="relative h-[400px] w-24">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon name="User" size={80} className="text-orange-500 opacity-20" />
                    </div>
                    <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-orange-500 to-pink-500"></div>
                    <div
                      className="absolute right-0 w-8 h-px bg-orange-500 transition-all"
                      style={{ top: `${((data.height - 140) / 90) * 100}%` }}
                    >
                      <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded font-bold whitespace-nowrap">
                        {data.height} см
                      </div>
                    </div>
                  </div>
                  <ScrollArea className="h-[400px] w-32">
                    <div className="space-y-1 p-2">
                      {heights.map(height => (
                        <Button
                          key={height}
                          variant={data.height === height ? 'default' : 'ghost'}
                          className={`w-full ${
                            data.height === height
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500'
                              : ''
                          }`}
                          onClick={() => updateData('height', height)}
                        >
                          {height}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}

            {step === 11 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Сколько вы сейчас весите?</h2>
                <div className="py-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                      {data.currentWeight} кг
                    </div>
                  </div>
                  <ScrollArea className="h-[300px] max-w-2xl mx-auto">
                    <div className="flex gap-2 px-4 pb-4">
                      {weights.map(weight => (
                        <Button
                          key={weight}
                          variant={data.currentWeight === weight ? 'default' : 'outline'}
                          className={`flex-shrink-0 w-20 h-20 ${
                            data.currentWeight === weight
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0 scale-110'
                              : 'hover:border-orange-500/50'
                          }`}
                          onClick={() => updateData('currentWeight', weight)}
                        >
                          {weight}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}

            {step === 12 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Какой вес вы хотите?</h2>
                <div className="py-8">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                      {data.targetWeight} кг
                    </div>
                  </div>
                  <ScrollArea className="h-[300px] max-w-2xl mx-auto">
                    <div className="flex gap-2 px-4 pb-4">
                      {weights.map(weight => (
                        <Button
                          key={weight}
                          variant={data.targetWeight === weight ? 'default' : 'outline'}
                          className={`flex-shrink-0 w-20 h-20 ${
                            data.targetWeight === weight
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 border-0 scale-110'
                              : 'hover:border-orange-500/50'
                          }`}
                          onClick={() => updateData('targetWeight', weight)}
                        >
                          {weight}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex-1 border-orange-500/50 hover:bg-orange-500/10"
            >
              <Icon name="ChevronLeft" className="mr-2" />
              Назад
            </Button>
          )}
          <Button
            onClick={nextStep}
            disabled={
              (step === 1 && !data.motivation) ||
              (step === 2 && !data.hasExperience) ||
              (step === 3 && !data.gender) ||
              (step === 4 && !data.diet) ||
              (step === 5 && !data.mealSchedule) ||
              (step === 6 && !data.currentBody) ||
              (step === 7 && !data.targetBody) ||
              (step === 8 && data.workArea.length === 0)
            }
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          >
            {step === 12 ? 'Создать план' : 'Далее'}
            <Icon name="ChevronRight" className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
