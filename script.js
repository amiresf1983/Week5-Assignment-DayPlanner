let day = [
  {
    id: "0",
    hour: "09",
    time: "09",
    meridiem: "am",
    reminder: "",
  },
  {
    id: "1",
    hour: "10",
    time: "10",
    meridiem: "am",
    reminder: "",
  },
  {
    id: "2",
    hour: "11",
    time: "11",
    meridiem: "am",
    reminder: "",
  },
  {
    id: "3",
    hour: "12",
    time: "12",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "4",
    hour: "01",
    time: "13",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "5",
    hour: "02",
    time: "14",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "6",
    hour: "03",
    time: "15",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "7",
    hour: "04",
    time: "16",
    meridiem: "pm",
    reminder: "",
  },
  {
    id: "8",
    hour: "05",
    time: "17",
    meridiem: "pm",
    reminder: "",
  },
];

function getDateHead() {
  let todayHeader = moment().format("dddd, Do MMMM YYYY");
  $("#dayNow").text(todayHeader);
}

function saveTask() {
  localStorage.setItem("day", JSON.stringify(day));
}

function displayTask() {
  day.forEach(function (_thisHour) {
    $(`#${_thisHour.id}`).val(_thisHour.reminder);
  });
}

function init() {
  let storedDay = JSON.parse(localStorage.getItem("day"));

  if (storedDay) {
    day = storedDay;
  }

  saveTask();
  displayTask();
}

getDateHead();

day.forEach(function (thisHour) {
  let rowHour = $("<form>").attr({
    class: "row",
  });
  $(".container").append(rowHour);

  let fieldHour = $("<div>").text(`${thisHour.hour}${thisHour.meridiem}`).attr({
    class: "col-md-2 hour",
  });

  let planHour = $("<div>").attr({
    class: "col-md-9 state p-0",
  });
  let planData = $("<textarea>");
  planHour.append(planData);
  planData.attr("id", thisHour.id);
  if (thisHour.time < moment().format("HH")) {
    planData.attr({
      class: "prev",
    });
  } else if (thisHour.time === moment().format("HH")) {
    planData.attr({
      class: "curr",
    });
  } else if (thisHour.time > moment().format("HH")) {
    planData.attr({
      class: "next",
    });
  }

  let saveButton = $("<i class='far fa-save fa-lg'></i>");
  let savePlan = $("<button>").attr({
    class: "col-md-1 btnSave",
  });
  savePlan.append(saveButton);
  rowHour.append(fieldHour, planHour, savePlan);
});

init();

$(".btnSave").on("click", function (event) {
  event.preventDefault();
  let saveIndex = $(this).siblings(".state").children(".next").attr("id");
  day[saveIndex].reminder = $(this).siblings(".state").children(".next").val();
  console.log(saveIndex);
  saveTask();
  displayTask();
});
