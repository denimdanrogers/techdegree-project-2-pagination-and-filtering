/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

let searchArr = [];
// This function will create and insert/append the elements needed to display a "page" of nine students
function showPage(list, page) {
   const studentFirstIndex = (page*9)-9;
   const studentLastIndex = (page*9);
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = '';
   if (list.length === 0) {
      const li = `<li>No Results Found</li>`;
      studentList.insertAdjacentHTML("afterbegin", li);
   } else {
      for (let i = 0; i < list.length; i++) {
         if (i >= studentFirstIndex && i < studentLastIndex) {
            // li
            const li = document.createElement("li");
            li.className = "student-item";
            // div
            const div = document.createElement("div");
            div.classname = "student-details";
            // picture
            const picture = document.createElement("img");
            picture.src = list[i].picture.medium;
            picture.alt = `${list[i].name.first} ${list[i].name.last}`;
            picture.className = "avatar";
            div.appendChild(picture);
            // name
            const name = document.createElement("h3");
            name.textContent = `${list[i].name.first} ${list[i].name.last}`;
            div.appendChild(name);
            // email
            const email = document.createElement("span");
            email.className = "email";
            email.textContent = list[i].email;
            div.appendChild(email);
            // append first div
            li.appendChild(div);
            // joined date
            const div2 = document.createElement("div");
            div2.className = "joined-details";
            const joined = document.createElement("span");
            joined.className = "date";
            joined.textContent = list[i].registered.date;
            // append 2nd div
            div2.appendChild(joined);
            li.appendChild(div2);
            //append li
            studentList.appendChild(li);
         };
      };
   };
};
 // This function will dynamically generate and append page buttons based on the length of the student list
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / 9);
   const linkList = document.querySelector(".link-list");
   linkList.innerHTML = '';
   if (list.length === 0) {
      const li = document.createElement("li")
      const bttn = document.createElement("button");
      bttn.type = "button";
      bttn.className = "active";
      bttn.textContent = "Clear Search";
      li.insertAdjacentElement("beforeend", bttn);
      linkList.insertAdjacentElement("beforeend", li);
   } else {
      for (let i = 1; i <= numOfPages; i++) {
         const li = document.createElement("li")
         const bttn = document.createElement("button");
         bttn.type = "button";
         bttn.textContent = i;
         li.insertAdjacentElement("beforeend", bttn);
         linkList.insertAdjacentElement("beforeend", li);
         };
      };
   linkList.querySelector("button").className = "active";
   document.querySelector(".link-list").addEventListener("click", (e)=> {
      if (e.target.type === "button") {
         if (e.target.textContent !== "Clear Search") {
            let activeBttn = document.querySelector(".active");
            activeBttn.className = '';
            e.target.className = 'active';
            showPage(list, e.target.textContent);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            };   
         };
      });
   };

// This function will allow a user to search for students by name
function studentSearch() {
   const header = document.querySelector(".header");
   // label
   const label = document.createElement("label");
   label.className = "student-search";
   // span
   const span = document.createElement("span")
   span.textContent = "Search by name";
   label.appendChild(span);
   // input
   const input = document. createElement("input");
   input.id = "search";
   input.placeholder = "Search by name...";
   label.appendChild(input);
   // button
   const button = document.createElement("button");
   button.type = "button";
   button.className = "search-button";
   button.innerHTML = "<img src='img/icn-search.svg' alt='Search icon'>";
   label.appendChild(button);
   // append to header
   header.insertAdjacentElement("beforeend", label);
   // search button click event listener
   const searchButton = document.querySelector(".search-button");
   searchButton.addEventListener("click", ()=> {
      let searchValue = input.value;
      for (let i = 0; i < data.length; i++) {
         let name = `${data[i].name.first} ${data[i].name.last}`;
         if (name.toLowerCase().includes(searchValue.toLowerCase())) {
            searchArr.push(data[i]);
         };
      };
      if (searchArr.length === 0) {
         document.querySelector(".student-list").innerHTML = "<li>`No results found</li>";
      } else {
         showPage(searchArr, 1);
         addPagination(searchArr);
      };
   });
   // search input keyup event listener
   const searchInput = document.querySelector("#search");
   searchInput.addEventListener("keyup", ()=> {
      let searchValue = input.value;
      searchArr = [];
      for (let i = 0; i < data.length; i++) {
         let name = `${data[i].name.first} ${data[i].name.last}`;
         if (name.toLowerCase().includes(searchValue)) {
            searchArr.push(data[i]);
         };
      };
      showPage(searchArr, 1);
      addPagination(searchArr);
   }) 
   // Clear Search event listener
   document.querySelector(".link-list").addEventListener("click", (e)=> {
      if (e.target.textContent === "Clear Search") {
         input.value = '';
         showPage(data, 1);
         addPagination(data);
         };
      });
};



// Init functions
showPage(data, 1);
addPagination(data);
studentSearch();
