const wauForm = document.querySelector(".js-whereAreYouFrom"),
  selecter = wauForm.querySelector("select");

const FROM_USER = "country";

function loadUser()
{
   const loadUserData = localStorage.getItem(FROM_USER);
  
   if(loadUserData !== null) 
   {
     
        selecter.value = loadUserData;
   }
}

function saveContury(text){
    localStorage.setItem(FROM_USER, text);
}


function handleSelect(event) {
  event.preventDefault(); // 이벤트 막음

  // 셀렉트 이름 가져오기
  const selectContury = selecter.options[selecter.selectedIndex].value; 

  // Data 저장
  saveContury(selectContury);

  loadUser();


}

function init() {
  // 초기화
  loadUser();
  selecter.addEventListener("change", handleSelect);
}

init();

