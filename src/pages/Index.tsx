import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const GIFT_CATEGORIES = ['Все', 'Премиум', 'Детям', 'Корпоративные', 'Сладости'];

const GIFTS = [
  {
    id: 1,
    name: 'Новогодний Premium набор',
    price: 4990,
    category: 'Премиум',
    image: 'https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/e829ffdd-a040-4e8f-aebe-762682695e29.jpg',
    discount: 20,
    description: 'Эксклюзивный набор с элитными сладостями и игристым вином'
  },
  {
    id: 2,
    name: 'Волшебство для детей',
    price: 1990,
    category: 'Детям',
    image: 'https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/27546c49-e2f2-4f12-936e-ba196f5fe6ef.jpg',
    discount: 15,
    description: 'Набор с игрушками, сладостями и новогодней книгой'
  },
  {
    id: 3,
    name: 'Корпоративный стандарт',
    price: 2990,
    category: 'Корпоративные',
    image: 'https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/7e1189cf-66b0-4399-88f3-c8d86aa361a9.jpg',
    discount: 0,
    description: 'Универсальный подарок для сотрудников компании'
  },
  {
    id: 4,
    name: 'Сладкая сказка',
    price: 1490,
    category: 'Сладости',
    image: 'https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/e829ffdd-a040-4e8f-aebe-762682695e29.jpg',
    discount: 10,
    description: 'Ассорти из премиальных конфет и шоколада'
  },
  {
    id: 5,
    name: 'Делюкс набор 2026',
    price: 7990,
    category: 'Премиум',
    image: 'https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/e829ffdd-a040-4e8f-aebe-762682695e29.jpg',
    discount: 25,
    description: 'Роскошный подарок с эксклюзивным наполнением'
  },
  {
    id: 6,
    name: 'Зимние радости',
    price: 2490,
    category: 'Детям',
    image: 'https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/27546c49-e2f2-4f12-936e-ba196f5fe6ef.jpg',
    discount: 0,
    description: 'Увлекательный набор для творчества и развлечений'
  },
];

