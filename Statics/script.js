
// update current time 
function updateClock() {
  const now = new Date();
  const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = now.getHours() < 12 ? 'AM' : 'PM';
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}


// setting alarmList
function setAlarm() {
  const hours = document.getElementById('hours').value;
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;
  const ampm = document.getElementById('ampm').value;

  const alarmTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  const alarmList = document.getElementById('alarmList');

  const listItem = document.createElement('li');
  listItem.textContent = alarmTime;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    alarmList.removeChild(listItem);
  };

  listItem.appendChild(deleteButton);
  alarmList.appendChild(listItem);

  alert(`Alarm set for ${alarmTime}`);
}

function checkAlarms() {
  const now = new Date();
  const currentHour = now.getHours() % 12 || 12;
  const currentMinutes = now.getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHour}:${currentMinutes} ${now.getHours() < 12 ? 'AM' : 'PM'}`;

  const alarmListItems = document.getElementById('alarmList').getElementsByTagName('li');

  for (let item of alarmListItems) {
    const alarmTime = item.textContent.split(' ')[0];
    if (currentTime === alarmTime) {
      alert(`Alarm for ${alarmTime}`);
      document.getElementById('alarmList').removeChild(item);
    }
  }
}

// Update clock every second
setInterval(updateClock, 1000);

// Check for alarms every second
setInterval(checkAlarms, 1000);