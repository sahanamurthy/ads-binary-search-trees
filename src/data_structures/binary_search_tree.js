class BSTNode {
  constructor({ key, value, parent, left, right }) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(Node = BSTNode) {
    this.Node = Node;
    this._count = 0;
    this._root = undefined;
  }

  insert(key, value = true) {
    if (this._root === undefined)
    {
      this.Node.key = key;
      this.Node.value = value;
      this._root = this.Node;
      this._count += 1;
      return;
    }

    let node = this._root;

    while (node)
    {
      if (key < node.key)
      {
        if (!node.left)
        {
          node.left = new this.Node({key: key, value: value, parent: node});
          this._count += 1;
          return;
        }
        node = node.left;
      }
      else if (key > node.key)
      {
        if (!node.right)
        {
          node.right = new this.Node({key: key, value: value, parent: node});
          this._count += 1;
          return;
        }
        node = node.right;
      }
      else if (key === node.key)
      {
        node.value = value;
        return;
      }
      else
      {
        return;
      }
    }
    return;
  }

  lookup(key) {
    let node = this._root;

    while (node) {
      if (key < node.key) {
        node = node.left;
      } else if (key > node.key) {
        node = node.right;
      } else { // equal
        return node.value;
      }
    }
  }

  delete(key) {
    // TODO (tests first!)
  }

  count() {
    return this._count;
  }

  forEach(callback) {
    // This is a little different from the version presented in the video.
    // The form is similar, but it invokes the callback with more arguments
    // to match the interface for Array.forEach:
    //   callback({ key, value }, i, this)
    const visitSubtree = (node, callback, i = 0) => {
      if (node) {
        i = visitSubtree(node.left, callback, i);
        callback({ key: node.key, value: node.value }, i, this);
        i = visitSubtree(node.right, callback, i + 1);
      }
      return i;
    }
    visitSubtree(this._root, callback)
  }
}

export default BinarySearchTree;
