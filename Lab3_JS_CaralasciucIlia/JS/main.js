//Вариант первый

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

/**
 * Порожденный класс базового класса Item с дополнительными полями урона и прочности, реализующий обьект оружия. Имеет также функции использования оружия и ремонта. 
 */
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


//Вариант второй

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