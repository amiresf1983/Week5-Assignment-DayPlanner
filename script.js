let slotContainerElEl = $(".container");
let todayEl = $("#today");

let currentDate = moment().format("dddd, Do MMMM YYYY");
todayEl.text(currentDate);

let hr = parseInt(moment().format("HH"));
let slotArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];

for (let index = 0; index < slotArray.length; index++) {
  let time = slotArray[index];

  let slot = $("<div>");
  slot.addClass("row slot");
  slot.attr("id", time);
  slotContainerElEl.append(slot);

  let slotTag = $("<Tag>");
  slotTag.addClass("inputText col-1");
  slotTag.text(time + ":00");
  slot.append(slotTag);

  let slotValue = $("<textarea>");
  slotValue.attr("rows", "1");
  slotValue.addClass("form-control textarea col-10");
  slotValue.attr("id", "input" + time);

  if (time < hr) {
    slotValue.addClass("before");
  } else if (time === hr) {
    slotValue.addClass("now");
  } else {
    slotValue.addClass("after");
  }
  slot.append(slotValue);

  let slotBtn = $("<button>");
  slotBtn.addClass("saveBtn col-1");
  slotBtn.attr("row", "2");

  let btnIcon = $("<i>");
  btnIcon.addClass("fa fa-save");
  slotBtn.append(btnIcon);
  slot.append(slotBtn);
}

function start() {
  for (let index = 0; index < slotArray.length; index++) {
    var time = slotArray[index];

    if (localStorage.getItem(time)) {
      var contentId = "input" + time;
      var contentSection = $("#" + contentId);
      contentSection.text(localStorage.getItem(time));
    }
  }
  slotContainerElEl.on("click", "button", saveContent);
}

function saveContent(event) {
  if ($(event.target).parent().attr("id")) {
    var saveIncoming = $(event.target).parent().attr("id");
    var saveNoteSection = $(event.target).parent().children("textarea");
  } else {
    let saveIncoming = $(event.target).parent().parent().attr("id");
    let saveNoteSection = $(event.target)
      .parent()
      .parent()
      .children("textarea");
  }

  saveInput = saveNoteSection.val();
  localStorage.setItem(saveIncoming, saveInput);
}

$(document).ready(start);
