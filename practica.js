// let a=new Date().getTime();
//  let day=new Date().getDate();
// let b=new Date("2008-12-10")

// let c= new Date(b.getTime())

// let array = Array.from({length:5}, (_,i)=>day+i)

// console.log(array,new Date(a).getDate(), day,c.getTime())

// Función generadora de secuencia (comúnmente llamado "rango", ej. Clojure, PHP, etc.)
// const range = (start, stop, step) =>
//   Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

// Genera un rango de números entre 0..4
// range(0, 4, 1);
// [0, 1, 2, 3, 4]

// Genera un rango de números entre 1..10 con saltos de 2
// range(1, 10, 2);
// [1, 3, 5, 7, 9]

// Generar el abecedario utilizando Array.from haciendo uso de que se ordena como secuencia
// range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) =>
//   String.fromCharCode(x),
// );
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

let start = new Date('2024/06/29');
let end = new Date('2024/07/6');
//year,month,day

// console.log(end, start, +1);

//sets the day of the month of a date.


const len =
 Math.floor( Math.abs(end.getTime() - start.getTime()) / (1 * 24 * 60 * 60 * 1000) +
  1);

console.log({ len });

function rangeDates(start, end) {
  const MilliSecondsInDay = 24 * 60 * 60 * 1000;

  const len =
   Math.floor(Math.abs(end.getTime() - start.getTime()) / (1 * MilliSecondsInDay) +
    1 * 1);

  const date = new Date(start.getTime());

  const array = Array.from({ length: len }, (_, i) => {
    // console.log('start:', start, 'date:', date, 'i:', i);
    return new Date(
      date.setDate(
        new Date(start.getTime() + 1 * i * MilliSecondsInDay).getDate()
      )
    );
    // return new Date(date.setDate(date.getDate() + dayStep ));
  });

  return array;
}

console.log(rangeDates(start, end));
