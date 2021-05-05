// -> Selections
const introPage = document.querySelector('#Intro');
const homePage = document.querySelector('#Home');
const order_list = document.querySelector('#order-list');

const date1 = document.querySelector('#date1');
const date2 = document.querySelector('#date2');
const date3 = document.querySelector('#date3');
const date4 = document.querySelector('#date4');
const date5 = document.querySelector('#date5');
const date6 = document.querySelector('#date6');
const date7 = document.querySelector('#date7');
const dateEntries = [date1, date2, date3, date4, date5, date6, date7];

const dayOfWeek1 = document.querySelector('#dayOfWeek1');
const dayOfWeek2 = document.querySelector('#dayOfWeek2');
const dayOfWeek3 = document.querySelector('#dayOfWeek3');
const dayOfWeek4 = document.querySelector('#dayOfWeek4');
const dayOfWeek5 = document.querySelector('#dayOfWeek5');
const dayOfWeek6 = document.querySelector('#dayOfWeek6');
const dayOfWeek7 = document.querySelector('#dayOfWeek7');
const dayOfWeekEntries = [dayOfWeek1, dayOfWeek2, dayOfWeek3, dayOfWeek4, dayOfWeek5, dayOfWeek6, dayOfWeek7];


const month1 = document.querySelector('#month1');
const month2 = document.querySelector('#month2');
const month3 = document.querySelector('#month3');
const month4 = document.querySelector('#month4');
const month5 = document.querySelector('#month5');
const month6 = document.querySelector('#month6');
const month7 = document.querySelector('#month7');
const monthEntries = [month1, month2, month3, month4, month5, month6, month7];

const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');
const box5 = document.querySelector('#box5');
const box6 = document.querySelector('#box6');
const box7 = document.querySelector('#box7');
const boxEntries = [box1, box2, box3, box4, box5, box6, box7];






// -> global variables
const baseEndpoint = 'http://localhost:3001/api/orders';







// -> functions
const removeIntro = () => {
  setTimeout(() => {
    introPage.style.display = 'none';
    homePage.style.display = 'grid';
  }, 2 * 1000);
}
removeIntro();


const renderCard = (id, name, pickup, dropoff, parentContainer) => {
  const card = document.createElement('div');
  card.setAttribute('id', `k-${id}`);
  card.setAttribute('class', 'OrderCard');
  card.setAttribute('draggable', 'true');

  card.innerHTML = 
    `<div class="id">
      <h4><i class="fas fa-fingerprint"></i></h4>
      <p>${id}</p>
    </div>
    <div class="name">
      <h4><i class="fas fa-user"></i></h4>
      <p>${name}</p>
    </div>
    <div class="pick-up">
      <h4><i class="fas fa-location-arrow"></i></h4>
      <p>${pickup}</p>
    </div>
    <div class="drop-off">
      <h4><i class="fas fa-street-view"></i></h4>
      <p>${dropoff}</p>
    </div>`;
  
  parentContainer.appendChild(card);
}


const displayData = async () => {
  const raw = await fetch(baseEndpoint);
  const data = await raw.json();

  Object.values(data).forEach(element => {
    const { _id, name, pickup, dropoff } = element;
    renderCard(_id, name, pickup, dropoff, order_list);
  });

  // set event listeners to the cards that are rendered
  document.querySelectorAll('.OrderCard').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
      e.dataTransfer.setData('dragId', e.target.id);
    });

    card.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });
  });
}
displayData();


const saveToDb = async (id, datedue) => {
  const _data = { 'datedue': datedue };
  const raw = await fetch(`${baseEndpoint}/${id}`, {
    method: "PUT", 
    body: JSON.stringify(_data),
    headers: { "Content-type": "application/json" }
  });
  const response = await raw.text();
  console.log(response);
}


const setCalendar = () => {
  const dates = [];
  const dateIds = [];
  let ordersForDates = [];
  const days = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const getFormattedDate = (addTime = 0) => {
    const now = new Date(new Date().valueOf() + (addTime * 1000));
    const date = now.getDate();
    const dayOfWeek = days[now.getDate() % 7];
    const month = months[now.getMonth()];
    
    return { dayOfWeek, date, month };
  }

  for (let i = 0; i < 7; ++i) {
    const secondsInADay = 86400;
    let value = getFormattedDate(secondsInADay * i);
    dates.push(value);
    dateIds.push(`${value.dayOfWeek}-${value.date}-${value.month}`);
  }

  dates.forEach((dateObj, index) => {
    dateEntries[index].innerHTML = dateObj.date;
    dayOfWeekEntries[index].innerHTML = dateObj.dayOfWeek;
    monthEntries[index].innerHTML = dateObj.month;
  });

  dateIds.forEach((dateId, index) => {
    boxEntries[index].setAttribute('data-id', dateId);
  });

}
setCalendar();








// -> event listeners
boxEntries.forEach(box => {
  box.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  box.addEventListener('drop', (e) => {
    // console.log('drop-container:', e.target.dataset.id);

    const draggedItemId = e.dataTransfer.getData('dragId');
    document.querySelector(`#${e.target.id} .left`).appendChild(document.querySelector(`#${draggedItemId}`));

    // save the dragged item to the db
    const originalId = draggedItemId.substring(2);
    saveToDb(originalId, e.target.dataset.id);
  });
});


order_list.addEventListener('dragover', (e) => {
  e.preventDefault();
});


order_list.addEventListener('drop', (e) => {
  const draggedItemId = e.dataTransfer.getData('dragId');
  document.querySelector('#order-list').appendChild(document.querySelector(`#${draggedItemId}`));

  //save the dragged item to db
  const originalId = draggedItemId.substring(2);
  saveToDb(originalId, '');
});