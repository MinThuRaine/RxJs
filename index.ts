import { Observable, of, from, fromEvent, concat, interval, timer, throwError, pipe, Subject} from 'rxjs';
import { mergeMap, tap, map, filter, catchError, take, takeUntil, multicast, publish, refCount, share } from 'rxjs/operators';
import { allBooks } from './data';
import { allReaders } from './data';
import { ajax } from 'rxjs/ajax';


//DAY ONE (1)

// Part 1

function subscribe(subscriber) {
    for(let book of allBooks){
        subscriber.next(book);
    }
}

let allBooksObservable$ = new Observable(subscribe); 

allBooksObservable$.subscribe(book => console.log( book .title));

// Part 2

// let allBooksObervable$ = new Observable(subscriber=>{

//     if(document.title !== 'RxBookTracker'){
//         subscriber.error('Incorrect page title.');
//     }

//     for(let book of allBooks){
//             subscriber.next(book);
//         }

//     setTimeout(()=>{
//             subscriber.complete();
//         },2000);
// });

// allBooksObervable$.subscribe(
//    book => console.log(book.title),
//    err => console.log('Hi Page is error, Message',err),
//    () => console.log("COMPLETE")
// );


//Part 3

//let source1$ = of(allBooks,'hi Rein', 10, true, allBooks[0].title);

//source1$.subscribe(value => console.log(value));

//let source2$ = from(allBooks);

//source2$.subscribe(book => console.log(book.title));

//concat(source1$, source2$).subscribe( value => console.log('Check ',value));

//Part 4

// let button = document.getElementById('readersButton');
// let hiClicked=fromEvent(button, 'click');

// hiClicked.subscribe(event => {
//     console.log(event);
//     let readerDiv = document.getElementById('readers');
//     for (let reader of allReaders){
//         readerDiv.innerHTML += reader.name + '<br>';
//     }
// });

//Part 5

// let button = document.getElementById('readersButton');
// let hiClicked = fromEvent(button, 'click').subscribe(event => {
//     //console.log(event);

//     ajax('/api/readers').subscribe(ajaxRespond => {
//         console.log(ajaxRespond);
//         let readers = ajaxRespond.response;
//         let readerDiv = document.getElementById('readers');
//         for (let reader of readers) {
//             readerDiv.innerHTML += reader.name + '<br>';
//         }
//     });
// });

// OBERVER

//Part 6

// let myObserver = {
//     next: value => console.log(`Value produce: ${value}`),
//     error: err => console.log(`ERROR: ${err}`),
//     complete: () => console.log(`All done producing values.`)
// }

// let sourceObservable$ = of(1,3,5);

// sourceObservable$.subscribe(myObserver);

// let sourceObservable2$ = of(1,3,5);

// sourceObservable$.subscribe(
//     value => console.log(`Value produce: ${value}`),
//     err => console.log(`ERROR: ${err}`),
//     () => console.log(`All done producing values.`)
// );

//Part 7
//Region Create Loat Mal

// let books$ = from(allBooks);

//  let bookObserver = {
//     next: book => console.log(`Book Title : ${book.title}`),
//     error: err => console.log(`ERROR: ${err}`),
//     complete: () => console.log(`All done producing values.`)
// }

// books$.subscribe(bookObserver);


//Part 8
// Multiple Observers တွေ  နဲ့ ဘယ်လို execute


// let currentTime$ = new Observable(subscriber => {
//   const timeString = new Date().toLocaleDateString();
//   subscriber.next(timeString);
//   subscriber.complete();
// });

// currentTime$.subscribe(currentTime=> console.log(` Observer1: ${currentTime}` ));

// setTimeout(() => {
//     currentTime$.subscribe(currentTime=> console.log(` Observer2: ${currentTime}`));
// }, 1000);

// setTimeout(() => {
//     currentTime$.subscribe(currentTime=> console.log(` Observer3: ${currentTime}` ));
// }, 2000);

//Part 4 Cancle Subscription

// let timeDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// let timer$ = interval(1000);

// let timerSubscription = timer$.subscribe(    
//     value => timeDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All Done!')
// );

// let timerSubscription2 = timer$.subscribe(    
//     value => timeDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All Done!')
// );

// fromEvent(button, 'click').subscribe( event => timerSubscription.unsubscribe());

// Part 5 Custom Interval & Cancel  Subscription

// let timeDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// let timer$ = new Observable(subscriber => {
// let i = 0;
// let intervalID = setInterval(()=>{
//     subscriber.next(i++)
// },1000);
// return () => {
//     console.log('Executing teardown code.');
//     clearInterval(intervalID);
// }
// });

// let timerSubscription = timer$.subscribe(
//     value => timeDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All Done!')
// );

// fromEvent(button, 'click').subscribe( event => timerSubscription.unsubscribe());

// Part 6 TwoSubscription at the same time

// let timeDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// let timer$ = new Observable(subscriber => {
// let i = 0;
// let intervalID = setInterval(()=>{
//     subscriber.next(i++)
// },1000);
// return () => {
//     console.log('Executing teardown code.');
//     clearInterval(intervalID);
// }
// });

