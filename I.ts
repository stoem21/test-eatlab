interface TreeNode {
  [key: number]: number[];
}

interface DFS {
  traverse(tree: TreeNode): number[];
}

class PreOrder implements DFS {
  traverse(tree: TreeNode): number[] {
    const result: number[] = [];
    const traverseHelper = (node: number) => {
      result.push(node);
      const children = tree[node];
      for (let i = 0; i < children.length; i++) {
        traverseHelper(children[i]);
      }
    };
    traverseHelper(1);
    return result;
  }
}

class PostOrder implements DFS {
  traverse(tree: TreeNode): number[] {
    const result: number[] = [];
    const traverseHelper = (node: number) => {
      const children = tree[node];
      for (let i = 0; i < children.length; i++) {
        traverseHelper(children[i]);
      }
      result.push(node);
    };
    traverseHelper(1);
    return result;
  }
}

class InOrder implements DFS {
  traverse(tree: TreeNode): number[] {
    const result: number[] = [];
    const traverseHelper = (node: number) => {
      const children = tree[node];
      if (children.length > 0) {
        traverseHelper(children[0]);
      }
      result.push(node);
      for (let i = 1; i < children.length; i++) {
        traverseHelper(children[i]);
        result.push(node);
      }
    };
    traverseHelper(1);
    return result;
  }
}

class DFSFactory {
  static getTraversalMethod(method: string): DFS {
    switch (method) {
      case "preorder":
        return new PreOrder();
      case "postorder":
        return new PostOrder();
      case "inorder":
        return new InOrder();
      default:
        throw new Error("Invalid traversal method");
    }
  }
}

// Example usage
const treeNode: TreeNode = {
  1: [2, 3],
  2: [4, 5],
  3: [],
  4: [],
  5: [6, 7],
  6: [],
  7: [8],
  8: [],
};

const method = "preorder";
const dfs = DFSFactory.getTraversalMethod(method);
console.log(dfs.traverse(treeNode));
