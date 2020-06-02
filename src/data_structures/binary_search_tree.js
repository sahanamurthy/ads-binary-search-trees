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

  setupRoot(key, value){
    this._root = new this.Node({key: key, value: value});
    this._count += 1;
    return;
  }

  insert(key, value = true) {
    if (this._root === undefined)
    {
      this.setupRoot(key, value);
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
    var node = this._root;
    console.log("HERE");
    console.log(node);
    while (node)
    {
      if (key < node.key)
      {
        console.log("STEP 1");
        node = node.left;
      }
      else if (key > node.key)
      {
        console.log("STEP 2");
        node = node.right;
        console.log(node);
      }
      else if (key === node.key)
      {
        console.log("STEP 3");
        if (!node.right && !node.left)
        {
          console.log("STEP 4");
          var value = node.value;
          node = undefined;
          this._count -= 1;
          return value;
        }
        else if (node.right && !node.left)
        {
          node.parent.right = node.right;
          var value = node.value;
          node = undefined;
          this._count -= 1;
          return value;
        }
        else if (node.left && !node.right)
        {
          node.parent.left = node.left;
          var value = node.value;
          node = undefined;
          this._count -= 1;
          return value;
        }
        else
        {
          var min = node.right;

          while(min.left)
          {
            min = min.left;
          }

          node.value = min.value;
          min.key = undefined;
          min.value = undefined;
          min.left = undefined;
          min.right = undefined;
          min.parent = undefined;
          min = undefined;
          this._count -= 1;
          return node.value;
        }
      }
      else
      {
        return undefined;
      }
    }
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