// let timer2$ = new Observable(subscriber => {
//     let i = 0;
//     let intervalID = setInterval(()=>{
//         subscriber.next(i++)
//     },1000);
//     return () => {
//         console.log('Executing teardown code.');
//         clearInterval(intervalID);
//     }
//     });

// let timerSubscription = timer$.subscribe(
//     value => timeDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All Done!')
// );

// let timerConsoleSubscription = timer$.subscribe(
//     value => console.log(`${new Date().toLocaleDateString()} (${value})`)
// );

// timerSubscription.add(timerConsoleSubscription);

// let concatSubscription = concat(timer$,timer2$).subscribe(   value => timeDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
// null,
// () => console.log('All Done!'));


// fromEvent(button, 'click').subscribe( event => concatSubscription.unsubscribe());


// DAY TWO (2)

//Part 1

// let source$ = of(1, 2, 3, 4, 5);

// source$.pipe(
//     map(value => value*2),
//     filter(mappedValue => mappedValue>5)
// ).subscribe(finalValue => console.log(finalValue));

// ajax('/api/books').subscribe( value => console.log(value) );
// '/api/books'
// '/api/errors/500'
// ajax('/api/errors/500').pipe(
//     mergeMap(ajaxResponse => ajaxResponse.response),
//     filter(book=> book.publicationYear < 1950 ),
//     tap( oldBook => console.log(`Title:: ${oldBook.title}`)),
//     catchError( error => of({title: 'Hello World', author: ' Yangon'}) )
// )
// .subscribe( value => console.log(value),
//                    error => console.log(`ERROR:: ${error}`) 
//                  );


// let timeDiv = document.getElementById('times');
// let button = document.getElementById('timerButton');

// let timer$ = new Observable(subscriber => {
// let i = 0;
// let intervalID = setInterval(()=>{
//     subscriber.next(i++)
// },1000);
// return () => {
//     console.log('Executing teardown code.');
//     clearInterval(intervalID);
// }
// });

// let cancelTImer$ = fromEvent(button, 'click');
// let timerSubscription = timer$.
// pipe(
//     takeUntil(cancelTImer$)
//    //take(3)
// ).subscribe(
//     value => timeDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br>`,
//     null,
//     () => console.log('All Done!')
// );


//Part 2

// let sourceTT$ = of(1, 2, 3, 4, 5);

// function doublerOperator(){
//     return map(value  => value*2);
// }

// sourceTT$.pipe(
//     doublerOperator()
// ).subscribe( value => console.log(value));

// sourceTT$.pipe(
//     map(value => value*2),
//     filter(mappedValue => mappedValue>5)
// ).subscribe(finalValue => console.log(finalValue));

// CUstom  you can even use custom filter , and custom pipe

// function grabAndLogClassics(year, log){
//       return source$ => {
//             return new Observable(subscriber => {
//                 return source$.subscribe(
//                         book =>{
//                             if(book.publicationYear < year) {
//                                 subscriber.next(book);
//                                 if(log) {
//                                     console.log (`This is a Myanmar Log: ${book.title}`);
//                                 }
//                             }
//                         },
//                         error => subscriber.error(error),
//                         () => subscriber.complete()
//                 );
//             });
//       }

// }


// Part 3

// ajax('/api/books').pipe(
//     mergeMap(ajaxResponse => ajaxResponse.response),
//     grabAndLogClassics(1950,true),
//     catchError( error => of({title: 'Hello World', author: ' Yangon'}) )
// )
// .subscribe( value => console.log(value),
//                    error => console.log(`ERROR:: ${error}`) 
//                  );


//DAY THREE 3

// Part 1

// let subject$ = new Subject();

// subject$.subscribe( value => console.log(`Observer 1: ${value}`));

// subject$.subscribe( value => console.log(`Observer 2: ${value}`));

// subject$.next(`Hello`);

// let source$ = new Observable(subscriber => { 
//    subscriber.next(`Greetings!`);
// });

// source$.subscribe(subject$);

// Part 2

// let source$ = interval(1000).pipe( take(4) );

//let subject$ = new Subject();

// source$.subscribe(
//     value => console.log(`Observer 1: ${value}`)
// );

// setTimeout(() => {
// source$.subscribe(
//     value => console.log(`Observer 2: ${value}`)
// );
// }, 1000);

// setTimeout(() => {
//     source$.subscribe(
//         value => console.log(`Observer 3: ${value}`)
//     );
//     }, 2000);
// ----------

// Part 3

//  let source$ = interval(1000).pipe( 
//    take(4),
//    share()
//     // publish(),
//     // refCount()
//     );
//     // let source$ = multicast(new Subject())(interval(1000).pipe(take(4))).;

//     source$.subscribe(
//     value => console.log(`Observer 1: ${value}`)
// );

// setTimeout(() => {
//     source$.subscribe(
//     value => console.log(`Observer 2: ${value}`)
// );
// }, 1000);

// setTimeout(() => {
//     source$.subscribe(
//         value => console.log(`Observer 3: ${value}`)
//     );
//     }, 2000);

//     setTimeout(() => {
//         source$.subscribe(
//             value => console.log(`Observer 4: ${value}`),
//             null,
//             () => { console.log("Complete ")}
//         );
//         }, 4500);

    //source$.connect();














