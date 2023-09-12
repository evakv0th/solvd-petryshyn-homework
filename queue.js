// class Queue is standard representation of Queue
// its FIFO (in other aspects its like Stack)
export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    if (this.items.length == 0) return "Underflow";
    return this.items.shift();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length == 0;
  }
}
