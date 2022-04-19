// Increments the count to advance through the makeMove function's phases.
let counter = 0;
// Counter to count the number of disk moves to completion in the Tower Of Hanoi puzzle.
let moves = 0;
// The array of the disks. The diskArray stores the created disks and their positions.
let diskArray = [];
// The array mapping of the disks on the screen. The diskMap is an object of arrays of the disks on the pegs.
let diskMap = {
   A: [],
   B: [],
   C: []
};
// An array that defines every movement of the disks to complete the puzzle. It is a history of the movement of the disks. It is an array of arrays. Each array element in the diskHistory array is a representation of each movement of the disks.
let diskHistory = [];
// An array of the pegs.
let pegArray = ['A', 'B', 'C'];
// The area of the screen the Tower Of Hanoi puzzle is in.
let puzzle = document.getElementById('puzzle');

// Plot the pegs, peg bases, and disks according to the disk mapping history from the diskHistory array. The counter increments through each of the diskHistory array elements.
function plotObjects(diskMap) {
   // The pegArray is an array of the pegs, defined as ['A', 'B', 'C']. .map goes through each element (A, B, C) and it's corresponding index (0, 1, 2).
   pegArray.map(function (pegElement, pegIndex) {
      // The disks array stores an array of the disks on each of the diskMap pegs.
      let disks = diskMap[pegElement];
      // If the disks array is not empty, it will continue.
      if(disks.length > 0) {
         // Map each element in the disks array.
         disks.map((diskElement, diskIndex) => {
            // Go through each disk in the disks array, return it's id, and store it's id in the variable 'pickDisk'.
            pickDisk = diskArray.filter(function (item) {
               return item.id == diskElement;
            });
            // Update the disk position. It uses the disk id stored in pickDisk[0] and creates a new div called 'diskDiv'.
            positionDisk(pickDisk[0].diskDiv, diskElement, diskIndex, pegIndex);
         });
      };
   });
};

// Create the pegs and peg bases.
function pegFactory(id, indexOnPeg, pegNumber, type) {
   // Create a new div called 'pegDiv'. Define the new div's id as the peg number and class as the type 'peg'.
   let pegDiv = document.createElement('div');
   pegDiv.setAttribute('id', id);
   pegDiv.setAttribute('class', 'peg');
   // Define the dimensions of the pegs. The peg heights are 200px. The peg widths are 20px.
   pegDiv.style.height = 200;
   pegDiv.style.width = 20;
   // Determine the vertical positions of the pegs based on the screen height. The base of the pegs are positioned at 1/2 the window inner height minus 1/2 the peg height to center them (This does not include other elements of the page.).
   let base = (window.innerHeight / 2) - 100;
   pegDiv.style.top = base
   // Determine the horizontal position of the pegs based on the screen width and the index of the pegs. Each peg center is positioned at 1/4 the window inner width. There should be 3 options (25%, 50%, & 75% of the screen width).
   let pegCenter = (window.innerWidth / 4) * (pegNumber + 1);
   pegDiv.style.left = pegCenter;
   // Add pegDiv to the puzzle area of the screen.
   puzzle.appendChild(pegDiv);
   // Create a new div called 'pegBaseDiv'. Define the new div's id as 'peg-base' and class as the type 'peg-base'.
   let pegBaseDiv = document.createElement('div');
   pegBaseDiv.setAttribute('id', 'peg-base');
   pegBaseDiv.setAttribute('class', 'peg-base');
   // Define the dimensions of the peg bases. The peg base heights are 20px. The peg base widths are 250px.
   pegBaseDiv.style.height = 20;
   pegBaseDiv.style.width = 250;
   // Determine the vertical positions of the pegs based on the screen height. The base of the pegs are positioned at 1/2 the window inner height plus 1/2 the peg heights (This does not include other elements of the page.).
   pegBaseDiv.style.top = (window.innerHeight / 2) + 100;
   // Determine the horizontal positions of the peg bases based on the screen width and the index of the pegs. Each peg base center is positioned at 1/4 the window inner width. There should be 3 options (25%, 50%, & 75% of the screen width). Add 1/2 of the peg widths to account for centering the peg bases with the pegs.
   pegBaseDiv.style.left = pegCenter + 10;
   // Add pegBaseDiv to the puzzle area of the screen.
   puzzle.appendChild(pegBaseDiv);
};

// Define the disks' positions.
function positionDisk(diskDiv, diskNumber, indexOnPeg, pegIndex) {
   // Define the dimensions of the disks. The disk heights are 20px. The disk widths vary.
   let diskHeight = 20;
   let diskWidth = diskNumber * 40 + 20;
   diskDiv.style.height = diskHeight;
   diskDiv.style.width = diskWidth;
   // Determine the vertical positions of the disks based on the screen height and the peg heights. The base of the disks are positioned at 1/2 the window inner height plus the difference between the peg offset and the disk height.). This also accounts for the heights of the disks and the disks' indexes on the pegs.
   let base = (window.innerHeight / 2) + 75;
   diskDiv.style.top = base - diskHeight * indexOnPeg;
   // Determine the horizontal positions of the disks based on the indexes of the pegs and the screen width. They should sit centered on the pegs/peg bases. Each disk center is positioned at 1/4 the window inner width. There should be 3 options (25%, 50%, & 75% of the screen width). Add 1/2 of the peg widths to account for centering the disks on the pegs.
   let pegCenter = (window.innerWidth / 4) * (pegIndex + 1);
   diskDiv.style.left = pegCenter + 10;
   // Assign a number to the disk for visual purposes.
   diskDiv.innerHTML = diskNumber;
};

