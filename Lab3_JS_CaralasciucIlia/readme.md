# Лабораторная №3 `Caralasciuc Ilia IA2403`
## Запуск проекта
- Открытие файла `HTML\index.html`
- Открытия консоли браузера, чреез `F12` или `конекстное меню->код элемента`

## Цель лабораторной работы
Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование.

## Условие работы
Создайте консольное приложение, моделирующее систему инвентаря, где можно добавлять предметы, изменять их свойства и управлять ими.

## Оглавление
- Выполнение заданий

  1. [Шаг 1. Создание класса Item](#шаг-1-создание-класса-item)
  2. [Шаг 2. Создание класса Weapon](#шаг-2-создание-класса-weapon)
  3. [Шаг 3. Тестирование](#шаг-3-тестирование)
  4. [Шаг 4. Дополнительное задание](#шаг-4-дополнительное-задание)
- [Контрольные вопросы](#контрольные-вопросы)
- [Список источников](#использованные-источники)

## Шаг 1. Создание класса `Item`
Создаю класс Item, который будет представлять предмет в инвентаре.

### Поля класса:
- `name` – название предмета.
- `weight` – вес предмета.
- `rarity` – редкость предмета (common, uncommon, rare, legendary).
### Методы:
- `getInfo()` – возвращает строку с информацией о предмете.
- `setWeight(newWeight)` – изменяет вес предмета.

### Реализация: 

```js
/**
 * Класс, содержащий в себе поля названия, веса и редкости предмета, а также методы изменения веса и вывода информации о предмете.
 */
class Item {
    name; //название предмета
    weight; //вес предмета
    rarity; // редкость предмета (common, uncommon, rare, legenadary)

    constructor(newName, newWeight, newRarity)
    {
        this.name = newName;
        this.weight = newWeight;
        this.rarity = newRarity;
    }

    /**
     * 
     * @returns Возвращает строку, содержающую всю информацию о классе.
     */
    getInfo()
    {
        return `Обьект имеет следующие свойства:
        \n\tИмя - ${this.name}
        \n\tВес предмета - ${this.weight}
        \n\tРедкость предмета - ${this.rarity}`;
    }

    /**
    * 
    * @param {number} newWeight Новый вес предмета
    */
    setWeight(newWeight)
    {
        this.weight = newWeight;
    }
}
```

## Шаг 2. Создание класса `Weapon`
Создаю класс Weapon, который расширяет Item.

### Дополнительные поля:
- `damage` – урон оружия.
- `durability` – прочность (от 0 до 100).
Методы:
- `use()` – уменьшает durability на 10 (если `durability` > 0).
- `repair()` – восстанавливает durability до 100.

### Реализация:

```js
class Weapon extends Item {
    damage; //урон оружия
    durability; //прочность (от 0 до 100)

    constructor(newName, newWeight, newRarity, newDamage, newDurability)
    {
        super(newName, newWeight, newRarity);
        this.damage = newDamage;
        this.durability = newDurability;
    }

    /**
     * Функция, уменьшающая прочность оружия после каждого использования.
     */
    use()
    {
        if(this.durability > 0) {
            this.durability -= 10;
            console.log(`После удара прочность вашего оружия снизилась на 10 единиц, теперь текущая прочность равна ${this.durability}`);
        }
    }

    /**
     * Функция, реализующая увеличение прочности до изначальных 100 единиц.
     */
    repair()
    {
        this.durability = 100;
        console.log(`Ваше оружие отремантировано и теперь его прочность снова составляет ${this.durability} единиц!`);
    }
}
```

## Шаг 3. Тестирование
1. Создайте несколько объектов классов Item и Weapon.
2. Вызовите их методы, чтобы убедиться в правильности работы.

### Реализация:
```js
let apple = new Item("apple", 0.2, "common");
let pear = new Item("pear", 0.2, "common");
let tree = new Item("tree", 10, "common");

let bow = new Weapon("bow", 5, "rare", 20, 100);
let sword = new Weapon("sword", 7, "rare", 25, 100);

console.log(apple.getInfo());
console.log(pear.setWeight(0.5));
console.log(pear.getInfo());

console.log(bow.getInfo());
bow.use();
bow.repair();
```

## Шаг 4. Дополнительное задание
1. Опциональная цепочка (?.) – используйте ее при доступе к свойствам объекта, чтобы избежать ошибок.
2. Создание функции-конструктора:
    - Перепишите классы Item и Weapon, используя функции-конструкторы вместо class.

```js
/**
 * Создает обьект с тремя полями (свойствами обьекта)
 * @param {*} newName Название предмета
 * @param {*} weight Вес предмета
 * @param {*} rarity Редкость предмета
 */
function FuncItem(newName, weight, rarity) {
    this.name = newName;
    this.weight = weight;
    this.rarity = rarity;
}

/**
 * Реализует функцию getInfo() в качестве анонимной функции, присвоенной методу обьекта prototype функции FuncItem.
 * @returns Возвращает строку, содержающую всю информацию о классе.
 */
FuncItem.prototype.getInfo = function() {
    return `Обьект имеет следующие свойства:
    \n\tИмя - ${this.name}
    \n\tВес предмета - ${this.weight}
    \n\tРедкость предмета - ${this.rarity}`;
};

/**
 * Реализует функцию setWeight(newWeight) в качестве анонимной функции, присвоенной методу обьекта prototype функции FuncItem
 * @param {*} newWeight Новый вес предмета
 */
FuncItem.prototype.setWeight = function(newWeight) {
    this.weight = newWeight;
};

/**
 * Дочерняя функция функции FuncItem, наследующая свойства name, weight и rarity, а также добавляющая свойства damage и durability.
 * @param {*} newName Название оружия
 * @param {*} weight Вес оружия
 * @param {*} rarity Редкость оружия
 * @param {*} damage Урон оружия
 * @param {*} durability Прочность оружия
 */
function FuncWeapon(name, weight, rarity, damage, durability) {
    FuncItem.call(this, name, weight, rarity); // делегируем инициализацию данных переменных родительской функции
    this.damage = damage;
    this.durability = durability;
}

FuncWeapon.prototype = Object.create(FuncItem.prototype); // наследуем все методы функции FuncItem
FuncWeapon.prototype.constructor = FuncWeapon; // меняем измененный конструктор на изначальный

/**
     * Анонимная функция, присвоенная методу use() функции FuncWeapon, уменьшающая прочность оружия после каждого использования.
     */
FuncWeapon.prototype.use = function() {
        if(this.durability > 0) {
            this.durability -= 10;
            console.log(`После удара прочность вашего оружия снизилась на 10 единиц, теперь текущая прочность равна ${this.durability}`);
        }
    }

/**
* Анонимная функция, присвоенная методу repair() функции FuncWeapon, реализующая увеличение прочности до изначальных 100 единиц.
*/    
FuncWeapon.prototype.repair = function() {
        this.durability = 100;
        console.log(`Ваше оружие отремантировано и теперь его прочность снова составляет ${this.durability} единиц!`);
    }


let newApple = new FuncItem("apple", 0.2, "common");
let newPear = new FuncItem("pear", 0.2, "common");
let newTree = new FuncItem("tree", 10, "common");

let newBow = new FuncWeapon("newBow", 5, "rare", 20, 100);
let newSword = new FuncWeapon("sword", 7, "rare", 25, 100);

console.log(newApple.getInfo());
newPear.setWeight(0.5);
console.log(newPear.getInfo());

console.log(newBow.getInfo());
newBow.use();
newBow.repair();
```

## Контрольные вопросы
1. Какое значение имеет this в методах класса?
    #### Ответ: this является указателем на текущий экземпляр класса.
2. Как работает модификатор доступа # в JavaScript?
    #### Ответ: Модификатор # делает свойство или метод приватным – доступным только внутри класса.
3. В чем разница между классами и функциями-конструкторами?
    #### Ответ: 
    - Cинтаксис написания (`class Item {}` и `function Item() {}`) 
    - Разница в наследовании (для класса - `extends`, для функции - `Weapon.prototype = Object.create(Item.prototype)` с последующим изменением прототипа конструктора на исходный) \n
    - Вызов родительских конструкторов (в классах функция `super()`, в функциях `Item.call()`).

## Использованные источники
- [MoodleUSM](https://moodle.usm.md/mod/page/view.php?id=300750)
- [Stack Overflow](https://ru.stackoverflow.com/questions/789389/Как-в-markdown-сделать-ссылку-для-перехода-к-заголовку)
- [GitHub](https://gist.github.com/asabaylus/3071099#start-of-content)