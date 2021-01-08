// selectors
let gameStepSelector = document.querySelector('.game__step span');
let gameTable = document.querySelector('.game__table');
let tableSelector = document.querySelector('table');
let gameLineSelectorString = document.querySelector('.game__line-string');
let gameLineSelectorVertical = document.querySelector('.game__line-vertical');
let gameLineSelectorDiagonal = document.querySelector('.game__line-diagonal');
let gameWinSelector = document.querySelector('.game__win');

// random func max and min
function randomFunc(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let numRand =  randomFunc(0,1);

// функция создает ноли или крестик
let zero = 'O';
let cross = 'X';
function crossOrZero(num) {
    if (num == 0) {  
        return zero;
    }
    if (num == 1) {
        return cross;
    }    
}
let crossZero = crossOrZero(numRand);
// добавил в заглавие элемент ноли или крестик и стили
    gameStepSelector.innerHTML = crossZero;

// получаем ячейки таблицы, переводим текст в числа
tableSelector.addEventListener('click', selectTd, false);
let obj = {
    'O': [],
    'X': []
};

function selectTd(event) {     
    let target = event.target.closest('td');   
    let numRow = +target.innerHTML;   
    // записываю в массив число ячейки и наименования хода
    objectCrossAndZero(numRow, crossZero);    

    if (target.tagName == 'TD') {          
           // по клику изменение элемента крестик или нолик
            if (crossZero === 'X') { 
                crossZero = 'O';
                gameStepSelector.textContent =  crossZero; 
                target.classList.add('shadowX');             
                target.innerHTML = 'X';                         
            }
            else if (crossZero === 'O')  {     
                crossZero = 'X';
                gameStepSelector.textContent = crossZero;
                target.classList.add('shadowO'); 
                target.innerHTML = 'O';                               
            }            
    }  
    checkResult(obj);
    wrapperFunc(numRow);
}

function wrapperFunc(numRow) {
    let div =  document.createElement('div');
    let wrapperSelector = div;
        gameTable.insertAdjacentElement('beforeEnd', wrapperSelector);
        wrapperSelector.classList.add('wrapper');
       // добавляю display block
        addDisplayBlock(wrapperSelector);
 // добавляю оболочку для отмены события клика
   if (numRow == 1) {
        wrapperSelector.style.left = '0';        
   }
   if (numRow == 2) {
        wrapperSelector.style.left = '200px';
   }
   if (numRow == 3) {
        wrapperSelector.style.left = '400px';
   }
   if (numRow == 4) {
        wrapperSelector.style.top = '210px';
   }
   if (numRow == 5) {
        wrapperSelector.style.top = '210px';       
        wrapperSelector.style.left = '200px';       
   }
   if (numRow == 6) {
        wrapperSelector.style.top = '210px';
        wrapperSelector.style.left = '400px';
   }
   if (numRow == 7) {
        wrapperSelector.style.top = '418px';
   }
   if (numRow == 8) {
        wrapperSelector.style.top = '418px';       
        wrapperSelector.style.left = '200px';       
   }
   if (numRow == 9) {
        wrapperSelector.style.top = '418px';
        wrapperSelector.style.left = '400px';
   }
}
// функция включения dsplay block;
function addDisplayBlock(selector) {
  let block =   selector.style.display = 'block';
  return block;
}

// собирает Х и О номера
function objectCrossAndZero(numRow, crossZero) {
    if (crossZero == 'O') {
        obj['O'].push(numRow); 
        return  obj['O'].sort();
    }
    if (crossZero == 'X') {
        obj['X'].push(numRow);
        return obj['X'].sort();
    } 
}
// проверка на решение

function checkResult(obj) {   
    let joinO = obj['O'].join('');
    let joinX =  obj['X'].join('');   
    
// Для ноля все варианты решения
// горизонтальные варианты
    let searchStringOneO =  joinO.indexOf('123');   
    let searchStringTwoO =  joinO.indexOf('456');   
    let searchStringTreeO =  joinO.indexOf('789');   
     if (searchStringOneO >= 0 || searchStringTwoO >= 0 || searchStringTreeO >=0) {
        funcLineString(searchStringOneO, searchStringTwoO, searchStringTreeO);
        gameWinSelector.innerHTML = 'Ура! Победа за - "O" - "строка"';
        addDisplayBlock(gameWinSelector);
     }
     // вертикальные варианты
     let searchColumnOneO =  joinO.indexOf('147');   
     let searchColumnTwoO =  joinO.indexOf('258');   
     let searchColumnTreeO =  joinO.indexOf('369');
    if (searchColumnOneO >= 0 || searchColumnTwoO >= 0 || searchColumnTreeO >=0) {
        funcLineVertical(searchColumnOneO, searchColumnTwoO, searchColumnTreeO);
        gameWinSelector.innerHTML = 'Ура! Победа за - "O" - "колонка"';
        addDisplayBlock(gameWinSelector);
    }
    // диагональные варианты
    let searchDiagonalLeftO =  joinO.indexOf('159');   
    let searchDiagonalRightO =  joinO.indexOf('357');  
    if (searchDiagonalLeftO >= 0 || searchDiagonalRightO >= 0 ) {
        funcLineDiagonal(searchDiagonalLeftO, searchDiagonalRightO);
        gameWinSelector.innerHTML = 'Ура! Победа за - "O" - "диагональ"';
        addDisplayBlock(gameWinSelector);
    }


// Для крестика все варианты решения
    let searchStringOneX =  joinX.indexOf('123');   
    let searchStringTwoX =  joinX.indexOf('456');   
    let searchStringTreeX =  joinX.indexOf('789');   
     if (searchStringOneX >= 0 || searchStringTwoX >= 0 || searchStringTreeX >=0) {  
        funcLineString(searchStringOneX, searchStringTwoX, searchStringTreeX);
        gameWinSelector.innerHTML = 'Ура! Победа за - "Х" - "строка"';
        addDisplayBlock(gameWinSelector);
     }
     // вертикальные варианты
     let searchColumnOneX =  joinX.indexOf('147');   
     let searchColumnTwoX =  joinX.indexOf('258');   
     let searchColumnTreeX =  joinX.indexOf('369');
    if (searchColumnOneX >= 0 || searchColumnTwoX >= 0 || searchColumnTreeX >=0) {
        funcLineVertical(searchColumnOneX, searchColumnTwoX, searchColumnTreeX);
        gameWinSelector.innerHTML = 'Ура! Победа за - "Х" - "колонка"';
        addDisplayBlock(gameWinSelector);
    }
    // диагональные варианты
    let searchDiagonalLeftX =  joinX.indexOf('159');   
    let searchDiagonalRightX =  joinX.indexOf('357');  
    if (searchDiagonalLeftX >= 0 || searchDiagonalRightX >= 0 ) {
        funcLineDiagonal(searchDiagonalLeftX,searchDiagonalRightX);
        gameWinSelector.innerHTML = 'Ура! Победа за - "Х" - "диагональ"';
        addDisplayBlock(gameWinSelector);
    }

// функция зачеркивания по горизонтали
    function funcLineString(string1, string2, string3 ) {
        gameLineSelectorString.style.display = 'block';       
        if (string1 != -1) {
         let one =  gameLineSelectorString.style.top = '17%';
         return one;
        }
        if (string2 != -1) {
         let two = gameLineSelectorString.style.top = '50%';
         return two;
        }
        if (string3 != -1) {
         let tree = gameLineSelectorString.style.top = '83%';
         return tree;
        }
    }
// функция зачеркивания ао вертикали
    function funcLineVertical(column1, column2, column3) {
        gameLineSelectorVertical.style.display = 'block';  
        if (column1 != -1) {
            let one =  gameLineSelectorVertical.style.left = '17%';
            return one;
        }
        if (column2 != -1) {
            let two = gameLineSelectorVertical.style.left = '50%';
            return two;
        }
        if (column3 != -1) {
            let tree = gameLineSelectorVertical.style.left = '83%';
            return tree;
        }
    }

// функция зачеркивания по диагонали
    function funcLineDiagonal(diagonalLeft, diagonalRight) {
        gameLineSelectorDiagonal.style.display = 'block';  
        if (diagonalLeft != -1) {
            let one =  gameLineSelectorDiagonal.style.transform = 'rotate(136deg)';
            return one;
        }
        if (diagonalRight != -1) {
            let two = gameLineSelectorDiagonal.style.transform = 'rotate(43deg)';
            return two;
        }   
    }

}
   