// Create the disks.
function diskFactory(id, indexOnPeg, pegNumber, type) {
   // Create a new div called 'diskDiv'. Define the new div's id as the disk number and class as the type 'disk'.
   let diskDiv = document.createElement('div');
   diskDiv.setAttribute('id', id);
   diskDiv.setAttribute('class', type);
   // Define the position of the new disk.
   positionDisk(diskDiv, id, indexOnPeg, pegNumber);
   // Add diskDiv to the puzzle area of the screen.
   puzzle.appendChild(diskDiv);
   // Shorthand way to return an object. Returns {id: #, diskDiv: #}.
   return {id, diskDiv};
};

// Initialize the objects on the screen. This creates the pegs, peg bases, and disks based on the first disk mapping from the diskHistory array.
function initializeObjects(diskMap) {
   // Select the first peg 'A' and store it in the 'disks' variable.
   let disks = diskMap[pegArray[0]];
   // Map the results of the anonymous function and store them in the diskArray array. The diskArray stores the created disks and their positions.
   diskArray = disks.map(function (diskid, indexOnPeg) {
      // Create the disks and define their positions.
      return diskFactory(diskid, indexOnPeg, 0, 'disk');
   });
   // The pegArray is an array of the pegs, defined as ['A', 'B', 'C']. .map goes through each element (A, B, C) and it's corresponding index (0, 1, 2).
   pegArray.map(function (pegElement, pegIndex) {
      // Create the pegs and peg bases and define their positions.
      pegFactory(pegIndex, 0, pegIndex, 'peg');
   });
};

// Update the diskMap object with the mapping of the disks in their next positions.
let updateDiskMap = function (diskMap, from, to) {
   // Remove the mapping of the disk from it's current position on the diskMap. It will be the last one in the object array (the one on top).
   let theDisk = diskMap[from].pop();
   // Add the mapping of the disk to it's new position on the diskMap. It will be the last one in the object array (the one on top).
   diskMap[to].push(theDisk);
   // Counter to count the number of disk moves to completion in the Tower Of Hanoi puzzle.
   moves++;
   // Update the diskHistory array with the diskMap object data.
   updateDiskHistory(diskMap);
};

// Recursive function. Calculate and map out the movement of the disks to the diskMap object. These objects are used to create the diskHistory array of objects that defines every movement of the pegs to complete the puzzle.
let calculateDiskMap = function (n, from, to, spare) {
   // If there is only one disk, update the diskMap object with the mapping of the disks in their next positions.
   if(n == 1) {
      updateDiskMap(diskMap, from, to);
   }
   // If there is more than one disk, run through the recursion function again and update the mapping of the disks in their next positions accordingly.
   else {
      calculateDiskMap(n - 1, from, spare, to);
      updateDiskMap(diskMap, from, to);
      calculateDiskMap(n - 1, spare, to, from);
   };
};

// Update the diskHistory array with the diskMap object data.
let updateDiskHistory = function (diskMap) {
   // Change the diskMap object data to a string for better visualization.
   let string = JSON.stringify(diskMap);
   // Push the diskMap object to the diskHistory array.
   diskHistory.push(JSON.parse(string));
   console.log(string);
};

// Initialize the mapping of the disks on the pegs. This creates the diskMap. The diskMap is an object of arrays of the disks on the pegs.
let initializeDiskMap = function (diskCount, diskMap) {
   // Define the disks in the disk mapping using the disk count. The disks will be initialized in the 'A' section of the diskMap object.
   for(let i = diskCount; i >= 1; i--) {
      diskMap['A'].push(i);
   };
   // Update the diskHistory array with the diskMap object data.
   updateDiskHistory(diskMap);
};

// Main function. First click creates the pegs, peg bases, and disks. Subsequent clicks manually move disks one by one.
function makeMove() {
   // Create the tower of disks. The counter starts at 0.
   if(counter == 0) {
      // Default number of disks is 5.
      let diskCount = 5;
      // If a number is entered in the input box, the number of disks is defined as the value entered.
      if(document.getElementById('diskCount').value) {
         diskCount = document.getElementById('diskCount').value;
      };
      // Initialize the mapping of the disks on the pegs. This creates the diskMap. The diskMap is an object of arrays of the disks on the pegs.
      initializeDiskMap(diskCount, diskMap);
      // Recursive function. Calculate and map out the movement of the disks to the diskMap object. These objects are used to create the diskHistory array of objects that defines every movement of the disks to complete the puzzle.
      calculateDiskMap(diskCount, 'A', 'C', 'B');
      // Initialize the objects on the screen. This creates the pegs, peg bases, and disks based on the first disk mapping from the diskHistory array.
      initializeObjects(diskHistory[0]);
   };
   // Move the disks.
   if(counter < diskHistory.length) {
      // Plot the pegs, peg bases, and disks according to the disk mapping history from the diskHistory array. The counter increments through each of the diskHistory array elements.
      plotObjects(diskHistory[counter]);
   }
   // Notify the user that the tower move has been completed and the puzzle has been solved.
   else {
      alert('Tower Move Completed. Puzzle Solved.');
   };
   // Increments the count to advance through the makeMove function's phases.
   counter++;
};
