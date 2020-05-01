import React, { useState } from 'react';
import BST from './BST'
import './App.css';

/*
3, 5, 6, 8, 11, 12, 14, 15, 17, 18

1) Looking for 8
  3, 5, 6, 8, 11, 12, 14, 15, 17, 18 
  3, 5, 6, 8, 11
  8, 11
  8
  
2) Looking for 16 
  3, 5, 6, 8, 11, 12, 14, 15, 17, 18
  14, 15
  ?? where is 16


4)
  a) 14, 15, 25, 19, 35, 89, 79, 91, 90, 27 postorder traversal


  b) 8, 6, 5 , 4 , 10 , 9 , 11 preorder traversal 

*/

function App() {
  const [attempts, setAttempts] = useState();

  // Default Tree (Question 5?)
  const tree = new BST();
  const treeValues = [25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22]
  for (let value of treeValues) {
    tree.insert(value, value)
  }

  // Stocks Tree
  const stonks = new BST();
  const stonkValues = [128, 97, 121, 123, 98, 97, 105]
  for (let value of stonkValues) {
    stonks.insert(value, value)
  }

  

  // USS Tree

  const rankings = new BST('Captain Picard')
  rankings.left = new BST('Commander Riker')
  rankings.right = new BST('Commander Data')

  rankings.left.left = new BST('Lt. Cmdr. Worf')
  rankings.left.right = new BST('Lt. Cmdr. LaForge')

  rankings.left.left.left = new BST('Lieutenant security-officer')

  rankings.right.right = new BST('Lt. Cmdr. Crusher')
  rankings.right.right.left = new BST('Lieutenant Selar')

  function linearSearch(input, value) {
    const arr = input.split(' ')

    let searches = 0;

    for (let i = 0; i < arr.length; i++) {
      searches++
      if (arr[i] == value) {
        return searches;
      }
    }

    return 'Not Found'
  }

  function binarySearch(input, searchForThis) {
    const arr = input.split(' ').sort((a, b) => a - b);
    let searches = 1;

    function _search(array, value, start = 0, end = array.length) {
      searches++

      if (start > end) {
        return -1;
      }

      const index = Math.floor((start + end) / 2);
      const item = array[index];

      console.log(start, end, item, array);

      if (item == value) {
        return index;
      }
      else if (item < value) {
        return _search(array, value, index + 1, end);
      }
      else if (item > value) {
        return _search(array, value, start, index - 1);
      }
    }

    _search(arr, searchForThis)

    return searches
  }

  function whosInChargeNext(tree, values = []) {
    let queue = []
    let node = tree

    queue.push(node)

    while (queue.length) {
      node = queue.shift();
      values.push(node.key);

      if (node.right) {
        queue.push(node.right);
      }

      if (node.left) {
        queue.push(node.left);
      }
    }

    return values;
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        setAttempts(binarySearch(e.target.arraybox.value, 16))
      }}>
        <textarea name='arraybox' id='arraybox' required defaultValue='89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'></textarea>
        <button type='submit'>Submit</button>
      </form>
      <h2>Attempts</h2>
      <p>{attempts}</p>
      <h2>Tree Orders</h2>
      <p>Pre-order: {tree.preOrder().join(', ')}</p>
      <p>In-order: {tree.inOrder().join(', ')}</p>
      <p>Post-order: {tree.postOrder().join(', ')}</p>

      <h2>Star Trek Tree</h2>
      <pre>{whosInChargeNext(rankings).join('\n')}</pre>

      <h2>When To Buy The Stock</h2>
      <p>Buy at: {stonks.preOrder()}</p>
      <p>Sell at: {stonks.preOrder()}</p>
    </div>
  );
}



export default App;
