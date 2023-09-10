class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
}

const myStack = new Stack();

myStack.push(10);
myStack.push(20);
myStack.push(30);

const topElement = myStack.peek();
console.log("Top element:", topElement);

const poppedElement1 = myStack.pop();
console.log("Popped element:", poppedElement1);

const poppedElement2 = myStack.pop();
console.log("Popped element:", poppedElement2);

const newTopElement = myStack.peek();
console.log("Top element:", newTopElement);

class MinMaxStack extends Stack {
  constructor() {
    super();
    this.minStack = [];
    this.maxStack = [];
  }
  push(element) {
    this.items.push(element);

    if (
      this.minStack.length === 0 ||
      element <= this.minStack[this.minStack.length - 1]
    ) {
      this.minStack.push(element);
    }

    if (
      this.maxStack.length === 0 ||
      element >= this.maxStack[this.maxStack.length - 1]
    ) {
      this.maxStack.push(element);
    }
  }

  pop() {
    if (this.isEmpty()) {
      return "Underflow";
    }

    const poppedElement = this.items.pop();
    if (poppedElement === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    if (poppedElement === this.maxStack[this.maxStack.length - 1]) {
      this.maxStack.pop();
    }

    return poppedElement;
  }
  getMin() {
    if (this.minStack.length === 0) {
      return "Stack is empty";
    }
    return this.minStack[this.minStack.length - 1];
  }

  getMax() {
    if (this.maxStack.length === 0) {
      return "Stack is empty";
    }
    return this.maxStack[this.maxStack.length - 1];
  }
}

const minMax = new MinMaxStack();

minMax.push(10);
minMax.push(5);
minMax.push(15);
minMax.push(3);

console.log("Min element:", minMax.getMin());
console.log("Max element:", minMax.getMax());

minMax.push(125);
console.log("Max element:", minMax.getMax());

minMax.push(-3);
console.log("Min element:", minMax.getMin());
