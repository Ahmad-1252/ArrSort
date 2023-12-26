'use strict mode'

/*ReadMore-Button*/
document.querySelector('.btn').addEventListener('click', function() {
  var moreContent = document.querySelector('.read-text .more-content');
  var button = document.querySelector('.btn');

  if (moreContent.style.display === 'none' || moreContent.style.display === '') {
    moreContent.style.display = 'block';
    button.innerText = 'Learn Less ↑';
  } else {
    moreContent.style.display = 'none';
    button.innerText = 'Learn More';
  }
});




function sortArray(algorithm) {
    // Get user inputs
    const arraySize = document.getElementById('array-size').value;
    const arrayElements = document.getElementById('arrayElements').value.split(',').map(Number);
    const sortingOrder = document.getElementById('sortingOrder').value;
    if (arrayElements.length > arraySize) {
      alert("The number of elements cannot be greater than the specified array size.");
      return;
      
  }
 
 
     /* Measure the start time*/
     const startTime = performance.now();

     // Execute the selected sorting algorithm
    const sortedArray = executeSortingAlgorithm(arrayElements.slice(), algorithm);
     // Measure the end time
     const endTime = performance.now();
    
     // Display the sorted result
   
     var executionTime = endTime - startTime;
     document.getElementById('excuteTime').value = executionTime.toFixed(2)+'ms';

      // Display the time-complexity result
     const timeComplexity = calculateTimeComplexity(algorithm, arraySize);
     document.getElementById('timeComplexity').value = timeComplexity;
    
    
if (sortingOrder === 'descending') 
{
    function SortDescending(sortedArray) {
        const n = sortedArray.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (sortedArray[j] < sortedArray[j + 1]) {
                    
                    const temp = sortedArray[j];
                    sortedArray[j] = sortedArray[j + 1];
                    sortedArray[j + 1] = temp;
                }
            }
        }
        return sortedArray;
    }
    document.getElementById('sortedResult').value = SortDescending(sortedArray.slice()).join(', ');
} else {
    document.getElementById('sortedResult').value = sortedArray.join(', ');
}
}

//User Option Selection
function executeSortingAlgorithm(arr, algorithm) {
    switch (algorithm) {
        case 'countingSort':
            countingSort(arr);
            break;
        case 'mergeSort':
            mergeSort(arr);
            break;
        case 'quickSort':
            quickSort(arr, 0, arr.length - 1);
            break;
        case 'heapSort':
            heapSort(arr);
            break;
        default:
            console.error('Invalid sorting algorithm');
        }
        // console.log('showing the result');
         document.querySelector('#result_sorting').classList.remove('d-none');
         const resultSection = document.getElementById('result_scroll');

        if (resultSection) {
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
        // console.log(classes.classList)
    return arr;
}





const generateRandomArray = (size, min, max) => {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
  };
  
  const outputElement = document.getElementById('arrayElements');
  
  const generateButton = document.getElementById('generate-button');
  generateButton.addEventListener('click', () => {
    const arraySize = parseInt(document.getElementById('array-size').value);
    const  minValue = parseInt(document.getElementById('min-value').value);
    const maxValue = parseInt(document.getElementById('max-value').value);
  
    if (minValue > maxValue) {
      alert('Minimum value cannot be greater than maximum value!');
      return;
    }
  
    const generatedArray = generateRandomArray(arraySize, minValue, maxValue);
    outputElement.textContent = generatedArray.join(', ');
  });
  

function calculateTimeComplexity(algorithm, arraySize) {
    switch (algorithm) {
        case 'countingSort':
         
        
            return `O(${arraySize} + k)`;
        case 'mergeSort':
            return `O(${arraySize} * log(${arraySize}))`;
        case 'quickSort':
            return `O(${arraySize} * log(${arraySize}))`;
        case 'heapSort':
            return `O(${arraySize} * log(${arraySize}))`;
        default:
            return 'Unknown';
    }
}

function countingSort(arr) {
    const n = arr.length;
  
    // Find the maximum and minimum values in the array
    let max = arr[0];
    let min = arr[0];
    for (let i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    // Create a count array to store the count of each element
    const count = Array(max - min + 1).fill(0);

    // Count the occurrences of each element in the input array
    for (let i = 0; i < n; i++) {
        count[arr[i] - min]++;
    }

    // Modify the count array to store the position of each element in the sorted output
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }

    // Build the output array using the count array
    const output = Array(n);
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
   
    return output;
}

        function mergeSort(arr ){
           
            if (arr.length <= 1) {
                return arr;
            }

            const mid = Math.floor(arr.length / 2);
            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));
            return merge(left, right);
        }

        function merge(left, right) {
            let result = [];
            let leftIndex = 0;
            let rightIndex = 0;

            while (leftIndex < left.length && rightIndex < right.length) {
                if (left[leftIndex] < right[rightIndex]) {
                    result.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    result.push(right[rightIndex]);
                    rightIndex++;
                }
                
            }
            
            return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
           
        }




function quickSort(arr, low, high) {

    if (low < high) {
        const partitionIndex = partition(arr, low, high);

        quickSort(arr, low, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, high);
    }
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            // Swap arr[i] and arr[j]
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
       
    }

    // Swap arr[i+1] and arr[high] (put the pivot in its correct place)
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    return i + 1;
    
}

function heapSort(arr) {
    const n = arr.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // One by one extract an element from the heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        // Call max heapify on the reduced heap
        heapify(arr, i, 0);
    }
    

}

function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
        
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;

    }

    if (largest !== i) {
        // Swap arr[i] and arr[largest]
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
  
}

function findLongestCommonSubstring() {
    const string1 = document.getElementById('string1').value;
    const string2 = document.getElementById('string2').value;

    const result = longestCommonSubstring(string1, string2);

    document.getElementById('result').value = result;
  }

  function longestCommonSubstring(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    let result = '';

    const compare = [];
    for (let i = 0; i <= m; i++) {
     compare.push(Array(n + 1).fill(0));
     }


    let endIndex = 0;
    let maxLength = 0;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          compare[i][j] = compare[i - 1][j - 1] + 1;

          if (compare[i][j] > maxLength) {
            maxLength = compare[i][j];
            endIndex = i - 1;
          }
        } else {
          compare[i][j] = 0;
        }
      }
    }

    if (maxLength > 0) {
      result = str1.substring(endIndex - maxLength + 1, endIndex + 1);
    }
    document.querySelector('#LCS').classList.remove('d-none');
    const resultSection = document.getElementById('result2_scroll');

        if (resultSection) {
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
    return result;
  }