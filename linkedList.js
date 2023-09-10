class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  insert(data, index) {
    if (index < 0 || index > this.size)
      return console.log("Please enter a valid index.");
    else {
      const node = new ListNode(data);
      let curr;
      let prev;

      curr = this.head;

      if (index == 0) {
        node.next = this.head;
        this.head = node;
      } else {
        curr = this.head;
        let it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }

        node.next = curr;
        prev.next = node;
      }
      this.size++;
    }
  }
  remove(data) {
    let current = this.head;
    let prev = null;

    while (current != null) {
      if (current.data === data) {
        if (prev == null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.data;
      }
      prev = current;
      current = current.next;
    }
    return -1;
  }
  search(data) {
    let current = this.head;

    while (current !== null) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }

    return null;
  }
}

class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const linkedList = new LinkedList();
linkedList.insert(10, 0);
linkedList.insert(20, 1);
linkedList.insert(30, 2);

const foundNode = linkedList.search(20);

if (foundNode) {
  console.log("Node found with data:", foundNode);
} else {
  console.log("Node not found.");
}
