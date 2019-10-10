const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head;
        this._tail;
    }

    append(data) {
        const newNode = new Node(data);

        // If there is no head yet let's make new node a head.
        if (!this._head) {
            this._head = newNode;
            this._tail = newNode;
            this.length++;

            return this;
        }

        // Attach new node to the end of linked list.
        this._tail.next = newNode;

        // Attach current tail to the new node's previous reference.
        newNode.prev = this._tail;

        // Set new node to be the tail of linked list.
        this._tail = newNode;
        this.length++;

        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let node = this._head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        return node.data;
    }

    insertAt(index, data) {
        if(this.length) {
            let node = this._head;
            for (let i = 0; i < index; i++) {
                node = node.next;
            }
            let nodeToInsert = new Node(data, node.prev, node);
            let _prev = node.prev;
            node.prev = nodeToInsert;
            _prev.next = nodeToInsert;
            this.length++;
        }
        else this.append(data);
    }

    isEmpty() {
        if (this.length == 0) return true;
        return false;
    }

    clear() {
        this._tail = new Node();
        this._head = this._tail;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let node = this._head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }
        if(index != 0) {
            node.next.prev = node.prev;
            node.prev.next = node.next;
        }
        this.length--;

        return this;
    }

    reverse() {
        let currNode = this._head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // Store next node.
            nextNode = currNode.next;
            prevNode = currNode.prev;

            // Change next node of the current node so it would link to previous node.
            currNode.next = prevNode;
            currNode.prev = nextNode;

            // Move prevNode and currNode nodes one step forward.
            prevNode = currNode;
            currNode = nextNode;
        }

        // Reset head and tail.
        this._tail = this._head;
        this._head = prevNode;

        return this;

    }

    indexOf(data) {
        let node = this._head;
        if (node.data == data) return 0;
        for (let i = 1; i < this.length; i++) {
            node = node.next;
            if (node.data == data) return i;
        }
        return -1;
    }
}


module.exports = LinkedList;
