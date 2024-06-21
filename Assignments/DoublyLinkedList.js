class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}
// H,T
// [1]

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    append(data) {
        // Create a new node for linked list
        const newNode = new Node(data);
        // If the linked list is empty
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.size++;
    }

    //                             C
    // [10] <-> [20] <-> [30] <-> [40]
    // Print the linked list.
    // Can we do this recursively ?
    printForward() {
        let current = this.head;
        let str = "null <->";
        while (current) {
            console.log(current, "current");
            str = str + current.data + " <-> ";
            current = current.next;
        }

        console.log(str + " null");
    }
    //  Console 1 -> 2 -> 3 -> 4 ->
    // [1] -> [2] -> [3] -> [4] -> null
    printForwardWithRecursion(node) {
        if (!node) {
            // Base Case
            return;
        }

        console.log(node.data + " ->");
        this.printForwardWithRecursion(node.next);
    }
    //                       C
    // [1] -> [2] -> [3] -> [4]

    // Console 4 -> 3 -> 2 -> 1
    printBackwardsWithRecursion(node) {
        if (!node) {
            // Base Case
            return;
        }

        this.printForwardWithRecursion(node.next);
        console.log(node.data + " ->");
    }

    // Algo not the actual solution (You can give it a try)
    printBackwardsWithWhile(node) {
        // C --> T

        while (current) {
            current = current.next;
        }

        while (current) {
            console.log(current.data);
            current = current.prev;
        }
    }
    //                C
    // [10] <-> [20] <-> [40]
    removeAt(position) {
        if (position < 0) {
            return false;
        }

        let current = this.head;
        let index = 0;

        if (position === 0 && current) {
            this.head = current.next;

            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }

            this.size--;
            return true;
        }

        while (current) {
            if (index === position) {
                if (current.next) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev;
                }

                if (current.prev) {
                    current.prev.next = current.next;
                }

                this.size--;
                return true;
            }

            current = current.next;
            index++;
        }

        return false;
    }

    //  [10] <-> [20] <-> [30] <-> [40], position  = 1, newData = 15
    updateAt(position, newData) {
        let current = this.head;
        let index = 0;

        while (current) {
            if (index === position) {
                current.data = newData;
                return true;
            }

            current = current.next;
            index++;
        }

        return false;
    }

    search(data) {
        let current = this.head;

        while (current) {
            if (current.data === data) {
                return true;
            }

            current = current.next;
        }

        return false;
    }

    searchWithRecursion(data, node) {
        if (!node) {
            return false;
        }

        if (node.data === data) {
            return true;
        }

        return this.searchWithRecursion(data, node.next);
    }

    //Merge Two Sorted Linked Lists
    //1 -> 3 -> 5 and 2 -> 4 -> 6 should become 1 -> 2 -> 3 -> 4 -> 5 -> 6

    mergeTwoSortedLists(list1, list2) {
        if (!list1.head) return list2.head; // Return list2 if list1 is empty
        if (!list2.head) return list1.head; // Return list1 if list2 is empty

        let mergeList = new DoublyLinkedList();

        // Initialize pointers
        let current = null;
        let current1 = list1.head;
        let current2 = list2.head;

        // Determine the head of the merged list
        if (current1.data <= current2.data) {
            mergeList.head = current1;
            current = mergeList.head;
            current1 = current1.next;
        } else {
            mergeList.head = current2;
            current = mergeList.head;
            current2 = current2.next;
        }

        // Traverse both lists and merge nodes
        // Adjust pointers after each merge
        while (current1 && current2) {
            if (current1.data <= current2.data) {
                current.next = current1;
                current1.prev = current;
                current = current.next;
                current1 = current1.next;
            } else {
                current.next = current2;
                current2.prev = current;
                current = current.next;
                current2 = current2.next;
            }
        }

        // Append remaining nodes from list1 or list2
        if (current1) {
            current.next = current1;
            current1.prev = current;
        } else {
            current.next = current2;
            current2.prev = current;
        }

        // Set the tail of the merged list
        while (current.next) {
            current = current.next;
        }
        mergeList.tail = current;

        return mergeList;
    }


    //Delete the N-th Node from the End
    // 1 -> 2 -> 3 -> 4 -> 5 and n = 2 , should﻿ return 1 -> 2 -> 3 -> 5
    deleteFromEnd(nth) {
        // input out of bounds
        if (nth < 0 || nth >= this.size) {
            return false;
        }

        // nth node is the tail
        if (nth === this.size - 1) {
            this.tail = this.tail.prev;
            if (this.tail) {
                this.tail.next = null;
            } else {
                this.head = null; // List becomes empty
            }
            this.size--;
            return true;
        }

        // iterating through the list from to find nth node
        let current = this.tail;
        for (let i = 0; i < nth - 1; i++) {
            current = current.prev;
        }

        // Delete the nth node and adjust pointers
        if (current.prev) {
            current.prev.next = current.next;
        } else {
            this.head = current.next;
        }

        if (current.next) {
            current.next.prev = current.prev;
        }
        else {
            this.tail = current.prev;
        }

        this.size--;
        return true;

    }
}

// Merge Two Sorted Linked Lists
const doubleLinkedList1 = new DoublyLinkedList();
doubleLinkedList1.append(1);
doubleLinkedList1.append(3);
doubleLinkedList1.append(5);

const doubleLinkedList2 = new DoublyLinkedList();
doubleLinkedList2.append(2);
doubleLinkedList2.append(4);
doubleLinkedList2.append(6);

// Merge and print
const mergedList = doubleLinkedList1.mergeTwoSortedLists(doubleLinkedList1, doubleLinkedList2);
mergedList.printForward()


//Delete the N-th Node from the End
const doubleLinkedList3 = new DoublyLinkedList();
doubleLinkedList3.append(1);
doubleLinkedList3.append(2);
doubleLinkedList3.append(3);
doubleLinkedList3.append(4);
doubleLinkedList3.append(5);        // null <-> 1 <-> 2 <-> 3 <-> 4 <-> 5 <->  null
doubleLinkedList3.deleteFromEnd(2); // null <-> 1 <-> 2 <-> 3 <-> 5 <->  null
doubleLinkedList3.printForward();   // null <-> 1 <-> 2 <-> 3 <-> 5 <->  null



