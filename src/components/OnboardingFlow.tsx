import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OnboardingData {
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
    currentWeight: 70,
    targetWeight: 65,
    currentBody: 3,
    targetBody: 4,
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const updateData = (field: keyof OnboardingData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === totalSteps - 1) {
      onComplete(data);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const bodyTypes = [
    { id: 1, label: 'Полная', emoji: '⚫' },
    { id: 2, label: 'Избыточный вес', emoji: '🔴' },
    { id: 3, label: 'Средняя', emoji: '🟡' },
    { id: 4, label: 'Спортивная', emoji: '🟢' },
    { id: 5, label: 'Фитнес', emoji: '💪' },
  ];

  const weights = Array.from({ length: 121 }, (_, i) => 40 + i);

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
        <div className="absolute inset-x-0 top-[120px] h-[60px] bg-orange-500/20 border-y-2 border-orange-500 rounded-lg z-10 pointer-events-none" />
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
                    : 'text-muted-foreground scale-90'
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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A1F3D] to-[#1A1F2C] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6 animate-fade-in">
        {step > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Шаг {step} из {totalSteps - 1}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20 overflow-hidden">
          <CardContent className="p-8">
            {step === 0 && (
              <div className="space-y-8 text-center">
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/40ac6470-c4e3-4e44-a00f-5f69826d17cd.jpg"
                    alt="Fitness woman"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    Добро пожаловать!
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Приложение "Худей за 30 дней"
                  </p>
                  <p className="text-muted-foreground">
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
                  <h2 className="text-2xl font-bold">Какой у вас текущий вес?</h2>
                  <div className="text-6xl">⚖️</div>
                </div>
                {renderWheelPicker(data.currentWeight, weights, (val) => updateData('currentWeight', val), 'кг')}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={nextStep}
                >
                  Далее
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Какой вес вы хотите достичь?</h2>
                  <div className="text-6xl">🎯</div>
                </div>
                {renderWheelPicker(data.targetWeight, weights, (val) => updateData('targetWeight', val), 'кг')}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={nextStep}
                >
                  Далее
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Какова ваша текущая форма тела?</h2>
                  <div className="text-6xl">👤</div>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <div className="absolute inset-x-0 top-[120px] h-[60px] bg-orange-500/20 border-y-2 border-orange-500 rounded-lg z-10 pointer-events-none" />
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
                            data.currentBody === type.id ? 'text-orange-500' : 'text-muted-foreground'
                          }`}>
                            {type.label}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="w-[200px] shrink-0" />
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={nextStep}
                >
                  Далее
                </Button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Какую форму тела вы хотите достичь?</h2>
                  <div className="text-6xl">💫</div>
                </div>
                <div className="relative h-[300px] overflow-hidden">
                  <div className="absolute inset-x-0 top-[120px] h-[60px] bg-orange-500/20 border-y-2 border-orange-500 rounded-lg z-10 pointer-events-none" />
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
                            data.targetBody === type.id ? 'text-orange-500' : 'text-muted-foreground'
                          }`}>
                            {type.label}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="w-[200px] shrink-0" />
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  onClick={nextStep}
                >
                  Завершить
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingFlow;
