// creating class Book
// only interesting moment is method checkYourLuck - user can check their luck and search for the money in a book, if they fail - book is automatically placed on their cart
class Book {
  constructor(title, author, ISBN, price, availability) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.price = price;
    this.availability = availability;
  }
  checkYourLuck(user) {
    if (!(user instanceof User)) {
      throw new Error(
        "only user can check their luck and search for money on a book"
      );
    } else if (this.availability === "out of stock") {
      throw new Error(`${this.title} is not available`);
    }
    const luck = Math.random() * 100;
    if (luck > 50) {
      console.log("hooray! You`ve just found 10$ in this book");
      user.money += 10;
    } else {
      console.log(
        "For some reason you thought it`s a good idea to search a book for money - who could have predicted that..? Now the store wants you to pay for this book full price"
      );
      user.cart.addBooks(this);
    }
  }
}

// class User with name, email and id
// also this class starts with it's own cart
// placeOrder method is checking if the cart is empty and if its not - order is being created
// after creation it goes through the cart and returns an order (also removing books from the cart)
class User {
  constructor(name, email, id, money) {
    this.name = name;
    this.email = email;
    this.id = id;
    this.money = money;
    this.cart = new Cart();
  }

  placeOrder() {
    if (this.cart.books.length === 0) {
      throw new Error("Cart is empty. Please add books to your cart.");
    }
    const order = new Order(this, this.cart);
    order.checkMoney()
    const orderBooks = [];
    for (let book of this.cart.books) {
      orderBooks.push(book.title);
      console.log(`${book.title} is placed in order and removed from cart`);
    }
    this.cart.removeBooks();
    console.log(
      `${order.user.name} just placed an order with their cart and goes home with these books: ${orderBooks} and with ${this.money}$ left`
    );
    return order;
  }
}

// class Cart with methods:
// add books - add any books in any quantity
// remove books - empty the array of books
// discardSingleBook - if you just want remove single book
// calculateTotalPrice - return sum of all books in a cart
class Cart {
  constructor() {
    this.books = [];
  }
  addBooks(...args) {
    for (let book of args) {
      if (!(book instanceof Book)) {
        throw new Error(`passed object is not a Book!`);
      } else if (book.availability === "out of stock") {
        throw new Error(`${book.title} is not available`);
      }
      this.books.push(book);
      console.log(`${book.title} added to cart`);
    }
  }
  removeBooks() {
    this.books = [];
    console.log(`Cart is now empty`);
  }
  discardSingleBook(book) {
    if (!(book instanceof Book)) {
      throw new Error(`passed object is not a Book!`);
    }

    if (this.books.includes(book)) {
      const index = this.books.indexOf(book);
      this.books.splice(index, 1);
      console.log(`${book.title} is removed from the cart`);
    }
  }
  calculateBooksPrice() {
    let sum = 0;
    for (let book of this.books) {
      sum += book.price;
    }
    console.log(`total price is ${sum}`);

    return sum;
  }
}

// class order - used for placing order (takes books from the cart and places order)
class Order {
  constructor(user, cart) {
    this.user = user;
    this.cart = cart;
  }

  checkMoney() {
    const moneyAfterPurchase =
      this.user.money - this.cart.calculateBooksPrice();
    if (moneyAfterPurchase < 0) {
      throw new Error("You are too poor for that purchase buddy");
    }
    this.user.money = moneyAfterPurchase;
  }
}

const book1 = new Book("witcher", "sapkovsky", 1, 100, "available");
const book2 = new Book("titanic", "test", 2, 30, "out of stock");
const book3 = new Book("algorithms", "joe", 3, 10, "available");
const book4 = new Book("dagon", "lovecraft", 4, 40, "available");

const user1 = new User("joe", "er@gm.com", 1, 149);
const user2 = new User("test", "er@gm.com", 2, 200);

book3.checkYourLuck(user1);

user1.cart.addBooks(book1, book3, book4);
user1.cart.discardSingleBook(book3);

user1.placeOrder();
