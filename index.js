class Book {
  constructor(title, author, ISBN, price, availability) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.price = price;
    this.availability = availability;
  }
}
class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  placeOrder(cart) {
    if (cart.books.length === 0) {
      throw new Error("Cart is empty. Please add books to your cart.");
    }

    const order = new Order(this, cart);
    return order;
  }
}
class Cart {
    constructor() {
        this.books = [];
    }
  addBooks(...args) {
    for (let book of args) {
      if (!(book instanceof Book)) {
        throw new Error(`passed object is not a Book!`);
      }
      this.books.push(book);
    }
  }
  removeBooks() {
    this.books = [];
  }
  calculateBooksPrice() {
    let sum = 0;
    for (let book of this.books) {
      sum += book.price;
    }
    return sum;
  }
}
class Order {
  constructor(user, cart) {
    this.user = user;
    this.cart = cart;
  }
}

const book1 = new Book("test", "test", "test", 40, "test");
const book2 = new Book("test", "test", "test", 10, "test");
const book3 = new Book("test", "test", "test", 40, "test");
const user1 = new User("michael scott", "test@gmail.com", 1);
const user2 = new User("pam beesly", "test@gmail.com", 2);

const cart1 = new Cart();
cart1.addBooks(book1, book2);
console.log(cart1.books);

const order1 = user1.placeOrder(cart1);
console.log(order1.cart.calculateBooksPrice());
console.log(order1.cart.books[0]);

cart1.removeBooks();
console.log(order1.cart.books);
console.log(order1.cart.calculateBooksPrice());