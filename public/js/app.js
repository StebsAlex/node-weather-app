// const fetchLocation = (location) =>
//   fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>
//     response.json()
//   );
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
messageOne.textContent = "";
messageTwo.textContent = "";

// weatherForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   messageOne.textContent = "Loading ...";
//   messageTwo.textContent = "";
//   const location = search.value;
//   fetchLocation(location).then((data) => {
//     if (data.error) {
//       messageOne.textContent = data.error;
//     } else {
//       messageOne.textContent = data.location;
//       messageTwo.textContent = data.forecast;
//     }
//   });
// });

// data = response.json() yes - promise resolving to data

// const fetchLocation = (location) => {
//   return fetch(`http://localhost:3000/weather?address=${location}`).then(
//     (response) => {
//       return response.json().then((data) => {
//         if (data.error) {
//           return data.error;
//         } else {
//           return data;
//         }
//       });
//     }
//   );
// };
const fetchLocation = (location) =>
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) throw data.error;
      return data;
    });

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";
  const location = search.value;
  fetchLocation(location)
    .then((data) => /* set forecast message from data */ {
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    })
    .catch((error) => /* set error message from error */ {
      messageOne.textContent = error;
    });
});
// im getting ref errors on erro is not defined
// works great !!!!   noice
// the fetchLocation, is implisit return, as it doesnt have {}
// yes, it's an expression - foo = arg => expression
// vs. block - foo = arg => { block; }
// e.g. const add = (a,b) => a + b;  // you don't need return, it's an expression.
// so i need to make sure that the fetchLocation(location) is retuned. that why u
// const fetchLocation = (location) => so that above function is returned here.
//// then it can sort the reject or return it according to the logic.

// so the 'fetch' call is returning a Promise.  you need that Promise returned from the fetchLocation function
// otherwise the code above can't do .then() or .catch() on it.  If you return nothing from fetchLocation
// then it is actually returning undefined.  and the code above would be doing undefined.then(...)
// that won't work obviously
/// see i learned something today!!!!
// cool, that's what it's all about bud
// :thumbup
// trhough this node js course, i learned about the call back function. oh yeah, that's like a crude
// version of promise - it's what we did before promises existed.  node still relies heavily on callbacks because
// they're lightweight and simple.
// ya ist uses thr add(a,b , (res, rej) => {
// do stuff, and then run callback function.res() or callback function.rej()
//})
// yeah basically that.  the convention is that the callback is called with two args - the first is the error
// (only set if something went wrong) and the second is the data/result.
// e.g. const add = (a,b,cb) => {
//  const sum = a + b;
//  if (allOk) cb(null, sum); // just falsy - null is fine IIRC.  null is convention I believe.
//  else cb('something wrong'); // second arg not needed, if you omit it then it's undefined anyway.
//};

// when you call that async function above (pretend that adding a + b is happening via API call or something) then
// you do it like this:

// add(1, 2, (err, data) => {
//   if (err) console.error(err);
//   else console.log(`The sum is: ${data}`);
//});

// so you just test (err) for truthiness
// its just may more complicated that it needs to be
// you need two functions
// async await is more easier

// not sure - i think callbacks are simpler, you're just dealing with functions, no MAGIC
// with await you have to use try/catch blocks.
// but async/await and promises are flatter - you can end up with lots of nested callbacks if you're not careful.
// tru i guess, async looks simpler to me, maybe im naive
// LOL!

// await is meant to be easier to read, and it is more natural sometimes.
// you just have to remember that it's using promises under the bonnet and that when you `await` something, your
// function IS actually returning then with a promise.  That's all hidden by the magic so it looks like the
// function has just paused on that line, but that's not really what's happening.
// Probably best not to think about that stuff unless you hit a particular problem though.

// ya i thats fine. im copy this all in to slck and pin it
// #wordsToLiveBy
// u still there?
// just about
// // im gonna have some lunch. i put the code in my slcakbot, and pinned it, so it wont go away
// :) i'm still around if the message gets deleted don't worry!
/// coolio :) ur da best
// smell ya laters
// aw shush you
// peace out!
