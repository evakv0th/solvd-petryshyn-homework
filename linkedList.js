
// ListNode - class for list nodes in LinkedList
// LinkedList is a class with head and list length
// append - adds element to the end of list (and ++length)
// insert - adds element at given position
// remove - removes element and manages reference to the next node
// search - searches for node
// hasCycle - checks for cycle using slow and fast
class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new ListNode(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    this.length++;
  }

  insert(value, position) {
    if (position < 0 || position > this.length) {
      throw new Error("Invalid position");
    }

    const newNode = new ListNode(value);

    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let prev = null;
      let index = 0;

      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }

      newNode.next = current;
      prev.next = newNode;
    }

    this.length++;
  }

  remove(data) {
    if (!this.head) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      this.length--;
      return;
    }

    let current = this.head;
    let prev = null;

    while (current && current.data !== data) {
      prev = current;
      current = current.next;
    }

    if (current) {
      prev.next = current.next;
      this.length--;
    }
  }

  search(data) {
    let current = this.head;

    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  hasCycle() {
    let slow = this.head;
    let fast = this.head;

    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
        return true;
      }
    }

    return false;
  }
}

const linkedList = new LinkedList();
linkedList.append(10);
linkedList.append(20);
linkedList.append(30);
linkedList.insert(15, 1);

linkedList.search(30).next = linkedList.search(15);

const found = linkedList.search(15);
console.log(found);

console.log("Linked List has cycle:", linkedList.hasCycle());