const PROMOTIONS = [
  { id: 1, title: 'Скидка 25% на премиум наборы', description: 'При заказе от 3-х подарков', badge: 'Хит' },
  { id: 2, title: 'Бесплатная доставка', description: 'При покупке от 10 000 ₽', badge: 'Акция' },
  { id: 3, title: 'Корпоративные скидки', description: 'От 15% при заказе от 50 штук', badge: 'Выгодно' },
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedGift, setSelectedGift] = useState<typeof GIFTS[0] | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredGifts = selectedCategory === 'Все' 
    ? GIFTS 
    : GIFTS.filter(gift => gift.category === selectedCategory);

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setIsOrderDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Icon name="Gift" className="h-7 w-7 text-secondary" />
            <h1 className="font-heading text-2xl font-bold tracking-tight">Новогодние Подарки 2026</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-sm font-medium hover:text-secondary transition-colors tracking-wide">Каталог</a>
            <a href="#about" className="text-sm font-medium hover:text-secondary transition-colors tracking-wide">О нас</a>
            <a href="#delivery" className="text-sm font-medium hover:text-secondary transition-colors tracking-wide">Доставка</a>
            <a href="#promotions" className="text-sm font-medium hover:text-secondary transition-colors tracking-wide">Акции</a>
            <a href="#contacts" className="text-sm font-medium hover:text-secondary transition-colors tracking-wide">Контакты</a>
          </nav>
          <Button className="bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all">
            <Icon name="Phone" className="mr-2 h-4 w-4" />
            Заказать звонок
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden text-white py-20 md:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://cdn.poehali.dev/projects/46c39c87-0ecc-4bc1-b299-3118ec37f73e/files/f7b11d1f-573d-4ecf-977a-8306b9f55011.jpg')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjgiLz48L3N2Zz4=')] opacity-60 animate-pulse"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-accent/90 text-foreground border-0 px-4 py-2 text-sm font-semibold tracking-wide uppercase shadow-lg">Новинки 2026</Badge>
            <h2 className="font-heading text-5xl md:text-7xl font-bold mb-8 drop-shadow-2xl leading-tight text-lime-300">
              Волшебные подарки для незабываемого Нового года
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/95 font-light leading-relaxed max-w-2xl mx-auto">
              Эксклюзивные наборы премиум-класса с индивидуальным подходом к каждому клиенту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8">
                <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                Выбрать подарок
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8">
                <Icon name="Sparkles" className="mr-2 h-5 w-5" />
                Акции
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="promotions" className="py-24 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Специальные предложения</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PROMOTIONS.map((promo, index) => (
              <Card key={promo.id} className="border border-border/50 hover:border-secondary hover:shadow-2xl transition-all duration-300 animate-scale-in bg-white" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="space-y-3">
                  <Badge className="w-fit bg-secondary/10 text-secondary border border-secondary/20 font-semibold tracking-wide">{promo.badge}</Badge>
                  <CardTitle className="font-heading text-2xl">{promo.title}</CardTitle>
                  <CardDescription className="text-base">{promo.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Каталог подарков</h2>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {GIFT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-secondary hover:bg-secondary/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGifts.map((gift, index) => (
              <Card key={gift.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in group border border-border/50 bg-white" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="relative overflow-hidden">
                  <img 
                    src={gift.image} 
                    alt={gift.name}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {gift.discount > 0 && (
                    <Badge className="absolute top-4 right-4 bg-secondary text-white border-0 shadow-lg text-base px-3 py-1">-{gift.discount}%</Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <CardHeader className="space-y-2">
                  <Badge className="w-fit text-xs font-semibold tracking-wide" variant="outline">{gift.category}</Badge>
                  <CardTitle className="font-heading text-2xl tracking-tight">{gift.name}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{gift.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-3">
                    {gift.discount > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-secondary">
                          {Math.round(gift.price * (1 - gift.discount / 100))} ₽
                        </span>
                        <span className="text-muted-foreground line-through text-base">{gift.price} ₽</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold">{gift.price} ₽</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={isOrderDialogOpen && selectedGift?.id === gift.id} onOpenChange={(open) => {
                    setIsOrderDialogOpen(open);
                    if (open) setSelectedGift(gift);
                  }}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-secondary hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all text-base py-6" onClick={() => setSelectedGift(gift)}>
                        <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
                        Оформить заказ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-heading">Оформление заказа</DialogTitle>
                        <DialogDescription>
                          {selectedGift?.name} - {selectedGift?.discount ? Math.round(selectedGift.price * (1 - selectedGift.discount / 100)) : selectedGift?.price} ₽
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleOrder} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ваше имя</Label>
                          <Input id="name" placeholder="Иван Иванов" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон</Label>
                          <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="example@mail.ru" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Количество</Label>
                          <Input id="quantity" type="number" min="1" defaultValue="1" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="comment">Комментарий</Label>
                          <Textarea id="comment" placeholder="Особые пожелания к заказу" />
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                            Отправить заявку
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы специализируемся на создании уникальных новогодних подарков с 2015 года. 
              Каждый набор собирается вручную с любовью и вниманием к деталям.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Icon name="Award" className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">9 лет опыта</h3>
                <p className="text-sm text-muted-foreground">Безупречная репутация</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Icon name="Users" className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">50 000+ клиентов</h3>
                <p className="text-sm text-muted-foreground">Довольных покупателей</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Icon name="Truck" className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">Доставка по РФ</h3>
                <p className="text-sm text-muted-foreground">В любой город</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-heading text-lg">Способы доставки</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Мы доставляем по Москве курьером, по России - через СДЭК и Почту России. 
                  Сроки доставки: Москва 1-2 дня, регионы 3-7 дней. Бесплатная доставка при заказе от 10 000 ₽.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-heading text-lg">Способы оплаты</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Принимаем оплату картой онлайн, наличными курьеру, безналичный расчет для юридических лиц. 
                  Возможна отсрочка платежа для корпоративных клиентов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-heading text-lg">Возврат и обмен</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Гарантируем качество всех подарков. При обнаружении брака - полный возврат средств или обмен. 
                  Срок возврата - 14 дней с момента получения.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-heading text-lg">Корпоративным клиентам</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Специальные условия для компаний: скидки от 15%, персональный менеджер, 
                  брендирование подарков, отсрочка платежа, работа с НДС.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Свяжитесь с нами</CardTitle>
                <CardDescription>Ответим на все вопросы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Phone" className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-semibold">+7 (495) 123-45-67</p>
                    <p className="text-sm text-muted-foreground">Ежедневно 9:00 - 21:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-semibold">info@newyeargifts.ru</p>
                    <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="font-semibold">г. Москва, ул. Примерная, д. 123</p>
                    <p className="text-sm text-muted-foreground">Пн-Пт 10:00 - 19:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Быстрая заявка</CardTitle>
                <CardDescription>Мы перезвоним в течение 15 минут</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Спасибо!",
                    description: "Ожидайте звонка менеджера",
                  });
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Телефон</Label>
                    <Input id="contact-phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Gift" className="h-6 w-6 text-accent" />
                <h3 className="font-heading font-bold text-lg">Новогодние Подарки 2026</h3>
              </div>
              <p className="text-sm text-white/80">Создаём праздничное настроение с 2015 года</p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-accent transition-colors">Премиум подарки</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Детские наборы</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Корпоративные</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Сладости</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#about" className="hover:text-accent transition-colors">О компании</a></li>
                <li><a href="#delivery" className="hover:text-accent transition-colors">Доставка</a></li>
                <li><a href="#promotions" className="hover:text-accent transition-colors">Акции</a></li>
                <li><a href="#contacts" className="hover:text-accent transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Мы в соцсетях</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center">
                  <Icon name="Facebook" className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center">
                  <Icon name="Instagram" className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-accent transition-colors flex items-center justify-center">
                  <Icon name="Send" className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>© 2026 Новогодние Подарки. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}