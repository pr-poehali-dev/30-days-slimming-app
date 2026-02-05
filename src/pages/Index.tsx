import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OnboardingFlow from '@/components/OnboardingFlow';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showVideo, setShowVideo] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const recipes = [
    { name: 'Овсянка с ягодами', calories: 320, protein: 12, carbs: 54, fat: 8, category: 'Завтрак' },
    { name: 'Куриная грудка с овощами', calories: 380, protein: 42, carbs: 25, fat: 12, category: 'Обед' },
    { name: 'Греческий салат', calories: 280, protein: 8, carbs: 18, fat: 20, category: 'Обед' },
    { name: 'Творог с орехами', calories: 220, protein: 20, carbs: 12, fat: 10, category: 'Перекус' },
    { name: 'Лосось на пару', calories: 450, protein: 38, carbs: 8, fat: 28, category: 'Ужин' },
    { name: 'Протеиновый смузи', calories: 180, protein: 25, carbs: 15, fat: 3, category: 'Перекус' },
  ];



  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A1F3D] to-[#1A1F2C]">
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl mx-4">
            <img
              src="https://cdn.poehali.dev/projects/f10591a6-0be3-41b5-a1e2-1aa43bcc101c/files/3f4638f7-3b5c-4207-a580-5d16be902f4c.jpg"
              alt="Тренировка"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <Button
              onClick={() => setShowVideo(false)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-bold shadow-lg"
            >
              Начать трансформацию
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            FitTransform 30
          </h1>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10">
            <Icon name="User" size={20} />
          </Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-card/50 backdrop-blur-sm p-1">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500">
              <Icon name="Home" size={18} />
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500">
              <Icon name="Apple" size={18} />
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500">
              <Icon name="TrendingUp" size={18} />
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500">
              <Icon name="Settings" size={18} />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6 animate-fade-in">
            <Card className="bg-gradient-to-r from-orange-500 to-pink-500 border-0 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">День 12 из 30</h2>
                <p className="text-white/90 mb-4">Ты на правильном пути! Продолжай в том же духе 💪</p>
                <Progress value={40} className="h-3 bg-white/20" />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20">
                <CardContent className="p-6 text-center">
                  <Icon name="Flame" size={32} className="mx-auto mb-2 text-orange-500" />
                  <div className="text-3xl font-bold text-orange-500">1,850</div>
                  <div className="text-sm text-muted-foreground">Калории сегодня</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-pink-500/20">
                <CardContent className="p-6 text-center">
                  <Icon name="Activity" size={32} className="mx-auto mb-2 text-pink-500" />
                  <div className="text-3xl font-bold text-pink-500">-3.2 кг</div>
                  <div className="text-sm text-muted-foreground">Прогресс веса</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardContent className="p-6 text-center">
                  <Icon name="Trophy" size={32} className="mx-auto mb-2 text-blue-500" />
                  <div className="text-3xl font-bold text-blue-500">12</div>
                  <div className="text-sm text-muted-foreground">Дней подряд</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Target" className="text-orange-500" />
                  Сегодняшние задачи
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="CheckCircle2" className="text-green-500" size={24} />
                    <span>Утренняя тренировка</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/50">Готово</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Circle" className="text-orange-500" size={24} />
                    <span>Выпить 2л воды</span>
                  </div>
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/50">1.5л / 2л</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Circle" className="text-muted-foreground" size={24} />
                    <span>Вечерняя растяжка</span>
                  </div>
                  <Badge variant="outline">В ожидании</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          <TabsContent value="nutrition" className="animate-fade-in">
            <Card className="bg-card/50 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Filter" className="text-orange-500" />
                  Фильтр по категории
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Все', 'Завтрак', 'Обед', 'Ужин', 'Перекус'].map((cat) => (
                    <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-orange-500/20 border-orange-500/50">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe, idx) => (
                <Card key={idx} className="bg-card/50 backdrop-blur-sm hover:scale-105 transition-transform cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">{recipe.category}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-orange-500/10 rounded">
                      <span className="text-sm">Калории</span>
                      <span className="font-bold text-orange-500">{recipe.calories} ккал</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="font-bold text-blue-400">{recipe.protein}г</div>
                        <div className="text-xs text-muted-foreground">Белки</div>
                      </div>
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="font-bold text-green-400">{recipe.carbs}г</div>
                        <div className="text-xs text-muted-foreground">Углеводы</div>
                      </div>
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <div className="font-bold text-yellow-400">{recipe.fat}г</div>
                        <div className="text-xs text-muted-foreground">Жиры</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>



          <TabsContent value="progress" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingDown" className="text-green-500" />
                    Динамика веса
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-around gap-2">
                    {[72, 71.5, 71.2, 70.8, 70.5, 70.1, 69.8, 69.5, 69.2, 68.8].map((weight, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-orange-500 to-pink-500 rounded-t"
                          style={{ height: `${((72 - weight) / 4) * 100 + 20}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <div className="text-2xl font-bold text-green-500">-3.2 кг</div>
                    <div className="text-sm text-muted-foreground">За 12 дней</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Zap" className="text-orange-500" />
                    Активность
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Тренировки</span>
                      <span className="text-sm font-semibold">12 / 30 дней</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Калории сожжено</span>
                      <span className="text-sm font-semibold">4,200 ккал</span>
                    </div>
                    <Progress value={65} className="h-2 [&>div]:bg-orange-500" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Пройденные курсы</span>
                      <span className="text-sm font-semibold">3 / 100</span>
                    </div>
                    <Progress value={3} className="h-2 [&>div]:bg-pink-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Award" className="text-yellow-500" />
                    Достижения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: 'Flame', title: 'Первая неделя', color: 'text-orange-500' },
                      { icon: 'Target', title: '10 тренировок', color: 'text-blue-500' },
                      { icon: 'Heart', title: 'Здоровое питание', color: 'text-pink-500' },
                      { icon: 'Trophy', title: 'Целеустремленный', color: 'text-yellow-500' },
                    ].map((achievement, idx) => (
                      <div key={idx} className="p-4 bg-muted/30 rounded-lg text-center space-y-2">
                        <Icon name={achievement.icon as any} size={40} className={`mx-auto ${achievement.color}`} />
                        <div className="text-sm font-semibold">{achievement.title}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm md:col-span-1">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mx-auto flex items-center justify-center">
                    <Icon name="User" size={48} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Мария Иванова</h3>
                    <p className="text-sm text-muted-foreground">maria@example.com</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm md:col-span-2">
                <CardHeader>
                  <CardTitle>Параметры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Текущий вес</div>
                      <div className="text-2xl font-bold text-orange-500">68.8 кг</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Целевой вес</div>
                      <div className="text-2xl font-bold text-green-500">65 кг</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Рост</div>
                      <div className="text-2xl font-bold">168 см</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Возраст</div>
                      <div className="text-2xl font-bold">28 лет</div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Bell" className="mr-2" size={20} />
                      Уведомления
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="Lock" className="mr-2" size={20} />
                      Конфиденциальность
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon name="HelpCircle" className="mr-2" size={20} />
                      Помощь и поддержка
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;